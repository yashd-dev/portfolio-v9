"use client";

import { useState } from "react";

interface AppHeaderProps {
  onToggleMobileNav: () => void;
  isMobileNavOpen: boolean;
}

/**
 * Fixed top header with the animated "Yash Deshpande" brand reveal
 * and the hamburger → X mobile nav toggle.
 */
export default function AppHeader({
  onToggleMobileNav,
  isMobileNavOpen,
}: AppHeaderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const nameChars = "Yash Deshpande".split("");

  return (
    <header
      className="fixed top-0 w-full z-[100] select-none"
      style={{ padding: "0 var(--spacing-app-margin)" }}
    >
      <div className="flex items-center justify-between py-5 max-lg:py-2">
        {/* Brand */}
        <div
          className="py-3 cursor-default"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <h3
            className="leading-none"
            style={{
              fontSize: "var(--font-size-medium)",
              marginLeft: "-0.07em",
            }}
          >
            {nameChars.map((char, i) => (
              <span
                key={i}
                className="inline-block"
                style={{
                  ...(i > 0
                    ? {
                        marginLeft: isHovered ? "0" : "-0.035em",
                        opacity: isHovered ? 1 : 0,
                        transition: `margin-left 0.3s ease-${isHovered ? "out" : "in"}, opacity 0.3s ease-${isHovered ? "out" : "in"}`,
                        transitionDelay: isHovered
                          ? `${i * 0.01}s`
                          : `${(nameChars.length - 1 - i) * 0.01}s`,
                      }
                    : {}),
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h3>
        </div>

        {/* Mobile hamburger/X toggle */}
        <button
          className="hidden max-lg:flex p-3 -mr-3 rounded-3xl cursor-pointer"
          onClick={onToggleMobileNav}
          aria-label="Toggle navigation"
        >
          <div className="relative w-6 h-6 flex flex-col justify-center">
            <div
              className="absolute transition-transform duration-100"
              style={{
                transform: isMobileNavOpen ? "rotate(45deg)" : "rotate(0)",
                transitionDelay: isMobileNavOpen ? "0.1s" : "0s",
              }}
            >
              <div
                className="w-6 h-0.5 bg-fg transition-transform duration-100"
                style={{
                  transform: isMobileNavOpen
                    ? "translateY(0)"
                    : "translateY(-4px)",
                  transitionDelay: isMobileNavOpen ? "0s" : "0.1s",
                }}
              />
            </div>
            <div
              className="absolute transition-transform duration-100"
              style={{
                transform: isMobileNavOpen ? "rotate(-45deg)" : "rotate(0)",
                transitionDelay: isMobileNavOpen ? "0.1s" : "0s",
              }}
            >
              <div
                className="w-6 h-0.5 bg-fg transition-transform duration-100"
                style={{
                  transform: isMobileNavOpen
                    ? "translateY(0)"
                    : "translateY(4px)",
                  transitionDelay: isMobileNavOpen ? "0s" : "0.1s",
                }}
              />
            </div>
          </div>
        </button>
      </div>
    </header>
  );
}
