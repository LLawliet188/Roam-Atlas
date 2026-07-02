"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { SoundEngine } from "@/lib/audio/sound-engine";

type SoundContextValue = {
  muted: boolean;
  toggleMuted: () => void;
  /** True once the audio graph has been unlocked by a user gesture. */
  started: boolean;
};

const SoundContext = createContext<SoundContextValue | null>(null);

const STORAGE_KEY = "wl-sound-muted";
const INTERACTIVE = 'a, button, [role="button"], input[type="submit"], summary, label';

export function SoundProvider({ children }: { children: ReactNode }) {
  const engineRef = useRef<SoundEngine | null>(null);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);

  // Restore saved preference (default: sound on).
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (saved === "1") setMuted(true);
  }, []);

  // Create the engine once (client only).
  useEffect(() => {
    engineRef.current = new SoundEngine();
    return () => engineRef.current?.stopAmbient();
  }, []);

  // Keep engine mute state + storage in sync.
  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;
    engine.setMuted(muted);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, muted ? "1" : "0");
    if (muted) engine.stopAmbient();
    else if (started) engine.startAmbient();
  }, [muted, started]);

  // Unlock audio on the first user gesture, then wire interaction listeners.
  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;

    let lastScroll = typeof window !== "undefined" ? window.scrollY : 0;

    const unlock = async () => {
      await engine.resume();
      setStarted(true);
      if (!engine.muted) engine.startAmbient();
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest(INTERACTIVE)) engine.playClick();
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (target?.closest(INTERACTIVE)) engine.playHover();
    };

    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? y / max : 0;
      const direction: 1 | -1 = y >= lastScroll ? 1 : -1;
      lastScroll = y;
      engine.playScroll(progress, direction);
    };

    window.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", unlock);
    // Capture phase so navigation clicks still register.
    window.addEventListener("click", onClick, true);
    window.addEventListener("pointerover", onOver, true);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("click", onClick, true);
      window.removeEventListener("pointerover", onOver, true);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const toggleMuted = useCallback(() => setMuted((m) => !m), []);

  const value = useMemo<SoundContextValue>(
    () => ({ muted, toggleMuted, started }),
    [muted, toggleMuted, started]
  );

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within <SoundProvider>");
  return ctx;
}
