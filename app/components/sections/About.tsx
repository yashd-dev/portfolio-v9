"use client";

/**
 * About section biography, accolades, press, and colophon.
 */
export default function About() {
  return (
    <section
      id="section-about"
      className="app-grid gap-8"
    >
      <div
        className="col-span-full section-pad lg:col-start-5 lg:col-end-[-1]"
      >
        <div className="grid grid-cols-2 gap-8">
          {/* Biography */}
          <div className="col-start-2 col-end-[-1] max-sm:col-span-full">
            <p className="text-base leading-5">
              I&apos;m a web designer and developer pursuing Computer
              Engineering while building practical websites and products for
              real users.
              <br />
              <br />I care most about how things look, feel, and work in the
              browser. I can take that through Shopify, content, APIs, and
              deployment when the project needs it.
            </p>
          </div>

          {/* Education */}
          <div className="col-start-2 col-end-[-1] max-sm:col-span-full">
            <h2
              className="pt-12 pb-[0.14em]"
              style={{
                fontSize: "var(--font-size-large)",
                lineHeight: 1.16,
                letterSpacing: "-0.01em",
                marginLeft: "-0.07em",
              }}
            >
              Education
            </h2>
            <p className="pt-5 text-[13px] leading-5">
              <span className="block font-medium text-base">
                Bachelor of Technology in Computer Engineering
              </span>
              <span className="block text-base">
                Mukesh Patel School of Technology Management and Engineering
                Mumbai
              </span>
              <span className="block text-fg-50">2021-2027</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
