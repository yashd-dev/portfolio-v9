"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useTheme } from "@/app/context/ThemeContext";
import { useState } from "react";

const DISCUSSION_LINK = "https://cal.com/yashd-dev/discussion";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false },
);

export default function Contact() {
  const { theme } = useTheme();
  const [calendarYear, setCalendarYear] = useState<number | undefined>(undefined);
  const today = new Date().getFullYear();
  const years = Array.from({ length: 3 }, (_, i) => today - i);
  return (
    <section
      id="section-contact"
      className="app-grid gap-8"
    >
      <div
        className="col-span-full lg:col-start-3 lg:col-end-[-1]"
        style={{
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-app-margin)",
        }}
      >
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-8">

          <div className="flex flex-col justify-between">
            <div>

              <div data-reveal className="relative mb-4">
                <div className="relative flex items-center gap-2">
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    <div className="absolute h-2.5 w-2.5 rounded-full bg-green-500" />
                  </div>
                </div>
              </div>

              <div data-reveal>
                <h3 className="text-base leading-[1.375] text-fg-50">
                  Open to new opportunities
                </h3>
              </div>

              <div data-reveal>
                <h2
                  style={{
                    fontSize: "var(--font-size-large)",
                    lineHeight: 1.16,
                    letterSpacing: "-0.01em",
                    marginLeft: "-0.07em",
                    paddingTop: "0.14em",
                  }}
                >
                  Let&apos;s build something great.
                </h2>

              </div>
            </div>

                <div data-reveal className="pt-10 flex flex-col xl:flex-row gap-6 w-full max-w-[90%] overflow-x-clip max-sm:max-w-none max-sm:overflow-x-auto">
                  <div className="flex-1 w-full overflow-x-clip">
                    <GitHubCalendar
                      username="yashd-dev"
                      colorScheme={theme === 16 ? "light" : "dark"}
                      year={calendarYear === today ? "last" : calendarYear}
                      blockSize={7}
                    />
                  </div>
                  <div className="flex flex-row xl:flex-col gap-3 justify-start flex-wrap mt-3 xl:mt-0 max-h-fit">
                    {years.map((year) => {
                      const isActive = (calendarYear === year) || (calendarYear === undefined && year === today);
                      return (
                        <button
                          key={year}
                          onClick={() => setCalendarYear(year === calendarYear ? undefined : year)}
                           className={`px-4 py-2 text-sm rounded-md transition-colors bg-fg-5 ${
                            isActive
                              ? "text-bg bg-fg"
                              : "text-fg-50 hover:text-fg"
                          }`}
                        >
                          {year}
                        </button>
                      );
                    })}
                  </div>
                </div>

            <div data-reveal className="grid grid-cols-2 gap-8 pt-12 max-sm:pt-12 max-sm:pb-7">
              <div>
                <a
                  href="mailto:hey@yashd.in?subject=Enquiry%20from%20website"
                  className="text-base leading-[1.375] block w-fit mb-3 text-fg-50 hover:text-fg"
                >
                  hey@yashd.in
                </a>
                <span className="text-base leading-[1.375] block w-fit mb-3 text-fg-50 cursor-pointer">
                  Mumbai, India
                </span>
                <a
                  href="https://x.com/yashd_dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base leading-[1.375] block w-fit mb-3 text-fg-50 hover:text-fg"
                >
                  Twitter
                </a>
              </div>
              <div>
                <a
                  href="https://www.linkedin.com/in/yashd-dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base leading-[1.375] block w-fit mb-3 text-fg-50 hover:text-fg"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/yashd-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base leading-[1.375] block w-fit mb-3 text-fg-50 hover:text-fg"
                >
                  GitHub
                </a>
                <a
                  href={DISCUSSION_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base leading-[1.375] block w-fit mb-3 text-fg-50 hover:text-fg"
                >
                  cal.com/yashd-dev/discussion
                </a>
              </div>
            </div>
          </div>

          <div data-reveal>
            <figure className="relative">
              <Image
                src="/images/me.jpg"
                alt="Profile photo of Yash Deshpande"
                width={800}
                height={800}
                className="w-full h-full object-cover"
                priority
              />
              <div className="image-overlay-01 absolute inset-0" />
              <div className="image-overlay-02 absolute inset-0" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
