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
        className="w-[520px] h-[520px] rounded-full border border-dashed transition-colors duration-500"
        style={{
          borderColor: hovered ? "rgba(229,33,46,0.5)" : "rgba(229,33,46,0.2)",
          animation: `spin ${hovered ? "6s" : "50s"} linear infinite`,
          transition: "border-color 0.5s, animation-duration 0s",
          willChange: "transform",
        }}
      >
        {/* Dot riding the ring */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500"
          style={{
            width: hovered ? "14px" : "10px",
            height: hovered ? "14px" : "10px",
            backgroundColor: "rgba(229,33,46,0.9)",
            boxShadow: hovered
              ? "0 0 20px 6px rgba(229,33,46,0.7)"
              : "0 0 8px 2px rgba(229,33,46,0.4)",
          }}
        />
      </div>

      {/* Middle ring — counter-rotates on hover */}
      <div
        className="absolute inset-[70px] rounded-full border transition-colors duration-500"
        style={{
          borderColor: hovered ? "rgba(229,33,46,0.25)" : "rgba(229,33,46,0.1)",
          animation: hovered ? "spin 10s linear infinite reverse" : "none",
        }}
      />

      {/* Inner ring — pulses on hover */}
      <div
        className="absolute inset-[130px] rounded-full border transition-all duration-500"
        style={{
          borderColor: hovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)",
          animation: hovered ? "ping 1.5s cubic-bezier(0,0,0.2,1) infinite" : "none",
          opacity: hovered ? 0.6 : 1,
        }}
      />

      {/* Center radial glow */}
      <div
        className="absolute inset-[150px] rounded-full transition-all duration-500"
        style={{
          background: hovered
            ? "radial-gradient(circle, rgba(229,33,46,0.28) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(229,33,46,0.14) 0%, transparent 70%)",
        }}
      />

      {/* Accent dots — spread out on hover */}
      <div
        className="absolute rounded-full transition-all duration-500"
        style={{
          top: hovered ? "12%" : "15%",
          left: hovered ? "16%" : "20%",
          width: hovered ? "6px" : "4px",
          height: hovered ? "6px" : "4px",
          backgroundColor: hovered ? "rgba(229,33,46,0.8)" : "rgba(229,33,46,0.4)",
          boxShadow: hovered ? "0 0 8px 2px rgba(229,33,46,0.4)" : "none",
        }}
      />
      <div
        className="absolute rounded-full transition-all duration-500"
        style={{
          bottom: hovered ? "16%" : "20%",
          right: hovered ? "14%" : "18%",
          width: hovered ? "8px" : "6px",
          height: hovered ? "8px" : "6px",
          backgroundColor: hovered ? "rgba(229,33,46,0.6)" : "rgba(229,33,46,0.3)",
          boxShadow: hovered ? "0 0 10px 3px rgba(229,33,46,0.3)" : "none",
        }}
      />
      <div
        className="absolute rounded-full transition-all duration-500"
        style={{
          top: "55%",
          left: hovered ? "4%" : "8%",
          width: "4px",
          height: "4px",
          backgroundColor: hovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)",
        }}
      />
    </div>
  );
}
