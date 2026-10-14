export function CallVisual() {
  return (
    <div className="relative h-full min-h-[210px] overflow-hidden rounded-xl process-panel p-3 process-border-soft max-sm:min-h-[190px] max-sm:p-2">
      <div className="absolute left-6 right-6 top-1/2 h-px process-accent-line" />
      <div className="absolute bottom-6 top-6 left-1/4 w-px process-accent-line" />
      <div className="absolute bottom-6 top-6 left-1/2 w-px process-accent-line" />
      <div className="absolute bottom-6 top-6 left-3/4 w-px process-accent-line" />

      <div className="relative flex h-full flex-col rounded-md process-panel p-5 border process-border-strong max-sm:p-3">
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

        <div className="grid min-h-0 flex-1 grid-cols-3 items-center gap-4 py-4 max-sm:gap-2 max-sm:py-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={`relative h-24 rounded-sm process-panel p-3 max-sm:h-20 max-sm:p-2 ${index === 1 ? "border-2 process-border-strong" : "border process-border-strong"}`}
            >
              <div className="flex h-full flex-col justify-between gap-3">
                <div className="flex items-start justify-between">
                  <span
                    className={`size-7 rounded-full max-sm:size-5 ${index % 3 === 0 ? "process-line-strong" : index === 1 ? "process-accent" : "process-fill-soft border process-border-soft"}`}
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
          <span className="h-px w-20 process-line-strong max-sm:w-10" />
          <div className="flex items-center gap-2 rounded-full process-panel px-4 py-2 border process-border-strong max-sm:gap-1 max-sm:px-2">
            {[0, 1, 2, 3].map((item) => (
              <span key={item} className="size-5 rounded-full border process-border-strong max-sm:size-4" />
            ))}
            <span className="h-5 w-8 rounded-full process-accent max-sm:h-4 max-sm:w-6" />
          </div>
          <span className="size-2 rounded-full process-accent" />
        </div>
      </div>
    </div>
  );
}

export function FigmaVisual() {
  return (
    <div className="relative h-full min-h-[210px] overflow-hidden rounded-xl process-panel p-4 max-sm:min-h-[190px] max-sm:p-2">
      <div className="relative flex h-full flex-col overflow-hidden rounded-md border process-border-strong process-panel">
        <div className="flex h-9 shrink-0 items-center justify-between border-b process-border-strong px-3 max-sm:h-7 max-sm:px-2">
          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-sm process-accent max-sm:size-2.5" />
            <span className="h-px w-12 process-line-strong max-sm:w-7" />
          </div>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full border process-border-strong" />
            <span className="h-4 w-12 rounded-full process-accent max-sm:h-3 max-sm:w-8" />
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[64px_1fr_74px] max-sm:grid-cols-1">
          <div className="border-r process-border-strong p-2.5 max-sm:hidden">
            <span className="mb-3 block h-px w-8 process-line-strong max-sm:mb-2 max-sm:w-5" />
            <div className="space-y-2.5 max-sm:space-y-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <span className={`size-2 shrink-0 ${index === 1 ? "rounded-full process-accent" : "rounded-sm border process-border-strong"}`} />
                  <span className="h-px flex-1 process-line-mid" />
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden p-4 max-sm:p-2.5">
            <div className="mx-auto flex h-full max-w-[230px] flex-col border process-border-strong process-panel p-3 max-sm:p-2">
              <div className="mb-3 flex items-center justify-between max-sm:mb-2">
                <span className="h-px w-12 process-line-strong max-sm:w-8" />
                <span className="h-3 w-10 rounded-full process-accent max-sm:h-2.5 max-sm:w-7" />
              </div>
              <div className="grid min-h-0 flex-1 grid-cols-[1.1fr_0.9fr] gap-3 max-sm:gap-1.5">
                <div className="rounded-sm border process-border-soft process-fill-soft" />
                <div className="flex flex-col gap-2 max-sm:gap-1.5">
                  <span className="h-px w-full process-line-strong" />
                  <span className="h-px w-4/5 process-line-mid" />
                  <span className="h-px w-2/3 process-line-soft" />
                  <span className="mt-auto h-5 rounded-sm border process-border-soft process-accent-soft max-sm:h-3.5" />
                </div>
              </div>
            </div>

            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border process-border-strong process-panel px-3 py-1.5 max-sm:bottom-1 max-sm:gap-1 max-sm:px-2 max-sm:py-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index} className={`size-2.5 max-sm:size-2 ${index === 0 ? "rounded-sm process-accent" : "rounded-full border process-border-strong"}`} />
              ))}
            </div>
          </div>

          <div className="border-l process-border-strong p-2.5 max-sm:hidden">
            <div className="mb-3 h-4 rounded-sm border process-border-soft process-accent-soft max-sm:mb-2 max-sm:h-3" />
            <div className="space-y-3 max-sm:space-y-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="space-y-1.5 max-sm:space-y-1">
                  <span className="block h-px w-8 process-line-strong max-sm:w-5" />
                  <span className="block h-3 rounded-sm border process-border-soft process-fill-soft max-sm:h-2.5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CodeVisual() {
  return (
    <div className="relative h-full min-h-[210px] overflow-hidden rounded-xl process-panel p-4 process-border-soft max-sm:min-h-[190px] max-sm:p-2">
      <div className="absolute left-6 right-6 top-1/3 h-px process-accent-line" />
      <div className="absolute left-6 right-6 top-2/3 h-px process-accent-line" />
      <div className="absolute bottom-6 top-6 left-1/3 w-px process-accent-line" />
      <div className="absolute bottom-6 top-6 left-2/3 w-px process-accent-line" />

      <div className="relative grid h-full grid-cols-3 grid-rows-3 gap-3 max-sm:gap-2">
        <div className="col-span-2 row-span-2 rounded-md process-panel border process-border-strong">
          <div className="flex h-8 items-center justify-between border-b process-border-strong px-3">
            <div className="flex gap-1">
              <span className="size-1.5 rounded-full process-accent" />
              <span className="size-1.5 rounded-full process-fill-soft" />
              <span className="size-1.5 rounded-full process-fill-soft" />
            </div>
            <span className="h-px w-14 process-line-mid" />
          </div>
          <div className="grid h-[calc(100%-2rem)] grid-cols-[34px_1fr] gap-3 p-4 max-sm:grid-cols-[20px_1fr] max-sm:gap-2 max-sm:p-3">
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

        <div className="rounded-md process-panel p-4 border process-border-strong max-sm:p-2">
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

        <div className="row-span-2 rounded-md process-panel p-4 border process-border-strong max-sm:p-2">
          <div className="grid h-full grid-cols-4 items-end gap-1.5">
            {["h-[45%]", "h-[72%]", "h-[36%]", "h-[88%]"].map((height) => (
              <span
                key={height}
                className={`rounded-t-sm border process-border-strong process-panel ${height}`}
              />
            ))}
          </div>
        </div>

        <div className="rounded-md process-panel p-4 border process-border-strong max-sm:p-2">
          <div className="flex h-full items-center justify-center gap-2">
            <span className="size-8 rounded-full border process-border-strong max-sm:size-5" />
            <span className="h-px flex-1 process-accent" />
            <span className="size-2 rounded-full process-accent" />
          </div>
        </div>

        <div className="rounded-md process-panel p-4 border process-border-strong max-sm:p-2">
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

export function HostingVisual() {
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
