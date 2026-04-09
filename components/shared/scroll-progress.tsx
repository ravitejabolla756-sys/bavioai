"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height <= 0 ? 0 : (window.scrollY / height) * 100);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[120] h-[2px] w-full bg-transparent">
      <div
        className="h-full bg-primary shadow-[0_0_18px_rgba(123,47,190,0.9)] transition-[width] duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
