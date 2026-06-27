/**
 * @module components/MetricCard
 * @description Reusable glass-effect card for displaying a group of metrics.
 */

import type { ReactNode } from 'react';

interface MetricRowProps {
  label: string;
  value: string | number;
  large?: boolean;
  color?: string;
  indicator?: 'up' | 'down' | null;
}

export function MetricRow({ label, value, large, color, indicator }: MetricRowProps) {
  const valueStr = typeof value === 'number' ? value.toLocaleString() : value;
  return (
    <div className="flex items-baseline justify-between gap-4 py-2">
      <span className="text-sm text-white/50">{label}</span>
      <span
        className={large ? 'text-3xl font-bold tracking-tight' : 'text-base font-semibold'}
        style={color ? { color } : { color: '#FFFFFF' }}
      >
        {indicator === 'up' && <span className="mr-1 text-green-400">↑</span>}
        {indicator === 'down' && <span className="mr-1 text-red-400">↓</span>}
        {valueStr}
      </span>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  icon?: string;
  children: ReactNode;
  glowRed?: boolean;
}

export function MetricCard({ title, icon, children, glowRed }: MetricCardProps) {
  return (
    <div
      className={[
        'flex flex-col rounded-2xl border p-6',
        glowRed
          ? 'border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.15)]'
          : 'border-white/10',
      ].join(' ')}
      style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="mb-4 flex items-center gap-2">
        {icon && <span className="text-xl">{icon}</span>}
        <h2 className="text-xs font-semibold uppercase tracking-widest text-white/40">{title}</h2>
      </div>
      <div className="flex flex-col divide-y divide-white/5">{children}</div>
    </div>
  );
}
