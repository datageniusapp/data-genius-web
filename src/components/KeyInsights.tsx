/**
 * @module components/KeyInsights
 * @description Key Insights list section with revenue and churn signal rows.
 * Each row has a circular icon, insight text, and right chevron.
 */
import type React from 'react';
import type { Overview } from '../types/overview';

/** Props for KeyInsights. */
export interface KeyInsightsProps {
  /** Overview data or null while loading. */
  data: Overview | null;
}

/** A single insight row in the list. */
interface InsightRow {
  icon: 'up' | 'down';
  text: string;
}

/**
 * Key Insights section — 2 dynamic insight rows derived from real overview data.
 */
export function KeyInsights({ data }: KeyInsightsProps): React.ReactElement {
  const insights: InsightRow[] = data
    ? [
        {
          icon: data.growth.growthRateLast30Days > 10 ? 'up' : 'down',
          text: `Revenue trending ${data.growth.growthRateLast30Days > 10 ? 'up' : 'down'} — $${data.revenue.mrr.toLocaleString()} MRR with ${data.revenue.arpu.toFixed(2)} ARPU.`,
        },
        {
          icon: data.revenue.activeSubscribers < 50 ? 'down' : 'up',
          text:
            data.revenue.activeSubscribers < 50
              ? `Churn signal: only ${data.revenue.activeSubscribers} active subscribers. Focus on retention.`
              : `Strong subscriber base: ${data.revenue.activeSubscribers} active paying users.`,
        },
      ]
    : [
        { icon: 'up', text: 'Loading revenue trend…' },
        { icon: 'down', text: 'Loading churn signal…' },
      ];

  return (
    <div className="mx-4">
      <h3 className="mb-3 text-base font-semibold text-white">Key insights</h3>
      <div
        className="rounded-xl overflow-hidden"
        style={{ backgroundColor: '#1A1A1A' }}
      >
        {insights.map((row, index) => (
          <div key={index} className="flex items-center gap-3 px-4 py-3">
            {/* Icon */}
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: 'rgba(232,0,45,0.15)' }}
            >
              <span className="text-sm" style={{ color: '#E8002D' }}>
                {row.icon === 'up' ? '↑' : '↓'}
              </span>
            </div>

            {/* Text */}
            <p className="flex-1 text-sm leading-snug" style={{ color: '#C0C0C5' }}>
              {row.text}
            </p>

            {/* Chevron */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              style={{ color: '#8E8E93' }}
            >
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
