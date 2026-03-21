"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { INTRO_OPTIONS, NAV_SECTIONS } from "@/app/data/content";
import { useActiveSection } from "@/app/hooks/useActiveSection";
import { useTheme } from "@/app/context/ThemeContext";

const ALL_SECTION_IDS = NAV_SECTIONS.map((s) => s.id);

/**
 * Intro section with audience-selector tabs that switch the hero text.
 * Includes left/right gradient masks on the scrollable tab bar.
 */
export default function IntroSection() {
  const [activeId, setActiveId] = useState(INTRO_OPTIONS[0].id);
  const { setTheme } = useTheme();
  const activeNavSection = useActiveSection(ALL_SECTION_IDS);
  const [showLeftMask, setShowLeftMask] = useState(false);
  const [showRightMask, setShowRightMask] = useState(true);
  const optionsRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!optionsRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = optionsRef.current;
    setShowLeftMask(scrollLeft > 0);
    setShowRightMask(scrollLeft + clientWidth < scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = optionsRef.current;
    handleScroll();
    window.addEventListener("resize", handleScroll);
    el?.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", handleScroll);
      el?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <section
      id="section-intro"
      className="grid gap-5"
      style={{
        padding: `0 var(--spacing-app-margin)`,
        gridTemplateColumns: "repeat(12, 1fr)",
      }}
    >
      <div 
        className="fixed inset-0 pointer-events-none transition-opacity duration-1000 ease-in-out"
        style={{
          zIndex: 0,
          opacity: activeId === "product-designers" && (activeNavSection === "intro" || activeNavSection === "work") ? 1 : 0,
          backgroundImage: "url('/images/bg-flower.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className="col-span-full lg:col-start-5 lg:col-end-[-1] xl:col-start-5 relative"
        style={{
          paddingTop: "calc(var(--spacing-xheight) - 11px)",
          paddingBottom: "80px",
        }}
      >
        <div
          className="relative w-full transition-[mask-image] duration-300"
          style={{
            maskImage: `linear-gradient(to right, ${
              showLeftMask ? "transparent, black 40px" : "black 0%"
            }, ${
              showRightMask ? "black calc(100% - 40px), transparent 100%" : "black 100%"
            })`,
            WebkitMaskImage: `linear-gradient(to right, ${
              showLeftMask ? "transparent, black 40px" : "black 0%"
            }, ${
              showRightMask ? "black calc(100% - 40px), transparent 100%" : "black 100%"
            })`,
          }}
        >
          <div
            ref={optionsRef}
            className="flex flex-nowrap overflow-x-auto select-none cursor-pointer scrollbar-none"
            style={{
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {INTRO_OPTIONS.map((opt, i) => (
              <button
                key={opt.id}
                onClick={() => {
                  setActiveId(opt.id);
                  if (opt.id === "product-designers") {
                    setTheme(16);
                  }
                }}
                className={`
                  text-base leading-5 py-3 px-2.5 whitespace-nowrap cursor-pointer transition-colors duration-200
                  ${i === 0 ? "pl-0" : ""}
                  ${i === INTRO_OPTIONS.length - 1 ? "pr-20" : ""}
                  ${activeId === opt.id ? "text-fg" : "text-fg-33 hover:text-fg"}
                `}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          {INTRO_OPTIONS.map((opt) =>
            activeId === opt.id ? (
              opt.isHtml ? (
                <h1
                  key={opt.id}
                  dangerouslySetInnerHTML={{ __html: opt.content }}
                  style={{
                    fontSize: "var(--font-size-huge)",
                    lineHeight: 0.975,
                    letterSpacing: "-0.02em",
                    marginLeft: "-0.07em",
                    minHeight: "calc(1em * 0.975 * 7)",
                  }}
                />
              ) : (
                <h1
                  key={opt.id}
                  style={{
                    fontSize: "var(--font-size-huge)",
                    lineHeight: 0.975,
                    letterSpacing: "-0.02em",
                    marginLeft: "-0.07em",
                    minHeight: "calc(1em * 0.975 * 7)",
                  }}
                >
                  {opt.content}
                </h1>
              )
            ) : null,
          )}
        </div>
      </div>
    </section>
  );
}
