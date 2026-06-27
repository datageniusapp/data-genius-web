/**
 * @module components/RevenueChart
 * @description Full-width Revenue Overview chart card.
 * Shows MRR trend line (Recharts LineChart, red line, dark background),
 * current MRR value, and trend percentage. Generates simulated 30-day
 * sparkline from real MRR since historical series is unavailable from /overview.
 */
import type React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from 'recharts';
import type { Overview } from '../types/overview';

/** Props for RevenueChart. */
export interface RevenueChartProps {
  /** Overview data or null while loading. */
  data: Overview | null;
}

/** A single chart data point with day label and MRR value. */
interface ChartPoint {
  day: string;
  mrr: number;
}

/** Generate a simulated 30-day MRR series ending at the given value. */
function buildMrrSeries(currentMrr: number): ChartPoint[] {
  const days = 30;
  const startMrr = Math.round(currentMrr * 0.78);
  const points: ChartPoint[] = [];
  for (let i = 0; i < days; i++) {
    const progress = i / (days - 1);
    const noise = (Math.sin(i * 2.3) + Math.cos(i * 1.7)) * currentMrr * 0.04;
    const mrr = Math.round(startMrr + (currentMrr - startMrr) * progress + noise);
    const dayLabel =
      i === 0 ? '1' : i === 9 ? '10' : i === 19 ? '20' : i === 29 ? '30' : '';
    points.push({ day: dayLabel, mrr });
  }
  return points;
}

/**
 * Revenue Overview chart — full-width dark card with red MRR trend line,
 * gray axis labels, and a red dot at the current value.
 */
export function RevenueChart({ data }: RevenueChartProps): React.ReactElement {
  const mrr = data?.revenue.mrr ?? 0;
  const growth = data?.growth.growthRateLast30Days ?? 0;
  const series = buildMrrSeries(mrr);
  const lastPoint = series[series.length - 1];

  return (
    <div
      className="mx-4 rounded-2xl p-4"
      style={{ backgroundColor: '#1A1A1A' }}
    >
      {/* Header row */}
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-white">Revenue Overview</span>
        <button type="button" className="text-xs" style={{ color: '#8E8E93' }}>
          Last 30 days ▾
        </button>
      </div>

      {/* MRR value + trend */}
      <div className="mb-4 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-white">${mrr.toLocaleString()}</span>
        <span className="text-sm font-semibold" style={{ color: '#E8002D' }}>
          ↑ {growth.toFixed(1)}%
        </span>
      </div>

      {/* Chart */}
      <div className="h-36">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
            <XAxis
              dataKey="day"
              tick={{ fill: '#8E8E93', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#8E8E93', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `$${v}`}
              width={50}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#2A2A2A', border: 'none', borderRadius: 8 }}
              labelStyle={{ color: '#8E8E93' }}
              itemStyle={{ color: '#ffffff' }}
              formatter={(value) => {
                const num = typeof value === 'number' ? value : 0;
                return [`$${num}`, 'MRR'];
              }}
            />
            <Line
              type="monotone"
              dataKey="mrr"
              stroke="#E8002D"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#E8002D' }}
            />
            {lastPoint && (
              <ReferenceDot
                x={lastPoint.day}
                y={lastPoint.mrr}
                r={5}
                fill="#E8002D"
                stroke="#0A0A0A"
                strokeWidth={2}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
