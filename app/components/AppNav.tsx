"use client";

import { NAV_SECTIONS } from "@/app/data/content";
import { useActiveSection } from "@/app/hooks/useActiveSection";

interface AppNavProps {
  isMobileNavOpen: boolean;
  isMobileNavTransitioning: boolean;
  onItemClick: () => void;
}

const sectionIds = NAV_SECTIONS.map((s) => s.id);

/**
 * Left-side vertical navigation (desktop) / fullscreen overlay nav (mobile).
 * Highlights the active section via scroll-spy.
 */
export default function AppNav({
  isMobileNavOpen,
  isMobileNavTransitioning,
  onItemClick,
}: AppNavProps) {
  const activeId = useActiveSection(sectionIds);

  const scrollTo = (id: string) => {
    const el = document.getElementById(`section-${id}`);
    if (!el) return;

    if (id === "intro") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (id === "contact") {
      const pageH = document.documentElement.scrollHeight;
      const vh = window.innerHeight;
      const sectionH = el.offsetHeight;
      const sectionTop = el.offsetTop;
      window.scrollTo({
        top: sectionH > vh ? sectionTop : pageH - vh,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
    }
  };

  const handleClick = (id: string) => {
    onItemClick();
    // Small delay on mobile so nav closes before scrolling
    if (isMobileNavOpen) {
      setTimeout(() => scrollTo(id), 300);
    } else {
      scrollTo(id);
    }
  };

  return (
    <nav
      className={`
        fixed z-[100] select-none cursor-pointer
        max-lg:inset-0 max-lg:z-[99]
        ${isMobileNavTransitioning ? "max-lg:block" : "max-lg:hidden"}
        ${isMobileNavOpen ? "max-lg:opacity-100 max-lg:pointer-events-auto" : "max-lg:opacity-0 max-lg:pointer-events-none"}
        transition-opacity duration-200
      `}
      style={{
        top: "var(--spacing-xheight)",
        left: "var(--spacing-app-margin)",
        paddingTop: "0",
        // Mobile overlay bg
        ...(isMobileNavTransitioning
          ? { backgroundColor: "var(--bg)", paddingTop: "var(--spacing-xheight)" }
          : {}),
      }}
    >
      <div>
        {NAV_SECTIONS.map((section, i) => (
          <div
            key={section.id}
            onClick={() => handleClick(section.id)}
            className={`
              text-base py-[1px] cursor-pointer transition-colors duration-200
              max-lg:text-[var(--font-size-medium)] max-lg:leading-6
              ${activeId === section.id ? "text-fg" : "text-fg-33 hover:text-fg"}
            `}
            style={{
              // Mobile staggered animation
              ...(isMobileNavTransitioning
                ? {
                    marginLeft: "-0.07em",
                    padding: `4px calc(44px + var(--spacing-app-margin)) 4px var(--spacing-app-margin)`,
                    opacity: isMobileNavOpen ? 1 : 0,
                    transform: isMobileNavOpen ? "none" : "translateY(-8px)",
                    transition:
                      "opacity 0.2s ease-out, transform 0.2s ease-out",
                    transitionDelay: isMobileNavOpen
                      ? `${0.16 + i * 0.02}s`
                      : `${0.14 - i * 0.02}s`,
                  }
                : {}),
            }}
          >
            {section.label}
          </div>
        ))}
      </div>
    </nav>
  );
}
