"use client";

import React from "react";
import { AuthPage } from "@/components/ui/auth-page";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DemoOne() {
  return (
    <div className="min-h-screen bg-transparent relative flex flex-col">
       <Link 
        href="/pricing" 
        className={cn(
          buttonVariants({ variant: "ghost" }), 
          "absolute top-8 left-8 gap-2 z-50 text-foreground back-btn"
        )}
      >
        <MoveLeft className="w-4 h-4" /> Back to Pricing
      </Link>
      <div className="flex-1 w-full h-full flex items-center justify-center p-4">
          <div className="w-full h-[85vh] max-w-6xl border border-border rounded-3xl overflow-hidden shadow-2xl">
              <AuthPage />
          </div>
      </div>
    </div>
  );
}
