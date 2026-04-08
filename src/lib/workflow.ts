import { getSupabase } from "./supabase";

export interface WorkflowConfig {
  headline: string;
  philosophy: string;
  engagement_content: string;
}

export interface WorkflowPrinciple {
  id: string;
  sort_order: number;
  title: string;
  description: string;
}

export interface WorkflowPhase {
  id: string;
  sort_order: number;
  number: string;
  title: string;
  description: string;
  content: string;
}

export interface WorkflowService {
  id: string;
  sort_order: number;
  service_name: string;
  content: string;
}

const fallbackConfig: WorkflowConfig = {
  headline: "How I work.",
  philosophy:
    "Good design isn't just how something looks — it's how it works, why it exists, and what problem it solves. Every project starts with understanding before making.",
  engagement_content:
    "<p>I work with teams and founders in a few ways:</p><ul><li><strong>Project-based</strong> — A defined scope with clear deliverables. Best for product launches, redesigns, or specific feature work.</li><li><strong>Retainer</strong> — Ongoing design partnership. Best for teams that need consistent design support without the overhead of hiring in-house.</li><li><strong>Consulting</strong> — Strategic advice, design reviews, and team mentorship. Best for teams that have designers but need experienced guidance.</li></ul>",
};

const fallbackPrinciples: WorkflowPrinciple[] = [
  { id: "1", sort_order: 1, title: "Research before pixels", description: "I don't open Figma until I understand the problem. Assumptions are expensive — a conversation upfront saves weeks of rework later." },
  { id: "2", sort_order: 2, title: "Design for the edge cases", description: "The happy path is easy. Real quality shows in how a product handles errors, empty states, and the 10% of users doing unexpected things." },
  { id: "3", sort_order: 3, title: "Ship to learn", description: "A polished design that never ships teaches nothing. I push for early releases, gather real signal, and iterate from there." },
  { id: "4", sort_order: 4, title: "Clarity over cleverness", description: "If someone has to think twice about what to do next, the design has failed. Simplicity is a feature, not a compromise." },
];

const fallbackPhases: WorkflowPhase[] = [
  {
    id: "1", sort_order: 1, number: "01", title: "Discover", description: "Understanding the problem before solving it.",
    content: "<p>Every project starts with listening. I dig into the brief, the business goals, and — most importantly — the people we're designing for. No assumptions, no shortcuts.</p><ul><li>Stakeholder interviews & goal alignment</li><li>User research & desk research</li><li>Competitive landscape analysis</li><li>Problem framing & opportunity mapping</li></ul>",
  },
  {
    id: "2", sort_order: 2, number: "02", title: "Define", description: "Turning insights into a clear direction.",
    content: "<p>Research without synthesis is just noise. In this phase I translate findings into a focused problem statement and a design direction that aligns stakeholders — before a single pixel is placed.</p><ul><li>Insight synthesis & affinity mapping</li><li>How Might We framing</li><li>Success metrics definition</li><li>Design brief sign-off</li></ul>",
  },
  {
    id: "3", sort_order: 3, number: "03", title: "Design", description: "Building the solution iteratively.",
    content: "<p>I design in loops, not lines. Starting rough and getting progressively detailed — always testing assumptions against real feedback rather than waiting for a perfect version.</p><ul><li>Information architecture & user flows</li><li>Low-fidelity wireframes</li><li>High-fidelity UI with design system components</li><li>Prototype & usability testing</li></ul>",
  },
  {
    id: "4", sort_order: 4, number: "04", title: "Deliver", description: "Handing off work that actually gets built.",
    content: "<p>A great design that can't be built is just a pretty picture. I stay close to engineering through delivery — writing specs, answering questions, and reviewing implementation to make sure what ships matches what was designed.</p><ul><li>Developer-ready Figma specs</li><li>Component documentation</li><li>QA & implementation review</li><li>Post-launch retrospective</li></ul>",
  },
];

