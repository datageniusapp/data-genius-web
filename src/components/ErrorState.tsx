/**
 * @module components/ErrorState
 * @description Error boundary display for API failures.
 */

interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="flex min-h-screen items-center justify-center" style={{ background: '#000000' }}>
      <div
        className="rounded-xl border border-red-500/30 p-8 text-center backdrop-blur"
        style={{ background: 'rgba(255,255,255,0.05)' }}
      >
        <p className="mb-2 text-lg font-semibold text-red-400">Failed to load data</p>
        <p className="text-sm text-white/40">{message}</p>
      </div>
    </div>
  );
}
