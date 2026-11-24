"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowUp, BriefcaseBusiness, GitFork, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { SleepyCat } from "@/components/widgets/sleepy-cat";
import { ViewCounter } from "@/components/sections/view-counter";

const socialIcons = {
  GitHub: GitFork,
  LinkedIn: BriefcaseBusiness,
  Mail,
};

const revealItem = "motion-safe:group-data-[reveal=pending]/footer:translate-y-[14px] motion-safe:group-data-[reveal=pending]/footer:opacity-0 motion-safe:group-data-[reveal=visible]/footer:transition-[opacity,transform] motion-safe:group-data-[reveal=visible]/footer:duration-[400ms] motion-safe:group-data-[reveal=visible]/footer:ease-out";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [localTime, setLocalTime] = useState<string | null>(null);
  const resetTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const socials = profile.links.filter(
    (link): link is (typeof profile.links)[number] & { label: keyof typeof socialIcons } =>
      link.label in socialIcons
  );

  useEffect(() => {
    return () => {
      if (resetTimeout.current) clearTimeout(resetTimeout.current);
    };
  }, []);

  useEffect(() => {
    const footer = footerRef.current;
    if (
      !footer ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      footer.getBoundingClientRect().top <= window.innerHeight
    ) {
      return;
    }

    let cleanupTimeout: number | undefined;
    const reveal = () => {
      observer.disconnect();
      window.clearTimeout(fallbackTimeout);
      footer.dataset.reveal = "visible";
      cleanupTimeout = window.setTimeout(() => footer.removeAttribute("data-reveal"), 750);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reveal();
      },
      { threshold: 0.2 }
    );

    footer.dataset.reveal = "pending";
    observer.observe(footer);
    // Keep the footer accessible if an observer is present but never reports an intersection.
    const fallbackTimeout = window.setTimeout(reveal, 10000);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallbackTimeout);
      window.clearTimeout(cleanupTimeout);
      footer.removeAttribute("data-reveal");
    };
  }, []);

  useEffect(() => {
    let frame: number | null = null;
    const updateVisibility = () => {
      frame = null;
      setShowBackToTop(window.scrollY > window.innerHeight);
    };
    const scheduleUpdate = () => {
      if (frame === null) frame = window.requestAnimationFrame(updateVisibility);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const updateTime = () => setLocalTime(formatter.format(new Date()));
    let interval: number | undefined;

    updateTime();
    const firstTick = window.setTimeout(() => {
      updateTime();
      interval = window.setInterval(updateTime, 60_000);
    }, 60_000 - (Date.now() % 60_000));

    return () => {
      window.clearTimeout(firstTick);
      window.clearInterval(interval);
    };
  }, []);

  async function handleMailClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (!navigator.clipboard?.writeText) return;

    event.preventDefault();
    try {
      await navigator.clipboard.writeText(href.slice("mailto:".length));
      setCopied(true);
      if (resetTimeout.current) clearTimeout(resetTimeout.current);
      resetTimeout.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      window.location.assign(href);
    }
  }

  return (
    <footer
      ref={footerRef}
      className="group/footer relative pb-20 pt-8 before:absolute before:inset-x-0 before:top-0 before:origin-left before:border-t before:border-border motion-safe:data-[reveal=pending]:before:scale-x-0 motion-safe:data-[reveal=visible]:before:transition-transform motion-safe:data-[reveal=visible]:before:duration-[600ms] motion-safe:data-[reveal=visible]:before:ease-out"
    >
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-text-muted">
          <span className={revealItem}>© 2026 {profile.name}</span>
          <ViewCounter className={revealItem} />
          <span className={`flex items-center gap-2 whitespace-nowrap ${revealItem} motion-safe:group-data-[reveal=visible]/footer:delay-[80ms]`}>
            <span aria-hidden="true" className="relative size-2 shrink-0">
              <span className="absolute inset-0 rounded-full border border-primary/60 motion-safe:animate-[ping_2s_ease-out_infinite]" />
              <span className="relative block size-2 rounded-full bg-primary" />
            </span>
            Open to work
          </span>
          <span className={`whitespace-nowrap tabular-nums ${revealItem} motion-safe:group-data-[reveal=visible]/footer:delay-[80ms]`}>
            Dehradun · {localTime ?? "--:-- --"}
          </span>
        </div>
        <nav
          aria-label="Footer social links"
          className={`flex items-center gap-2 ${revealItem} motion-safe:group-data-[reveal=visible]/footer:delay-[160ms]`}
        >
          {socials.map((link) => {
            const Icon = socialIcons[link.label];
            const external = link.href.startsWith("http");
            return (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label === "Mail" ? "Email" : link.label}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                onClick={link.label === "Mail" ? (event) => void handleMailClick(event, link.href) : undefined}
                className="group relative flex size-9 items-center justify-center rounded-[var(--radius-small)] border border-border text-text-body hover:border-[var(--accent-color)] hover:bg-surface-hover hover:text-foreground hover:shadow-[0_0_10px_var(--accent-soft)] focus-visible:border-[var(--accent-color)] focus-visible:shadow-[0_0_10px_var(--accent-soft)] motion-safe:transition-[transform,border-color,box-shadow,background-color,color] motion-safe:duration-[180ms] motion-safe:ease-out motion-safe:hover:-translate-y-0.5 motion-safe:focus-visible:-translate-y-0.5"
              >
                <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-[var(--radius-small)] border border-border bg-surface px-2 py-1 font-mono text-xs whitespace-nowrap text-foreground opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 motion-safe:transition-opacity motion-safe:duration-[180ms] motion-safe:ease-out"
                >
                  {link.label === "Mail" ? (copied ? "Copied" : "Email") : link.label}
                </span>
              </a>
            );
          })}
        </nav>
        <span role="status" aria-live="polite" className="sr-only">
          {copied ? "Email address copied to clipboard" : ""}
        </span>
      </div>
      <div className="absolute bottom-full right-2 origin-bottom-right scale-[0.65] sm:right-4">
        <SleepyCat />
      </div>
      <button
        type="button"
        aria-label="Back to top"
        aria-hidden={!showBackToTop}
        tabIndex={showBackToTop ? 0 : -1}
        onClick={(event) => {
          event.currentTarget.blur();
          window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          });
        }}
        className={`absolute bottom-5 right-0 flex size-9 items-center justify-center rounded-[var(--radius-small)] border border-border bg-surface text-text-body hover:border-border-hover hover:bg-surface-hover hover:text-foreground motion-safe:transition-opacity motion-safe:duration-[180ms] motion-safe:ease-out ${showBackToTop ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <ArrowUp size={16} strokeWidth={1.75} aria-hidden="true" />
      </button>
    </footer>
  );
}
