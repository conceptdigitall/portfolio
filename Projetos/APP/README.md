# financeiro-bot

Automação pessoal: lê o status de pagamento dos clientes no pipeline
"Financeiro" do wacrm (criado no mesmo Supabase do CRM), lê sua carteira
de investimentos manual (`portfolio.json`), pede para o Claude gerar um
resumo financeiro + análise de carteira + resumo de mercado (com busca
na web), e envia tudo pro seu WhatsApp via Evolution API.

## Como usar

1. **Preencha `portfolio.json`** com seus ativos reais (apague o exemplo).
2. **Preencha `NOTIFY_WHATSAPP_NUMBER`** no `.env` com o seu número no
   formato E.164 sem o `+` (ex: `5511999999999`).
3. No wacrm, abra a aba **Pipelines** e cadastre um "deal" para cada
   cliente dentro do pipeline **Financeiro**, arrastando para o estágio
   certo: **Pendente**, **Pago** ou **Atrasado**. O valor do deal é o
   valor a receber daquele cliente.
4. Instale as dependências:
   ```bash
   npm install
   ```
5. Rode manualmente quando quiser o resumo:
   ```bash
   npm run run
   ```

## O que ele faz

1. Busca todos os "deals" do pipeline **Financeiro** no Supabase do
   wacrm (mesmo projeto, service role key), já com nome/telefone do
   cliente e o estágio (Pendente/Pago/Atrasado).
2. Lê `portfolio.json` (lista manual de ativos: ticker, tipo, quantidade,
   preço médio).
3. Manda tudo pro Claude (`claude-opus-5`) com a tool de busca na web
   habilitada, pedindo um resumo em 3 partes: financeiro dos clientes,
   análise da carteira, resumo de mercado.
4. Envia o texto gerado para o seu WhatsApp via Evolution API
   (`POST /message/sendText/{instance}`).

## Sem agendamento (por enquanto)

Rodando sob demanda com `npm run run`. Se depois você quiser rodar
isso automaticamente todo dia, dá pra colocar num cron job local, ou
migrar para uma Vercel Cron Function — mas isso não foi montado agora
de propósito, pra você primeiro validar se o conteúdo gerado está bom.

## Variáveis de ambiente

Veja `.env.example`. O `.env` real já vem preenchido com as chaves que
você já tinha configuradas no wacrm (Supabase, Anthropic, Evolution
API) — falta só o seu número de WhatsApp em `NOTIFY_WHATSAPP_NUMBER`.

**Nunca commite o `.env`** — ele tem a service role key do Supabase, a
chave da Anthropic e a chave da Evolution API.
