"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./Navigation";

export function NavigationController() {
  const pathname = usePathname();
  
  // Hide global navbar on docs pages to allow for docs-specific header
  if (pathname?.startsWith("/docs")) {
    return null;
  }

  return <Navigation />;
}
