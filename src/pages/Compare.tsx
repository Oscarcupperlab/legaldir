import { Link } from "react-router-dom";
import { Scale } from "lucide-react";
import { useComparisonStore } from "@/stores/comparison";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export function Compare() {
  const { items, removeItem, clearAll } = useComparisonStore();

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <Scale className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h1 className="font-display text-2xl font-bold mb-2">Sin abogados para comparar</h1>
        <p className="text-muted-foreground text-sm mb-6">
          Añade abogados desde el directorio usando el botón de comparar.
        </p>
        <Button asChild>
          <Link to="/directorio">Ir al directorio</Link>
        </Button>
      </div>
    );
  }

  const rows = [
    { label: "Especialidad", key: "specialty" },
    { label: "Ciudad", key: "city" },
    { label: "Precio", key: "price_range" },
    { label: "Años exp.", key: "years_experience" },
    { label: "Consulta gratuita", key: "free_consultation" },
    { label: "Online", key: "online_available" },
    { label: "Presencial", key: "in_person_available" },
  ] as const;

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold">Comparar abogados</h1>
        <Button variant="ghost" onClick={clearAll}>Limpiar todo</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="w-36 p-2" />
              {items.map((l) => (
                <th key={l.id} className="p-3 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar className="h-14 w-14 border-2 border-muted bg-white">
                      <AvatarImage src={l.image_url ?? undefined} className="object-contain p-1" />
                      <AvatarFallback>{l.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm leading-tight">{l.name}</p>
                      {l.rating && (
                        <div className="flex items-center justify-center gap-0.5 mt-0.5">
                          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                          <span className="text-xs">{l.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-1 flex-wrap justify-center">
                      <Button size="sm" variant="ghost" asChild className="text-xs h-7">
                        <Link to={`/abogado/${l.slug}`}>Ver perfil</Link>
                      </Button>
                      <Button size="sm" variant="ghost" className="text-xs h-7" onClick={() => removeItem(l.id)}>
                        Quitar
                      </Button>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ label, key }) => (
              <tr key={key} className="border-t">
                <td className="py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {label}
                </td>
                {items.map((l) => {
                  const val = l[key as keyof typeof l];
                  return (
                    <td key={l.id} className="py-3 px-3 text-center text-sm border-l">
                      {typeof val === "boolean"
                        ? val ? <Badge variant="secondary">Sí</Badge> : <span className="text-muted-foreground">No</span>
                        : val ?? <span className="text-muted-foreground">—</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
