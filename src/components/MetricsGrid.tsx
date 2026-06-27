/**
 * @module components/MetricsGrid
 * @description 3-column metrics grid showing MRR, Active Subscribers, and Growth Rate.
 * Each card gets a Recharts sparkline, trend indicator, and real data from /overview.
 */
import type React from 'react';
import { MetricCard, type SparklinePoint } from './MetricCard';
import type { Overview } from '../types/overview';

/** Props for MetricsGrid. */
export interface MetricsGridProps {
  /** Overview data or null while loading. */
  data: Overview | null;
}

/** Generate a simple ascending sparkline ending at value, with noise. */
function makeSparkline(endValue: number, length = 10): SparklinePoint[] {
  const start = endValue * 0.7;
  return Array.from({ length }, (_, i) => {
    const progress = i / (length - 1);
    const noise = Math.sin(i * 1.8) * endValue * 0.06;
    return { value: Math.round(start + (endValue - start) * progress + noise) };
  });
}

/**
 * MetricsGrid — 3-column card grid with MRR, Active Subscribers, and Growth Rate.
 */
export function MetricsGrid({ data }: MetricsGridProps): React.ReactElement {
  const mrr = data?.revenue.mrr ?? 0;
  const subscribers = data?.revenue.activeSubscribers ?? 0;
  const growth = data?.growth.growthRateLast30Days ?? 0;

  return (
    <div className="mx-4 grid grid-cols-3 gap-2">
      <MetricCard
        label="MRR"
        value={`$${mrr.toLocaleString()}`}
        trend={`${growth.toFixed(1)}%`}
        trendUp={growth >= 0}
        sparkline={makeSparkline(mrr)}
      />
      <MetricCard
        label="Subscribers"
        value={String(subscribers)}
        trend="active"
        trendUp={subscribers > 30}
        sparkline={makeSparkline(subscribers)}
      />
      <MetricCard
        label="Growth"
        value={`${growth.toFixed(1)}%`}
        trend="30d"
        trendUp={growth >= 10}
        sparkline={makeSparkline(growth * 10)}
      />
    </div>
  );
}
