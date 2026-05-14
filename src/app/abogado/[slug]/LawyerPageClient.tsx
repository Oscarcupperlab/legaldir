"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, MapPin, Star, ShieldCheck, Briefcase,
  MessageSquare, Globe, BadgeCheck, Video, Trophy,
  Phone, Mail, Clock, Scale,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/explore/WhatsAppButton";
import { AppointmentModal } from "@/components/explore/AppointmentModal";
import { Reviews } from "@/components/explore/Reviews";
import { useComparisonStore } from "@/stores/comparison";
import type { Lawyer, SuccessCase } from "@/types/lawyer";
import { safeArray } from "@/types/lawyer";
import { cn } from "@/lib/utils";

const tagColors: Record<string, string> = {
  "Respuesta rápida": "bg-blue-100 text-blue-700",
  "Precio competitivo": "bg-green-100 text-green-700",
  "Experto": "bg-purple-100 text-purple-700",
  "Alta valoración": "bg-yellow-100 text-yellow-700",
  "Bufete líder": "bg-orange-100 text-orange-700",
  "Prestigio internacional": "bg-indigo-100 text-indigo-700",
  "Consulta gratuita": "bg-emerald-100 text-emerald-700",
};

interface Props {
  lawyer: Lawyer;
  cases: SuccessCase[];
}

