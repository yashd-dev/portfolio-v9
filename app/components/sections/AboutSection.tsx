"use client";

/**
 * About section — biography, accolades, press, and colophon.
 */
export default function AboutSection() {
  return (
    <section
      id="section-about"
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
          {/* Biography */}
          <div className="col-start-2 col-end-[-1] max-sm:col-span-full">
            <p className="text-base leading-5">
              I&apos;m a full-stack and headless Shopify developer pursuing Computer Engineering while building practical web products for real users.
              <br /><br />
              I focus on clean code, strong UI execution, and useful systems that can keep improving after launch.
            </p>
          </div>

          {/* Education */}
          <div className="col-start-2 col-end-[-1] max-sm:col-span-full">
            <h2
              className="pt-8 pb-[0.14em]"
              style={{
                fontSize: "var(--font-size-large)",
                lineHeight: 1.16,
                letterSpacing: "-0.01em",
                marginLeft: "-0.07em",
              }}
            >
              Education
            </h2>
            <p className="pt-3 text-[13px] leading-5">
              <span className="block font-medium text-base">Bachelor of Technology in Computer Engineering</span>
              <span className="block text-base">Mukesh Patel School of Technology Management and Engineering Mumbai</span>
              <span className="block text-fg-50">2021-2027</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
