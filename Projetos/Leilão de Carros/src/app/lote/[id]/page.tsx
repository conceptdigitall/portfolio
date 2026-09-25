"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Gavel,
  ShieldCheck,
  Calendar,
  Gauge,
  MapPin,
  TrendingUp,
  FileText,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ArrowLeft,
  Share2,
  ZoomIn,
  Clock,
  Sparkles,
  HelpCircle,
  Car,
  Wrench,
  Check,
} from "lucide-react";
import { useAuction } from "@/context/AuctionContext";
import { CountdownBadge } from "@/components/CountdownBadge";
import { LaudoModal } from "@/components/LaudoModal";
import { AUCTION_FAQ } from "@/data/mockLots";
import {
  formatBRL,
  formatDiscountVsFipe,
  formatRelativeTime,
} from "@/utils/formatters";

export default function LotDetailPage() {
  const params = useParams();
  const lotId = params?.id as string;
  const { getLotById, placeBid } = useAuction();

  const lot = getLotById(lotId);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isLaudoOpen, setIsLaudoOpen] = useState(false);
  const [customBid, setCustomBid] = useState<string>("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isBidding, setIsBidding] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!lot) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Lote não encontrado</h2>
        <p className="text-neutral-400 text-sm">
          O lote solicitado não existe ou já foi finalizado.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-500 text-dark-950 font-bold text-sm hover:bg-gold-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para a Vitrine
        </Link>
      </div>
    );
  }

  const discount = formatDiscountVsFipe(lot.currentBid, lot.fipeValue);
  const nextMinBid = lot.currentBid + lot.minIncrement;

  const handleIncrementBid = (increment: number) => {
    setIsBidding(true);
    placeBid(lot.id, lot.currentBid + increment, "Você (Apresentador)", true);
    setTimeout(() => setIsBidding(false), 500);
  };

  const handleCustomBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericValue = parseInt(customBid.replace(/\D/g, ""), 10);
    if (numericValue && numericValue > lot.currentBid) {
      setIsBidding(true);
      placeBid(lot.id, numericValue, "Você (Apresentador)", true);
      setCustomBid("");
      setTimeout(() => setIsBidding(false), 500);
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Breadcrumb & Share Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800/80 pb-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-400">
          <Link href="/" className="hover:text-gold-400 flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Vitrine de Lotes</span>
          </Link>
          <span>/</span>
          <span className="text-neutral-500">{lot.category}</span>
          <span>/</span>
          <span className="text-white font-medium truncate max-w-[200px] sm:max-w-none">
            Lote #{lot.numeroLote} • {lot.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-dark-900 border border-neutral-800 hover:border-neutral-700 text-xs text-neutral-300 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-gold-400" />
            <span>{copiedLink ? "Link Copiado!" : "Compartilhar Lote"}</span>
          </button>

          <button
            onClick={() => setIsLaudoOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gold-500/15 border border-gold-500/40 text-gold-400 hover:bg-gold-500/25 text-xs font-bold transition-all shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Edital & Laudo Pericial</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Gallery & Bidding Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Photo Gallery with Zoom (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Photo Viewer */}
          <div className="relative w-full h-80 sm:h-96 md:h-[480px] bg-dark-900 rounded-3xl overflow-hidden border border-neutral-800 group shadow-2xl">
            <Image
              src={lot.images[activeImageIndex]}
              alt={`${lot.title} foto ${activeImageIndex + 1}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent pointer-events-none"></div>

            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="px-3 py-1 rounded-lg bg-dark-950/80 backdrop-blur-md border border-neutral-700 text-white font-mono text-xs font-bold">
                LOTE #{lot.numeroLote} • FOTO {activeImageIndex + 1}/{lot.images.length}
              </span>

              <button
                onClick={() => setIsZoomOpen(true)}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-dark-950/80 backdrop-blur-md border border-neutral-700 text-xs text-neutral-200 hover:text-white transition-colors"
                title="Ampliar Foto com Zoom"
              >
                <ZoomIn className="w-3.5 h-3.5 text-gold-400" />
                <span>Zoom</span>
              </button>
            </div>

            {/* Bottom Photo Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-300 backdrop-blur-md bg-dark-950/70 p-3 rounded-2xl border border-neutral-800/80">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Fotografia Oficial Pericial de Entrada no Pátio
              </span>
              <span className="text-neutral-400">{lot.patio}</span>
            </div>
          </div>

          {/* Photo Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {lot.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative h-20 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx
                    ? "border-gold-500 shadow-md shadow-gold-500/20 scale-[1.02]"
                    : "border-neutral-800 hover:border-neutral-600 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`Miniatura ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Inspection & Safety Quick Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-dark-900 border border-neutral-800 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-white block">
                  Laudo Cautelar {lot.inspection.resultadoGeral} ({lot.inspection.pontuacaoGeral}/100)
                </span>
                <span className="text-neutral-400">
                  {lot.inspection.estruturaStatus} • Pintura média {lot.inspection.espessuraPinturaMediaMicrons} µm
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsLaudoOpen(true)}
              className="text-gold-400 hover:text-gold-300 font-bold underline underline-offset-4 shrink-0"
            >
              Abrir Certificado Pericial Completo →
            </button>
          </div>
        </div>

        {/* Right Column: Live Bidding Arena & History (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header Title & Tags */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-gold-500/15 border border-gold-500/40 text-gold-400 text-xs font-bold">
                {lot.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs">
                Pátio {lot.city}/{lot.state}
              </span>
              {discount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-bold">
                  -{discount}% FIPE
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              {lot.title}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium">
              {lot.subtitle}
            </p>
          </div>

          {/* Countdown Header */}
          <CountdownBadge endDateIso={lot.endDate} variant="detail-header" status={lot.status} />

          {/* Bidding Box Console */}
          <div className="bg-dark-900 border border-neutral-800 rounded-3xl p-6 shadow-xl space-y-5">
            {/* Price Row */}
            <div className="space-y-3 pb-4 border-b border-neutral-800">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Avaliação Tabela FIPE:</span>
                <span className="font-mono text-neutral-300 line-through">
                  {formatBRL(lot.fipeValue)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Lance Inicial de Pregão:</span>
                <span className="font-mono text-neutral-300">
                  {formatBRL(lot.initialBid)}
                </span>
              </div>

              <div className="pt-2 flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400 block">
                    Lance Atual Vencedor:
                  </span>
                  <div className="text-3xl sm:text-4xl font-display font-black text-gold-400 tracking-tight">
                    {formatBRL(lot.currentBid)}
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-lg bg-neutral-800 border border-neutral-700 text-xs font-bold text-white">
                    {lot.bidCount} lances dados
                  </span>
                  <span className="block text-[10px] text-emerald-400 font-medium mt-1">
                    ● Sala de Pregão Aberta
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Increment Buttons (+ R$ 500, + R$ 1.000, etc.) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-400 font-medium">
                  Incrementos rápidos recomendados:
                </span>
                <span className="text-neutral-500 font-mono text-[11px]">
                  Mín: + {formatBRL(lot.minIncrement)}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleIncrementBid(lot.minIncrement)}
                  className="py-2.5 px-3 rounded-xl bg-dark-850 hover:bg-neutral-800 border border-neutral-700 hover:border-gold-500 text-xs font-bold text-white transition-all active:scale-95"
                >
                  + {formatBRL(lot.minIncrement)}
                </button>
                <button
                  onClick={() => handleIncrementBid(lot.minIncrement * 2)}
                  className="py-2.5 px-3 rounded-xl bg-dark-850 hover:bg-neutral-800 border border-neutral-700 hover:border-gold-500 text-xs font-bold text-white transition-all active:scale-95"
                >
                  + {formatBRL(lot.minIncrement * 2)}
                </button>
                <button
                  onClick={() => handleIncrementBid(lot.minIncrement * 5)}
                  className="py-2.5 px-3 rounded-xl bg-dark-850 hover:bg-neutral-800 border border-neutral-700 hover:border-gold-500 text-xs font-bold text-white transition-all active:scale-95"
                >
                  + {formatBRL(lot.minIncrement * 5)}
                </button>
              </div>

              {/* Custom Bid Input Form */}
              <form onSubmit={handleCustomBidSubmit} className="flex gap-2 pt-1">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400">
                    R$
                  </span>
                  <input
                    type="number"
                    value={customBid}
                    onChange={(e) => setCustomBid(e.target.value)}
                    placeholder={`Valor customizado (mín. ${lot.currentBid + lot.minIncrement})`}
                    className="w-full bg-dark-850 border border-neutral-700 rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-gold-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!customBid || parseInt(customBid, 10) <= lot.currentBid}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-xs font-bold text-white transition-colors"
                >
                  Confirmar
                </button>
              </form>

              {/* Big "Dar Lance" Action Button */}
              <button
                onClick={() => handleIncrementBid(lot.minIncrement)}
                disabled={isBidding}
                className={`w-full py-4 rounded-2xl font-display font-extrabold text-base uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl ${
                  isBidding
                    ? "bg-gold-600 text-dark-950 scale-95"
                    : "bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 hover:from-gold-300 hover:to-gold-400 text-dark-950 shadow-gold-500/20 active:scale-[0.98]"
                }`}
              >
                <Gavel className="w-5 h-5 text-dark-950" />
                <span>Dar Lance de {formatBRL(nextMinBid)}</span>
              </button>

              <p className="text-[11px] text-center text-neutral-400">
                Ao clicar em &quot;Dar Lance&quot;, você simula a oferta com som oficial e registro no pregão.
              </p>
            </div>
          </div>

          {/* Live Bidding History Feed (Social Proof) */}
          <div className="bg-dark-900 border border-neutral-800 rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                Histórico de Lances do Pregão
              </h3>
              <span className="text-[11px] text-neutral-400">
                {lot.bidsHistory.length} ofertas
              </span>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {lot.bidsHistory.map((bid, index) => (
                <div
                  key={bid.id}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-colors ${
                    index === 0
                      ? "bg-gold-500/10 border-gold-500/40 text-gold-400"
                      : "bg-dark-850 border-neutral-800 text-neutral-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        index === 0
                          ? "bg-gold-500 text-dark-950"
                          : "bg-neutral-800 text-neutral-400"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-white flex items-center gap-1.5">
                        <span>{bid.bidderName}</span>
                        {index === 0 && (
                          <span className="px-1.5 py-0.2 rounded bg-gold-500 text-dark-950 text-[9px] font-black uppercase tracking-wider">
                            Líder
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-neutral-500">
                        {bid.bidderCity} • {formatRelativeTime(bid.timestamp)}
                      </span>
                    </div>
                  </div>

                  <div className="font-mono font-bold text-sm">
                    {formatBRL(bid.amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications Section */}
      <section className="bg-dark-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-gold-400">
          <Car className="w-4 h-4" />
          <span>Ficha Técnica do Veículo</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
          Especificações de Fábrica & Documentação
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-dark-850 p-4 rounded-xl border border-neutral-800">
            <span className="text-neutral-500 block text-[11px]">Motorização</span>
            <span className="font-semibold text-white text-sm">{lot.specs.motor}</span>
          </div>

          <div className="bg-dark-850 p-4 rounded-xl border border-neutral-800">
            <span className="text-neutral-500 block text-[11px]">Potência</span>
            <span className="font-semibold text-white text-sm">{lot.specs.potencia}</span>
          </div>

          <div className="bg-dark-850 p-4 rounded-xl border border-neutral-800">
            <span className="text-neutral-500 block text-[11px]">Transmissão</span>
            <span className="font-semibold text-white text-sm">{lot.specs.cambio}</span>
          </div>

          <div className="bg-dark-850 p-4 rounded-xl border border-neutral-800">
            <span className="text-neutral-500 block text-[11px]">Tração</span>
            <span className="font-semibold text-white text-sm">{lot.specs.tracao}</span>
          </div>

          <div className="bg-dark-850 p-4 rounded-xl border border-neutral-800">
            <span className="text-neutral-500 block text-[11px]">Combustível</span>
            <span className="font-semibold text-white text-sm">{lot.specs.combustivel}</span>
          </div>

          <div className="bg-dark-850 p-4 rounded-xl border border-neutral-800">
            <span className="text-neutral-500 block text-[11px]">Cor Externa</span>
            <span className="font-semibold text-white text-sm">{lot.specs.cor}</span>
          </div>

          <div className="bg-dark-850 p-4 rounded-xl border border-neutral-800">
            <span className="text-neutral-500 block text-[11px]">Final da Placa</span>
            <span className="font-mono font-semibold text-white text-sm">Final {lot.specs.finalPlaca}</span>
          </div>

          <div className="bg-dark-850 p-4 rounded-xl border border-neutral-800">
            <span className="text-neutral-500 block text-[11px]">Número do Chassi</span>
            <span className="font-mono font-semibold text-white text-sm">{lot.specs.chassi}</span>
          </div>

          <div className="bg-dark-850 p-4 rounded-xl border border-neutral-800">
            <span className="text-neutral-500 block text-[11px]">IPVA 2026</span>
            <span className="font-semibold text-emerald-400 text-sm">{lot.specs.ipva}</span>
          </div>

          <div className="bg-dark-850 p-4 rounded-xl border border-neutral-800 col-span-2">
            <span className="text-neutral-500 block text-[11px]">Situação Documental (DUT / ATPV-e)</span>
            <span className="font-semibold text-white text-sm">{lot.specs.documentacao}</span>
          </div>
        </div>
      </section>

      {/* Damage Checklist & Inspection Section */}
      <section className="bg-dark-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-gold-400">
              <Wrench className="w-4 h-4" />
              <span>Vistoria & Checklist de Avarias</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
              Apontamentos Físicos & Mecânicos do Lote
            </h2>
          </div>

          <button
            onClick={() => setIsLaudoOpen(true)}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold text-xs transition-colors shadow-md"
          >
            <FileText className="w-4 h-4" />
            <span>Baixar Edital / Laudo Completo</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lot.damages.map((dmg, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-dark-850 border border-neutral-800 flex items-start gap-3.5 text-xs"
            >
              <div
                className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                  dmg.severity === "ok"
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                    : dmg.severity === "leve"
                    ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                    : "bg-red-500/15 text-red-400 border border-red-500/30"
                }`}
              >
                {dmg.severity === "ok" ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <AlertTriangle className="w-4 h-4" />
                )}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{dmg.part}</span>
                  <span
                    className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                      dmg.severity === "ok"
                        ? "text-emerald-400 bg-emerald-950/60"
                        : "text-amber-300 bg-amber-950/60"
                    }`}
                  >
                    {dmg.condition}
                  </span>
                </div>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  {dmg.notes || "Item inspecionado sem anomalias registradas na vistoria."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ Section) */}
      <section className="bg-dark-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-gold-400">
          <HelpCircle className="w-4 h-4" />
          <span>Dúvidas Frequentes</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
          Retirada, Documentação & Procedimentos de Pagamento
        </h2>

        <div className="space-y-3">
          {AUCTION_FAQ.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-neutral-800 bg-dark-850 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-white hover:text-gold-400 transition-colors"
                >
                  <span>{faq.pergunta}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gold-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-neutral-300 leading-relaxed border-t border-neutral-800/80">
                    {faq.resposta}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Inspection Modal */}
      <LaudoModal
        lot={lot}
        isOpen={isLaudoOpen}
        onClose={() => setIsLaudoOpen(false)}
      />

      {/* Photo Zoom Lightbox Modal */}
      {isZoomOpen && (
        <div
          onClick={() => setIsZoomOpen(false)}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in"
        >
          <div className="relative w-full max-w-5xl h-[80vh]">
            <Image
              src={lot.images[activeImageIndex]}
              alt={lot.title}
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute top-5 right-5 text-white bg-dark-900/80 px-4 py-2 rounded-xl text-xs font-bold border border-neutral-700">
            Clique para fechar o Zoom (ESC)
          </div>
        </div>
      )}
    </div>
  );
}
