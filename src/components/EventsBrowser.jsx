"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, LayoutGrid, List, SlidersHorizontal, X, ArrowUpDown, MapPin, Clock, ChevronDown, Check } from "lucide-react";
import { api } from "@/lib/api";
import { TYPE_NAMES, EVENT_TYPES } from "@/lib/constants";
import { useLoad } from "@/hooks/useLoad";
import EventCard from "./EventCard";
import { GridSkeleton } from "./Skeletons";
import { dayOf, monthOf, timeOf } from "@/lib/format";
import ZoomIn from "./ZoomIn";

const sortOptions = [
  { value: "date", label: "Date: Soonest" },
  { value: "needed", label: "Most Volunteers Needed" },
  { value: "title", label: "Title: A to Z" },
];

export default function EventsBrowser() {
  const params = useSearchParams();
  const [text, setText] = useState(params.get("search") || "");
  const [search, setSearch] = useState(text);
  const [type, setType] = useState(params.get("type") || "");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [sortBy, setSortBy] = useState("date"); // 'date' | 'needed' | 'title'

  // Debounced search
  useEffect(() => {
    const t = setTimeout(() => setSearch(text.trim()), 300);
    return () => clearTimeout(t);
  }, [text]);

  const { data, error, loading, reload } = useLoad(() => api.listEvents({ search, type }), [search, type]);

  // Sort events client-side based on sortBy
  const sortedEvents = useMemo(() => {
    if (!data) return [];
    const list = [...data];
    if (sortBy === "date") {
      return list.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
    }
    if (sortBy === "needed") {
      return list.sort((a, b) => {
        const leftA = a.volunteersNeeded - (a.participants || 0);
        const leftB = b.volunteersNeeded - (b.participants || 0);
        return leftB - leftA;
      });
    }
    if (sortBy === "title") {
      return list.sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [data, sortBy]);

  const filtered = Boolean(search || type);

  return (
    <>
      {/* Search & Filter Bar */}
      <ZoomIn delay={50} className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="input input-bordered flex flex-1 items-center gap-2 rounded-full border-base-300/80 bg-base-100/80 px-4 shadow-lg backdrop-blur-xl focus-within:border-primary">
            <Search className="h-4 w-4 text-primary" aria-hidden="true" />
            <input
              type="search"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Search by drive title or Dhaka area (e.g. Mirpur, Hatirjheel)..."
              className="grow text-sm"
              aria-label="Search events"
            />
            {text && (
              <button
                type="button"
                onClick={() => { setText(""); setSearch(""); }}
                className="btn btn-ghost btn-circle btn-xs"
                aria-label="Clear search text"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </label>

          <div className="flex items-center gap-2">
            {/* Sort Dropdown */}
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                type="button"
                className="btn btn-sm rounded-full border border-base-300/80 bg-base-100/80 px-4 gap-2 text-xs font-bold text-base-content hover:border-primary shadow-sm backdrop-blur-xl"
                aria-label="Sort options menu"
              >
                <ArrowUpDown className="h-3.5 w-3.5 text-primary" />
                <span>{sortOptions.find((o) => o.value === sortBy)?.label || "Date: Soonest"}</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content menu z-50 mt-2 w-56 rounded-2xl border border-base-300/80 bg-base-100/95 p-2 shadow-2xl backdrop-blur-xl"
              >
                <li className="menu-title text-[10px] font-bold uppercase tracking-wider text-base-content/50 px-2 py-1">
                  Sort Events By
                </li>
                {sortOptions.map((opt) => (
                  <li key={opt.value}>
                    <button
                      type="button"
                      onClick={() => {
                        setSortBy(opt.value);
                        document.activeElement?.blur();
                      }}
                      className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition-all ${
                        sortBy === opt.value
                          ? "bg-primary text-primary-content shadow-sm"
                          : "text-base-content hover:bg-base-200"
                      }`}
                    >
                      <span>{opt.label}</span>
                      {sortBy === opt.value && <Check className="h-3.5 w-3.5" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* View switcher */}
            <div className="join border border-base-300/80 rounded-full p-0.5 bg-base-100/80 shadow-sm hidden sm:inline-flex backdrop-blur-xl">
              <button
                onClick={() => setViewMode("grid")}
                className={`btn btn-xs join-item rounded-full border-0 px-3 ${viewMode === "grid" ? "btn-primary font-bold shadow-sm" : "btn-ghost"}`}
                aria-label="Grid View"
                title="Grid View"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`btn btn-xs join-item rounded-full border-0 px-3 ${viewMode === "list" ? "btn-primary font-bold shadow-sm" : "btn-ghost"}`}
                aria-label="List View"
                title="List View"
              >
                <List className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            onClick={() => setType("")}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95 ${
              type === ""
                ? "bg-primary text-primary-content shadow-md shadow-primary/20 scale-105"
                : "bg-base-100/80 border border-base-300/80 text-base-content/80 hover:border-primary hover:text-primary"
            }`}
          >
            All Drives
          </button>
          {TYPE_NAMES.map((t) => {
            const meta = EVENT_TYPES[t];
            const Icon = meta?.icon;
            const isSelected = type === t;
            return (
              <button
                key={t}
                onClick={() => setType(isSelected ? "" : t)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95 ${
                  isSelected
                    ? "bg-primary text-primary-content shadow-md shadow-primary/20 scale-105"
                    : "bg-base-100/80 border border-base-300/80 text-base-content/80 hover:border-primary hover:text-primary"
                }`}
              >
                {Icon && <Icon className="h-3.5 w-3.5" />}
                {t}
              </button>
            );
          })}
        </div>

        {/* Results Counter & Active Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-base-content/70">
          <div>
            {data && (
              <span className="font-semibold text-base-content">
                Showing {sortedEvents.length} {sortedEvents.length === 1 ? "drive" : "drives"}
                {search && <> matching &ldquo;<strong>{search}</strong>&rdquo;</>}
                {type && <> in <strong>{type}</strong></>}
              </span>
            )}
          </div>

          {filtered && (
            <button
              onClick={() => {
                setText("");
                setSearch("");
                setType("");
              }}
              className="inline-flex items-center gap-1 font-semibold text-primary hover:underline cursor-pointer"
            >
              <X className="h-3.5 w-3.5" /> Reset all filters
            </button>
          )}
        </div>
      </ZoomIn>

      {/* Main Content Area */}
      <div className="mt-8">
        {loading && !data ? (
          <GridSkeleton />
        ) : error ? (
          <div className="rounded-2xl border border-error/40 bg-base-100 p-8 text-center shadow-sm">
            <p className="font-bold text-error">We could not load the drives.</p>
            <p className="mt-1 text-sm text-base-content/70">{error}</p>
            <button onClick={reload} className="btn btn-primary btn-sm mt-4 px-6 rounded-xl">Try again</button>
          </div>
        ) : sortedEvents.length ? (
          viewMode === "grid" ? (
            <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${loading ? "opacity-60" : ""}`}>
              {sortedEvents.map((e, idx) => (
                <ZoomIn key={e._id} delay={(idx % 3) * 80} className="h-full">
                  <EventCard event={e} />
                </ZoomIn>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedEvents.map((e, idx) => {
                const left = Math.max(e.volunteersNeeded - (e.participants || 0), 0);
                return (
                  <ZoomIn key={e._id} delay={(idx % 3) * 80}>
                    <div
                      className="beatsync-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border border-base-300/80 bg-base-100/85 p-5 shadow-md backdrop-blur-xl transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-neutral-950 shadow-md">
                          <span className="font-heading text-xl font-black leading-none">{dayOf(e.eventDate)}</span>
                          <span className="text-[11px] font-black uppercase">{monthOf(e.eventDate)}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="badge badge-primary badge-xs font-bold uppercase tracking-wider text-[10px]">{e.eventType}</span>
                            <span className="text-xs text-base-content/60">{timeOf(e.eventDate)}</span>
                          </div>
                          <Link href={`/events/${e._id}`} className="mt-1 block font-heading text-lg font-bold text-base-content hover:text-primary transition-colors">
                            {e.title}
                          </Link>
                          <p className="flex items-center gap-1.5 text-xs text-base-content/70">
                            <MapPin className="h-3.5 w-3.5 text-primary" /> {e.location}
                          </p>
                        </div>
                      </div>

                      <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-base-200">
                        <div className="text-right sm:min-w-[120px]">
                          <span className="text-xs font-semibold text-base-content/80">
                            {e.participants || 0} / {e.volunteersNeeded} spots
                          </span>
                          <p className={`text-[11px] font-bold ${left <= 3 ? "text-error" : "text-primary"}`}>
                            {left === 0 ? "Full" : `${left} spots left`}
                          </p>
                        </div>
                        <Link href={`/events/${e._id}`} className="btn btn-primary btn-sm rounded-full px-6 font-bold shadow-md shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                          View
                        </Link>
                      </div>
                    </div>
                  </ZoomIn>
                );
              })}
            </div>
          )
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-base-300 p-12 text-center bg-base-100/50">
            <p className="text-xl font-bold text-base-content">
              {filtered ? "No drives match your filters" : "No upcoming drives posted yet"}
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-base-content/70">
              {filtered
                ? "Try searching for another neighbourhood like Mirpur or Dhanmondi, or clear your category filter."
                : "Be the first neighbour to post a drive for your street."}
            </p>
            {filtered ? (
              <button
                onClick={() => { setText(""); setSearch(""); setType(""); }}
                className="btn btn-primary mt-6 rounded-xl px-6"
              >
                Clear all filters
              </button>
            ) : (
              <Link href="/create-event" className="btn btn-primary mt-6 rounded-xl px-6">
                Host a Drive
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
}
