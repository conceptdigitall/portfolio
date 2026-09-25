export interface DealRow {
  id: string;
  title: string;
  value: number;
  currency: string;
  notes: string | null;
  expected_close_date: string | null;
  updated_at: string;
  contacts: {
    name: string | null;
    phone: string;
  } | null;
  pipeline_stages: {
    name: string;
  } | null;
}

export interface FinanceiroDeal {
  id: string;
  title: string;
  clientName: string;
  clientPhone: string;
  value: number;
  currency: string;
  stage: string;
  expectedCloseDate: string | null;
  notes: string | null;
}

export interface FinanceiroSummary {
  pipelineFound: boolean;
  deals: FinanceiroDeal[];
  totalsByStage: Record<string, { count: number; value: number; currency: string }>;
}

export interface PortfolioAsset {
  ticker: string;
  tipo: string;
  quantidade: number;
  precoMedio: number;
  notas?: string;
}
