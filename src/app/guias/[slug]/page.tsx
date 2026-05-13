import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, blogPosts } from "@/data/blog-posts";
import { GuidePost } from "@/page-components/GuidePost";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Guía no encontrada" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/guias/${slug}` },
    openGraph: { images: [post.image] },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  return <GuidePost slug={slug} />;
}
