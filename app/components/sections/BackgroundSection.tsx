"use client";

import Image from "next/image";
import { PROJECTS } from "@/app/data/content";

/**
 * Background section professional history with the intro paragraph
 * followed by a list of companies with icons.
 */
export default function BackgroundSection() {
  return (
    <section
      id="section-background"
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
          {/* Intro description */}
          <div className="col-span-full max-md:col-span-full">
            <p className="text-base leading-5">
              I build across the stack: product UI, APIs, data models,
              deployments, headless Shopify storefronts, and the small
              interaction details that make software feel finished. Here are a
              few projects I have shipped for clients, communities, startups,
              and personal experiments.
            </p>
          </div>

          {/* Company items */}
          {PROJECTS.map((item, index) => {
            const isRight = index % 2 !== 0;
            return (
              <div
                key={item.name}
                className={`col-span-full pt-12 flex flex-col items-start text-left group cursor-pointer ${isRight ? "md:items-end md:text-right" : ""}`}
              >
                {/* Big Image always visible */}
                <div
                  className={`overflow-hidden rounded-2xl bg-fg-5 w-full ${item.featured ? "md:max-w-[70%]" : "md:max-w-[40%]"} mb-5`}
                >
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full"
                  >
                    <Image
                      src={`/website/${item.image}`}
                      alt={item.name}
                      width={1900}
                      height={950}
                      className="w-full h-auto object-cover transform scale-[0.98] transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100"
                    />
                  </a>
                </div>

                {/* Company name (Huge) */}
                <h1
                  className="transition-colors duration-300 group-hover:text-fg w-fit"
                  style={{
                    fontSize: "var(--font-size-huge)",
                    lineHeight: 0.975,
                    letterSpacing: "-0.02em",
                    marginLeft: "-0.07em",
                    marginRight: "0",
                    paddingTop: "0.1em",
                    paddingBottom: "0.1em",
                  }}
                >
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.name}
                  </a>
                </h1>

                {/* Tech Stack (Large) */}
                <h2
                  className="pt-2 transition-colors duration-300 pointer-events-none"
                  style={{
                    fontSize: "var(--font-size-large)",
                    lineHeight: 1.16,
                    letterSpacing: "-0.01em",
                    marginLeft: "-0.07em",
                    marginRight: "0",
                  }}
                >
                  {item.tech}
                </h2>

                {/* Description (Small) */}
                <p className="pt-4 text-base leading-snug text-fg-50 pointer-events-none w-full md:w-1/2">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
