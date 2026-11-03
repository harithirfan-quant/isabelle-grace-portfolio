/**
 * ============================================================================
 *  CASE STUDIES CONTENT
 * ============================================================================
 *  Add new case studies by appending to the `caseStudies` array.
 *  Each case study maps to a project in content/portfolio.ts by slug.
 *
 *  NOTE: These are team projects shared with the broader MyNext / UniMAP
 *  crew. Written in team voice ("we", "our team"). If Isabelle's actual role
 *  in any project differs, update the `role` and overview text to match.
 * ============================================================================
 */

export type CaseStudyMetric = {
  label: string;
  value: string;
  description: string;
};

export type CaseStudySection = {
  title: string;
  content: string[];
};

export type CaseStudy = {
  slug: string;
  projectSlug: string; // matches a project title (used to link back)
  title: string;
  subtitle: string;
  category: string;
  timeline: string;
  role: string;
  tags: string[];
  overview: string;
  challenge: CaseStudySection;
  approach: CaseStudySection;
  metrics: CaseStudyMetric[];
  lessons: string[];
  tools: string[];
  relatedSlugs: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "trajectory",
    projectSlug: "Trajectory",
    title: "Trajectory",
    subtitle:
      "Building a career intelligence platform in 28 days for the Talentbank Tech Hackathon 2026",
    category: "Product & Engineering",
    timeline: "Jun to Jul 2026",
    role: "Team Member",
    tags: ["React", "Vercel", "Career Tech", "Product Strategy"],
    overview:
      "Trajectory is a career intelligence platform built for the Talentbank Tech Hackathon 2026, the first cohort of a national challenge to build Asia's Career OS. The compulsory brief was open ended: build a better job platform than what exists today, covering both how employers find talent and how candidates discover and grow in careers. We had 28 days. Our answer was to stop selling destinations and start showing routes, so the product opens with a simple promise: turn by turn navigation, never the destination. Submitted to the First Cohort in July 2026. The Panel reviews every build, and the top ten teams present live at the Grand Finale in Kuala Lumpur on 29 August 2026.",
    challenge: {
      title: "The Challenge",
      content: [
        "The compulsory module was a Career Marketplace covering both sides of hiring. That is an enormous surface area for four weeks, and the guidelines were explicit that breadth without depth impresses nobody: five half working modules score worse than one flow that runs end to end.",
        "The deeper problem was the one the industry has normalised. Most job platforms are built for the employer. Salaries hide behind the phrase 'competitive remuneration'. Applications disappear into silence with no obligation on the company. Career advice skews optimistic, showing the success stories and quietly omitting the people who left the field entirely.",
        "Judging weighted Product and UX Thinking most heavily of the five criteria, which made the failure mode clear from day one. The documented pitfall was building an AI thing for careers instead of solving a specific, named Career OS problem. Avoiding that was a scoping discipline, not a technical one.",
        "Working as a team through a fixed 28 day window added its own constraint. Everyone had ideas worth building. Very few of them could survive the timeline.",
      ],
    },
    approach: {
      title: "The Approach",
      content: [
        "We locked a single thesis before anyone opened an editor: turn by turn navigation, never the destination. Every proposed feature had to answer to that one sentence, and anything that could not was cut without debate.",
        "We built the Career Path Navigator first and got it running end to end before touching anything else. Pick a role, see twenty people who started exactly where you would start, and see where they actually went.",
        "We made honesty the differentiator rather than a disclaimer. When three of those twenty left the field entirely, the product says so on the front page. Hiding it would have been the dishonest choice, and it is the single detail that makes the rest of the data credible.",
        "Salary transparency was treated as a rule rather than a feature. Every role shows a real range, so a user never reads 'competitive salary' again.",
        "We closed the feedback loop the brief asked for by flagging employer silence. Fourteen days without a response is surfaced publicly, placing the cost on the company rather than on the candidate.",
        "We built for the Malaysian reality that a career decision is a family decision. Trajectory generates a version of your plan a parent can actually read, in Bahasa Malaysia, English, Mandarin or Tamil, delivered over WhatsApp.",
        "We deployed on day one and integrated continuously, because the guidelines are blunt that wiring everything together in the final days is where builds break.",
      ],
    },
    metrics: [
      {
        label: "Build Window",
        value: "28 days",
        description: "Fixed sprint from architecture to production ready submission",
      },
      {
        label: "Audiences Served",
        value: "3 sides",
        description: "Job seekers, employers and universities in one platform",
      },
      {
        label: "Family Reports",
        value: "4 languages",
        description: "Bahasa Malaysia, English, Mandarin and Tamil over WhatsApp",
      },
    ],
    lessons: [
      "Reading the judging rubric before designing the architecture changed what we built. Product thinking carried more weight than technical sophistication.",
      "One flow running end to end beats five half wired modules, every time.",
      "Honest signal is a feature. Showing the people who left the field is precisely what makes the remaining data trustworthy.",
      "Deploy on day one. Integration debt compounds faster than any other kind inside a four week build.",
      "A team divides cleanly only after it agrees on one sentence. Alignment first, division of labour second.",
    ],
    tools: [
      "React",
      "Vercel",
      "Retrieval engine",
      "Salary benchmarking",
      "Multilingual UX",
      "WhatsApp delivery",
    ],
    relatedSlugs: ["suriasnap"],
  },
  {
    slug: "suriasnap",
    projectSlug: "SuriaSnap",
    title: "SuriaSnap",
    subtitle:
      "Building and shipping a web application as business students with no CS background",
    category: "Product & Engineering",
    timeline: "2025 to 2026",
    role: "Team",
    tags: ["Next.js", "Vercel", "React", "Frontend", "Product"],
    overview:
      "SuriaSnap is a modern web application we built and deployed on Vercel. The project started as a challenge to ourselves: could we, as International Business students, learn enough about modern web development to ship something real? The answer turned out to be yes, and the process taught us more about product thinking, iteration, and deployment than we expected.",
    challenge: {
      title: "The Challenge",
      content: [
        "The primary challenge wasn't technical, it was mindset. Business students are taught to analyze, evaluate, and recommend. Building requires a different mode: make a decision, ship it, observe what happens, and iterate. Those two modes are in real tension.",
        "We also had to navigate a steep learning curve with a modern stack (Next.js, Tailwind, Vercel deployment pipeline) while simultaneously trying to make product decisions about what the application should actually do and for whom.",
        "The temptation throughout was to keep planning and research rather than build. Overcoming that tendency, choosing imperfect action over perfect preparation, was the core challenge of this project.",
      ],
    },
    approach: {
      title: "The Approach",
      content: [
        "We constrained the scope aggressively. Instead of building every feature we could think of, we identified the single most valuable thing we could ship and started there. This meant making uncomfortable tradeoffs about what to cut.",
        "We used Vercel's deployment pipeline to get something live quickly, which created accountability. Once it's public, the bar for quality shifts. That psychological pressure was useful, it stopped us from over-engineering and pushed us toward practical decisions.",
        "Every time we got stuck on a technical decision, we defaulted to whichever option was simpler to explain. Simplicity as a tiebreaker is underrated in product development.",
      ],
    },
    metrics: [
      {
        label: "Time to Deploy",
        value: "< 2 weeks",
        description: "From first commit to live production URL",
      },
      {
        label: "Stack",
        value: "Next.js 14",
        description: "App Router, Tailwind CSS, Vercel deployment",
      },
      {
        label: "Iterations",
        value: "15+",
        description: "Commits and improvements post-launch",
      },
    ],
    lessons: [
      "Scope constraint is more valuable than any individual technical skill",
      "Shipping something imperfect publicly is more educational than perfecting privately",
      "Business thinking (user value, prioritization) is a genuine advantage in product work",
      "Simplicity as a decision tiebreaker produces better results than sophistication-seeking",
    ],
    tools: ["Next.js", "React", "Tailwind CSS", "Vercel", "Git", "GitHub"],
    relatedSlugs: ["trajectory"],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getRelatedCaseStudies(slug: string): CaseStudy[] {
  const current = getCaseStudy(slug);
  if (!current) return [];
  return current.relatedSlugs
    .map((s) => getCaseStudy(s))
    .filter((cs): cs is CaseStudy => cs !== undefined);
}
