"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug, getRelatedPosts } from "@/data/blog-posts";
import type { BlogSection } from "@/data/blog-posts";

function Section({ s }: { s: BlogSection }) {
  switch (s.type) {
    case "paragraph":
      return <p className="leading-relaxed text-muted-foreground">{s.text}</p>;
    case "heading":
      return <h2 className="font-display text-xl font-bold mt-8 mb-4">{s.text}</h2>;
    case "list":
      return (
        <ul className="space-y-3">
          {s.items?.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm">
              <span className="mt-0.5 shrink-0 text-primary">•</span>
              <span>
                <strong>{item.bold}</strong> {item.text}
              </span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
          {s.text}
        </blockquote>
      );
    case "image":
      return (
        <img src={s.src} alt={s.alt ?? ""} className="rounded-xl w-full" loading="lazy" />
      );
    default:
      return null;
  }
}

export function GuidePost({ slug }: { slug: string }) {
  const post = getPostBySlug(slug);
  const related = getRelatedPosts(slug);

  if (!post) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Artículo no encontrado.</p>
        <Link href="/guias" className="text-primary hover:underline text-sm mt-2 block">
          Ver todas las guías
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-3xl mx-auto">
      <Link
        href="/guias"
        className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Guías
      </Link>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="aspect-[16/8] rounded-2xl overflow-hidden mb-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
          <span className="text-primary font-semibold uppercase tracking-wide">{post.category}</span>
          <span>·</span>
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="font-display text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-muted-foreground mb-8">{post.excerpt}</p>

        <div className="space-y-6">
          {post.content.map((s, i) => (
            <Section key={i} s={s} />
          ))}
        </div>

        <div className="border-t mt-10 pt-6 text-sm text-muted-foreground">
          Escrito por <strong className="text-foreground">{post.author}</strong>
        </div>
      </motion.article>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-xl font-bold mb-4">Artículos relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/guias/${p.slug}`}
                className="flex gap-3 rounded-xl border bg-card p-3 hover:bg-accent transition-colors"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-16 w-24 rounded-lg object-cover shrink-0"
                />
                <div>
                  <span className="text-[10px] font-semibold uppercase text-primary">{p.category}</span>
                  <h3 className="font-semibold text-xs mt-1 line-clamp-2">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
