export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function average(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function standardDeviation(values) {
  if (values.length < 2) return 0;
  const mean = average(values);
  const variance =
    values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
  return Math.sqrt(variance);
}

export function zScore(value, values) {
  const deviation = standardDeviation(values);
  if (deviation === 0) return 0;
  return (value - average(values)) / deviation;
}

export function formatDelta(value) {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}
