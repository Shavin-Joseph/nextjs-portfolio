// src/app/blog/page.js

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/blogData';

export const metadata = {
  title: 'Blog | Shavin Joseph',
  description: "Insights on web development, UI/UX design, and modern technology from Shavin Joseph.",
};

// THIS IS THE CORRECT CODE FOR YOUR BLOG PAGE (with the cards)
export default function BlogIndexPage() {
  return (
    <div className="container blog-list-container">
      <h1 className="page-title">Shavin's Insights</h1>
      <p className="page-subtitle">Thoughts on technology, design, and building for the web.</p>

      <div className="blog-grid">
        {blogPosts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="blog-post-card">
            <div className="blog-post-image-container">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="blog-post-image"
              />
            </div>
            <div className="blog-post-info">
              <p className="blog-post-meta">{post.date}</p>
              <h3>{post.title}</h3>
              <p className="blog-post-excerpt">{post.excerpt}</p>
              <span className="read-more-link">Read More →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}