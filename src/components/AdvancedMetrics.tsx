/**
 * @module components/AdvancedMetrics
 * @description Investor-grade metrics panel: Genius Score™, ARR trajectory,
 * activation/monetization rates, RPAU, and engagement gap.
 * Accepts the same Overview data already fetched in App.tsx — no extra network call.
 */

import type { Overview } from '../types/overview';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface GeniusScoreResult {
  score: number;
  label: string;
}

// ---------------------------------------------------------------------------
// Pure computation helpers
// ---------------------------------------------------------------------------

/**
 * Computes the proprietary Genius Score™ (0–100) by normalising three KPIs
 * against industry benchmarks and applying weighted composition.
 *
 * Benchmarks:
 *  - Growth rate   ≥ 30 % → perfect (weight 40 %)
 *  - Activation    ≥ 30 % → perfect (weight 30 %)
 *  - Monetisation  ≥  5 % → perfect (weight 30 %)
 */
function computeGeniusScore(data: Overview): GeniusScoreResult {
  const growthRate = data.growth.growthRateLast30Days;
  const activationRate = data.growth.activeUsersLast30Days / data.users.total;
  const monetizationRate =
    data.revenue.activeSubscribers / data.growth.activeUsersLast30Days;

  const growthScore = Math.min(1, growthRate / 30) * 100;
  const activationScore = Math.min(1, activationRate / 0.3) * 100;
  const monetizationScore = Math.min(1, monetizationRate / 0.05) * 100;

  const score = Math.round(
    growthScore * 0.4 + activationScore * 0.3 + monetizationScore * 0.3,
  );

  const label =
    score >= 80
      ? 'Exceptional'
      : score >= 60
        ? 'Strong'
        : score >= 40
          ? 'Growing'
          : 'Early Stage';

  return { score, label };
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface SectionCardProps {
  children: React.ReactNode;
}

function SectionCard({ children }: SectionCardProps) {
  return (
    <div
      className="flex flex-col gap-1 rounded-xl border border-white/10 p-4"
      style={{ background: 'rgba(255,255,255,0.04)' }}
    >
      {children}
    </div>
  );
}

interface MetricLabelProps {
  children: React.ReactNode;
}

function MetricLabel({ children }: MetricLabelProps) {
  return (
    <span className="text-xs font-medium uppercase tracking-wider text-white/40">
      {children}
    </span>
  );
}

interface MetricValueProps {
  children: React.ReactNode;
  color?: string;
  large?: boolean;
}

function MetricValue({ children, color, large }: MetricValueProps) {
  return (
    <span
      className={large ? 'text-4xl font-bold tracking-tight' : 'text-2xl font-bold'}
      style={color ? { color } : { color: '#FFFFFF' }}
    >
      {children}
    </span>
  );
}

interface MetricContextProps {
  children: React.ReactNode;
}

function MetricContext({ children }: MetricContextProps) {
  return <span className="text-xs text-white/40">{children}</span>;
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

interface AdvancedMetricsProps {
  data: Overview;
}

export function AdvancedMetrics({ data }: AdvancedMetricsProps) {
  const { users, growth, revenue } = data;

  // Genius Score™
  const { score, label } = computeGeniusScore(data);
  const scoreColor =
    score >= 80 ? '#4ade80' : score >= 60 ? '#fbbf24' : score >= 40 ? '#fb923c' : '#f87171';

  // Activation Rate
  const activationRate = (growth.activeUsersLast30Days / users.total) * 100;

  // Monetisation Rate
  const monetizationRate =
    (revenue.activeSubscribers / growth.activeUsersLast30Days) * 100;
  const freeToPaidRatio = Math.round(growth.activeUsersLast30Days / revenue.activeSubscribers);

  // Revenue per Active User (RPAU)
  const rpau = revenue.mrr / growth.activeUsersLast30Days;

  // ARR Trajectory
  const arr = revenue.mrr * 12;
  const growthRate = growth.growthRateLast30Days;
  const monthsTo100k =
    arr < 100_000 && growthRate > 0
      ? Math.ceil(Math.log(100_000 / arr) / Math.log(1 + growthRate / 100))
      : null;

  // Engagement Gap
  const engagementGap = Math.round(growth.activeUsersLast30Days / revenue.activeSubscribers);

  const formatUsd = (n: number) =>
    n >= 1_000
      ? `$${(n / 1_000).toFixed(1)}K`
      : `$${n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  return (
    <div
      className="flex flex-col rounded-2xl border border-red-500/30 p-6"
      style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 0 30px rgba(239,68,68,0.10)',
      }}
    >
      {/* Section header */}
      <div className="mb-5 flex items-center gap-2">
        <span className="text-xl">📊</span>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-red-400">
          Investor Metrics
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {/* ── Row 1: Genius Score™ (full-width hero) ── */}
        <div
          className="flex flex-col items-center rounded-xl border border-yellow-400/30 py-6"
          style={{
            background: 'rgba(251,191,36,0.05)',
            boxShadow: '0 0 24px rgba(251,191,36,0.12)',
          }}
        >
          <MetricLabel>Genius Score™</MetricLabel>
          <div className="mt-2 flex items-baseline gap-3">
            <span
              className="text-6xl font-black tracking-tight"
              style={{ color: scoreColor }}
            >
              {score}
            </span>
            <span className="text-2xl font-semibold text-white/60">/ 100</span>
          </div>
          <span className="mt-1 text-lg font-semibold" style={{ color: scoreColor }}>
            {label}
          </span>
          <MetricContext>Proprietary composite: growth + activation + monetisation</MetricContext>
        </div>

        {/* ── Row 2: Activation + Monetisation ── */}
        <div className="grid grid-cols-2 gap-4">
          <SectionCard>
            <MetricLabel>Activation Rate</MetricLabel>
            <MetricValue color="#60a5fa">{activationRate.toFixed(1)}%</MetricValue>
            <MetricContext>Active users / Total users</MetricContext>
            <MetricContext>Industry avg: 20–25%</MetricContext>
          </SectionCard>

          <SectionCard>
            <MetricLabel>Monetisation Rate</MetricLabel>
            <MetricValue color="#a78bfa">{monetizationRate.toFixed(1)}%</MetricValue>
            <MetricContext>Paying / active users</MetricContext>
            <MetricContext>{freeToPaidRatio}x free users to convert</MetricContext>
          </SectionCard>
        </div>

        {/* ── Row 3: RPAU + Engagement Gap ── */}
        <div className="grid grid-cols-2 gap-4">
          <SectionCard>
            <MetricLabel>Revenue per Active User</MetricLabel>
            <MetricValue color="#34d399">
              ${rpau.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </MetricValue>
            <MetricContext>MRR ÷ active users (30d)</MetricContext>
          </SectionCard>

          <SectionCard>
            <MetricLabel>Engagement Gap</MetricLabel>
            <MetricValue color="#fb923c">{engagementGap}x</MetricValue>
            <MetricContext>Engaged users per paying customer</MetricContext>
            <MetricContext>{engagementGap}x conversion opportunity</MetricContext>
          </SectionCard>
        </div>

        {/* ── Row 4: ARR Trajectory (full-width) ── */}
        <SectionCard>
          <MetricLabel>ARR Trajectory</MetricLabel>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <MetricValue color="#4ade80">{formatUsd(arr)} ARR today</MetricValue>
            {monthsTo100k !== null && (
              <span className="text-sm text-white/50">
                → $100K ARR in{' '}
                <span className="font-semibold text-white">~{monthsTo100k} months</span>
              </span>
            )}
            {monthsTo100k === null && arr >= 100_000 && (
              <span className="text-sm text-green-400 font-semibold">✓ $100K ARR achieved</span>
            )}
          </div>
          <MetricContext>
            Based on {growthRate.toFixed(2)}% monthly growth · MRR × 12
          </MetricContext>
        </SectionCard>
      </div>
    </div>
  );
}
