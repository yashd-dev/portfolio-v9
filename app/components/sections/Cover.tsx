"use client";

import { useEffect, useState } from "react";

export default function Cover() {
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
      className="cover-intro fixed inset-0 w-full min-h-screen grid z-50"
      style={{
        padding: `0 var(--spacing-app-margin)`,
        gridTemplateColumns: "repeat(12, 1fr)",
        gap: "20px",
        transform: coverVisible ? "translateY(0)" : "translateY(-100vh)",
        opacity: coverVisible ? 1 : 0,
        transition:
          "transform var(--cover-transform-duration, 2.1s) cubic-bezier(0.33, 0, 0.2, 1), opacity var(--cover-opacity-duration, 0.7s) cubic-bezier(0.33, 0, 0.2, 1) 0.35s",
      }}
    >
      <div className="col-span-full flex items-center">
        <h1
          className="section-heading pb-10 animate-[welcome_2.1s_ease-in-out]"
        >
          Yash Deshpande
          <br />
          —Creative Developer
        </h1>
      </div>
    </section>
  );
}
