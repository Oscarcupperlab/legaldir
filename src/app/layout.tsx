import type { Metadata } from "next";
import { Providers } from "./providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { ComparisonTray } from "@/components/layout/ComparisonTray";
import "./globals.css";

const BASE_URL = "https://legaldir.vercel.app";
const SITE_NAME = "LegalDir Madrid";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${SITE_NAME} — Directorio de Abogados en Madrid`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Directorio de abogados en Madrid. Encuentra, compara y contacta con el mejor abogado para tu caso. Perfiles verificados, valoraciones reales y contacto directo.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "es_ES",
    images: [`${BASE_URL}/og-image.png`],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  other: {
    "geo.region": "ES-MD",
    "geo.placename": "Madrid",
    language: "es",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pb-16 md:pb-0">{children}</main>
            <Footer />
            <MobileNav />
            <ComparisonTray />
          </div>
        </Providers>
      </body>
    </html>
  );
}
