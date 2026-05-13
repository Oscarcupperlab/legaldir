import type { Metadata } from "next";
import { HomeClient } from "@/page-components/Home";

export const metadata: Metadata = {
  title: "Directorio de Abogados en Madrid",
  description:
    "Encuentra y compara los mejores abogados en Madrid. Perfiles verificados, valoraciones reales y contacto directo con especialistas en derecho penal, civil, laboral, familia y más.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomeClient />;
}
