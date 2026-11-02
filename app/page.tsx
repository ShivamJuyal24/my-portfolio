import { Shell, Divider, Section } from "@/components/layout/shell";
import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { HomeProjects } from "@/components/sections/home-projects";
import { ConnectSection } from "@/components/sections/connect-section";
import { CtaBlock } from "@/components/sections/cta-block";
import { profile } from "@/data/profile";
import { achievements } from "@/data/education";
import { ContributionGraph } from "@/components/widgets/contribution-graph";
import { Suspense } from "react";
import { Mail, File } from "lucide-react";

export default function Home() {
  return (
    <Shell>
      <Hero />
      <Divider />
      <Section title="About">
        <ul className="space-y-4 text-sm leading-relaxed max-w-none">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary"></span>
            <span className="text-muted-foreground">
              I’m a software engineer who builds where backend systems meet AI: APIs, queues and retrieval pipelines that make LLM features dependable enough for real users.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary"></span>
            <span className="text-muted-foreground">
              I care about the parts nobody sees but everybody feels. With AI especially, I’d rather measure whether a system can be trusted than assume it. That’s why my projects ship with evaluation sets and CI, not just demos.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary"></span>
            <span className="text-muted-foreground">
              I’m looking for a role on a team building LLM-powered products, where I can own backend and AI infrastructure work and keep learning from stronger engineers.
            </span>
          </li>
        </ul>
      </Section>
      <Divider />
      <Section title="Connect">
        <ConnectSection links={profile.links} />
      </Section>
      <Divider />
      <Divider />
      <Section title="GitHub Activity">
        <Suspense
          fallback={
            <p className="font-mono text-xs text-muted-foreground">Loading contributions...</p>
          }
        >
          <ContributionGraph username="ShivamJuyal24" />
        </Suspense>
      </Section>
      <Section title="Experience">
        <Experience />
      </Section>
      <Divider />
      <Divider />
      <HomeProjects />
      <Divider />
      <Section title="Education">
        <Education />
      </Section>
      <Divider />
      <Section title="Achievements">
        <ul className="space-y-2 text-sm text-muted-foreground">
          {achievements.map((a) => (
            <li key={a} className="flex gap-2">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
              {a}
            </li>
          ))}
        </ul>
      </Section>
      <Divider />
      <CtaBlock className="mt-12" />
    </Shell>
  );
}