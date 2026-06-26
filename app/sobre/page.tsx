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
      <p className="kicker">Contato</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.02em] text-cream">
        Vamos conversar
      </h1>
      <p className="mx-auto mt-4 max-w-md text-cream/55">
        Dúvidas, parcerias ou colaborações — me chama direto ou me acha no seu
        canal preferido.
      </p>

      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="mt-8 inline-block rounded-ctl bg-lima px-7 py-3 font-semibold text-ink transition-opacity hover:opacity-90"
      >
        {CONTACT_EMAIL}
      </a>

      <div className="mt-8 flex justify-center gap-3">
        {CHANNELS.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-ctl border border-white/10 bg-surface px-4 py-2 text-sm font-medium text-cream/70 transition-colors hover:border-lima/50 hover:text-lima"
          >
            {c.label}
          </a>
        ))}
      </div>

      <div className="mt-14 rounded-card border border-white/10 bg-surface p-8">
        <p className="text-cream/80">Quer o primeiro resultado funcionando hoje?</p>
        <a
          href={SKOOL_DIA_UM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-ctl border border-lima/40 px-7 py-3 font-semibold text-lima transition-colors hover:bg-lima/10"
        >
          Conhecer o Dia Um (R$97,99)
        </a>
      </div>
    </div>
  );
}
