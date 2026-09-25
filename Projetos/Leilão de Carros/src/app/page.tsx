"use client";

import React, { useState, useMemo } from "react";
import {
  ShieldCheck,
  TrendingDown,
  Award,
  Layers,
  ArrowUpDown,
  Search,
  BatteryCharging,
  Zap,
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
    "Superbikes de Carbono",
    "e-MTB Performance",
    "Urbanas & Commuter",
    "Frotas & Delivery",
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
        const discA = ((a.retailValue - a.currentBid) / a.retailValue);
        const discB = ((b.retailValue - b.currentBid) / b.retailValue);
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
      {/* Featured E-Bike Hero */}
      {featuredLot && !searchQuery && selectedCategory === "Todas" && (
        <HeroFeaturedLot lot={featuredLot} />
      )}

      {/* Institutional Highlights Banner for E-Bikes */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-dark-900 border border-neutral-800">
          <div className="p-2.5 rounded-xl bg-gold-500/10 text-gold-400">
            <BatteryCharging className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white">Baterias Auditadas</div>
            <div className="text-[11px] text-neutral-400">Teste oficial de SoH e Ciclos</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-dark-900 border border-neutral-800">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
            <TrendingDown className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white">Até 48% Abaixo de Nova</div>
            <div className="text-[11px] text-neutral-400">Marcas premium com procedência</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-dark-900 border border-neutral-800">
          <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400">
            <ShieldCheck className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white">Ultrassom de Quadro</div>
            <div className="text-[11px] text-neutral-400">Carbono e soldas 100% íntegros</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-dark-900 border border-neutral-800">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
            <Zap className="w-5 h-5 text-gold-400" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white">Pregão E-Bike Ao Vivo</div>
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
              <span>Vitrine de Bikes Elétricas Disponíveis</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
              Lotes em Disputa Aberta
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Bicicletas elétricas com carregador original incluso, laudo pericial de bateria e cronômetro regressivo ativo.
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
              <option value="desconto">📉 Maior Desconto vs Nova</option>
              <option value="menor-lance">💲 Menor Lance Atual</option>
              <option value="maior-lance">💎 Maior Lance Atual</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
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

        {/* Grid of E-Bike Lot Cards */}
        {sortedLots.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedLots.map((lot) => (
              <LotCard key={lot.id} lot={lot} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-dark-900 border border-neutral-800 rounded-3xl space-y-3">
            <Search className="w-10 h-10 text-neutral-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">Nenhuma e-bike encontrada</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              Nenhuma bicicleta elétrica corresponde aos filtros selecionados. Tente buscar por outro modelo ou limpe os filtros.
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
