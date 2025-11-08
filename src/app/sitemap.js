// src/app/sitemap.js
import { blogPosts } from '@/blogData';

export default function sitemap() {
  const baseUrl = 'https://shavinjoseph.me';

  // 2. Create URLs for each blog post automatically
  const postUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(), // You can make this dynamic if you add a 'lastModified' date to your data
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // 3. URLs for your static pages
  const staticUrls = [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/work`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), priority: 0.9 }, // The main blog page is important
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.5 },
  ];

  // 4. Combine them all
  return [...staticUrls, ...postUrls];
}