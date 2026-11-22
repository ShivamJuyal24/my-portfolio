export type OpenSourceContribution = {
  repository: string;
  problem: string;
  solution: string;
  technologies: string[];
  issue: string;
  issueUrl: string;
  pullRequest: string;
  status: "Merged";
};

// Authorship, issue links, and merge status checked against the public GitHub PRs.
export const openSourceContributions: OpenSourceContribution[] = [
  {
    repository: "Endora Commerce",
    problem: "Deferred order settlement left reserved customer credit unreleased.",
    solution: "Recorded a durable credit-release obligation in the payment transaction, drained it after commit, and guarded repeated or concurrent settlements.",
    technologies: ["TypeScript", "Payments", "Transactions", "Integration tests"],
    issue: "#1576",
    issueUrl: "https://github.com/endora-commerce/endora-commerce/issues/1576",
    pullRequest: "https://github.com/endora-commerce/endora-commerce/pull/1675",
    status: "Merged",
  },
  {
    repository: "Endora Commerce",
    problem: "The PWA audience picker lacked keyboard and accessibility regression coverage.",
    solution: "Added keyboard interaction, accessible-semantics, and cancellation tests for the existing checkbox picker; no production UI was changed.",
    technologies: ["TypeScript", "React", "Vitest", "Accessibility"],
    issue: "#1622",
    issueUrl: "https://github.com/endora-commerce/endora-commerce/issues/1622",
    pullRequest: "https://github.com/endora-commerce/endora-commerce/pull/1765",
    status: "Merged",
  },
  {
    repository: "Endora Commerce",
    problem: "A failed language-preference save silently rolled back the selected language.",
    solution: "Added localized inline error feedback and a screen-reader announcement while keeping the optimistic update and rollback behavior.",
    technologies: ["TypeScript", "React", "i18n", "Accessibility"],
    issue: "#1769",
    issueUrl: "https://github.com/endora-commerce/endora-commerce/issues/1769",
    pullRequest: "https://github.com/endora-commerce/endora-commerce/pull/1775",
    status: "Merged",
  },
  {
    repository: "Plannotator",
    problem: "Inbox session labels disappeared after a restart, leaving older messages and recipient pickers with generic host names.",
    solution: "Persisted last-known labels and titles with safe file writes, resolved them server-side for ended sessions, and added restart regression tests without changing reply routing.",
    technologies: ["TypeScript", "Persistence", "Inbox", "Tests"],
    issue: "#3462",
    issueUrl: "https://github.com/backnotprop/plannotator/issues/3462",
    pullRequest: "https://github.com/backnotprop/plannotator/pull/3580",
    status: "Merged",
  },
];
