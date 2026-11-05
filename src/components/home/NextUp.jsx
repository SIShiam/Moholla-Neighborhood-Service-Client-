"use client";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { MapPin, Clock, Share2, Sparkles, Check, ArrowRight } from "lucide-react";
import { api } from "@/lib/api";
import { useLoad } from "@/hooks/useLoad";
import { dayOf, monthOf, timeOf } from "@/lib/format";

function getDaysRemaining(dateString) {
  const diff = new Date(dateString).getTime() - Date.now();
  if (diff <= 0) return "Happening today";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  if (days === 0) return `In ${hours} hours`;
  if (days === 1) return `Tomorrow (${hours}h left)`;
  return `In ${days} days`;
}

// A notice-board style ticket for the soonest event in the database with interactive quick share and countdown.
export default function NextUp() {
  const { data, loading } = useLoad(() => api.listEvents({ limit: 1 }), []);
  const [copied, setCopied] = useState(false);
  const event = data?.[0];

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/events/${event._id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Event link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) return <div className="skeleton h-80 w-full rounded-2xl" aria-hidden="true" />;

  if (!event) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-base-300 bg-base-100 p-8 text-center shadow-sm">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
          <Sparkles className="h-6 w-6" />
        </div>
        <p className="mt-4 text-xl font-bold">The noticeboard is open</p>
        <p className="mt-2 text-sm text-base-content/70">No drives currently scheduled. Yours could be the spark your neighbourhood needs.</p>
        <Link href="/create-event" className="btn btn-primary mt-6 px-6 btn-sm">Post the first event</Link>
      </div>
    );
  }

  const left = Math.max(event.volunteersNeeded - event.participants, 0);
  const percent = Math.min(Math.round((event.participants / event.volunteersNeeded) * 100), 100);
  const countdown = getDaysRemaining(event.eventDate);

  return (
    <div className="beatsync-card group relative flex overflow-hidden rounded-3xl border border-base-300/80 bg-base-100/90 shadow-2xl backdrop-blur-xl lg:-rotate-1 lg:hover:rotate-0">
      {/* Date badge */}
      <div className="flex w-24 shrink-0 flex-col items-center justify-center bg-gradient-to-br from-amber-500 to-amber-600 px-2 py-6 text-neutral-950 shadow-md">
        <span className="font-heading text-5xl font-black leading-none">{dayOf(event.eventDate)}</span>
        <span className="mt-1 text-xs font-black uppercase tracking-wider">{monthOf(event.eventDate)}</span>
        <span className="mt-3 rounded-full bg-neutral-950/20 px-2.5 py-0.5 text-[10px] font-bold">
          {countdown}
        </span>
      </div>

      {/* Ticket body */}
      <div className="flex-1 border-l border-dashed border-base-300/80 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className="badge badge-primary badge-sm font-bold uppercase tracking-wider text-[11px] shadow-sm">
              Next on the Board
            </span>
            <button
              onClick={handleShare}
              className="btn btn-ghost btn-circle btn-xs text-base-content/70 hover:text-primary transition-transform hover:scale-110"
              title="Copy event link"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Share2 className="h-3.5 w-3.5" />}
            </button>
          </div>

          <h2 className="mt-2 text-2xl font-bold leading-snug tracking-tight text-base-content group-hover:text-primary transition-colors">
            {event.title}
          </h2>

          <ul className="mt-3.5 space-y-1.5 text-sm text-base-content/75">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span className="font-medium truncate">{event.location}</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{timeOf(event.eventDate)}</span>
            </li>
          </ul>
        </div>

        <div className="mt-5 border-t border-base-200 pt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-base-content/80">
              {event.participants} committed ({percent}%)
            </span>
            <span className={`font-semibold ${left <= 5 ? "text-error" : "text-primary"}`}>
              {left === 0 ? "Full" : `${left} spots remaining`}
            </span>
          </div>

          <progress
            className="progress progress-primary mt-2 h-2 w-full transition-all duration-300"
            value={event.participants}
            max={event.volunteersNeeded}
            aria-label="Volunteers joined"
          />

          <div className="mt-4 flex items-center justify-between gap-2">
            <span className="text-xs text-base-content/60">Organised by {event.creatorName || "Neighbours"}</span>
            <Link href={`/events/${event._id}`} className="btn btn-primary btn-sm rounded-full px-5 gap-1.5 font-bold shadow-md shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
              View Event <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
