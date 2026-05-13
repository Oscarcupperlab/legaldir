import type { Metadata } from "next";
import { Suspense } from "react";
import { Explore } from "@/page-components/Explore";

export const metadata: Metadata = {
  title: "Abogados en Madrid",
  description:
    "Directorio completo de abogados en Madrid. Filtra por especialidad, precio y disponibilidad. Encuentra al abogado ideal para tu caso en segundos.",
  alternates: { canonical: "/directorio" },
};

export default function Page() {
  return (
    <Suspense>
      <Explore />
    </Suspense>
  );
}
