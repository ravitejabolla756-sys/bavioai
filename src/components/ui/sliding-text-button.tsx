"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"

interface SlidingTextButtonProps {
  children: React.ReactNode
  hoverText?: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: "primary" | "secondary" | "outline" | "ghost"
}

export function SlidingTextButton({
  children,
  hoverText,
  onClick,
  className,
  variant = "primary",
}: SlidingTextButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const variants = {
    primary: "bg-white text-[#050505] hover:bg-zinc-100",
    secondary: "bg-[#7B61FF] text-white hover:bg-[#6b51ef]",
    outline: "border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white",
    ghost: "text-zinc-300 hover:text-white",
  }

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={cn(
        "group relative flex items-center justify-center overflow-hidden transition-all duration-500 cursor-pointer",
        variants[variant],
        className
      )}
    >
      <div className="relative flex flex-col items-center justify-center h-full w-full">
        {/* Original Text */}
        <span
          className="transition-all duration-500 ease-out"
          style={{
            transform: isHovered ? "translateY(-150%)" : "translateY(0)",
            opacity: isHovered ? 0 : 1,
          }}
        >
          {children}
        </span>

        {/* Hover Text */}
        <span
          className="absolute transition-all duration-500 ease-out text-center w-full"
          style={{
            transform: isHovered ? "translateY(0)" : "translateY(150%)",
            opacity: isHovered ? 1 : 0,
          }}
        >
          {hoverText || children}
        </span>
      </div>
      
      {/* Optional line/glow animation */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-current transition-all duration-500 group-hover:w-full opacity-30" />
    </button>
  )
}
