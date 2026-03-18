"use client";

import { type ReactNode } from "react";

interface Props {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export default function ScrollLink({ href, className, children, onClick }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(null, "", href);
      }
      onClick?.();
    }
  };

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
