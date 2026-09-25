import { createClient } from "@supabase/supabase-js";
import { config } from "./config.js";
import type { DealRow, FinanceiroDeal, FinanceiroSummary } from "./types.js";

const supabase = createClient(config.supabaseUrl, config.supabaseServiceRoleKey, {
  auth: { persistSession: false },
});

async function findFinanceiroPipelineId(): Promise<string | null> {
  const { data, error } = await supabase
    .from("pipelines")
    .select("id")
    .eq("account_id", config.financeiroAccountId)
    .eq("name", config.financeiroPipelineName)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to look up the Financeiro pipeline: ${error.message}`);
  }

  return data?.id ?? null;
}

export async function fetchFinanceiroSummary(): Promise<FinanceiroSummary> {
  const pipelineId = await findFinanceiroPipelineId();

  if (!pipelineId) {
    return { pipelineFound: false, deals: [], totalsByStage: {} };
  }

  const { data, error } = await supabase
    .from("deals")
    .select(
      "id,title,value,currency,notes,expected_close_date,updated_at,contacts(name,phone),pipeline_stages(name)",
    )
    .eq("pipeline_id", pipelineId)
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch Financeiro deals: ${error.message}`);
  }

  const rows = (data ?? []) as unknown as DealRow[];

  const deals: FinanceiroDeal[] = rows.map((row) => ({
    id: row.id,
    title: row.title,
    clientName: row.contacts?.name ?? "Sem nome",
    clientPhone: row.contacts?.phone ?? "",
    value: row.value,
    currency: row.currency,
    stage: row.pipeline_stages?.name ?? "Sem estagio",
    expectedCloseDate: row.expected_close_date,
    notes: row.notes,
  }));

  const totalsByStage: FinanceiroSummary["totalsByStage"] = {};
  for (const deal of deals) {
    const bucket = totalsByStage[deal.stage] ?? { count: 0, value: 0, currency: deal.currency };
    bucket.count += 1;
    bucket.value += deal.value;
    totalsByStage[deal.stage] = bucket;
  }

  return { pipelineFound: true, deals, totalsByStage };
}
