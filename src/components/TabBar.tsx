/**
 * @module components/TabBar
 * @description Tab bar with "Insights" (active) and "History" tabs.
 * Active tab shows white pill; inactive shows gray text.
 */
import type React from 'react';

/** Available tabs on the dashboard. */
export type Tab = 'insights' | 'history';

/** Props for TabBar component. */
export interface TabBarProps {
  /** Currently active tab. */
  activeTab: Tab;
  /** Callback when a tab is selected. */
  onTabChange: (tab: Tab) => void;
}

/**
 * Tab navigation bar — Insights and History tabs in a dark rounded pill container.
 */
export function TabBar({ activeTab, onTabChange }: TabBarProps): React.ReactElement {
  return (
    <div className="px-4 py-2">
      <div
        className="flex rounded-full p-1"
        style={{ backgroundColor: '#1A1A1A' }}
        role="tablist"
        aria-label="Dashboard sections"
      >
        <button
          role="tab"
          aria-selected={activeTab === 'insights'}
          type="button"
          onClick={() => onTabChange('insights')}
          className="flex-1 rounded-full py-2 text-sm font-semibold transition-colors"
          style={
            activeTab === 'insights'
              ? { backgroundColor: '#ffffff', color: '#0A0A0A' }
              : { color: '#8E8E93' }
          }
        >
          Insights
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'history'}
          type="button"
          onClick={() => onTabChange('history')}
          className="flex-1 rounded-full py-2 text-sm font-semibold transition-colors"
          style={
            activeTab === 'history'
              ? { backgroundColor: '#ffffff', color: '#0A0A0A' }
              : { color: '#8E8E93' }
          }
        >
          History
        </button>
      </div>
    </div>
  );
}
