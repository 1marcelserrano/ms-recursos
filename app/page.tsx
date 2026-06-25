import Link from "next/link";
import { OptInForm } from "@/components/OptInForm";
import { Survey } from "@/components/Survey";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      {/* Hero + autoridade */}
      <section className="pt-16 sm:pt-24">
        <p className="kicker text-clay">Oi, eu sou o Marcel</p>
        <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-forest-deep sm:text-5xl">
          Eu transformo vitória criativa em sistema que roda sozinho.
        </h1>
        <p className="mt-6 text-lg text-ink">
          Passei anos como criativo travado em produção manual. Construí meu
          próprio jeito de fazer a IA trabalhar —{" "}
          <span className="font-semibold text-clay">
            sem código, sem API, sem terminal
          </span>
          . Hoje instalo isso em criadores e empresas: de um primeiro agente a
          um Intelligence OS rodando na operação inteira.
        </p>
        <p className="mt-4 text-muted">
          Não é curso de prompt. É a IA virando o seu sistema — você decide, ela
          executa.
        </p>
      </section>

      {/* Posicionamento + opt-in */}
      <section className="mt-20 rounded-2xl bg-cream-card p-8 sm:p-10">
        <p className="kicker text-clay">O sistema operacional criativo</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-forest-deep">
          Pare de usar IA como Google turbinado. Comece a rodar a cozinha.
        </h2>
        <p className="mt-5 text-ink">
          A maioria usa IA peça por peça. Um OS criativo é o próximo passo: ele
          atravessa o seu negócio e a sua produção, e as coisas saem sem você em
          cada estação. Eu compartilho como construo o meu — entra na lista pra
          receber os recursos grátis e o primeiro acesso ao que vem.
        </p>
        <div className="mt-6">
          <OptInForm source="home" />
          <p className="mt-3 text-sm text-muted">
            Sem spam. Recursos no-code + bastidores. Saia quando quiser.
          </p>
        </div>
        <p className="mt-6 text-sm">
          <Link href="/recursos" className="font-semibold text-forest hover:underline">
            Ou pula direto pros recursos grátis →
          </Link>
        </p>
      </section>

      {/* Survey */}
      <section className="mt-20 text-center">
        <h2 className="font-display text-3xl font-bold text-forest-deep">
          Tem 30 segundos?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Tô construindo um jeito de te fazer colocar IA pra rodar o mais rápido
          possível. Não é &ldquo;mais um curso de prompt&rdquo;. Poucas
          perguntas, sem resposta errada — o que você responder molda o que eu
          faço a seguir.
        </p>
        <div className="mt-8">
          <Survey />
        </div>
      </section>
    </div>
  );
}
