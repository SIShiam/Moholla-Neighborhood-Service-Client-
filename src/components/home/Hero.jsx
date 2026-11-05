"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, MapPin, Sparkles, ArrowRight } from "lucide-react";
import NextUp from "./NextUp";

const popularAreas = ["Mirpur", "Mohammadpur", "Uttara", "Dhanmondi", "Hatirjheel"];

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/events?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push("/events");
    }
  };

  return (
    <section className="relative overflow-hidden bg-base-200">
      {/* Studio ambient radial glow inspired by BeatSync */}
      <div className="pointer-events-none absolute inset-x-0 -top-32 h-[550px] ambient-glow-top" aria-hidden="true" />
      
      {/* Subtle background watermark */}
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-10 right-0 select-none font-body text-[16rem] font-bold leading-none text-primary/[0.03] md:text-[24rem]">
        মহল্লা
      </span>

      <div className="container-page relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          {/* Live indicator badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-6 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span>Dhaka Noticeboard</span>
            <span className="text-base-content/40">•</span>
            <span className="text-base-content/75 lowercase font-semibold">10 hubs active</span>
          </div>

          <h1 className="animate-fade-up animation-delay-100 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl text-base-content">
            Someone on your street{" "}
            <span className="relative inline-block bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
              needs a hand
            </span>{" "}
            this weekend.
          </h1>
          <p className="animate-fade-up animation-delay-200 mt-6 max-w-lg text-base leading-relaxed text-base-content/75 md:text-lg">
            Mohollah is where Dhaka neighbours post local service drives — from warm clothes in Mirpur to lake cleanups in Hatirjheel. Find one nearby, RSVP in seconds, and show up.
          </p>

          {/* Interactive quick search bar */}
          <form onSubmit={handleSearch} className="animate-fade-up animation-delay-300 mt-8 flex max-w-lg items-center rounded-full border border-base-300/80 bg-base-100/80 p-1.5 shadow-xl backdrop-blur-xl transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25">
            <div className="flex items-center pl-3 text-base-content/50">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by area or drive (e.g. Mirpur, Cleanup)..."
              className="w-full bg-transparent px-3 py-2 text-sm text-base-content outline-none placeholder:text-base-content/40"
            />
            <button type="submit" className="btn btn-primary btn-sm rounded-full px-5 gap-1.5 shrink-0 shadow-md hover:scale-105 active:scale-95 transition-all">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Find Drives</span>
            </button>
          </form>

          {/* Interactive quick jump tags */}
          <div className="animate-fade-up animation-delay-400 mt-4 flex flex-wrap items-center gap-2 text-xs text-base-content/70">
            <span className="font-semibold text-base-content/50">Quick jump:</span>
            {popularAreas.map((area) => (
              <Link
                key={area}
                href={`/events?search=${encodeURIComponent(area)}`}
                className="rounded-full border border-base-300/70 bg-base-100/60 px-3 py-1 font-semibold transition-all hover:border-primary hover:text-primary hover:bg-primary/10 hover:scale-105 active:scale-95"
              >
                {area}
              </Link>
            ))}
          </div>

          <div className="animate-fade-up animation-delay-500 mt-8 flex flex-wrap items-center gap-4">
            <Link href="/events" className="btn btn-primary px-8 py-3 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-300 gap-2 font-bold">
              Browse all events <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/create-event" className="btn btn-outline border-base-300/80 bg-base-100/50 backdrop-blur px-8 py-3 rounded-full font-semibold hover:border-primary/50 hover:bg-base-200 hover:scale-105 active:scale-95 transition-all duration-300">
              Host a drive
            </Link>
          </div>
        </div>

        <div className="animate-fade-up animation-delay-300">
          <NextUp />
        </div>
      </div>
      <div className="stripe" />
    </section>
  );
}
