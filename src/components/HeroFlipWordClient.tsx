"use client";

import dynamic from "next/dynamic";

const HeroFlipWord = dynamic(() => import("./HeroFlipWord"), { ssr: false });

export default function HeroFlipWordClient() {
  return <HeroFlipWord />;
}
