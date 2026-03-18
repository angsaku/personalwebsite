"use client";

import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return null;
}
