export type Post = {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  // Detail page fields
  intro: string;
  challenge: string;
  process: {
    step: string;
    description: string;
  }[];
  outcome: string;
  metrics: {
    value: string;
    label: string;
  }[];
  tools: string[];
  coverUrl?: string;
};

export const posts: Post[] = [
  {
    slug: "redesigning-onboarding-flow",
    tag: "Case Study",
    title: "How We Redesigned the Onboarding Flow and Increased Activation by 40%",
    excerpt:
      "A deep dive into the research, design decisions, and iteration process that led to a significant improvement in user activation rate.",
    readTime: "8 min read",
    date: "Dec 2024",
    intro:
      "This is a placeholder introduction for this case study. Describe the product, your role, the team size, and the overall context. What was the business situation? Who were the users? What was at stake? Replace this entire section with your actual story.",
    challenge:
      "Placeholder: Describe the core problem you were solving. What were users struggling with during onboarding? What metrics indicated there was a problem? What constraints (time, tech, business) did you have to work within? Include any relevant data that framed the problem.",
    process: [
      {
        step: "01 — Discovery & Research",
        description:
          "Placeholder: Describe how you gathered insights. What methods did you use — user interviews, session recordings, surveys, analytics? What were the key findings? What assumptions did you challenge? Add the actual research you conducted here.",
      },
      {
        step: "02 — Define & Ideate",
        description:
          "Placeholder: How did you synthesize research into a clear problem statement? What frameworks did you use (HMW, affinity mapping, etc.)? How did you ideate? How many concepts did you explore before converging on a direction?",
      },
      {
        step: "03 — Design & Prototype",
        description:
          "Placeholder: Walk through the design decisions. Why did you make specific choices? What alternatives did you consider and reject? Include notes on the prototype fidelity and what you used it to validate.",
      },
      {
        step: "04 — Test & Iterate",
        description:
          "Placeholder: How did you test the designs? Usability testing, A/B test, beta release? What did you learn? What changed between the first design and the final version? What surprised you?",
      },
    ],
    outcome:
      "Placeholder: Describe the final solution and its impact. What shipped? How did users respond? What did the metrics show? What would you do differently if you could start over?",
    metrics: [
      { value: "+40%", label: "Activation Rate" },
      { value: "-60%", label: "Drop-off at Step 3" },
      { value: "4.7★", label: "App Store Rating" },
    ],
    tools: ["Figma", "Maze", "Notion", "Miro", "Loom"],
  },
  {
    slug: "building-design-system",
    tag: "Design Process",
    title: "Building a Scalable Design System from Scratch",
    excerpt:
      "Lessons learned from creating a design system for a fast-growing startup — from token architecture to component documentation.",
    readTime: "6 min read",
    date: "Oct 2024",
    intro:
      "Placeholder introduction: Set the scene — what was the company, the product, the team, and why did you decide to build a design system? What was the pain point that triggered this initiative? Who were the stakeholders and how did you get buy-in?",
    challenge:
      "Placeholder: Describe the inconsistency problems you were dealing with. Multiple design files? No token system? Developers freestyle-ing styles? What was the cost of not having a system? How did you make the case for it?",
    process: [
      {
        step: "01 — Audit & Inventory",
        description:
          "Placeholder: How did you audit the existing product? What did you find? How many button variants, color values, or font sizes were there? How did you prioritize what to systematize first?",
      },
      {
        step: "02 — Token Architecture",
        description:
          "Placeholder: How did you structure design tokens? Global → alias → component? How did you handle themes, dark mode, or brand variants? How did you name things?",
      },
      {
        step: "03 — Component Library",
        description:
          "Placeholder: How did you build out components? What was your decision-making framework for component scope? How did you document usage, props, and dos/don'ts?",
      },
      {
        step: "04 — Adoption & Governance",
        description:
          "Placeholder: How did you get designers and developers to adopt the system? What documentation did you create? How did you handle contributions and versioning?",
      },
    ],
    outcome:
      "Placeholder: What was the end state? How much time did the system save? Did design-to-dev handoff improve? Any metrics on consistency or velocity? What's the roadmap for the system going forward?",
    metrics: [
      { value: "200+", label: "Components" },
      { value: "3×", label: "Faster Handoff" },
      { value: "1", label: "Source of Truth" },
    ],
    tools: ["Figma", "Storybook", "Zeroheight", "Tokens Studio", "GitHub"],
  },
  {
    slug: "user-interviews-design-sprint",
    tag: "UX Research",
    title: "Why I Conduct User Interviews Before Every Design Sprint",
    excerpt:
      "My framework for running quick, effective user interviews that inform better design decisions without slowing down the team.",
    readTime: "5 min read",
    date: "Aug 2024",
    intro:
      "Placeholder introduction: This article shares your philosophy or process around user research. What convinced you that interviews are essential? Share a story where skipping research led to a bad outcome — or where doing it saved the project.",
    challenge:
      "Placeholder: What's the common pushback you get from teams about user interviews? Not enough time? Too expensive? Stakeholders think they know the user? Address those objections here with your perspective.",
    process: [
      {
        step: "01 — Recruiting the Right Participants",
        description:
          "Placeholder: How do you find and screen participants? What criteria matter most? How many interviews is enough? How do you avoid bias in recruitment?",
      },
      {
        step: "02 — Writing the Interview Guide",
        description:
          "Placeholder: How do you write interview questions that aren't leading? What's your ratio of open to closed questions? How do you structure the session from warm-up to deep dive?",
      },
      {
        step: "03 — Running the Session",
        description:
          "Placeholder: What's your facilitation style? How do you handle silence? How do you probe without leading? What do you do when an interview goes off-script?",
      },
      {
        step: "04 — Synthesizing Insights",
        description:
          "Placeholder: How do you turn 5 hours of interviews into actionable insights? Affinity mapping? Jobs-to-be-done? How do you communicate findings to a team that wasn't in the room?",
      },
    ],
    outcome:
      "Placeholder: Close with your key takeaways and any templates or resources you'd share with the reader. What's the one thing you'd want designers to remember about user interviews?",
    metrics: [
      { value: "5–8", label: "Interviews per Sprint" },
      { value: "2 hrs", label: "Per Session" },
      { value: "100%", label: "Better Decisions" },
    ],
    tools: ["Notion", "Dovetail", "Loom", "Calendly", "Miro"],
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
