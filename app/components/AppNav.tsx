"use client";

import { NAV_SECTIONS } from "@/app/data/content";
import { useActiveSection } from "@/app/hooks/useActiveSection";

interface AppNavProps {
  isMobileNavOpen: boolean;
  isMobileNavTransitioning: boolean;
  onItemClick: () => void;
  onClose: () => void;
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
  onClose,
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
    // Wait for the mobile overlay to unlock page scroll before navigating.
    if (isMobileNavOpen) {
      setTimeout(() => scrollTo(id), 520);
    } else {
      scrollTo(id);
    }
  };

  return (
    <nav
      className={`
        fixed z-[100] select-none cursor-pointer
        top-[var(--spacing-xheight)] left-[var(--spacing-app-margin)]
        max-lg:inset-0 max-lg:top-0 max-lg:left-0 max-lg:z-[120]
        ${isMobileNavTransitioning ? "max-lg:block" : "max-lg:hidden"}
        ${isMobileNavOpen ? "max-lg:opacity-100 max-lg:pointer-events-auto" : "max-lg:opacity-0 max-lg:pointer-events-none"}
        transition-opacity duration-200
      `}
      style={{
        ...(isMobileNavTransitioning
          ? { backgroundColor: "var(--bg)" }
          : {}),
      }}
      aria-hidden={!isMobileNavTransitioning}
    >
      <div
        className="hidden max-lg:block absolute top-0 left-[var(--spacing-app-margin)] py-5"
        aria-hidden="true"
      >
        <span
          className="block leading-none"
          style={{
            fontSize: "var(--font-size-medium)",
            marginLeft: "-0.07em",
          }}
        >
          Y
        </span>
      </div>

      <button
        type="button"
        className="hidden max-lg:flex absolute top-2 right-[var(--spacing-app-margin)] z-[1] h-12 w-12 items-center justify-center -mr-3 rounded-full cursor-pointer"
        onClick={onClose}
        aria-label="Close navigation"
      >
        <span className="absolute h-0.5 w-6 rotate-45 bg-fg" />
        <span className="absolute h-0.5 w-6 -rotate-45 bg-fg" />
      </button>

      <div className="max-lg:pt-[var(--spacing-xheight)]">
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

      <div
        className="hidden max-lg:block absolute bottom-[var(--spacing-app-margin)] left-0 right-0 px-[var(--spacing-app-margin)]"
        style={{
          opacity: isMobileNavOpen ? 1 : 0,
          transform: isMobileNavOpen ? "none" : "translateY(8px)",
          transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
          transitionDelay: isMobileNavOpen ? "0.28s" : "0s",
        }}
      >
        <button
          type="button"
          className="w-full rounded-full bg-fg px-6 py-4 text-center text-bg transition-opacity duration-200 hover:opacity-85"
          onClick={() => handleClick("contact")}
        >
          {"Let's talk"}
        </button>
      </div>
    </nav>
  );
}
