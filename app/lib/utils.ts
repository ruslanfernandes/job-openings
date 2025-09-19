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

// utils/htmlExtractor.ts
export function extractSectionsFromDescription(
  description: string,
  ids: string[]
) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(description, "text/html");

  const result: Record<string, string> = {};
  ids.forEach((id) => {
    const el = doc.querySelector(`#${id}`);
    if (el) result[id] = el.innerHTML;
  });

  return result; // e.g. { "job-overview": "...", "requirements": "..." }
}
