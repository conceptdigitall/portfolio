export type LotCategory =
  | "Recuperados de Financiamento"
  | "Sinistro Médio"
  | "Frotas Corporativas"
  | "Superesportivos & Luxo";

export type LotStatus = "aberto" | "em_disputa" | "prorrogado" | "arrematado" | "encerrado";

export interface BidHistoryEntry {
  id: string;
  lotId: string;
  bidderName: string;
  bidderCity: string;
  amount: number;
  timestamp: string;
  isCurrentUser?: boolean;
}

export interface DamageItem {
  part: string;
  condition: "Sem Avarias" | "Pequeno Risco" | "Amassado Leve" | "Peça Repintada" | "Substituição Recomendada";
  severity: "ok" | "leve" | "atencao";
  notes?: string;
}

export interface TechnicalSpecs {
  motor: string;
  potencia: string;
  cambio: string;
  tracao: string;
  combustivel: string;
  cor: string;
  portas: number;
  finalPlaca: string;
  chassi: string;
  renavam: string;
  ipva: "Pago 2026" | "Por conta do comprador";
  documentacao: "DUT/ATPV-e pronto para transferência" | "Em regularização (prazo 30 dias)";
}

export interface InspectionReport {
  numeroLaudo: string;
  peritoResponsavel: string;
  registroProfissional: string;
  dataVistoria: string;
  resultadoGeral: "APROVADO" | "APROVADO COM APONTAMENTOS" | "REPROVADO";
  pontuacaoGeral: number; // ex: 94/100
  espessuraPinturaMediaMicrons: number;
  estruturaStatus: "Sem cortes ou emendas, longarinas e caixas de roda intactas" | "Apontamentos leves";
  historicoSinistro: "Sem registro de sinistro estrutural" | "Sinistro de Pequena/Média Monta regularizado";
  historicoLeilaoAnterior: "Primeiro registro em leilão" | "Recuperação bancária";
}

export interface Lot {
  id: string;
  numeroLote: string;
  title: string;
  subtitle: string;
  brand: string;
  model: string;
  year: number;
  modelYear: number;
  mileageKm: number;
  patio: string;
  city: string;
  state: string;
  category: LotCategory;
  status: LotStatus;
  images: string[];
  initialBid: number;
  currentBid: number;
  bidCount: number;
  minIncrement: number;
  fipeValue: number;
  endDate: string; // ISO string
  highlight?: boolean;
  specs: TechnicalSpecs;
  damages: DamageItem[];
  inspection: InspectionReport;
  bidsHistory: BidHistoryEntry[];
}
