"use client";

/**
 * About section — biography, accolades, press, and colophon.
 */
export default function AboutSection() {
  const currentYear = new Date().getFullYear();

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
        style={{ paddingTop: "220px", paddingBottom: "20px" }}
      >
        <div className="grid grid-cols-2 gap-5">
          {/* Biography */}
          <div className="col-start-2 col-end-[-1] max-sm:col-span-full">
            <p className="text-base leading-5">
              I&apos;m a passionate developer who believes in creating digital experiences that matter. Currently pursuing my Bachelor&apos;s in Computer Engineering while building innovative solutions for real-world problems.
              <br /><br />
              My journey in tech started with curiosity and has evolved into a deep love for crafting clean, efficient code. I specialize in full-stack development with a keen eye for design and user experience.
              <br /><br />
              When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open-source projects, or mentoring fellow developers through community initiatives.
            </p>
          </div>

          {/* Education */}
          <div className="col-start-2 col-end-[-1] max-sm:col-span-full">
            <h2
              className="pt-10 pb-[0.14em]"
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

/* -------------------------------------------------------------------------- */
/*  Reusable sub-component for award groups                                    */
/* -------------------------------------------------------------------------- */

interface AwardEntry {
  desc: string;
  project: string;
  url: string;
}

function Award({ title, items }: { title: string; items: AwardEntry[] }) {
  return (
    <div className="col-span-full max-sm:col-span-full">
      <h2
        className="pt-10 pb-[0.14em]"
        style={{
          fontSize: "var(--font-size-large)",
          lineHeight: 1.16,
          letterSpacing: "-0.01em",
          marginLeft: "-0.07em",
        }}
      >
        {title}
      </h2>
      {items.map((item) => (
        <p key={item.url} className="pt-5 text-[13px] leading-5">
          <span className="block">{item.desc}</span>
          <span className="block">{item.project}</span>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-fg-25 hover:border-fg"
          >
            View Award
          </a>
        </p>
      ))}
    </div>
  );
}
