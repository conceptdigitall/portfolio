"use client";

import React from "react";
import {
  X,
  Printer,
  Download,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  FileText,
  Calendar,
  UserCheck,
  Building,
  Check,
} from "lucide-react";
import { Lot } from "@/types/auction";
import { formatBRL } from "@/utils/formatters";

interface LaudoModalProps {
  lot: Lot;
  isOpen: boolean;
  onClose: () => void;
}

export function LaudoModal({ lot, isOpen, onClose }: LaudoModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-dark-900 border border-neutral-800 rounded-2xl shadow-2xl text-white overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-dark-950">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base sm:text-lg text-white">
                Laudo Cautelar Pericial & Edital Oficial
              </h2>
              <p className="text-xs text-neutral-400">
                Lote #{lot.numeroLote} • {lot.title} • Nº {lot.inspection.numeroLaudo}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold text-xs transition-colors shadow-md"
              title="Salvar ou Imprimir em PDF Oficial"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Salvar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-dark-850 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Document Body (Styled as Official Forensic Inspection) */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 print:p-0 print:text-black">
          {/* Official Document Banner */}
          <div className="border-2 border-dashed border-neutral-700 rounded-xl p-5 bg-dark-950/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-gold-400 shrink-0">
                <ShieldCheck className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-500">
                  DOCUMENTO OFICIAL AUDITADO
                </span>
                <h3 className="text-lg font-bold text-white">
                  CERTIFICADO DE CONFORMIDADE CAUTELAR
                </h3>
                <p className="text-xs text-neutral-400">
                  Em conformidade com a Norma ABNT NBR 14653 e Resoluções CONTRAN
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-dark-900 border border-neutral-800 px-4 py-2.5 rounded-xl text-center sm:text-right">
              <div>
                <div className="text-[10px] uppercase font-semibold text-neutral-400">
                  Status Pericial
                </div>
                <div className="text-base font-extrabold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  {lot.inspection.resultadoGeral}
                </div>
              </div>
              <div className="border-l border-neutral-800 pl-3">
                <div className="text-[10px] uppercase font-semibold text-neutral-400">Score</div>
                <div className="text-xl font-mono font-bold text-gold-400">
                  {lot.inspection.pontuacaoGeral}/100
                </div>
              </div>
            </div>
          </div>

          {/* Technical Identification Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-dark-850 border border-neutral-800 rounded-xl p-4 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5" />
                Dados do Veículo Inspecionado
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-neutral-500 block text-[11px]">Marca / Modelo:</span>
                  <span className="font-semibold text-white">{lot.brand} {lot.model}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[11px]">Ano Fabricação/Modelo:</span>
                  <span className="font-semibold text-white">{lot.year}/{lot.modelYear}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[11px]">Número do Chassi:</span>
                  <span className="font-mono font-semibold text-white">{lot.specs.chassi}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[11px]">Placa / UF:</span>
                  <span className="font-mono font-semibold text-white">Final {lot.specs.finalPlaca} - {lot.state}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[11px]">Quilometragem Aferida:</span>
                  <span className="font-semibold text-white">{lot.mileageKm.toLocaleString("pt-BR")} KM</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[11px]">Combustível:</span>
                  <span className="font-semibold text-white">{lot.specs.combustivel}</span>
                </div>
              </div>
            </div>

            <div className="bg-dark-850 border border-neutral-800 rounded-xl p-4 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" />
                Credenciamento & Autenticação
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-neutral-500 block text-[11px]">Perito Responsável:</span>
                  <span className="font-semibold text-white">{lot.inspection.peritoResponsavel}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[11px]">Registro Pericial:</span>
                  <span className="font-mono font-semibold text-white">{lot.inspection.registroProfissional}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[11px]">Data da Vistoria:</span>
                  <span className="font-semibold text-white">{lot.inspection.dataVistoria}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[11px]">Local da Vistoria:</span>
                  <span className="font-semibold text-white">{lot.patio}</span>
                </div>
                <div className="col-span-2 pt-1 flex items-center justify-between border-t border-neutral-800/80">
                  <span className="text-[11px] text-neutral-400">Chave de Autenticação Digital:</span>
                  <span className="font-mono text-[10px] text-gold-400 bg-dark-900 px-2 py-0.5 rounded border border-neutral-700">
                    SHA256: 7f8b92a1...49c0
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Checklist de Itens Inspecionados (150 Itens) */}
          <div className="bg-dark-850 border border-neutral-800 rounded-xl p-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 flex items-center justify-between">
              <span>Auditoria Técnica Estrutural & Mecânica (150 Itens)</span>
              <span className="text-emerald-400 font-mono text-[11px]">● 100% Conforme</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="flex items-start gap-2 bg-dark-900/80 p-2.5 rounded-lg border border-neutral-800">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Longarinas Dianteiras/Traseiras</span>
                  <span className="text-[11px] text-neutral-400">Sem soldas, emendas ou deformações</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-dark-900/80 p-2.5 rounded-lg border border-neutral-800">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Colunas A, B e C</span>
                  <span className="text-[11px] text-neutral-400">Pontos de solda originais de fábrica</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-dark-900/80 p-2.5 rounded-lg border border-neutral-800">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Painel Corta-Fogo & Assoalho</span>
                  <span className="text-[11px] text-neutral-400">Alinhamento e vedação originais</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-dark-900/80 p-2.5 rounded-lg border border-neutral-800">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Espessura Média de Pintura</span>
                  <span className="text-[11px] text-neutral-400">{lot.inspection.espessuraPinturaMediaMicrons} µm (Padrão Original Montadora)</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-dark-900/80 p-2.5 rounded-lg border border-neutral-800">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Etiquetas ETA & Gravações</span>
                  <span className="text-[11px] text-neutral-400">Totalmente preservadas e legíveis</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-dark-900/80 p-2.5 rounded-lg border border-neutral-800">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Histórico de Sinistro</span>
                  <span className="text-[11px] text-neutral-400">{lot.inspection.historicoSinistro}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checklist de Avarias Registradas na Vistoria */}
          <div className="bg-dark-850 border border-neutral-800 rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400">
              Apontamentos Estéticos & Avarias Catalogadas
            </h4>
            <div className="space-y-2">
              {lot.damages.map((dmg, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2.5 rounded-lg bg-dark-900/70 border border-neutral-800 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        dmg.severity === "ok"
                          ? "bg-emerald-500"
                          : dmg.severity === "leve"
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }`}
                    ></span>
                    <span className="font-semibold text-white">{dmg.part}</span>
                    <span className="text-neutral-500">—</span>
                    <span className="text-neutral-300 font-medium">{dmg.condition}</span>
                  </div>
                  {dmg.notes && <span className="text-neutral-400 text-[11px]">{dmg.notes}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Forensic Signature & QR Code */}
          <div className="border-t border-neutral-800 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white text-dark-950">
                <QrCode className="w-10 h-10" />
              </div>
              <div>
                <span className="font-bold text-white block">Validação Digital do Edital</span>
                <span className="text-[11px] text-neutral-400 block">
                  Aponte a câmera para consultar a assinatura digital na base nacional.
                </span>
                <span className="font-mono text-[10px] text-gold-400">
                  ID: {lot.inspection.numeroLaudo}
                </span>
              </div>
            </div>

            <div className="text-center sm:text-right">
              <div className="font-serif italic text-white text-sm">
                {lot.inspection.peritoResponsavel}
              </div>
              <div className="text-[11px] text-neutral-500">
                Perito Técnico Credenciado • {lot.inspection.registroProfissional}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-neutral-800 bg-dark-950 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-neutral-400">
            Edital nº 042/2026 • Leiloeiro Oficial Reg. JUCESP nº 1.482
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-dark-850 hover:bg-neutral-800 text-xs font-semibold text-neutral-300 transition-colors"
            >
              Fechar
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold text-xs transition-colors shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Baixar / Imprimir Laudo Pericial</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
