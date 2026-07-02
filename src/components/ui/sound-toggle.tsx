"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/components/providers/sound-provider";
import { cn } from "@/lib/utils";

export function SoundToggle({ className }: { className?: string }) {
  const { muted, toggleMuted, started } = useSound();
  const playing = started && !muted;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      onClick={toggleMuted}
      aria-label={muted ? "Turn ambient sound on" : "Turn ambient sound off"}
      aria-pressed={!muted}
      title={muted ? "Sound off" : "Sound on"}
      className={cn(
        "glass fixed bottom-5 right-5 z-50 grid size-12 place-items-center rounded-full shadow-lg transition-colors hover:bg-card/80",
        className
      )}
    >
      {/* Soft pulsing halo while audio is playing */}
      {playing && (
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-primary/50"
          animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        />
      )}

      {muted ? (
        <VolumeX className="size-5 text-muted-foreground" />
      ) : (
        <Volume2 className="size-5 text-primary" />
      )}
    </motion.button>
  );
}
