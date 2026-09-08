/** Format an integer cents/paisa value as a Bangladeshi Taka display string. */
export function formatBDT(cents: number): string {
  const value = Math.round(cents) / 100;
  const formatted = value.toLocaleString("en-US", {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
  return `\u09F3${formatted}`;
}

export function discountPercent(price: number, compareAt: number | null | undefined): number | null {
  if (!compareAt || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}
