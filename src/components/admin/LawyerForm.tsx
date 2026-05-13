"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import type { Lawyer } from "@/types/lawyer";

const specialties = [
  "Penal", "Civil", "Laboral", "Familia", "Fiscal",
  "Inmobiliario", "Mercantil", "Propiedad Intelectual",
  "Administrativo", "Extranjería", "Contencioso", "Tráfico",
];

function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

type FormData = {
  name: string; slug: string; specialty: string; description: string;
  city: string; phone: string; email: string; website: string; whatsapp: string;
  price_range: string; years_experience: string; schedule: string;
  image_url: string; tags: string; languages: string;
  free_consultation: boolean; online_available: boolean;
  in_person_available: boolean; verified: boolean;
};

const empty: FormData = {
  name: "", slug: "", specialty: "Civil", description: "", city: "Madrid",
  phone: "", email: "", website: "", whatsapp: "", price_range: "",
  years_experience: "", schedule: "", image_url: "", tags: "", languages: "Español",
  free_consultation: false, online_available: false, in_person_available: true, verified: false,
};

// ── Shared field components (defined OUTSIDE to avoid "component created during render") ──

function FieldWrapper({ label, id, required, children }: {
  label: string; id: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium mb-1.5 block">
        {label}{required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function TextInput({ id, placeholder, value, onChange, type = "text" }: {
  id: string; placeholder?: string; value: string;
  onChange: (v: string) => void; type?: string;
}) {
  return (
    <Input
      id={id} type={type} placeholder={placeholder} value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function ToggleRow({ label, checked, onChange }: {
  label: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm">{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  initial?: Lawyer;
  mode: "create" | "edit";
}

export function LawyerForm({ initial, mode }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<FormData>(() => {
    if (!initial) return empty;
    return {
      name: initial.name ?? "",
      slug: initial.slug ?? "",
      specialty: initial.specialty ?? "Civil",
      description: initial.description ?? "",
      city: initial.city ?? "Madrid",
      phone: initial.phone ?? "",
      email: initial.email ?? "",
      website: initial.website ?? "",
      whatsapp: initial.whatsapp ?? "",
      price_range: initial.price_range ?? "",
      years_experience: initial.years_experience?.toString() ?? "",
      schedule: initial.schedule ?? "",
      image_url: initial.image_url ?? "",
      tags: Array.isArray(initial.tags) ? initial.tags.join(", ") : "",
      languages: Array.isArray(initial.languages) ? initial.languages.join(", ") : "Español",
      free_consultation: initial.free_consultation ?? false,
      online_available: initial.online_available ?? false,
      in_person_available: initial.in_person_available ?? true,
      verified: initial.verified ?? false,
    };
  });

  const set = (key: keyof FormData, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleNameChange = (value: string) => {
    set("name", value);
    if (mode === "create") set("slug", slugify(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.name.trim()) { setError("El nombre es obligatorio"); return; }
    if (!form.slug.trim()) { setError("El slug es obligatorio"); return; }
    setSaving(true);

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      specialty: form.specialty,
      description: form.description || null,
      city: form.city || "Madrid",
      phone: form.phone || null,
      email: form.email || null,
      website: form.website || null,
      whatsapp: form.whatsapp || null,
      price_range: form.price_range || null,
      years_experience: form.years_experience ? parseInt(form.years_experience) : null,
      schedule: form.schedule || null,
      image_url: form.image_url || null,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      languages: form.languages ? form.languages.split(",").map((l) => l.trim()).filter(Boolean) : ["Español"],
      free_consultation: form.free_consultation,
      online_available: form.online_available,
      in_person_available: form.in_person_available,
      verified: form.verified,
    };

    let err;
    if (mode === "create") {
      ({ error: err } = await supabase.from("lawyers").insert(payload));
    } else {
      ({ error: err } = await supabase.from("lawyers").update(payload).eq("id", initial!.id));
    }

    setSaving(false);
    if (err) { setError(err.message); return; }
    router.push("/admin");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Datos básicos */}
      <section className="rounded-xl border bg-card p-5 space-y-4">
        <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Datos básicos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldWrapper label="Nombre completo / Bufete" id="name" required>
            <TextInput id="name" placeholder="Ej: María Carmona Abogados" value={form.name} onChange={handleNameChange} />
          </FieldWrapper>
          <FieldWrapper label="Slug (URL)" id="slug" required>
            <TextInput id="slug" placeholder="maria-carmona-abogados" value={form.slug} onChange={(v) => set("slug", v)} />
          </FieldWrapper>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldWrapper label="Especialidad" id="specialty" required>
            <Select value={form.specialty} onValueChange={(v) => set("specialty", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {specialties.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </FieldWrapper>
          <FieldWrapper label="Ciudad" id="city">
            <TextInput id="city" value={form.city} onChange={(v) => set("city", v)} />
          </FieldWrapper>
        </div>
        <FieldWrapper label="Descripción" id="description">
          <textarea
            id="description" rows={3} value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Breve descripción del despacho o abogado..."
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
          />
        </FieldWrapper>
      </section>

      {/* Contacto */}
      <section className="rounded-xl border bg-card p-5 space-y-4">
        <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Contacto</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldWrapper label="Teléfono" id="phone">
            <TextInput id="phone" placeholder="+34 91 000 00 00" value={form.phone} onChange={(v) => set("phone", v)} />
          </FieldWrapper>
          <FieldWrapper label="WhatsApp" id="whatsapp">
            <TextInput id="whatsapp" placeholder="+34 600 000 000" value={form.whatsapp} onChange={(v) => set("whatsapp", v)} />
          </FieldWrapper>
          <FieldWrapper label="Email" id="email">
            <TextInput id="email" type="email" placeholder="info@bufete.com" value={form.email} onChange={(v) => set("email", v)} />
          </FieldWrapper>
          <FieldWrapper label="Web" id="website">
            <TextInput id="website" placeholder="https://bufete.com" value={form.website} onChange={(v) => set("website", v)} />
          </FieldWrapper>
        </div>
        <FieldWrapper label="Horario" id="schedule">
          <TextInput id="schedule" placeholder="Lun–Vie 9:00–18:00" value={form.schedule} onChange={(v) => set("schedule", v)} />
        </FieldWrapper>
      </section>

      {/* Perfil */}
      <section className="rounded-xl border bg-card p-5 space-y-4">
        <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Perfil</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldWrapper label="Precio" id="price_range">
            <TextInput id="price_range" placeholder="Desde €80/h" value={form.price_range} onChange={(v) => set("price_range", v)} />
          </FieldWrapper>
          <FieldWrapper label="Años de experiencia" id="years_experience">
            <TextInput id="years_experience" type="number" placeholder="15" value={form.years_experience} onChange={(v) => set("years_experience", v)} />
          </FieldWrapper>
        </div>
        <FieldWrapper label="URL logo / foto" id="image_url">
          <TextInput id="image_url" placeholder="https://..." value={form.image_url} onChange={(v) => set("image_url", v)} />
          {form.image_url && (
            <img src={form.image_url} alt="preview" className="mt-2 h-16 object-contain border rounded-lg bg-white p-1" />
          )}
        </FieldWrapper>
        <FieldWrapper label="Tags (separados por coma)" id="tags">
          <TextInput id="tags" placeholder="Respuesta rápida, Consulta gratuita, Experto" value={form.tags} onChange={(v) => set("tags", v)} />
          <p className="text-[11px] text-muted-foreground mt-1">
            Opciones: Respuesta rápida · Precio competitivo · Experto · Alta valoración · Bufete líder · Prestigio internacional · Consulta gratuita
          </p>
        </FieldWrapper>
        <FieldWrapper label="Idiomas (separados por coma)" id="languages">
          <TextInput id="languages" placeholder="Español, Inglés" value={form.languages} onChange={(v) => set("languages", v)} />
        </FieldWrapper>
      </section>

      {/* Opciones */}
      <section className="rounded-xl border bg-card p-5 space-y-1">
        <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2">Opciones</h2>
        <ToggleRow label="✅ Consulta gratuita" checked={form.free_consultation} onChange={(v) => set("free_consultation", v)} />
        <ToggleRow label="💻 Disponible online" checked={form.online_available} onChange={(v) => set("online_available", v)} />
        <ToggleRow label="🏢 Atención presencial" checked={form.in_person_available} onChange={(v) => set("in_person_available", v)} />
        <ToggleRow label="🛡️ Perfil verificado" checked={form.verified} onChange={(v) => set("verified", v)} />
      </section>

      {/* Actions */}
      <div className="flex items-center gap-3 justify-end">
        <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
          Cancelar
        </Button>
        <Button type="submit" disabled={saving} className="min-w-32">
          {saving ? "Guardando..." : mode === "create" ? "Crear abogado" : "Guardar cambios"}
        </Button>
      </div>
    </form>
  );
}
