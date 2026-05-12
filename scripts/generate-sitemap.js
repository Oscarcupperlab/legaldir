import { createClient } from "@supabase/supabase-js";
import { writeFileSync } from "fs";

const supabase = createClient(
  "https://hlohswdpmjgcfvznyhut.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhsb2hzd2RwbWpnY2Z2em55aHV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0OTY0MjYsImV4cCI6MjA5NDA3MjQyNn0.2ezH87Y2ZDn_lb35JAj89S_68XIJEbGCCWrLZJC0gmw"
);

const BASE_URL = "https://legaldir.vercel.app";
const today = new Date().toISOString().split("T")[0];

const staticRoutes = [
  { url: "/", priority: "1.0", changefreq: "daily" },
  { url: "/directorio", priority: "0.9", changefreq: "daily" },
  { url: "/guias", priority: "0.8", changefreq: "weekly" },
  { url: "/comparar", priority: "0.5", changefreq: "monthly" },
  { url: "/abogados-laborales-madrid", priority: "0.9", changefreq: "weekly" },
  { url: "/abogados-penales-madrid", priority: "0.9", changefreq: "weekly" },
  { url: "/abogados-civiles-madrid", priority: "0.9", changefreq: "weekly" },
  { url: "/abogados-familia-madrid", priority: "0.9", changefreq: "weekly" },
  { url: "/abogados-fiscales-madrid", priority: "0.9", changefreq: "weekly" },
  { url: "/abogados-mercantiles-madrid", priority: "0.9", changefreq: "weekly" },
  { url: "/abogados-inmobiliarios-madrid", priority: "0.9", changefreq: "weekly" },
];

const blogSlugs = [
  "como-elegir-abogado",
  "derechos-laborales-basicos",
  "guia-divorcio",
  "herencias-guia",
];

async function generate() {
  const { data: lawyers } = await supabase
    .from("lawyers")
    .select("slug, created_at")
    .eq("city", "Madrid");

  const lawyerRoutes = (lawyers ?? []).map((l) => ({
    url: `/abogado/${l.slug}`,
    priority: "0.8",
    changefreq: "monthly",
    lastmod: l.created_at?.split("T")[0] ?? today,
  }));

  const guideRoutes = blogSlugs.map((s) => ({
    url: `/guias/${s}`,
    priority: "0.7",
    changefreq: "monthly",
  }));

  const allRoutes = [...staticRoutes, ...lawyerRoutes, ...guideRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (r) => `  <url>
    <loc>${BASE_URL}${r.url}</loc>
    <lastmod>${r.lastmod ?? today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  writeFileSync("public/sitemap.xml", xml);
  console.log(`✅ sitemap.xml generado con ${allRoutes.length} URLs`);
}

generate().catch(console.error);
