export type Experience = {
  company: string;
  role: string;
  type: string;
  period: string;
  location: string;
  tech: string[];
  points: string[];
};

export const experience: Experience[] = [
  {
    company: "Webrex Studio",
    role: "MERN Developer Intern",
    type: "Internship",
    period: "01.2026 – 03.2026",
    location: "Ahmedabad, Remote",
    tech: ["Node.js", "MongoDB", "RAG", "Claude Code", "REST APIs"],
    points: [
      "Built the graph-generation step of a Claude Code slash command that models a codebase as a graph of files and relationships, and integrated a hybrid semantic + keyword RAG pipeline so Claude reads only relevant files and their neighbors.",
      "Enriched prompts with graph-retrieved context in a single pass; enrichment completes in under 15 seconds on a 500-file repo.",
      "Built an incremental, event-driven daemon that re-processes only changed files, cutting rebuild compute and LLM token usage by an estimated 75–80%.",
      "Resolved production issues across REST APIs, Node.js services and MongoDB by tracing logs to root cause.",
    ],
  },
];