"use client";

import { useEffect, useState } from "react";

export default function CoverSection() {
  const [coverVisible, setCoverVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setCoverVisible(false), 1750);
    const t2 = setTimeout(() => setIsLoading(false), 3250);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <section
      className="fixed inset-0 w-full min-h-screen grid pointer-events-none z-50"
      style={{
        padding: `0 var(--spacing-app-margin)`,
        gridTemplateColumns: "repeat(12, 1fr)",
        gap: "20px",
        transform: coverVisible ? "translateY(0)" : "translateY(-100vh)",
        opacity: coverVisible ? 1 : 0,
        transition:
          "transform 1.5s cubic-bezier(0.33, 0, 0.2, 1), opacity 0.5s cubic-bezier(0.33, 0, 0.2, 1) 0.25s",
      }}
    >
      <div className="col-span-full flex items-center">
        <h1
          className="pb-10 animate-[welcome_1.5s_ease-in-out]"
          style={{
            fontSize: "var(--font-size-huge)",
            lineHeight: 0.975,
            letterSpacing: "-0.02em",
            marginLeft: "-0.07em",
          }}
        >
          Yash Deshpande
          <br />
          —Creative Developer
        </h1>
      </div>
    </section>
  );
}
