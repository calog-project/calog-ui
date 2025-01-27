export function getLuminance(hex: string): number {
  const rgb = hex
    .replace(/^#/, '')
    .match(/.{2}/g)
    ?.map((x) => parseInt(x, 16) / 255)
    .map((x) => (x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2)))
    .reduce((a, b) => a + b);

  return rgb ?? 0;
}
