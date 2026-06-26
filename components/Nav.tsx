import Link from "next/link";

const LINKS = [
  { href: "/", label: "Início" },
  { href: "/recursos", label: "Recursos" },
  { href: "/contato", label: "Contato" },
];

export function Nav() {
  return (
    <div className="sticky top-4 z-50 flex justify-center px-4">
      <nav className="flex items-center gap-1 rounded-card border border-white/10 bg-bg/70 px-2 py-1.5 backdrop-blur">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-ctl px-4 py-1.5 text-sm font-medium text-cream/70 transition-colors hover:bg-lima hover:text-ink"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
