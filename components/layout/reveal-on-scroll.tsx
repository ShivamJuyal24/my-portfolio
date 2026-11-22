"use client";

import { useEffect } from "react";

export function RevealOnScroll() {
  useEffect(() => {
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const elements = document.querySelectorAll<HTMLElement>("main section, main article");
    const timeouts = new Set<number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          observer.unobserve(element);
          if (element.dataset.revealState !== "pending") return;

          const delay = Number(element.style.getPropertyValue("--reveal-delay").replace("ms", "")) || 0;
          const frame = requestAnimationFrame(() => {
            element.dataset.revealState = "visible";
          });
          const timeout = window.setTimeout(() => {
            cancelAnimationFrame(frame);
            element.removeAttribute("data-reveal-state");
            element.style.removeProperty("--reveal-delay");
            timeouts.delete(timeout);
          }, 400 + delay);
          timeouts.add(timeout);
        });
      },
      { rootMargin: "0px 0px -32px 0px", threshold: 0 }
    );

    elements.forEach((element) => {
      // Leave above-the-fold content visible, even if hydration starts late.
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.dataset.revealState = "pending";
        if (element.tagName === "ARTICLE") {
          const siblings = Array.from(element.parentElement?.children ?? [])
            .filter((sibling) => sibling.tagName === "ARTICLE");
          element.style.setProperty(
            "--reveal-delay",
            `${(siblings.indexOf(element) % 2) * 60}ms`
          );
        }
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
      elements.forEach((element) => {
        element.removeAttribute("data-reveal-state");
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, []);

  return null;
}
