export function formatBRL(amount: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCompactBRL(amount: number): string {
  if (amount >= 1_000_000) {
    return `R$ ${(amount / 1_000_000).toFixed(1).replace(".", ",")}M`;
  }
  if (amount >= 1_000) {
    return `R$ ${(amount / 1_000).toFixed(0)} mil`;
  }
  return formatBRL(amount);
}

export function formatDiscountVsRetail(currentBid: number, retailValue: number): number {
  if (!retailValue || retailValue <= currentBid) return 0;
  return Math.round(((retailValue - currentBid) / retailValue) * 100);
}

// Backward compatibility alias
export const formatDiscountVsFipe = formatDiscountVsRetail;

export interface RemainingTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  totalSeconds: number;
}

export function calculateRemainingTime(endDateIso: string): RemainingTime {
  const target = new Date(endDateIso).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
      totalSeconds: 0,
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: false,
    totalSeconds,
  };
}

export function formatCountdownShort(time: RemainingTime): string {
  if (time.isExpired) return "Lote Encerrado";
  const pad = (n: number) => String(n).padStart(2, "0");
  if (time.days > 0) {
    return `${time.days}d ${pad(time.hours)}h ${pad(time.minutes)}m`;
  }
  return `${pad(time.hours)}h ${pad(time.minutes)}m ${pad(time.seconds)}s`;
}

export function formatRelativeTime(dateString: string): string {
  const diff = (Date.now() - new Date(dateString).getTime()) / 1000;
  if (diff < 10) return "Agora mesmo";
  if (diff < 60) return `Há ${Math.floor(diff)}s`;
  if (diff < 3600) return `Há ${Math.floor(diff / 60)}m`;
  return "Hoje";
}
