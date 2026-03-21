"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

interface ThemeContextValue {
  /** Current theme index (0 = pure dark, 16 = pure white) */
  theme: number;
  /** Set the theme directly */
  setTheme: (t: number) => void;
  /** Toggle between theme-0 (dark) and theme-16 (white) */
  toggleBW: () => void;
  /** Cycle through all 17 themes (sunlight spectrum shortcut) */
  cycleTheme: () => void;
  /** Whether the grid overlay is visible */
  gridVisible: boolean;
  /** Toggle grid overlay */
  toggleGrid: () => void;
  /** Whether vertical grid lines are visible */
  verticalGridVisible: boolean;
  /** Toggle vertical grid lines */
  toggleVerticalGrid: () => void;
  /** Whether horizontal grid lines are visible */
  horizontalGridVisible: boolean;
  /** Toggle horizontal grid lines */
  toggleHorizontalGrid: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/* -------------------------------------------------------------------------- */
/*  Provider                                                                   */
/* -------------------------------------------------------------------------- */

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState(16);
  const [gridVisible, setGridVisible] = useState(true);
  const [verticalGridVisible, setVerticalGridVisible] = useState(true);
  const [horizontalGridVisible, setHorizontalGridVisible] = useState(false);

  /* Auto-detect saved theme or dark mode preference on first mount */
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved !== null && !isNaN(Number(saved))) {
      setThemeState(Number(saved));
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setThemeState(0);
    }
  }, []);

  const setTheme = useCallback((t: number) => {
    const newTheme = Math.max(0, Math.min(16, t));
    setThemeState(newTheme);
    localStorage.setItem("portfolio-theme", String(newTheme));
  }, []);

  const toggleBW = useCallback(() => {
    setThemeState((prev) => {
      const newTheme = prev === 0 ? 16 : 0;
      localStorage.setItem("portfolio-theme", String(newTheme));
      return newTheme;
    });
  }, []);

  const cycleTheme = useCallback(() => {
    setThemeState((prev) => {
      const newTheme = prev === 0 ? 16 : prev - 1;
      localStorage.setItem("portfolio-theme", String(newTheme));
      return newTheme;
    });
  }, []);

  const toggleGrid = useCallback(() => {
    setGridVisible((prev) => !prev);
  }, []);

  const toggleVerticalGrid = useCallback(() => {
    setVerticalGridVisible((prev) => !prev);
  }, []);

  const toggleHorizontalGrid = useCallback(() => {
    setHorizontalGridVisible((prev) => !prev);
  }, []);

  /* Keyboard shortcuts (g = grid, b/w = toggle b/w, s = cycle spectrum) */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      switch (e.key.toLowerCase()) {
        case "g":
          toggleGrid();
          break;
        case "v":
          toggleVerticalGrid();
          break;
        case "h":
          toggleHorizontalGrid();
          break;
        case "b":
        case "w":
          toggleBW();
          break;
        case "s":
          cycleTheme();
          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toggleGrid, toggleVerticalGrid, toggleHorizontalGrid, toggleBW, cycleTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleBW,
        cycleTheme,
        gridVisible,
        toggleGrid,
        verticalGridVisible,
        toggleVerticalGrid,
        horizontalGridVisible,
        toggleHorizontalGrid,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hook                                                                       */
/* -------------------------------------------------------------------------- */

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
