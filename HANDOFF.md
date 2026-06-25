# HANDOFF — continuar o app `/recursos` numa nova sessão

Este arquivo existe pra você (Marcel) **continuar de uma sessão nova**, depois de
criar o repositório `ms-recursos` no seu GitHub. O app já foi **construído e
validado** nesta sessão; o código está aqui no repo `md-files`, na pasta
`ms-recursos/`. A nova sessão vai **promover essa pasta pro repo novo** e fazer o
deploy.

---

## Por que o handoff (o que travou)
A integração GitHub desta sessão **não pode criar repositório** (`403 Resource not
accessible by integration`) e o push está **escopado só ao `md-files`**. Por isso
o código foi estacionado em `md-files/ms-recursos/` (durável) em vez de ir direto
pro repo próprio. Você cria o repo; a nova sessão (iniciada já com ele no escopo)
faz o resto.

## O que já está pronto (não refazer)
- App **Next.js 14 + TypeScript + Tailwind**, build de produção **verde**.
- Páginas: **Início** (hero + opt-in + survey), **/recursos** (6 cards + faixa-ponte Dia Um/Skool), **Sobre**.
- API: `POST /api/subscribe` (opt-in + card gated → Supabase + Resend) e `POST /api/survey` (→ Supabase + tags).
- `lib/freebies.ts` = config dos 6 freebies (fonte da verdade). `supabase/migrations/0001_init.sql` = schema.
- Smoke test ok: páginas 200, validação de email, falha graciosa sem env.

## Decisões travadas
- Repo novo dedicado: **`ms-recursos`**. Email: **Resend** (codado). Escopo **v1** = site + captura + entrega (nurture/cron = v2).
- Estratégia de card = **híbrida**: `POSTER` e `SKILLS` abertos (`DIRECT`); resto `GATED`.
- Cursos/pagamento seguem no **Skool** (só link). Instagram comment-to-DM segue no **ManyChat** (fora do código).

---

## ⬇️ PROMPT PARA COLAR NA NOVA SESSÃO

> Inicie a nova sessão **já com o repositório `1marcelserrano/ms-recursos` no escopo**
> (e, idealmente, com o `md-files` também, pra eu puxar o código de lá). Depois cole:

```
Contexto: já construímos um app Next.js do funil /recursos do MS Creative Keys numa
sessão anterior. O código-fonte completo e validado (build verde) está no repo
`1marcelserrano/md-files`, na pasta `ms-recursos/` (branch claude/instagram-freebie-conversion-e3fj8p,
ou na default se já mergeado). Detalhes do projeto e decisões em `md-files/ms-recursos/HANDOFF.md`
e na pasta `md-files/Funil/`.

Objetivo desta sessão: levar esse app pro repo novo `1marcelserrano/ms-recursos` e
fazer o deploy ponta a ponta.

Faça, nesta ordem:
1. Recupere a pasta `ms-recursos/` do repo `md-files` (clone/leitura) e copie todo o
   conteúdo dela pra raiz do repo `ms-recursos` (NÃO inclua node_modules nem .next).
2. `npm install` e `npm run build` pra confirmar que segue verde.
3. Commit inicial + push no `ms-recursos`. Abra PR draft se eu estiver usando branch.
4. Supabase: rode `supabase/migrations/0001_init.sql` no meu projeto. Me peça
   SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.
5. Resend: me peça RESEND_API_KEY e configure RESEND_FROM (pode usar onboarding@resend.dev
   em teste).
6. Vercel: me peça o token (ou conecte o repo) e faça o deploy, setando TODAS as envs
   do `.env.example` (Supabase, Resend, links Skool/freebies/contato/sociais).
7. Smoke test na URL pública: abrir as 3 páginas, submeter opt-in (conferir lead no
   Supabase), submeter um card gated (conferir tag lm-* + email do Resend chegando),
   responder o survey (conferir survey_responses + tags funil-*/int-*).
8. Me devolva a URL de produção + o que ficou pendente (links reais dos freebies, Skool, etc.).

Regras: não reescreva a lógica que já existe — só promova, configure e faça deploy.
Mantenha a estratégia de card híbrida. Peça meus segredos quando precisar; não invente
valores. Se algo no build quebrar, conserte e me explique o quê.
```

---

## O que você precisa ter em mãos na nova sessão
- **Supabase:** projeto criado → `Project URL` + `service_role` key.
- **Resend:** conta + API key (e, pra produção, um domínio remetente verificado).
- **Vercel:** conta + token (ou conectar o repo pela UI).
- **Links reais (podem entrar como env):** checkout do **Dia Um no Skool**, e os
  `assetUrl` (Notion/PDF) dos 6 freebies — enquanto não tiver, ficam placeholders.

## Como promover a pasta pro repo novo (se preferir fazer no terminal você mesmo)
```bash
# com o repo ms-recursos já criado e vazio:
git clone https://github.com/1marcelserrano/ms-recursos.git
# copie o conteúdo de md-files/ms-recursos/ pra dentro (sem node_modules/.next)
cd ms-recursos && npm install && npm run build   # confirmar verde
git add . && git commit -m "Initial: app /recursos (Next + Supabase + Resend)"
git push -u origin main
```

## v2 (fora do escopo desta entrega)
Sequências de nurture (5 emails B2C + 4 B2B) + Vercel Cron + roteamento por tag;
lotes/FOMO do Prompt Zero; CMS pros cards; Pixel Meta + UTMs.
