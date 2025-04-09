export function formatNumberWithCommas(amount: number, decimalPlaces: number = 2): string {
  if (!isNaN(amount)){
    const [integerPart, decimalPart] = amount.toFixed(decimalPlaces).split(".");
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return decimalPart ? `${formattedIntegerPart},${decimalPart}` : formattedIntegerPart;
  }
  return 'Err'
}

export const formatNumberWithSuffix = (num: number): string => {
  // Handle negative numbers by using absolute value and adding sign at the end
  const isNegative = num < 0;
  const absNum = Math.abs(num);
  
  let result: string;
  
  if (absNum >= 1000000000) {
    result = (absNum / 1000000000).toFixed(1) + 'B';
  } else if (absNum >= 1000000) {
    result = (absNum / 1000000).toFixed(1) + 'M';
  } else if (absNum >= 1000) {
    result = (absNum / 1000).toFixed(1) + 'K';
  } else {
    result = absNum.toFixed(1);
  }
  
  // Remove trailing ".0" if present
  if (result.endsWith('.0')) {
    result = result.slice(0, -2);
  }
  
  // Add negative sign for negative numbers
  return isNegative ? '-' + result : result;
};

export function formatNumber(
  amount: number,
  locale: string = "id-ID",
  options: Intl.NumberFormatOptions = {}
): string {
  const formatted = new Intl.NumberFormat(locale, options).format(amount);
  return formatted;
}
