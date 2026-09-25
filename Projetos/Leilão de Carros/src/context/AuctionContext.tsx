"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import confetti from "canvas-confetti";
import { Lot, BidHistoryEntry } from "@/types/auction";
import { INITIAL_LOTS } from "@/data/mockLots";
import { playBidChime, playAntiSnipingTone, playGavelStrike } from "@/utils/sound";
import { formatBRL, calculateRemainingTime } from "@/utils/formatters";

interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: "bid" | "outbid" | "sniping" | "hammer" | "reset";
}

interface AuctionContextType {
  lots: Lot[];
  getLotById: (id: string) => Lot | undefined;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  isAutoDemoActive: boolean;
  toggleAutoDemo: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  resetDemo: () => void;
  placeBid: (lotId: string, amount: number, bidderName?: string, isUser?: boolean) => boolean;
  activeToast: ToastNotification | null;
  dismissToast: () => void;
  userBidsCount: number;
}

const STORAGE_KEY = "drivebid_lots_v2";
const STORAGE_SOUND_KEY = "drivebid_sound_enabled";
const STORAGE_DEMO_KEY = "drivebid_auto_demo";

const RIVAL_BIDDERS = [
  { name: "CarCenter Prime", city: "São Paulo/SP" },
  { name: "AutoRepasse Sul", city: "Curitiba/PR" },
  { name: "InvestAuto Capital", city: "Belo Horizonte/MG" },
  { name: "Dra. Beatriz Fontana", city: "Campinas/SP" },
  { name: "Veloce Motors Import", city: "Balneário Camboriú/SC" },
  { name: "AgroCar Brasil", city: "Ribeirão Preto/SP" },
  { name: "Dr. Marcelo Fagundes", city: "Santos/SP" },
  { name: "Horizonte Frotas", city: "Goiânia/GO" },
];

const AuctionContext = createContext<AuctionContextType | null>(null);

