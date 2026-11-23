import { Shell, Section } from "@/components/layout/shell";
import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { HomeProjects } from "@/components/sections/home-projects";
import { ProofStrip } from "@/components/sections/proof-strip";
import { OpenSourceContributions } from "@/components/sections/open-source-contributions";
import { Skills } from "@/components/sections/skills";
import { CtaBlock } from "@/components/sections/cta-block";
import { ContributionGraph } from "@/components/widgets/contribution-graph";
import { Suspense } from "react";

export default function Home() {
  return (
    <Shell>
      <Hero />
      <Section title="About" number="01" id="about">
        <div className="type-body max-w-[70ch] space-y-4">
          <p>
            I’m a backend engineer who builds where APIs, queues and retrieval pipelines meet LLMs. I like digging into real codebases, from shipping my own projects to fixing bugs in open source repos, and I care about getting the details right.
          </p>
          <p>
            I’m looking for a role on a team building LLM-powered products, where I can own backend and AI infrastructure work.
          </p>
        </div>
      </Section>
      <ProofStrip />
      <Section title="Experience" number="02" id="experience">
        <Experience />
      </Section>
      <Section title="Open Source Contributions" number="03" id="open-source">
        <OpenSourceContributions />
      </Section>
      <HomeProjects />
      <Section title="Skills" number="05" id="skills">
        <Skills />
      </Section>
      <Section title="GitHub Activity" number="06" id="github-activity">
        <Suspense
          fallback={
            <p className="font-mono text-xs text-text-muted">Loading contributions...</p>
          }
        >
          <ContributionGraph username="ShivamJuyal24" />
        </Suspense>
      </Section>
      <Section title="Education" number="07" id="education">
        <Education />
      </Section>
      <CtaBlock />
    </Shell>
  );
}
