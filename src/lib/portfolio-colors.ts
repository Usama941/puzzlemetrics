export const DEFAULT_METRIC_COLOR = "#6055D9";

export function portfolioPanelGradient(metricColor: string): string {
  const color = metricColor.trim() || DEFAULT_METRIC_COLOR;
  return `linear-gradient(135deg, ${color}33 0%, ${color}66 50%, ${color}1a 100%)`;
}

export function resolveMetricColor(project: {
  metricColor?: string | null;
  accentColor?: string | null;
}): string {
  return project.metricColor?.trim() || project.accentColor?.trim() || DEFAULT_METRIC_COLOR;
}
