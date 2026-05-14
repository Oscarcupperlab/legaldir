"use client";
import { LawyerCard } from "@/components/explore/LawyerCard";
import type { Lawyer } from "@/types/lawyer";

export function LawyersGrid({ lawyers }: { lawyers: Lawyer[] }) {
  if (lawyers.length === 0) {
    return (
      <p className="text-muted-foreground text-sm py-8 text-center">
        No hay abogados disponibles en esta especialidad todavía.
      </p>
    );
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {lawyers.map((l, i) => (
        <LawyerCard key={l.id} lawyer={l} index={i} />
      ))}
    </div>
  );
}
