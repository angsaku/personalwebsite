import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { getHeroContent } from "@/lib/hero";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const BASE_URL = "https://angsaku.vercel.app";

export async function generateMetadata(): Promise<Metadata> {
  let ogImage = `${BASE_URL}/opengraph-image`;
  try {
    const hero = await getHeroContent();
    ogImage = hero.ogImageUrl ?? ogImage;
  } catch {}

  return {
    metadataBase: new URL(BASE_URL),
    title: "Satriya Kurniawan — Professional Designer",
    description: "Product Designer crafting meaningful digital experiences.",
    verification: {
      google: "N3QtQnvtEL0Ihmrpjbw7MhqxBOuovWJvbMNUB8iXgoI",
    },
    icons: {
      icon: "https://fzjpbihupkiggcdvynua.supabase.co/storage/v1/object/public/Logo%20Client/favicon.svg",
      shortcut: "https://fzjpbihupkiggcdvynua.supabase.co/storage/v1/object/public/Logo%20Client/favicon.svg",
    },
    openGraph: {
      title: "Satriya Kurniawan — Product Designer",
      description: "Product Designer crafting meaningful digital experiences that bridge business goals with human needs.",
      url: BASE_URL,
      siteName: "Satriya Kurniawan",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "Satriya Kurniawan — Product Designer" }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Satriya Kurniawan — Product Designer",
      description: "Product Designer crafting meaningful digital experiences that bridge business goals with human needs.",
      images: [ogImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
