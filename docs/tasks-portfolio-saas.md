# BREAK & PLAN — Portfólio SaaS Concept Digital (`conceptdigitalbr.com.br`)

## Tabela de Tarefas Atômicas

| ID | Descrição | Arquivos Afetados | Limite LOC | Prioridade | Comando de Teste / Verify |
|---|---|---|---|---|---|
| **TASK-01** | Atualizar domínio canônico para `conceptdigitalbr.com.br` e adicionar case real **Essence Wear** (com imagem oficial) | `src/lib/site.ts`, `src/data/portfolio.ts`, `src/data/systems.ts`, `public/projects/essence-wear-mockup.png` | < 260 LOC cada | P0 | `npx tsc --noEmit` |
| **TASK-02** | Criar componente **Lobo-Guará Interativo** (`InteractiveWolf.tsx`) com reação 3D ao cursor/toque, vértices pulsantes `#FCE026` e nodes dos 3 pilares | `src/components/home/InteractiveWolf.tsx`, `src/app/globals.css` | < 200 LOC | P0 | `npx tsc --noEmit` |
| **TASK-03** | Criar **Hero SaaS** (`HeroSaas.tsx`) com estética minimalista (80% respiro), headline de ecossistema, Lobo-Guará interativo e CTAs magnéticos para WhatsApp + Simulador IA | `src/components/home/HeroSaas.tsx`, `src/components/home/SiteChrome.tsx` | < 220 LOC | P0 | `npx tsc --noEmit` |
| **TASK-04** | Criar seção **Os 3 Pilares SaaS** (`SaasPillars.tsx`) com Tabs interativas (Landing Pages, Atendimento IA, Automação de Marketing/CRM), preview visual em código e botões WhatsApp contextuais | `src/components/home/SaasPillars.tsx` | < 280 LOC | P0 | `npx tsc --noEmit` |
| **TASK-05** | Modularizar `Systems.tsx` (atualmente 430 LOC → < 250 LOC) extraindo `SystemsScreens.tsx` e integrar a nova jornada SaaS na `src/app/page.tsx` | `src/components/home/SystemsScreens.tsx`, `src/components/home/Systems.tsx`, `src/app/page.tsx` | < 250 LOC cada | P1 | `npm run lint && npx tsc --noEmit` |

---

## Detalhamento `INPUT → OUTPUT → VERIFY`

### TASK-01: Domínio `conceptdigitalbr.com.br` + Case Essence Wear
- **INPUT:** `src/lib/site.ts` apontando para `.vercel.app` e listas `projects` / `SYSTEM_CASES` sem a Essence Wear.
- **OUTPUT:** Fallback `https://conceptdigitalbr.com.br` ativo; imagem `public/projects/essence-wear-mockup.png` copiada de `narrow-gate-demo/og.png`; card da Essence Wear em `SYSTEM_CASES` e em `projects` (categoria `clientes`).
- **VERIFY:** `npx tsc --noEmit` passa sem erros e rotas `/sitemap.xml` e `/robots.txt` refletem o novo domínio.

### TASK-02: Lobo-Guará Interativo (`InteractiveWolf.tsx`)
- **INPUT:** `Wolf.tsx` estático apenas com animação CSS loop.
- **OUTPUT:** Novo componente client-side `InteractiveWolf.tsx` com rastreio suave de ponteiro (`onPointerMove`), inclinação 3D controlada, pontos de constelação em amarelo `#FCE026` clicáveis/hoveráveis que destacam os 3 pilares ("Landing Pages", "IA no WhatsApp", "Automação & CRM") e suporte a `prefers-reduced-motion`.
- **VERIFY:** `npx tsc --noEmit` + checagem de contagem de linhas (`wc -l < 350`).

### TASK-03: Hero SaaS (`HeroSaas.tsx`)
- **INPUT:** `HeroBento.tsx` antigo no formato portfólio de agência.
- **OUTPUT:** `HeroSaas.tsx` com layout SaaS minimalista de alto contraste, badge ao vivo, tipografia Poppins imponente, métrica de resposta rápida, CTAs atrativos para o WhatsApp (sem tabela de preços) + atalho direto para o Simulador de IA, integrado ao `InteractiveWolf`.
- **VERIFY:** `npx tsc --noEmit` + checagem de contagem de linhas (`wc -l < 350`).

### TASK-04: Seção Interativa dos 3 Pilares (`SaasPillars.tsx`)
- **INPUT:** Seção `Solutions` estática em `Sections.tsx`.
- **OUTPUT:** Componente `SaasPillars.tsx` com seletor de abas estilo SaaS:
  1. **Landing Pages & E-commerce:** Preview de alta velocidade (Core Web Vitals 99+, estrutura de conversão) + CTA WhatsApp.
  2. **Atendimento com IA 24/7:** Preview da conversa qualificadora + botão para abrir o Simulador ao Vivo ou chamar no WhatsApp.
  3. **Automatização de Marketing & CRM:** Preview do fluxo de vídeos/prospecção/Kanban + CTA WhatsApp.
- **VERIFY:** `npx tsc --noEmit` + checagem de contagem de linhas (`wc -l < 350`).

### TASK-05: Modularização 350 LOC & Composição da Home (`page.tsx`)
- **INPUT:** `Systems.tsx` com 430 linhas e `page.tsx` com a estrutura antiga.
- **OUTPUT:** Extração das telas animadas para `SystemsScreens.tsx` (reduzindo `Systems.tsx` e `SystemsScreens.tsx` para ~215 linhas cada), atualização da `page.tsx` com a nova narrativa SaaS (`HeroSaas` → `SaasPillars` → `Film` → `Systems` → `ProjectsGrid` → `Testimonials` → `Process` → `Faq` → `ContactCTA`).
- **VERIFY:** `wc -l src/components/home/*.tsx` (todos < 350 linhas), `npx tsc --noEmit` e `npm run lint`.
