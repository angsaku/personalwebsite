"use client";

import { useRef, useCallback, useEffect } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";

export default function ScrambleText({ text, className }: { text: string; className?: string }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number>(0);

  const scramble = useCallback(() => {
    const el = spanRef.current;
    if (!el) return;

    const startTime = performance.now();
    const duration = text.length * 55;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const resolvedCount = Math.floor((elapsed / duration) * text.length);

      el.textContent = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < resolvedCount) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      if (elapsed < duration) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        el.textContent = text;
      }
    };

    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(animate);
  }, [text]);

  const reset = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    if (spanRef.current) spanRef.current.textContent = text;
  }, [text]);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  return (
    <span
      ref={spanRef}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      className={className}
    >
      {text}
    </span>
  );
}
