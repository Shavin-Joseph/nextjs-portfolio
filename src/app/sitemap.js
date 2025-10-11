// src/app/sitemap.js

export default function sitemap() {
  const baseUrl = 'https://shavinjoseph.me';

  // Add any other static pages here
  const staticPages = [
    '/',
    '/about',
    '/work',
    '/contact',
  ];

  const staticPageUrls = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }));

  return [
    ...staticPageUrls,
    // If you had a blog, you would dynamically generate URLs for each post here
  ];
}