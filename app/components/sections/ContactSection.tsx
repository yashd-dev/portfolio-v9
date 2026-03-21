"use client";

import Image from "next/image";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "@/app/context/ThemeContext";
import { useState } from "react";

export default function ContactSection() {
  const { theme } = useTheme();
  const [calendarYear, setCalendarYear] = useState<number | undefined>(undefined);
  const today = new Date().getFullYear();
  const years = Array.from({ length: 3 }, (_, i) => today - i);
  return (
    <section
      id="section-contact"
      className="grid gap-5"
      style={{
        padding: `0 var(--spacing-app-margin)`,
        gridTemplateColumns: "repeat(12, 1fr)",
      }}
    >
      <div
        className="col-span-full lg:col-start-3 lg:col-end-[-1]"
        style={{
          paddingTop: "220px",
          paddingBottom: "var(--spacing-app-margin)",
        }}
      >
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5">
          {/* Text side */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Pulse indicator */}
              <div className="relative mb-2">
                <div className="relative flex items-center gap-2">
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    <div className="absolute w-2 h-2 rounded-full bg-fg" />
                    <div
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        animation:
                          "pulse 3s cubic-bezier(0.1, 0.5, 0.6, 1) infinite",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <h3 className="text-base leading-[1.375] text-fg-50">
                  Open to new opportunities
                </h3>
              </div>

              {/* Interest */}
              <div>
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
 {/* GitHub Contribution Graph */}
                <div className="pt-8 flex flex-col xl:flex-row gap-6 w-full max-w-[90%] overflow-x-hidden">
                  <div className="flex-1 w-full overflow-x-clip">
                    <GitHubCalendar 
                      username="yashd-dev" 
                      colorScheme={theme === 16 ? "light" : "dark"}
                      year={calendarYear === today ? "last" : calendarYear}
                      blockSize={7}
                    />
                  </div>
                  <div className="flex flex-row xl:flex-col gap-2 justify-start flex-wrap mt-2 xl:mt-0 max-h-fit">
                    {years.map((year) => {
                      const isActive = (calendarYear === year) || (calendarYear === undefined && year === today);
                      return (
                        <button
                          key={year}
                          onClick={() => setCalendarYear(year === calendarYear ? undefined : year)}
                          className={`px-3 py-1.5 text-sm rounded-md transition-colors border bg-fg-5 ${
                            isActive
                              ? "text-fg border-fg bg-fg"
                              : "text-fg-50 hover:text-fg border-transparent hover:border-fg-25"
                          }`}
                        >
                          {year}
                        </button>
                      );
                    })}
                  </div>
                </div>
            {/* Action links */}
            <div className="grid grid-cols-2 gap-5 max-sm:pt-20 max-sm:pb-5">
              <div>
                <a
                  href="mailto:hello@yashd.in?subject=Enquiry%20from%20website"
                  className="text-base leading-[1.375] border-b border-fg-25 hover:border-fg block w-fit mb-2"
                >
                  hello@yashd.in
                </a>
                <span className="text-base leading-[1.375] block w-fit mb-2 text-fg-50 cursor-pointer">
                  Mumbai, India
                </span>
                <a
                  href="https://x.com/yashd_dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base leading-[1.375] border-b border-fg-25 hover:border-fg block w-fit mb-2"
                >
                  Twitter
                </a>
              </div>
              <div>
                <a
                  href="https://www.linkedin.com/in/yashd-dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base leading-[1.375] border-b border-fg-25 hover:border-fg block w-fit mb-2"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/yashd-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base leading-[1.375] border-b border-fg-25 hover:border-fg block w-fit mb-2"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Profile photo */}
          <div>
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
