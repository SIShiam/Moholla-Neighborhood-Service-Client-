"use client";
import { useState } from "react";
import { CalendarPlus, MousePointerClick, Users, Share2, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import FadeUp from "@/components/FadeUp";

const steps = [
  {
    id: "create",
    icon: CalendarPlus,
    badge: "Step 1",
    title: "Post a drive in 2 minutes",
    desc: "Pick your neighbourhood, set a date, and state how many hands you need. Past dates are automatically blocked.",
    preview: {
      tag: "Mirpur 10 • Blanket Drive",
      heading: "Winter Warmth for Rickshaw Pullers",
      location: "Mirpur 10 Circle, Dhaka",
      target: "Needs 40 volunteers",
      detail: "Clean jackets, blankets & sorting hands needed. Meets at 6:00 PM.",
    },
  },
  {
    id: "join",
    icon: MousePointerClick,
    badge: "Step 2",
    title: "Join with one tap",
    desc: "Sign in and hit Join Event. The drive is instantly saved to your personal dashboard with reminders and directions.",
    preview: {
      tag: "Live Interactive Demo",
      heading: "Hatirjheel Cleanup Drive",
      location: "Hatirjheel Walkway, Dhaka",
      target: "28 of 35 spots filled",
      detail: "Gloves and bags provided. Click Join below to test live RSVP!",
    },
  },
  {
    id: "share",
    icon: Share2,
    badge: "Step 3",
    title: "Coordinate with WhatsApp",
    desc: "Every event comes with a 1-click WhatsApp and social invite link so your friends and university clubs can join together.",
    preview: {
      tag: "WhatsApp Ready",
      heading: "Uttara Tree Plantation",
      location: "Sector 10 Lake Road, Dhaka",
      target: "Invite your batchmates",
      detail: "Share with one tap: 'Hey friends, join our Uttara tree planting this Saturday via Mohollah!'",
    },
  },
  {
    id: "impact",
    icon: Users,
    badge: "Step 4",
    title: "Transparent volunteer goals",
    desc: "Live progress bars show exactly how many spots remain. Once filled, drives automatically close to prevent overcrowding.",
    preview: {
      tag: "Live Goal Tracker",
      heading: "Free Eye Checkup Camp",
      location: "Tejgaon Community Clinic",
      target: "Goal: 25 volunteers",
      detail: "Transparent headcount guarantees every drive has the right support without chaos.",
    },
  },
];

export default function Features() {
  const [activeTab, setActiveTab] = useState(0);
  const [simulatedCount, setSimulatedCount] = useState(28);
  const [hasJoined, setHasJoined] = useState(false);

  const active = steps[activeTab];
  const Icon = active.icon;

  const toggleSimulate = () => {
    if (hasJoined) {
      setSimulatedCount((c) => c - 1);
      setHasJoined(false);
    } else {
      setSimulatedCount((c) => c + 1);
      setHasJoined(true);
    }
  };

  return (
    <section className="section relative overflow-hidden bg-base-200">
      {/* Studio ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-[500px] ambient-glow-center" aria-hidden="true" />

      <div className="container-page relative">
        <FadeUp className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-3">
            <Sparkles className="h-3.5 w-3.5" /> Community Capabilities
          </div>
          <SectionHeading title="Built for people who care about their street">
            No messy WhatsApp endless chats or lost Google Forms. Everything your neighbourhood needs in one clean board.
          </SectionHeading>
        </FadeUp>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Step Selector Tabs */}
          <FadeUp delay={100} className="space-y-3.5 lg:col-span-5">
            {steps.map((s, idx) => {
              const StepIcon = s.icon;
              const isCurrent = activeTab === idx;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left rounded-2xl p-5 border transition-all duration-300 flex items-start gap-4 ${
                    isCurrent
                      ? "border-primary/60 bg-base-100/90 shadow-xl shadow-primary/5 ring-1 ring-primary/40 -translate-y-0.5"
                      : "border-base-300/80 bg-base-100/50 hover:border-primary/30 hover:bg-base-100/80 hover:-translate-y-0.5"
                  }`}
                >
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-all duration-300 ${
                      isCurrent ? "bg-primary text-primary-content shadow-md shadow-primary/25 scale-105" : "bg-base-200 text-base-content/70"
                    }`}
                  >
                    <StepIcon className="h-5 w-5" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">
                        {s.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-base-content md:text-lg">{s.title}</h3>
                    <p className="mt-1 text-xs text-base-content/70 line-clamp-2 md:text-sm">{s.desc}</p>
                  </div>
                </button>
              );
            })}
          </FadeUp>

          {/* Interactive Live Interactive Simulator Card */}
          <FadeUp delay={200} className="lg:col-span-7">
            <div className="beatsync-card relative overflow-hidden rounded-3xl border border-base-300/80 bg-base-100/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              {/* Background graphic */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-secondary/15 blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between border-b border-base-300 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-error inline-block" />
                    <span className="h-3 w-3 rounded-full bg-warning inline-block" />
                    <span className="h-3 w-3 rounded-full bg-success inline-block" />
                    <span className="ml-2 text-xs font-mono text-base-content/60">interactive-preview.mohollah</span>
                  </div>
                  <span className="badge badge-secondary badge-sm font-semibold">{active.preview.tag}</span>
                </div>

                <div className="mt-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                    <Sparkles className="h-4 w-4" /> Interactive Simulation
                  </div>
                  <h4 className="mt-1 text-2xl font-bold tracking-tight">{active.preview.heading}</h4>
                  <p className="mt-1 text-sm font-medium text-base-content/70">{active.preview.location}</p>
                  <p className="mt-4 text-sm leading-relaxed text-base-content/85">{active.preview.detail}</p>
                </div>

                {/* Simulated interactive module */}
                <div className="mt-6 rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-base-content/60">
                        Volunteers Committed
                      </span>
                      <p className="font-heading text-2xl font-black text-primary">
                        {activeTab === 1 ? simulatedCount : 24} <span className="text-sm font-normal text-base-content/70">/ 35 volunteers</span>
                      </p>
                    </div>
                    <span className="badge badge-outline badge-primary text-xs">
                      {35 - (activeTab === 1 ? simulatedCount : 24)} spots left
                    </span>
                  </div>

                  <progress
                    className="progress progress-primary mt-3 h-2.5 w-full transition-all duration-500"
                    value={activeTab === 1 ? simulatedCount : 24}
                    max={35}
                  />

                  {activeTab === 1 ? (
                    <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                      <span className="text-xs text-base-content/70">
                        {hasJoined ? "🎉 You're signed up! Spot reserved." : "Try clicking below to simulate joining:"}
                      </span>
                      <button
                        onClick={toggleSimulate}
                        className={`btn btn-sm w-full sm:w-auto transition-all ${
                          hasJoined ? "btn-success text-success-content" : "btn-primary"
                        }`}
                      >
                        {hasJoined ? (
                          <>
                            <CheckCircle2 className="h-4 w-4" /> Joined (Click to Leave)
                          </>
                        ) : (
                          <>
                            <MousePointerClick className="h-4 w-4" /> Join Event Now
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="mt-4 flex items-center gap-2 text-xs text-base-content/70">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Automatic headcount updates prevent overcrowding on site.
                    </div>
                  )}
                </div>

                {/* Action button */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex -space-x-2">
                    <div className="h-8 w-8 rounded-full bg-primary/20 text-primary border-2 border-base-100 flex items-center justify-center text-xs font-bold">AK</div>
                    <div className="h-8 w-8 rounded-full bg-secondary/30 text-secondary-content border-2 border-base-100 flex items-center justify-center text-xs font-bold">FR</div>
                    <div className="h-8 w-8 rounded-full bg-accent/20 text-accent border-2 border-base-100 flex items-center justify-center text-xs font-bold">RH</div>
                    <div className="h-8 w-8 rounded-full bg-neutral text-white border-2 border-base-100 flex items-center justify-center text-xs font-bold">+21</div>
                  </div>
                  <a href="/events" className="btn btn-outline btn-primary btn-sm gap-2">
                    Browse Live Drives <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
