"use client";

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

export default function ProcessSection() {
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
          <div className="col-span-4 max-w-[520px] max-lg:col-span-1">
            <p className="mb-3 text-sm text-fg-50">How I work</p>
            <h2 className="text-[var(--font-size-title)] leading-[1.05] tracking-[-0.035em]">
              Clear steps, no vague middle.
            </h2>
          </div>

          <div className="col-start-6 col-end-12 max-lg:col-span-1 max-lg:col-start-auto max-lg:col-end-auto">
            <p className="max-w-[700px] text-[var(--font-size-medium)] leading-[1.15] text-fg-50">
              This is not a template handoff. We shape it like your child:
              personal to you, useful to your customers, and aligned with the
              brand you are building.
            </p>
          </div>

          <div className="col-span-full grid grid-cols-2 gap-8 pt-12 max-md:grid-cols-1">
            {PROCESS_STEPS.map((step, index) => (
              <article
                key={step.title}
                className="process-card overflow-hidden rounded-2xl process-border-soft bg-bg text-fg"
                style={{ animationDelay: `${index * 140}ms` }}
              >
                <div className="h-[300px] process-panel p-3 max-sm:h-[240px]">
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CallVisual() {
  return (
    <div className="relative h-full min-h-[210px] overflow-hidden rounded-xl process-panel p-4 process-border-soft">
      <div className="absolute left-6 right-6 top-1/3 h-px process-accent-line" />
      <div className="absolute left-6 right-6 top-2/3 h-px process-accent-line" />
      <div className="absolute bottom-6 top-6 left-1/4 w-px process-accent-line" />
      <div className="absolute bottom-6 top-6 left-1/2 w-px process-accent-line" />
      <div className="absolute bottom-6 top-6 left-3/4 w-px process-accent-line" />

      <div className="relative flex h-full flex-col rounded-md process-panel p-4 border process-border-strong">
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

        <div className="grid min-h-0 flex-1 grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className={`relative rounded-sm process-panel p-2.5 ${index === 1 ? "border-2 process-border-strong" : "border process-border-strong"}`}
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
