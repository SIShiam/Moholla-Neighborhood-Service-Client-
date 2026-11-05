"use client";
import { useEffect, useRef, useState } from "react";

export default function FadeUp({
  children,
  delay = 0,
  duration = 700,
  distance = 28,
  className = "",
  as: Component = "div",
  ...props
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // If user prefers reduced motion, show immediately without animation
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      className={`transition-all will-change-[transform,opacity] ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${distance}px)`,
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

