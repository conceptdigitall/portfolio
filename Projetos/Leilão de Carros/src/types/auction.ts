export type LotCategory =
  | "e-MTB Performance"
  | "Urbanas & Commuter"
  | "Frotas & Delivery"
  | "Superbikes de Carbono";

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
  condition: "Sem Avarias" | "Pequeno Risco" | "Desgaste Natural" | "Peça Revisada" | "Substituição Recomendada";
  severity: "ok" | "leve" | "atencao";
  notes?: string;
}

export interface TechnicalSpecs {
  motor: string;
  torque: string;
  bateriaCapacidade: string; // ex: 700Wh
  saudeBateriaSoH: number; // ex: 98%
  ciclosCarga: number; // ex: 24 ciclos
  autonomiaEstimadaKm: string; // ex: 80-130 km
  quadro: string; // ex: Carbono FACT 11m
  tamanhoQuadro: string; // ex: Tamanho M (17")
  transmissao: string; // ex: SRAM GX Eagle AXS 12v
  freios: string; // ex: Magura MT7 Pro Hidráulico 4 pistões
  suspensao: string; // ex: FOX 38 Factory Kashima 160mm
  pesoKg: string; // ex: 21.8 kg
  odometroKm: number;
  carregadorIncluso: "Original Rápido 4A Incluso com Chave" | "Incluso com Cabo Bivolt";
  documentacao: "Nota Fiscal de Origem & Registro Nacional de Bike" | "Edital de Seguradora com Origem Auditada";
}

export interface InspectionReport {
  numeroLaudo: string;
  peritoResponsavel: string;
  registroProfissional: string;
  dataVistoria: string;
  resultadoGeral: "APROVADO" | "APROVADO COM APONTAMENTOS" | "REPROVADO";
  pontuacaoGeral: number; // ex: 98/100
  saudeBateriaPercent: number; // ex: 97%
  testeUltrassomQuadro: "100% íntegro sem trincas, delaminação ou fadiga estrutural" | "Sem anomalias estruturais";
  diagnosticoMotorEletronico: "Sem falhas de telemetria, software atualizado e torque nominal validado" | "Revisado";
  historicoApreensaoSeguro: "Recuperação bancária / Financiamento" | "Seguradora sem perda estrutural" | "Frota corporativa desmobilizada";
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
  odometerKm: number;
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
  retailValue: number; // Preço de mercado/nova (equivalente FIPE de bikes)
  endDate: string; // ISO string
  highlight?: boolean;
  specs: TechnicalSpecs;
  damages: DamageItem[];
  inspection: InspectionReport;
  bidsHistory: BidHistoryEntry[];
}
