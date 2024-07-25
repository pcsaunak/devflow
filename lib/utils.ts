import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateAgo(dateObj: Date): string {
  const now = new Date();
  const delta = now.getTime() - dateObj.getTime();

  const timeUnits: [string, number][] = [
    ["year", 365 * 24 * 60 * 60 * 1000],
    ["month", 30 * 24 * 60 * 60 * 1000],
    ["day", 24 * 60 * 60 * 1000],
    ["hour", 60 * 60 * 1000],
    ["minute", 60 * 1000],
    ["second", 1000],
  ];

  for (const [unit, divisor] of timeUnits) {
    if (delta >= divisor) {
      const diff = Math.floor(delta / divisor);
      return `${diff} ${unit}${diff > 1 ? "s" : ""} ago`;
    }
  }

  return "in the future";
}

export function formatNumber(number: number): string {
  if (number >= 1000000000) {
    return `${Math.floor(number / 1000000000)}B`;
  } else if (number >= 1000000) {
    return `${Math.floor(number / 1000000)}M`;
  } else if (number >= 1000) {
    return `${Math.floor(number / 1000)}K`;
  } else {
    return number + "";
  }
}
