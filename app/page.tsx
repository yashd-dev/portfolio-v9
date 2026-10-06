"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "@/app/context/ThemeContext";

import Header from "@/app/components/Header";
import Nav from "@/app/components/Nav";
import Controls from "@/app/components/Controls";
import Overlay from "@/app/components/Overlay";
import Cover from "@/app/components/sections/Cover";
import Intro from "@/app/components/sections/Intro";
import Work from "@/app/components/sections/Work";
import About from "@/app/components/sections/About";
import Contact from "@/app/components/sections/Contact";
import { NAV_SECTIONS } from "@/app/data/content";
import { useActiveSection } from "@/app/hooks/useActiveSection";

const ALL_SECTION_IDS = NAV_SECTIONS.map((s) => s.id);

export default function Home() {
  const { theme } = useTheme();
  const activeSectionId = useActiveSection(ALL_SECTION_IDS);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileNavTransitioning, setMobileNavTransitioning] = useState(false);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [coverVisible, setCoverVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    if (typeof history !== "undefined" && history.scrollRestoration) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const t1 = setTimeout(() => setCoverVisible(false), 1750);
    const t2 = setTimeout(() => setIsLoading(false), 3250);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }, [isLoading]);

  useEffect(() => {
    if (!mobileNavTransitioning) return;

    const scrollY = window.scrollY;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      window.scrollTo(0, scrollY);
    };
  }, [mobileNavTransitioning]);

  const toggleMobileNav = useCallback(() => {
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);

    if (mobileNavOpen) {

      setMobileNavOpen(false);
      transitionTimerRef.current = setTimeout(() => {
        setMobileNavTransitioning(false);
      }, 500);
    } else {

      setMobileNavTransitioning(true);
      requestAnimationFrame(() => {
        setMobileNavOpen(true);
      });
    }
  }, [mobileNavOpen]);

  const closeMobileNav = useCallback(() => {
    if (!mobileNavOpen) return;
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);

    setMobileNavOpen(false);
    transitionTimerRef.current = setTimeout(() => {
      setMobileNavTransitioning(false);
    }, 500);
  }, [mobileNavOpen]);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === "n" &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        const currentIndex = (ALL_SECTION_IDS as readonly string[]).indexOf(
          activeSectionId,
        );
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
        height: isLoading ? "100dvh" : undefined,
        overflow: isLoading ? "hidden" : undefined,
      }}
    >

      {isLoading && <Cover />}

      <div
        style={{
          opacity: coverVisible ? 0 : 1,
          transition: "opacity 1s cubic-bezier(0.33, 0, 0.2, 1) 0.75s",
        }}
      >
        <Header
          onToggleMobileNav={toggleMobileNav}
          isMobileNavOpen={mobileNavOpen}
        />
        <Nav
          isMobileNavOpen={mobileNavOpen}
          isMobileNavTransitioning={mobileNavTransitioning}
          onItemClick={closeMobileNav}
          onClose={closeMobileNav}
        />
        <Controls />
      </div>

      <main
        className={isLoading ? "relative" : ""}
        style={{
          opacity: coverVisible ? 0 : 1,
          transition: isLoading
            ? "opacity 0.8s cubic-bezier(0.33, 0, 0.2, 1) 0.45s"
            : "none",
          height: isLoading && coverVisible ? 0 : undefined,
          overflow: isLoading ? "hidden" : undefined,
          pointerEvents: isLoading ? "none" : undefined,
        }}
      >
        <Intro />
        <Work />
        <About />
        <Contact />
      </main>

      <Overlay />
    </div>
  );
}
