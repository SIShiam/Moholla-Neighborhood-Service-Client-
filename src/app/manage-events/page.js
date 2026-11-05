"use client";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Pencil, Trash2, X } from "lucide-react";
import RequireAuth from "@/components/RequireAuth";
import EventForm from "@/components/EventForm";
import ConfirmDialog from "@/components/ConfirmDialog";
import SectionHeading from "@/components/SectionHeading";
import Thumb from "@/components/Thumb";
import { PageSkeleton } from "@/components/Skeletons";
import { api } from "@/lib/api";
import { useLoad } from "@/hooks/useLoad";
import { shortDate, timeOf, isPast } from "@/lib/format";

function ManageList() {
  const { data, error, loading, reload } = useLoad(() => api.myEvents(), []);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);

  async function update(payload) {
    await api.updateEvent(editing._id, payload);
    toast.success("Event updated.");
    setEditing(null);
    reload();
  }

  async function remove() {
    setBusy(true);
    try {
      await api.deleteEvent(deleting._id);
      toast.success("Event deleted.");
      setDeleting(null);
      reload();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (loading && !data) return <PageSkeleton />;

  return (
    <section className="container-page py-12 md:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading title="Events you host">Edit the details, move the date or take an event down.</SectionHeading>
        <Link href="/create-event" className="btn btn-primary px-6">Post a new event</Link>
      </div>

      {error ? (
        <div className="mt-10 rounded-box border border-error/40 bg-base-100 p-8 text-center">
          <p className="font-semibold">We could not load your events.</p>
          <p className="mt-1 text-base-content/70">{error}</p>
          <button onClick={reload} className="btn btn-primary btn-sm mt-4 px-5">Try again</button>
        </div>
      ) : !data?.length ? (
        <div className="mt-10 rounded-box border-2 border-dashed border-base-300 p-10 text-center">
          <p className="text-lg font-semibold">You have not posted any events</p>
          <p className="mt-1 text-base-content/70">Events you create will show up here so you can edit or delete them.</p>
          <Link href="/create-event" className="btn btn-primary mt-5 px-6">Create your first event</Link>
        </div>
      ) : (
        <div className="mt-10 overflow-x-auto rounded-box border border-base-300 bg-base-100">
          <table className="table">
            <thead>
              <tr><th>Event</th><th>Date</th><th>Volunteers</th><th className="text-right">Actions</th></tr>
            </thead>
            <tbody>
              {data.map((e) => (
                <tr key={e._id}>
                  <td>
                    <div className="flex items-center gap-4">
                      <Thumb src={e.thumbnail} type={e.eventType} title={e.title} className="h-14 w-20 shrink-0 rounded" />
                      <div className="min-w-48">
                        <Link href={`/events/${e._id}`} className="font-semibold hover:text-primary">{e.title}</Link>
                        <p className="text-sm text-base-content/65">{e.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap">
                    {shortDate(e.eventDate)}
                    <p className="text-sm text-base-content/65">{isPast(e.eventDate) ? "Ended" : timeOf(e.eventDate)}</p>
                  </td>
                  <td className="whitespace-nowrap">{e.participants} of {e.volunteersNeeded}</td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setEditing(e)} className="btn btn-outline btn-primary btn-sm"><Pencil className="h-4 w-4" aria-hidden="true" />Edit</button>
                      <button onClick={() => setDeleting(e)} className="btn btn-outline btn-error btn-sm"><Trash2 className="h-4 w-4" aria-hidden="true" />Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="modal modal-open" role="dialog" aria-modal="true" aria-labelledby="edit-title">
          <div className="modal-box max-w-3xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <h3 id="edit-title" className="text-2xl font-bold">Update event</h3>
              <button onClick={() => setEditing(null)} className="btn btn-ghost btn-square btn-sm" aria-label="Close"><X className="h-5 w-5" /></button>
            </div>
            <EventForm initial={editing} onSubmit={update} submitLabel="Save changes" busyLabel="Saving" />
          </div>
          <div className="modal-backdrop bg-neutral/60" onClick={() => setEditing(null)} />
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Delete this event?"
        body={deleting ? `"${deleting.title}" and everyone's sign-ups for it will be removed. This cannot be undone.` : ""}
        confirmLabel="Delete event"
        busy={busy}
        onConfirm={remove}
        onCancel={() => setDeleting(null)}
      />
    </section>
  );
}

export default function ManageEventsPage() {
  return (
    <RequireAuth>
      <ManageList />
    </RequireAuth>
  );
}
