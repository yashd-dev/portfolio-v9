"use client";

import { useTheme } from "@/app/context/ThemeContext";
import { useEffect, useState } from "react";

const COLUMNS = 12;

/**
 * Full-screen fixed grid overlay (toggled via 'g' key or grid button).
 * Each column has two vertical lines that animate in with staggered delays.
 */
export default function GridOverlay() {
  const { gridVisible, verticalGridVisible, horizontalGridVisible } = useTheme();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait until the cover section finishes its loading delay (1.75s + buffer)
    // before allowing the grid lines to animate down.
    const t = setTimeout(() => {
      setIsReady(true);
    }, 2250);
    return () => clearTimeout(t);
  }, []);

  const showVertical = gridVisible && verticalGridVisible && isReady;
  const showHorizontal = gridVisible && horizontalGridVisible && isReady;

  return (
    <>
      <div
        className="fixed inset-0 z-[101] pointer-events-none"
        style={{
          padding: `0 var(--spacing-app-margin)`,
          display: "grid",
          gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`,
          gap: "20px",
        }}
      >
        {Array.from({ length: COLUMNS }).map((_, col) => (
          <div key={col} className="flex justify-between">
            {[0, 1].map((lineIdx) => {
              const delay = `${(col * 2 + lineIdx) * 0.04}s`;
              return (
                <div
                  key={lineIdx}
                  className="w-px bg-fg-15 transition-[height] duration-1000 ease-in-out"
                  style={{
                    height: showVertical ? "100%" : "0",
                    transitionDelay: delay,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div
        className="fixed inset-0 z-[101] pointer-events-none flex flex-col justify-evenly"
        style={{
          paddingLeft: `var(--spacing-app-margin)`,
          paddingRight: `var(--spacing-app-margin)`,
        }}
      >
        {Array.from({ length: 10 }).map((_, row) => (
          <div key={row} className="flex flex-col justify-between" style={{ height: "20px" }}>
            {[0, 1].map((lineIdx) => {
              const delay = `${(row * 2 + lineIdx) * 0.04}s`;
              return (
                <div
                  key={lineIdx}
                  className="bg-fg-15 transition-[width] duration-1000 ease-in-out"
                  style={{
                    height: "1px",
                    width: showHorizontal ? "100%" : "0",
                    transitionDelay: delay,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
