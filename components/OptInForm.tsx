"use client";

import { useState } from "react";

interface OptInFormProps {
  source: "home" | "card";
  keyword?: string; // presente quando vem de um card gated
  buttonLabel?: string;
  onSuccess?: (assetUrl?: string) => void;
  compact?: boolean;
}

export function OptInForm({
  source,
  keyword,
  buttonLabel = "Entrar na lista",
  onSuccess,
  compact = false,
}: OptInFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, keyword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao enviar.");
      setStatus("done");
      setMessage(
        source === "card"
          ? "Pronto! Te enviei o recurso por email. 📩"
          : "Você está na lista. 🎉"
      );
      onSuccess?.(data.assetUrl);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Algo deu errado.");
    }
  }

  if (status === "done") {
    return <p className="text-sm font-medium text-forest">{message}</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={compact ? "flex flex-col gap-2" : "flex flex-col gap-3 sm:flex-row"}
    >
      <input
        type="email"
        required
        placeholder="seu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-pill border border-forest/15 bg-cream-card px-5 py-3 text-ink outline-none placeholder:text-muted focus:border-forest"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="whitespace-nowrap rounded-pill bg-clay px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "loading" ? "Enviando…" : buttonLabel}
      </button>
      {status === "error" && (
        <p className="text-sm text-clay sm:w-full">{message}</p>
      )}
    </form>
  );
}
