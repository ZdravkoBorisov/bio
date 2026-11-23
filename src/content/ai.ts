export const aiIntro = [
  "I use AI as an engineering multiplier, not a replacement for judgment. It speeds up the parts of the job that are slow but not hard — reading unfamiliar code, repetitive changes, scaffolding tests — so more of my time goes into design and verification.",
  "Lately I've been using Claude much more fully: project context files so it understands our codebases from the first prompt, custom skills for the work that repeats, and internal tools that put answers in front of non-engineers.",
];

export const aiWorkflow = [
  { step: "Problem", detail: "A ticket, an incident, a design question." },
  { step: "AI-assisted investigation", detail: "Starts from the project context files, then traces behaviour across services." },
  { step: "Custom skill / workflow", detail: "Repetitive steps run through purpose-built Claude Code skills." },
  { step: "Implementation", detail: "I own the design; AI accelerates the typing." },
  { step: "Tests", detail: "Generated faster, reviewed like production code." },
  { step: "PR / Review", detail: "Every change goes through pull-request review." },
  { step: "Release", detail: "Deployed through Spinnaker, with a ServiceNow change ticket." },
  { step: "Production", detail: "Observed in Grafana and OpenSearch after release." },
];

export const aiPrinciples = [
  { title: "AI drafts, I decide", body: "Architecture and trade-offs stay human decisions." },
  { title: "Tests are the contract", body: "Generated code is only as good as the tests that verify it." },
  { title: "Review doesn't change", body: "AI-assisted changes go through the same PR review as everything else." },
  { title: "Automate the repeatable", body: "If a task keeps coming back, it becomes a skill." },
];

export type AiBuild = {
  label: string;
  title: string;
  body: string;
  stat?: { value: string; label: string };
  tags: string[];
};

export const aiBuilds: AiBuild[] = [
  {
    label: "Context",
    title: "Project context files",
    body: "Markdown context files for our projects, covering architecture, conventions and service boundaries. Every AI session starts with the full picture instead of figuring it out again.",
    tags: ["Markdown", "Architecture", "Conventions"],
  },
  {
    label: "Skills",
    title: "Custom Claude skills",
    body: "Reusable skills for the multi-step work that keeps coming back. Some of them turn days of work into one run that I can review.",
    tags: ["Claude Code", "Automation"],
  },
  {
    label: "Internal tool",
    title: "Internal website for product and business teams",
    body: "An internal website that lets product and business teams find what they need and see it visualised, without waiting on an engineer.",
    tags: ["Internal web app", "Data visualisation"],
  },
  {
    label: "Efficiency",
    title: "Ghost skill",
    body: "A skill that makes Claude answer in dense, filler-free output. Same information, far fewer tokens.",
    stat: { value: "~45%", label: "lower token use and cost" },
    tags: ["Claude Code", "Cost"],
  },
];
