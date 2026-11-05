"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { api } from "@/lib/api";
import { useLoad } from "@/hooks/useLoad";
import EventCard from "@/components/EventCard";
import { GridSkeleton } from "@/components/Skeletons";
import SectionHeading from "@/components/SectionHeading";
import FadeUp from "@/components/FadeUp";

const filterTabs = ["All", "Donation", "Plantation", "Cleanup", "Blood Drive", "Food Distribution"];

export default function UpcomingSection() {
  const [activeType, setActiveType] = useState("All");
  const { data, error, loading, reload } = useLoad(() => api.listEvents({ limit: 12 }), []);

  const filteredData = data
    ? activeType === "All"
      ? data.slice(0, 6)
      : data.filter((e) => e.eventType === activeType).slice(0, 6)
    : [];

  return (
    <section className="section">
      <div className="container-page">
        <FadeUp className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-2">
              <Sparkles className="h-3.5 w-3.5" /> Upcoming on your street
            </div>
            <SectionHeading title="Coming up in the next few weeks">
              The drives that start soonest across Dhaka. Pick one, RSVP, and turn up with your neighbours.
            </SectionHeading>
          </div>
          <Link href="/events" className="btn btn-outline border-base-300/80 bg-base-100/60 backdrop-blur px-6 rounded-full font-semibold gap-2 hover:border-primary hover:bg-base-100 hover:scale-105 active:scale-95 transition-all">
            See all events <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeUp>

        {/* Quick filter pills */}
        <FadeUp delay={100} className="mt-8 flex flex-wrap items-center gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveType(tab)}
              className={`rounded-full px-5 py-2 text-xs font-bold transition-all duration-300 hover:scale-105 active:scale-95 ${
                activeType === tab
                  ? "bg-primary text-primary-content shadow-lg shadow-primary/20 scale-105"
                  : "bg-base-100/70 backdrop-blur border border-base-300/80 text-base-content/75 hover:border-primary hover:text-primary hover:bg-base-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </FadeUp>

        <div className="mt-8">
          {loading && !data ? (
            <GridSkeleton />
          ) : error ? (
            <div className="rounded-2xl border border-error/40 bg-base-100 p-8 text-center shadow-sm">
              <p className="font-bold text-error">We could not load the drives.</p>
              <p className="mt-1 text-sm text-base-content/70">{error}</p>
              <button onClick={reload} className="btn btn-primary btn-sm mt-4 px-6 rounded-xl">Try again</button>
            </div>
          ) : filteredData.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredData.map((e, idx) => (
                <FadeUp key={e._id} delay={(idx % 3) * 120} className="h-full">
                  <EventCard event={e} />
                </FadeUp>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-base-300 p-12 text-center bg-base-100/60">
              <p className="text-xl font-bold text-base-content">
                {activeType === "All" ? "No upcoming events yet" : `No upcoming ${activeType} drives`}
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-base-content/70">
                {activeType === "All"
                  ? "Be the first to post a drive for your neighbourhood."
                  : `Be the first to post a ${activeType} drive, or switch back to All.`}
              </p>
              {activeType !== "All" ? (
                <button
                  onClick={() => setActiveType("All")}
                  className="btn btn-outline btn-primary mt-6 rounded-xl px-6"
                >
                  View all categories
                </button>
              ) : (
                <Link href="/create-event" className="btn btn-primary mt-6 rounded-xl px-6">
                  Host an event
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