export function LawyerPageClient({ lawyer, cases }: Props) {
  const { addItem, removeItem, isInTray, items } = useComparisonStore();
  const inTray = isInTray(lawyer.id);
  const maxReached = items.length >= 3;
  const tags = safeArray<string>(lawyer.tags);
  const languages = safeArray<string>(lawyer.languages);
  const rating = lawyer.rating ?? 0;
  const stars = Math.round(rating);

  const toggleCompare = () => {
    if (inTray) removeItem(lawyer.id);
    else if (!maxReached) addItem(lawyer);
  };

  return (
    <div className="container py-8">
      <Link
        href="/directorio"
        className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Volver
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10"
      >
        {/* Photo */}
        <div className="aspect-[4/3] rounded-2xl border bg-muted/30 flex items-center justify-center overflow-hidden">
          {lawyer.image_url ? (
            <img
              src={lawyer.image_url}
              alt={lawyer.name}
              className="w-full h-full object-contain p-6"
              onError={(e) => {
                const el = e.currentTarget;
                el.style.display = "none";
                el.parentElement!.innerHTML = `<span class="text-4xl font-bold text-primary/30">${lawyer.name.split(" ").slice(0,2).map((w: string) => w[0]).join("")}</span>`;
              }}
            />
          ) : (
            <span className="text-4xl font-bold text-primary/30">
              {lawyer.name.split(" ").slice(0,2).map((w) => w[0]).join("")}
            </span>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge variant="secondary">{lawyer.specialty}</Badge>
            {lawyer.verified && (
              <span className="flex items-center gap-1 text-xs text-primary font-semibold">
                <ShieldCheck className="h-4 w-4" /> Verificado
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl font-bold mb-2">{lawyer.name}</h1>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3 flex-wrap">
            {lawyer.city && (
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {lawyer.city}
                {lawyer.province && lawyer.province !== lawyer.city && `, ${lawyer.province}`}
              </span>
            )}
          </div>

          {lawyer.price_range && (
            <p className="text-lg font-semibold text-primary mb-3">{lawyer.price_range}</p>
          )}

          {lawyer.rating && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    className={cn(
                      "h-5 w-5",
                      n <= stars ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"
                    )}
                  />
                ))}
              </div>
              <span className="font-semibold">{rating.toFixed(1)}</span>
              {lawyer.review_count && (
                <span className="text-sm text-muted-foreground">({lawyer.review_count} reseñas)</span>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="rounded-lg border bg-card p-3 text-center">
              <Briefcase className="h-4 w-4 mx-auto mb-1 text-primary" />
              <p className="font-bold text-sm">{lawyer.years_experience ?? "—"}</p>
              <p className="text-[10px] text-muted-foreground">Años exp.</p>
            </div>
            <div className="rounded-lg border bg-card p-3 text-center">
              <MessageSquare className="h-4 w-4 mx-auto mb-1 text-primary" />
              <p className="font-bold text-sm">{lawyer.review_count ?? 0}</p>
              <p className="text-[10px] text-muted-foreground">Reseñas</p>
            </div>
            <div className="rounded-lg border bg-card p-3 text-center">
              <Globe className="h-4 w-4 mx-auto mb-1 text-primary" />
              <p className="font-bold text-sm">{languages.length || "—"}</p>
              <p className="text-[10px] text-muted-foreground">Idiomas</p>
            </div>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "text-xs font-medium px-2 py-1 rounded-full",
                    tagColors[tag] ?? "bg-muted text-muted-foreground"
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            {lawyer.free_consultation && (
              <Badge variant="outline" className="gap-1">
                <BadgeCheck className="h-3.5 w-3.5" /> Consulta gratuita
              </Badge>
            )}
            {lawyer.online_available && (
              <Badge variant="outline" className="gap-1">
                <Video className="h-3.5 w-3.5" /> Online
              </Badge>
            )}
            {lawyer.in_person_available && (
              <Badge variant="outline" className="gap-1">
                <MapPin className="h-3.5 w-3.5" /> Presencial
              </Badge>
            )}
          </div>

          {lawyer.description && (
            <p className="text-sm leading-relaxed text-muted-foreground mb-4">
              {lawyer.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            {lawyer.whatsapp && (
              <WhatsAppButton phone={lawyer.whatsapp} lawyerName={lawyer.name} size="default" />
            )}
            <AppointmentModal lawyerName={lawyer.name} />
            <Button
              variant={inTray ? "secondary" : "outline"}
              onClick={toggleCompare}
              disabled={!inTray && maxReached}
              className="gap-2"
            >
              <Scale className="h-4 w-4" />
              {inTray ? "En comparación" : "Comparar"}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Success cases */}
      {cases.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-5 w-5 text-primary" />
            <h2 className="font-display text-xl font-bold">Casos de éxito</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cases.map((c) => (
              <div key={c.id} className="border rounded-xl p-4 bg-card">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-sm">{c.title}</h3>
                  {c.year && <Badge variant="secondary">{c.year}</Badge>}
                </div>
                {c.description && (
                  <p className="text-sm text-muted-foreground">{c.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="mb-10">
        <h2 className="font-display text-xl font-bold mb-4">Contacto</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Phone, label: "Teléfono", value: lawyer.phone, href: lawyer.phone ? `tel:${lawyer.phone}` : null },
            { icon: Mail, label: "Email", value: lawyer.email, href: lawyer.email ? `mailto:${lawyer.email}` : null },
            { icon: Globe, label: "Web", value: lawyer.website, href: lawyer.website },
            { icon: Clock, label: "Horario", value: lawyer.schedule, href: null },
          ]
            .filter((i) => i.value)
            .map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="rounded-xl border bg-card p-4 hover:shadow-md transition-shadow"
              >
                <Icon className="h-4 w-4 text-primary mb-2" />
                <p className="text-[10px] text-muted-foreground uppercase font-semibold mb-0.5">{label}</p>
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-xs font-medium break-all text-primary hover:underline">
                    {value}
                  </a>
                ) : (
                  <p className="text-xs font-medium break-all">{value}</p>
                )}
              </div>
            ))}
        </div>
      </section>

      {/* Languages */}
      {languages.length > 0 && (
        <section className="mb-10">
          <h2 className="font-display text-xl font-bold mb-3">Idiomas</h2>
          <div className="flex flex-wrap gap-2">
            {languages.map((l) => (
              <Badge key={l} variant="secondary">{l}</Badge>
            ))}
          </div>
        </section>
      )}

      {/* Reviews */}
      <Reviews lawyerId={lawyer.id} lawyerName={lawyer.name} />
    </div>
  );
}
