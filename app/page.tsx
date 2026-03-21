"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "@/app/context/ThemeContext";

import AppHeader from "@/app/components/AppHeader";
import AppNav from "@/app/components/AppNav";
import AppAside from "@/app/components/AppAside";
import GridControls from "@/app/components/GridControls";
import GridOverlay from "@/app/components/GridOverlay";
import CoverSection from "@/app/components/sections/CoverSection";
import IntroSection from "@/app/components/sections/IntroSection";
import WorkSection from "@/app/components/sections/WorkSection";
import ValuesSection from "@/app/components/sections/ValuesSection";
import BackgroundSection from "@/app/components/sections/BackgroundSection";
import AboutSection from "@/app/components/sections/AboutSection";
import ContactSection from "@/app/components/sections/ContactSection";
import { NAV_SECTIONS } from "@/app/data/content";
import { useActiveSection } from "@/app/hooks/useActiveSection";

const ALL_SECTION_IDS = NAV_SECTIONS.map((s) => s.id);

export default function Home() {
  const { theme } = useTheme();
  const activeSectionId = useActiveSection(ALL_SECTION_IDS);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileNavTransitioning, setMobileNavTransitioning] = useState(false);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---- Cover animation state ---- */
  const [coverVisible, setCoverVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset scroll on load
    if (typeof history !== "undefined" && history.scrollRestoration) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const t1 = setTimeout(() => setCoverVisible(false), 1750);
    const t2 = setTimeout(() => setIsLoading(false), 3250);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  /* ---- Mobile nav toggle ---- */
  const toggleMobileNav = useCallback(() => {
    if (mobileNavOpen) {
      // Close
      setMobileNavOpen(false);
      transitionTimerRef.current = setTimeout(() => {
        setMobileNavTransitioning(false);
      }, 500);
    } else {
      // Open
      setMobileNavTransitioning(true);
      requestAnimationFrame(() => {
        setMobileNavOpen(true);
      });
    }
  }, [mobileNavOpen]);

  const closeMobileNav = useCallback(() => {
    if (!mobileNavOpen) return;
    setMobileNavOpen(false);
    transitionTimerRef.current = setTimeout(() => {
      setMobileNavTransitioning(false);
    }, 500);
  }, [mobileNavOpen]);

  // Close mobile nav on resize
  useEffect(() => {
    const handleResize = () => {
      if (mobileNavOpen) closeMobileNav();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, [mobileNavOpen, closeMobileNav]);

  /* ---- Keyboard navigation (N = Next Section) ---- */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === "n" &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        const currentIndex = (ALL_SECTION_IDS as readonly string[]).indexOf(activeSectionId);
        const nextIndex = (currentIndex + 1) % ALL_SECTION_IDS.length;
        const nextId = ALL_SECTION_IDS[nextIndex];
        const nextEl = document.getElementById(`section-${nextId}`);

        if (nextEl) {
          nextEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSectionId]);

  return (
    <div
      className={`theme-${theme} transition-colors duration-500`}
      style={{
        color: "var(--fg)",
        backgroundColor: "var(--bg)",
        minHeight: "100vh",
      }}
    >
      {/* Cover intro animation */}
      {isLoading && <CoverSection />}

      {/* Header, Nav, Aside — fade in after cover */}
      <div
        style={{
          opacity: coverVisible ? 0 : 1,
          transition: "opacity 1s cubic-bezier(0.33, 0, 0.2, 1) 0.75s",
        }}
      >
        <AppHeader
          onToggleMobileNav={toggleMobileNav}
          isMobileNavOpen={mobileNavOpen}
        />
        <AppNav
          isMobileNavOpen={mobileNavOpen}
          isMobileNavTransitioning={mobileNavTransitioning}
          onItemClick={closeMobileNav}
        />
        <AppAside />
        <GridControls />
      </div>

      {/* Main content — pushes down during cover, then slides up */}
      <main
        className={isLoading ? "relative" : ""}
        style={{
          transform: coverVisible ? "translateY(115vh)" : "none",
          transition: isLoading
            ? "transform 1.5s cubic-bezier(0.33, 0, 0.2, 1)"
            : "none",
          overflow: isLoading ? "hidden" : undefined,
          pointerEvents: isLoading ? "none" : undefined,
        }}
      >
        <IntroSection />
        <WorkSection />
        <ValuesSection />
        <BackgroundSection />
        <AboutSection />
        <ContactSection />
      </main>

      {/* Grid overlay */}
      <GridOverlay />
    </div>
  );
}
