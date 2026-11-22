"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { HireMeButton } from "@/components/widgets/hire-me-button";

const links = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    const frame = requestAnimationFrame(onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const ids = ["home", "projects", "contact-cta"];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    const updateActive = () => {
      const threshold = window.innerHeight * 0.45;
      const current = [...elements]
        .reverse()
        .find((element) => element.getBoundingClientRect().top <= threshold);
      setActiveSection(current?.id ?? "home");
    };

    const observer = new IntersectionObserver(updateActive, {
      rootMargin: "-72px 0px -55% 0px",
    });
    elements.forEach((element) => observer.observe(element));
    const frame = requestAnimationFrame(updateActive);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md ${
        scrolled ? "border-border" : "border-transparent"
      }`}
    >
      <nav aria-label="Main navigation" className="flex h-16 items-center justify-between gap-3">
        <Link href="/" className="shrink-0 font-sans text-lg font-semibold tracking-tight">
          SJ<span className="text-primary">.</span>
        </Link>

        <div className="flex items-center gap-2 text-xs sm:gap-5 sm:text-sm">
          {links.map((link) => {
            const active =
              pathname === link.href &&
              (pathname !== "/" || activeSection === "home") ||
              (pathname === "/" && link.href === "/projects" && activeSection === "projects") ||
              (pathname === "/" && link.href === "/contact" && activeSection === "contact-cta");
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`border-b-2 py-1 hover:text-foreground ${
                  active
                    ? "border-primary text-foreground"
                    : "border-transparent text-text-muted"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <ThemeToggle />
          <HireMeButton className="shrink-0 cursor-pointer rounded-[var(--radius-small)] border border-primary px-2 py-1.5 font-medium text-primary hover:bg-primary hover:text-primary-foreground sm:px-3" />
        </div>
      </nav>
    </header>
  );
}
