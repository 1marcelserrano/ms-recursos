import { FreebieGrid } from "@/components/FreebieGrid";
import { BridgeCTA } from "@/components/BridgeCTA";

export const metadata = {
  title: "Recursos — MS Creative Keys",
  description:
    "Prompts, skills e templates que eu uso — de graça, pega e faz seu.",
};

export default function RecursosPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-16 sm:pt-24">
      <header className="mb-10">
        <p className="kicker">Recursos grátis</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.02em] text-cream sm:text-5xl">
          Recursos
        </h1>
        <p className="mt-4 max-w-xl text-lg text-cream/55">
          Prompts, skills e templates que eu uso — de graça, pega e faz seu.
        </p>
      </header>

      <FreebieGrid />

      <div className="mt-14">
        <BridgeCTA />
      </div>
    </div>
  );
}
