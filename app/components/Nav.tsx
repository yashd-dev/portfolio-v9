"use client";

import { NAV_SECTIONS } from "@/app/data/content";
import { useTheme } from "@/app/context/ThemeContext";
import { useActiveSection } from "@/app/hooks/useActiveSection";
import { useEffect, useState } from "react";

const SLIDER_WIDTH = 260;
const DOT_COUNT = 17;

const sectionIds = NAV_SECTIONS.map((s) => s.id);

export default function Nav() {
  const {
    theme,
    setTheme,
    gridVisible,
    toggleGrid,
    verticalGridVisible,
    toggleVerticalGrid,
    horizontalGridVisible,
    toggleHorizontalGrid,
  } = useTheme();
  const activeId = useActiveSection(sectionIds);
  const [sliderVisible, setSliderVisible] = useState(false);
  const [mobilePaletteOpen, setMobilePaletteOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const activeSection = NAV_SECTIONS.find((section) => section.id === activeId);
  const circumference = 2 * Math.PI * 8;
  const progress = scrollProgress * circumference;
  const iconOffset = sliderVisible ? (theme / 16) * (SLIDER_WIDTH - 40) : 0;

  const toggleVertical = () => {
    if (!gridVisible) {
      if (!verticalGridVisible) toggleVerticalGrid();
      toggleGrid();
      return;
    }

    if (verticalGridVisible && !horizontalGridVisible) toggleGrid();
    else toggleVerticalGrid();
  };

  const toggleHorizontal = () => {
    if (!gridVisible) {
      if (!horizontalGridVisible) toggleHorizontalGrid();
      toggleGrid();
      return;
    }

    if (horizontalGridVisible && !verticalGridVisible) toggleGrid();
    else toggleHorizontalGrid();
  };

  return (
    <>
      <div className="site-pill-nav fixed left-1/2 top-5 z-[110] w-max select-none rounded-full bg-bg/75 p-2 pl-5 backdrop-blur-md">
        <div
          className={`flex flex-nowrap items-center gap-4 transition-[opacity,filter] duration-300 ${mobilePaletteOpen ? "max-lg:pointer-events-none max-lg:opacity-0 max-lg:blur-md" : "opacity-100 blur-0"}`}
        >
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
            onMouseEnter={() => {
              if (!window.matchMedia("(max-width: 1020px)").matches) {
                setSliderVisible(true);
              }
            }}
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
              className="absolute h-10 w-full cursor-pointer opacity-0 max-lg:pointer-events-none"
              aria-label="Theme selector"
            />
            <button
              type="button"
              className="absolute inset-0 z-10 hidden rounded-full max-lg:block"
              onClick={() => {
                setSliderVisible(false);
                setMobilePaletteOpen(true);
              }}
              aria-label="Open color selector"
              aria-expanded={mobilePaletteOpen}
            />
          </div>

          <button
            onClick={toggleVertical}
            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-fg-15 active:bg-fg-20 ${gridVisible && verticalGridVisible ? "bg-fg-15" : "bg-fg-5"}`}
            aria-label="Toggle vertical grid"
            aria-pressed={gridVisible && verticalGridVisible}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 32 32"
              className="fill-fg"
            >
              <path d="M7 4h2v24H7V4zm8 0h2v24h-2V4zm8 0h2v24h-2V4z" />
            </svg>
          </button>

          <button
            onClick={toggleHorizontal}
            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-fg-15 active:bg-fg-20 ${gridVisible && horizontalGridVisible ? "bg-fg-15" : "bg-fg-5"}`}
            aria-label="Toggle horizontal grid"
            aria-pressed={gridVisible && horizontalGridVisible}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 32 32"
              className="fill-fg"
            >
              <path d="M4 7h24v2H4V7zm0 8h24v2H4v-2zm0 8h24v2H4v-2z" />
            </svg>
          </button>

          <button
            onClick={() => setShortcutsOpen(true)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-fg-5 transition-colors hover:bg-fg-15 active:bg-fg-20 max-lg:hidden"
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
              className="stroke-fg"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${progress} ${circumference}`}
            />
          </svg>
        </div>

        <div
          className={`absolute inset-0 hidden items-center justify-center gap-2 px-5 transition-[opacity,filter] duration-300 max-lg:flex ${mobilePaletteOpen ? "pointer-events-auto opacity-100 blur-0" : "pointer-events-none opacity-0 blur-md"}`}
          aria-hidden={!mobilePaletteOpen}
        >
          {Array.from({ length: 17 }).map((_, color) => (
            <button
              key={color}
              type="button"
              className={`theme-${color} size-4 shrink-0 rounded-full border border-fg-20 transition-transform active:scale-125`}
              style={{ backgroundColor: "var(--bg)" }}
              onClick={() => {
                setTheme(color);
                setMobilePaletteOpen(false);
              }}
              disabled={!mobilePaletteOpen}
              aria-label={`Select color ${color + 1}`}
              aria-pressed={theme === color}
            />
          ))}
        </div>
      </div>

      {shortcutsOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-fg-20 p-4 backdrop-blur-sm transition-opacity max-lg:hidden"
          onClick={() => setShortcutsOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-xl bg-bg p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-medium tracking-tight text-fg">Keyboard Shortcuts</h2>
              <button
                onClick={() => setShortcutsOpen(false)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-fg-5 transition-colors hover:bg-fg-10"
                aria-label="Close"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-fg"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M13 1L1 13M1 1L13 13" />
                </svg>
              </button>
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-fg-70">Toggle Master Grid Overlay</span>
                <kbd className="rounded-lg bg-fg-5 px-3 py-1.5 font-mono text-sm leading-none text-fg">G</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-fg-70">Toggle Vertical Grid</span>
                <kbd className="rounded-lg bg-fg-5 px-3 py-1.5 font-mono text-sm leading-none text-fg">V</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-fg-70">Toggle Horizontal Grid</span>
                <kbd className="rounded-lg bg-fg-5 px-3 py-1.5 font-mono text-sm leading-none text-fg">H</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-fg-70">Toggle Black / White</span>
                <div className="flex items-center gap-2">
                  <kbd className="rounded-lg bg-fg-5 px-3 py-1.5 font-mono text-sm leading-none text-fg">B</kbd>
                  <span className="text-sm text-fg-40">or</span>
                  <kbd className="rounded-lg bg-fg-5 px-3 py-1.5 font-mono text-sm leading-none text-fg">W</kbd>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-fg-70">Next Section Navigation</span>
                <kbd className="rounded-lg bg-fg-5 px-3 py-1.5 font-mono text-sm leading-none text-fg">N</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-fg-70">Cycle Theme Spectrum</span>
                <kbd className="rounded-lg bg-fg-5 px-3 py-1.5 font-mono text-sm leading-none text-fg">S</kbd>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
