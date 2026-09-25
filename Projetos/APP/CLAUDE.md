# financeiro-bot

Automacao pessoal que le o status de pagamento dos clientes no pipeline
"Financeiro" do wacrm (Supabase), le a carteira de investimentos manual
em `portfolio.json`, pede pro Claude gerar um resumo financeiro + dicas
de investimento (com busca na web para contexto de mercado), e envia o
resultado por WhatsApp via Evolution API.

## Regras de comunicacao
- Sempre escreva codigo completo, sem omitir partes com comentarios
- Responda em portugues, escreva codigo em ingles

## Arquitetura
- TypeScript + tsx (sem etapa de build), Node.js
- `src/supabase.ts` — le deals do pipeline "Financeiro" via @supabase/supabase-js
  (service role key, mesmo projeto do wacrm)
- `src/portfolio.ts` — le `portfolio.json` (lista manual de ativos)
- `src/claude.ts` — chama a Anthropic Messages API (`@anthropic-ai/sdk`),
  com a tool server-side `web_search` para contexto de mercado real
- `src/whatsapp.ts` — envia a mensagem final via Evolution API
  (`POST /message/sendText/{instance}`)
- `src/run.ts` — orquestra tudo, disparado manualmente com `npm run run`

## Regras de codigo
- Sem agendamento automatico por enquanto — execucao e sempre manual
  (`npm run run`). Nao adicionar cron/scheduler sem pedido explicito.
- Nunca commitar `.env` (contem service role key, chave Anthropic, chave
  da Evolution API)
- `portfolio.json` e mantido manualmente pelo usuario — o script so le,
  nunca escreve nele
