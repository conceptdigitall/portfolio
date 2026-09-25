# Product Requirements Document (PRD) - Concept Streetwear

## 1. Visão Geral
Construção de um e-commerce de moda focado em streetwear vintage (*Concept Streetwear*). O projeto utilizará a referência estética "SOPULA", caracterizada por um tema Dark Mode, layouts assimétricos (grids "quebrados"), tipografia de alto contraste (Serif para títulos, Sans Serif para textos curtos/corpo) e foco massivo em recursos visuais impactantes (vídeos e fotografias grandes).

**Filosofia de Engenharia:** DRY, KISS, YAGNI, Especificação Otimizada (SDD) e Feature-Based Architecture.

---

## 2. Mapeamento de Features (Página Inicial e Fluxo Core)

1.  **Navbar & Header**
    *   Logo (Concept Streetwear).
    *   Links de categorias de navegação (Shop, Coleções, etc).
    *   Ícones interativos: Carrinho (com contador dinâmico) e Perfil/Login.
    *   Transformação on-scroll (Framer Motion: blur background ativo no scroll).

2.  **Hero Section Animado**
    *   Fundo de vídeo com o asset principal (`CamisaBranca.mp4` explodindo/reconstruindo em loop).
    *   Tipografia central sobreposta e CTA forte.
    *   Estrutura ocupando `100vh` ou `80vh` focado na imersão.

3.  **Deals Of The Month**
    *   Countdown Timer (Dias, Horas, Minutos, Segundos).
    *   Carrossel dinâmico listando os produtos em oferta.

4.  **Product Grid (Discover What's New)**
    *   Sistema de filtros visuais (Tabs/Botões).
    *   Cartões de produto limpos, mostrando: Imagem, Rating (Estrelas), Nome do Produto, Quantidade de Reviews e Preço.

5.  **Interactive "Feature" Banner (Explore the design)**
    *   Imagem principal com *Hotspots* ou *Pins* que, ao hover/click, descrevem particularidades do streetwear (ex: Costura invisível, Algodão egípcio, etc).

6.  **Trust Core Elements (Benefícios)**
    *   Grid textual e com ícones minimalistas (ex: High Quality, Free Shipping, 24/7 Support).

7.  **Instagram Feed**
    *   Seção "Sopula Studio" / "Concept Streetwear" com grid estético ocupando toda a tela com fotos da comunidade.

8.  **Newsletter Capture**
    *   Design assimétrico: blocos com imagens ao lado do input de e-mail central.
    *   Integração mockada inicial / futuramente conectada ao banco (Firebase).

9.  **Checkout & Auth (Backbone)**
    *   *Autenticação:* Firebase Auth (Email/Senha e Google).
    *   *Pagamentos:* Integração Stripe Checkout fluida.

---

## 3. Arquitetura de Pastas (Feature-Based)
Adotaremos a mentalidade de *Vertical Slicing*. O código que muda junto, fica junto.

```text
src/
├── app/                      # Roteamento do Next.js (App Router)
│   ├── (shop)/               # Grupo de rotas (Home, Coleções)
│   ├── checkout/             # Rota isolada para pagamentos
│   └── layout.tsx            # Providers e Header/Footer global
│
├── features/                 # Lógica de Negócios e UI isolada por escopo
│   ├── auth/                 # Login, Cadastro, Modais de acesso
│   ├── cart/                 # Zustand Store, Slide-over do carrinho
│   ├── checkout/             # Integração Stripe, Resumo de pedido
│   ├── home/                 # Componentes exclusivos da Home (Hero, Deals, InstaFeed)
│   └── products/             # Lógica de produtos, Cards, Fetching do DB
│
├── shared/                   # Código comum compartilhado globalmente
│   ├── components/ui/        # Componentes reutilizáveis puros (Botões, Inputs, Modal)
│   ├── lib/                  # Utils genéricos (cn, formatação), Firebase config
│   ├── hooks/                # Custom hooks compartilhados
│   └── styles/               # Configurações globais, tipografia
│
└── public/                   # Assets estáticos 
    └── img/                  # O vídeo CamisaBranca.mp4 e imagens default
```

---

## 4. Dependências Base

*   **Framework:** `next` (App Router) e `react`
*   **Styling:** `tailwindcss`
*   **Animações:** `framer-motion` (Micro-interações e Scroll animations)
*   **Icons:** `lucide-react` (Ícones minimalistas consistentes)
*   **Utilitários CSS:** `clsx` e `tailwind-merge` (Essenciais para abstrair componentes UI dinâmicos)
*   **Backend & DB:** `firebase` (Firestore e Autenticação)
*   **Pagamentos:** `stripe` e `@stripe/stripe-js`
*   **State Management:** `zustand` (Leve e excelente para gerenciar o Carrinho globalmente)
*   **Fontes:** `next/font/google` (Fontes Serif de alto aspecto premium e Sans leves)

---

## 5. Estratégia para o Vídeo Hero (CamisaBranca.mp4)

O principal desafio será fornecer a imersão visual sem causar bloqueios pesados no tempo de carregamento inicial (LCP).

**Técnica de Implementação:**
1.  **Formatos:** O vídeo `/img/CamisaBranca.mp4` atuará como um background elementar.
2.  **HTML5 TAG:** Utilizaremos a tag nativa do HTML envolta num contêiner responsivo.
    ```tsx
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay para contraste de texto */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-0"
      >
        <source src="/img/CamisaBranca.mp4" type="video/mp4" />
      </video>
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white">
        {/* Título principal e CTA */}
      </div>
    </div>
    ```
3.  **Acessibilidade e Performance (KISS):** A tag terá `playsInline` (crucial para rodar sem roubar a tela cheia no iOS) e deixaremos o `muted` ativado para bypassar policys de autoplay silencioso na maioria dos navegadores.

---
*Fim do Documento.*
