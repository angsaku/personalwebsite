"use client";

import { useEffect, useRef, useState } from "react";

const WORDS = ["Experience", "Products", "Solutions", "Interface", "Services", "Journeys"];
const TYPE_SPEED = 80;
const DELETE_SPEED = 50;
const PAUSE_AFTER_TYPE = 1600;
const PAUSE_AFTER_DELETE = 300;

const STROKE_STYLE: React.CSSProperties = {
  WebkitTextStroke: "1px #E5212E",
  color: "transparent",
};

export default function HeroFlipWord() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [minWidth, setMinWidth] = useState<number | undefined>(undefined);
  const measureRef = useRef<HTMLSpanElement>(null);

  // Lock container to widest word at current font size
  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    let max = 0;
    WORDS.forEach((word) => {
      el.textContent = word;
      max = Math.max(max, el.offsetWidth);
    });
    setMinWidth(max);
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
      {/* Hidden span to measure widest word */}
      <span
        ref={measureRef}
        style={{ ...STROKE_STYLE, fontStyle: "italic", fontWeight: 300, position: "absolute", visibility: "hidden", whiteSpace: "nowrap", pointerEvents: "none" }}
        aria-hidden
      />

      {/* Fixed-width container prevents reflow */}
      <span
        className="italic font-light inline-block"
        style={{ minWidth: minWidth ? `${minWidth}px` : undefined }}
      >
        <span style={STROKE_STYLE}>{displayed}</span>
        <span className="animate-pulse" style={STROKE_STYLE}>|</span>
      </span>
    </>
  );
}
