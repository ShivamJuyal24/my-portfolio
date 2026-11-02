"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { Project } from "@/data/projects";
import { Preview, ProjectDetails } from "./project-card";

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | null;
}

export function ProjectDialog({ open, onOpenChange, project }: ProjectDialogProps) {
  // keep the latest callback without re-running the effect on every render
  const closeRef = useRef(onOpenChange);
  useEffect(() => {
    closeRef.current = onOpenChange;
  });

  // Escape to close + lock page scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && project && (
        <motion.div
          key={project.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />

          {/* panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            <button
              autoFocus
              onClick={() => onOpenChange(false)}
              aria-label="Close project details"
              className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full border border-white/10 bg-background/70 backdrop-blur transition-colors hover:bg-background"
            >
              <X size={16} />
            </button>

            <div className="overflow-y-auto overscroll-contain">
              <Preview p={project} sizes="672px" />

              <div className="space-y-6 p-5 sm:p-7">
                <div>
                  <h2 id="project-dialog-title" className="text-2xl font-medium tracking-tight">
                    {project.name}
                  </h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">{project.tagline}</p>
                </div>

                <ProjectDetails project={project} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}