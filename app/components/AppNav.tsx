"use client";

import { NAV_SECTIONS } from "@/app/data/content";
import { useTheme } from "@/app/context/ThemeContext";
import { useActiveSection } from "@/app/hooks/useActiveSection";
import { useState } from "react";

const SLIDER_WIDTH = 260;
const DOT_COUNT = 17;

interface AppNavProps {
  isMobileNavOpen: boolean;
  isMobileNavTransitioning: boolean;
  onItemClick: () => void;
  onClose: () => void;
}

const sectionIds = NAV_SECTIONS.map((s) => s.id);

/**
 * Top active-section pill (desktop) / fullscreen overlay nav (mobile).
 * Highlights the active section via scroll-spy.
 */
export default function AppNav({
  isMobileNavOpen,
  isMobileNavTransitioning,
  onItemClick,
  onClose,
}: AppNavProps) {
  const { theme, setTheme, toggleGrid } = useTheme();
  const activeId = useActiveSection(sectionIds);
  const [sliderVisible, setSliderVisible] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

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

  const activeSection = NAV_SECTIONS.find((section) => section.id === activeId);
  const activeIndex = Math.max(
    0,
    NAV_SECTIONS.findIndex((section) => section.id === activeId),
  );
  const circumference = 2 * Math.PI * 8;
  const progress = ((activeIndex + 1) / NAV_SECTIONS.length) * circumference;
  const iconOffset = sliderVisible ? (theme / 16) * (SLIDER_WIDTH - 40) : 0;

  return (
    <>
      <div className="fixed left-1/2 top-5 z-[110] hidden -translate-x-1/2 select-none items-center gap-4 rounded-full bg-bg/75 p-2 pl-5 backdrop-blur-md lg:flex">
        <span className="min-w-24 pr-2 text-center text-sm leading-none text-fg">
          Yash
        </span>
        <span className="h-4 w-px bg-fg-10" aria-hidden="true" />
        <div
          className="relative h-10 w-10 cursor-pointer rounded-full bg-fg-5 hover:bg-fg-15 active:bg-fg-20"
          style={{
            width: sliderVisible ? `${SLIDER_WIDTH}px` : "40px",
            transition: `width 0.35s cubic-bezier(0.16,1,0.3,1) ${sliderVisible ? "0s" : "0.42s"}`,
          }}
          onMouseEnter={() => setSliderVisible(true)}
          onMouseLeave={() => setSliderVisible(false)}
        >
          <div
            className="absolute flex h-10 w-10 items-center justify-center"
            style={{
              left: `${iconOffset}px`,
              transition: `left 0.45s cubic-bezier(0.16,1,0.3,1)`,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 32 32"
              className="fill-fg"
            >
              <path d="M17 2h-2v6h2V2zm-1 8c-3.31372 0-6 2.68628-6 6s2.68628 6 6 6 6-2.68628 6-6-2.68628-6-6-6zm0 10c-2.20911 0-4-1.79089-4-4s1.79089-4 4-4 4 1.79089 4 4-1.79089 4-4 4zm-1 10h2v-6h-2v6zM11.05029 9.63605 6.80762 5.39337 5.39337 6.80762l4.24268 4.24268 1.41424-1.41425zm9.89954 12.72796 4.24255 4.24261 1.41425-1.41425-4.24261-4.24268-1.41419 1.41432zM8 15H2v2h6v-2zm16 0v2h6v-2h-6zM5.39337 25.19238l1.41425 1.41425 4.24268-4.24261-1.41425-1.41431-4.24268 4.24267zM26.60663 6.80762l-1.41425-1.41425-4.24268 4.24268 1.41431 1.41412 4.24262-4.24255z" />
            </svg>
          </div>
          <div className="absolute top-[18px] flex w-full justify-between px-[18px]">
            {Array.from({ length: DOT_COUNT }).map((_, i) => (
              <span
                key={i}
                className="size-1 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i % 4 === 0 ? "var(--fg)" : "var(--fg-25)",
                  opacity: sliderVisible ? 1 : 0,
                  transform: sliderVisible ? "none" : "translateX(-10px)",
                  transitionDelay: sliderVisible
                    ? `${(DOT_COUNT - 1 - i) * 0.015}s`
                    : `${i * 0.015}s`,
                }}
              />
            ))}
          </div>
          <input
            type="range"
            min={0}
            max={16}
            step={1}
            value={theme}
            onChange={(e) => setTheme(Number(e.target.value))}
            className="absolute h-10 w-full cursor-pointer opacity-0"
            aria-label="Theme selector"
          />
        </div>

        <button
          onClick={() => setShortcutsOpen(true)}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-fg-5 hover:bg-fg-15 active:bg-fg-20"
          aria-label="Keyboard shortcuts"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            className="stroke-fg"
            strokeWidth="1.5"
            strokeLinejoin="round"
          >
            <path d="M15 9V15H9V9H15Z" />
            <path d="M15 15H18C19.6569 15 21 16.3431 21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18V15Z" />
            <path d="M9 15.002H6C4.34315 15.002 3 16.3451 3 18.002C3 19.6588 4.34315 21.002 6 21.002C7.65685 21.002 9 19.6588 9 18.002V15.002Z" />
            <path d="M15 9L15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6C21 7.65685 19.6569 9 18 9H15Z" />
            <path d="M9 9V6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9H9Z" />
          </svg>
        </button>

        <button
          onClick={toggleGrid}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-fg-5 hover:bg-fg-15 active:bg-fg-20"
          aria-label="Toggle grid overlay"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 32 32"
            className="fill-fg"
          >
            <path d="M5 28h2V4H5v24zm5 0h2V4h-2v24zm5 0h2V4h-2v24zm5 0h2V4h-2v24zm5-24v24h2V4h-2z" />
          </svg>
        </button>

        <span className="h-4 w-px bg-fg-10" aria-hidden="true" />

        <span
          key={activeId}
          className="min-w-28 animate-[section-label_360ms_cubic-bezier(0.16,1,0.3,1)] text-center text-sm leading-none text-fg"
        >
          {activeSection?.label ?? "Intro"}
        </span>
        <svg className="size-5 -rotate-90" viewBox="0 0 20 20" aria-hidden="true">
          <circle
            cx="10"
            cy="10"
            r="8"
            className="stroke-fg-10"
            strokeWidth="2"
            fill="none"
          />
          <circle
            cx="10"
            cy="10"
            r="8"
            className="stroke-fg transition-[stroke-dasharray] duration-700 ease-out"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${progress} ${circumference}`}
          />
        </svg>
      </div>

      {shortcutsOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-fg-20 p-4 backdrop-blur-sm transition-opacity"
          onClick={() => setShortcutsOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-xl bg-bg p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-medium tracking-tight text-fg">
                Keyboard Shortcuts
              </h2>
              <button
                onClick={() => setShortcutsOpen(false)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-fg-5 transition-colors hover:bg-fg-10"
                aria-label="Close"
              >
                <span className="absolute h-px w-4 rotate-45 bg-fg" />
                <span className="absolute h-px w-4 -rotate-45 bg-fg" />
              </button>
            </div>
            <div className="space-y-5 text-sm">
              {[
                ["Toggle Master Grid Overlay", "G"],
                ["Toggle Vertical Grid", "V"],
                ["Toggle Horizontal Grid", "H"],
                ["Toggle Black / White", "B/W"],
                ["Next Section Navigation", "N"],
                ["Cycle Theme Spectrum", "S"],
              ].map(([label, key]) => (
                <div key={label} className="flex items-center justify-between gap-4">
                  <span className="text-fg-50">{label}</span>
                  <kbd className="rounded-lg bg-fg-5 px-3 py-1.5 font-mono text-xs leading-none text-fg">
                    {key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <nav
      className={`
        fixed z-[100] select-none cursor-pointer
        inset-0 top-0 left-0 z-[120]
        lg:hidden
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
            fontSize: "var(--font-size-title)",
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
              max-lg:text-[var(--font-size-title)] max-lg:leading-[1.05]
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
          className="w-full rounded-full bg-fg px-6 py-5 text-center text-bg transition-opacity duration-200 hover:opacity-85"
          onClick={() => handleClick("contact")}
        >
          {"Let's talk"}
        </button>
      </div>
    </nav>
    </>
  );
}
