/**
 * Wanderlust sound engine — 100% procedural (Web Audio API).
 *
 * No audio files: every sound is synthesized, so it works offline, ships nothing,
 * and each interaction can be genuinely distinct. Everything is routed through a
 * generated reverb for a spacious, peaceful feel.
 *
 * - Clicks walk up a C-major pentatonic scale → melodic & "catchy".
 * - Hovers are soft, high, quiet sparkles.
 * - Scroll notes track scroll position (pitch) and direction (octave).
 * - Ambient bed = slow evolving pad chords + occasional twinkles.
 *
 * Browsers block audio until a user gesture, so nothing plays until `resume()`
 * is called from within a real interaction.
 */

// C major pentatonic across two octaves (bright, always-consonant).
const PENTATONIC = [
  523.25, // C5
  587.33, // D5
  659.25, // E5
  783.99, // G5
  880.0, // A5
  1046.5, // C6
  1174.66, // D6
  1318.51, // E6
];

// Warm 4-chord progression (I–vi–IV–V in C) for the ambient bed.
const CHORDS: number[][] = [
  [261.63, 329.63, 392.0], // C
  [220.0, 261.63, 329.63], // Am
  [174.61, 220.0, 261.63], // F
  [196.0, 246.94, 293.66], // G
];

type PingOpts = {
  type?: OscillatorType;
  attack?: number;
  decay?: number;
  gain?: number;
  wet?: number;
  detune?: number;
};

export class SoundEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private reverb: ConvolverNode | null = null;
  private clickIdx = 0;
  private hoverLast = 0;
  private scrollLast = 0;
  private ambient: { stop: () => void } | null = null;

  muted = false;
  private volume = 0.28;

  get ready() {
    return this.ctx !== null;
  }
  get running() {
    return this.ambient !== null;
  }

  /** Lazily create the audio graph. Safe to call repeatedly. */
  private init() {
    if (this.ctx) return;
    const AC =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;

    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.muted ? 0 : this.volume;
    this.master.connect(this.ctx.destination);

    this.reverb = this.ctx.createConvolver();
    this.reverb.buffer = this.makeImpulse(2.8, 2.4);
    const wet = this.ctx.createGain();
    wet.gain.value = 0.85;
    this.reverb.connect(wet).connect(this.master);
  }

  /** Must be called from a user gesture to satisfy autoplay policies. */
  async resume() {
    this.init();
    if (this.ctx?.state === "suspended") await this.ctx.resume();
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    if (this.master && this.ctx) {
      const t = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(t);
      this.master.gain.setTargetAtTime(muted ? 0 : this.volume, t, 0.05);
    }
  }

  /** A single plucked/bell voice, dry + reverb send. */
  private ping(freq: number, opts: PingOpts = {}) {
    if (!this.ctx || !this.master || this.muted) return;
    const { type = "sine", attack = 0.005, decay = 0.5, gain = 0.4, wet = 0.5, detune = 0 } = opts;
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    osc.type = type;
    osc.frequency.value = freq;
    osc.detune.value = detune;

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(gain, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);

    osc.connect(g);
    g.connect(this.master);
    if (this.reverb) {
      const send = this.ctx.createGain();
      send.gain.value = wet;
      g.connect(send);
      send.connect(this.reverb);
    }

    osc.start(t);
    osc.stop(t + attack + decay + 0.05);
  }

  /** Bright, melodic click — steps through the scale so each one differs. */
  playClick() {
    const f = PENTATONIC[this.clickIdx % PENTATONIC.length];
    this.clickIdx++;
    this.ping(f, { type: "triangle", decay: 0.55, gain: 0.32, wet: 0.4 });
    this.ping(f * 2, { type: "sine", attack: 0.002, decay: 0.3, gain: 0.1, wet: 0.6 });
  }

  /** Very soft, quiet high sparkle for hovers. */
  playHover() {
    const now = performance.now();
    if (now - this.hoverLast < 90) return;
    this.hoverLast = now;
    const f = PENTATONIC[(this.clickIdx + 3) % PENTATONIC.length] * 1.5;
    this.ping(f, { type: "sine", attack: 0.004, decay: 0.16, gain: 0.045, wet: 0.6 });
  }

  /** Gentle marimba note; pitch = scroll position, octave = direction. */
  playScroll(progress: number, direction: 1 | -1) {
    const now = performance.now();
    if (now - this.scrollLast < 130) return;
    this.scrollLast = now;
    const p = Math.min(1, Math.max(0, progress));
    const idx = Math.round(p * (PENTATONIC.length - 1));
    const base = PENTATONIC[idx] * 0.5; // one octave down for warmth
    const f = direction === -1 ? base * 0.5 : base;
    this.ping(f, { type: "sine", attack: 0.012, decay: 0.42, gain: 0.09, wet: 0.65 });
  }

  /** Long, slow pad voice for the ambient bed. */
  private pad(freq: number, dur: number) {
    if (!this.ctx || !this.master || this.muted) return;
    const t = this.ctx.currentTime;
    [0, 6].forEach((detune) => {
      const osc = this.ctx!.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;
      osc.detune.value = detune;
      const g = this.ctx!.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(0.05, t + 1.6);
      g.gain.setValueAtTime(0.05, t + dur - 2);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(g);
      g.connect(this.master!);
      if (this.reverb) {
        const send = this.ctx!.createGain();
        send.gain.value = 0.8;
        g.connect(send);
        send.connect(this.reverb);
      }
      osc.start(t);
      osc.stop(t + dur + 0.1);
    });
  }

  /** Start the evolving ambient background. Idempotent. */
  startAmbient() {
    if (!this.ctx || this.ambient || this.muted) return;
    let i = 0;
    const step = () => {
      const chord = CHORDS[i % CHORDS.length];
      i++;
      chord.forEach((f) => this.pad(f, 7.2));
    };
    step();
    const chordId = window.setInterval(step, 6600);
    const twinkleId = window.setInterval(() => {
      if (Math.random() > 0.45) {
        const f = PENTATONIC[Math.floor(Math.random() * PENTATONIC.length)];
        this.ping(f, { type: "sine", attack: 0.01, decay: 1.2, gain: 0.05, wet: 0.8 });
      }
    }, 2800);
    this.ambient = {
      stop: () => {
        window.clearInterval(chordId);
        window.clearInterval(twinkleId);
      },
    };
  }

  stopAmbient() {
    this.ambient?.stop();
    this.ambient = null;
  }

  /** Generated reverb impulse response (decaying noise). */
  private makeImpulse(duration: number, decay: number) {
    const ctx = this.ctx!;
    const rate = ctx.sampleRate;
    const len = Math.floor(rate * duration);
    const impulse = ctx.createBuffer(2, len, rate);
    for (let ch = 0; ch < 2; ch++) {
      const data = impulse.getChannelData(ch);
      for (let i = 0; i < len; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
      }
    }
    return impulse;
  }
}
