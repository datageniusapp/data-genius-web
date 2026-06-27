/**
 * @module components/RetentionCard
 * @description D1 / D7 retention mini-card displayed within the AdvancedMetrics section.
 * Data is fetched from GET /users/retention — real MongoDB cohort queries.
 */

import type { Retention } from '../types/retention';

interface RetentionBarProps {
  pct: number | null;
  color: string;
}

function RetentionBar({ pct, color }: RetentionBarProps) {
  if (pct === null) return null;
  return (
    <div className="mt-1 h-1.5 w-full rounded-full bg-white/10">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${Math.min(100, pct)}%`, background: color }}
      />
    </div>
  );
}

interface RetentionCellProps {
  day: 'D1' | 'D7';
  cohortSize: number;
  retained: number;
  pct: number | null;
  color: string;
  benchmark: string;
}

function RetentionCell({ day, cohortSize, retained, pct, color, benchmark }: RetentionCellProps) {
  const isEmpty = cohortSize === 0;

  return (
    <div
      className="flex flex-col gap-1 rounded-xl border border-white/10 p-4"
      style={{ background: 'rgba(255,255,255,0.04)' }}
    >
      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color }}>
        {day} Retention
      </span>
      {isEmpty ? (
        <span className="text-sm text-white/40">No cohort data yet</span>
      ) : (
        <>
          <span className="text-2xl font-bold" style={{ color }}>
            {pct !== null ? `${pct.toFixed(1)}%` : '—'}
          </span>
          <RetentionBar pct={pct} color={color} />
          <span className="text-xs text-white/40">
            {retained} / {cohortSize} users retained
          </span>
          <span className="text-xs text-white/30">Industry avg: {benchmark}</span>
        </>
      )}
    </div>
  );
}

interface RetentionCardProps {
  retention: Retention;
}

export function RetentionCard({ retention }: RetentionCardProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <RetentionCell
        day="D1"
        cohortSize={retention.d1CohortSize}
        retained={retention.d1Retained}
        pct={retention.d1RetentionPct}
        color="#38bdf8"
        benchmark="25–40%"
      />
      <RetentionCell
        day="D7"
        cohortSize={retention.d7CohortSize}
        retained={retention.d7Retained}
        pct={retention.d7RetentionPct}
        color="#818cf8"
        benchmark="15–25%"
      />
    </div>
  );
}
