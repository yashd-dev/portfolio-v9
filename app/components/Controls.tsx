"use client";

import { useTheme } from "@/app/context/ThemeContext";

export default function Controls() {
  const {
    gridVisible,
    verticalGridVisible,
    toggleVerticalGrid,
    horizontalGridVisible,
    toggleHorizontalGrid,
  } = useTheme();

  if (!gridVisible) return null;

  return (
    <aside
      className="fixed z-[100] flex items-center bg-fg-5 backdrop-blur-sm rounded-xl p-2"
      style={{
        right: "var(--spacing-app-margin)",
        bottom: "calc(var(--spacing-app-margin) - 12px)",
      }}
    >
      <div className="flex items-center gap-1">

        <button
          onClick={toggleVerticalGrid}
          className={`
            flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-300
            ${verticalGridVisible
              ? "bg-fg text-bg"
              : "text-fg-33 hover:text-fg hover:bg-fg-5"}
          `}
          aria-label="Toggle vertical grid"
          title="Vertical Grid (V)"
        >
          <span className="text-sm font-mono font-bold">V</span>
        </button>

        <div className="w-px h-4 bg-fg-10 mx-1" />

        <button
          onClick={toggleHorizontalGrid}
          className={`
            flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-300
            ${horizontalGridVisible
              ? "bg-fg text-bg"
              : "text-fg-33 hover:text-fg hover:bg-fg-5"}
          `}
          aria-label="Toggle horizontal grid"
          title="Horizontal Grid (H)"
        >
          <span className="text-sm font-mono font-bold">H</span>
        </button>
      </div>
    </aside>
  );
}
