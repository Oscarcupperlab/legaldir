import Link from "next/link";
import { Gavel } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card mt-16">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 text-primary font-bold mb-3">
              <Gavel className="h-5 w-5" />
              <span>LegalDir</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              El directorio profesional de abogados en Madrid. Encuentra, compara y contacta con el mejor abogado para tu caso.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-sm">Secciones</h3>
            <ul className="space-y-2">
              {[
                { to: "/directorio", label: "Directorio" },
                { to: "/comunidad", label: "Comunidad" },
                { to: "/guias", label: "Guías legales" },
                { to: "/comparar", label: "Comparar abogados" },
              ].map((l) => (
                <li key={l.to}>
                  <Link href={l.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-sm">Legal</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              LegalDir es un directorio informativo. No prestamos asesoramiento jurídico directamente. La información contenida en este sitio no constituye consejo legal. Consulta siempre con un abogado colegiado para tu caso concreto.
            </p>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} LegalDir. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
