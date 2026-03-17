import "./globals.css";

function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit;
  const vercel = process.env.VERCEL_URL;
  if (!vercel) return "http://localhost:3000";
  return vercel.startsWith("http") ? vercel : `https://${vercel}`;
}

const siteUrl = getSiteUrl();

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ZUCCESS — Smart Digital Business Cards",
    template: "%s | ZUCCESS",
  },
  description: "Create your QR card in minutes using WhatsApp. Powered by NFC + AI.",
  applicationName: "ZUCCESS",
  keywords: ["digital business card", "NFC business card", "QR business card", "WhatsApp", "AI"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "ZUCCESS",
    title: "ZUCCESS — Smart Digital Business Cards",
    description: "Create your QR card in minutes using WhatsApp. Powered by NFC + AI.",
    url: "/",
    images: [
      {
        url: "/zuccess_logo.png",
        width: 512,
        height: 512,
        alt: "ZUCCESS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZUCCESS — Smart Digital Business Cards",
    description: "Create your QR card in minutes using WhatsApp. Powered by NFC + AI.",
    images: ["/zuccess_logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/zuccess_logo.png",
    apple: "/zuccess_logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ZUCCESS",
              url: siteUrl,
              logo: `${siteUrl}/zuccess_logo.png`,
            }),
          }}
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
