import { Shell, Section } from "@/components/layout/shell";
import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { HomeProjects } from "@/components/sections/home-projects";
import { OpenSourceContributions } from "@/components/sections/open-source-contributions";
import { CtaBlock } from "@/components/sections/cta-block";
import { achievements } from "@/data/education";
import { ContributionGraph } from "@/components/widgets/contribution-graph";
import { Suspense } from "react";

export default function Home() {
  return (
    <Shell>
      <Hero />
      <Section title="About" number="01" id="about">
        <div className="type-body max-w-[70ch] space-y-4">
          <p>
            I’m a software engineer who builds where backend systems meet AI: APIs, queues and retrieval pipelines that make LLM features dependable enough for real users.
          </p>
          <p>
            I care about the parts nobody sees but everybody feels. With AI especially, I’d rather measure whether a system can be trusted than assume it. That’s why my projects ship with evaluation sets and CI, not just demos.
          </p>
          <p>
            I’m looking for a role on a team building LLM-powered products, where I can own backend and AI infrastructure work and keep learning from stronger engineers.
          </p>
        </div>
      </Section>
      <Section title="GitHub Activity" number="02" id="github-activity">
        <Suspense
          fallback={
            <p className="font-mono text-xs text-muted-foreground">Loading contributions...</p>
          }
        >
          <ContributionGraph username="ShivamJuyal24" />
        </Suspense>
      </Section>
      <Section title="Experience" number="03" id="experience">
        <Experience />
      </Section>
      <Section title="Open Source Contributions" number="04" id="open-source">
        <OpenSourceContributions />
      </Section>
      <HomeProjects />
      <Section title="Education" number="06" id="education">
        <Education />
      </Section>
      <Section title="Achievements" number="07" id="achievements">
        <ul className="space-y-2 text-sm text-muted-foreground">
          {achievements.map((a) => (
            <li key={a} className="flex gap-2">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
              {a}
            </li>
          ))}
        </ul>
      </Section>
      <CtaBlock />
    </Shell>
  );
}
