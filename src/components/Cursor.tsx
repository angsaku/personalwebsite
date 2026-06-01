"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.cursor = "none";

    let raf: number;
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let tx = x, ty = y;

    const move = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const tick = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    const over = (e: MouseEvent) => {
      const t = (e.target as Element)?.closest("[data-cursor]") as HTMLElement | null;
      if (!t) {
        cursorRef.current?.classList.remove("hover", "drag");
        return;
      }
      const k = t.dataset.cursor;
      cursorRef.current?.classList.toggle("hover", k !== "drag");
      cursorRef.current?.classList.toggle("drag", k === "drag");
      if (labelRef.current) labelRef.current.textContent = t.dataset.cursorLabel || "";
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      cancelAnimationFrame(raf);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <div className="sk-cursor" ref={cursorRef}>
      <div className="c-ring" />
      <div className="c-dot" />
      <div className="c-label" ref={labelRef} />
    </div>
  );
}
