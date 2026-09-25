import { fetchFinanceiroSummary } from "./supabase.js";
import { loadPortfolio } from "./portfolio.js";
import { generateDigest } from "./claude.js";
import { sendWhatsAppMessage } from "./whatsapp.js";

async function main() {
  console.log("Buscando dados do pipeline Financeiro no wacrm...");
  const financeiro = await fetchFinanceiroSummary();

  console.log("Lendo carteira de investimentos (portfolio.json)...");
  const portfolio = loadPortfolio();

  console.log("Gerando resumo com Claude (com busca na web para contexto de mercado)...");
  const digest = await generateDigest(financeiro, portfolio);

  console.log("\n----- MENSAGEM GERADA -----\n");
  console.log(digest);
  console.log("\n---------------------------\n");

  console.log("Enviando pelo WhatsApp (Evolution API)...");
  await sendWhatsAppMessage(digest);

  console.log("Mensagem enviada com sucesso.");
}

main().catch((error) => {
  console.error("Falha ao rodar o financeiro-bot:", error);
  process.exitCode = 1;
});
