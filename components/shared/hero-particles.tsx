"use client";

import { useEffect, useRef } from "react";

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasElement = canvas;

    const context = canvasElement.getContext("2d");
    if (!context) return;
    const ctx = context;

    let width = 0;
    let height = 0;
    let frame = 0;
    let interval = 0;

    const particles = Array.from({ length: 38 }, (_, index) => ({
      x: (index * 97) % 1000,
      y: (index * 151) % 700,
      radius: 1 + (index % 3),
      alpha: 0.28 + (index % 4) * 0.08
    }));

    function resize() {
      width = canvasElement.clientWidth;
      height = canvasElement.clientHeight;
      canvasElement.width = Math.floor(width * window.devicePixelRatio);
      canvasElement.height = Math.floor(height * window.devicePixelRatio);
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    }

    function draw() {
      frame += 1;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        const x = (particle.x / 1000) * width;
        const y = (particle.y / 700) * height;
        const pulse = particle.alpha + Math.sin(frame * 0.45 + index) * 0.08;

        ctx.beginPath();
        ctx.arc(x, y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${Math.max(0.12, pulse)})`;
        ctx.shadowColor = "rgba(139, 92, 246, 0.5)";
        ctx.shadowBlur = 10;
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      for (let index = 0; index < particles.length - 1; index += 3) {
        const start = particles[index];
        const end = particles[index + 1];
        ctx.beginPath();
        ctx.moveTo((start.x / 1000) * width, (start.y / 700) * height);
        ctx.lineTo((end.x / 1000) * width, (end.y / 700) * height);
        ctx.strokeStyle = "rgba(139, 92, 246, 0.12)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    resize();
    draw();
    interval = window.setInterval(draw, 250);
    window.addEventListener("resize", resize);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full opacity-70" aria-hidden="true" />;
}
