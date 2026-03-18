import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Satriya Kurniawan — Professional Designer",
  description: "Product Designer crafting meaningful digital experiences.",
  icons: {
    icon: "https://fzjpbihupkiggcdvynua.supabase.co/storage/v1/object/public/Logo%20Client/favicon.svg",
    shortcut: "https://fzjpbihupkiggcdvynua.supabase.co/storage/v1/object/public/Logo%20Client/favicon.svg",
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
