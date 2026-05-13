import type { Metadata } from "next";
import { Community } from "@/page-components/Community";

export const metadata: Metadata = {
  title: "Comunidad",
  description: "Foro y comunidad de LegalDir Madrid. Próximamente.",
  alternates: { canonical: "/comunidad" },
};

export default function Page() {
  return <Community />;
}
