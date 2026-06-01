import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const BASE_URL = "https://angsaku.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: BASE_URL },
  title: "Satriya Kurniawan — Product Designer",
  description: "Product Designer crafting meaningful digital experiences.",
  icons: { icon: "/logo.svg", shortcut: "/logo.svg" },
  openGraph: {
    title: "Satriya Kurniawan — Product Designer",
    description: "Product Designer crafting meaningful digital experiences that bridge business goals with human needs.",
    url: BASE_URL,
    siteName: "Satriya Kurniawan",
    images: [{ url: `${BASE_URL}/og-image.webp`, width: 1456, height: 816, alt: "Satriya Kurniawan — Product Designer" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Satriya Kurniawan — Product Designer",
    description: "Product Designer crafting meaningful digital experiences that bridge business goals with human needs.",
    images: [`${BASE_URL}/og-image.webp`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fzjpbihupkiggcdvynua.supabase.co" />
        <link rel="dns-prefetch" href="https://fzjpbihupkiggcdvynua.supabase.co" />
      </head>
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} antialiased`}>
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4LPB4K3SZX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4LPB4K3SZX');
          `}
        </Script>
      </body>
    </html>
  );
}
