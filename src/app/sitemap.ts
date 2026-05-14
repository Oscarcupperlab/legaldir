import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { blogPosts } from "@/data/blog-posts";
import { allEspecialidadSlugs } from "@/lib/especialidades";

const BASE_URL = "https://legaldir.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: lawyers } = await supabase
    .from("lawyers")
    .select("slug, created_at")
    .eq("city", "Madrid");

  const lawyerRoutes: MetadataRoute.Sitemap = (lawyers ?? []).map((l) => ({
    url: `${BASE_URL}/abogado/${l.slug}`,
    lastModified: new Date(l.created_at),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const guideRoutes: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${BASE_URL}/guias/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const especialidadRoutes: MetadataRoute.Sitemap = allEspecialidadSlugs.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    { url: BASE_URL, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/directorio`, changeFrequency: "daily", priority: 0.9 },
    ...especialidadRoutes,
    { url: `${BASE_URL}/guias`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/comparar`, changeFrequency: "monthly", priority: 0.5 },
    ...lawyerRoutes,
    ...guideRoutes,
  ];
}
