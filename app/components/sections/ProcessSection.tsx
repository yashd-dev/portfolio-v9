"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

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
/* Tracer: walks a visual's DOM and animates each element one by one   */
/* ------------------------------------------------------------------ */

const TRACE_MS = 480;
const FADE_MS = 220;
const SVG_NS = "http://www.w3.org/2000/svg";

function isVisibleColor(c: string) {
  return !!c && c !== "transparent" && !/(,|\/)\s*0\)$/.test(c.trim());
}

function traceVisual(root: HTMLElement, onDone: () => void) {
  const anims: Animation[] = [];
  const prevPosition = root.style.position;
  if (getComputedStyle(root).position === "static") {
    root.style.position = "relative";
  }

  const rootRect = root.getBoundingClientRect();
  const all = Array.from(root.querySelectorAll<Element>("*"));

  type Kind = "path" | "line" | "box" | "fill" | "text";
  const jobs: { el: Element; kind: Kind }[] = [];

  for (const el of all) {
    const tag = el.tagName.toLowerCase();
    if (tag === "svg") continue;
    if (tag === "path") {
      jobs.push({ el, kind: "path" });
      continue;
    }
    if (!(el instanceof HTMLElement)) continue;

    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;

    const bw = [
      cs.borderTopWidth,
      cs.borderRightWidth,
      cs.borderBottomWidth,
      cs.borderLeftWidth,
    ].map((v) => parseFloat(v) || 0);
    const hasBorder = bw.some((v) => v > 0);
    const hasFill =
      isVisibleColor(cs.backgroundColor) || cs.backgroundImage !== "none";
    const hasText = Array.from(el.childNodes).some(
      (n) => n.nodeType === 3 && !!n.textContent?.trim()
    );

    if ((r.width <= 2.5 || r.height <= 2.5) && (hasFill || hasBorder)) {
      jobs.push({ el, kind: "line" });
    } else if (hasBorder && r.width > 6 && r.height > 6) {
      jobs.push({ el, kind: "box" });
    } else if (hasFill) {
      jobs.push({ el, kind: "fill" });
    } else if (hasText) {
      jobs.push({ el, kind: "text" });
    }
  }

  const overlay = document.createElementNS(SVG_NS, "svg");
  overlay.setAttribute("width", String(rootRect.width));
  overlay.setAttribute("height", String(rootRect.height));
  overlay.setAttribute("aria-hidden", "true");
  overlay.style.cssText =
    "position:absolute;left:0;top:0;pointer-events:none;overflow:visible;z-index:5";
  root.appendChild(overlay);

  const step = Math.min(70, 1500 / Math.max(jobs.length, 1));
  let end = 0;

  const addStroke = (
    node: SVGElement,
    color: string,
    width: number,
    delay: number
  ) => {
    node.setAttribute("fill", "none");
    node.setAttribute("stroke", color);
    node.setAttribute("stroke-width", String(width));
    node.setAttribute("pathLength", "1");
    node.setAttribute("opacity", "0");
    node.style.strokeDasharray = "1";
    overlay.appendChild(node);
    const total = TRACE_MS + FADE_MS;
    const hold = TRACE_MS / total;
    anims.push(
      node.animate(
        [
          { strokeDashoffset: 1, opacity: 1 },
          { strokeDashoffset: 0, opacity: 1, offset: hold },
          { strokeDashoffset: 0, opacity: 0 },
        ],
        { delay, duration: total, fill: "backwards", easing: "linear" }
      )
    );
  };

  jobs.forEach(({ el, kind }, i) => {
    const delay = i * step;

    if (kind === "path") {
      const p = el as SVGPathElement;
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      anims.push(
        p.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], {
          delay,
          duration: 800,
          fill: "backwards",
          easing: "cubic-bezier(.65,0,.35,1)",
        })
      );
      end = Math.max(end, delay + 800);
      return;
    }

    const h = el as HTMLElement;
    const cs = getComputedStyle(h);
    const r = h.getBoundingClientRect();

    if (kind === "line") {
      const horizontal = r.width >= r.height;
      h.style.transformOrigin = horizontal ? "left center" : "center top";
      anims.push(
        h.animate(
          [
            { scale: horizontal ? "0 1" : "1 0" },
            { scale: "1 1" },
          ],
          {
            delay,
            duration: 420,
            fill: "backwards",
            easing: "cubic-bezier(.65,0,.35,1)",
          }
        )
      );
      end = Math.max(end, delay + 420);
      return;
    }

    if (kind === "box") {
      const x = r.left - rootRect.left;
      const y = r.top - rootRect.top;
      const w = r.width;
      const hh = r.height;
      const bt = parseFloat(cs.borderTopWidth) || 0;
      const br = parseFloat(cs.borderRightWidth) || 0;
      const bb = parseFloat(cs.borderBottomWidth) || 0;
      const bl = parseFloat(cs.borderLeftWidth) || 0;

      if (bt > 0 && br > 0 && bb > 0 && bl > 0) {
        const sw = bt;
        const rect = document.createElementNS(SVG_NS, "rect");
        rect.setAttribute("x", String(x + sw / 2));
        rect.setAttribute("y", String(y + sw / 2));
        rect.setAttribute("width", String(Math.max(0, w - sw)));
        rect.setAttribute("height", String(Math.max(0, hh - sw)));
        const rad = cs.borderTopLeftRadius;
        let rx = parseFloat(rad) || 0;
        if (rad.endsWith("%")) rx = (rx / 100) * Math.min(w, hh);
        rx = Math.max(0, Math.min(rx, Math.min(w, hh) / 2) - sw / 2);
        rect.setAttribute("rx", String(rx));
        addStroke(rect, cs.borderTopColor, sw, delay);
      } else {
        const mk = (x1: number, y1: number, x2: number, y2: number) => {
          const l = document.createElementNS(SVG_NS, "line");
          l.setAttribute("x1", String(x1));
          l.setAttribute("y1", String(y1));
          l.setAttribute("x2", String(x2));
          l.setAttribute("y2", String(y2));
          return l;
        };
        if (bt > 0)
          addStroke(mk(x, y + bt / 2, x + w, y + bt / 2), cs.borderTopColor, bt, delay);
        if (br > 0)
          addStroke(mk(x + w - br / 2, y, x + w - br / 2, y + hh), cs.borderRightColor, br, delay);
        if (bb > 0)
          addStroke(mk(x + w, y + hh - bb / 2, x, y + hh - bb / 2), cs.borderBottomColor, bb, delay);
        if (bl > 0)
          addStroke(mk(x + bl / 2, y + hh, x + bl / 2, y), cs.borderLeftColor, bl, delay);
      }

      // real border + background appear once the trace has finished
      const total = TRACE_MS + FADE_MS;
      const hold = TRACE_MS / total;
      anims.push(
        h.animate(
          [
            { borderColor: "transparent", backgroundColor: "transparent" },
            {
              borderColor: "transparent",
              backgroundColor: "transparent",
              offset: hold,
            },
          ],
          { delay, duration: total, fill: "backwards", easing: "linear" }
        )
      );
      end = Math.max(end, delay + total);
      return;
    }

    if (kind === "fill") {
      const small = r.width <= 40 && r.height <= 40;
      anims.push(
        h.animate(
          small
            ? [
                { opacity: 0, scale: "0.4" },
                { opacity: 1, scale: "1" },
              ]
            : [{ opacity: 0 }, { opacity: 1 }],
          {
            delay,
            duration: 380,
            fill: "backwards",
            easing: "cubic-bezier(.2,.8,.2,1)",
          }
        )
      );
      end = Math.max(end, delay + 380);
      return;
    }

    // text
    anims.push(
      h.animate(
        [
          { opacity: 0, translate: "0 4px" },
          { opacity: 1, translate: "0 0" },
        ],
        { delay, duration: 400, fill: "backwards", easing: "ease-out" }
      )
    );
    end = Math.max(end, delay + 400);
  });

  const cleanup = () => {
    anims.forEach((a) => a.cancel());
    overlay.remove();
    root.style.position = prevPosition;
  };

  const timer = window.setTimeout(() => {
    overlay.remove();
    onDone();
  }, end + 60);

  return () => {
    window.clearTimeout(timer);
    cleanup();
  };
}

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

