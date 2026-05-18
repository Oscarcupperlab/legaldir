"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Star, ShieldCheck, BadgeCheck, Video, Scale, Eye, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "./WhatsAppButton";
import { AppointmentModal } from "./AppointmentModal";
import { useComparisonStore } from "@/stores/comparison";
import type { Lawyer } from "@/types/lawyer";
import { safeArray } from "@/types/lawyer";
import { cn } from "@/lib/utils";

const tagColors: Record<string, string> = {
  "Respuesta rápida": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "Precio competitivo": "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  "Experto": "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  "Alta valoración": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  "Bufete líder": "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  "Prestigio internacional": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
  "Consulta gratuita": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
};

interface LawyerCardProps {
  lawyer: Lawyer;
  index?: number;
}

export function LawyerCard({ lawyer, index = 0 }: LawyerCardProps) {
  const { addItem, removeItem, isInTray, items } = useComparisonStore();
  const inTray = isInTray(lawyer.id);
  const maxReached = items.length >= 3;
  const tags = safeArray<string>(lawyer.tags).slice(0, 3);
  const initials = lawyer.name.split(" ").slice(0, 2).map((w) => w[0]).join("");

  const toggleCompare = () => {
    if (inTray) removeItem(lawyer.id);
    else if (!maxReached) addItem(lawyer);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        "relative flex items-start gap-4 rounded-xl border bg-card p-4 hover:shadow-lg transition-shadow",
        lawyer.featured && "border-yellow-400 shadow-yellow-100 dark:shadow-yellow-900/20 shadow-md"
      )}
    >
      {lawyer.featured && (
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
          <Sparkles className="h-3 w-3" /> Destacado
        </div>
      )}
      <Avatar className={cn("h-16 w-16 shrink-0 border-2 bg-muted/30", lawyer.featured ? "border-yellow-400" : "border-muted")}>
        <AvatarImage
          src={lawyer.image_url ?? undefined}
          className="object-contain p-1.5"
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = ""; }}
        />
        <AvatarFallback className="text-sm font-semibold bg-primary/10 text-primary">{initials}</AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
          <Badge variant="secondary" className="text-[10px]">{lawyer.specialty}</Badge>
          {lawyer.verified && (
            <span className="flex items-center gap-0.5 text-[10px] text-primary font-semibold">
              <ShieldCheck className="h-3 w-3" /> Verificado
            </span>
          )}
          {lawyer.rating && (
            <span className="flex items-center gap-0.5 text-[10px] font-medium">
              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
              {lawyer.rating.toFixed(1)}
            </span>
          )}
        </div>

        <p className="line-clamp-1 text-sm font-semibold">{lawyer.name}</p>

        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5 flex-wrap">
          {lawyer.city && (
            <span className="flex items-center gap-0.5">
              <MapPin className="h-3 w-3" /> {lawyer.city}
            </span>
          )}
          {lawyer.price_range && <span className="font-medium text-foreground">{lawyer.price_range}</span>}
          {lawyer.years_experience && <span>{lawyer.years_experience} años exp.</span>}
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "text-[10px] font-medium px-1.5 py-0.5 rounded-full",
                  tagColors[tag] ?? "bg-muted text-muted-foreground"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-1 mt-2 flex-wrap">
          {lawyer.free_consultation && (
            <Badge variant="outline" className="text-[10px] gap-0.5">
              <BadgeCheck className="h-3 w-3" /> Gratis
            </Badge>
          )}
          {lawyer.online_available && (
            <Badge variant="outline" className="text-[10px] gap-0.5">
              <Video className="h-3 w-3" /> Online
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-1.5 mt-3 flex-wrap">
          {lawyer.whatsapp && (
            <WhatsAppButton phone={lawyer.whatsapp} lawyerName={lawyer.name} size="sm" />
          )}
          <AppointmentModal lawyerName={lawyer.name} />
          <Button
            size="sm"
            variant="ghost"
            className={cn("h-8 w-8 rounded-lg p-0", inTray && "text-green-600 bg-green-50")}
            onClick={toggleCompare}
            disabled={!inTray && maxReached}
            title={inTray ? "Quitar de comparación" : "Añadir a comparación"}
          >
            <Scale className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 rounded-lg bg-muted p-0" asChild>
            <Link href={`/abogado/${lawyer.slug}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
