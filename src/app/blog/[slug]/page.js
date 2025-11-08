// src/app/blog/[slug]/page.js

import React from 'react';
import { blogPosts } from '@/blogData';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// This function generates the SEO metadata for each specific blog post
export async function generateMetadata({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return { title: 'Post Not Found' };
  }
  return {
    title: `${post.title} | Shavin Joseph`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container blog-article-container">
      <article className="blog-article">
        <header className="article-header">
          <p className="article-meta">{post.date}</p>
          <h1 className="article-title">{post.title}</h1>
        </header>

        <div className="article-image-container">
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={1200}
            height={600}
            className="article-image"
            priority
          />
        </div>

        {/* This is the crucial part: it reads the 'content' from blogData.js */}
        <div 
          className="article-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <div className="back-link-container">
        <Link href="/blog" className="back-link">← Back to All Articles</Link>
      </div>
    </div>
  );
}