export default function ProcessSection({ onComplete }: { onComplete?: () => void }) {
  const [done, setDone] = useState(0);

  useEffect(() => {
    if (done >= PROCESS_STEPS.length) onComplete?.();
  }, [done, onComplete]);

  return (
    <section
      id="section-process"
      className="grid gap-8"
      style={{
        padding: `0 var(--spacing-app-margin)`,
        gridTemplateColumns: "repeat(12, 1fr)",
      }}
    >
      <div
        className="col-start-3 col-end-13 max-lg:col-start-1"
        style={{ paddingTop: "var(--spacing-section)", paddingBottom: "12px" }}
      >
        <div className="grid grid-cols-11 gap-8 max-lg:grid-cols-1">
          <div className="col-span-5 max-w-none max-lg:col-span-1">
            <p className="mb-3 text-sm text-fg-50">How I work</p>
            <h2
              style={{
                fontSize: "var(--font-size-huge)",
                lineHeight: 0.975,
                letterSpacing: "-0.02em",
                marginLeft: "-0.07em",
              }}
            >
              <span style={{ color: "var(--accent)" }}>Clear</span> steps, no
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

/* ------------------------------------------------------------------ */
/* Visuals (unchanged)                                                 */
/* ------------------------------------------------------------------ */

function CallVisual() {
  return (
    <div className="relative h-full min-h-[210px] overflow-hidden rounded-xl process-panel p-3 process-border-soft">
      <div className="absolute left-6 right-6 top-1/2 h-px process-accent-line" />
      <div className="absolute bottom-6 top-6 left-1/4 w-px process-accent-line" />
      <div className="absolute bottom-6 top-6 left-1/2 w-px process-accent-line" />
      <div className="absolute bottom-6 top-6 left-3/4 w-px process-accent-line" />

      <div className="relative flex h-full flex-col rounded-md process-panel p-5 border process-border-strong">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full process-accent" />
            <span className="h-px w-20 process-line-strong" />
          </div>
          <div className="flex gap-2">
            <span className="size-2 rounded-full border process-border-strong" />
            <span className="size-2 rounded-full border process-border-strong" />
            <span className="size-2 rounded-full process-accent" />
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-3 items-center gap-4 py-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={`relative h-24 rounded-sm process-panel p-3 ${index === 1 ? "border-2 process-border-strong" : "border process-border-strong"}`}
            >
              <div className="flex h-full flex-col justify-between gap-3">
                <div className="flex items-start justify-between">
                  <span
                    className={`size-7 rounded-full ${index % 3 === 0 ? "process-line-strong" : index === 1 ? "process-accent" : "process-fill-soft border process-border-soft"}`}
                  />
                  {index === 1 ? <span className="size-1.5 rounded-full process-accent" /> : null}
                </div>
                <div className="space-y-1.5">
                  <span className="block h-px w-12 process-line-strong" />
                  <span className="block h-px w-8 process-line-mid" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="h-px w-20 process-line-strong" />
          <div className="flex items-center gap-2 rounded-full process-panel px-4 py-2 border process-border-strong">
            {[0, 1, 2, 3].map((item) => (
              <span key={item} className="size-5 rounded-full border process-border-strong" />
            ))}
            <span className="h-5 w-8 rounded-full process-accent" />
          </div>
          <span className="size-2 rounded-full process-accent" />
        </div>
      </div>
    </div>
  );
}

function FigmaVisual() {
  return (
    <div className="relative h-full overflow-hidden rounded-xl process-border-soft process-panel p-4">
      <div className="absolute left-6 right-6 top-1/3 h-px process-accent-line" />
      <div className="absolute left-6 right-6 top-2/3 h-px process-accent-line" />
      <div className="absolute bottom-6 top-6 left-[24%] w-px process-accent-line" />
      <div className="absolute bottom-6 top-6 left-[76%] w-px process-accent-line" />

      <div className="relative grid h-full grid-cols-[72px_1fr_72px] gap-3">
        <div className="flex flex-col justify-between rounded-md process-panel p-4 border process-border-strong">
          <div className="space-y-3">
            <span className="block h-px w-10 process-line-strong" />
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <span
                  className={`size-2 ${index === 1 ? "rounded-full process-accent" : "rounded-sm border process-border-strong"}`}
                />
                <span className="h-px w-7 process-line-mid" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <span className="aspect-square rounded-full process-accent" />
            <span className="aspect-square rounded-full border process-border-strong" />
            <span className="aspect-square rounded-sm border process-border-strong" />
            <span className="aspect-square rounded-sm process-accent-soft border process-border-strong" />
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute left-0 right-0 top-6 h-px process-accent-line" />
          <div className="absolute bottom-6 left-1/2 top-0 w-px process-accent-line" />
          <div className="relative h-[86%] w-[78%] process-panel p-5 border process-border-strong">
            <div className="mb-5 flex items-center justify-between">
              <span className="h-px w-12 process-line-strong" />
              <span className="h-4 w-14 rounded-full process-accent" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[4/3] rounded-md process-fill-soft border process-border-soft" />
              <div className="space-y-2 pt-2">
                <span className="block h-px w-full process-line-strong" />
                <span className="block h-px w-5/6 process-line-mid" />
                <span className="block h-px w-2/3 process-line-soft" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-md process-panel px-4 py-2 border process-border-strong">
            {Array.from({ length: 6 }).map((_, index) => (
              <span
                key={index}
                className={`size-3 ${index === 0 ? "rounded-sm process-accent" : "rounded-sm border process-border-strong"}`}
              />
            ))}
          </div>
        </div>

        <div className="rounded-md process-panel p-4 border process-border-strong">
          <div className="mb-4 h-5 rounded-sm process-accent-soft border process-border-soft" />
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <span className="block h-px w-9 process-line-strong" />
                <span className="block h-4 rounded-sm process-fill-soft border process-border-soft" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CodeVisual() {
  return (
    <div className="relative h-full min-h-[210px] overflow-hidden rounded-xl process-panel p-4 process-border-soft">
      <div className="absolute left-6 right-6 top-1/3 h-px process-accent-line" />
      <div className="absolute left-6 right-6 top-2/3 h-px process-accent-line" />
      <div className="absolute bottom-6 top-6 left-1/3 w-px process-accent-line" />
      <div className="absolute bottom-6 top-6 left-2/3 w-px process-accent-line" />

      <div className="relative grid h-full grid-cols-3 grid-rows-3 gap-3">
        <div className="col-span-2 row-span-2 rounded-md process-panel border process-border-strong">
          <div className="flex h-8 items-center justify-between border-b process-border-strong px-3">
            <div className="flex gap-1">
              <span className="size-1.5 rounded-full process-accent" />
              <span className="size-1.5 rounded-full process-fill-soft" />
              <span className="size-1.5 rounded-full process-fill-soft" />
            </div>
            <span className="h-px w-14 process-line-mid" />
          </div>
          <div className="grid h-[calc(100%-2rem)] grid-cols-[34px_1fr] gap-3 p-4">
            <div className="space-y-3">
              {Array.from({ length: 7 }).map((_, index) => (
                <span key={index} className="block h-px w-3 process-line-soft" />
              ))}
            </div>
            <div className="space-y-3">
              <span className="block h-px w-3/4 process-line-strong" />
              <span className="ml-5 block h-px w-1/2 process-line-mid" />
              <span className="ml-5 block h-px w-4/5 process-line-strong" />
              <span className="ml-10 block h-px w-1/3 process-accent" />
              <span className="ml-5 block h-px w-2/3 process-line-strong" />
              <span className="block h-px w-1/2 process-line-mid" />
              <span className="block h-px w-3/5 process-line-strong" />
            </div>
          </div>
        </div>

        <div className="rounded-md process-panel p-4 border process-border-strong">
          <div className="mb-3 flex justify-between">
            <span className="size-2 rounded-full process-accent" />
            <span className="h-px w-8 process-line-mid" />
          </div>
          <div className="space-y-2">
            <span className="block h-px w-full process-line-strong" />
            <span className="block h-px w-2/3 process-line-mid" />
            <span className="block h-px w-4/5 process-line-strong" />
          </div>
        </div>

        <div className="row-span-2 rounded-md process-panel p-4 border process-border-strong">
          <div className="grid h-full grid-cols-4 items-end gap-1.5">
            {[45, 72, 36, 88].map((height) => (
              <span
                key={height}
                className="rounded-t-sm border process-border-strong process-panel"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>

        <div className="rounded-md process-panel p-4 border process-border-strong">
          <div className="flex h-full items-center justify-center gap-2">
            <span className="size-8 rounded-full border process-border-strong" />
            <span className="h-px flex-1 process-accent" />
            <span className="size-2 rounded-full process-accent" />
          </div>
        </div>

        <div className="rounded-md process-panel p-4 border process-border-strong">
          <div className="grid h-full grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <span
                key={index}
                className="rounded-sm border process-border-strong"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HostingVisual() {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden rounded-xl process-border-soft process-panel p-4">
      <div className="absolute left-6 right-6 top-1/2 h-px process-accent-line" />
      <div className="absolute bottom-6 top-6 left-[32%] w-px process-accent-line" />
      <div className="absolute bottom-6 top-6 left-[58%] w-px process-accent-line" />

      <div className="relative flex scale-110 items-center gap-7 max-sm:scale-100">
        <div className="space-y-3">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="flex h-10 w-36 items-center justify-between rounded-md process-panel px-4 border process-border-strong"
            >
              <div className="space-y-1">
                <span className="block h-px w-14 process-line-mid" />
                <span className="block h-px w-9 process-line-mid" />
              </div>
              <span className="size-2.5 rounded-full process-accent" />
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start gap-2">
          <svg
            width="96"
            height="54"
            viewBox="0 0 96 54"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M0 28H24L31 8L40 48L49 28H96"
              stroke="var(--fg)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="font-mono text-xs tracking-[0.08em] process-text-muted">
            99.9 %
          </p>
        </div>
      </div>
    </div>
  );
}
