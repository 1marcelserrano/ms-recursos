import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, upsertLead, addTags } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mapeia respostas Q2 → tags de interesse (Scripts §2.1)
const Q2_TAG: Record<string, string> = {
  "Automatizar meu negócio": "int-automatizar",
  "Produzir conteúdo com a minha cara": "int-produzir",
  "Decidir melhor": "int-decidir",
  "Montar a IA do meu time/empresa": "int-empresa",
};

export async function POST(req: NextRequest) {
  let body: { q1?: string; q2?: string[]; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const q1 = (body.q1 || "").trim();
  const q2 = Array.isArray(body.q2) ? body.q2 : [];
  const email = (body.email || "").trim().toLowerCase();

  if (!q1) {
    return NextResponse.json(
      { error: "Responde ao menos a primeira pergunta." },
      { status: 400 }
    );
  }

  try {
    let leadId: string | null = null;
    const tags: string[] = [];

    if (email && EMAIL_RE.test(email)) {
      leadId = await upsertLead(email, "survey");

      // Roteamento de funil (Scripts §2.2):
      // empresa/decidir → executivo; senão → criador.
      const interestTags = q2.map((o) => Q2_TAG[o]).filter(Boolean);
      tags.push(...interestTags);
      const isExec =
        interestTags.includes("int-empresa") ||
        interestTags.includes("int-decidir");
      tags.push(isExec ? "funil-executivo" : "funil-criador");

      await addTags(leadId, tags);
    }

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("survey_responses").insert({
      lead_id: leadId,
      q1,
      q2,
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
