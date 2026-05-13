"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircle, Pencil, Trash2, Search, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Lawyer } from "@/types/lawyer";

export default function AdminPage() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("lawyers")
      .select("*")
      .eq("city", "Madrid")
      .order("name");
    setLawyers((data ?? []) as Lawyer[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Eliminar a ${name}? Esta acción no se puede deshacer.`)) return;
    setDeleting(id);
    await supabase.from("lawyers").delete().eq("id", id);
    await load();
    setDeleting(null);
  };

  const filtered = lawyers.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.specialty?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Abogados</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{lawyers.length} registrados en Madrid</p>
        </div>
        <Button asChild>
          <Link href="/admin/nuevo">
            <PlusCircle className="h-4 w-4 mr-2" />
            Añadir abogado
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre o especialidad..."
          className="pl-9"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-sm text-muted-foreground py-8">Cargando...</div>
      ) : (
        <div className="rounded-xl border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground">Abogado</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground">Especialidad</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground hidden md:table-cell">Precio</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground hidden lg:table-cell">Contacto</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground">Estado</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((l) => (
                <tr key={l.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border bg-white shrink-0">
                        <AvatarImage src={l.image_url ?? undefined} className="object-contain p-1" />
                        <AvatarFallback className="text-xs">
                          {l.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium leading-tight">{l.name}</p>
                        <p className="text-[11px] text-muted-foreground">{l.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary" className="text-[11px]">{l.specialty}</Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{l.price_range ?? "—"}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="text-[11px] text-muted-foreground space-y-0.5">
                      {l.phone && <p>{l.phone}</p>}
                      {l.email && <p>{l.email}</p>}
                      {!l.phone && !l.email && <p>Sin datos</p>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      {l.verified && (
                        <span className="flex items-center gap-1 text-[11px] text-primary font-medium">
                          <ShieldCheck className="h-3 w-3" /> Verificado
                        </span>
                      )}
                      {l.free_consultation && (
                        <span className="text-[11px] text-emerald-600">Consulta gratis</span>
                      )}
                      {!l.verified && !l.free_consultation && (
                        <span className="text-[11px] text-muted-foreground">—</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0" asChild>
                        <Link href={`/admin/editar/${l.id}`}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(l.id, l.name)}
                        disabled={deleting === l.id}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                    No se encontraron abogados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
