function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit;
  const vercel = process.env.VERCEL_URL;
  if (!vercel) return "http://localhost:3000";
  return vercel.startsWith("http") ? vercel : `https://${vercel}`;
}

export default function sitemap() {
  const siteUrl = getSiteUrl();
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}

