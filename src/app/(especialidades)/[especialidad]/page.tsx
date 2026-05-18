import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { ChevronRight, Scale, Users, Star } from "lucide-react";
import { especialidades, allEspecialidadSlugs } from "@/lib/especialidades";
import { LawyersGrid } from "./LawyersGrid";
import type { Lawyer } from "@/types/lawyer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function generateStaticParams() {
  return allEspecialidadSlugs.map((especialidad) => ({ especialidad }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ especialidad: string }>;
}): Promise<Metadata> {
  const { especialidad } = await params;
  const config = especialidades[especialidad];
  if (!config) return { title: "No encontrado" };

  return {
    title: config.title,
    description: config.description,
    alternates: { canonical: `/${especialidad}` },
    openGraph: {
      title: config.title,
      description: config.description,
      url: `https://legaldir.es/${especialidad}`,
      siteName: "LegalDir",
      locale: "es_ES",
      type: "website",
    },
  };
}

export default async function EspecialidadPage({
  params,
}: {
  params: Promise<{ especialidad: string }>;
}) {
  const { especialidad } = await params;
  const config = especialidades[especialidad];
  if (!config) notFound();

  const { data: lawyers } = await supabase
    .from("lawyers")
    .select("*")
    .eq("city", "Madrid")
    .eq("specialty", config.specialty)
    .order("featured", { ascending: false })
    .order("verified", { ascending: false })
    .order("years_experience", { ascending: false });

  const lawyerList = (lawyers ?? []) as Lawyer[];

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: config.h1,
    description: config.description,
    url: `https://legaldir.es/${especialidad}`,
    numberOfItems: lawyerList.length,
    itemListElement: lawyerList.slice(0, 10).map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "LegalService",
        name: l.name,
        url: `https://legaldir.es/abogado/${l.slug}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Madrid",
          addressCountry: "ES",
        },
        ...(l.phone ? { telephone: l.phone } : {}),
        ...(l.description ? { description: l.description } : {}),
      },
    })),
  };

  const relatedConfigs = config.related
    .map((slug) => especialidades[slug])
    .filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Inicio</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/directorio" className="hover:text-foreground transition-colors">Directorio</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">{config.h1}</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-10">
          {/* Hero */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                Madrid
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {config.h1}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {config.intro}
            </p>
            <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
              {config.longIntro}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mt-6">
              <div className="flex items-center gap-2 text-sm">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{lawyerList.length} despachos</p>
                  <p className="text-xs text-muted-foreground">listados en Madrid</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Star className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{lawyerList.filter((l) => l.verified).length} verificados</p>
                  <p className="text-xs text-muted-foreground">por el equipo LegalDir</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Scale className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{lawyerList.filter((l) => l.free_consultation).length} consulta gratis</p>
                  <p className="text-xs text-muted-foreground">primera consulta sin cargo</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
            {/* Lawyers list */}
            <div className="xl:col-span-2">
              <h2 className="text-xl font-semibold mb-5">
                {lawyerList.length > 0
                  ? `${lawyerList.length} abogados especialistas en ${config.specialty.toLowerCase()} en Madrid`
                  : "Abogados disponibles"}
              </h2>
              <LawyersGrid lawyers={lawyerList} />
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* FAQ */}
              <div className="rounded-2xl border bg-card p-6">
                <h2 className="font-bold text-base mb-4">Preguntas frecuentes</h2>
                <div className="space-y-4">
                  {config.faq.map((item, i) => (
                    <details key={i} className="group">
                      <summary className="text-sm font-medium cursor-pointer list-none flex items-start gap-2 hover:text-primary transition-colors">
                        <ChevronRight className="h-4 w-4 mt-0.5 shrink-0 group-open:rotate-90 transition-transform" />
                        {item.q}
                      </summary>
                      <p className="text-sm text-muted-foreground mt-2 ml-6 leading-relaxed">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>

              {/* Related specialties */}
              {relatedConfigs.length > 0 && (
                <div className="rounded-2xl border bg-card p-6">
                  <h2 className="font-bold text-base mb-4">Especialidades relacionadas</h2>
                  <div className="space-y-2">
                    {relatedConfigs.map((rel) => (
                      <Link
                        key={rel.slug}
                        href={`/${rel.slug}`}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                      >
                        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                        {rel.h1}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6 text-center">
                <Scale className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-sm mb-2">¿Eres abogado {config.specialty.toLowerCase()}?</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Añade tu despacho gratis y llega a miles de clientes potenciales en Madrid cada mes.
                </p>
                <Link
                  href="/directorio"
                  className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 hover:bg-primary/90 transition-colors"
                >
                  Ver todos los abogados
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