export function AuctionProvider({ children }: { children: React.ReactNode }) {
  const [lots, setLots] = useState<Lot[]>(INITIAL_LOTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedCity, setSelectedCity] = useState("Todos os Pátios");
  const [isAutoDemoActive, setIsAutoDemoActive] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeToast, setActiveToast] = useState<ToastNotification | null>(null);
  const [userBidsCount, setUserBidsCount] = useState(0);

  // Initialize and load from LocalStorage
  useEffect(() => {
    try {
      const savedLots = localStorage.getItem(STORAGE_KEY);
      if (savedLots) {
        setLots(JSON.parse(savedLots));
      }
      const savedSound = localStorage.getItem(STORAGE_SOUND_KEY);
      if (savedSound !== null) {
        setSoundEnabled(savedSound === "true");
      }
      const savedDemo = localStorage.getItem(STORAGE_DEMO_KEY);
      if (savedDemo !== null) {
        setIsAutoDemoActive(savedDemo === "true");
      }
    } catch (e) {
      console.warn("Could not read localStorage:", e);
    }
  }, []);

  // Save lots changes to LocalStorage
  const saveLotsToStorage = (updatedLots: Lot[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLots));
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
  };

  const showToast = useCallback((toast: Omit<ToastNotification, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setActiveToast({ ...toast, id });
  }, []);

  const dismissToast = useCallback(() => {
    setActiveToast(null);
  }, []);

  // Auto dismiss toast after 4s
  useEffect(() => {
    if (!activeToast) return;
    const timer = setTimeout(() => {
      setActiveToast(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [activeToast]);

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_SOUND_KEY, String(next));
      return next;
    });
  };

  const toggleAutoDemo = () => {
    setIsAutoDemoActive((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_DEMO_KEY, String(next));
      showToast({
        title: next ? "⚡ Modo Disputa ATIVADO" : "⏸️ Modo Disputa PAUSADO",
        message: next
          ? "Lances concorrentes simulados ocorrerão periodicamente para criar urgência."
          : "Disputa automática pausada. Agora somente lances manuais serão registrados.",
        type: "bid",
      });
      return next;
    });
  };

  const resetDemo = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn(e);
    }
    setLots(INITIAL_LOTS);
    setUserBidsCount(0);
    if (soundEnabled) playGavelStrike();
    showToast({
      title: "↺ Demonstração Reiniciada",
      message: "Todos os lotes, valores iniciais e históricos de lances foram restaurados ao padrão.",
      type: "reset",
    });
  };

  const placeBid = useCallback(
    (lotId: string, amount: number, bidderName = "Você (Apresentador)", isUser = true): boolean => {
      let success = false;

      setLots((prevLots) => {
        const lotIndex = prevLots.findIndex((l) => l.id === lotId);
        if (lotIndex === -1) return prevLots;

        const lot = prevLots[lotIndex];
        if (amount <= lot.currentBid) {
          showToast({
            title: "Lance Inválido",
            message: `O lance deve ser estritamente superior ao lance atual (${formatBRL(lot.currentBid)}).`,
            type: "outbid",
          });
          return prevLots;
        }

        success = true;
        const remaining = calculateRemainingTime(lot.endDate);
        let newEndDate = lot.endDate;
        let isAntiSnipingTriggered = false;

        // Anti-Sniping rule: if bid comes within last 90 seconds, add +60s
        if (remaining.totalSeconds < 90 && !remaining.isExpired) {
          const extendedTime = Date.now() + (remaining.totalSeconds + 60) * 1000;
          newEndDate = new Date(extendedTime).toISOString();
          isAntiSnipingTriggered = true;
        }

        const newBidEntry: BidHistoryEntry = {
          id: `bid-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          lotId: lot.id,
          bidderName,
          bidderCity: isUser ? "São Paulo/SP" : RIVAL_BIDDERS[Math.floor(Math.random() * RIVAL_BIDDERS.length)].city,
          amount,
          timestamp: new Date().toISOString(),
          isCurrentUser: isUser,
        };

        const updatedLot: Lot = {
          ...lot,
          currentBid: amount,
          bidCount: lot.bidCount + 1,
          status: isAntiSnipingTriggered ? "prorrogado" : "em_disputa",
          endDate: newEndDate,
          bidsHistory: [newBidEntry, ...lot.bidsHistory],
        };

        const nextLots = [...prevLots];
        nextLots[lotIndex] = updatedLot;
        saveLotsToStorage(nextLots);

        // Sound & visual feedback
        if (soundEnabled) {
          if (isAntiSnipingTriggered) {
            playAntiSnipingTone();
          } else {
            playBidChime();
          }
        }

        if (isUser) {
          setUserBidsCount((c) => c + 1);
          try {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.8 },
              colors: ["#FFB800", "#FACC15", "#10B981", "#FFFFFF"],
            });
          } catch (e) {
            console.warn(e);
          }

          showToast({
            title: isAntiSnipingTriggered ? "⏱️ Lance Confirmado + Prorrogação (+60s)!" : "🎉 Lance Confirmado com Sucesso!",
            message: `Seu lance de ${formatBRL(amount)} no Lote #${lot.numeroLote} (${lot.model}) foi registrado e você é o líder da disputa!`,
            type: "bid",
          });
        } else {
          showToast({
            title: `⚡ Novo Lance no Lote #${lot.numeroLote}`,
            message: `${bidderName} ofertou ${formatBRL(amount)} pelo ${lot.model}.`,
            type: "outbid",
          });
        }

        return nextLots;
      });

      return success;
    },
    [soundEnabled, showToast]
  );

  // Auto Bot Simulation Interval
  const isAutoDemoActiveRef = useRef(isAutoDemoActive);
  isAutoDemoActiveRef.current = isAutoDemoActive;

  const lotsRef = useRef(lots);
  lotsRef.current = lots;

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAutoDemoActiveRef.current) return;

      const currentLots = lotsRef.current;
      if (!currentLots.length) return;

      // Pick a random open lot
      const activeLots = currentLots.filter((l) => !calculateRemainingTime(l.endDate).isExpired);
      if (!activeLots.length) return;

      const targetLot = activeLots[Math.floor(Math.random() * activeLots.length)];
      const randomBidder = RIVAL_BIDDERS[Math.floor(Math.random() * RIVAL_BIDDERS.length)];
      const incrementSteps = [targetLot.minIncrement, targetLot.minIncrement * 2];
      const chosenIncrement = incrementSteps[Math.floor(Math.random() * incrementSteps.length)];
      const newAmount = targetLot.currentBid + chosenIncrement;

      placeBid(targetLot.id, newAmount, `${randomBidder.name} (${randomBidder.city})`, false);
    }, 18000); // Trigger every 18 seconds for realistic auction tension

    return () => clearInterval(interval);
  }, [placeBid]);

  const getLotById = (id: string) => lots.find((l) => l.id === id);

  return (
    <AuctionContext.Provider
      value={{
        lots,
        getLotById,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedCity,
        setSelectedCity,
        isAutoDemoActive,
        toggleAutoDemo,
        soundEnabled,
        toggleSound,
        resetDemo,
        placeBid,
        activeToast,
        dismissToast,
        userBidsCount,
      }}
    >
      {children}
    </AuctionContext.Provider>
  );
}

export function useAuction() {
  const context = useContext(AuctionContext);
  if (!context) {
    throw new Error("useAuction must be used within an AuctionProvider");
  }
  return context;
}
