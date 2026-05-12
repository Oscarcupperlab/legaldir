import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { blogPosts, blogCategories } from "@/data/blog-posts";
import { cn } from "@/lib/utils";
import { SEO } from "@/components/SEO";

export function Guides() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = blogPosts.filter((p) => {
    const q = query.toLowerCase();
    if (activeCategory && p.category !== activeCategory) return false;
    if (q && !p.title.toLowerCase().includes(q) && !p.excerpt.toLowerCase().includes(q)) return false;
    return true;
  });

  return (
    <>
      <SEO
        title="Guías Legales en Madrid"
        description="Guías prácticas de derecho en español. Aprende sobre tus derechos laborales, cómo hacer un divorcio, herencias, contratos y más. Escritas por abogados en Madrid."
        canonical="/guias"
      />
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1400&q=60')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-background/85" />
        <div className="relative container text-center py-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold mb-3"
          >
            Guías legales
          </motion.h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Artículos y guías prácticas redactados por expertos para ayudarte a entender el sistema legal español.
          </p>
        </div>
      </section>

      <div className="container py-10">
        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar guías..."
            className="pl-9"
          />
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium border transition-colors",
              !activeCategory ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-accent"
            )}
          >
            Todos
          </button>
          {blogCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium border transition-colors",
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card hover:bg-accent"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">
            No se encontraron resultados. Prueba con otro término o categoría.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
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
                    <span className="inline-block bg-accent text-accent-foreground text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full mb-2">
                      {post.category}
                    </span>
                    <p className="text-xs text-muted-foreground mb-2">{post.date} · {post.readTime}</p>
                    <h3 className="font-semibold text-sm leading-snug line-clamp-2 mb-1">{post.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
