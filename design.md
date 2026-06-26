# Design System — ms-recursos

Aplicação do **MSCREATIVE.SYSTEMS™ Design System V3.0** ("Chumbo Puro + Lima Ácida") no funil `/recursos` (MS Creative Keys).

> Fonte canônica dos tokens: `design-system/css/tokens.css` (repo `1marcelserrano/design-system`). Este doc registra **o subconjunto realmente usado** aqui e como ele está montado no código.

---

## 1. Princípios

- **Fundo escuro arquitetônico.** Chumbo Puro (`#0A0A0E`) com grid sutil de 54px. O conteúdo flutua sobre uma malha técnica.
- **Acento monocromático.** Um acento só carrega a marca: **lima ácida `#B4C636`**. Tudo que é ação, ênfase ou link é lima. Ouro é cerimonial (reservado a selo).
- **Tipografia híbrida pós-digital.** Serif editorial (Fraunces) para headline, sans neutra (Inter Tight) para corpo, mono (IBM Plex Mono) para labels/kickers.
- **Raios pequenos.** 3–4px. Sem pílulas. Linguagem de placa, não de bolha.
- **Sentence case** (DEC-023): caixa alta só em wordmark, siglas e kickers mono.

---

## 2. Cores (tokens Tailwind)

Definidos em `tailwind.config.ts` → `theme.extend.colors`. Variações de opacidade via modificadores Tailwind (`text-cream/55`, `bg-lima/10`, `border-white/10`).

| Token | Hex | Uso |
|---|---|---|
| `bg` | `#0A0A0E` | fundo base |
| `bg-end` | `#111114` | fim do gradiente de fundo |
| `surface` | `#16181F` | cards, inputs, nav |
| `surface-2` | `#1C1F28` | hover de superfície |
| `cream` | `#B2A898` | corpo + headlines (warm low-saturation) |
| `ink` | `#0A0A0E` | texto sobre lima (botões) |
| `lima` | `#B4C636` | **acento principal** — CTAs, links, ênfase, kickers |
| `lima-deep` | `#6A7820` | acento secundário |
| `gold` | `#E8C547` | cerimonial — só em selo (não usado em CTA) |

**Escala de texto por opacidade do `cream`:**
- `text-cream` — headlines, corpo forte
- `text-cream/80` — corpo
- `text-cream/55` — secundário / muted
- `text-cream/45` e `/40` — legendas, disclaimers
- `text-cream/35` — placeholder de input

**Bordas:** `border-white/10` (sutil padrão), `border-lima/30`–`/40` (destaque), `border-lima/60` (acento forte).

---

## 3. Tipografia

Carregada via `next/font/google` em `app/layout.tsx`, exposta como CSS vars e mapeada em `tailwind.config.ts → fontFamily`.

| Família | Var | Tailwind | Uso |
|---|---|---|---|
| **Fraunces** (variable) | `--font-fraunces` | `font-display` | headlines (H1/H2/H3) |
| **Inter Tight** (variable) | `--font-inter-tight` | `font-sans` (corpo default) | corpo, parágrafos, botões |
| **IBM Plex Mono** (400/500/600) | `--font-plex-mono` | `font-mono` | kickers, labels, badges, footer |

**Headlines (`font-display`):** Fraunces com eixo óptico via `globals.css` (`.font-display { font-variation-settings: "opsz" 72; }`), `font-semibold`, `tracking-[-0.02em]`, sentence case. Tamanhos via `text-3xl`/`text-4xl`/`sm:text-5xl`.

**Kicker (`.kicker`, em `globals.css`):**
```css
.kicker {
  font-family: var(--font-plex-mono), ui-monospace, monospace;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 0.72rem;
  color: #b4c636; /* lima */
}
```

---

## 4. Fundo + grid

Em `globals.css`, no `body`. A ordem das camadas importa: as **duas linhas de grid vêm primeiro (topo)** e o gradiente opaco fica por último (base), senão ele cobre as linhas (espelha `ds-shell.css`).

