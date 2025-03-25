export function formatNumberWithCommas(amount: number, decimalPlaces: number = 2): string {
  if (!isNaN(amount)){
    const [integerPart, decimalPart] = amount.toFixed(decimalPlaces).split(".");
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return decimalPart ? `${formattedIntegerPart},${decimalPart}` : formattedIntegerPart;
  }
  return 'Err'
}

export const formatNumberWithSuffix = (num: number): string => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  } else {
    return num.toString();
  }
};

export function formatNumber(
  amount: number,
  locale: string = "id-ID",
  options: Intl.NumberFormatOptions = {}
): string {
  const formatted = new Intl.NumberFormat(locale, options).format(amount);
  return formatted;
}
