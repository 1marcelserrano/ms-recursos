import { NextRequest, NextResponse } from "next/server";
import { upsertLead, addTags } from "@/lib/supabase";
import { sendFreebieEmail } from "@/lib/resend";
import { getFreebieByKeyword } from "@/lib/freebies";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { email?: string; source?: string; keyword?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  const source = body.source === "card" ? "card" : "home";
  const keyword = body.keyword;

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Email inválido." }, { status: 400 });
  }

  try {
    const leadId = await upsertLead(email, source);

    const tags: string[] = [];
    let assetUrl: string | undefined;

    if (source === "card" && keyword) {
      const freebie = getFreebieByKeyword(keyword);
      if (freebie) {
        tags.push(`lm-${freebie.keyword.toLowerCase()}`);
        tags.push(freebie.surveyTag);
        tags.push(
          freebie.funnel === "executivo" ? "funil-executivo" : "funil-criador"
        );
        assetUrl = freebie.assetUrl;
        await sendFreebieEmail(email, freebie);
      }
    }

    await addTags(leadId, tags);

    return NextResponse.json({ ok: true, assetUrl });
  } catch (err) {
    console.error("[subscribe] erro:", err);
    return NextResponse.json(
      { error: "Não consegui te inscrever agora. Tenta de novo em instantes." },
      { status: 500 }
    );
  }
}
