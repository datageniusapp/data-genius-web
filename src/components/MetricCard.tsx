/**
 * @module components/MetricCard
 * @description Individual metric card with label, value, trend indicator, and sparkline.
 * Used in the 3-column metric grid for MRR, Active Subscribers, and Growth Rate.
 */
import type React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

/** A single data point for the sparkline chart. */
export interface SparklinePoint {
  value: number;
}

/** Props for MetricCard. */
export interface MetricCardProps {
  /** Metric label shown in gray. */
  label: string;
  /** Primary value shown prominently. */
  value: string;
  /** Trend percentage string (e.g. "+12.5%"). */
  trend: string;
  /** Whether trend is positive (red up arrow) or negative (red down arrow). */
  trendUp: boolean;
  /** Sparkline data points. */
  sparkline: SparklinePoint[];
}

/**
 * Compact metric card — label, bold value, trend arrow, and red Recharts sparkline.
 */
export function MetricCard({
  label,
  value,
  trend,
  trendUp,
  sparkline,
}: MetricCardProps): React.ReactElement {
  return (
    <div
      className="flex flex-col gap-1 rounded-xl p-3"
      style={{ backgroundColor: '#1A1A1A' }}
    >
      {/* Label */}
      <span className="text-xs leading-tight" style={{ color: '#8E8E93' }}>
        {label}
      </span>

      {/* Value */}
      <span className="text-lg font-bold text-white leading-tight">{value}</span>

      {/* Trend */}
      <div className="flex items-center gap-0.5">
        <span className="text-xs font-semibold" style={{ color: '#E8002D' }}>
          {trendUp ? '↑' : '↓'} {trend}
        </span>
      </div>

      {/* Sparkline */}
      <div className="mt-1 h-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparkline}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#E8002D"
              strokeWidth={1.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
