"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle2, X } from "lucide-react";

// Columns accepted (map from possible header names → internal key)
const COLUMN_MAP: Record<string, string> = {
  name: "name", nombre: "name",
  slug: "slug",
  specialty: "specialty", especialidad: "specialty",
  description: "description", descripcion: "description", descripción: "description",
  city: "city", ciudad: "city",
  phone: "phone", telefono: "phone", teléfono: "phone",
  email: "email",
  website: "website", web: "website",
  whatsapp: "whatsapp",
  price_range: "price_range", precio: "price_range",
  years_experience: "years_experience", experiencia: "years_experience", años_experiencia: "years_experience",
  schedule: "schedule", horario: "schedule",
  image_url: "image_url", imagen: "image_url",
  tags: "tags",
  languages: "languages", idiomas: "languages",
  free_consultation: "free_consultation", consulta_gratuita: "free_consultation",
  online_available: "online_available", online: "online_available",
  in_person_available: "in_person_available", presencial: "in_person_available",
  verified: "verified", verificado: "verified",
};

function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function parseBool(v: unknown): boolean {
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v !== 0;
  const s = String(v).toLowerCase().trim();
  return s === "true" || s === "1" || s === "si" || s === "sí" || s === "yes";
}

type RawRow = Record<string, unknown>;

interface ParsedLawyer {
  name: string;
  slug: string;
  specialty: string;
  description: string | null;
  city: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  whatsapp: string | null;
  price_range: string | null;
  years_experience: number | null;
  schedule: string | null;
  image_url: string | null;
  tags: string[];
  languages: string[];
  free_consultation: boolean;
  online_available: boolean;
  in_person_available: boolean;
  verified: boolean;
}

type RowStatus = "pending" | "ok" | "error" | "duplicate";

interface PreviewRow {
  data: ParsedLawyer;
  status: RowStatus;
  message?: string;
}

function normalizeRow(raw: RawRow): ParsedLawyer {
  // Normalise keys
  const row: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(raw)) {
    const mapped = COLUMN_MAP[k.toLowerCase().trim().replace(/\s+/g, "_")];
    if (mapped) row[mapped] = v;
  }

  const name = String(row.name ?? "").trim();
  const slug = String(row.slug ?? "").trim() || slugify(name);

  return {
    name,
    slug,
    specialty: String(row.specialty ?? "Civil").trim(),
    description: row.description ? String(row.description).trim() : null,
    city: String(row.city ?? "Madrid").trim() || "Madrid",
    phone: row.phone ? String(row.phone).trim() : null,
    email: row.email ? String(row.email).trim() : null,
    website: row.website ? String(row.website).trim() : null,
    whatsapp: row.whatsapp ? String(row.whatsapp).trim() : null,
    price_range: row.price_range ? String(row.price_range).trim() : null,
    years_experience: row.years_experience ? parseInt(String(row.years_experience)) || null : null,
    schedule: row.schedule ? String(row.schedule).trim() : null,
    image_url: row.image_url ? String(row.image_url).trim() : null,
    tags: row.tags ? String(row.tags).split(",").map((t) => t.trim()).filter(Boolean) : [],
    languages: row.languages ? String(row.languages).split(",").map((l) => l.trim()).filter(Boolean) : ["Español"],
    free_consultation: parseBool(row.free_consultation),
    online_available: parseBool(row.online_available),
    in_person_available: row.in_person_available !== undefined ? parseBool(row.in_person_available) : true,
    verified: parseBool(row.verified),
  };
}

function parseFile(file: File): Promise<RawRow[]> {
  return new Promise((resolve, reject) => {
    const ext = file.name.split(".").pop()?.toLowerCase();

    if (ext === "csv") {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => resolve(results.data as RawRow[]),
        error: reject,
      });
    } else if (ext === "xlsx" || ext === "xls") {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const wb = XLSX.read(e.target?.result, { type: "binary" });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const data = XLSX.utils.sheet_to_json<RawRow>(ws, { defval: "" });
          resolve(data);
        } catch (err) {
          reject(err);
        }
      };
      reader.readAsBinaryString(file);
    } else {
      reject(new Error("Formato no soportado. Usa .csv, .xlsx o .xls"));
    }
  });
}

