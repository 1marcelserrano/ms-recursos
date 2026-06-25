const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "oi@mscreative.systems";
const SKOOL_DIA_UM_URL = process.env.NEXT_PUBLIC_SKOOL_DIA_UM_URL || "#";

const CHANNELS = [
  { label: "YouTube", href: process.env.NEXT_PUBLIC_YOUTUBE_URL || "#" },
  { label: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#" },
  { label: "TikTok", href: process.env.NEXT_PUBLIC_TIKTOK_URL || "#" },
  { label: "LinkedIn", href: process.env.NEXT_PUBLIC_LINKEDIN_URL || "#" },
];

export const metadata = {
  title: "Sobre — MS Creative Keys",
};

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-2xl px-6 pt-16 text-center sm:pt-24">
      <p className="kicker text-clay">Contato</p>
      <h1 className="mt-3 font-display text-4xl font-bold text-forest-deep">
        Vamos conversar
      </h1>
      <p className="mx-auto mt-4 max-w-md text-muted">
        Dúvidas, parcerias ou colaborações — me chama direto ou me acha no seu
        canal preferido.
      </p>

      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="mt-8 inline-block rounded-pill bg-forest px-7 py-3 font-semibold text-cream transition-opacity hover:opacity-90"
      >
        ✉️ {CONTACT_EMAIL}
      </a>

      <div className="mt-8 flex justify-center gap-3">
        {CHANNELS.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-pill border border-forest/15 bg-cream-card px-4 py-2 text-sm font-medium text-forest hover:border-forest/40"
          >
            {c.label}
          </a>
        ))}
      </div>

      <div className="mt-14 rounded-2xl bg-cream-card p-8">
        <p className="text-ink">
          Quer o primeiro resultado funcionando hoje?
        </p>
        <a
          href={SKOOL_DIA_UM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-pill bg-clay px-7 py-3 font-semibold text-white transition-opacity hover:opacity-90"
        >
          Conhecer o Dia Um (R$97,99)
        </a>
      </div>
    </div>
  );
}
