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
  return `
  <div style="font-family: ui-sans-serif, system-ui, sans-serif; background:#F2EDE4; padding:32px;">
    <div style="max-width:520px; margin:0 auto; background:#FBF9F4; border-radius:16px; padding:32px;">
      <p style="letter-spacing:0.18em; text-transform:uppercase; font-weight:700; font-size:12px; color:#E07A3F; margin:0 0 8px;">Seu recurso grátis</p>
      <h1 style="font-size:22px; color:#2C382C; margin:0 0 12px;">${escapeHtml(
        freebie.title
      )}</h1>
      <p style="color:#6B6B60; margin:0 0 24px;">${escapeHtml(
        freebie.subtitle
      )}</p>
      <a href="${freebie.assetUrl}" style="display:inline-block; background:#3A4A3A; color:#F2EDE4; text-decoration:none; padding:12px 24px; border-radius:9999px; font-weight:600;">Abrir o recurso →</a>
      <p style="color:#6B6B60; font-size:13px; margin:28px 0 0;">Curtiu? No <strong>Dia Um</strong> você sai com o primeiro resultado funcionando hoje. Te conto mais em breve.</p>
      <p style="color:#9b9b90; font-size:12px; margin:24px 0 0;">MS Creative Keys · uma marca MSCREATIVE.SYSTEMS™</p>
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
