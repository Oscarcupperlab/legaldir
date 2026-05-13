"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import { LawyerForm } from "@/components/admin/LawyerForm";
import type { Lawyer } from "@/types/lawyer";

export default function EditarPage() {
  const { id } = useParams<{ id: string }>();
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("lawyers")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        setLawyer(data as Lawyer);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-sm text-muted-foreground">Cargando...</div>
      </div>
    );
  }

  if (!lawyer) {
    return (
      <div className="p-6">
        <div className="text-sm text-destructive">Abogado no encontrado</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Editar abogado</h1>
        <p className="text-sm text-muted-foreground mt-0.5">{lawyer.name}</p>
      </div>
      <LawyerForm mode="edit" initial={lawyer} />
    </div>
  );
}
