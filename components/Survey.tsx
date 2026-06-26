"use client";

import { useState } from "react";

const Q1_OPTIONS = [
  "Turma ao vivo (juntos, com calendário)",
  "Biblioteca no seu ritmo (vídeos + currículo)",
  "Os dois / ainda não sei",
];

const Q2_OPTIONS = [
  "Automatizar meu negócio",
  "Produzir conteúdo com a minha cara",
  "Decidir melhor",
  "Montar a IA do meu time/empresa",
];

export function Survey() {
  const [q1, setQ1] = useState<string>("");
  const [q2, setQ2] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  function toggleQ2(option: string) {
    setQ2((prev) =>
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
        body: JSON.stringify({ q1, q2, email: email || undefined }),
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
        <legend className="kicker mb-3">1. Como você quer aprender?</legend>
        <div className="space-y-2">
          {Q1_OPTIONS.map((opt) => (
            <label
              key={opt}
              className={`${optionBase} ${q1 === opt ? optionOn : optionOff}`}
            >
              <input
                type="radio"
                name="q1"
                value={opt}
                checked={q1 === opt}
                onChange={() => setQ1(opt)}
                className="accent-lima"
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="kicker mb-3">
          2. No que você mais quer que a IA ajude? (marque tudo)
        </legend>
        <div className="space-y-2">
          {Q2_OPTIONS.map((opt) => (
            <label
              key={opt}
              className={`${optionBase} ${
                q2.includes(opt) ? optionOn : optionOff
              }`}
            >
              <input
                type="checkbox"
                value={opt}
                checked={q2.includes(opt)}
                onChange={() => toggleQ2(opt)}
                className="accent-lima"
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
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
          disabled={status === "loading" || !q1}
          className="whitespace-nowrap rounded-ctl bg-lima px-6 py-3 font-semibold text-ink transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status === "loading" ? "Enviando…" : "Enviar"}
        </button>
      </div>
      {status === "error" && <p className="text-sm text-lima">{message}</p>}
    </form>
  );
}
