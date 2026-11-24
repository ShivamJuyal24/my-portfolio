"use client";
import { useEffect, useRef } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const COLOR_TRANSITION_MS = 450;

function applyThemeToDocument(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.style.colorScheme = theme;
}

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const colorTransitionTimeout = useRef<number | undefined>(undefined);
  const viewTransitionId = useRef(0);

  useEffect(() => {
    return () => {
      window.clearTimeout(colorTransitionTimeout.current);
      document.documentElement.classList.remove("theme-vt");
    };
  }, []);

  const handleToggle = (event: ReactMouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const isDark = !root.classList.contains("light");
    const nextTheme: Theme = isDark ? "light" : "dark";

    // Update the DOM synchronously inside the transition callback so the
    // browser captures the new theme, then let next-themes persist the choice.
    const commit = () => {
      applyThemeToDocument(nextTheme);
      setTheme(nextTheme);
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      commit();
      return;
    }

    if (typeof document.startViewTransition !== "function") {
      window.clearTimeout(colorTransitionTimeout.current);
      root.classList.add("theme-transition");
      // Flush styles so the color transition starts from the outgoing theme.
      void root.offsetWidth;
      commit();
      colorTransitionTimeout.current = window.setTimeout(() => {
        root.classList.remove("theme-transition");
      }, COLOR_TRANSITION_MS + 20);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    root.style.setProperty("--theme-toggle-x", `${x}px`);
    root.style.setProperty("--theme-toggle-y", `${y}px`);
    root.style.setProperty("--theme-toggle-radius", `${radius}px`);

    // The icon snapshots animate; skip the live icon transition so the
    // incoming snapshot is captured with the new icon already in place.
    const transitionId = ++viewTransitionId.current;
    root.classList.add("theme-vt");

    const finish = () => {
      if (viewTransitionId.current === transitionId) {
        root.classList.remove("theme-vt");
      }
    };

    try {
      document.startViewTransition(commit).finished.then(finish, finish);
    } catch {
      root.classList.remove("theme-vt");
      commit();
    }
  };

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={handleToggle}
      className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <span
        aria-hidden="true"
        className="relative flex size-4 items-center justify-center [view-transition-name:theme-toggle]"
      >
        <Sun size={16} className="theme-icon theme-icon-sun absolute" />
        <Moon size={16} className="theme-icon theme-icon-moon absolute" />
      </span>
    </button>
  );
}
