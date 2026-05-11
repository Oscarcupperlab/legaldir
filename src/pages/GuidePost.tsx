import { useParams, Link } from "react-router-dom";
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
        <blockquote className="border-l-4 border-primary pl-4 py-2 bg-accent/30 rounded-r-lg italic text-muted-foreground text-sm">
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

export function GuidePost() {
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug ?? "");
  const related = getRelatedPosts(slug ?? "");

  if (!post) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Artículo no encontrado.</p>
        <Link to="/guias" className="text-primary hover:underline text-sm mt-2 block">
          Ver todas las guías
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-3xl mx-auto">
      <Link
        to="/guias"
        className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Guías
      </Link>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="inline-block bg-accent text-accent-foreground text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full mb-3">
          {post.category}
        </span>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">{post.title}</h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
          <span>{post.author}</span>
          <span>·</span>
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>

        <div className="aspect-[16/7] rounded-2xl overflow-hidden mb-8">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="space-y-4">
          {post.content.map((s, i) => (
            <Section key={i} s={s} />
          ))}
        </div>
      </motion.article>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-xl font-bold mb-5">Artículos relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((p) => (
              <Link
                key={p.slug}
                to={`/guias/${p.slug}`}
                className="group block rounded-xl border bg-card overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <span className="text-[10px] font-semibold text-primary uppercase">{p.category}</span>
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
