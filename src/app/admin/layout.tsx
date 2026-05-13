"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gavel, Users, PlusCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ADMIN_PASSWORD = "legaldir2026";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("admin-auth") === "ok";
  });
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  const pathname = usePathname();

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin-auth", "ok");
      setAuthed(true);
    } else {
      setError(true);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("admin-auth");
    setAuthed(false);
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="w-full max-w-sm rounded-2xl border bg-card p-8 shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <Gavel className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">LegalDir Admin</span>
          </div>
          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Contraseña</label>
              <Input
                type="password"
                value={pass}
                onChange={(e) => { setPass(e.target.value); setError(false); }}
                placeholder="••••••••••"
                autoFocus
              />
              {error && <p className="text-xs text-destructive mt-1">Contraseña incorrecta</p>}
            </div>
            <Button type="submit" className="w-full">Entrar</Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r bg-card flex flex-col">
        <div className="p-4 border-b flex items-center gap-2">
          <Gavel className="h-5 w-5 text-primary" />
          <span className="font-bold text-sm">LegalDir Admin</span>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {[
            { href: "/admin", label: "Abogados", icon: Users },
            { href: "/admin/nuevo", label: "Añadir abogado", icon: PlusCircle },
          ].map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t">
          <button
            onClick={logout}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors w-full px-3 py-2 rounded-lg hover:bg-accent"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto bg-muted/20">
        {children}
      </main>
    </div>
  );
}
