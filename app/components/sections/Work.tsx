"use client";

import { PROJECTS } from "@/app/data/content";
import Process from "@/app/components/sections/Process";
import Services from "@/app/components/sections/Services";
import Values from "@/app/components/sections/Values";
import { Safari } from "@/app/components/Safari";
import {
  siFirebase,
  siFlutter,
  siGoogletranslate,
  siHetzner,
  siNextdotjs,
  siRazorpay,
  siRailway,
  siSanity,
  siShadcnui,
  siShopify,
  siTailwindcss,
  siVercel,
} from "simple-icons";

const STACK_ICONS: Record<string, { title: string; path: string }> = {
  "Firebase": siFirebase,
  "Flutter": siFlutter,
  "Google Translate": siGoogletranslate,
  "Headless Shopify": siShopify,
  "Hetzner": siHetzner,
  "Next.js": siNextdotjs,
  "Railway": siRailway,
  "Razorpay": siRazorpay,
  "Sanity": siSanity,
  "SanityCMS": siSanity,
  "Shadcn": siShadcnui,
  "Shopify": siShopify,
  "Tailwind": siTailwindcss,
  "Vercel": siVercel,
};

export default function Work() {
  return (
    <section id="section-work" className="flex w-full" style={{ padding: 0 }}>
      <div
        className="w-full md:section-pad "
      >
        <div
          className="app-grid gap-8"
        >
          <figure data-reveal className="relative col-start-2 col-end-13 h-[62vh] w-full overflow-hidden rounded-xl bg-fg-5 p-3 max-lg:col-start-1">
            <div
              className="collage-window-image h-full w-full rounded-2xl"
              style={{
                backgroundImage: 'url("/images/collage.png")',
                backgroundSize: "cover",
                backgroundPosition: "center top",
                backgroundRepeat: "no-repeat",
              }}
            />

            <div className="image-overlay-01 absolute inset-0" />
            <div className="image-overlay-02 absolute inset-0" />
          </figure>
        </div>

        <Values />
        <Services />
        <Process />

        <div
          className="grid gap-8 pt-[var(--spacing-section)]"
          style={{
            paddingLeft: `var(--spacing-app-margin)`,
            paddingRight: `var(--spacing-app-margin)`,
            gridTemplateColumns: "repeat(12, 1fr)",
          }}
        >
          <div className="col-start-2 col-end-13 max-lg:col-start-1">
            <div className="grid grid-cols-11 gap-8 pb-8 max-lg:grid-cols-1">
              <div data-reveal className="col-span-5 max-w-none max-lg:col-span-1">
                <p className="mb-3 text-sm text-fg-50">Selected projects</p>
                <h2
                  className="section-heading"
                >
                  Built for real launches, not just screenshots.
                </h2>
              </div>
              <div data-reveal className="col-start-7 col-end-11 max-lg:col-span-1 max-lg:col-start-auto max-lg:col-end-auto">
                <p className="max-w-[620px] text-[var(--font-size-medium)] leading-[1.25] text-fg-50">
                  A few websites and products where I handled the interface,
                  build, polish, integrations, and deployment details that make
                  the final experience feel complete.
                </p>
              </div>
            </div>
            {PROJECTS.map((project, index) => (
              <article
                key={project.name}
                className="grid grid-cols-11 gap-8 py-16 max-lg:grid-cols-1 max-lg:gap-8"
              >
                <a
                  data-reveal
                  href={project.link || undefined}
                  target={project.link ? "_blank" : undefined}
                  rel={project.link ? "noreferrer" : undefined}
                  aria-label={project.link ? `Open ${project.name}` : undefined}
                  className="group relative col-span-5 block overflow-hidden rounded-2xl bg-fg-5 max-lg:col-span-1"
                >
                  <span className="absolute left-4 top-4 z-[1] rounded-full bg-bg/85 px-3 py-1 text-xs tabular-nums text-fg-50 backdrop-blur">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Safari
                    siteSrc={project.link}
                    imageSrc={`/website/${project.image}`}
                    url={project.link ?? project.name}
                  />
                </a>

                <div className="col-start-7 col-end-10 flex flex-col justify-center max-lg:col-span-1 max-lg:col-start-auto max-lg:col-end-auto">
                  <p data-reveal className="mb-4 text-sm text-fg-50 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2
                    data-reveal
                    className="section-heading"
                  >
                    {project.name}
                  </h2>
                  <div data-reveal className="mt-7 flex flex-wrap gap-3">
                    {project.tech.split(", ").map((tech) => {
                      const icon = STACK_ICONS[tech];

                      return (
                        <span
                          key={tech}
                           className="flex h-10 min-w-10 items-center justify-center rounded-full bg-fg-5 px-3 text-fg-50"
                          title={tech}
                          aria-label={tech}
                        >
                          {icon ? (
                            <svg
                              viewBox="0 0 24 24"
                              className="h-4 w-4 fill-current"
                              aria-hidden="true"
                            >
                              <path d={icon.path} />
                            </svg>
                          ) : (
                            <span className="text-xs">{tech}</span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                  <p data-reveal className="mt-8 max-w-[620px] text-[var(--font-size-medium)] leading-[1.25] text-fg-50">
                    {project.description}
                  </p>
                </div>

                <div className="col-start-10 col-end-11 flex items-end justify-center max-lg:col-span-1 max-lg:col-start-auto max-lg:col-end-auto max-lg:justify-start">
                  {project.link ? (
                    <a
                      data-reveal
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-12 w-full items-center justify-center rounded-full bg-fg-5 text-xl transition-colors hover:bg-fg hover:text-bg max-lg:w-24"
                      aria-label={`Open ${project.name}`}
                    >
                      ↗
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
