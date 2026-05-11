import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, TrendingUp, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LawyerCard } from "@/components/explore/LawyerCard";
import { useLawyers } from "@/hooks/use-lawyers";
import { blogPosts } from "@/data/blog-posts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const specialties = [
  "Penal", "Civil", "Laboral", "Familia", "Fiscal",
  "Inmobiliario", "Mercantil", "Propiedad Intelectual",
];

export function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [onboarded, setOnboarded] = useState(true);
  const { data: lawyers = [], isLoading } = useLawyers();

  useEffect(() => {
    if (!localStorage.getItem("legaldir-onboarded")) {
      setOnboarded(false);
    }
  }, []);

  const handleOnboard = () => {
    localStorage.setItem("legaldir-onboarded", "true");
    setOnboarded(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/directorio${query ? `?q=${encodeURIComponent(query)}` : ""}`);
  };

  const topLawyers = lawyers.slice(0, 6);
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <>
      {/* Onboarding modal */}
      <Dialog open={!onboarded} onOpenChange={(o) => !o && handleOnboard()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¡Bienvenido a LegalDir!</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>LegalDir es el directorio profesional de abogados en España. Aquí puedes:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Buscar abogados por especialidad, ciudad y precio.</li>
              <li>Comparar hasta 3 abogados lado a lado.</li>
              <li>Contactar directamente por WhatsApp o agendando una cita.</li>
              <li>Leer guías legales escritas por expertos.</li>
            </ul>
          </div>
          <Button onClick={handleOnboard} className="w-full mt-2">
            Empezar a explorar
          </Button>
        </DialogContent>
      </Dialog>

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1400&q=60')] bg-cover bg-center opacity-10" />
        <div className="relative container text-center py-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-7xl font-bold tracking-tight mb-4"
          >
            Encuentra al abogado<br className="hidden md:block" /> ideal para ti
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8"
          >
            Compara perfiles, lee valoraciones y contacta directamente. LegalDir te ayuda a decidir.
          </motion.p>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSearch}
            className="relative max-w-xl mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Busca por especialidad, nombre o ciudad..."
              className="rounded-full h-14 pl-12 pr-32 text-base shadow-lg border-0 bg-card"
            />
            <Button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-10"
            >
              Buscar
            </Button>
          </motion.form>
        </div>
      </section>

      {/* Specialties */}
      <section className="container py-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-2xl font-bold mb-6 text-center"
        >
          ¿Qué necesitas?
        </motion.h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {specialties.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to={`/directorio?especialidad=${encodeURIComponent(s)}`}
                className="rounded-full border bg-card px-4 py-2 text-sm font-medium hover:bg-accent hover:shadow-md transition-all"
              >
                {s}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Top lawyers */}
      <section className="container py-4">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="font-display text-2xl font-bold">Mejor valorados</h2>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-xl" />
            ))}
          </div>
        ) : topLawyers.length === 0 ? (
          <p className="text-muted-foreground text-sm">Aún no hay abogados registrados.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topLawyers.map((l, i) => (
              <LawyerCard key={l.id} lawyer={l} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Blog */}
      <section className="container py-14">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="font-display text-2xl font-bold">Desde el blog</h2>
          </div>
          <Link to="/guias" className="text-sm text-primary hover:underline">
            Ver todas →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/guias/${post.slug}`}
                className="group block rounded-xl border bg-card overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-primary">
                    {post.category}
                  </span>
                  <p className="text-xs text-muted-foreground mt-0.5 mb-2">{post.date}</p>
                  <h3 className="font-semibold text-sm leading-snug line-clamp-2">{post.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
