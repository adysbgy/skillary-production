function normalizeMoney(value: string | number): number | null {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? Math.round(parsed * 100) : null;
}

export function doesGrossAmountMatch(storedAmount: number, callbackAmount: string | number): boolean {
  const stored = normalizeMoney(storedAmount);
  const callback = normalizeMoney(callbackAmount);
  return stored !== null && callback !== null && stored === callback;
}
