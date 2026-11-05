"use client";
import { useState } from "react";

export default function Avatar({ src, name, size = 40 }) {
  const [bad, setBad] = useState(false);
  const initial = (name || "?").trim().charAt(0).toUpperCase();
  const box = { width: size, height: size };

  if (!src || bad) {
    return (
      <span className="grid place-items-center rounded-full bg-secondary font-heading font-bold text-secondary-content" style={box}>
        {initial}
      </span>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={name || "Profile picture"} onError={() => setBad(true)} referrerPolicy="no-referrer" className="rounded-full object-cover" style={box} />;
}
