# CLAUDE.md — ms-recursos

Funil `/recursos` do **MS Creative Keys** (uma marca MSCREATIVE.SYSTEMS™).
Stack: Next.js 14 + TypeScript + Tailwind · Supabase (leads/tags/survey) · Resend (email) · Vercel.

---

## REGRA DE DESIGN — obrigatória

Toda UI nova ou editada **segue o design system em [`design.md`](./design.md)** (DS V3.0 — "Chumbo Puro + Lima Ácida"). Leia `design.md` antes de criar ou alterar qualquer componente. **Não invente cor, fonte, raio ou espaçamento fora dos tokens.** Reuse os padrões prontos do `design.md §6` em vez de estilizar do zero.

### Tokens (use o token Tailwind, nunca hex solto no JSX)
- **Fundo:** `bg` `#0A0A0E` · `bg-end` `#111114`. Superfícies: `surface` `#16181F`, `surface-2` `#1C1F28`.
- **Texto:** `cream` `#B2A898`. Escala por opacidade: `text-cream` (forte) · `/80` (corpo) · `/55` (muted) · `/45`–`/40` (legenda) · `/35` (placeholder).
- **Acento único: lima `#B4C636`** — todo CTA, link, ênfase e kicker é lima. `ink` `#0A0A0E` = texto sobre lima.
- `gold` `#E8C547` **só em selo**. Proibido reintroduzir paleta antiga (navy / laranja vulcânico / cream claro).
- Bordas: `border-white/10` (padrão), `border-lima/30`–`/60` (destaque).

### Tipografia (3 famílias via `next/font`)
- Headline → `font-display` (Fraunces), `font-semibold tracking-[-0.02em]`, **sentence case**.
- Corpo → `font-sans` (Inter Tight).
- Label / kicker → classe `.kicker` (IBM Plex Mono, uppercase, tracking 0.22em, lima).

### Estrutura
- Fundo já tem **gradiente 145deg + grid 54px** no `body` (grid pintado *em cima* do gradiente). Não recriar por seção.
- Raios: `rounded-card` (4px) para cards/superfícies, `rounded-ctl` (3px) para botões/inputs/badges. **Sem pílula** (`rounded-full`).
- Padrões prontos (ver `design.md §6`): card · botão lima · outline lima · input · badge de lane · nav · retrato.

---

## REGRA DE VOZ — todo texto da UI

Auditado pela skill `content-critic`:
- **Sem em dash (`—`).** Use ponto, dois-pontos ou parênteses.
- **Sem negative parallelism** ("Não é X. É Y." e variantes).
- **Léxico banido:** curso, turma, potencializar/potencial, turbinar, alavancar, fácil, simples, mágico, holístico, robusto, disruptivo.
- **Sentence case** em headline; caixa alta só em kicker mono, wordmark e siglas.
- Frases curtas, voz ativa, registro Tradutor (horizontal, conduz o leitor).

---

## FLUXO

- Editou UI previewável → **build verde + screenshot** antes de fechar. Nunca pedir pro usuário conferir à mão.
- **Envs:** `NEXT_PUBLIC_*` são inlined no build → trocar exige **redeploy**. `SUPABASE_*` / `RESEND_*` são runtime.
- **Migração Supabase:** sempre aditiva (`add column if not exists`), aplicada no SQL Editor. Não quebrar dados existentes.
- **Fonte da verdade dos freebies:** `lib/freebies.ts`. Cada card = amostra de um degrau da escada; tag de funil/interesse roteia o lead (ver enquete-classificador em `Survey.tsx` + `api/survey`).
