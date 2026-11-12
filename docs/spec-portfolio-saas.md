# SPEC — Portfólio Concept Digital (Formato SaaS & Domínio Oficial)

## 1. Objetivo / Problema
- **Posicionamento SaaS:** Transformar a vitrine da Concept Digital de um portfólio clássico de agência em uma plataforma com estética e narrativa de **SaaS de Ecossistema Digital**, apresentando os 3 pilares centrais de serviço (Landing Pages de Alta Conversão, Atendimento com IA 24/7 e Automatização de Marketing/CRM) de forma interativa e minimalista.
- **Conversão Consultiva no WhatsApp:** Ainda sem tabela fixa de preços (self-service checkout), toda a jornada de produto converge para **CTAs magnéticos e contextuais no WhatsApp** e para o **Simulador ao Vivo da Recepcionista de IA**.
- **Domínio Oficial:** Atualizar a infraestrutura de SEO, links canônicos, Sitemap e OpenGraph para o novo domínio oficial **`https://conceptdigitalbr.com.br`**.
- **Cases Reais Atualizados:** Incluir a **Essence Wear** junto aos cases reais em produção (Adega Teles, Barbearia do Alemão, Circuito FTV Cubatão, MA Automação, ADSUMUS e Dr. Fabricio Areco).

---

## 2. Fluxos & Regras de Negócio

### 2.1. Hero SaaS com Lobo-Guará Interativo
1. **Proposta de Valor Direta:** Headline imponente focada em engenharia de vendas e ativos digitais de alto padrão, acompanhada de badge de status ao vivo.
2. **Lobo-Guará Interativo (`InteractiveWolf.tsx`):**
   - O símbolo geométrico da Concept reage ao movimento do cursor no desktop (inclinação 3D suave / parallax por coordenadas e brilho dinâmico nos vértices amarelos `#FCE026`) e ao toque no mobile.
   - Nodes interativos ao redor do lobo representam os 3 pilares conectando o ecossistema (Captação → IA → Conversão).
3. **CTAs Principais:**
   - **CTA Primário (WhatsApp):** Botão de alto destaque em `#FCE026` com micro-interação, promessa de resposta no mesmo dia útil e rastreio no Supabase (`hero_saas_whatsapp`).
   - **CTA Secundário (Live Demo):** Botão para abrir imediatamente o simulador interativo da Recepcionista de IA (`#simulador-ia`) ou explorar os 3 pilares.

### 2.2. Seção dos 3 Pilares em Formato SaaS (`SaasPillars.tsx`)
1. **Seletor Interativo em Abas (Tabs):**
   - **Pilar 01 · Landing Pages & E-commerce de Alta Conversão:** Foco em velocidade sub-segundo, design autoral seguindo psicologia de conversão e integração nativa com WhatsApp/Pix.
   - **Pilar 02 · Atendimento com IA 24/7 (Recepcionista):** Qualificação imediata no WhatsApp, quebra de objeções e agendamento direto na agenda sem intervenção humana.
   - **Pilar 03 · Automatização de Marketing & CRM:** Prospecção B2B preditiva, geração de criativos/vídeos curtos, funil Kanban automatizado e métricas de ROI em tempo real.
2. **Preview Interativo + CTA Contextual:**
   - Ao alternar entre as abas, o painel lateral exibe uma demonstração viva em código daquele pilar, métricas de impacto e um botão de WhatsApp específico (ex: *"Quero uma Landing Page de alta conversão"*, *"Quero testar a IA no meu WhatsApp"*, *"Quero automatizar meu funil"*).

### 2.3. Cases Reais ("Powered by Concept") + Essence Wear
1. **Adição da Essence Wear:**
   - **Nicho:** Moda / Streetwear Cristão.
   - **Problema:** Vendas manuais por DM sem vitrine de marca nem controle de estoque unificado.
   - **Entrega:** E-commerce autoral com lookbook interativo, identidade visual oficial e catálogo integrado ao CRM Concept.
   - **Link no ar:** `https://narrow-gate-nine.vercel.app/`
   - **Imagem:** Mockup real extraído do projeto (`public/projects/essence-wear-mockup.png`).

### 2.4. Configuração do Domínio `conceptdigitalbr.com.br`
1. Em `src/lib/site.ts`, o fallback padrão de `SITE_URL` passa de `https://conceptdigitalportfolio.vercel.app` para `https://conceptdigitalbr.com.br`.
2. `sitemap.ts`, `robots.ts` e `layout.tsx` herdam automaticamente `SITE_URL`.

---

## 3. Arquitetura & Dados
- **Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS.
- **Rastreio CRM (Supabase):** Todos os novos botões de WhatsApp utilizam o componente `<WhatsAppLink>` existente, enviando eventos `whatsapp_clicks` com `buttonId` semântico para o banco do CRM Concept.
- **Guardrail de 350 Linhas (Anti-Alucinação):**
  - `src/components/home/HeroSaas.tsx` (< 220 linhas)
  - `src/components/home/InteractiveWolf.tsx` (< 180 linhas)
  - `src/components/home/SaasPillars.tsx` (< 250 linhas)
  - Refatoração modular de `src/components/home/Systems.tsx` (atualmente 430 linhas → extrair `SystemsScreens.tsx` para ficar < 250 linhas cada).

---

## 4. Design & UI (Brandbook Concept Digital)
- **Paleta Oficial:**
  - Base Escura Tecnológica: `#06081A` (`night`), `#0C1030` (`night-card`) e Azul Concept `#0624C7` (`concept-blue`).
  - Contraste Puro: `#FFFFFF` (`concept-white`).
  - Sotaque de Conversão: `#FCE026` (`concept-yellow`).
- **Tipografia:** `Poppins` (Bold/ExtraBold) para headlines, `Montserrat` para rótulos técnicos/métricas, `Inter` para leitura limpa.
- **Regra de Ouro:** 80% de espaço de respiro, bordas sutis (`1px solid #1E2550`), zero tabela de preços nesta fase, foco absoluto em levar o lead qualificado para o WhatsApp.

---

## 5. Definition of Done (DoD)
- [ ] `SITE_URL` atualizado para `https://conceptdigitalbr.com.br` em `src/lib/site.ts`.
- [ ] Hero SaaS no ar com animação fluida, Lobo-Guará interativo (resposta ao mouse/toque + seleção de pilares) e CTAs magnéticos para o WhatsApp.
- [ ] Seção interativa dos 3 Pilares SaaS (`SaasPillars.tsx`) com abas funcionais, preview vivo em código e CTAs de WhatsApp personalizados por serviço.
- [ ] Case real **Essence Wear** adicionado em `src/data/systems.ts` e `src/data/portfolio.ts` com imagem em `public/projects/`.
- [ ] Todos os arquivos tocados respeitando estritamente o teto de **350 linhas**.
- [ ] Validação determinística: `npx tsc --noEmit` e `npm run lint` com zero erros.
