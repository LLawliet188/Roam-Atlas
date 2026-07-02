"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * App-wide buttery smooth scrolling via Lenis.
 * Uses rAF autoRaf (default) and respects reduced-motion by keeping
 * a gentle lerp. Wrap the whole app body.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
}
