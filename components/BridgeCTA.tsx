const SKOOL_DIA_UM_URL = process.env.NEXT_PUBLIC_SKOOL_DIA_UM_URL || "#";

export function BridgeCTA() {
  return (
    <div className="rounded-2xl bg-forest p-8 text-center text-cream">
      <p className="mx-auto max-w-xl text-lg">
        Curtiu os recursos? No <strong>Dia Um</strong> você sai com o primeiro
        resultado funcionando hoje — um agente, um agendamento ou uma skill.
      </p>
      <a
        href={SKOOL_DIA_UM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-block rounded-pill bg-clay px-7 py-3 font-semibold text-white transition-opacity hover:opacity-90"
      >
        Conhecer o Dia Um (R$97,99) — na comunidade Skool
      </a>
    </div>
  );
}
