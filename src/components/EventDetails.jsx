"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  CalendarDays,
  Clock,
  MapPin,
  ArrowLeft,
  CalendarPlus,
  Share2,
  Check,
  CheckSquare,
  Square,
  MessageCircle,
  ShieldCheck,
  Info
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { api } from "@/lib/api";
import { useLoad } from "@/hooks/useLoad";
import { fullDate, timeOf, isPast } from "@/lib/format";
import Thumb from "./Thumb";
import Avatar from "./Avatar";
import ConfirmDialog from "./ConfirmDialog";
import { PageSkeleton } from "./Skeletons";

function buildGoogleCalendarUrl(event) {
  const startDate = new Date(event.eventDate);
  const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000); // 3 hours duration default

  const formatGCal = (d) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");
  const dates = `${formatGCal(startDate)}/${formatGCal(endDate)}`;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Mohollah Drive: ${event.title}`,
    dates,
    details: `${event.description}\n\nOrganised by ${event.creatorName} on Mohollah.`,
    location: event.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function EventDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const { data: event, error, loading, reload } = useLoad(() => api.getEvent(id), [id]);
  const member = useLoad(() => api.membership(id), [id, user?.email], { enabled: !isPending && Boolean(user) });
  const [busy, setBusy] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [copied, setCopied] = useState(false);

  // Interactive packing checklist state
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (idx) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const checklistItems = [
    "Comfortable clothing & closed-toe footwear for street work",
    "Reusable water bottle (avoid single-use plastics)",
    "Fully charged smartphone for coordinator coordination",
    "Neighbourhood enthusiasm & readiness to help!",
  ];

  if (loading && !event) return <PageSkeleton />;
  if (error || !event) {
    return (
      <section className="container-page py-24 text-center">
        <h1 className="text-3xl font-bold">Event not found</h1>
        <p className="mx-auto mt-3 max-w-md text-base-content/70">{error || "This event may have been removed by its organiser."}</p>
        <Link href="/events" className="btn btn-primary mt-8 px-6">See upcoming events</Link>
      </section>
    );
  }

  const joined = Boolean(user) && member.data?.joined;
  const mine = user?.email === event.creatorEmail;
  const ended = isPast(event.eventDate);
  const full = event.participants >= event.volunteersNeeded;
  const left = Math.max(event.volunteersNeeded - event.participants, 0);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  function copyShareLink() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Event link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  }

  function shareWhatsApp() {
    const text = encodeURIComponent(
      `Hey! I found this community drive on Mohollah: "${event.title}" in ${event.location}.\nSign up here: ${shareUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  }

  async function join() {
    if (!user) {
      toast("Sign in first, then press Join Event again.");
      return router.push(`/login?next=${encodeURIComponent(`/events/${id}`)}`);
    }
    setBusy(true);
    try {
      await api.joinEvent(id);
      toast.success("You have joined this event! Find it under Joined Events.");
      await Promise.all([reload(), member.reload()]);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function leave() {
    setBusy(true);
    try {
      await api.leaveEvent(id);
      toast.success("You have left this event.");
      setLeaving(false);
      await Promise.all([reload(), member.reload()]);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="relative overflow-hidden py-10 md:py-14">
      <div className="pointer-events-none absolute inset-x-0 -top-32 h-[500px] ambient-glow-top" aria-hidden="true" />
      <div className="container-page relative animate-zoom-in">
        <Link href="/events" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All upcoming events
        </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="overflow-hidden rounded-3xl border border-base-300 shadow-sm">
            <Thumb src={event.thumbnail} type={event.eventType} title={event.title} className="aspect-[16/9] w-full object-cover" />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <span className="badge badge-primary font-bold uppercase tracking-wider text-xs shadow-sm">{event.eventType}</span>
            
            {/* Interactive share actions bar */}
            <div className="flex items-center gap-2">
              <button
                onClick={shareWhatsApp}
                className="btn btn-outline btn-xs rounded-full px-3 gap-1 text-success border-success/40 hover:bg-success hover:text-success-content hover:scale-105 active:scale-95 transition-all"
                title="Share to WhatsApp"
              >
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </button>
              <button
                onClick={copyShareLink}
                className="btn btn-outline btn-xs rounded-full px-3 gap-1 border-base-300/80 hover:border-primary hover:text-primary hover:scale-105 active:scale-95 transition-all"
                title="Copy event link"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Share2 className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy Link"}
              </button>
              <a
                href={buildGoogleCalendarUrl(event)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-xs rounded-full px-3 gap-1 text-primary border-primary/40 hover:bg-primary hover:text-primary-content hover:scale-105 active:scale-95 transition-all"
                title="Add to Google Calendar"
              >
                <CalendarPlus className="h-3.5 w-3.5" /> Calendar
              </a>
            </div>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">{event.title}</h1>

          {/* Description */}
          <div className="mt-6 border-t border-base-200 pt-6">
            <h2 className="font-heading text-lg font-bold">About this drive</h2>
            <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-base-content/85">{event.description}</p>
          </div>

          {/* Interactive Volunteer Prep Checklist */}
          <div className="mt-8 rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 text-primary">
              <ShieldCheck className="h-5 w-5" />
              <h3 className="font-heading text-base font-bold text-base-content">
                Volunteer Preparation Checklist
              </h3>
            </div>
            <p className="mt-1 text-xs text-base-content/70">
              Interactive checklist to make sure you&apos;re ready before heading out to {event.location}:
            </p>

            <ul className="mt-4 space-y-2.5">
              {checklistItems.map((item, idx) => {
                const isDone = Boolean(checkedItems[idx]);
                return (
                  <li
                    key={idx}
                    onClick={() => toggleCheck(idx)}
                    className={`flex items-center gap-3 rounded-xl p-2.5 text-xs font-medium cursor-pointer transition-colors ${
                      isDone ? "bg-success/10 text-success-content line-through" : "bg-base-200/60 hover:bg-base-200 text-base-content/80"
                    }`}
                  >
                    {isDone ? (
                      <CheckSquare className="h-4 w-4 text-success shrink-0" />
                    ) : (
                      <Square className="h-4 w-4 text-base-content/40 shrink-0" />
                    )}
                    <span>{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Sidebar / RSVP ticket */}
        <aside className="h-fit rounded-3xl border border-base-300 bg-base-100 p-6 shadow-md lg:sticky lg:top-24">
          <ul className="space-y-4">
            <li className="flex gap-3">
              <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <span className="block text-xs font-bold uppercase text-base-content/50">Date</span>
                <span className="font-semibold">{fullDate(event.eventDate)}</span>
              </div>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <span className="block text-xs font-bold uppercase text-base-content/50">Time</span>
                <span className="font-semibold">{timeOf(event.eventDate)}</span>
              </div>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <span className="block text-xs font-bold uppercase text-base-content/50">Meeting Point</span>
                <span className="font-semibold">{event.location}</span>
              </div>
            </li>
          </ul>

          <div className="mt-6 border-t border-base-300 pt-6">
            <div className="flex items-baseline justify-between">
              <span className="font-heading text-3xl font-black text-primary">{event.participants}</span>
              <span className="text-sm font-medium text-base-content/70">of {event.volunteersNeeded} spots filled</span>
            </div>
            <progress className="progress progress-primary mt-2 h-2.5 w-full" value={event.participants} max={event.volunteersNeeded} aria-label="Volunteers joined" />
            <p className="mt-2 text-xs font-medium text-base-content/70">
              {full ? "🎉 This drive has reached its volunteer capacity!" : `${left} more ${left === 1 ? "person" : "people"} needed.`}
            </p>
          </div>

          <div className="mt-6">
            {ended ? (
              <button className="btn btn-disabled w-full rounded-full" disabled>This event has ended</button>
            ) : mine ? (
              <Link href="/manage-events" className="btn btn-outline btn-primary w-full rounded-full font-bold hover:scale-105 active:scale-95 transition-all">
                You are hosting this • Manage event
              </Link>
            ) : joined ? (
              <>
                <div className="rounded-2xl border border-success/30 bg-success/15 p-4 text-center">
                  <p className="text-sm font-bold text-success">✓ You are registered for this drive</p>
                  <p className="mt-1 text-xs text-base-content/70">See you on the ground!</p>
                </div>
                <button onClick={() => setLeaving(true)} className="btn btn-outline btn-sm mt-3 w-full rounded-full text-xs hover:border-error hover:bg-error hover:text-white transition-all">
                  Leave event
                </button>
              </>
            ) : (
              <button
                onClick={join}
                disabled={busy || full || (Boolean(user) && member.loading && !member.data)}
                className="btn btn-primary w-full rounded-full text-base shadow-lg shadow-primary/25 font-bold hover:shadow-primary/40 hover:scale-[1.02] active:scale-95 transition-all"
              >
                {busy ? <span className="loading loading-spinner loading-sm" /> : full ? "Volunteer spots are full" : "Join Event"}
              </button>
            )}
            {!user && !isPending && !ended && (
              <p className="mt-3 text-center text-xs text-base-content/60">
                You will be prompted to log in or create an account first.
              </p>
            )}
          </div>

          <div className="mt-6 flex items-center gap-3 border-t border-base-300 pt-6">
            <Avatar src={event.creatorImage} name={event.creatorName} size={44} />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-base-content/60 uppercase tracking-wider">Host & Organizer</p>
              <p className="truncate font-bold text-base-content">{event.creatorName}</p>
            </div>
          </div>
        </aside>
      </div>

      <ConfirmDialog
        open={leaving}
        title="Leave this event?"
        body="Your spot will open up for another volunteer. You can rejoin at any time if spots remain."
        confirmLabel="Leave event"
        busy={busy}
        onConfirm={leave}
        onCancel={() => setLeaving(false)}
      />
      </div>
    </section>
  );
}
