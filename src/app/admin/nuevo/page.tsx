import { LawyerForm } from "@/components/admin/LawyerForm";

export default function NuevoPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Añadir abogado</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Rellena el formulario para añadir un nuevo abogado al directorio.
        </p>
      </div>
      <LawyerForm mode="create" />
    </div>
  );
}
