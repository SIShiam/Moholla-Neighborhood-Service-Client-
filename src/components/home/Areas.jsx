import Link from "next/link";
import { MapPin, Compass } from "lucide-react";
import { AREAS } from "@/lib/constants";
import FadeUp from "@/components/FadeUp";

export default function Areas() {
  return (
    <section className="relative border-y border-base-300/80 bg-base-100/60 py-6 backdrop-blur-xl" aria-label="Browse by area">
      <FadeUp className="container-page flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary shadow-sm">
            <Compass className="h-4 w-4" />
          </span>
          <span className="font-heading text-xs font-extrabold uppercase tracking-wider text-base-content/60">
            Active Dhaka Hubs
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {AREAS.map((a) => (
            <Link
              key={a}
              href={`/events?search=${encodeURIComponent(a)}`}
              className="group flex items-center gap-1.5 rounded-full border border-base-300/80 bg-base-100/80 px-4 py-1.5 text-xs font-bold text-base-content/75 backdrop-blur-md transition-all duration-300 hover:border-primary hover:text-primary hover:bg-primary/10 hover:scale-105 active:scale-95 shadow-sm"
            >
              <MapPin className="h-3 w-3 text-primary/70 transition-transform group-hover:scale-110" />
              {a}
            </Link>
          ))}
          <Link
            href="/events"
            className="rounded-full bg-primary/15 border border-primary/30 px-4 py-1.5 text-xs font-bold text-primary transition-all duration-300 hover:bg-primary hover:text-primary-content hover:scale-105 active:scale-95 shadow-sm"
          >
            All 10 Areas →
          </Link>
        </div>
      </FadeUp>
    </section>
  );
}