const fallbackServices: WorkflowService[] = [
  {
    id: "1", sort_order: 1, service_name: "Mobile & Web Design",
    content: "<p>For mobile and web projects, my process is heavily research-led. I spend significant time understanding user mental models before touching layout or visuals.</p><ul><li><strong>Discovery:</strong> User interviews, journey mapping, heuristic review of existing product</li><li><strong>Architecture:</strong> Information architecture, screen flows, interaction patterns</li><li><strong>Visual layer:</strong> Component-based UI, responsive behavior, micro-interactions</li><li><strong>Handoff:</strong> Figma with auto-layout, tokens, and annotated specs</li></ul>",
  },
  {
    id: "2", sort_order: 2, service_name: "Visual Design",
    content: "<p>Visual work without strategic grounding is decoration. I approach every visual project by understanding the brand's voice and audience before making aesthetic decisions.</p><ul><li><strong>Brief:</strong> Brand positioning, tone of voice, reference gathering</li><li><strong>Exploration:</strong> Moodboards, typography studies, color direction</li><li><strong>Execution:</strong> Asset production across formats and contexts</li><li><strong>System:</strong> Documenting usage rules so the work stays consistent over time</li></ul>",
  },
  {
    id: "3", sort_order: 3, service_name: "Project & Product Management",
    content: "<p>Good PM work is mostly facilitation — keeping the right people aligned on the right things at the right time.</p><ul><li><strong>Kickoff:</strong> Goals, scope, constraints, and success metrics defined upfront</li><li><strong>Planning:</strong> Phased roadmap with realistic milestones</li><li><strong>Execution:</strong> Weekly syncs, async updates, blockers surfaced early</li><li><strong>Retrospective:</strong> What shipped, what we learned, what changes next cycle</li></ul>",
  },
  {
    id: "4", sort_order: 4, service_name: "Service Design",
    content: "<p>Service design requires zooming out further than most design work. I map the full system — not just the screens — to find where the real friction lives.</p><ul><li><strong>Research:</strong> Frontline interviews, shadowing, customer feedback analysis</li><li><strong>Mapping:</strong> Service blueprint, ecosystem map, touchpoint inventory</li><li><strong>Redesign:</strong> Prioritised interventions across people, process, and tools</li><li><strong>Pilot:</strong> Test with a small user group, measure, iterate</li></ul>",
  },
];

export async function getWorkflowConfig(): Promise<WorkflowConfig> {
  const supabase = getSupabase();
  if (!supabase) return fallbackConfig;
  const { data } = await supabase.from("workflow_config").select("*").single();
  if (!data) return fallbackConfig;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const r = data as any;
  return {
    headline: r.headline ?? fallbackConfig.headline,
    philosophy: r.philosophy ?? fallbackConfig.philosophy,
    engagement_content: r.engagement_content ?? fallbackConfig.engagement_content,
  };
}

export async function getWorkflowPrinciples(): Promise<WorkflowPrinciple[]> {
  const supabase = getSupabase();
  if (!supabase) return fallbackPrinciples;
  const { data } = await supabase.from("workflow_principles").select("*").order("sort_order", { ascending: true });
  if (!data || data.length === 0) return fallbackPrinciples;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data as any[]).map((r) => ({ id: r.id, sort_order: r.sort_order, title: r.title, description: r.description }));
}

export async function getWorkflowPhases(): Promise<WorkflowPhase[]> {
  const supabase = getSupabase();
  if (!supabase) return fallbackPhases;
  const { data } = await supabase.from("workflow_phases").select("*").order("sort_order", { ascending: true });
  if (!data || data.length === 0) return fallbackPhases;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data as any[]).map((r) => ({ id: r.id, sort_order: r.sort_order, number: r.number, title: r.title, description: r.description, content: r.content ?? "" }));
}

export async function getWorkflowServices(): Promise<WorkflowService[]> {
  const supabase = getSupabase();
  if (!supabase) return fallbackServices;
  const { data } = await supabase.from("workflow_services").select("*").order("sort_order", { ascending: true });
  if (!data || data.length === 0) return fallbackServices;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data as any[]).map((r) => ({ id: r.id, sort_order: r.sort_order, service_name: r.service_name, content: r.content ?? "" }));
}
