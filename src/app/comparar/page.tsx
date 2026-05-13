import type { Metadata } from "next";
import { Compare } from "@/page-components/Compare";

export const metadata: Metadata = {
  title: "Comparar Abogados",
  description: "Compara hasta 3 abogados de Madrid lado a lado. Analiza experiencia, precios, especialidades y valoraciones.",
  alternates: { canonical: "/comparar" },
};

export default function Page() {
  return <Compare />;
}
