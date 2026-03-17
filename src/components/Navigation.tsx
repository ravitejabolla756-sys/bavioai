"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Activity, Server, FileText, Building2 } from "lucide-react";

import { NavBar } from "@/components/ui/tubelight-navbar";
import { AuthModal } from "@/components/ui/auth-modal";
import { SlidingTextButton } from "@/components/ui/sliding-text-button";

const links = [
  { name: "Use Cases", href: "/use-cases" },
  { name: "Pricing", href: "/pricing" },
  { name: "Docs", href: "/docs" },
  { name: "Company", href: "/company" },
];

const navItems = [
  { name: "Use Cases", url: "/use-cases", icon: Activity },
  { name: "Pricing", url: "/pricing", icon: Server },
  { name: "Docs", url: "/docs", icon: FileText },
  { name: "Company", url: "/company", icon: Building2 },
];

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [defaultToSignUp, setDefaultToSignUp] = useState(false);

  const openAuthModal = (isSignUp: boolean) => {
    setDefaultToSignUp(isSignUp);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-out border-b transform-gpu ${
        scrolled 
          ? "bg-[#050505]/60 backdrop-blur-md border-white/[0.05] py-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)]" 
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold tracking-tight text-white flex items-center gap-3 group">
          <Image 
            src="/logo.png" 
            alt="Bavio AI Logo" 
            width={64} 
            height={64} 
            className="w-12 h-12 object-contain dark:invert" 
          />
          Bavio AI
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavBar items={navItems} />
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => openAuthModal(false)}
            className="text-sm font-medium px-4 py-2 text-zinc-300 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            Log in
          </button>
          
          <SlidingTextButton
            onClick={() => openAuthModal(true)}
            variant="primary"
            hoverText="Join Bavio AI"
            className="px-6 py-2.5 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
          >
            Sign Up
          </SlidingTextButton>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.05] border border-white/[0.05]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#050505]/95 backdrop-blur-sm border-b border-white/[0.05] py-6 px-6 flex flex-col gap-6 shadow-2xl">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                prefetch={true}
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-400 hover:text-white font-medium text-lg px-2 rounded-lg transition-colors"
                style={{ color: pathname === link.href ? "white" : undefined }}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-6 border-t border-white/[0.05] flex flex-col gap-4">
            <SlidingTextButton
              onClick={() => openAuthModal(false)}
              variant="outline"
              hoverText="Log in"
              className="py-3 rounded-xl"
            >
              Log in
            </SlidingTextButton>
            <SlidingTextButton
              onClick={() => openAuthModal(true)}
              variant="primary"
              hoverText="Get Started Now"
              className="py-4 rounded-xl font-bold shadow-lg"
            >
              Sign Up
            </SlidingTextButton>
          </div>
        </div>
      )}

      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        defaultIsSignUp={defaultToSignUp} 
      />
    </header>
  );
}
