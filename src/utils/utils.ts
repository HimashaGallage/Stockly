import { symbols } from '../utils/strings'

// generates random percentage values for dummy data purpose
export const calculatePercentageChange = (): string => {
  const percentageChange = Math.random() * 10 - 5; // Random percentage between -5% and 5%
  const formattedPercentage = percentageChange.toFixed(1);
  return percentageChange > 0 ? `+${formattedPercentage}%` : `${formattedPercentage}%`;
};

export const formatTickerSymbol = (symbol: string): string => {
  for (let base of symbols) {
    // Check if the symbol ends with the base symbol
    if (symbol.endsWith(base)) {
      // Find the index where the base symbol starts
      const baseIndex = symbol.length - base.length;
      // Split the string into prefix and base symbol
      const prefix = symbol.slice(0, baseIndex);
      return `${prefix} / ${base}`;
    }
  }
  // If no symbol is found, return the original symbol
  return symbol;
};

export const formatLabel = (key: string) => {
  // Convert camelCase to Title Case (e.g., askPrice -> Ask Price)
  return key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (str) => str.toUpperCase());
};