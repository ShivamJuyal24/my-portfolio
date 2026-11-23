"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_DURATION = 1400;
const VIEWPORT_THRESHOLD = 0.6;

const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3);

type UseCountUpOptions = {
  value: number;
  /** Animation length in milliseconds. */
  duration?: number;
  /** Milliseconds to wait after entering the viewport, used for staggering. */
  delay?: number;
};

export function useCountUp({
  value,
  duration = DEFAULT_DURATION,
  delay = 0,
}: UseCountUpOptions) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      // Jump to the final value without animating, but still off the effect body
      // so the update stays asynchronous.
      const frame = requestAnimationFrame(() => setCurrent(value));
      return () => cancelAnimationFrame(frame);
    }

    let frame = 0;
    let timeout = 0;
    let started = false;

    const animate = () => {
      const startedAt = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        setCurrent(value * easeOutCubic(progress));
        if (progress < 1) {
          frame = requestAnimationFrame(step);
        }
      };
      frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (started) return;
        if (!entries.some((entry) => entry.isIntersecting)) return;

        // Fire once, then stop observing.
        started = true;
        observer.disconnect();
        timeout = window.setTimeout(animate, delay);
      },
      { threshold: VIEWPORT_THRESHOLD }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [value, duration, delay]);

  return { ref, current };
}
