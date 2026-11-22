"use client";
import { useEffect } from "react";
import { ThemeProvider as NextThemes } from "next-themes";
import { useTheme } from "next-themes";

function ThemeColorSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue("--background")
      .trim();
    document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
      .forEach((meta) => meta.content = color);
  }, [resolvedTheme]);

  return null;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemes attribute="class" defaultTheme="dark" enableSystem>
      <ThemeColorSync />
      {children}
    </NextThemes>
  );
}
