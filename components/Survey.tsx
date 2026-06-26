"use client";

import { useState } from "react";

// Enquete-classificador: posiciona o lead na escada comercial.
// perfil × momento × interesse + pergunta aberta (voz do cliente).

const PERFIL_OPTIONS = [
  { value: "solo", label: "Criativo solo" },
  { value: "estudio", label: "Freelancer ou estúdio" },
  { value: "ceo", label: "Fundador ou CEO" },
  { value: "comecando", label: "Começando agora" },
];

const MOMENTO_OPTIONS = [
  { value: "travado", label: "Travado, com medo de ficar pra trás" },
  { value: "usa-naofatura", label: "Uso IA, mas não faturo com isso" },
  { value: "faturando", label: "Já faturo e quero escalar" },
  { value: "zero", label: "Nunca usei IA direito" },
];

const INTERESSE_OPTIONS = [
  "Automatizar meu negócio",
  "Produzir conteúdo com a minha cara",
  "Decidir melhor",
  "Montar a IA do meu time ou empresa",
];

export function Survey() {
  const [perfil, setPerfil] = useState("");
  const [momento, setMomento] = useState("");
  const [interesses, setInteresses] = useState<string[]>([]);
  const [pain, setPain] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  function toggleInteresse(option: string) {
    setInteresses((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          perfil,
          momento,
          interesses,
          pain: pain || undefined,
          email: email || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao enviar.");
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Algo deu errado.");
    }
  }

  if (status === "done") {
    return (
      <p className="text-lg font-medium text-lima">
        Valeu! Sua resposta molda o que vem a seguir. 🙌
      </p>
    );
  }

  const optionBase =
    "flex cursor-pointer items-center gap-3 rounded-ctl border px-4 py-2.5 transition-colors";
  const optionOn = "border-lima/60 bg-lima/10 text-cream";
  const optionOff =
    "border-white/10 bg-surface text-cream/80 hover:border-lima/40";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 text-left">
      <fieldset>
        <legend className="kicker mb-3">1. Você tá nessa como…?</legend>
        <div className="space-y-2">
          {PERFIL_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={`${optionBase} ${
                perfil === opt.value ? optionOn : optionOff
              }`}
            >
              <input
                type="radio"
                name="perfil"
                value={opt.value}
                checked={perfil === opt.value}
                onChange={() => setPerfil(opt.value)}
                className="accent-lima"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="kicker mb-3">2. E a IA + o seu bolso hoje?</legend>
        <div className="space-y-2">
          {MOMENTO_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={`${optionBase} ${
                momento === opt.value ? optionOn : optionOff
              }`}
            >
              <input
                type="radio"
                name="momento"
                value={opt.value}
                checked={momento === opt.value}
                onChange={() => setMomento(opt.value)}
                className="accent-lima"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="kicker mb-3">
          3. No que você mais quer que a IA ajude? (marque tudo)
        </legend>
        <div className="space-y-2">
          {INTERESSE_OPTIONS.map((opt) => (
            <label
              key={opt}
              className={`${optionBase} ${
                interesses.includes(opt) ? optionOn : optionOff
              }`}
            >
              <input
                type="checkbox"
                value={opt}
                checked={interesses.includes(opt)}
                onChange={() => toggleInteresse(opt)}
                className="accent-lima"
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="kicker mb-3">
          4. A única coisa que você queria que a IA resolvesse pra você?
        </legend>
        <textarea
          value={pain}
          onChange={(e) => setPain(e.target.value)}
          rows={3}
          placeholder="Me conta com as suas palavras… (opcional)"
          className="w-full resize-none rounded-ctl border border-white/10 bg-surface px-5 py-3 text-cream outline-none placeholder:text-cream/35 focus:border-lima"
        />
      </fieldset>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          placeholder="seu@email.com (opcional, pra eu te avisar)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-ctl border border-white/10 bg-surface px-5 py-3 text-cream outline-none placeholder:text-cream/35 focus:border-lima"
        />
        <button
          type="submit"
          disabled={status === "loading" || !perfil}
          className="whitespace-nowrap rounded-ctl bg-lima px-6 py-3 font-semibold text-ink transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status === "loading" ? "Enviando…" : "Enviar"}
        </button>
      </div>
      {status === "error" && <p className="text-sm text-lima">{message}</p>}
    </form>
  );
}
