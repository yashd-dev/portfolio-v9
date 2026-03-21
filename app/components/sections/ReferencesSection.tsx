"use client";

import { REFERENCES } from "@/app/data/content";

/**
 * References / Testimonials section with opening quote marks.
 */
export default function ReferencesSection() {
  return (
    <section
      id="section-references"
      className="grid gap-5"
      style={{
        padding: `0 var(--spacing-app-margin)`,
        gridTemplateColumns: "repeat(12, 1fr)",
      }}
    >
      <div
        className="col-span-full lg:col-start-5 lg:col-end-[-1]"
        style={{ paddingTop: "220px", paddingBottom: "20px" }}
      >
        <div className="grid grid-cols-2 gap-5">
          {REFERENCES.map((ref, i) => (
            <div
              key={ref.person}
              className={`max-sm:col-span-full max-md:col-span-2 ${i >= 2 ? "pt-10" : ""}`}
            >
              <h2
                className="pr-5 max-sm:pr-0"
                style={{
                  fontSize: "var(--font-size-large)",
                  lineHeight: 1.16,
                  letterSpacing: "-0.01em",
                  marginLeft: "-0.07em",
                }}
              >
                <span style={{ marginLeft: "-0.406em" }}>&ldquo;</span>
                {ref.quote}&rdquo;
              </h2>
              <p className="pt-2.5 text-base leading-5">
                <span className="pr-[0.3em]">
                  <a
                    href={ref.personUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-fg-25 hover:border-fg"
                  >
                    {ref.person}
                  </a>
                </span>
                <span className="text-fg-50">{ref.role}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
