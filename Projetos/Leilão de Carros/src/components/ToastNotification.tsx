"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, Zap, RotateCcw, X, Gavel } from "lucide-react";
import { useAuction } from "@/context/AuctionContext";

export function ToastNotification() {
  const { activeToast, dismissToast } = useAuction();

  if (!activeToast) return null;

  const getIcon = () => {
    switch (activeToast.type) {
      case "bid":
        return <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
      case "outbid":
        return <Zap className="w-5 h-5 text-gold-400 shrink-0 animate-bounce" />;
      case "sniping":
        return <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
      case "hammer":
        return <Gavel className="w-5 h-5 text-gold-500 shrink-0" />;
      case "reset":
        return <RotateCcw className="w-5 h-5 text-sky-400 shrink-0" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0" />;
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm sm:max-w-md w-full animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-dark-900/95 border border-neutral-700/80 shadow-2xl backdrop-blur-xl">
        <div className="p-2 rounded-xl bg-dark-850 border border-neutral-800">
          {getIcon()}
        </div>

        <div className="flex-1 pr-2">
          <h4 className="text-sm font-bold text-white tracking-tight">
            {activeToast.title}
          </h4>
          <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
            {activeToast.message}
          </p>
        </div>

        <button
          onClick={dismissToast}
          className="text-neutral-500 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
