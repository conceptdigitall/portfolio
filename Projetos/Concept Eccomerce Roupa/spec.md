<thinking>
O PRD define uma estrutura robusta baseada em Features. O desafio técnico aqui é a harmonia entre o vídeo em loop (Hero) e o layout assimétrico. Vou focar em modularizar o componente de Vídeo para que ele seja reutilizável e definir a estrutura de temas do Tailwind para garantir o "Pure Black" da Concept Streetwear.

Decisões de Arquitetura para a Spec:
Shadcn/ui (Base): Usaremos a filosofia do Shadcn para os componentes em shared/components/ui (copiar e adaptar, não apenas instalar).
Framer Motion: Centralizaremos as variantes de animação em um arquivo de constantes para manter o DRY.
Video Optimization: A spec deve prever um overlay gradiente para garantir legibilidade sobre a camisa branca.
</thinking>

<planning>
Definição de Temas: Configurar tailwind.config.ts com as fontes 'Playfair Display' e 'DM Sans'.
Componentes Core: Criar a especificação do HeroSection com o vídeo e o ProductCard assimétrico.
Shared UI: Especificar o componente Button com o efeito 'Shimmer' dourado.
Estrutura de Arquivos: Listar todos os arquivos necessários para o MVP da Home.
</planning>

# spec.md - Especificação Técnica: Concept Streetwear (MVP)

Este documento serve como o guia de implementação para a Fase 3.

## 1. Arquivos a serem criados/modificados

| Caminho do Arquivo | Responsabilidade |
| :--- | :--- |
| `tailwind.config.ts` | Definição da paleta #000000 e fontes premium. |
| `src/shared/styles/globals.css` | Reset de CSS e variáveis de tipografia. |
| `src/features/home/components/Hero.tsx` | Implementação do vídeo CamisaBranca.mp4 e animação de entrada. |
| `src/features/home/components/Deals.tsx` | Grid de ofertas com contador. |
| `src/features/products/components/ProductCard.tsx` | Componente de card seguindo a estética da imagem gerada. |
| `src/shared/components/ui/Button.tsx` | Botão reutilizável com variantes (Primary Gold, Outline). |

## 2. Lógica de Implementação (Pseudocódigo)

**Feature: Hero (Video Loop)**
```typescript
// Local: src/features/home/components/Hero.tsx
// Lógica: 
// - Usar framer-motion para o H1 (Concept Streetwear) com stagger children.
// - Video tag com z-index baixo e pointer-events-none.
// - Gradiente radial superior para suavizar a transição com a Navbar.
```

**Feature: Product Grid (SOPULA Aesthetic)**
```typescript
// Local: src/features/products/components/ProductCard.tsx
// Lógica:
// - Aspect ratio fixo para as imagens.
// - Texto alinhado à esquerda com tipografia DM Sans.
// - Hover effect: escala leve na imagem e aparição do botão 'Quick Add'.
```

## 3. Variáveis de Ambiente e Configuração
* `NEXT_PUBLIC_FIREBASE_CONFIG`: Para Auth e Database.
* `STRIPE_PUBLIC_KEY`: Para o checkout mockado.
