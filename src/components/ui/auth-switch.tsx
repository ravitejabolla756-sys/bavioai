"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";

export const AuthSwitch = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("flex flex-col items-center gap-6 p-8 rounded-2xl border border-border bg-card text-card-foreground shadow-xl shadow-primary/5 max-w-sm w-full mx-auto")}>
      <h1 className="text-3xl font-bold mb-2 tracking-tight">Component Example</h1>
      <div className="flex items-center justify-center bg-muted/50 w-32 h-32 rounded-full mb-4">
        <h2 className="text-6xl font-black text-primary">{count}</h2>
      </div>
      <div className="flex gap-4 w-full">
        <button 
          onClick={() => setCount((prev) => prev - 1)}
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "flex-1 text-2xl")}
        >
          -
        </button>
        <button 
          onClick={() => setCount((prev) => prev + 1)}
          className={cn(buttonVariants({ variant: "default", size: "lg" }), "flex-1 text-2xl")}
        >
          +
        </button>
      </div>
    </div>
  );
};
