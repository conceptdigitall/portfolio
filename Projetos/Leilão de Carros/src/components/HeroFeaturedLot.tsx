"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Gavel,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Gauge,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  BatteryCharging,
  Zap,
} from "lucide-react";
import { Lot } from "@/types/auction";
import { CountdownBadge } from "./CountdownBadge";
import { useAuction } from "@/context/AuctionContext";
import { formatBRL, formatDiscountVsRetail } from "@/utils/formatters";

interface HeroProps {
  lot: Lot;
}

export function HeroFeaturedLot({ lot }: HeroProps) {
  const { placeBid } = useAuction();
  const [isBidding, setIsBidding] = useState(false);

  const discount = formatDiscountVsRetail(lot.currentBid, lot.retailValue);
  const nextMinBid = lot.currentBid + lot.minIncrement;

  const handleQuickBid = () => {
    setIsBidding(true);
    placeBid(lot.id, nextMinBid, "Você (Apresentador)", true);
    setTimeout(() => setIsBidding(false), 600);
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-dark-900 border border-neutral-800/80 shadow-2xl my-6">
      {/* Background Gradients & Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-neutral-800/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 lg:p-10 relative z-10 items-center">
        {/* Left Side: Editorial & E-Bike Presentation */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              LOTE EM DESTAQUE #{lot.numeroLote}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-800/80 border border-neutral-700/60 text-neutral-300 text-xs font-medium">
              <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
              Bateria {lot.specs.saudeBateriaSoH}% SoH • {lot.specs.ciclosCarga} Ciclos
            </span>
            {discount > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-bold">
                <TrendingUp className="w-3 h-3" />
                {discount}% abaixo de uma nova
              </span>
            )}
          </div>

          {/* Title & Headline */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              {lot.title}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 font-medium">
              {lot.subtitle}
            </p>
          </div>

          {/* Technical Fast Specs Chips for E-Bikes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-2">
            <div className="flex items-center gap-2 bg-dark-850/80 border border-neutral-800/80 rounded-xl px-3 py-2 text-xs text-neutral-300">
              <BatteryCharging className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="block text-[10px] text-neutral-500 uppercase">Bateria & Saúde</span>
                <span className="font-semibold text-white">{lot.specs.bateriaCapacidade} ({lot.specs.saudeBateriaSoH}%)</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-dark-850/80 border border-neutral-800/80 rounded-xl px-3 py-2 text-xs text-neutral-300">
              <Zap className="w-4 h-4 text-gold-500 shrink-0" />
              <div>
                <span className="block text-[10px] text-neutral-500 uppercase">Motor & Torque</span>
                <span className="font-semibold text-white">{lot.specs.torque}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-dark-850/80 border border-neutral-800/80 rounded-xl px-3 py-2 text-xs text-neutral-300">
              <Gauge className="w-4 h-4 text-gold-500 shrink-0" />
              <div>
                <span className="block text-[10px] text-neutral-500 uppercase">Odômetro</span>
                <span className="font-semibold text-white">{lot.odometerKm} KM rodados</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-dark-850/80 border border-neutral-800/80 rounded-xl px-3 py-2 text-xs text-neutral-300">
              <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
              <div>
                <span className="block text-[10px] text-neutral-500 uppercase">Quadro / Tamanho</span>
                <span className="font-semibold text-white truncate">{lot.specs.tamanhoQuadro}</span>
              </div>
            </div>
          </div>

          {/* Featured E-Bike Image Presentation */}
          <div className="relative w-full h-56 sm:h-72 lg:h-80 rounded-2xl overflow-hidden border border-neutral-800 group">
            <Image
              src={lot.images[0]}
              alt={lot.title}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-300 backdrop-blur-md bg-dark-950/60 p-2.5 rounded-xl border border-neutral-800/80">
              <span className="font-medium">Pátio Central Barueri • Carregador Original 4A + Chaves Inclusos</span>
              <Link
                href={`/lote/${lot.id}`}
                className="text-gold-400 hover:text-gold-300 font-semibold flex items-center gap-1"
              >
                <span>Ver laudo de bateria & fotos</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Bidding Console & Countdown */}
        <div className="lg:col-span-5 bg-dark-850 border border-neutral-800 rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col justify-between space-y-6">
          {/* Real-Time Countdown Module */}
          <div className="border-b border-neutral-800 pb-5">
            <CountdownBadge endDateIso={lot.endDate} variant="hero-blocks" status={lot.status} />
          </div>

          {/* Price & Bids Status */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span>Preço Médio de Nova no Mercado:</span>
              <span className="font-mono text-neutral-300 line-through">
                {formatBRL(lot.retailValue)}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span>Lance Inicial do Edital:</span>
              <span className="font-mono text-neutral-300">
                {formatBRL(lot.initialBid)}
              </span>
            </div>

            <div className="bg-dark-900/90 border border-neutral-800 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400">
                    Lance Atual Vencedor:
                  </span>
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-gold-400 tracking-tight mt-0.5">
                    {formatBRL(lot.currentBid)}
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2 py-1 rounded bg-neutral-800 text-[11px] font-semibold text-neutral-300 border border-neutral-700">
                    {lot.bidCount} lances registrados
                  </span>
                  <span className="block text-[10px] text-emerald-400 font-medium mt-1">
                    ● Disputa Ativa ao Vivo
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Increment Controls */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span>Próximo lance mínimo:</span>
              <span className="font-mono font-bold text-white">
                {formatBRL(nextMinBid)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  placeBid(lot.id, lot.currentBid + 1000, "Você (Apresentador)", true);
                }}
                className="py-2.5 px-3 rounded-xl bg-dark-900 border border-neutral-700 hover:border-gold-500 text-xs font-semibold text-neutral-200 hover:text-white transition-all"
              >
                + R$ 1.000
              </button>
              <button
                onClick={() => {
                  placeBid(lot.id, lot.currentBid + 2500, "Você (Apresentador)", true);
                }}
                className="py-2.5 px-3 rounded-xl bg-dark-900 border border-neutral-700 hover:border-gold-500 text-xs font-semibold text-neutral-200 hover:text-white transition-all"
              >
                + R$ 2.500
              </button>
            </div>

            {/* Main Action Button */}
            <button
              onClick={handleQuickBid}
              disabled={isBidding}
              className={`w-full py-4 rounded-xl font-display font-bold text-sm sm:text-base flex items-center justify-center gap-2 uppercase tracking-wider transition-all duration-200 shadow-lg ${
                isBidding
                  ? "bg-gold-600 text-dark-950 scale-95"
                  : "bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-dark-950 shadow-gold-500/20 hover:shadow-gold-500/30 active:scale-[0.98]"
              }`}
            >
              <Gavel className="w-5 h-5 text-dark-950" />
              <span>Dar Lance de {formatBRL(nextMinBid)}</span>
            </button>

            {/* Navigate to full lot details */}
            <Link
              href={`/lote/${lot.id}`}
              className="w-full py-3 rounded-xl bg-dark-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-semibold text-neutral-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Acessar Arena Completa da E-Bike & Laudo</span>
              <ArrowUpRight className="w-4 h-4 text-gold-400" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
