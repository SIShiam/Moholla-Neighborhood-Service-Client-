"use client";
import { useState } from "react";
import Image from "next/image";
import { MapPin, Users, Calendar, X, ZoomIn, HeartHandshake } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import FadeUp from "@/components/FadeUp";

const photos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=900&q=80",
    category: "Donation",
    caption: "Winter Blanket & Warm Clothes Drive",
    location: "Mohammadpur Town Hall, Dhaka",
    volunteers: 42,
    date: "Dec 2025",
    story: "Neighbours collected over 350 warm blankets and sweaters to distribute to rickshaw pullers and street families across Mohammadpur.",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=80",
    category: "Plantation",
    caption: "Uttara Lake Green Belt Tree Planting",
    location: "Uttara Sector 10 Lake Road, Dhaka",
    volunteers: 35,
    date: "Jan 2026",
    story: "Fifty native neem and krishnochura saplings planted along the walkway, tagged and adopted by local residents.",
  },
  {
    id: 3,
    src: "/events/hatirjheel-cleanup.jpg",
    category: "Cleanup",
    caption: "Hatirjheel Walkway & Water-Edge Cleanup",
    location: "Hatirjheel, Dhaka",
    volunteers: 68,
    date: "Feb 2026",
    story: "Volunteers cleared over 180kg of single-use plastic waste and segregated recyclables with support from city cleaners.",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80",
    category: "Health",
    caption: "Free Community Eye & Vision Screening",
    location: "Tejgaon Industrial Area, Dhaka",
    volunteers: 24,
    date: "Jan 2026",
    story: "Conducted eye exams for over 200 factory workers and elderly residents, handing out free prescription reading glasses.",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
    category: "Education",
    caption: "Korail Weekend Reading & Learning Circle",
    location: "Korail Mohollah, Dhaka",
    volunteers: 18,
    date: "Every Saturday",
    story: "University volunteers tutor 45 neighbourhood children in foundational Bangla and English reading every weekend.",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=900&q=80",
    category: "Meals",
    caption: "Warm Friday Khichuri for Day Labourers",
    location: "Jatrabari Intersection, Dhaka",
    volunteers: 30,
    date: "Weekly Drive",
    story: "Cooked and packed 300+ fresh plates of hot nutritious meals for day labourers and transport workers.",
  },
];

const categories = ["All Drives", "Donation", "Plantation", "Cleanup", "Health", "Education", "Meals"];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("All Drives");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const filteredPhotos = activeTab === "All Drives"
    ? photos
    : photos.filter((p) => p.category === activeTab);

  return (
    <section className="section bg-base-100">
      <div className="container-page">
        <FadeUp className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading title="Moments from our streets">
            Real neighbourhood drives organised and powered by everyday Dhaka residents on Mohollah.
          </SectionHeading>
          
          {/* Interactive filter pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-300 hover:scale-105 active:scale-95 ${
                  activeTab === cat
                    ? "bg-primary text-primary-content shadow-md shadow-primary/20 scale-105"
                    : "border border-base-300/80 bg-base-100/70 text-base-content/75 hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Interactive photo grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
          {filteredPhotos.map((p, idx) => (
            <FadeUp key={p.id} delay={(idx % 3) * 100} className="h-full">
              <div
                onClick={() => setSelectedPhoto(p)}
                className="beatsync-card group relative cursor-pointer overflow-hidden rounded-3xl border border-base-300/80 bg-base-100/80 shadow-md backdrop-blur-xl h-full"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSelectedPhoto(p)}
              >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={p.src}
                  alt={p.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
                
                {/* Category badge */}
                <div className="absolute left-3 top-3">
                  <span className="badge badge-primary badge-sm font-semibold shadow">
                    {p.category}
                  </span>
                </div>

                {/* Quick zoom icon */}
                <div className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/40 text-white backdrop-blur transition-transform group-hover:scale-110">
                  <ZoomIn className="h-4 w-4" />
                </div>

                {/* Overlay details */}
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <h3 className="font-heading text-base font-bold leading-snug drop-shadow-sm">
                    {p.caption}
                  </h3>
                  <div className="mt-2 flex items-center justify-between text-xs text-white/80">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-secondary" />
                      <span className="truncate max-w-[150px]">{p.location}</span>
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Users className="h-3.5 w-3.5 text-secondary" />
                      {p.volunteers} helped
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-neutral/80 p-4 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-base-100 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="btn btn-circle btn-ghost btn-sm absolute right-3 top-3 z-10 bg-base-100/80 text-base-content backdrop-blur hover:bg-base-100"
                aria-label="Close photo view"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="aspect-[16/10] w-full overflow-hidden bg-base-300">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.caption}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="badge badge-primary font-semibold">{selectedPhoto.category}</span>
                  <span className="flex items-center gap-1 text-xs text-base-content/70">
                    <Calendar className="h-3.5 w-3.5" /> {selectedPhoto.date}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-primary">
                    <Users className="h-3.5 w-3.5" /> {selectedPhoto.volunteers} Volunteers Joined
                  </span>
                </div>

                <h3 className="mt-3 text-2xl font-bold">{selectedPhoto.caption}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-base-content/75 font-medium">
                  <MapPin className="h-4 w-4 text-primary shrink-0" /> {selectedPhoto.location}
                </p>

                <p className="mt-4 rounded-xl bg-base-200/80 p-4 text-sm leading-relaxed text-base-content/85">
                  &ldquo;{selectedPhoto.story}&rdquo;
                </p>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="btn btn-ghost btn-sm"
                  >
                    Close
                  </button>
                  <a
                    href="/create-event"
                    className="btn btn-primary btn-sm gap-2"
                  >
                    <HeartHandshake className="h-4 w-4" /> Host a drive like this
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
