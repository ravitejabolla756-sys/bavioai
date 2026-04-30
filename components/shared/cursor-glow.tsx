"use client";

import { useEffect, useState } from "react";

export function CursorGlow() {
  const [position, setPosition] = useState({ x: -400, y: -400 });

  useEffect(() => {
    function onMove(event: MouseEvent) {
      setPosition({ x: event.clientX, y: event.clientY });
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-[1] h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        background: "radial-gradient(circle, rgba(255,107,0,0.05) 0%, rgba(255,107,0,0.02) 32%, transparent 72%)",
        transition: "left 100ms linear, top 100ms linear"
      }}
    />
  );
}
