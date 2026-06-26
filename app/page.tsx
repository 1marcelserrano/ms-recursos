import Link from "next/link";
import { OptInForm } from "@/components/OptInForm";
import { Survey } from "@/components/Survey";
import { Portrait } from "@/components/Portrait";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      {/* Hero — retrato acima, texto abaixo */}
      <section className="pt-16 sm:pt-24">
        <div className="mx-auto w-64 sm:w-80">
          <Portrait />
        </div>
        <div className="mt-10">
          <p className="kicker">Oi, eu sou o Marcel</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-cream sm:text-5xl">
            Eu te ajudo a usar IA pra fazer o seu trabalho render muito mais.
          </h1>
          <p className="mt-6 text-lg text-cream/80">
            Dediquei décadas a agências de design e marcas de moda antes de
            chegar na IA. Nesse tempo criei e refinei meu olhar de criativo
            estratégico, e hoje transformo esses métodos e critérios em{" "}
            <span className="font-medium text-lima">
              skills e fluxos que rodam sozinhos
            </span>
            . Não sei escrever código, mas sei passar a minha visão pra máquina,
            e ela escreve por mim.
          </p>
          <p className="mt-4 text-cream/55">
            Meu objetivo é usar a IA, e ensinar a usar, pra desenvolver as
            forças criativas e financeiras de quem cria. O novo normal é ter uma
            super inteligência trabalhando por você e com você.
          </p>
        </div>
      </section>

      {/* 3 mensagens-núcleo (playbook §6) */}
      <section className="mt-20 grid gap-5 sm:grid-cols-3">
        {[
          { n: "01", t: "A IA amplia o que você cria e o que você colhe." },
          {
            n: "02",
            t: "Você não precisa virar dev nem virar outra pessoa. Ela estende a sua mente criativa e o seu tino de negócio.",
          },
          {
            n: "03",
            t: "Criatividade vira liberdade quando vira receita. E isso se aprende.",
          },
        ].map((m) => (
          <div
            key={m.n}
            className="rounded-card border border-white/10 bg-surface p-6"
          >
            <span className="font-mono text-xs tracking-[0.18em] text-lima">
              {m.n}
            </span>
            <p className="mt-3 text-cream/80">{m.t}</p>
          </div>
        ))}
      </section>

      {/* Posicionamento + opt-in */}
      <section className="mt-20 rounded-card border border-white/10 bg-surface p-8 sm:p-10">
        <p className="kicker">O sistema operacional criativo</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] text-cream">
          Sua IA ainda é um estagiário. Dá pra virar um time sênior.
        </h2>
        <p className="mt-5 text-cream/80">
          Hoje você pede uma coisa, espera, revisa, repete, como quem
          supervisiona um estagiário o dia todo. Um sistema bem montado funciona
          como uma equipe de especialistas que já sabe exatamente o que e quando
          fazer. Eu te mostro como estou construindo o meu. Entre na lista para
          acessar os recursos gratuitos, e ter preferência nos meus próximos
          lançamentos.
        </p>
        <div className="mt-6">
          <OptInForm source="home" />
          <p className="mt-3 text-sm text-cream/45">
            Sem spam. Recursos no-code + bastidores. Saia quando quiser.
          </p>
        </div>
        <p className="mt-6 text-sm">
          <Link
            href="/recursos"
            className="font-medium text-lima hover:underline"
          >
            Ou pula direto pros recursos grátis →
          </Link>
        </p>
      </section>

      {/* Antes / Depois (playbook §18) */}
      <section className="mt-20">
        <p className="kicker">Antes e depois</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] text-cream">
          O que muda quando a IA vira o seu sistema.
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <div className="rounded-card border border-white/10 bg-surface p-6">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-cream/40">
              Antes
            </p>
            <ul className="mt-4 space-y-3 text-cream/55">
              <li>Você olha pra IA e trava.</li>
              <li>Acha que precisa aprender a programar.</li>
              <li>Perde horas em tarefas repetitivas.</li>
              <li>Sente a técnica sufocando a sua criatividade.</li>
            </ul>
          </div>
          <div className="rounded-card border border-lima/30 bg-surface p-6">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-lima">
              Depois
            </p>
            <ul className="mt-4 space-y-3 text-cream/80">
              <li>Você tem agentes que fazem o repetitivo por você.</li>
              <li>Chegou ao primeiro resultado em 15 minutos.</li>
              <li>A IA virou o seu pincel e o seu sócio de negócios.</li>
              <li>Você cria mais, com mais prazer, e fatura mais.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Survey-classificador */}
      <section className="mt-20 text-center">
        <p className="kicker">Preciso da sua ajuda</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] text-cream">
          Tem 30 segundos?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-cream/55">
          Tô construindo um jeito de te fazer colocar IA pra rodar o mais rápido
          possível. São poucas perguntas, sem resposta errada. O que você
          responder molda o que eu faço a seguir.
        </p>
        <div className="mt-8">
          <Survey />
        </div>
      </section>

      {/* Tagline (playbook §15) */}
      <section className="mt-20 border-t border-white/10 py-12 text-center">
        <p className="font-display text-2xl font-semibold tracking-[-0.02em] text-cream">
          Sem código. Sem enrolação.{" "}
          <span className="text-lima">Só resultado.</span>
        </p>
      </section>
    </div>
  );
}
