import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://angsaku.vercel.app"),
  title: "Satriya Kurniawan — Professional Designer",
  description: "Product Designer crafting meaningful digital experiences.",
  icons: {
    icon: "https://fzjpbihupkiggcdvynua.supabase.co/storage/v1/object/public/Logo%20Client/favicon.svg",
    shortcut: "https://fzjpbihupkiggcdvynua.supabase.co/storage/v1/object/public/Logo%20Client/favicon.svg",
  },
  openGraph: {
    title: "Satriya Kurniawan — Product Designer",
    description: "Product Designer crafting meaningful digital experiences that bridge business goals with human needs.",
    url: "https://angsaku.vercel.app",
    siteName: "Satriya Kurniawan",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Satriya Kurniawan — Product Designer" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Satriya Kurniawan — Product Designer",
    description: "Product Designer crafting meaningful digital experiences that bridge business goals with human needs.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
