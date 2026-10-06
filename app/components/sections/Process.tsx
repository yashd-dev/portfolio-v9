"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { traceVisual } from "./Tracer";
import { CallVisual, CodeVisual, FigmaVisual, HostingVisual } from "./Visuals";

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Call",
    eyebrow: "Discovery",
    description:
      "We talk through the offer, goals, personality, audience, and what the website must make people feel or do.",
    visual: <CallVisual />,
  },
  {
    number: "02",
    title: "Figma",
    eyebrow: "Research + design",
    description:
      "I research the brand deeply, map customer pain points, then design the direction in Figma. Two revisions are included before approval; if it still does not feel right, you get 40% of the advance back.",
    visual: <FigmaVisual />,
  },
  {
    number: "03",
    title: "Code",
    eyebrow: "Build",
    description:
      "After the design is approved, I code the site with responsive details, motion, CMS or commerce pieces, and as many refinement passes as needed.",
    visual: <CodeVisual />,
  },
  {
    number: "04",
    title: "Host",
    eyebrow: "Deploy + handoff",
    description:
      "I deploy, connect the domain, set up hosting, and make sure the final site is stable, fast, and suited to your brand identity.",
    visual: <HostingVisual />,
  },
];

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

function StepCard({
  step,
  canStart,
  onDone,
}: {
  step: (typeof PROCESS_STEPS)[number];
  canStart: boolean;
  onDone: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (inView && canStart) setActive(true);
  }, [inView, canStart]);

  useLayoutEffect(() => {
    if (!active || !visualRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onDone();
      return;
    }
    return traceVisual(visualRef.current, onDone);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <div
      ref={wrapRef}
      className="h-full"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "none" : "translateY(16px)",
        transition: "opacity 500ms ease, transform 500ms ease",
      }}
    >
      <article className="process-card h-full overflow-hidden rounded-2xl process-border-soft bg-bg text-fg">
        <div
          ref={visualRef}
          className="h-[300px] process-panel p-3 max-sm:h-[240px]"
        >
          {step.visual}
        </div>
        <div className="border-t process-border-soft bg-bg p-7">
          <div className="mb-5 flex items-center justify-between gap-4 text-xs text-fg-50">
            <span className="tabular-nums">{step.number}</span>
            <span>{step.eyebrow}</span>
          </div>
          <h3 className="text-[var(--font-size-title)] leading-none tracking-[-0.035em]">
            {step.title}
          </h3>
          <p className="mt-5 max-w-[620px] text-sm leading-5 text-fg-50">
            {step.description}
          </p>
        </div>
      </article>
    </div>
  );
}

export default function Process({ onComplete }: { onComplete?: () => void }) {
  const [done, setDone] = useState(0);

  useEffect(() => {
    if (done >= PROCESS_STEPS.length) onComplete?.();
  }, [done, onComplete]);

  return (
    <section
      id="section-process"
      className="app-grid gap-8"
    >
      <div
        className="col-start-3 col-end-13 section-pad max-lg:col-start-1"
      >
        <div className="grid grid-cols-11 gap-8 max-lg:grid-cols-1">
          <div className="col-span-5 max-w-none max-lg:col-span-1">
            <p className="mb-3 text-sm text-fg-50">How I work</p>
            <h2
              className="section-heading"
            >
              <span className="text-accent">Clear</span> steps, no
              vague middle.
            </h2>
          </div>

          <div className="col-start-7 col-end-12 max-lg:col-span-1 max-lg:col-start-auto max-lg:col-end-auto">
            <p className="max-w-[700px] text-[var(--font-size-medium)] leading-[1.15] text-fg-50">
              This is not a template handoff. We shape it like your child:
              personal to you, useful to your customers, and aligned with the
              brand you are building.
            </p>
          </div>

          <div className="col-span-full grid grid-cols-2 gap-8 pt-12 max-md:grid-cols-1">
            {PROCESS_STEPS.map((step, index) => (
              <StepCard
                key={step.title}
                step={step}
                canStart={done >= index}
                onDone={() => setDone((d) => Math.max(d, index + 1))}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

