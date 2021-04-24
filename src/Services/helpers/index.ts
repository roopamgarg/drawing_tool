export function numberToPercentage(val: number, maxVal: number): number {
  return (val / maxVal) * 100;
}

export function percentageToNumber(val: number, maxVal: number): number {
  return (val * maxVal) / 100;
}
