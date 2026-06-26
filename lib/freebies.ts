// Fonte da verdade dos cards de freebie da /recursos.
// Editar aqui = mudar a grade (sem CMS na v1).
// Specs exatas em: Funil — Mapa Freebies → Escada §2/§3.

export type Lane = "CONTEÚDO" | "DECISÃO" | "SISTEMA" | "CATÁLOGO";
export type Funnel = "criador" | "executivo" | "ambos";
export type CtaDestination = "DIRECT" | "GATED";

export interface Freebie {
  order: number;
  skillId: string;
  keyword: string; // palavra-chave do ManyChat (vira a tag lm-*)
  title: string;
  subtitle: string;
  lane: Lane;
  funnel: Funnel;
  surveyTag: string; // tag de interesse correlata (int-*)
  ctaDestination: CtaDestination;
  assetUrl: string; // link do freebie (Notion/PDF) — trocar quando definido
}

// Cores por lane (Tailwind class fragments) — DS V3.0: lima nas lanes de ação,
// cream silenciado no catálogo. Acento mono-cromático por disciplina do DS.
export const LANE_STYLES: Record<Lane, { badge: string; text: string }> = {
  CONTEÚDO: { badge: "bg-lima/10", text: "text-lima" },
  DECISÃO: { badge: "bg-lima/10", text: "text-lima" },
  SISTEMA: { badge: "bg-lima/10", text: "text-lima" },
  CATÁLOGO: { badge: "bg-white/5", text: "text-cream/55" },
};

// Placeholder até o usuário definir o destino real de cada freebie.
const PLACEHOLDER = "#";

export const FREEBIES: Freebie[] = [
  {
    order: 1,
    skillId: "ms-poster-studio",
    keyword: "POSTER",
    title: "Faça um pôster que para o scroll — em minutos.",
    subtitle: "Copia, cola, gera. Seu primeiro resultado visual hoje.",
    lane: "CONTEÚDO",
    funnel: "criador",
    surveyTag: "int-produzir",
    ctaDestination: "DIRECT", // card-âncora aberto (estratégia híbrida)
    assetUrl: process.env.NEXT_PUBLIC_FREEBIE_POSTER_URL || PLACEHOLDER,
  },
  {
    order: 2,
    skillId: "ms-reverse-shot-reel",
    keyword: "REEL",
    title: "Um Reel com a sua cara e a sua voz — feito por IA.",
    subtitle: "O começo do seu estúdio de clone.",
    lane: "CONTEÚDO",
    funnel: "criador",
    surveyTag: "int-produzir",
    ctaDestination: "GATED",
    assetUrl: process.env.NEXT_PUBLIC_FREEBIE_REEL_URL || PLACEHOLDER,
  },
  {
    order: 3,
    skillId: "nem-parece-ia",
    keyword: "VOZ",
    title: "Escreva com IA sem parecer um robô.",
    subtitle: "O prompt que devolve a sua voz ao texto.",
    lane: "CONTEÚDO",
    funnel: "criador",
    surveyTag: "int-produzir",
    ctaDestination: "GATED",
    assetUrl: process.env.NEXT_PUBLIC_FREEBIE_VOZ_URL || PLACEHOLDER,
  },
  {
    order: 4,
    skillId: "oracle-diagnostic-lite",
    keyword: "ORACLE",
    title: "Onde o seu critério evapora? Diagnóstico em 5 minutos.",
    subtitle: "Uma prévia do Creative Oracle.",
    lane: "DECISÃO",
    funnel: "executivo",
    surveyTag: "int-decidir",
    ctaDestination: "GATED",
    assetUrl: process.env.NEXT_PUBLIC_FREEBIE_ORACLE_URL || PLACEHOLDER,
  },
  {
    order: 5,
    skillId: "prompt-chain",
    keyword: "FLUXO",
    title: "Pare de pedir uma coisa por vez. Encadeie e veja rodar.",
    subtitle: "Seu primeiro mini-fluxo.",
    lane: "SISTEMA",
    funnel: "criador",
    surveyTag: "int-automatizar",
    ctaDestination: "GATED",
    assetUrl: process.env.NEXT_PUBLIC_FREEBIE_FLUXO_URL || PLACEHOLDER,
  },
  {
    order: 6,
    skillId: "mscreative-skills",
    keyword: "SKILLS",
    title: "Tem muito mais de onde veio.",
    subtitle: "O catálogo aberto das minhas skills.",
    lane: "CATÁLOGO",
    funnel: "ambos",
    surveyTag: "int-produzir",
    ctaDestination: "DIRECT",
    assetUrl: process.env.NEXT_PUBLIC_FREEBIE_SKILLS_URL || PLACEHOLDER,
  },
];

export const FREEBIES_SORTED = [...FREEBIES].sort((a, b) => a.order - b.order);

export function getFreebieByKeyword(keyword: string): Freebie | undefined {
  return FREEBIES.find(
    (f) => f.keyword.toLowerCase() === keyword.toLowerCase()
  );
}
