import type { Metadata } from "next";
import { Fraunces, Inter_Tight, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});
const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MS Creative Keys — Recursos",
  description:
    "Prompts, skills e templates que eu uso — de graça, pega e faz seu. O sistema operacional criativo do MS Creative Keys.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${interTight.variable} ${plexMono.variable}`}
    >
      <body className="min-h-screen">
        <Nav />
        <main>{children}</main>
        <footer className="mx-auto max-w-3xl px-6 py-16 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cream/40">
            MS Creative Keys · uma marca{" "}
            <span className="text-cream/70">MSCREATIVE.SYSTEMS™</span>
          </p>
        </footer>
      </body>
    </html>
  );
}
