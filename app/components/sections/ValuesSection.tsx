"use client";

/**
 * Values section — four big words + a descriptive paragraph.
 */
export default function ValuesSection() {
  return (
    <section
      id="section-values"
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
          {/* Title values */}
          <div className="col-span-full pb-20">
            {["Intentional", "Impactful", "Polished", "Honest"].map((word) => (
              <h1
                key={word}
                style={{
                  fontSize: "var(--font-size-huge)",
                  lineHeight: 0.975,
                  letterSpacing: "-0.02em",
                  marginLeft: "-0.07em",
                }}
              >
                {word}
              </h1>
            ))}
          </div>

          {/* Description */}
          <div className="col-start-2 col-end-[-1] max-md:col-span-full">
            <p className="text-base leading-5">
              These are my core development values, and I pour them into everything I build. I’ve always been the guy tinkering late into the night, prototyping, breaking things, rebuilding better. Solving real problems with clean, thoughtful code and interfaces that actually feel good to use is what lights me up. I hate when devs or designers just hit “generate” and call gradient-heavy AI slop “nice” — that generic, soulless output makes me cringe. I use AI every day (it’s a powerful tool when you guide it, LLM's are as smart as you are), but I never let it run autopilot. I rewrite, refine, and own every line until it’s something I’m proud to ship.
            </p>
            <p className="text-base leading-5 pt-5">
I thrive working with people who respect real craft designers who care about pixel-perfect details, product folks who want thoughtful flows, and engineers who geek out over maintainable, performant systems. Collaborating like that turns good ideas into exceptional outcomes way beyond what any one person could do alone. I think big (scalable architecture, long-term impact), move fast (ship early, iterate ruthlessly), yet stay careful zooming out to strategy and business goals, zooming in on micro-interactions and edge cases. I’m constantly leveling up, learning new stacks, mentoring juniors, and pushing for the highest standard I can hit. All while tying my work to something meaningful whether it’s fair pricing for consumers, better tools for communities, or just making digital experiences that leave people better off
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
