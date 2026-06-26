import Link from "next/link";
import { OptInForm } from "@/components/OptInForm";
import { Survey } from "@/components/Survey";
import { Portrait } from "@/components/Portrait";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      {/* Hero + autoridade + retrato */}
      <section className="flex flex-col gap-8 pt-16 sm:flex-row sm:items-center sm:pt-24">
        <Portrait />
        <div>
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

      {/* Posicionamento + opt-in */}
      <section className="mt-20 rounded-card border border-white/10 bg-surface p-8 sm:p-10">
        <p className="kicker">O sistema operacional criativo</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] text-cream">
          Pare de usar IA como Google turbinado. Comece a rodar a cozinha.
        </h2>
        <p className="mt-5 text-cream/80">
          A maioria usa IA peça por peça. Um OS criativo é o próximo passo: ele
          atravessa o seu negócio e a sua produção, e as coisas saem sem você em
          cada estação. Eu compartilho como construo o meu — entra na lista pra
          receber os recursos grátis e o primeiro acesso ao que vem.
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

      {/* Survey */}
      <section className="mt-20 text-center">
        <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-cream">
          Tem 30 segundos?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-cream/55">
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
