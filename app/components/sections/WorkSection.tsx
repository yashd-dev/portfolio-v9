"use client";

import { PROJECTS } from "@/app/data/content";
import ValuesSection from "@/app/components/sections/ValuesSection";
import Image from "next/image";
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

/**
 * Full-width rectangular collage window with colour-tint overlays.
 */
export default function WorkSection() {
  return (
    <section id="section-work" className="flex w-full" style={{ padding: 0 }}>
      <div
        className="w-full"
        style={{ paddingTop: "var(--spacing-section)", paddingBottom: "12px" }}
      >
        <div
          className="grid gap-5"
          style={{
            padding: `0 var(--spacing-app-margin)`,
            gridTemplateColumns: "repeat(12, 1fr)",
          }}
        >
          <figure className="relative col-start-2 col-end-13 h-[62vh] w-full overflow-hidden rounded-xl shadow-[0_14px_40px_rgb(0_0_0_/_0.12)] bg-neutral-100 p-2 border border-black/10">
            <div
              className="collage-window-image h-full w-full rounded-2xl border border-black/10"
              style={{
                backgroundImage: 'url("/images/collage.png")',
                backgroundSize: "cover",
                backgroundPosition: "center top",
                backgroundRepeat: "no-repeat",
              }}
            />
            {/* Colour-tint overlays (controlled by theme class in globals.css) */}
            <div className="image-overlay-01 absolute inset-0" />
            <div className="image-overlay-02 absolute inset-0" />
          </figure>
        </div>

        <ValuesSection />

        <div
          className="grid gap-5 pt-[var(--spacing-section)]"
          style={{
            paddingLeft: `var(--spacing-app-margin)`,
            paddingRight: `var(--spacing-app-margin)`,
            gridTemplateColumns: "repeat(12, 1fr)",
          }}
        >
          <div className="col-start-2 col-end-13 max-lg:col-start-1">
            {PROJECTS.map((project, index) => (
              <article
                key={project.name}
                className="grid grid-cols-11 gap-5 border-t border-fg-15 py-12 first:border-t-0 last:border-b max-lg:grid-cols-1 max-lg:gap-6"
              >
                <a
                  href={project.link || undefined}
                  target={project.link ? "_blank" : undefined}
                  rel={project.link ? "noreferrer" : undefined}
                  aria-label={project.link ? `Open ${project.name}` : undefined}
                  className="group relative col-span-5 block overflow-hidden rounded-2xl border border-black/10 bg-neutral-100 shadow-[0_14px_40px_rgb(0_0_0_/_0.10)] max-lg:col-span-1"
                >
                  <span className="absolute left-4 top-4 z-[1] rounded-full bg-white/85 px-3 py-1 text-xs tabular-nums text-black/70 backdrop-blur">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Image
                    src={`/website/${project.image}`}
                    alt={`${project.name} website screenshot`}
                    width={900}
                    height={506}
                    className="aspect-video h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </a>

                <div className="col-start-7 col-end-10 flex flex-col justify-center max-lg:col-span-1 max-lg:col-start-auto max-lg:col-end-auto">
                  <p className="mb-4 text-sm text-fg-50 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="text-[clamp(34px,4vw,64px)] leading-[0.95] tracking-[-0.05em]">
                    {project.name}
                  </h2>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.split(", ").map((tech) => {
                      const icon = STACK_ICONS[tech];

                      return (
                        <span
                          key={tech}
                          className="flex h-9 min-w-9 items-center justify-center rounded-full border border-fg-15 px-2 text-fg-50"
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
                  <p className="mt-6 max-w-[620px] text-[var(--font-size-medium)] leading-[1.2] text-fg-50">
                    {project.description}
                  </p>
                </div>

                <div className="col-start-10 col-end-11 flex items-end justify-center max-lg:col-span-1 max-lg:col-start-auto max-lg:col-end-auto max-lg:justify-start">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-12 w-full items-center justify-center rounded-full border border-fg-15 text-xl transition-colors hover:bg-fg hover:text-bg max-lg:w-24"
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
