export default function Values() {
  return (
    <section id="section-values" className="app-grid gap-8">
      <div className="col-span-full section-pad lg:col-start-5 lg:col-end-[-1]">
        <div className="grid grid-cols-2 gap-8">
          <div className="col-span-full pb-0 md:pb-14">
            {["Intentional", "Impactful", "Polished", "Honest"].map((word) => (
              <h1 key={word} data-reveal className="section-heading">
                {word}
              </h1>
            ))}
          </div>

          <div
            data-reveal
            className="col-start-2 col-end-[-1] max-md:col-span-full"
          >
            <p className="text-base leading-5">
              I care about websites with a point of view: clear hierarchy, good
              spacing, sharp interaction, and pages that feel finished without
              shouting. I use AI as a tool, but I still rewrite, refine, and own
              the final result.
            </p>
            <p className="text-base leading-5 pt-6">
              I work best with people who value craft: designers with strong
              details, founders who need a polished web presence, and engineers
              who care about maintainability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
