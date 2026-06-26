const SKOOL_DIA_UM_URL = process.env.NEXT_PUBLIC_SKOOL_DIA_UM_URL || "#";

export function BridgeCTA() {
  return (
    <div className="rounded-card border border-lima/20 bg-surface p-8 text-center">
      <p className="mx-auto max-w-xl text-lg text-cream/80">
        Curtiu os recursos? No <strong className="text-cream">Dia Um</strong>{" "}
        você sai com o primeiro resultado funcionando hoje — um agente, um
        agendamento ou uma skill.
      </p>
      <a
        href={SKOOL_DIA_UM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-block rounded-ctl bg-lima px-7 py-3 font-semibold text-ink transition-opacity hover:opacity-90"
      >
        Conhecer o Dia Um (R$97,99) — na comunidade Skool
      </a>
    </div>
  );
}
