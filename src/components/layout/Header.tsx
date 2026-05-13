"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gavel, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/directorio", label: "Directorio" },
  { to: "/comunidad", label: "Comunidad" },
  { to: "/guias", label: "Guías" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card/80 backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-primary">
          <Gavel className="h-5 w-5" />
          <span className="text-lg font-bold">LegalDir</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                pathname === link.to
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile search icon */}
        <Link href="/directorio" className="md:hidden p-2 rounded-md hover:bg-accent">
          <Search className="h-5 w-5" />
        </Link>
      </div>
    </header>
  );
}