export default function ImportarPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [rows, setRows] = useState<PreviewRow[]>([]);
  const [importing, setImporting] = useState(false);
  const [done, setDone] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setParseError(null);
    setDone(false);
    try {
      const raw = await parseFile(file);
      const preview: PreviewRow[] = raw.map((r) => {
        const data = normalizeRow(r);
        if (!data.name) return { data, status: "error", message: "Falta el nombre" };
        return { data, status: "pending" };
      });
      // Mark duplicates by slug within the file
      const slugsSeen = new Set<string>();
      for (const row of preview) {
        if (row.status === "error") continue;
        if (slugsSeen.has(row.data.slug)) {
          row.status = "duplicate";
          row.message = "Slug duplicado en el archivo";
        } else {
          slugsSeen.add(row.data.slug);
        }
      }
      setRows(preview);
    } catch (err) {
      setParseError(err instanceof Error ? err.message : "Error al leer el archivo");
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const removeRow = (i: number) => setRows((prev) => prev.filter((_, idx) => idx !== i));

  const validRows = rows.filter((r) => r.status === "pending");

  const handleImport = async () => {
    if (validRows.length === 0) return;
    setImporting(true);

    const toInsert = validRows.map((r) => r.data);
    const CHUNK = 50;
    const updated = [...rows];

    for (let i = 0; i < toInsert.length; i += CHUNK) {
      const chunk = toInsert.slice(i, i + CHUNK);
      const { error } = await supabase.from("lawyers").upsert(chunk, {
        onConflict: "slug",
        ignoreDuplicates: false,
      });

      chunk.forEach((item) => {
        const idx = updated.findIndex((r) => r.data.slug === item.slug && r.status === "pending");
        if (idx !== -1) {
          if (error) {
            updated[idx] = { ...updated[idx], status: "error", message: error.message };
          } else {
            updated[idx] = { ...updated[idx], status: "ok" };
          }
        }
      });
      setRows([...updated]);
    }

    setImporting(false);
    setDone(true);
  };

  const okCount = rows.filter((r) => r.status === "ok").length;
  const errCount = rows.filter((r) => r.status === "error" || r.status === "duplicate").length;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Importar abogados</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Sube un archivo CSV o Excel con los datos. Se aceptan cabeceras en español e inglés.
        </p>
      </div>

      {/* Template download hint */}
      <div className="rounded-xl border bg-card p-4 mb-6 text-sm text-muted-foreground">
        <p className="font-medium text-foreground mb-1">Columnas aceptadas</p>
        <p className="font-mono text-xs leading-relaxed break-all">
          name · slug · specialty · description · city · phone · email · website · whatsapp ·
          price_range · years_experience · schedule · image_url · tags · languages ·
          free_consultation · online_available · in_person_available · verified
        </p>
        <p className="mt-2 text-xs">
          También se aceptan en español: <span className="font-mono">nombre, especialidad, ciudad, teléfono, precio, horario, idiomas, verificado…</span>
          <br />
          Los booleanos pueden ser: <span className="font-mono">true/false, 1/0, si/no, yes/no</span>.
          Tags e idiomas separados por coma.
        </p>
      </div>

      {/* Drop zone */}
      {rows.length === 0 && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
            dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30"
          }`}
        >
          <FileSpreadsheet className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
          <p className="font-medium">Arrastra tu archivo aquí o haz clic para seleccionar</p>
          <p className="text-sm text-muted-foreground mt-1">CSV, XLSX o XLS · Sin límite de filas</p>
          <input
            ref={inputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            className="hidden"
            onChange={onInputChange}
          />
        </div>
      )}

      {parseError && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {parseError}
        </div>
      )}

      {/* Preview table */}
      {rows.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground">{rows.length} filas leídas</span>
              {validRows.length > 0 && (
                <span className="text-emerald-600 font-medium">{validRows.length} listas para importar</span>
              )}
              {errCount > 0 && (
                <span className="text-destructive font-medium">{errCount} con errores</span>
              )}
              {okCount > 0 && (
                <span className="text-primary font-medium">{okCount} importadas ✓</span>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => { setRows([]); setDone(false); }}
            >
              Cargar otro archivo
            </Button>
          </div>

          <div className="rounded-xl border bg-card overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="border-b bg-muted/40">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-muted-foreground w-8"></th>
                    <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Nombre</th>
                    <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Slug</th>
                    <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Especialidad</th>
                    <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Ciudad</th>
                    <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Teléfono</th>
                    <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Email</th>
                    <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Estado</th>
                    <th className="px-3 py-2 w-8"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {rows.map((row, i) => (
                    <tr
                      key={i}
                      className={
                        row.status === "ok"
                          ? "bg-emerald-50/50"
                          : row.status === "error" || row.status === "duplicate"
                          ? "bg-destructive/5"
                          : "hover:bg-muted/20"
                      }
                    >
                      <td className="px-3 py-2 text-center text-muted-foreground">{i + 1}</td>
                      <td className="px-3 py-2 font-medium max-w-[160px] truncate">{row.data.name || "—"}</td>
                      <td className="px-3 py-2 text-muted-foreground max-w-[140px] truncate font-mono">{row.data.slug || "—"}</td>
                      <td className="px-3 py-2">{row.data.specialty}</td>
                      <td className="px-3 py-2">{row.data.city}</td>
                      <td className="px-3 py-2 text-muted-foreground">{row.data.phone ?? "—"}</td>
                      <td className="px-3 py-2 text-muted-foreground max-w-[160px] truncate">{row.data.email ?? "—"}</td>
                      <td className="px-3 py-2">
                        {row.status === "ok" && (
                          <span className="flex items-center gap-1 text-emerald-600 font-medium">
                            <CheckCircle2 className="h-3 w-3" /> Importada
                          </span>
                        )}
                        {row.status === "pending" && (
                          <span className="text-muted-foreground">Lista</span>
                        )}
                        {(row.status === "error" || row.status === "duplicate") && (
                          <span className="flex items-center gap-1 text-destructive">
                            <AlertCircle className="h-3 w-3" />
                            {row.message ?? "Error"}
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2">
                        {row.status !== "ok" && (
                          <button
                            onClick={() => removeRow(i)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Actions */}
          {!done ? (
            <div className="flex items-center gap-3 justify-end">
              <Button variant="outline" onClick={() => router.push("/admin")}>
                Cancelar
              </Button>
              <Button
                onClick={handleImport}
                disabled={importing || validRows.length === 0}
                className="min-w-44"
              >
                {importing
                  ? "Importando..."
                  : `Importar ${validRows.length} abogado${validRows.length !== 1 ? "s" : ""}`}
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3 justify-end">
              <div className="text-sm text-emerald-600 font-medium">
                ✓ {okCount} abogado{okCount !== 1 ? "s" : ""} importado{okCount !== 1 ? "s" : ""} correctamente
              </div>
              <Button onClick={() => router.push("/admin")}>
                Ver directorio
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
