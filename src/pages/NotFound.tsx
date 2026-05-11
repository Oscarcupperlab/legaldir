import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <div className="container py-24 text-center">
      <p className="text-8xl font-bold text-muted-foreground/20 mb-4">404</p>
      <h1 className="font-display text-3xl font-bold mb-2">Página no encontrada</h1>
      <p className="text-muted-foreground mb-8">La página que buscas no existe o ha sido movida.</p>
      <Button asChild>
        <Link to="/">Volver al inicio</Link>
      </Button>
    </div>
  );
}
