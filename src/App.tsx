/**
 * @module App
 * @description Root application component for the Data Genius dashboard.
 * Renders a mobile-first (max 430px) single-column scrollable layout with
 * header, tab bar, AI insight card, metrics grid, key insights, revenue chart,
 * and fixed bottom nav. Wires real data via useOverview hook.
 */
import type React from 'react';
import { useState } from 'react';
import { Header } from './components/Header';
import { TabBar, type Tab } from './components/TabBar';
import { AIInsightCard } from './components/AIInsightCard';
import { MetricsGrid } from './components/MetricsGrid';
import { KeyInsights } from './components/KeyInsights';
import { RevenueChart } from './components/RevenueChart';
import { BottomNav } from './components/BottomNav';
import { useOverview } from './hooks/useOverview';

/** Loading skeleton for metric cards while data is fetching. */
function SkeletonCard({ className = '' }: { className?: string }): React.ReactElement {
  return (
    <div
      className={`animate-pulse rounded-xl ${className}`}
      style={{ backgroundColor: '#1A1A1A' }}
    />
  );
}

/** Full dashboard content with real data. */
function DashboardContent(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<Tab>('insights');
  const { data, loading, error } = useOverview();

  return (
    <div
      className="relative mx-auto min-h-screen w-full max-w-[430px]"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <Header />
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Error banner */}
      {error && (
        <div
          className="mx-4 mb-4 rounded-xl px-4 py-3 text-sm"
          style={{ backgroundColor: '#3A0010', color: '#FF6B6B' }}
          role="alert"
        >
          ⚠️ {error} — showing last known data.
        </div>
      )}

      <div className="flex flex-col gap-4 pb-28">
        {/* AI Insight hero */}
        <AIInsightCard data={data} />

        {/* Metric cards or skeleton */}
        {loading ? (
          <div className="mx-4 grid grid-cols-3 gap-2">
            <SkeletonCard className="h-24" />
            <SkeletonCard className="h-24" />
            <SkeletonCard className="h-24" />
          </div>
        ) : (
          <MetricsGrid data={data} />
        )}

        {/* Key Insights */}
        {loading ? <SkeletonCard className="mx-4 h-28" /> : <KeyInsights data={data} />}

        {/* Revenue chart */}
        {loading ? <SkeletonCard className="mx-4 h-56" /> : <RevenueChart data={data} />}
      </div>

      <BottomNav />
    </div>
  );
}

/**
 * Root App component — wraps dashboard with full-screen dark background.
 */
export default function App(): React.ReactElement {
  return <DashboardContent />;
}
