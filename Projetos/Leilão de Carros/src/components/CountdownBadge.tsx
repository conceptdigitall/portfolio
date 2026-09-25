"use client";

import React, { useEffect, useState } from "react";
import { Clock, Flame, AlertCircle } from "lucide-react";
import { calculateRemainingTime, RemainingTime } from "@/utils/formatters";

interface CountdownProps {
  endDateIso: string;
  variant?: "badge" | "hero-blocks" | "detail-header";
  status?: string;
}

export function CountdownBadge({ endDateIso, variant = "badge", status }: CountdownProps) {
  const [time, setTime] = useState<RemainingTime>(() => calculateRemainingTime(endDateIso));

  useEffect(() => {
    // Update every second
    const interval = setInterval(() => {
      setTime(calculateRemainingTime(endDateIso));
    }, 1000);
    return () => clearInterval(interval);
  }, [endDateIso]);

  const pad = (n: number) => String(n).padStart(2, "0");
  const isUrgent = time.totalSeconds < 1800 && !time.isExpired; // Less than 30 mins
  const isProrrogado = status === "prorrogado" || (time.totalSeconds < 120 && !time.isExpired);

  if (time.isExpired) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-800 text-red-300 text-xs font-semibold tracking-wide">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
        <span>LOTE ENCERRADO</span>
      </div>
    );
  }

  // Variant: Hero Blocks (Idêntico à inspiração DriveBay: 01 Dias : 02 Hours : 14 Min : 30 Seg)
  if (variant === "hero-blocks") {
    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-neutral-400">
          <Clock className="w-3.5 h-3.5 text-gold-500" />
          <span>Encerramento do Pregão:</span>
          {isProrrogado && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/20 text-gold-400 border border-gold-500/40 text-[10px] font-bold animate-pulse">
              <Flame className="w-3 h-3 text-gold-500" /> PRORROGAÇÃO (+60s)
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Dias */}
          <div className="flex flex-col items-center justify-center bg-dark-900 border border-neutral-800 rounded-xl px-2.5 sm:px-3 py-1.5 min-w-[50px] sm:min-w-[58px] shadow-inner">
            <span className="font-mono text-lg sm:text-2xl font-bold text-white tracking-tight">{pad(time.days)}</span>
            <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-medium">Dias</span>
          </div>

          <span className="text-gold-500 font-bold text-lg mb-2">:</span>

          {/* Horas */}
          <div className="flex flex-col items-center justify-center bg-dark-900 border border-neutral-800 rounded-xl px-2.5 sm:px-3 py-1.5 min-w-[50px] sm:min-w-[58px] shadow-inner">
            <span className="font-mono text-lg sm:text-2xl font-bold text-white tracking-tight">{pad(time.hours)}</span>
            <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-medium">Horas</span>
          </div>

          <span className="text-gold-500 font-bold text-lg mb-2">:</span>

          {/* Minutos */}
          <div className="flex flex-col items-center justify-center bg-dark-900 border border-neutral-800 rounded-xl px-2.5 sm:px-3 py-1.5 min-w-[50px] sm:min-w-[58px] shadow-inner">
            <span className="font-mono text-lg sm:text-2xl font-bold text-white tracking-tight">{pad(time.minutes)}</span>
            <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-medium">Min</span>
          </div>

          <span className="text-gold-500 font-bold text-lg mb-2">:</span>

          {/* Segundos */}
          <div
            className={`flex flex-col items-center justify-center rounded-xl px-2.5 sm:px-3 py-1.5 min-w-[50px] sm:min-w-[58px] border ${
              isUrgent ? "bg-red-950/60 border-red-700/80 animate-pulse" : "bg-dark-900 border-neutral-800 shadow-inner"
            }`}
          >
            <span
              className={`font-mono text-lg sm:text-2xl font-bold tracking-tight ${
                isUrgent ? "text-red-400" : "text-gold-400"
              }`}
            >
              {pad(time.seconds)}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-medium">Seg</span>
          </div>
        </div>
      </div>
    );
  }

  // Variant: Detail Page Header Banner
  if (variant === "detail-header") {
    return (
      <div
        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border backdrop-blur-md ${
          isUrgent
            ? "bg-red-950/40 border-red-800/80 text-red-200"
            : "bg-dark-850/90 border-neutral-800 text-white"
        }`}
      >
        <div
          className={`p-2 rounded-lg ${
            isUrgent ? "bg-red-900/60 text-red-400 animate-pulse" : "bg-gold-500/10 text-gold-400"
          }`}
        >
          {isUrgent ? <Flame className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
        </div>
        <div>
          <div className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
            {isProrrogado ? "Disputa em Prorrogação (+60s)" : "Tempo Restante no Lote"}
          </div>
          <div className="font-mono text-lg sm:text-xl font-bold tracking-wider flex items-center gap-1.5">
            {time.days > 0 && <span>{pad(time.days)}d :</span>}
            <span>{pad(time.hours)}h :</span>
            <span>{pad(time.minutes)}m :</span>
            <span className={isUrgent ? "text-red-400" : "text-gold-400"}>{pad(time.seconds)}s</span>
          </div>
        </div>
      </div>
    );
  }

  // Default Variant: Compact Badge for Vitrine Cards
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold tracking-wide backdrop-blur-md transition-all ${
        isUrgent
          ? "bg-red-950/80 border border-red-600/80 text-red-300 animate-pulse"
          : "bg-dark-900/85 border border-neutral-700/70 text-neutral-200 shadow-lg"
      }`}
    >
      <Clock className={`w-3.5 h-3.5 ${isUrgent ? "text-red-400" : "text-gold-400"}`} />
      <span className="font-mono">
        {time.days > 0 && `${time.days}d `}
        {pad(time.hours)}h {pad(time.minutes)}m {pad(time.seconds)}s
      </span>
    </div>
  );
}
