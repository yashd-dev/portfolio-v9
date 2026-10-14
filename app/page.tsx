"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/app/context/ThemeContext";

import Nav from "@/app/components/Nav";
import Overlay from "@/app/components/Overlay";
import RevealOnScroll from "@/app/components/RevealOnScroll";
import Cover from "@/app/components/sections/Cover";
import Intro from "@/app/components/sections/Intro";
import Work from "@/app/components/sections/Work";
import FAQ from "@/app/components/sections/FAQ";
import About from "@/app/components/sections/About";
import Contact from "@/app/components/sections/Contact";
import { NAV_SECTIONS } from "@/app/data/content";
import { useActiveSection } from "@/app/hooks/useActiveSection";

const ALL_SECTION_IDS = NAV_SECTIONS.map((s) => s.id);

export default function Home() {
  const { theme } = useTheme();
  const activeSectionId = useActiveSection(ALL_SECTION_IDS);
  const [coverVisible, setCoverVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        typeof e.key === "string" &&
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
      className={`theme-${theme} reveal-system transition-colors duration-500`}
      style={{
        color: "var(--fg)",
        backgroundColor: "var(--bg)",
        minHeight: "100vh",
        height: isLoading ? "100dvh" : undefined,
        overflow: isLoading ? "hidden" : undefined,
      }}
    >

      {isLoading && <Cover />}

      <RevealOnScroll enabled={!isLoading} />

      <div
        style={{
          opacity: coverVisible ? 0 : 1,
          transition: "opacity 1s cubic-bezier(0.33, 0, 0.2, 1) 0.75s",
        }}
      >
        <Nav />
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
        <FAQ />
        <About />
        <Contact />
      </main>

      <Overlay />
      {!isLoading && <div className="scroll-blur-veil" aria-hidden="true" />}
    </div>
  );
}
