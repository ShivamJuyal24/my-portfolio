"use client";

import { useState } from "react";
import { Shell } from "@/components/layout/shell";
import { ProjectCard } from "@/components/sections/project-card";
import { ProjectDialog } from "@/components/sections/project-dialog";
import { projects, type Project } from "@/data/projects";

export function ProjectsClient() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <Shell>
      <div className="pt-16 md:pt-24">
        <h1 className="type-section">Projects</h1>
        <p className="mt-2 text-muted-foreground">
          LLM systems, agents and infrastructure, each with measured results.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.name} project={p} onShowMore={() => setSelected(p)} />
        ))}
      </div>

      <ProjectDialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        project={selected}
      />
    </Shell>
  );
}
