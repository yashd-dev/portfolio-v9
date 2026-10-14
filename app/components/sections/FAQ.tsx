"use client";

import { useState } from "react";
import { FAQ_GROUPS } from "@/app/data/content";

const CURRENCIES = [
  { code: "INR", symbol: "₹", rate: 1, suffix: "" },
  { code: "USD", symbol: "$", rate: 0.012, suffix: "" },
  { code: "EUR", symbol: "€", rate: 0.011, suffix: "" },
  { code: "GBP", symbol: "£", rate: 0.0095, suffix: "" },
  { code: "AUD", symbol: "A$", rate: 0.018, suffix: "" },
  { code: "CAD", symbol: "C$", rate: 0.016, suffix: "" },
  { code: "AED", symbol: "AED ", rate: 0.044, suffix: "" },
] as const;

const BUDGET_RANGES_INR = [
  { min: 30000, max: 50000 },
  { min: 50000, max: 80000 },
  { min: 80000, max: 120000 },
  { min: 120000, max: null },
];

function formatBudgetValue(amount: number, currency: (typeof CURRENCIES)[number]) {
  const converted = amount * currency.rate;

  if (currency.code === "INR") {
    if (amount >= 100000) return `${currency.symbol}${(amount / 100000).toFixed(1)} lakh`;
    return `${currency.symbol}${Math.round(amount / 1000)}k`;
  }

  if (converted >= 1000) {
    return `${currency.symbol}${(converted / 1000).toFixed(1)}k`;
  }

  return `${currency.symbol}${Math.round(converted)}`;
}

function formatBudgetRange(
  range: (typeof BUDGET_RANGES_INR)[number],
  currency: (typeof CURRENCIES)[number],
) {
  const min = formatBudgetValue(range.min, currency);
  if (!range.max) return `${min}+`;
  return `${min}-${formatBudgetValue(range.max, currency)}`;
}

