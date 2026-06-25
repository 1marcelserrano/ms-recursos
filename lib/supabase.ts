import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Client server-side com a service_role key. NUNCA importar isto em
// componentes client — só em Route Handlers (app/api/*).
let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Supabase não configurado: defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  cached = createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
  return cached;
}

/** Upsert de lead por email; retorna o id. */
export async function upsertLead(
  email: string,
  source: "home" | "card" | "survey"
): Promise<string> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("leads")
    .upsert({ email: email.toLowerCase().trim(), source }, { onConflict: "email" })
    .select("id")
    .single();

  if (error) throw error;
  return data.id as string;
}

/** Aplica tags a um lead (ignora duplicatas). */
export async function addTags(leadId: string, tags: string[]): Promise<void> {
  if (tags.length === 0) return;
  const supabase = getSupabaseAdmin();
  const rows = tags.map((tag) => ({ lead_id: leadId, tag }));
  const { error } = await supabase
    .from("lead_tags")
    .upsert(rows, { onConflict: "lead_id,tag", ignoreDuplicates: true });
  if (error) throw error;
}
