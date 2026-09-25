"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Gavel,
  MapPin,
  Gauge,
  Heart,
  TrendingUp,
  BatteryCharging,
  Zap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Lot } from "@/types/auction";
import { CountdownBadge } from "./CountdownBadge";
import { useAuction } from "@/context/AuctionContext";
import { formatBRL, formatDiscountVsRetail } from "@/utils/formatters";

interface LotCardProps {
  lot: Lot;
}

export function LotCard({ lot }: LotCardProps) {
  const { placeBid } = useAuction();
  const [isLiked, setIsLiked] = useState(false);
  const [isBidding, setIsBidding] = useState(false);

  const discount = formatDiscountVsRetail(lot.currentBid, lot.retailValue);
  const nextMinBid = lot.currentBid + lot.minIncrement;

  const handleQuickBid = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBidding(true);
    placeBid(lot.id, nextMinBid, "Você (Apresentador)", true);
    setTimeout(() => setIsBidding(false), 500);
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "Superbikes de Carbono":
        return "bg-gold-500/15 border-gold-500/40 text-gold-300";
      case "e-MTB Performance":
        return "bg-emerald-950/80 border-emerald-600/60 text-emerald-300";
      case "Urbanas & Commuter":
        return "bg-sky-950/80 border-sky-600/60 text-sky-300";
      case "Frotas & Delivery":
        return "bg-amber-950/80 border-amber-600/60 text-amber-300";
      default:
        return "bg-neutral-800 border-neutral-700 text-neutral-300";
    }
  };

  return (
    <div className="group flex flex-col bg-dark-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/5">
      {/* Card Image Header with Overlays */}
      <div className="relative w-full h-52 sm:h-56 bg-neutral-950 overflow-hidden">
        <Link href={`/lote/${lot.id}`} className="block w-full h-full">
          <Image
            src={lot.images[0]}
            alt={lot.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-transparent to-dark-950/40 pointer-events-none"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-md bg-dark-950/85 border border-neutral-700 text-white font-mono text-xs font-bold shadow-md">
              LOTE #{lot.numeroLote}
            </span>
            <span
              className={`px-2 py-0.5 rounded-md border text-[11px] font-semibold backdrop-blur-md ${getCategoryBadgeClass(
                lot.category
              )}`}
            >
              {lot.category}
            </span>
          </div>

          {/* Favorite button */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            aria-label="Salvar E-Bike nos Favoritos"
            className={`p-2 rounded-full backdrop-blur-md border transition-all ${
              isLiked
                ? "bg-red-500/20 border-red-500 text-red-400"
                : "bg-dark-950/70 border-neutral-700 text-neutral-400 hover:text-white"
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500" : ""}`} />
          </button>
        </div>

        {/* Bottom Image Overlay: Countdown Badge & Discount */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <CountdownBadge endDateIso={lot.endDate} variant="badge" status={lot.status} />

          {discount > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-700/80 text-emerald-300 text-[11px] font-bold">
              <TrendingUp className="w-3 h-3" />
              -{discount}% Nova
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
        <div>
          {/* Title & Brand */}
          <div className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold flex items-center gap-2">
            <span>{lot.brand} • {lot.year}</span>
            <span>•</span>
            <span className="text-emerald-400 font-mono font-bold flex items-center gap-0.5">
              <BatteryCharging className="w-3 h-3" />
              {lot.specs.saudeBateriaSoH}% SoH
            </span>
          </div>
          <Link href={`/lote/${lot.id}`}>
            <h3 className="text-lg font-bold text-white group-hover:text-gold-400 transition-colors line-clamp-1 mt-0.5">
              {lot.title}
            </h3>
          </Link>
          <p className="text-xs text-neutral-400 line-clamp-1 mt-1 font-medium">
            {lot.subtitle}
          </p>

          {/* Quick Specs Icons for E-Bikes */}
          <div className="flex items-center gap-3 text-xs text-neutral-400 mt-3 pt-3 border-t border-neutral-800/80">
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-gold-500" />
              {lot.specs.torque}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Gauge className="w-3.5 h-3.5 text-neutral-500" />
              {lot.odometerKm} km
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 truncate">
              <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
              {lot.city}/{lot.state}
            </span>
          </div>
        </div>

        {/* Price & Bidding Section */}
        <div className="bg-dark-850/90 border border-neutral-800 rounded-xl p-3.5 space-y-3">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-[10px] uppercase font-semibold text-neutral-500 tracking-wider">
                Lance Atual
              </span>
              <div className="text-xl font-display font-extrabold text-gold-400">
                {formatBRL(lot.currentBid)}
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-medium text-neutral-400 bg-neutral-800/80 px-2 py-0.5 rounded border border-neutral-700/60">
                {lot.bidCount} lances
              </span>
            </div>
          </div>

          {/* Quick Bid Increment Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleQuickBid}
              disabled={isBidding}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md ${
                isBidding
                  ? "bg-gold-600 text-dark-950 scale-95"
                  : "bg-gold-500 hover:bg-gold-400 text-dark-950 hover:shadow-gold-500/20 active:scale-95"
              }`}
              title={`Dar lance rápido de + ${formatBRL(lot.minIncrement)}`}
            >
              <Gavel className="w-3.5 h-3.5" />
              <span>+ {formatBRL(lot.minIncrement)}</span>
            </button>

            <Link
              href={`/lote/${lot.id}`}
              className="py-2 px-3 rounded-lg bg-dark-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-semibold text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
              title="Abrir arena da e-bike"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Inspection Verification Badge */}
        <div className="flex items-center justify-between text-[11px] text-neutral-400">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <CheckCircle2 className="w-3 h-3" />
            Laudo Técnico {lot.inspection.resultadoGeral} ({lot.specs.saudeBateriaSoH}% SoH)
          </span>
          <span className="text-neutral-500">Pátio Credenciado</span>
        </div>
      </div>
    </div>
  );
}
