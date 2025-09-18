import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function normalizeToFilters<
  T extends { id: string | number; title?: string; name?: string },
>(data: T[]): { id: string; name: string }[] {
  return data.map((item) => ({
    id: String(item.id),
    name: item.title || item.name || "",
  }));
}
