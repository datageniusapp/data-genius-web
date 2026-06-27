/**
 * @module components/AIInsightCard
 * @description Hero AI Insight card showing today's founder brief.
 * Displays MRR, active subscribers, growth rate, and focus action,
 * with a decorative glowing star on the right.
 */
import type React from 'react';
import type { Overview } from '../types/overview';

/** Props for AIInsightCard. */
export interface AIInsightCardProps {
  /** Overview data from the API, or null while loading. */
  data: Overview | null;
}

/**
 * Hero AI Insight card — "Today's Founder Brief" with real metrics and call to action.
 */
export function AIInsightCard({ data }: AIInsightCardProps): React.ReactElement {
  const mrr = data?.revenue.mrr ?? 0;
  const subscribers = data?.revenue.activeSubscribers ?? 0;
  const growth = data?.growth.growthRateLast30Days ?? 0;

  const insightText = data
    ? `MRR is $${mrr.toLocaleString()} with ${subscribers} active subscribers. Growth rate is ${growth.toFixed(1)}% over the last 30 days.`
    : 'Loading your metrics…';

  return (
    <div
      className="relative mx-4 overflow-hidden rounded-2xl p-5"
      style={{ backgroundColor: '#1A1A1A' }}
    >
      {/* AI INSIGHT label */}
      <div className="mb-3 flex items-center gap-1.5">
        <span style={{ color: '#E8002D' }} aria-hidden="true" className="text-base">
          ✦
        </span>
        <span
          className="text-xs font-semibold tracking-widest"
          style={{ color: '#E8002D', letterSpacing: '0.15em' }}
        >
          AI INSIGHT
        </span>
      </div>

      {/* Heading */}
      <h2 className="mb-2 text-2xl font-bold text-white">Today&apos;s Founder Brief</h2>

      {/* Insight body */}
      <p className="mb-1 text-sm leading-relaxed" style={{ color: '#C0C0C5' }}>
        {insightText}
      </p>

      {/* Focus line */}
      <p className="mb-3 text-sm font-semibold" style={{ color: '#E8002D' }}>
        Focus this week: retention.
      </p>

      {/* View action plan link */}
      <button type="button" className="text-sm" style={{ color: '#8E8E93' }}>
        View action plan →
      </button>

      {/* Decorative glowing star */}
      <div
        className="pointer-events-none absolute top-4 right-4 flex h-16 w-16 items-center justify-center"
        aria-hidden="true"
      >
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(232,0,45,0.25) 0%, rgba(232,0,45,0.05) 60%, transparent 80%)',
            filter: 'drop-shadow(0 0 16px rgba(232,0,45,0.6))',
          }}
        >
          <span className="text-3xl" style={{ color: '#E8002D' }}>
            ✦
          </span>
        </div>
      </div>
    </div>
  );
}
