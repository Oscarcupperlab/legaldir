"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { blogPosts, blogCategories } from "@/data/blog-posts";
import { cn } from "@/lib/utils";

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
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1400&q=60')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-background/85" />
        <div className="relative container text-center py-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl font-bold mb-3"
          >
            Guías Legales
          </motion.h1>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            Artículos prácticos escritos por expertos para ayudarte a entender tus derechos y cómo actuar.
          </p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Busca guías..."
              className="pl-9 rounded-full bg-card"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <div className="container py-6">
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              !activeCategory ? "bg-primary text-primary-foreground" : "border hover:bg-accent"
            )}
          >
            Todas
          </button>
          {blogCategories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c === activeCategory ? null : c)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                activeCategory === c ? "bg-primary text-primary-foreground" : "border hover:bg-accent"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/guias/${post.slug}`}
                className="group block rounded-xl border bg-card overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all h-full"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-primary">{post.category}</span>
                    <span className="text-[10px] text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h2 className="font-semibold text-sm leading-snug line-clamp-2 mb-2">{post.title}</h2>
                  <p className="text-xs text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                    <span>{post.author}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No se encontraron guías.</p>
        )}
      </div>
    </>
  );
}
