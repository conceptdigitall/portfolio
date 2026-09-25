import Anthropic from "@anthropic-ai/sdk";
import { config } from "./config.js";
import type { FinanceiroSummary, PortfolioAsset } from "./types.js";

const client = new Anthropic({ apiKey: config.anthropicApiKey });

function formatFinanceiroSection(summary: FinanceiroSummary): string {
  if (!summary.pipelineFound) {
    return "O pipeline 'Financeiro' ainda nao foi encontrado no wacrm.";
  }

  if (summary.deals.length === 0) {
    return "O pipeline 'Financeiro' existe mas nao tem nenhum cliente cadastrado ainda.";
  }

  const lines: string[] = [];
  for (const [stage, totals] of Object.entries(summary.totalsByStage)) {
    lines.push(`- ${stage}: ${totals.count} cliente(s), total ${totals.value.toFixed(2)} ${totals.currency}`);
  }

  lines.push("");
  lines.push("Detalhe por cliente:");
  for (const deal of summary.deals) {
    lines.push(
      `- ${deal.clientName} (${deal.clientPhone}) — ${deal.title} — ${deal.value.toFixed(2)} ${deal.currency} — estagio: ${deal.stage}${deal.notes ? ` — obs: ${deal.notes}` : ""}`,
    );
  }

  return lines.join("\n");
}

function formatPortfolioSection(portfolio: PortfolioAsset[]): string {
  if (portfolio.length === 0) {
    return "Nenhum ativo cadastrado em portfolio.json.";
  }

  return portfolio
    .map(
      (asset) =>
        `- ${asset.ticker} (${asset.tipo}): ${asset.quantidade} unidade(s) a preco medio de ${asset.precoMedio}${asset.notas ? ` — ${asset.notas}` : ""}`,
    )
    .join("\n");
}

export async function generateDigest(
  financeiro: FinanceiroSummary,
  portfolio: PortfolioAsset[],
): Promise<string> {
  const financeiroSection = formatFinanceiroSection(financeiro);
  const portfolioSection = formatPortfolioSection(portfolio);

  const userPrompt = `Voce e um assistente financeiro pessoal. Gere uma mensagem de WhatsApp curta e direta (sem markdown de negrito com asteriscos duplos, use texto simples) com tres partes bem separadas por linha em branco:

1. RESUMO FINANCEIRO DOS CLIENTES — baseado nos dados abaixo do pipeline "Financeiro", diga quem pagou, quem esta pendente e quem esta atrasado, com os totais por status. Se algum cliente estiver atrasado, destaque isso primeiro.

2. ANALISE DA CARTEIRA — baseado na lista de ativos abaixo, comente brevemente sobre concentracao/diversificacao e qualquer ponto de atencao. Nao invente cotacoes atuais que voce nao tem certeza — se nao tiver dado de preco atual, comente so com base na composicao informada.

3. RESUMO DE MERCADO — use a busca na web para trazer 2-3 pontos atuais relevantes sobre o mercado financeiro brasileiro (juros, cambio, bolsa) e como isso pode impactar os ativos listados.

Seja direto, sem enrolação, como uma mensagem real de WhatsApp entre amigos. No maximo ~200 palavras no total.

--- DADOS FINANCEIRO (clientes) ---
${financeiroSection}

--- CARTEIRA DE INVESTIMENTOS ---
${portfolioSection}
`;

  const response = await client.messages.create({
    model: config.anthropicModel,
    max_tokens: 2000,
    tools: [
      {
        type: "web_search_20250305",
        name: "web_search",
        max_uses: 5,
      },
    ],
    messages: [{ role: "user", content: userPrompt }],
  });

  const textParts: string[] = [];
  for (const block of response.content) {
    if (block.type === "text") {
      textParts.push(block.text);
    }
  }

  const digest = textParts.join("\n").trim();
  if (!digest) {
    throw new Error("Claude did not return any text content for the digest.");
  }

  return digest;
}
