"use client";
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

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/50 backdrop-blur-xl backdrop-saturate-150">
      <nav className="flex h-14 items-center justify-between px-4">
        <Link href="/" className="font-heading text-lg font-semibold tracking-tight">
          SJ<span className="text-primary">.</span>
        </Link>

        <div className="flex items-center gap-0.5 text-sm">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-md px-2.5 py-1.5 transition-colors hover:text-foreground ${active ? "text-foreground" : "text-muted-foreground"}`}
              >
                {l.label}
              </Link>
            );
          })}
          <span className="mx-2 text-muted-foreground">|</span>
          <HireMeButton className="rounded-md px-2.5 py-1.5 font-medium text-primary transition-colors hover:bg-primary/10" />
          <span className="mx-2 text-muted-foreground">|</span>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
