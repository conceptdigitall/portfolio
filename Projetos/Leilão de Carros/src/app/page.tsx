"use client";

import React, { useState, useMemo } from "react";
import {
  Filter,
  Flame,
  ShieldCheck,
  TrendingDown,
  Award,
  Layers,
  Sparkles,
  ArrowUpDown,
  Search,
} from "lucide-react";
import { useAuction } from "@/context/AuctionContext";
import { HeroFeaturedLot } from "@/components/HeroFeaturedLot";
import { LotCard } from "@/components/LotCard";
import { calculateRemainingTime } from "@/utils/formatters";

export default function HomePage() {
  const {
    lots,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedCity,
  } = useAuction();

  const [sortBy, setSortBy] = useState<"urgencia" | "desconto" | "menor-lance" | "maior-lance">("urgencia");

  const categories = [
    "Todas",
    "Recuperados de Financiamento",
    "Sinistro Médio",
    "Frotas Corporativas",
    "Superesportivos & Luxo",
  ];

  // Filter lots based on category, city, and search query
  const filteredLots = useMemo(() => {
    return lots.filter((lot) => {
      // Category filter
      if (selectedCategory !== "Todas" && lot.category !== selectedCategory) {
        return false;
      }

      // City filter
      if (selectedCity !== "Todos os Pátios" && !lot.city.includes(selectedCity)) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = lot.title.toLowerCase().includes(q);
        const matchesBrand = lot.brand.toLowerCase().includes(q);
        const matchesModel = lot.model.toLowerCase().includes(q);
        const matchesNumber = lot.numeroLote.includes(q);
        const matchesCategory = lot.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesBrand && !matchesModel && !matchesNumber && !matchesCategory) {
          return false;
        }
      }

      return true;
    });
  }, [lots, selectedCategory, selectedCity, searchQuery]);

  // Sort filtered lots
  const sortedLots = useMemo(() => {
    return [...filteredLots].sort((a, b) => {
      if (sortBy === "urgencia") {
        const timeA = calculateRemainingTime(a.endDate).totalSeconds;
        const timeB = calculateRemainingTime(b.endDate).totalSeconds;
        return timeA - timeB;
      }
      if (sortBy === "desconto") {
        const discA = ((a.fipeValue - a.currentBid) / a.fipeValue);
        const discB = ((b.fipeValue - b.currentBid) / b.fipeValue);
        return discB - discA;
      }
      if (sortBy === "menor-lance") {
        return a.currentBid - b.currentBid;
      }
      if (sortBy === "maior-lance") {
        return b.currentBid - a.currentBid;
      }
      return 0;
    });
  }, [filteredLots, sortBy]);

  const featuredLot = lots.find((l) => l.highlight) || lots[0];

  return (
    <div className="space-y-10">
      {/* Featured Lot Hero (DriveBay Inspiration) */}
      {featuredLot && !searchQuery && selectedCategory === "Todas" && (
        <HeroFeaturedLot lot={featuredLot} />
      )}

      {/* Institutional Highlights Banner */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-dark-900 border border-neutral-800">
          <div className="p-2.5 rounded-xl bg-gold-500/10 text-gold-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white">Laudo Cautelar 100%</div>
            <div className="text-[11px] text-neutral-400">Inspeção pericial DEKRA</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-dark-900 border border-neutral-800">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
            <TrendingDown className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white">Até 45% Abaixo FIPE</div>
            <div className="text-[11px] text-neutral-400">Margem real de repasse</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-dark-900 border border-neutral-800">
          <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white">Bancos & Frotistas</div>
            <div className="text-[11px] text-neutral-400">Origem 100% rastreada</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-dark-900 border border-neutral-800">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white">Pregão Ao Vivo</div>
            <div className="text-[11px] text-neutral-400">Lances e disputa em tempo real</div>
          </div>
        </div>
      </section>

      {/* Catalog & Filter Section Header */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-gold-400">
              <Layers className="w-4 h-4" />
              <span>Vitrine de Lotes Disponíveis</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
              Lotes em Disputa Aberta
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Veículos com documentação liberada, laudo cautelar pericial e cronômetro ativo para arrematação.
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs text-neutral-400 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-gold-500" />
              Ordenar por:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-dark-900 border border-neutral-800 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-gold-500 cursor-pointer"
            >
              <option value="urgencia">⏱️ Tempo Restante (Urgência)</option>
              <option value="desconto">📉 Maior Desconto FIPE</option>
              <option value="menor-lance">💲 Menor Lance Atual</option>
              <option value="maior-lance">💎 Maior Lance Atual</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills (Responsive scroll) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? "bg-gold-500 text-dark-950 border-gold-500 font-bold shadow-md shadow-gold-500/10"
                  : "bg-dark-900 border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of Lot Cards */}
        {sortedLots.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedLots.map((lot) => (
              <LotCard key={lot.id} lot={lot} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-dark-900 border border-neutral-800 rounded-3xl space-y-3">
            <Search className="w-10 h-10 text-neutral-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">Nenhum lote encontrado</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              Nenhum lote corresponde aos filtros selecionados. Tente buscar por outro termo ou limpe os filtros.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Todas");
              }}
              className="px-4 py-2 bg-gold-500 text-dark-950 font-bold text-xs rounded-xl hover:bg-gold-400 transition-colors"
            >
              Limpar Filtros de Busca
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
