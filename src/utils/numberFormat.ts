export function numberFormat(
  num: string | number | undefined,
  style: 'currency' | 'decimal' | 'percent' = 'decimal',
  minimumFractionDigits = 0,
  maximumFractionDigits = 2,
  currency = 'usd',
): string {
  if (num === undefined) {
    return '';
  }

  let parsedNum: number;

  if (typeof num === 'string') {
    parsedNum = Number(num);
  } else {
    parsedNum = num;
  }

  if (Number.isNaN(num)) {
    return '';
  }

  return new Intl.NumberFormat('en-US', {
    style,
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(parsedNum);
}