```css
body {
  background-color: #0a0a0e;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(145deg, #0a0a0e 0%, #111114 100%);
  background-size: 54px 54px, 54px 54px, 100% 100%;
  background-attachment: fixed;
  color: #b2a898;
  font-family: var(--font-inter-tight), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}
```

- Grid: **54px**, cor `rgba(255,255,255,0.025)` (sutil por spec).
- Gradiente: `145deg`, `#0A0A0E → #111114`.
- `background-attachment: fixed` (o grid não rola junto).

---

## 5. Raios

`tailwind.config.ts → borderRadius`:

| Token | Valor | Uso |
|---|---|---|
| `rounded-card` | `4px` | cards, nav, retrato, inputs maiores |
| `rounded-ctl` | `3px` | botões, inputs, badges, chips |

---

## 6. Padrões de componente

**Card** — `rounded-card border border-white/10 bg-surface p-6` (+ `hover:border-lima/30` quando clicável).

**Botão primário (CTA)** — `rounded-ctl bg-lima px-6 py-3 font-semibold text-ink hover:opacity-90`.

**Botão secundário / outline** — `rounded-ctl border border-lima/40 px-7 py-3 font-semibold text-lima hover:bg-lima/10`.

**Input / textarea** — `rounded-ctl border border-white/10 bg-surface px-5 py-3 text-cream placeholder:text-cream/35 focus:border-lima` (+ `accent-lima` em radio/checkbox).

**Link de ênfase** — `font-medium text-lima hover:underline`.

**Badge de lane (freebies)** — `rounded-ctl font-mono text-[10px] uppercase tracking-[0.18em]`; lanes de ação `bg-lima/10 text-lima`, catálogo `bg-white/5 text-cream/55`.

**Nav** — sticky, `rounded-card border border-white/10 bg-bg/70 backdrop-blur`; links `rounded-ctl text-cream/70 hover:bg-lima hover:text-ink`.

**Retrato (`Portrait.tsx`)** — `aspect-[4/5] rounded-card`, lê `/public/marcel.jpg` com pré-load silencioso (`new Image()`) e placeholder mono enquanto não carrega (sem flash de imagem quebrada).

**Footer** — mono, `text-xs uppercase tracking-[0.22em] text-cream/40`, wordmark `MSCREATIVE.SYSTEMS™` em `text-cream/70`.

---

## 7. Regras de voz aplicadas ao texto da UI

Auditadas pela skill `content-critic`:

- **Sem em dash (`—`).** Usar ponto, dois-pontos ou parênteses.
- **Sem negative parallelism** ("Não é X. É Y." e variantes).
- **Léxico banido fora:** curso, turma, potencializar/potencial, turbinar, alavancar, fácil, simples, mágico, etc.
- **Sentence case** em headlines; caixa alta só em kicker mono, wordmark e siglas.
- Frases curtas, voz ativa, registro Tradutor (horizontal).

---

## 8. Mapa de arquivos

| Arquivo | Papel |
|---|---|
| `tailwind.config.ts` | tokens (cores, fontes, raios) |
| `app/globals.css` | fundo + grid, body, `.kicker`, `.font-display` |
| `app/layout.tsx` | carregamento das 3 fontes (`next/font`), nav, footer |
| `components/Nav.tsx` | navegação |
| `components/Portrait.tsx` | slot de retrato |
| `components/FreebieCard.tsx` · `FreebieGrid.tsx` | grade de freebies |
| `components/OptInForm.tsx` · `Survey.tsx` | formulários |
| `lib/freebies.ts` | dados + `LANE_STYLES` (cores por lane) |

---

*ms-recursos — DS V3.0 (Chumbo Puro + Lima Ácida) · MS Creative Keys, uma marca MSCREATIVE.SYSTEMS™.*
