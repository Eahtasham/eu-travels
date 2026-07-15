"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Scroll-reveal wrapper. The default render — before hydration, with JS
 * disabled, or if the observer never fires — is always fully visible. JS
 * only arms a hidden pre-state imperatively (via the DOM ref, never through
 * SSR-rendered class names) for content that isn't in view yet, so a reveal
 * that never triggers never ships a blank section.
 */
export default function Reveal({
  children,
  className = "",
  style,
  stagger = false,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  stagger?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (stagger) {
      Array.from(el.children).forEach((child, i) => {
        (child as HTMLElement).style.setProperty("--i", String(i));
      });
    }

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      // Already in (or entering) view on load — nothing to arm or hide.
      return;
    }

    el.classList.add(stagger ? "stagger-armed" : "reveal-armed");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-in");
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [stagger]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
