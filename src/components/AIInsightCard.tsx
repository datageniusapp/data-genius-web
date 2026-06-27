/**
 * @module components/AIInsightCard
 * @description Hero card showing the AI-computed insight from real dashboard data.
 */

import type { InsightResult } from '../utils/insight';

interface AIInsightCardProps {
  insight: InsightResult;
}

export function AIInsightCard({ insight }: AIInsightCardProps) {
  return (
    <div className="rounded-2xl border border-red-500/30 bg-white/5 p-6 shadow-[0_0_40px_rgba(239,68,68,0.1)] backdrop-blur">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-red-400">
        ✦ AI Insight
      </p>
      <p className="text-2xl font-bold leading-snug text-white">
        {insight.headline}
      </p>
      <p className="mt-2 text-sm text-white/60">{insight.subtext}</p>
      <div className="mt-5">
        <button
          type="button"
          className="rounded-full border border-red-500 px-5 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
        >
          ✦ Run Genius Plan
        </button>
      </div>
    </div>
  );
}
