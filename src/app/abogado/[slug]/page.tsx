import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { LawyerPageClient } from "./LawyerPageClient";
import type { Lawyer, SuccessCase } from "@/types/lawyer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Pre-generate all lawyer profile pages at build time
export async function generateStaticParams() {
  const { data } = await supabase
    .from("lawyers")
    .select("slug")
    .eq("city", "Madrid");
  return (data ?? []).map((l: { slug: string }) => ({ slug: l.slug }));
}

// Generate unique meta tags per lawyer
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: lawyer } = await supabase
    .from("lawyers")
    .select("name, specialty, description, image_url")
    .eq("slug", slug)
    .single();

  if (!lawyer) return { title: "Abogado no encontrado" };

  return {
    title: `${lawyer.name} — Abogado en Madrid`,
    description:
      lawyer.description ??
      `Perfil de ${lawyer.name}, abogado especialista en ${lawyer.specialty ?? "derecho"} en Madrid. Valoraciones, experiencia y contacto directo.`,
    alternates: { canonical: `/abogado/${slug}` },
    openGraph: {
      images: lawyer.image_url ? [lawyer.image_url] : [],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: lawyer } = await supabase
    .from("lawyers")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!lawyer) notFound();

  const { data: cases } = await supabase
    .from("success_cases")
    .select("*")
    .eq("lawyer_id", (lawyer as Lawyer).id)
    .order("year", { ascending: false });

  return (
    <LawyerPageClient
      lawyer={lawyer as Lawyer}
      cases={(cases ?? []) as SuccessCase[]}
    />
  );
}
