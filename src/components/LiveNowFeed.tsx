/**
 * @module components/LiveNowFeed
 * @description Real-time activity feed derived from live dashboard stats.
 */

import type { ActivityItem } from '../utils/insight';

interface LiveNowFeedProps {
  items: ActivityItem[];
}

export function LiveNowFeed({ items }: LiveNowFeedProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
        Live Now
      </p>
      <ul className="flex flex-wrap gap-3">
        {items.map((item) => (
          <li
            key={`${item.icon}-${item.text}`}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70"
          >
            <span>{item.icon}</span>
            <span>{item.text}</span>
            <span className="text-white/30">{item.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
