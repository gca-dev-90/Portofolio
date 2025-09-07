"use client";
import { useEffect, useRef, useState } from "react";
import type { ElementType } from "react";

type Props = {
  text: string;
  speed?: number; // ms per char
  startDelay?: number; // ms
  className?: string;
  as?: ElementType; // tag/component, default 'p'
  showCaret?: boolean;
  start?: boolean; // when true, begins typing
  onDone?: () => void; // callback when finished
};

export default function Typewriter({
  text,
  speed = 18,
  startDelay = 120,
  className,
  as = "p",
  showCaret = true,
  start = true,
  onDone,
}: Props) {
  const [out, setOut] = useState("");
  const iRef = useRef(0);
  const doneRef = useRef(false);

  useEffect(() => {
    let intervalId: ReturnType<typeof window.setInterval> | undefined;
    let timeoutId: ReturnType<typeof window.setTimeout> | undefined;
    if (!start) return;
    // reset if starting again
    if (iRef.current === 0) setOut("");
    timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        iRef.current += 1;
        setOut(text.slice(0, iRef.current));
        if (iRef.current >= text.length) {
          if (intervalId) window.clearInterval(intervalId);
          if (!doneRef.current) {
            doneRef.current = true;
            onDone?.();
          }
        }
      }, speed);
    }, startDelay);
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [start, text, speed, startDelay, onDone]);

  const Tag = (as as ElementType) || ("p" as unknown as ElementType);
  return (
    <Tag className={className} aria-live="polite">
      {out}
      {showCaret && out.length < text.length ? <span className="typewriter-caret">|</span> : null}
    </Tag>
  );
}
