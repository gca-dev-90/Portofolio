"use client";
import { ReactNode } from "react";

/**
 * Scales a fixed-size artboard so mobile matches desktop exactly.
 * Set STAGE_W / STAGE_H to your desktop hero size.
 */
const STAGE_W = 1200; // px  ← set to your actual desktop width
const STAGE_H = 560;  // px  ← set to your actual desktop height

export default function HeroStage({ children }: { children: ReactNode }) {
  return (
    <div
      className="hero-stage-wrap relative w-full"
      style={
        {
          ["--stage-w"]: `${STAGE_W}px`,
          ["--stage-h"]: `${STAGE_H}px`,
        } as React.CSSProperties & Record<string, string>
      }
    >
      {/* spacer reserves the scaled height so the absolute stage doesn't overlap next sections */}
      <div className="block h-[calc(var(--stage-h)*var(--scale,1))]" />

      {/* The actual stage (your desktop composition lives here) */}
      <div
        className="hero-stage absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: "var(--stage-w)",
          height: "var(--stage-h)",
          transform: "scale(var(--scale,1))",
          transformOrigin: "top center",
        }}
      >
        {children}
      </div>

      <style jsx>{`
        .hero-stage-wrap {
          --scale: 1; /* desktop */
        }
        /* Below the stage width, scale the entire composition proportionally */
        @media (max-width: ${STAGE_W}px) {
          .hero-stage-wrap {
            --scale: calc(100vw / var(--stage-w));
          }
        }
      `}</style>
    </div>
  );
}