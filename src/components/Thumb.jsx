"use client";
import { useState, useMemo } from "react";
import { EVENT_TYPES } from "@/lib/constants";

const DEFAULT_CATEGORY_IMAGES = {
  Cleanup: "/events/hatirjheel-cleanup.jpg",
  Plantation: "https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&w=900&q=80",
  Donation: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=900&q=80",
  "Food Distribution": "https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?auto=format&fit=crop&w=900&q=80",
  "Blood Drive": "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=900&q=80",
  Education: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=80",
  "Health Camp": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=900&q=80",
};

// Distinct images for specific community relief drives
const TOPIC_IMAGES = {
  // Volunteers in high-vis vests cleaning up lakeside & riverbank with grabbers and bags
  cleanup: "/events/hatirjheel-cleanup.jpg",
  hatirjheel: "/events/hatirjheel-cleanup.jpg",
  // Humanitarian volunteer distributing winter aid & warmth to a person in need on the street
  blanket: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=900&q=80",
  winter: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=900&q=80",
};

export default function Thumb({ src, type, title = "", className = "" }) {
  const meta = EVENT_TYPES[type] || EVENT_TYPES.Donation;
  const fallbackPhoto = DEFAULT_CATEGORY_IMAGES[type] || DEFAULT_CATEGORY_IMAGES.Donation;

  const resolvedPhoto = useMemo(() => {
    const isOldMismatchedPhoto = src && (
      src.includes("photo-1488521787991-ed7bbaae773c") ||
      src.includes("photo-1567095761054-7a02e69e5c43")
    );
    const lowerTitle = (title || "").toLowerCase();

    // Check for Hatirjheel / Cleanup drives
    if (lowerTitle.includes("hatirjheel") || lowerTitle.includes("cleanup")) {
      return (!src || isOldMismatchedPhoto) ? TOPIC_IMAGES.cleanup : src;
    }

    // Check for blanket drives
    if (lowerTitle.includes("blanket")) {
      return (!src || isOldMismatchedPhoto) ? TOPIC_IMAGES.blanket : src;
    }

    if (isOldMismatchedPhoto) {
      return fallbackPhoto;
    }

    return src || fallbackPhoto;
  }, [src, type, title, fallbackPhoto]);

  const [hasError, setHasError] = useState(false);
  const [fallbackFailed, setFallbackFailed] = useState(false);
  const Icon = meta.icon;

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
    } else {
      setFallbackFailed(true);
    }
  };

  if (fallbackFailed) {
    return (
      <div className={`grid place-items-center ${className}`} style={{ background: meta.tone }} role="img" aria-label={title}>
        <Icon className="h-12 w-12 text-white/80" strokeWidth={1.5} aria-hidden="true" />
      </div>
    );
  }

  const currentSrc = hasError ? fallbackPhoto : resolvedPhoto;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={currentSrc}
      alt={title}
      loading="lazy"
      onError={handleError}
      className={`object-cover ${className}`}
    />
  );
}
