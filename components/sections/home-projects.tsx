"use client";

import { Section } from "@/components/layout/shell";
import { ProjectCard } from "@/components/sections/project-card";
import { ProjectDialog } from "@/components/sections/project-dialog";
import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HomeProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <Section title="Projects">
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.slice(0, 2).map((p) => (
          <ProjectCard
            key={p.name}
            project={p}
            onShowMore={() => setSelectedProject(p)}
          />
        ))}
      </div>
      <div className="mt-5 flex justify-center">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:bg-muted"
        >
          Show all projects ({projects.length})
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
      <ProjectDialog
        open={selectedProject !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedProject(null);
        }}
        project={selectedProject}
      />
    </Section>
  );
}