"use client";
import Link from "next/link";
export function NotFound() {
  return (
    <div className="container py-20 text-center">
      <h1 className="font-display text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">Página no encontrada</p>
      <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity">
        Volver al inicio
      </Link>
    </div>
  );
}
