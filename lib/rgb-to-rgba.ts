export function rgbToRgba(rgb: string, opacity: number): string {
  const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!match) {
    throw new Error('Format RGB tidak valid');
  }
  const r = parseInt(match[1], 10);
  const g = parseInt(match[2], 10);
  const b = parseInt(match[3], 10);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}