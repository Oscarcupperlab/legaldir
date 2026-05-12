import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
}

const SITE_NAME = "LegalDir Madrid";
const BASE_URL = "https://legaldir.vercel.app";
const DEFAULT_DESC =
  "Directorio de abogados en Madrid. Encuentra, compara y contacta con el mejor abogado para tu caso. Perfiles verificados, valoraciones reales y contacto directo.";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

export function SEO({ title, description, canonical, image }: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Directorio de Abogados en Madrid`;
  const desc = description ?? DEFAULT_DESC;
  const url = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
  const img = image ?? DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />

      {/* Extra SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="es" />
      <meta name="geo.region" content="ES-MD" />
      <meta name="geo.placename" content="Madrid" />
    </Helmet>
  );
}
