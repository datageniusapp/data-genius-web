/**
 * @module components/BottomNav
 * @description Fixed bottom navigation bar.
 * Five items: Home (active, red), Metrics, center AI button (red circle + white star),
 * Reports, and Profile. Sticks to the bottom of the viewport.
 */
import type React from 'react';

/** A navigation item descriptor. */
interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  isCenter?: boolean;
  isActive?: boolean;
}

/**
 * Fixed bottom navigation with 5 tabs — Home, Metrics, AI, Reports, Profile.
 */
export function BottomNav(): React.ReactElement {
  const items: NavItem[] = [
    {
      id: 'home',
      label: 'Home',
      isActive: true,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 21V12h6v9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 'metrics',
      label: 'Metrics',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M18 20V10M12 20V4M6 20v-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 'ai',
      label: 'AI',
      isCenter: true,
      icon: <span className="text-xl text-white">✦</span>,
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-1/2 flex w-full max-w-[430px] -translate-x-1/2 items-center justify-around px-4 py-3"
      style={{ backgroundColor: '#0A0A0A', borderTop: '1px solid #1A1A1A' }}
      aria-label="Main navigation"
    >
      {items.map((item) => {
        if (item.isCenter) {
          return (
            <button
              key={item.id}
              type="button"
              aria-label={item.label}
              className="flex h-12 w-12 items-center justify-center rounded-full -mt-4 shadow-lg"
              style={{ backgroundColor: '#E8002D' }}
            >
              {item.icon}
            </button>
          );
        }

        return (
          <button
            key={item.id}
            type="button"
            aria-label={item.label}
            className="flex flex-col items-center gap-0.5"
            style={{ color: item.isActive ? '#E8002D' : '#8E8E93' }}
          >
            {item.icon}
            <span className="text-[10px]">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
