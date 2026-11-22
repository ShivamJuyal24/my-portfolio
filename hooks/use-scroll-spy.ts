"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollSpy(sectionIds: string[], offset = 100) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sectionIdsRef = useRef(sectionIds);
  const offsetRef = useRef(offset);

  useEffect(() => {
    sectionIdsRef.current = sectionIds;
  }, [sectionIds]);

  useEffect(() => {
    offsetRef.current = offset;
  }, [offset]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observers = new Map<string, IntersectionObserver>();
    const elements = new Map<string, Element>();

    sectionIdsRef.current.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        elements.set(id, el);
      }
    });

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    sectionIdsRef.current.forEach((id) => {
      const el = elements.get(id);
      if (!el) return;

      const observer = new IntersectionObserver(handleIntersect, {
        rootMargin: `-${offsetRef.current}px 0px -${window.innerHeight - offsetRef.current - 100}px 0px`,
        threshold: 0,
      });

      observer.observe(el);
      observers.set(id, observer);
    });

    const onScroll = () => {
      const scrollY = window.scrollY + offsetRef.current;
      for (const id of sectionIdsRef.current) {
        const el = elements.get(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = top + rect.height;
        if (scrollY >= top && scrollY < bottom) {
          setActiveId(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return activeId;
}

export function useSectionIds() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const scan = () => {
      const sections = document.querySelectorAll("section[id]");
      const newIds = Array.from(sections).map((s) => s.id);
      if (newIds.length > 0) {
        setIds(newIds);
      }
    };

    const observer = new MutationObserver(scan);

    observer.observe(document.body, { childList: true, subtree: true });

    scan();

    return () => observer.disconnect();
  }, []);

  return ids;
}