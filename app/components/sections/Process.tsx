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

function StepCard({
  step,
  status,
  started,
  onDone,
}: {
  step: (typeof PROCESS_STEPS)[number];
  status: "pending" | "active" | "done";
  started: boolean;
  onDone: () => void;
}) {
  const visualRef = useRef<HTMLDivElement>(null);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  const active = started && status === "active";
  const visible = status !== "pending";

  // Depends ONLY on `active`, so re-renders never cancel a running trace.
  useLayoutEffect(() => {
    const el = visualRef.current;
    if (!active || !el) return;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      onDoneRef.current();
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    let cancel: unknown;
    try {
      cancel = traceVisual(el, finish);
    } catch {
      finish();
    }

    return () => {
      // Only cancel a trace that is still in progress (unmount / strict-mode remount).
      if (!finished && typeof cancel === "function") cancel();
    };
  }, [active]);

  return (
    <div
      className="h-full"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(16px)",
        transition: "opacity 500ms ease, transform 500ms ease",
      }}
    >
      <article className="process-card h-full overflow-hidden rounded-2xl process-border-soft bg-bg text-fg">
        <div
          ref={visualRef}
          className="h-[300px] process-panel p-3 max-sm:h-auto max-sm:min-h-[210px] max-sm:p-3"
        >
          {step.visual}
        </div>
        <div className="border-t process-border-soft bg-bg p-7 max-sm:p-5">
          <div className="mb-5 flex items-center justify-between gap-4 text-xs text-fg-50 max-sm:mb-4">
            <span className="tabular-nums">{step.number}</span>
            <span>{step.eyebrow}</span>
          </div>
          <h3 className="text-[var(--font-size-title)] leading-none tracking-[-0.035em] max-sm:text-[clamp(28px,8vw,36px)]">
            {step.title}
          </h3>
          <p className="mt-5 max-w-[620px] text-sm leading-5 text-fg-50 max-sm:mt-4 max-sm:text-[13px] max-sm:leading-[1.45]">
            {step.description}
          </p>
        </div>
      </article>
    </div>
  );
}

export default function Process({ onComplete }: { onComplete?: () => void }) {
  const [activeStep, setActiveStep] = useState(0);
  const [started, setStarted] = useState(false);
  const headingRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Start once the heading enters view, OR has already been scrolled past
  // (fast scroll). After this, the sequence runs to completion on its own.
  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting || e.boundingClientRect.top < 0) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (activeStep >= PROCESS_STEPS.length) onCompleteRef.current?.();
  }, [activeStep]);

  return (
    <section id="section-process" className="app-grid gap-8">
      <div className="col-start-3 col-end-13 section-pad max-lg:col-start-1">
        <div className="grid grid-cols-11 gap-8 max-lg:grid-cols-1">
          <div
            ref={headingRef}
            className="col-span-5 max-w-none max-lg:col-span-1"
          >
            <p className="mb-3 text-sm text-fg-50">How I work</p>
            <h2 className="section-heading">
              <span className="text-accent">Clear</span> steps, no vague middle.
            </h2>
          </div>

          <div className="col-start-7 col-end-12 max-lg:col-span-1 max-lg:col-start-auto max-lg:col-end-auto">
            <p className="max-w-[700px] text-[var(--font-size-medium)] leading-[1.15] text-fg-50">
              This is not a template handoff. We shape it like your child:
              personal to you, useful to your customers, and aligned with the
              brand you are building.
            </p>
          </div>

          <div className="col-span-full grid grid-cols-2 gap-8 pt-12 max-md:grid-cols-1 max-sm:gap-5 max-sm:pt-6">
            {PROCESS_STEPS.map((step, index) => (
              <StepCard
                key={step.title}
                step={step}
                started={started}
                status={
                  index < activeStep
                    ? "done"
                    : index === activeStep
                      ? "active"
                      : "pending"
                }
                onDone={() =>
                  setActiveStep((current) => Math.max(current, index + 1))
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
