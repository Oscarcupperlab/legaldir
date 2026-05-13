"use client";
import { useRouter } from "next/navigation";
import { Scale, X } from "lucide-react";
import { useComparisonStore } from "@/stores/comparison";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ComparisonTray() {
  const { items, removeItem, clearAll } = useComparisonStore();
  const router = useRouter();

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-16 md:bottom-4 left-1/2 -translate-x-1/2 z-30 bg-card border rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3">
      <Scale className="h-4 w-4 text-primary shrink-0" />
      <div className="flex items-center gap-2">
        {items.map((l) => (
          <div key={l.id} className="relative">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={l.image_url ?? undefined} className="object-contain p-1" />
              <AvatarFallback className="text-xs">
                {l.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <button
              onClick={() => removeItem(l.id)}
              className="absolute -top-1 -right-1 bg-muted rounded-full p-0.5 hover:bg-destructive hover:text-white transition-colors"
            >
              <X className="h-2.5 w-2.5" />
            </button>
          </div>
        ))}
        {Array.from({ length: 3 - items.length }).map((_, i) => (
          <div key={i} className="h-10 w-10 rounded-full border-2 border-dashed border-muted" />
        ))}
      </div>
      <div className="flex items-center gap-2 ml-1">
        <Button size="sm" onClick={() => router.push("/comparar")}>
          Comparar
        </Button>
        <Button size="sm" variant="ghost" onClick={clearAll}>
          Limpiar
        </Button>
      </div>
    </div>
  );
}
