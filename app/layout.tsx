import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";

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
    <html lang="pt-BR">
      <body className="min-h-screen">
        <Nav />
        <main>{children}</main>
        <footer className="mx-auto max-w-3xl px-6 py-12 text-center text-sm text-muted">
          <p>
            MS Creative Keys · uma marca{" "}
            <span className="font-semibold text-forest">
              MSCREATIVE.SYSTEMS™
            </span>
          </p>
        </footer>
      </body>
    </html>
  );
}
