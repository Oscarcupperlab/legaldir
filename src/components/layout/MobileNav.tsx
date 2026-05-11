import { Link, useLocation } from "react-router-dom";
import { Home, Search, Users, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/directorio", label: "Buscar", icon: Search },
  { to: "/comunidad", label: "Comunidad", icon: Users },
  { to: "/guias", label: "Guías", icon: BookOpen },
];

export function MobileNav() {
  const { pathname } = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t">
      <div className="grid grid-cols-4">
        {items.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              "flex flex-col items-center gap-1 py-2 text-[10px] font-medium transition-colors",
              pathname === to ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
