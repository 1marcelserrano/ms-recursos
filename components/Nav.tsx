import Link from "next/link";

const LINKS = [
  { href: "/", label: "Início" },
  { href: "/recursos", label: "Recursos" },
  { href: "/sobre", label: "Sobre" },
];

export function Nav() {
  return (
    <div className="sticky top-4 z-50 flex justify-center px-4">
      <nav className="flex items-center gap-1 rounded-pill bg-cream-card/90 px-2 py-2 shadow-sm backdrop-blur">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-pill px-4 py-1.5 text-sm font-medium text-forest transition-colors hover:bg-forest hover:text-cream"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
