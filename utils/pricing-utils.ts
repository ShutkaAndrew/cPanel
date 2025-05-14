export function calculateProratedPrice(fullPrice: number, totalDaysInMonth: number, currentDay: number): number {
  const daysLeft = totalDaysInMonth - currentDay + 1;
  const prorated = (fullPrice / totalDaysInMonth) * daysLeft;
  return parseFloat(prorated.toFixed(2));
}