"use client";

import { useTheme } from "@/app/context/ThemeContext";
import { useState } from "react";

const TOTAL_THEMES = 17; // 0–16
const SLIDER_HEIGHT = 368;
const DOT_COUNT = 17;

/**
 * Fixed bottom-left aside with theme slider (sun icon)
 * and grid overlay toggle.
 */
export default function AppAside() {
  const { theme, setTheme, gridVisible, toggleGrid } = useTheme();
  const [sliderVisible, setSliderVisible] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  // Bottom position for the sun icon that tracks the slider
  const iconBottom = sliderVisible ? (theme / 16) * 320 : 0;

  return (
    <>
      <aside
        className="fixed z-[100]"
        style={{
          left: "calc(var(--spacing-app-margin) - 12px)",
          bottom: "calc(var(--spacing-app-margin) - 12px)",
        }}
      >
        <div className="flex flex-col gap-2">
          {/* Theme slider button */}
          <div
            className="relative w-12 rounded-3xl bg-fg-5 backdrop-blur-sm cursor-pointer hover:bg-fg-15 active:bg-fg-20"
            style={{
              height: sliderVisible ? `${SLIDER_HEIGHT}px` : "48px",
              transition: `height 0.3s ease ${sliderVisible ? "0s" : "0.62s"}`,
            }}
            onMouseEnter={() => setSliderVisible(true)}
            onMouseLeave={() => setSliderVisible(false)}
          >
            {/* Sun icon – moves up as theme changes */}
            <div
              className="absolute flex items-center justify-center w-12 h-12"
              style={{
                bottom: `${iconBottom}px`,
                transition: `bottom ${sliderVisible ? "0.3s" : "0.5s"} ease-in-out`,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                className="fill-fg"
              >
                <path d="M17 2h-2v6h2V2zm-1 8c-3.31372 0-6 2.68628-6 6s2.68628 6 6 6 6-2.68628 6-6-2.68628-6-6-6zm0 10c-2.20911 0-4-1.79089-4-4s1.79089-4 4-4 4 1.79089 4 4-1.79089 4-4 4zm-1 10h2v-6h-2v6zM11.05029 9.63605 6.80762 5.39337 5.39337 6.80762l4.24268 4.24268 1.41424-1.41425zm9.89954 12.72796 4.24255 4.24261 1.41425-1.41425-4.24261-4.24268-1.41419 1.41432zM8 15H2v2h6v-2zm16 0v2h6v-2h-6zM5.39337 25.19238l1.41425 1.41425 4.24268-4.24261-1.41425-1.41431-4.24268 4.24267zM26.60663 6.80762l-1.41425-1.41425-4.24268 4.24268 1.41431 1.41412 4.24262-4.24255z" />
              </svg>
            </div>

            {/* Rotated slider track with dots */}
            <div
              className="absolute w-12 h-12 rounded-3xl origin-top-left"
              style={{
                transform: "rotate(-90deg)",
                bottom: "-48px",
                width: sliderVisible ? `${SLIDER_HEIGHT}px` : "48px",
                transition: `width 0.3s ease ${sliderVisible ? "0s" : "0.62s"}`,
                pointerEvents: sliderVisible ? "auto" : "none",
              }}
            >
              {/* Dots */}
              <div className="absolute w-full px-[22px] flex justify-between top-[22px]">
                {Array.from({ length: DOT_COUNT }).map((_, i) => {
                  /* Every 4th dot (indices 0,4,8,12,16) is fully opaque */
                  const isBright = i % 4 === 0;
                  const delayIn = `${(DOT_COUNT - 1 - i) * 0.02}s`;
                  const delayOut = `${i * 0.02}s`;
                  return (
                    <div
                      key={i}
                      className="w-1 h-1 rounded-full"
                      style={{
                        backgroundColor: isBright
                          ? "var(--fg)"
                          : "var(--fg-25)",
                        transform: sliderVisible ? "none" : "translateX(-16px)",
                        opacity: sliderVisible ? 1 : 0,
                        transition:
                          "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
                        transitionDelay: sliderVisible ? delayIn : delayOut,
                      }}
                    />
                  );
                })}
              </div>

              {/* Range input */}
              <input
                type="range"
                min={0}
                max={16}
                step={1}
                value={theme}
                onChange={(e) => setTheme(Number(e.target.value))}
                className="absolute w-full h-12 cursor-pointer opacity-0"
                aria-label="Theme selector"
              />
            </div>
          </div>

          {/* Keyboard shortcuts button */}
          <button
            onClick={() => setShortcutsOpen(true)}
            className="flex items-center justify-center w-12 h-12 rounded-3xl bg-fg-5 backdrop-blur-sm cursor-pointer hover:bg-fg-15 active:bg-fg-20"
            aria-label="Keyboard shortcuts"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
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

          {/* Grid overlay toggle */}
          <button
            onClick={toggleGrid}
            className="flex items-center justify-center w-12 h-12 rounded-3xl bg-fg-5 backdrop-blur-sm cursor-pointer hover:bg-fg-15 active:bg-fg-20"
            aria-label="Toggle grid overlay"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              className="fill-fg"
            >
              <path d="M5 28h2V4H5v24zm5 0h2V4h-2v24zm5 0h2V4h-2v24zm5 0h2V4h-2v24zm5-24v24h2V4h-2z" />
            </svg>
          </button>
        </div>
      </aside>

      {/* Keyboard Shortcuts Dialog */}
      {shortcutsOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-fg-20 backdrop-blur-sm transition-opacity"
          onClick={() => setShortcutsOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-[24px] bg-bg border border-fg-10 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium tracking-tight text-fg">Keyboard Shortcuts</h2>
              <button
                onClick={() => setShortcutsOpen(false)}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-fg-5 hover:bg-fg-10 transition-colors cursor-pointer"
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

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-fg-70">Toggle Master Grid Overlay</span>
                <kbd className="px-3 py-1.5 rounded-lg bg-fg-5 text-fg font-mono text-sm leading-none border border-fg-10 shadow-sm">G</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-fg-70">Toggle Vertical Grid</span>
                <kbd className="px-3 py-1.5 rounded-lg bg-fg-5 text-fg font-mono text-sm leading-none border border-fg-10 shadow-sm">V</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-fg-70">Toggle Horizontal Grid</span>
                <kbd className="px-3 py-1.5 rounded-lg bg-fg-5 text-fg font-mono text-sm leading-none border border-fg-10 shadow-sm">H</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-fg-70">Toggle Black / White</span>
                <div className="flex items-center gap-2">
                  <kbd className="px-3 py-1.5 rounded-lg bg-fg-5 text-fg font-mono text-sm leading-none border border-fg-10 shadow-sm">B</kbd>
                  <span className="text-fg-40 text-sm">or</span>
                  <kbd className="px-3 py-1.5 rounded-lg bg-fg-5 text-fg font-mono text-sm leading-none border border-fg-10 shadow-sm">W</kbd>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-fg-70">Next Section Navigation</span>
                <kbd className="px-3 py-1.5 rounded-lg bg-fg-5 text-fg font-mono text-sm leading-none border border-fg-10 shadow-sm">N</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-fg-70">Cycle Theme Spectrum</span>
                <kbd className="px-3 py-1.5 rounded-lg bg-fg-5 text-fg font-mono text-sm leading-none border border-fg-10 shadow-sm">S</kbd>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
