"use client";
import Link from "next/link";
import { MapPin, Clock, CalendarPlus } from "lucide-react";
import RequireAuth from "@/components/RequireAuth";
import SectionHeading from "@/components/SectionHeading";
import { PageSkeleton } from "@/components/Skeletons";
import { api } from "@/lib/api";
import { useLoad } from "@/hooks/useLoad";
import { dayOf, monthOf, timeOf, isPast } from "@/lib/format";

function buildGCalUrl(event) {
  const startDate = new Date(event.eventDate);
  const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000);
  const format = (d) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");
  const dates = `${format(startDate)}/${format(endDate)}`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Mohollah: ${event.title}`,
    dates,
    location: event.location,
    details: `${event.description}\n\nOrganised on Mohollah.`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function JoinedList() {
  const { data, error, loading, reload } = useLoad(() => api.joinedEvents(), []);
  if (loading && !data) return <PageSkeleton />;

  return (
    <section className="container-page max-w-4xl py-12 md:py-16">
      <SectionHeading title="Events you signed up for">Sorted by date, soonest first.</SectionHeading>

      {error ? (
        <div className="mt-10 rounded-box border border-error/40 bg-base-100 p-8 text-center">
          <p className="font-semibold">We could not load your events.</p>
          <p className="mt-1 text-base-content/70">{error}</p>
          <button onClick={reload} className="btn btn-primary btn-sm mt-4 px-5">Try again</button>
        </div>
      ) : !data?.length ? (
        <div className="mt-10 rounded-box border-2 border-dashed border-base-300 p-10 text-center">
          <p className="text-lg font-semibold">You have not joined any events yet</p>
          <p className="mt-1 text-base-content/70">Find a drive near you and press Join Event.</p>
          <Link href="/events" className="btn btn-primary mt-5 px-6">Browse upcoming events</Link>
        </div>
      ) : (
        <ul className="mt-10 space-y-4">
          {data.map((e) => {
            const ended = isPast(e.eventDate);
            return (
              <li key={e._id} className={`flex overflow-hidden rounded-box border border-base-300 bg-base-100 ${ended ? "opacity-70" : ""}`}>
                <div className={`flex w-20 shrink-0 flex-col items-center justify-center py-4 ${ended ? "bg-base-300" : "bg-secondary text-secondary-content"}`}>
                  <span className="font-heading text-3xl font-bold leading-none">{dayOf(e.eventDate)}</span>
                  <span className="mt-1 text-sm font-semibold">{monthOf(e.eventDate)}</span>
                </div>
                <div className="flex flex-1 flex-wrap items-center justify-between gap-4 border-l-2 border-dashed border-base-300 p-5">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="badge badge-outline badge-primary">{e.eventType}</span>
                      {ended && <span className="badge">Ended</span>}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold">{e.title}</h3>
                    <p className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-sm text-base-content/70">
                      <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" aria-hidden="true" />{e.location}</span>
                      <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" aria-hidden="true" />{timeOf(e.eventDate)}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!ended && (
                      <a
                        href={buildGCalUrl(e)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline btn-sm rounded-xl px-3 gap-1 text-xs"
                        title="Add to Google Calendar"
                      >
                        <CalendarPlus className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Add to Calendar</span>
                      </a>
                    )}
                    <Link href={`/events/${e._id}`} className="btn btn-primary btn-sm rounded-xl px-5">View Event</Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default function JoinedEventsPage() {
  return (
    <RequireAuth>
      <JoinedList />
    </RequireAuth>
  );
}
