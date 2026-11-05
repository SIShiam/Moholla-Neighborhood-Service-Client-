import { Suspense } from "react";
import SectionHeading from "@/components/SectionHeading";
import EventsBrowser from "@/components/EventsBrowser";
import { GridSkeleton } from "@/components/Skeletons";

export const metadata = { title: "Upcoming Events" };

export default function EventsPage() {
  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      <div className="pointer-events-none absolute inset-x-0 -top-32 h-[500px] ambient-glow-top" aria-hidden="true" />
      <div className="container-page relative animate-zoom-in">
        <SectionHeading title="Upcoming events">Every drive that has not happened yet, soonest first. Events that have passed are removed from this list.</SectionHeading>
        <Suspense fallback={<div className="mt-10"><GridSkeleton /></div>}>
          <EventsBrowser />
        </Suspense>
      </div>
    </section>
  );
}
