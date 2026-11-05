"use client";
import { useState } from "react";
import { Users, HeartHandshake, MapPin, Clock, Award, ShieldCheck } from "lucide-react";
import FadeUp from "@/components/FadeUp";

const stats = [
  {
    icon: Users,
    number: "1,450+",
    label: "Volunteers Registered",
    detail: "Students, professionals & elders across Dhaka who show up on weekends.",
  },
  {
    icon: HeartHandshake,
    number: "128",
    label: "Drives Completed",
    detail: "From winter blanket distributions to emergency flood and food reliefs.",
  },
  {
    icon: MapPin,
    number: "10",
    label: "Dhaka Mohollahs",
    detail: "Active neighborhood clusters in Mirpur, Uttara, Dhanmondi, Old Dhaka & more.",
  },
  {
    icon: Clock,
    number: "3,800+",
    label: "Hours Contributed",
    detail: "100% grassroots, unmonetized, neighbor-to-neighbor community service.",
  },
];

export default function ImpactStats() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section className="relative overflow-hidden border-y border-base-300/80 bg-base-100/60 py-20 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-96 ambient-glow-bottom" aria-hidden="true" />
      <div className="container-page relative">
        <FadeUp className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-3">
            <Award className="h-3.5 w-3.5" /> Grassroots Impact
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            Real action on real Dhaka streets
          </h2>
          <p className="mt-3 text-base text-base-content/70 md:text-lg">
            Every number below is a real day where Dhaka residents stepped outside to help someone on their road.
          </p>
        </FadeUp>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            const isHovered = hoveredIdx === idx;
            return (
              <FadeUp key={s.label} delay={idx * 100} className="h-full">
                <div
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`beatsync-card h-full relative overflow-hidden rounded-3xl border p-7 backdrop-blur-xl transition-all duration-300 ${
                    isHovered
                      ? "border-primary/60 bg-base-100 shadow-2xl shadow-primary/10 -translate-y-2 ring-1 ring-primary/40"
                      : "border-base-300/80 bg-base-100/70"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`grid h-12 w-12 place-items-center rounded-2xl transition-all duration-300 ${
                        isHovered ? "bg-primary text-primary-content shadow-lg shadow-primary/30 scale-110" : "bg-base-200 text-primary shadow-sm"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="text-xs font-mono font-bold text-base-content/40">#0{idx + 1}</span>
                  </div>

                  <div className="mt-6">
                    <div className="font-heading text-4xl font-black tracking-tight text-base-content">
                      {s.number}
                    </div>
                    <div className="mt-1.5 font-heading text-base font-bold text-primary">
                      {s.label}
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-base-content/70 md:text-sm">
                      {s.detail}
                    </p>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>

        {/* Community pledge banner */}
        <FadeUp delay={200}>
          <div className="beatsync-card mt-12 flex flex-wrap items-center justify-between gap-5 rounded-3xl border border-primary/30 bg-base-100/80 p-6 backdrop-blur-xl shadow-xl sm:p-8">
            <div className="flex items-center gap-3.5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary text-primary-content shadow-md shadow-primary/25">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <div>
                <p className="text-base font-bold text-base-content">
                  100% Non-Commercial & Community Moderated
                </p>
                <p className="text-xs text-base-content/70 md:text-sm">
                  Mohollah takes zero fees and zero sponsorships. Every event is independently run by local volunteers.
                </p>
              </div>
            </div>
            <a href="/create-event" className="btn btn-primary btn-sm rounded-full px-6 py-2.5 font-bold shadow-md shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
              Host a Drive in Your Area
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

