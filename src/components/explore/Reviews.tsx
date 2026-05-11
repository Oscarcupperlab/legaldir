import { useState } from "react";
import { Star } from "lucide-react";
import { useReviews, useAddReview } from "@/hooks/use-lawyers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ReviewsProps {
  lawyerId: string;
  lawyerName: string;
}

export function Reviews({ lawyerId, lawyerName }: ReviewsProps) {
  const { data: reviews = [] } = useReviews(lawyerId);
  const addReview = useAddReview();
  const [form, setForm] = useState({ author_name: "", rating: 0, comment: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.rating) return;
    addReview.mutate({ lawyer_id: lawyerId, ...form });
    setForm({ author_name: "", rating: 0, comment: "" });
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-bold">Valoraciones</h2>

      {/* Add review form */}
      <div className="border rounded-xl p-4 bg-card">
        <h3 className="font-semibold mb-3 text-sm">Deja tu valoración de {lawyerName}</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            placeholder="Tu nombre"
            required
            value={form.author_name}
            onChange={(e) => setForm({ ...form, author_name: e.target.value })}
          />
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })}>
                <Star
                  className={cn(
                    "h-6 w-6 transition-colors",
                    n <= form.rating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"
                  )}
                />
              </button>
            ))}
          </div>
          <Textarea
            placeholder="Comparte tu experiencia..."
            rows={3}
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
          />
          <Button type="submit" size="sm" disabled={!form.rating || addReview.isPending}>
            Enviar reseña
          </Button>
        </form>
      </div>

      {/* Reviews list */}
      <div className="space-y-4">
        {reviews.length === 0 && (
          <p className="text-sm text-muted-foreground">Aún no hay valoraciones. ¡Sé el primero!</p>
        )}
        {reviews.map((r: any) => (
          <div key={r.id} className="border rounded-xl p-4 bg-card">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm">{r.author_name}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(r.created_at).toLocaleDateString("es-ES")}
              </span>
            </div>
            <div className="flex items-center gap-0.5 mb-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  className={cn(
                    "h-3.5 w-3.5",
                    n <= r.rating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"
                  )}
                />
              ))}
            </div>
            {r.comment && <p className="text-sm text-muted-foreground">{r.comment}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
