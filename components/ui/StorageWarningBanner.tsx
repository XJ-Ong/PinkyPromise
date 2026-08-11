"use client";

export default function StorageWarningBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div
      role="status"
      data-testid="storage-warning"
      className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 flex items-start justify-between gap-3"
    >
      <p>
        This demo saves your changes only in this browser. Storage is currently
        unavailable, so this change won&apos;t be saved after a refresh.
      </p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss storage warning"
        className="shrink-0 font-semibold text-amber-900 hover:text-amber-700"
      >
        Dismiss
      </button>
    </div>
  );
}