# Plano de Integração: Métricas do Portfólio & Sites Modelos no CRM Concept

## Objetivo
Conectar os dados de tráfego e interesse do Portfólio (número de visitas, site modelo mais acessado, cliques em projetos) ao Dashboard do CRM Concept de forma segura, modular e sem alterar a lógica de negócios interna de nenhum dos dois projetos.

---

## 1. Arquitetura da Solução

```
[Portfólio (Next.js)]
   │
   ├─► AnalyticsTracker / ProjectGrid (trackEvent)
   │        │
   │        ▼ (insert)
   └─► [Supabase CRM (pkvlnh...)] 
            ▲
            │ (select / aggregate)
[CRM Concept wacrm (Next.js Dashboard)]
   │
   └─► PortfolioAnalyticsSection (Cards + Top Modelos Ranking)
```

1. **Camada de Dados**:
   - Criação das tabelas de métricas (`page_views`, `project_clicks`, `cta_clicks`, `form_events`) no banco Supabase do CRM (`pkvlnhfzhjjsblotzoxn.supabase.co`).
   - Fornecimento de script SQL idempotente com RLS configurado para inserção anônima (do portfólio) e leitura pelo CRM.
2. **Camada do Portfólio**:
   - Apontar as variáveis de ambiente `.env.local` do Portfólio para o Supabase do CRM.
   - Manter as funções nativas de rastreamento (`trackEvent`) intactas.
3. **Camada do CRM**:
   - Criar módulo de consulta dedicado em `src/lib/dashboard/portfolio-queries.ts` (sem misturar com os queries de WhatsApp).
   - Criar componente visual premium `PortfolioAnalyticsSection` em `src/components/dashboard/portfolio-analytics.tsx`.
   - Integrar o componente no `dashboard/page.tsx`.

---

## 2. Tarefas de Execução

- [x] **Tarefa 1: Script SQL de Migração das Métricas no Supabase do CRM**
  - Gerar `CRM Concept/wacrm/supabase/migrations/20260925_portfolio_analytics.sql` com tabelas `page_views`, `project_clicks`, `cta_clicks`, `form_events` e permissões/índices.
  - *Critério de Verificação*: Arquivo SQL bem formado e compatível com Postgres/Supabase. (Concluído)

- [x] **Tarefa 2: Atualizar credenciais Supabase do Portfólio**
  - Atualizar `.env.local` e `src/lib/supabase.ts` na raiz para apontar para a instância unificada do CRM.
  - *Critério de Verificação*: `src/lib/supabase.ts` aponta para `pkvlnhfzhjjsblotzoxn.supabase.co`. (Concluído)

- [x] **Tarefa 3: Criar Tipos e Módulo de Consulta no CRM (`portfolio-queries.ts`)**
  - Em `CRM Concept/wacrm/src/lib/dashboard/portfolio-queries.ts`:
    - `loadPortfolioMetrics(db)`: busca total de page views, page views recentes, modelo mais acessado, total de cliques em modelos e lista de top modelos ranqueados.
  - *Critério de Verificação*: Tipagem TypeScript estrita sem `any`. (Concluído)

- [x] **Tarefa 4: Criar Componente Visual no CRM (`portfolio-analytics.tsx`)**
  - Em `CRM Concept/wacrm/src/components/dashboard/portfolio-analytics.tsx`:
    - Cards de resumo (Visitas Portfólio, Modelo Campeão, Cliques em Demonstrações, Conversão).
    - Tabela/Ranking visual com barras de progresso para os Modelos Mais Acessados.
    - Suporte a estados de carregamento (Skeleton) e estado vazio gracioso.
  - *Critério de Verificação*: Segue rigorosamente o design system do CRM (Tailwind, Lucide icons, Dark mode, cards com bordas padrão). (Concluído)

- [x] **Tarefa 5: Integrar no Dashboard do CRM (`dashboard/page.tsx`)**
  - Adicionar o estado e a chamada de carregamento do `loadPortfolioMetrics` em paralelo com os outros dados.
  - Posicionar a seção de forma elegante no layout do dashboard.
  - *Critério de Verificação*: `npm run typecheck` no CRM sem nenhum erro. (Concluído)

- [x] **Tarefa 6: Verificação de Build e Integridade**
  - Rodar typecheck/lint no CRM (`npm run typecheck`).
  - Rodar typecheck/lint no Portfólio (`npm run lint`).
  - *Critério de Verificação*: Zero regressões ou erros em ambas as aplicações. (Concluído)
