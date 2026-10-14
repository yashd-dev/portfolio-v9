"use client";

import { useState } from "react";

const SERVICES = [
  {
    title: "Web design",
    image:
      "https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=1905&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Sharp marketing websites with clear hierarchy, responsive pages, motion, and a visual direction that feels like the brand.",
    meta: "Design + build",
  },
  {
    title: "Ecommerce",
    image:
      "https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=1905&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Online stores, product pages, checkout flows, Shopify or headless builds, and the details that make buying feel easy.",
    meta: "Stores + checkout",
  },
  {
    title: "Custom apps",
    image:
      "https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Custom dashboards, tools, booking flows, portals, integrations, and software that fits the exact workflow instead of a template.",
    meta: "Interfaces + logic",
  },
  {
    title: "Hosting & optimization",
    image:
      "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Hosting setup, domain connection, deploys, speed improvements, analytics, fixes, and ongoing polish after launch.",
    meta: "Deploy + improve",
  },
];

export default function Services() {
  const [activeService, setActiveService] = useState(0);

  return (
    <section
      id="section-services"
      className="app-grid gap-8"
    >
      <div
        className="col-start-3 col-end-13 grid grid-cols-11 gap-8 section-pad max-lg:col-start-1 max-lg:grid-cols-1"
      >
        <div data-reveal className="col-span-5 mb-10 max-w-[760px] max-lg:col-span-1">
          <p className="mb-3 text-sm text-fg-50">What I offer</p>
          <h2
            className="section-heading"
          >
            <span className="text-accent">Everything</span> your
            business needs online. From one person.
          </h2>
        </div>

        <div data-reveal className="col-span-full flex h-[420px] gap-2 max-lg:h-auto max-lg:flex-col">
          {SERVICES.map((service, index) => {
            const isActive = activeService === index;

            const enter = isActive
              ? "opacity-100 blur-0 translate-y-0 duration-500"
              : "opacity-0 blur-md translate-y-2 duration-150 max-lg:opacity-100 max-lg:blur-0 max-lg:translate-y-0";

            return (
              <button
                key={service.title}
                type="button"
                onClick={() => setActiveService(index)}
                onMouseEnter={() => setActiveService(index)}
                aria-expanded={isActive}
                className={`group relative overflow-hidden rounded-2xl bg-black text-left text-white transition-[flex,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] max-lg:h-auto max-lg:min-h-[220px] ${isActive ? "flex-[3.6] border-fg-25" : "flex-[0.78]"}`}
              >

                <div
                  className={`absolute inset-0 bg-cover bg-center transition-[transform,filter] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? "scale-100 brightness-100 saturate-100" : "scale-110 brightness-75 saturate-75"}`}
                  style={{ backgroundImage: `url("${service.image}")` }}
                />

                <div className="service-image-overlay absolute inset-0" />

                <div
                  className={`absolute inset-0 transition-opacity duration-700 ${isActive ? "opacity-100" : "opacity-70"}`}
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.15) 100%)",
                  }}
                />

                <div className="relative flex h-full flex-col justify-between p-7">
                  <span className="text-xs tabular-nums text-white/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    aria-hidden="true"
                    className={`absolute left-7 top-1/2 -translate-y-1/2 rotate-180 whitespace-nowrap text-2xl font-semibold leading-none tracking-[-0.035em] transition-[opacity,filter] ease-out [writing-mode:vertical-rl] max-lg:hidden ${isActive ? "opacity-0 blur-md duration-300" : "opacity-100 blur-0 delay-300 duration-500"}`}
                  >
                    {service.title}
                  </span>

                  <div>
                    <p
                      className={`text-sm uppercase tracking-[0.18em] text-white/70 transition-[opacity,filter,transform] ease-out ${enter} ${isActive ? "delay-[280ms]" : ""}`}
                    >
                      {service.meta}
                    </p>
                    <h3
                      className={`mt-4 font-semibold leading-none tracking-[-0.04em] transition-[opacity,filter,transform] ease-out ${enter} ${isActive ? "text-[clamp(36px,3.8vw,58px)] delay-[340ms]" : "text-2xl"}`}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={`mt-6 max-w-[560px] text-base leading-5 text-white/80 transition-[opacity,filter,transform] ease-out ${enter} ${isActive ? "delay-[400ms]" : ""}`}
                    >
                      {service.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
