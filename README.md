# MS Creative Keys — `/recursos`

Funil de topo (freebie → escada) construído ponta a ponta em código: a página
de recursos grátis, captura de leads e entrega de freebie por email. Substitui a
stack visual (Framer/Kit/Tally) por algo versionável.

Documentação de estratégia: pasta `Funil/` do vault Obsidian (MD-FILES).

## Stack

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- **Supabase** (Postgres) — leads, tags, respostas de survey
- **Resend** — entrega transacional do freebie
- Deploy: **Vercel**

## Rodar local

```bash
npm install
cp .env.example .env.local   # preencher as chaves
npm run dev                  # http://localhost:3000
```

> Sem `RESEND_API_KEY`/Supabase, o app sobe, mas captura e envio ficam inertes
> (loga e segue). Para o fluxo completo, preencha o `.env.local`.

## Setup do banco (Supabase)

1. Crie um projeto no Supabase.
2. No **SQL Editor**, rode `supabase/migrations/0001_init.sql`.
3. Copie `Project URL` e a `service_role` key pro `.env.local`
   (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`).

## Setup de email (Resend)

1. Crie conta no Resend e uma API key → `RESEND_API_KEY`.
2. Verifique um domínio remetente e ajuste `RESEND_FROM`
   (em teste, dá pra usar `onboarding@resend.dev`).

## Deploy (Vercel)

1. Importe o repo no Vercel.
2. Configure as variáveis de ambiente (ver `.env.example`).
3. Deploy. As rotas `/api/subscribe` e `/api/survey` rodam como funções.

## Estrutura

```
app/
  page.tsx             Início (hero + opt-in + survey)
  recursos/page.tsx    grade dos 6 freebies + faixa-ponte (Dia Um/Skool)
  sobre/page.tsx       contato + canais
  api/subscribe        opt-in + card gated → Supabase + Resend
  api/survey           respostas do survey → Supabase + tags
components/             Nav, OptInForm, FreebieCard, FreebieGrid, Survey, BridgeCTA
lib/
  freebies.ts          CONFIG dos 6 cards (fonte da verdade — editar aqui)
  supabase.ts          client server-side (service_role)
  resend.ts            envio + template do email
supabase/migrations/   schema SQL
```

## Editar os freebies

Tudo em `lib/freebies.ts`. Cada card tem `ctaDestination`:
`DIRECT` (abre o link direto) ou `GATED` (pede email antes de liberar).
Estratégia atual = **híbrida**: âncora (`POSTER`) e hub (`SKILLS`) abertos; o
resto gated. Os links de cada freebie vêm das envs `NEXT_PUBLIC_FREEBIE_*`.

## Fora de escopo (v2)

Sequências de nurture (5 emails B2C + 4 B2B), Vercel Cron, lotes/FOMO do
Prompt Zero, CMS pros cards, Pixel/UTMs. Automação de Instagram (comment-to-DM)
segue no ManyChat; cursos/pagamento seguem no Skool.
