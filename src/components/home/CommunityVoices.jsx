"use client";
import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Star, MapPin } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import FadeUp from "@/components/FadeUp";

const stories = [
  {
    name: "Tanvir Ahmed",
    role: "Undergrad Student & Volunteer",
    area: "Mirpur 10, Dhaka",
    drive: "Winter Clothes Distribution",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    quote:
      "We used to argue for hours on WhatsApp trying to figure out who was bringing blankets and who was coming to sort. On Mohollah, 24 neighbours joined in two days, showed up at the circle on time, and we wrapped up by 9 PM. No chaos.",
    highlight: "24 neighbours joined in 2 days",
  },
  {
    name: "Farhana Chowdhury",
    role: "School Teacher",
    area: "Uttara Sector 10, Dhaka",
    drive: "Tree Plantation Morning",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    quote:
      "We planted 50 neem and krishnochura saplings along the lake. Each volunteer tagged their sapling and took responsibility for watering it. Three months later, all 50 saplings are still thriving thanks to neighbours checking in.",
    highlight: "All 50 saplings thriving",
  },
  {
    name: "Dr. Rafiqul Islam",
    role: "General Physician",
    area: "Tejgaon, Dhaka",
    drive: "Free Eye & Health Camp",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    quote:
      "When running medical camps, the biggest hurdle is non-medical crowd control. Three university students who saw our Mohollah post managed our entire queue and forms. That allowed our medical team to see 200 patients safely.",
    highlight: "200 patients treated safely",
  },
];

export default function CommunityVoices() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? stories.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === stories.length - 1 ? 0 : c + 1));

  const story = stories[current];

  return (
    <section className="section relative overflow-hidden bg-base-200">
      <div className="container-page relative">
        <FadeUp className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading title="Stories from our neighbours">
            Hear from volunteers and organisers who make Dhaka a kinder place every weekend.
          </SectionHeading>

          {/* Interactive controls */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={prev}
              className="btn btn-circle btn-sm btn-outline border-base-300/80 bg-base-100/80 backdrop-blur hover:border-primary hover:bg-primary hover:text-primary-content hover:scale-110 active:scale-95 transition-all"
              aria-label="Previous story"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-1.5 px-2">
              {stories.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    current === idx ? "w-8 bg-primary shadow-sm shadow-primary/50" : "w-2 bg-base-300 hover:bg-base-content/40"
                  }`}
                  aria-label={`Go to story ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="btn btn-circle btn-sm btn-outline border-base-300/80 bg-base-100/80 backdrop-blur hover:border-primary hover:bg-primary hover:text-primary-content hover:scale-110 active:scale-95 transition-all"
              aria-label="Next story"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </FadeUp>

        {/* Story Card */}
        <FadeUp delay={100} className="beatsync-card mt-10 overflow-hidden rounded-3xl border border-base-300/80 bg-base-100/85 p-8 shadow-2xl backdrop-blur-xl md:p-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary" />
                ))}
                <span className="ml-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-0.5 text-xs font-bold text-primary">
                  {story.highlight}
                </span>
              </div>

              <blockquote className="mt-5 text-xl font-medium leading-relaxed text-base-content md:text-2xl">
                &ldquo;{story.quote}&rdquo;
              </blockquote>

              <div className="mt-6 flex items-center gap-4 border-t border-base-200/80 pt-6">
                <img
                  src={story.avatar}
                  alt={story.name}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-primary/30"
                />
                <div>
                  <h4 className="font-heading text-lg font-bold">{story.name}</h4>
                  <p className="text-xs text-base-content/70">{story.role}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-primary">
                    <MapPin className="h-3 w-3" /> {story.area} • {story.drive}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick action side block */}
            <div className="rounded-2xl border border-base-300 bg-base-200/50 p-6 lg:col-span-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-content">
                  <Quote className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">
                    Have a drive in mind?
                  </p>
                  <p className="font-heading text-base font-bold text-base-content">
                    Rally your street
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-base-content/70">
                You don&apos;t need an NGO or corporate sponsor. Just an idea and a few good neighbours.
              </p>
              <a href="/create-event" className="btn btn-primary btn-sm mt-5 w-full">
                Host an Event Today
              </a>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

