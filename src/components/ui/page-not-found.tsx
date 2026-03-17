"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MoveLeft, Home } from "lucide-react";

// Combined component for 404 page
export default function NotFoundPage() {
  return (
    <div className="w-full h-screen bg-black overflow-hidden flex justify-center items-center relative">
      <MessageDisplay />
      <CharactersAnimation />
      <CircleAnimation />
    </div>
  );
}

// 1. Message Display Component
function MessageDisplay() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute flex flex-col justify-center items-center w-[90%] h-[90%] z-[100] pointer-events-none">
      <div 
        className={`flex flex-col items-center transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        } pointer-events-auto`}
      >
        <div className="text-[35px] font-semibold text-white mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          Page Not Found
        </div>
        <div className="text-[120px] font-black text-white leading-none tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
          404
        </div>
        <div className="text-zinc-400 text-center max-w-md mt-6 text-lg leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </div>
        <div className="flex gap-6 mt-12">
          <button
            onClick={() => router.back()}
            className="group text-white border border-white/20 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 ease-in-out px-8 py-3 rounded-full text-base font-medium flex items-center gap-2 hover:scale-105 active:scale-95 backdrop-blur-sm"
          >
            <MoveLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            Go Back
          </button>
          <button
            onClick={() => router.push("/")}
            className="group bg-white text-black hover:bg-zinc-200 transition-all duration-300 ease-in-out px-8 py-3 rounded-full text-base font-medium flex items-center gap-2 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <Home className="w-5 h-5 transition-transform group-hover:scale-110" />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

// 2. Characters Animation Component
type StickFigure = {
  top?: string;
  bottom?: string;
  src: string;
  transform?: string;
  speedX: number;
  speedRotation?: number;
};

function CharactersAnimation() {
  const charactersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Define stick figures with their properties
    const stickFigures: StickFigure[] = [
      {
        top: '10%',
        src: 'https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick0.svg',
        transform: 'rotateZ(-90deg)',
        speedX: 5000,
      },
      {
        top: '20%',
        src: 'https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick1.svg',
        speedX: 8000,
        speedRotation: 4000,
      },
      {
        top: '40%',
        src: 'https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick2.svg',
        speedX: 12000,
        speedRotation: 3000,
      },
      {
        top: '60%',
        src: 'https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick0.svg',
        speedX: 6000,
        speedRotation: 5000,
      },
      {
        top: '80%',
        src: 'https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick0.svg',
        speedX: 10000,
        speedRotation: 2000,
      },
      {
        bottom: '10%',
        src: 'https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick3.svg',
        speedX: 0, 
      },
    ];

    if (!charactersRef.current) return;
    const container = charactersRef.current;
    container.innerHTML = '';

    const createCharacter = (figure: StickFigure, index: number) => {
      const stick = document.createElement('img');
      stick.style.position = 'absolute';
      stick.style.width = '120px';
      stick.style.height = '120px';
      stick.style.opacity = '0.3';
      stick.style.filter = 'invert(1) drop-shadow(0 0 5px rgba(255,255,255,0.2))';

      if (figure.top) stick.style.top = figure.top;
      if (figure.bottom) stick.style.bottom = figure.bottom;
      
      stick.src = figure.src;
      if (figure.transform) stick.style.transform = figure.transform;

      container.appendChild(stick);

      if (index === 5) {
        stick.style.left = '50%';
        stick.style.transform = 'translateX(-50%)';
        return;
      }

      // Horizontal movement
      stick.animate(
        [{ left: '110%' }, { left: '-20%' }],
        { 
          duration: figure.speedX, 
          easing: 'linear', 
          iterations: Infinity 
        }
      );

      // Rotation
      if (figure.speedRotation) {
        stick.animate(
          [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-360deg)' }],
          { 
            duration: figure.speedRotation, 
            iterations: Infinity, 
            easing: 'linear' 
          }
        );
      }
    };

    stickFigures.forEach(createCharacter);

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return (
    <div
      ref={charactersRef}
      className="absolute inset-0 pointer-events-none overflow-hidden opacity-50"
    />
  );
}

// 3. Circle Animation Component
interface Circulo {
  x: number;
  y: number;
  size: number;
}

function CircleAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestIdRef = useRef<number>(0);
  const timerRef = useRef(0);
  const circulosRef = useRef<Circulo[]>([]);

  const initArr = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    circulosRef.current = [];
    for (let index = 0; index < 150; index++) {
      const randomX = Math.floor(
        Math.random() * ((canvas.width * 2) - (canvas.width * 1.1) + 1)
      ) + (canvas.width * 1.1);
      
      const randomY = Math.floor(
        Math.random() * (canvas.height + 100)
      ) - 50;
      
      const size = (Math.random() * 2) + 1;
      circulosRef.current.push({ x: randomX, y: randomY, size });
    }
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    timerRef.current++;
    context.setTransform(1, 0, 0, 1, 0, 0);
    
    const distanceX = canvas.width / 120;
    const growthRate = 0.01;
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'rgba(255, 255, 255, 0.15)';
    
    circulosRef.current.forEach((circulo) => {
      context.beginPath();
      
      if (timerRef.current < 100) {
        circulo.x -= distanceX;
        circulo.size += growthRate;
      } else {
        circulo.x -= (distanceX * 0.1);
        circulo.size += (growthRate * 0.1);
      }
      
      context.arc(circulo.x, circulo.y, circulo.size, 0, Math.PI * 2);
      context.fill();
    });
    
    if (timerRef.current > 1000) {
      timerRef.current = 0;
      initArr();
    }
    
    requestIdRef.current = requestAnimationFrame(draw);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initArr();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    draw();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40" />;
}
