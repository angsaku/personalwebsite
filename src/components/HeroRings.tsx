"use client";

import { useState } from "react";

export default function HeroRings() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 pointer-events-none hidden lg:block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ pointerEvents: "auto" }}
    >
      {/* Outer dashed rotating ring */}
      <div
        className="w-[520px] h-[520px] rounded-full border border-dashed"
        style={{
          borderColor: hovered ? "rgba(229,33,46,0.5)" : "rgba(229,33,46,0.2)",
          animation: `spin ${hovered ? "6s" : "50s"} linear infinite`,
          transition: "border-color 0.5s",
          willChange: "transform",
        }}
      >
        {/* Dot riding the ring — scale instead of width/height change */}
        <div
          className="absolute top-0 left-1/2 rounded-full"
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: "rgba(229,33,46,0.9)",
            boxShadow: hovered
              ? "0 0 20px 6px rgba(229,33,46,0.7)"
              : "0 0 8px 2px rgba(229,33,46,0.4)",
            transform: `translate(-50%, -50%) scale(${hovered ? 1.4 : 1})`,
            transition: "transform 0.5s, box-shadow 0.5s",
            willChange: "transform",
          }}
        />
      </div>

      {/* Middle ring — counter-rotates on hover */}
      <div
        className="absolute inset-[70px] rounded-full border"
        style={{
          borderColor: hovered ? "rgba(229,33,46,0.25)" : "rgba(229,33,46,0.1)",
          animation: hovered ? "spin 10s linear infinite reverse" : "none",
          transition: "border-color 0.5s",
        }}
      />

      {/* Inner ring — pulses on hover */}
      <div
        className="absolute inset-[130px] rounded-full border"
        style={{
          borderColor: hovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)",
          animation: hovered ? "ping 1.5s cubic-bezier(0,0,0.2,1) infinite" : "none",
          opacity: hovered ? 0.6 : 1,
          transition: "border-color 0.5s, opacity 0.5s",
        }}
      />

      {/* Center radial glow */}
      <div
        className="absolute inset-[150px] rounded-full"
        style={{
          opacity: hovered ? 1 : 0.5,
          background: "radial-gradient(circle, rgba(229,33,46,0.28) 0%, transparent 70%)",
          transition: "opacity 0.5s",
        }}
      />

      {/* Accent dots — use transform instead of top/left/width/height */}
      {/* Parent is 520×520px; deltas: ~21px = 4% of 520 */}
      <div
        className="absolute rounded-full"
        style={{
          top: "15%",
          left: "20%",
          width: "4px",
          height: "4px",
          backgroundColor: hovered ? "rgba(229,33,46,0.8)" : "rgba(229,33,46,0.4)",
          boxShadow: hovered ? "0 0 8px 2px rgba(229,33,46,0.4)" : "none",
          transform: hovered ? "translate(-21px, -16px) scale(1.5)" : "translate(0, 0) scale(1)",
          transition: "transform 0.5s, background-color 0.5s, box-shadow 0.5s",
          willChange: "transform",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          bottom: "20%",
          right: "18%",
          width: "6px",
          height: "6px",
          backgroundColor: hovered ? "rgba(229,33,46,0.6)" : "rgba(229,33,46,0.3)",
          boxShadow: hovered ? "0 0 10px 3px rgba(229,33,46,0.3)" : "none",
          transform: hovered ? "translate(21px, -21px) scale(1.33)" : "translate(0, 0) scale(1)",
          transition: "transform 0.5s, background-color 0.5s, box-shadow 0.5s",
          willChange: "transform",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          top: "55%",
          left: "8%",
          width: "4px",
          height: "4px",
          backgroundColor: hovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)",
          transform: hovered ? "translateX(-21px)" : "translateX(0)",
          transition: "transform 0.5s, background-color 0.5s",
          willChange: "transform",
        }}
      />
    </div>
  );
}
