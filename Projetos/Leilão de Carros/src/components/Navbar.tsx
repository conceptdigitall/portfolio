"use client";

import React from "react";
import Link from "next/link";
import {
  Gavel,
  Volume2,
  VolumeX,
  RotateCcw,
  Zap,
  Search,
  MapPin,
  ShieldCheck,
  Flame,
} from "lucide-react";
import { useAuction } from "@/context/AuctionContext";

export function Navbar() {
  const {
    searchQuery,
    setSearchQuery,
    selectedCity,
    setSelectedCity,
    isAutoDemoActive,
    toggleAutoDemo,
    soundEnabled,
    toggleSound,
    resetDemo,
    userBidsCount,
  } = useAuction();

  const patios = [
    "Todos os Pátios",
    "São Paulo",
    "Curitiba",
    "Belo Horizonte",
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-dark-950/90 backdrop-blur-xl">
      {/* Top Ticker - Senso de urgência e credibilidade */}
      <div className="bg-gradient-to-r from-neutral-900 via-dark-900 to-neutral-900 border-b border-neutral-800/50 py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-neutral-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-gold-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              PREGÃO OFICIAL AO VIVO
            </span>
            <span className="hidden md:inline text-neutral-600">|</span>
            <span className="hidden md:inline text-neutral-300">
              Leilão de Veículos • Comitentes Bancários & Frotas Executivas
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <div className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Laudos Periciais Cautelares DEKRA 100% Inspecionados</span>
            </div>
            {userBidsCount > 0 && (
              <span className="bg-gold-500/10 text-gold-400 border border-gold-500/30 px-2 py-0.5 rounded-full font-bold">
                🎯 Seus Lances Ativos: {userBidsCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
          {/* Brand Logo */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-dark-950 shadow-lg shadow-gold-500/20 group-hover:scale-105 transition-transform">
                <Gavel className="w-5 h-5 text-dark-950" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-xl text-white tracking-wider">
                    DRIVE<span className="text-gold-500">BID</span>
                  </span>
                  <span className="px-1.5 py-0.2 text-[9px] uppercase tracking-wider font-bold rounded bg-gold-500/20 text-gold-400 border border-gold-500/40">
                    Pro
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400 uppercase tracking-widest -mt-0.5">
                  Leilão de Veículos Premium
                </span>
              </div>
            </Link>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={toggleSound}
                title={soundEnabled ? "Desativar Áudio" : "Ativar Áudio"}
                className="p-2 rounded-lg bg-dark-850 border border-neutral-800 text-neutral-300"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-gold-400" /> : <VolumeX className="w-4 h-4 text-neutral-500" />}
              </button>
              <button
                onClick={resetDemo}
                title="Resetar Lances da Demonstração"
                className="p-2 rounded-lg bg-dark-850 border border-neutral-800 text-neutral-300"
              >
                <RotateCcw className="w-4 h-4 text-neutral-400" />
              </button>
            </div>
          </div>

          {/* Search Bar & City Selector */}
          <div className="flex items-center gap-2 w-full md:max-w-md">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por modelo, marca (ex: Porsche, G63, Hilux)..."
                className="w-full bg-dark-850/80 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-gold-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-500 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Pátio / City filter */}
            <div className="relative hidden sm:block">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-dark-850/80 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-300 focus:outline-none focus:border-gold-500 cursor-pointer appearance-none pr-8"
              >
                {patios.map((p) => (
                  <option key={p} value={p} className="bg-dark-900 text-white">
                    {p}
                  </option>
                ))}
              </select>
              <MapPin className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-gold-400 pointer-events-none" />
            </div>
          </div>

          {/* Commercial Demo Controls Toolbar */}
          <div className="hidden md:flex items-center gap-2">
            {/* Auto Bot Disputa Toggle */}
            <button
              onClick={toggleAutoDemo}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isAutoDemoActive
                  ? "bg-amber-500/10 border-gold-500/40 text-gold-400 shadow-sm shadow-gold-500/10"
                  : "bg-dark-850 border-neutral-800 text-neutral-400 hover:text-neutral-200"
              }`}
              title="Ativa lances de concorrentes simulados a cada 18s para criar senso de disputa durante a apresentação comercial"
            >
              <Zap className={`w-3.5 h-3.5 ${isAutoDemoActive ? "text-gold-400 animate-bounce-subtle" : "text-neutral-500"}`} />
              <span>Modo Disputa:</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${isAutoDemoActive ? "bg-gold-500 text-dark-950" : "bg-neutral-800 text-neutral-400"}`}>
                {isAutoDemoActive ? "ON" : "OFF"}
              </span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border transition-colors ${
                soundEnabled
                  ? "bg-dark-850 border-neutral-800 text-gold-400 hover:border-gold-500/40"
                  : "bg-dark-850 border-neutral-800 text-neutral-500"
              }`}
              title={soundEnabled ? "Som Ativado (Efeito Martelo & Sino)" : "Som Desativado"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Reset Demo State Button */}
            <button
              onClick={resetDemo}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-dark-850 border border-neutral-800 text-xs text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
              title="Restaura os lances originais e limpa o histórico da demonstração"
            >
              <RotateCcw className="w-3.5 h-3.5 text-neutral-400" />
              <span>Reset Demo</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
