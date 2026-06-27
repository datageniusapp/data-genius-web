/**
 * @module components/LoadingSpinner
 * @description Full-screen loading state.
 */

export function LoadingSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center" style={{ background: '#000000' }}>
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-white/10"
          style={{ borderTopColor: '#0693E3' }}
        />
        <p className="text-sm text-white/50">Loading live data…</p>
      </div>
    </div>
  );
}
