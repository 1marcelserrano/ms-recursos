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
      <p className="text-lg font-medium text-forest">
        Valeu! Sua resposta molda o que vem a seguir. 🙌
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 text-left">
      <fieldset>
        <legend className="mb-3 font-semibold text-clay">
          1. Como você quer aprender?
        </legend>
        <div className="space-y-2">
          {Q1_OPTIONS.map((opt) => (
            <label
              key={opt}
              className={`flex cursor-pointer items-center gap-3 rounded-pill border px-4 py-2.5 transition-colors ${
                q1 === opt
                  ? "border-forest bg-forest/10"
                  : "border-forest/15 bg-cream-card hover:border-forest/40"
              }`}
            >
              <input
                type="radio"
                name="q1"
                value={opt}
                checked={q1 === opt}
                onChange={() => setQ1(opt)}
                className="accent-forest"
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 font-semibold text-clay">
          2. No que você mais quer que a IA ajude? (marque tudo)
        </legend>
        <div className="space-y-2">
          {Q2_OPTIONS.map((opt) => (
            <label
              key={opt}
              className={`flex cursor-pointer items-center gap-3 rounded-pill border px-4 py-2.5 transition-colors ${
                q2.includes(opt)
                  ? "border-forest bg-forest/10"
                  : "border-forest/15 bg-cream-card hover:border-forest/40"
              }`}
            >
              <input
                type="checkbox"
                value={opt}
                checked={q2.includes(opt)}
                onChange={() => toggleQ2(opt)}
                className="accent-forest"
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
          className="w-full rounded-pill border border-forest/15 bg-cream-card px-5 py-3 outline-none placeholder:text-muted focus:border-forest"
        />
        <button
          type="submit"
          disabled={status === "loading" || !q1}
          className="whitespace-nowrap rounded-pill bg-forest px-6 py-3 font-semibold text-cream transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status === "loading" ? "Enviando…" : "Enviar"}
        </button>
      </div>
      {status === "error" && <p className="text-sm text-clay">{message}</p>}
    </form>
  );
}
