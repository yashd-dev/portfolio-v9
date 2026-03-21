"use client";

import { useEffect, useState } from "react";

/**
 * Custom hook that returns the id of the section currently in view,
 * replicating the original scroll-spy behaviour exactly.
 */
export function useActiveSection(sectionIds: readonly string[]) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0]);

  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight;
      const scrollMid = window.scrollY + vh / 2;
      const scrollBottom = window.scrollY + vh;

      let active = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(`section-${id}`);
        if (!el) continue;

        const top = el.offsetTop;
        const height = el.offsetHeight;
        const bottom = top + height;
        const mid = top + height / 2;

        if (id === "intro") {
          if (mid > window.scrollY) active = id;
        } else if (id === "contact") {
          if (mid < scrollBottom) active = id;
        } else {
          if (top <= scrollMid && bottom >= scrollMid) active = id;
        }
      }

      setActiveId(active);
    };

    handleScroll(); // Initial
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sectionIds]);

  return activeId;
}
