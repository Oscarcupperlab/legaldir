import type { Metadata } from "next";
import { Guides } from "@/page-components/Guides";

export const metadata: Metadata = {
  title: "Guías Legales en Madrid",
  description:
    "Guías prácticas de derecho en español. Aprende sobre tus derechos laborales, cómo hacer un divorcio, herencias, contratos y más. Escritas por expertos legales en Madrid.",
  alternates: { canonical: "/guias" },
};

export default function Page() {
  return <Guides />;
}
