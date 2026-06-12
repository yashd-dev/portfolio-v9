"use client";

/**
 * Values section four big words + a descriptive paragraph.
 */
export default function ValuesSection() {
  return (
    <section
      id="section-values"
      className="grid gap-5"
      style={{
        padding: `0 var(--spacing-app-margin)`,
        gridTemplateColumns: "repeat(12, 1fr)",
      }}
    >
      <div
        className="col-span-full lg:col-start-5 lg:col-end-[-1]"
        style={{ paddingTop: "var(--spacing-section)", paddingBottom: "12px" }}
      >
        <div className="grid grid-cols-2 gap-5">
          {/* Title values */}
          <div className="col-span-full pb-10">
            {["Intentional", "Impactful", "Polished", "Honest"].map((word) => (
              <h1
                key={word}
                style={{
                  fontSize: "var(--font-size-huge)",
                  lineHeight: 0.975,
                  letterSpacing: "-0.02em",
                  marginLeft: "-0.07em",
                }}
              >
                {word}
              </h1>
            ))}
          </div>

          {/* Description */}
          <div className="col-start-2 col-end-[-1] max-md:col-span-full">
            <p className="text-base leading-5">
              I care about thoughtful interfaces, clean systems, and work that
              holds up after launch. I use AI as a tool, but I still rewrite,
              refine, and own the final result.
            </p>
            <p className="text-base leading-5 pt-4">
              I work best with people who value craft: designers with strong
              details, product teams with clear goals, and engineers who care
              about maintainability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
