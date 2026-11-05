"use client";

// Replaces window.confirm so we never use the browser's default dialogs.
export default function ConfirmDialog({ open, title, body, confirmLabel, busy, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="modal modal-open" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <div className="modal-box">
        <h3 id="confirm-title" className="text-xl font-semibold">{title}</h3>
        <p className="mt-3 text-base-content/75">{body}</p>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onCancel} disabled={busy}>Keep it</button>
          <button className="btn btn-error text-error-content" onClick={onConfirm} disabled={busy}>
            {busy ? <span className="loading loading-spinner loading-sm" /> : confirmLabel}
          </button>
        </div>
      </div>
      <div className="modal-backdrop bg-neutral/60" onClick={busy ? undefined : onCancel} />
    </div>
  );
}
