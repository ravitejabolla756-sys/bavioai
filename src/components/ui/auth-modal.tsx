"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { AuthPage } from "@/components/ui/auth-page";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultIsSignUp?: boolean;
}

export function AuthModal({ isOpen, onClose, defaultIsSignUp = true }: AuthModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-12">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md" 
        onClick={onClose} 
      />
      
      {/* Modal Container */}
      <div 
        className="relative bg-[#050505] w-full max-w-5xl rounded-3xl shadow-2xl flex border border-white/[0.08] overflow-hidden z-10 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <AuthPage isLoginDefault={!defaultIsSignUp} />
      </div>
    </div>,
    document.body
  );
}
