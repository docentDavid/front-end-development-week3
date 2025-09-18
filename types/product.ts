export type productType = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
};

export function truncate(text: string, maxLength = 120): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  const cutoff = Math.max(0, maxLength);
  return text.slice(0, cutoff).trimEnd() + "...";
}

export function formatPrice(value: number | string): string {
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(num)) return "0";
  const formatted = num.toFixed(2).replace(".", ",");
  return formatted.endsWith(",00") ? formatted.slice(0, -3) : formatted;
}
