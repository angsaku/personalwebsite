"use client";

import { useEffect, useRef, useState } from "react";

const WORDS = ["Experience", "Products", "Solutions", "Interface", "Services", "Journeys"];
const TYPE_SPEED = 80;
const DELETE_SPEED = 50;
const PAUSE_AFTER_TYPE = 1600;
const PAUSE_AFTER_DELETE = 300;

const STROKE_STYLE: import("react").CSSProperties = {
  WebkitTextStroke: "1px #E5212E",
  color: "transparent",
  fontStyle: "italic",
  fontWeight: 300,
};

export default function HeroFlipWord({ fallback: _ }: { fallback?: string }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState(WORDS[0]);
  const [deleting, setDeleting] = useState(false);
  const [minWidth, setMinWidth] = useState<number | undefined>(undefined);
  const measureRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    let max = 0;
    WORDS.forEach((word) => {
      el.textContent = word;
      max = Math.max(max, el.offsetWidth);
    });
    setMinWidth(max);
    // Start deleting the first word to kick off the loop
    const t = setTimeout(() => setDeleting(true), PAUSE_AFTER_TYPE);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const current = WORDS[wordIndex];

    if (!deleting && displayed.length < current.length) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), TYPE_SPEED);
      return () => clearTimeout(t);
    }
    if (!deleting && displayed.length === current.length) {
      const t = setTimeout(() => setDeleting(true), PAUSE_AFTER_TYPE);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), DELETE_SPEED);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length === 0) {
      const t = setTimeout(() => {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % WORDS.length);
      }, PAUSE_AFTER_DELETE);
      return () => clearTimeout(t);
    }
  }, [displayed, deleting, wordIndex]);

  return (
    <>
      <span
        ref={measureRef}
        style={{ ...STROKE_STYLE, position: "absolute", visibility: "hidden", whiteSpace: "nowrap", pointerEvents: "none" }}
        aria-hidden
      />
      <span style={{ ...STROKE_STYLE, display: "inline-block", minWidth: minWidth ? `${minWidth}px` : undefined }}>
        {displayed}
        <span className="animate-pulse" style={STROKE_STYLE}>|</span>
      </span>
    </>
  );
}
