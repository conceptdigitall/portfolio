import "dotenv/config";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const config = {
  supabaseUrl: requireEnv("SUPABASE_URL"),
  supabaseServiceRoleKey: requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
  financeiroAccountId: requireEnv("FINANCEIRO_ACCOUNT_ID"),
  financeiroPipelineName: process.env.FINANCEIRO_PIPELINE_NAME ?? "Financeiro",

  anthropicApiKey: requireEnv("ANTHROPIC_API_KEY"),
  anthropicModel: process.env.ANTHROPIC_MODEL ?? "claude-opus-5",

  evolutionApiUrl: requireEnv("EVOLUTION_API_URL"),
  evolutionApiKey: requireEnv("EVOLUTION_API_KEY"),
  evolutionInstanceName: requireEnv("EVOLUTION_INSTANCE_NAME"),

  notifyWhatsappNumber: requireEnv("NOTIFY_WHATSAPP_NUMBER"),
};
