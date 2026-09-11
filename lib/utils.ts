export function formatBengaliNumber(num: number): string {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .split("")
    .map((d) => (/\d/.test(d) ? bengaliDigits[parseInt(d)] : d))
    .join("");
}

export function formatBengaliCurrency(amount: number): string {
  return `৳${formatBengaliNumber(amount)}`;
}
