import { Resend } from "resend";
import type { Freebie } from "./freebies";

// Envio transacional do freebie. Se RESEND_API_KEY não estiver setada,
// o envio é "no-op" (loga e segue) — útil em dev/local sem chave.
const FROM =
  process.env.RESEND_FROM || "MS Creative Keys <onboarding@resend.dev>";

export async function sendFreebieEmail(
  email: string,
  freebie: Freebie
): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[resend] RESEND_API_KEY ausente — pulando envio (dev).");
    return { sent: false, reason: "no-api-key" };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: `Seu recurso chegou: ${freebie.skillId}`,
    html: renderEmail(freebie),
  });

  if (error) {
    console.error("[resend] erro ao enviar:", error);
    return { sent: false, reason: String(error) };
  }
  return { sent: true };
}

function renderEmail(freebie: Freebie): string {
  // DS V3.0 — Chumbo Puro + Lima Ácida. Fonte serif p/ headline (Georgia
  // como fallback de Fraunces, que e-mail não carrega de forma confiável).
  return `
  <div style="font-family: -apple-system, 'Inter Tight', system-ui, sans-serif; background:#0A0A0E; padding:32px;">
    <div style="max-width:520px; margin:0 auto; background:#16181F; border:1px solid rgba(255,255,255,0.08); border-radius:4px; padding:32px;">
      <p style="font-family:'IBM Plex Mono',monospace; letter-spacing:0.22em; text-transform:uppercase; font-weight:500; font-size:11px; color:#B4C636; margin:0 0 10px;">Seu recurso grátis</p>
      <h1 style="font-family:Georgia,serif; font-weight:600; font-size:22px; color:#B2A898; margin:0 0 12px;">${escapeHtml(
        freebie.title
      )}</h1>
      <p style="color:rgba(178,168,152,0.65); margin:0 0 24px;">${escapeHtml(
        freebie.subtitle
      )}</p>
      <a href="${freebie.assetUrl}" style="display:inline-block; background:#B4C636; color:#0A0A0E; text-decoration:none; padding:12px 24px; border-radius:3px; font-weight:600;">Abrir o recurso →</a>
      <p style="color:rgba(178,168,152,0.55); font-size:13px; margin:28px 0 0;">Curtiu? No <strong style="color:#B2A898;">Dia Um</strong> você sai com o primeiro resultado funcionando hoje. Te conto mais em breve.</p>
      <p style="font-family:'IBM Plex Mono',monospace; color:rgba(178,168,152,0.38); font-size:11px; letter-spacing:0.05em; margin:24px 0 0;">MS Creative Keys · uma marca MSCREATIVE.SYSTEMS™</p>
    </div>
  </div>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
