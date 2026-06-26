import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, upsertLead, addTags } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Interesse (label) → tag de interesse
const INTERESSE_TAG: Record<string, string> = {
  "Automatizar meu negócio": "int-automatizar",
  "Produzir conteúdo com a minha cara": "int-produzir",
  "Decidir melhor": "int-decidir",
  "Montar a IA do meu time ou empresa": "int-empresa",
};

const PERFIL_TAG: Record<string, string> = {
  solo: "perfil-solo",
  estudio: "perfil-estudio",
  ceo: "perfil-ceo",
  comecando: "perfil-comecando",
};

const MOMENTO_TAG: Record<string, string> = {
  travado: "momento-travado",
  "usa-naofatura": "momento-usa-naofatura",
  faturando: "momento-faturando",
  zero: "momento-zero",
};

// Classificador: posiciona o lead na escada comercial (degrau recomendado).
function ladderTag(perfil: string, momento: string): string {
  if (perfil === "ceo") return "ladder-ceoexpress";
  if (perfil === "estudio") return "ladder-b2b";
  if (momento === "faturando") return "ladder-quaseverdade";
  return "ladder-diaum";
}

export async function POST(req: NextRequest) {
  let body: {
    perfil?: string;
    momento?: string;
    interesses?: string[];
    pain?: string;
    email?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const perfil = (body.perfil || "").trim();
  const momento = (body.momento || "").trim();
  const interesses = Array.isArray(body.interesses) ? body.interesses : [];
  const pain = (body.pain || "").trim() || null;
  const email = (body.email || "").trim().toLowerCase();

  if (!perfil) {
    return NextResponse.json(
      { error: "Responde ao menos a primeira pergunta." },
      { status: 400 }
    );
  }

  try {
    let leadId: string | null = null;

    if (email && EMAIL_RE.test(email)) {
      leadId = await upsertLead(email, "survey");

      const tags: string[] = [];
      const interestTags = interesses
        .map((o) => INTERESSE_TAG[o])
        .filter(Boolean);
      tags.push(...interestTags);
      if (PERFIL_TAG[perfil]) tags.push(PERFIL_TAG[perfil]);
      if (MOMENTO_TAG[momento]) tags.push(MOMENTO_TAG[momento]);

      // Roteamento de funil: estúdio/CEO ou interesse empresa/decisão → executivo.
      const isExec =
        perfil === "ceo" ||
        perfil === "estudio" ||
        interestTags.includes("int-empresa") ||
        interestTags.includes("int-decidir");
      tags.push(isExec ? "funil-executivo" : "funil-criador");

      // Degrau recomendado da escada.
      tags.push(ladderTag(perfil, momento));

      await addTags(leadId, tags);
    }

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("survey_responses").insert({
      lead_id: leadId,
      perfil,
      momento,
      q2: interesses,
      pain,
    });
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[survey] erro:", err);
    return NextResponse.json(
      { error: "Não consegui salvar agora. Tenta de novo em instantes." },
      { status: 500 }
    );
  }
}