export default function FAQ() {
  const [currencyCode, setCurrencyCode] = useState<(typeof CURRENCIES)[number]["code"]>("INR");
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const selectedCurrency = CURRENCIES.find((currency) => currency.code === currencyCode) ?? CURRENCIES[0];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState("submitting");

    const form = event.currentTarget;
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      form.reset();
      setCurrencyCode("INR");
      setFormState("success");
      return;
    }

    setFormState("error");
  }

  return (
    <section id="section-faq" className="app-grid gap-8">
      <div className="col-start-3 col-end-13 section-pad max-lg:col-start-1">
        <div className="grid grid-cols-11 gap-8 max-lg:grid-cols-1 max-sm:gap-6">
          <div data-reveal className="col-span-5 max-w-none max-lg:col-span-1">
            <p className="mb-3 text-sm text-fg-50">Website FAQ draft</p>
            <h2 className="section-heading">Questions, answered.</h2>
          </div>

          <div data-reveal className="col-start-7 col-end-12 max-lg:col-span-1 max-lg:col-start-auto max-lg:col-end-auto">
            <p className="max-w-[700px] text-[var(--font-size-medium)] leading-[1.15] text-fg-50">
              A clearer view of working together, project scope, design process,
              hosting, ecommerce, and what happens after launch.
            </p>
          </div>

          <div className="col-span-full pt-12 max-sm:pt-6">
            {FAQ_GROUPS.map((group, groupIndex) => (
              <section
                key={group.title}
                data-reveal
                className="grid grid-cols-11 gap-8 border-t border-fg-10 py-12 max-lg:grid-cols-1 max-sm:gap-6 max-sm:py-7"
              >
                <div className="col-span-3 max-lg:col-span-1">
                  <p className="mb-3 text-sm text-fg-50 tabular-nums">
                    {String(groupIndex + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-[var(--font-size-large)] leading-none tracking-[-0.03em]">
                    {group.title}
                  </h3>
                </div>

                <div className="col-start-5 col-end-12 max-lg:col-span-1 max-lg:col-start-auto max-lg:col-end-auto">
                  <div className="divide-y divide-fg-10">
                    {group.items.map((item) => (
                      <details
                        key={item.question}
                        open={openQuestion === item.question}
                        onToggle={(event) => {
                          const isOpen = event.currentTarget.open;
                          setOpenQuestion(isOpen ? item.question : null);
                        }}
                        className="group py-6 first:pt-0 last:pb-0"
                      >
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[clamp(22px,2vw,30px)] leading-[1.08] tracking-[-0.02em] marker:hidden [&::-webkit-details-marker]:hidden">
                          <span>{item.question}</span>
                          <span className="mt-1 shrink-0 text-fg-50 transition-transform duration-300 group-open:rotate-45">
                            +
                          </span>
                        </summary>
                        <p className="mt-5 max-w-[780px] text-base leading-6 text-fg-50">
                          {item.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
              </section>
            ))}

            <section
              data-reveal
              className="grid grid-cols-11 gap-8 border-t border-fg-10 py-14 max-lg:grid-cols-1 max-sm:gap-6 max-sm:py-8"
            >
              <div className="col-span-4 max-lg:col-span-1">
                <p className="mb-3 text-sm text-fg-50">Start a project</p>
                <h3 className="text-[clamp(34px,3.6vw,56px)] leading-[0.98] tracking-[-0.035em]">
                  Tell me what you need built.
                </h3>
              </div>

              <form
                action="https://formspree.io/f/xljgggoo"
                method="POST"
                onSubmit={handleSubmit}
                className="col-start-6 col-end-12 grid gap-8 max-lg:col-span-1 max-lg:col-start-auto max-lg:col-end-auto"
              >
                <div className="grid grid-cols-2 gap-8 max-sm:grid-cols-1 max-sm:gap-6">
                  <label className="grid gap-3 text-sm text-fg-50">
                    Name
                    <input
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      className="border-0 border-b border-fg-20 bg-transparent px-0 pb-4 pt-1 text-[22px] leading-none text-fg outline-none transition-colors placeholder:text-fg-25 focus:border-fg max-sm:text-xl"
                      placeholder="Your name"
                    />
                  </label>

                  <label className="grid gap-3 text-sm text-fg-50">
                    Email
                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      className="border-0 border-b border-fg-20 bg-transparent px-0 pb-4 pt-1 text-[22px] leading-none text-fg outline-none transition-colors placeholder:text-fg-25 focus:border-fg max-sm:text-xl"
                      placeholder="you@example.com"
                    />
                  </label>
                </div>

                <label className="grid gap-3 text-sm text-fg-50">
                  Business / website
                  <input
                    type="text"
                    name="business"
                    autoComplete="organization"
                    className="border-0 border-b border-fg-20 bg-transparent px-0 pb-4 pt-1 text-[22px] leading-none text-fg outline-none transition-colors placeholder:text-fg-25 focus:border-fg max-sm:text-xl"
                    placeholder="Your business or current website"
                  />
                </label>

                <div className="grid gap-5">
                  <input type="hidden" name="currency" value={currencyCode} />
                  <div className="grid gap-3 text-sm text-fg-50">
                    Currency
                    <div className="flex flex-wrap gap-2">
                      {CURRENCIES.map((currency) => (
                        <button
                          key={currency.code}
                          type="button"
                          onClick={() => setCurrencyCode(currency.code)}
                          className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                            currencyCode === currency.code
                              ? "border-fg bg-fg text-bg"
                              : "border-fg-20 text-fg hover:border-fg"
                          }`}
                        >
                          {currency.code}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-3 text-sm text-fg-50">
                    Budget range
                    <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                      {BUDGET_RANGES_INR.map((range) => {
                        const label = formatBudgetRange(range, selectedCurrency);

                        return (
                          <label
                            key={`${range.min}-${range.max ?? "plus"}`}
                            className="group cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="budget_range"
                              value={`${currencyCode} ${label}`}
                              required
                              className="peer sr-only"
                            />
                            <span className="block border-b border-fg-20 pb-4 pt-2 text-[22px] leading-none text-fg transition-colors peer-checked:border-fg peer-checked:text-accent group-hover:border-fg max-sm:text-xl">
                              {label}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <label className="grid gap-3 text-sm text-fg-50">
                  What do you need?
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="min-h-36 resize-y border-0 border-b border-fg-20 bg-transparent px-0 pb-4 pt-1 text-[22px] leading-[1.25] text-fg outline-none transition-colors placeholder:text-fg-25 focus:border-fg max-sm:text-xl"
                    placeholder="A new site, redesign, Shopify store, timeline, budget..."
                  />
                </label>

                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="mt-2 w-fit rounded-full border border-fg-20 px-7 py-4 text-sm text-fg transition-colors hover:border-fg hover:bg-fg hover:text-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg"
                >
                  {formState === "submitting" ? "Sending..." : "Send project details"}
                </button>

                {formState === "success" && (
                  <p className="max-w-[520px] text-[22px] leading-[1.2] tracking-[-0.02em] text-fg">
                    Thanks. Your project details landed safely. I’ll read through it and get back to you soon.
                  </p>
                )}

                {formState === "error" && (
                  <p className="max-w-[520px] text-base leading-6 text-fg-50">
                    Something got stuck while sending. Please try again in a moment.
                  </p>
                )}
              </form>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
