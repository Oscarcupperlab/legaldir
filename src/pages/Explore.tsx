import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { LawyerCard } from "@/components/explore/LawyerCard";
import { useLawyers, useDebounce } from "@/hooks/use-lawyers";
import { safeArray } from "@/types/lawyer";

const specialties = [
  "Penal", "Civil", "Laboral", "Familia", "Fiscal",
  "Inmobiliario", "Mercantil", "Propiedad Intelectual",
];

const priceOptions = [
  { value: "all", label: "Todos los precios" },
  { value: "bajo", label: "Hasta €80/h" },
  { value: "medio", label: "€80-150/h" },
  { value: "alto", label: "Más de €150/h" },
];

export function Explore() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [specialty, setSpecialty] = useState(searchParams.get("especialidad") ?? "all");
  const [price, setPrice] = useState("all");
  const [freeConsultation, setFreeConsultation] = useState(false);
  const [onlineAvailable, setOnlineAvailable] = useState(false);
  const [inPersonAvailable, setInPersonAvailable] = useState(false);

  const dSearch = useDebounce(search);
  const { data: lawyers = [], isLoading } = useLawyers();

  const filtered = useMemo(() => {
    const q = dSearch.toLowerCase();
    return lawyers.filter((l) => {
      if (specialty !== "all" && l.specialty !== specialty) return false;
      if (freeConsultation && !l.free_consultation) return false;
      if (onlineAvailable && !l.online_available) return false;
      if (inPersonAvailable && !l.in_person_available) return false;
      if (price !== "all") {
        const pr = l.price_range ?? "";
        if (price === "bajo" && !pr.includes("80") && !pr.includes("60") && !pr.includes("70") && !pr.includes("50")) return false;
      }
      if (q) {
        const fields = [l.name, l.specialty, l.city, l.description, ...safeArray<string>(l.tags)].join(" ").toLowerCase();
        if (!fields.includes(q)) return false;
      }
      return true;
    });
  }, [lawyers, dSearch, specialty, price, freeConsultation, onlineAvailable, inPersonAvailable]);

  const activeFiltersCount = [
    specialty !== "all", price !== "all",
    freeConsultation, onlineAvailable, inPersonAvailable,
  ].filter(Boolean).length;

  const FilterControls = () => (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wide">Especialidad</p>
        <Select value={specialty} onValueChange={setSpecialty}>
          <SelectTrigger><SelectValue placeholder="Todas" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las especialidades</SelectItem>
            {specialties.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <p className="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wide">Precio</p>
        <Select value={price} onValueChange={setPrice}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {priceOptions.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Disponibilidad</p>
        {[
          { label: "✅ Consulta gratuita", value: freeConsultation, setter: setFreeConsultation },
          { label: "💻 Online", value: onlineAvailable, setter: setOnlineAvailable },
          { label: "🏢 Presencial", value: inPersonAvailable, setter: setInPersonAvailable },
        ].map(({ label, value, setter }) => (
          <div key={label} className="flex items-center justify-between">
            <span className="text-sm">{label}</span>
            <Switch checked={value} onCheckedChange={setter} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold">Abogados en Madrid</h1>
        <p className="text-muted-foreground mt-1 text-sm">{filtered.length} abogados encontrados</p>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Busca por nombre, especialidad, ciudad..."
          className="pl-9"
        />
      </div>

      <div className="flex gap-6">
        {/* Sidebar desktop */}
        <aside className="hidden md:block w-64 shrink-0 sticky top-20 self-start rounded-xl border bg-card p-5 space-y-4">
          <FilterControls />
        </aside>

        {/* Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-48 rounded-xl" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p>No se encontraron abogados. Prueba ajustando los filtros.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filtered.map((l, i) => (
                <LawyerCard key={l.id} lawyer={l} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter button */}
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            className="md:hidden fixed bottom-20 right-4 z-30 shadow-lg rounded-full gap-2"
            size="default"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtros{activeFiltersCount > 0 && ` (${activeFiltersCount})`}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Filtrar abogados</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-8">
            <FilterControls />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
