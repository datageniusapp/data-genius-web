/**
 * @module components/KeyInsights
 * @description Actionable insight rows at the bottom of the dashboard.
 */

interface KeyInsightRowProps {
  label: string;
}

function KeyInsightRow({ label }: KeyInsightRowProps) {
  return (
    <div className="flex cursor-pointer items-center justify-between rounded-xl bg-white/5 p-4 transition hover:bg-white/10">
      <span className="text-sm text-white/80">{label}</span>
      <span className="text-white/40">›</span>
    </div>
  );
}

interface KeyInsightsProps {
  growthRate: string;
  atRisk: number;
  upside: number;
}

export function KeyInsights({ growthRate, atRisk, upside }: KeyInsightsProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
        Key Insights
      </p>
      <KeyInsightRow
        label={`↗ Growth is accelerating — ${growthRate} this month >`}
      />
      <KeyInsightRow
        label={`⚠ Recover at-risk users — ${atRisk} identified · +$${upside.toLocaleString()} upside >`}
      />
    </div>
  );
}
