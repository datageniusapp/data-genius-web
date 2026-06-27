/**
 * @module components/Header
 * @description Top header bar for the Data Genius dashboard.
 * Shows the DataGenius logo (white "Data" + red "Genius"), a bell icon with
 * red notification badge, and a circular avatar placeholder.
 */
import type React from 'react';

/** Header component — logo, notification bell, and user avatar. */
export function Header(): React.ReactElement {
  return (
    <header className="flex items-center justify-between px-4 py-4">
      {/* Logo */}
      <div className="flex items-center">
        <span className="text-xl font-bold text-white">Data</span>
        <span className="text-xl font-bold" style={{ color: '#E8002D' }}>
          Genius
        </span>
      </div>

      {/* Right side: bell + avatar */}
      <div className="flex items-center gap-3">
        {/* Bell icon with badge */}
        <div className="relative">
          <button
            type="button"
            aria-label="Notifications"
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{ backgroundColor: '#1A1A1A' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {/* Red notification dot */}
          <span
            className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full border-2"
            style={{ backgroundColor: '#E8002D', borderColor: '#0A0A0A' }}
            aria-label="New notifications"
          />
        </div>

        {/* Avatar */}
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: '#2A2A2A' }}
          aria-label="User avatar"
        >
          DG
        </div>
      </div>
    </header>
  );
}
