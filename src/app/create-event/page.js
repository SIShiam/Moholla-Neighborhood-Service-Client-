"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import RequireAuth from "@/components/RequireAuth";
import EventForm from "@/components/EventForm";
import SectionHeading from "@/components/SectionHeading";
import ZoomIn from "@/components/ZoomIn";
import { api } from "@/lib/api";

export default function CreateEventPage() {
  const router = useRouter();

  async function create(payload) {
    await api.createEvent(payload);
    toast.success("Your event is live on the board.");
    router.push("/events");
  }

  return (
    <RequireAuth>
      <section className="relative overflow-hidden py-12 md:py-20">
        <div className="pointer-events-none absolute inset-x-0 -top-32 h-[500px] ambient-glow-top" aria-hidden="true" />
        <div className="container-page relative max-w-3xl">
          <ZoomIn delay={0}>
            <SectionHeading title="Host a drive">
              Tell neighbours what is happening, where to meet and how many hands you need.
            </SectionHeading>
          </ZoomIn>
          <ZoomIn delay={120}>
            <div className="mt-8 beatsync-card rounded-3xl border border-base-300/80 bg-base-100/90 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
              <EventForm onSubmit={create} submitLabel="Publish event" busyLabel="Publishing" />
            </div>
          </ZoomIn>
        </div>
      </section>
    </RequireAuth>
  );
}
