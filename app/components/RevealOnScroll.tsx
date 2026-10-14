"use client";

import { useEffect } from "react";

export default function RevealOnScroll({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled) return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      elements.forEach((element) => element.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter(
            (entry) =>
              entry.isIntersecting ||
              entry.boundingClientRect.top < window.innerHeight,
          )
          .sort((a, b) => {
            const position = a.target.compareDocumentPosition(b.target);
            return position & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
          });

        visibleEntries.forEach((entry, index) => {
          const element = entry.target as HTMLElement;
          element.style.setProperty(
            "--reveal-delay",
            `${Math.min(index * 35, 700)}ms`,
          );
          element.classList.add("is-revealed");
          observer.unobserve(element);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [enabled]);

  return null;
}
