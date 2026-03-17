import Link from "next/link";
import { LocationTag } from "@/components/ui/location-tag";

export function Footer() {
  const columns = [
    {
      title: "Product",
      links: [
        { name: "Voice Agents", href: "/product#agents" },
        { name: "Real-Time API", href: "/docs#api" },
        { name: "Workflow Automation", href: "/product#workflows" },
        { name: "Analytics", href: "/product#analytics" },
      ],
    },
    {
      title: "Use Cases",
      links: [
        { name: "Healthcare", href: "/use-cases#healthcare" },
        { name: "Real Estate", href: "/use-cases#real-estate" },
        { name: "Restaurants", href: "/use-cases#restaurants" },
        { name: "Customer Support", href: "/use-cases#customer-support" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/docs" },
        { name: "API Reference", href: "/docs/api-reference" },
        { name: "Voice Library", href: "/product#voices" },
        { name: "Pricing", href: "/pricing" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/company" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="border-t border-white/[0.05] pt-24 pb-12 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#7B61FF]/5 rounded-[100%] blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay -z-20 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 lg:gap-8 mb-20">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-tight text-white flex items-center gap-2 mb-6 group">
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-[#7B61FF] to-[#9B8CFF] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-white/20 group-hover:translate-y-full transition-transform duration-500 ease-in-out" />
                <span className="text-white text-sm font-black relative z-10">B</span>
              </div>
              Bavio
            </Link>
            <p className="text-zinc-400 text-sm max-w-xs font-light leading-relaxed mb-6">
              Enterprise-grade AI voice agents. Answer calls, extract intent, and automate workflows in real-time.
            </p>
            <LocationTag city="San Francisco" country="USA" timezone="PST" />
          </div>
          
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-semibold text-zinc-100 mb-6 tracking-tight">{col.title}</h3>
              <ul className="flex flex-col gap-4 text-sm font-light">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      prefetch={true}
                      className="text-zinc-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-zinc-600 text-sm font-light">
            © {new Date().getFullYear()} Bavio Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6 md:gap-8 text-sm font-light">
            <Link href="#" className="text-zinc-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-zinc-500 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-zinc-500 hover:text-white transition-colors">
              Twitter (X)
            </Link>
            <Link href="#" className="text-zinc-500 hover:text-white transition-colors">
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
