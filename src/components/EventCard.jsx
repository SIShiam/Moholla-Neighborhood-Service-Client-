"use client";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { MapPin, Clock, Share2, Check, ArrowRight, Flame } from "lucide-react";
import Thumb from "./Thumb";
import { dayOf, monthOf, timeOf } from "@/lib/format";

export default function EventCard({ event }) {
  const { _id, title, thumbnail, eventType, location, eventDate, participants = 0, volunteersNeeded = 1 } = event;
  const [copied, setCopied] = useState(false);
  const left = Math.max(volunteersNeeded - participants, 0);
  const percent = Math.min(Math.round((participants / volunteersNeeded) * 100), 100);

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/events/${_id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Event link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="beatsync-card group flex h-full flex-col overflow-hidden rounded-2xl border border-base-300/80 bg-base-100/85 shadow-md backdrop-blur-md">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-base-300/50">
        <Thumb src={thumbnail} type={eventType} title={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        
        {/* Date pill */}
        <div className="absolute left-3 top-3 w-14 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 py-1.5 text-center text-neutral-950 shadow-md">
          <span className="block font-heading text-2xl font-black leading-none">{dayOf(eventDate)}</span>
          <span className="mt-0.5 block text-xs font-black uppercase leading-none">{monthOf(eventDate)}</span>
        </div>

        {/* Quick share button */}
        <button
          onClick={handleShare}
          className="btn btn-circle btn-xs absolute right-3 top-3 border-0 bg-base-100/90 text-base-content backdrop-blur hover:bg-base-100 shadow transition-transform group-hover:scale-110"
          title="Share event"
          aria-label="Share event"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Share2 className="h-3.5 w-3.5" />}
        </button>

        {/* Urgency tag */}
        {left > 0 && left <= 5 && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-error/90 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-sm backdrop-blur">
            <Flame className="h-3 w-3" /> Only {left} {left === 1 ? "spot" : "spots"} left!
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <span className="badge badge-primary badge-sm font-bold uppercase tracking-wider text-[11px] shadow-sm">{eventType}</span>
          <span className="text-xs font-semibold text-base-content/60">{percent}% filled</span>
        </div>

        <h3 className="line-clamp-2 min-h-[3.2rem] text-lg font-bold leading-snug text-base-content transition-colors group-hover:text-primary">
          <Link href={`/events/${_id}`}>{title}</Link>
        </h3>

        <ul className="space-y-1.5 text-sm text-base-content/75">
          <li className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span className="truncate font-medium">{location}</span>
          </li>
          <li className="flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span>{timeOf(eventDate)}</span>
          </li>
        </ul>

        <div className="mt-2">
          <progress className="progress progress-primary h-2 w-full transition-all duration-300" value={participants} max={volunteersNeeded} aria-label="Volunteers joined" />
          <p className="mt-1.5 text-xs font-medium text-base-content/70">
            {left === 0 ? "🎉 All spots filled!" : `${left} more ${left === 1 ? "volunteer" : "volunteers"} needed`}
          </p>
        </div>

        <div className="mt-auto pt-3 border-t border-base-200 flex items-center justify-between">
          <span className="text-xs text-base-content/50">Dhaka Mohollah</span>
          <Link href={`/events/${_id}`} className="btn btn-primary btn-sm rounded-full px-5 gap-1.5 font-bold shadow-md shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
            View Details <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
