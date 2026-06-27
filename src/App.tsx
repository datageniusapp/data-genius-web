/**
 * @module App
 * @description Data Genius dashboard — main layout.
 */

import { useOverview } from './hooks/useOverview';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorState } from './components/ErrorState';
import { MetricCard, MetricRow } from './components/MetricCard';
import { AIInsightCard } from './components/AIInsightCard';
import { LiveNowFeed } from './components/LiveNowFeed';
import { KeyInsights } from './components/KeyInsights';
import { computeInsight, computeAtRisk, generateActivity } from './utils/insight';

function LiveBadge() {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-white/70">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
      </span>
      Live
    </span>
  );
}

function parseGrowthRate(rate: string): { value: string; direction: 'up' | 'down' | null } {
  const num = parseFloat(rate.replace('%', ''));
  if (isNaN(num)) return { value: rate, direction: null };
  return { value: rate, direction: num >= 0 ? 'up' : 'down' };
}

export default function App() {
  const { data, loading, error } = useOverview();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={error} />;
  if (!data) return <ErrorState message="No data received." />;

  const { users, growth, revenue } = data;
  const growthRate = parseGrowthRate(growth.growthRateLast30Days);
  const insight = computeInsight(data);
  const { atRisk, upside } = computeAtRisk(data);
  const activityItems = generateActivity(data);

  return (
    <div
      className="min-h-screen font-sans"
      style={{ background: '#000000', color: '#FFFFFF' }}
    >
      {/* Top bar */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              <span className="text-white">Data</span>
              <span style={{ color: '#EF4444' }}>Genius</span>
            </h1>
            <p className="mt-0.5 text-xs text-white/40">
              Credit is Power. Use it like a Genius.
            </p>
          </div>
          <LiveBadge />
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col gap-6">
          {/* AI Insight hero card */}
          <AIInsightCard insight={insight} />

          {/* Live Now feed */}
          <LiveNowFeed items={activityItems} />

          {/* Metric cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Users card */}
            <MetricCard title="Users" icon="👥">
              <MetricRow label="Total Users" value={users.total} large />
              <MetricRow label="New Last 30 Days" value={users.newLast30Days} />
              <MetricRow
                label="Active Last 30 Days"
                value={growth.activeUsersLast30Days}
              />
            </MetricCard>

            {/* Growth card */}
            <MetricCard title="Growth" icon="📈">
              <MetricRow
                label="Growth Rate (30d)"
                value={growthRate.value}
                large
                color="#EF4444"
                indicator={growthRate.direction}
              />
              <MetricRow label="Subscribed Users" value={growth.subscribedUsers} />
              <MetricRow label="New Users (30d)" value={growth.newUsersLast30Days} />
            </MetricCard>

            {/* Revenue card */}
            <MetricCard title="Revenue" icon="💰">
              <MetricRow
                label="MRR"
                value={revenue.mrr}
                large
                color="#FCB900"
              />
              <MetricRow label="Active Subscribers" value={revenue.activeSubscribers} />
              <MetricRow label="ARPU" value={revenue.arpu} />
              <MetricRow label="Revenue Last 28d" value={revenue.revenueLast28Days} />
            </MetricCard>
          </div>

          {/* Key Insights */}
          <KeyInsights
            growthRate={growth.growthRateLast30Days}
            atRisk={atRisk}
            upside={upside}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 border-t border-white/10 px-6 py-4 text-center">
        <p className="text-xs text-white/30">
          Powered by Credit Genius — Live Data
        </p>
      </footer>
    </div>
  );
}
