/**
 * ============================================================================
 *  CASE STUDIES CONTENT
 * ============================================================================
 *  Add new case studies by appending to the `caseStudies` array.
 *  Each case study maps to a project in content/portfolio.ts by slug.
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
    role: "Team Lead",
    tags: ["React", "Vercel", "Career Tech", "Product Strategy"],
    overview:
      "Trajectory is a career intelligence platform built for the Talentbank Tech Hackathon 2026, the first cohort of a national challenge to build Asia's Career OS. The compulsory brief was open ended: build a better job platform than what exists today, covering both how employers find talent and how candidates discover and grow in careers. We had 28 days. Our answer was to stop selling destinations and start showing routes, so the product opens with a simple promise: turn by turn navigation, never the destination. Submitted to the First Cohort in July 2026. The Panel reviews every build, and the top ten teams present live at the Grand Finale in Kuala Lumpur on 29 August 2026.",
    challenge: {
      title: "The Challenge",
      content: [
        "The compulsory module was a Career Marketplace covering both sides of hiring. That is an enormous surface area for four weeks, and the guidelines were explicit that breadth without depth impresses nobody: five half working modules score worse than one flow that runs end to end.",
        "The deeper problem was the one the industry has normalised. Most job platforms are built for the employer. Salaries hide behind the phrase 'competitive remuneration'. Applications disappear into silence with no obligation on the company. Career advice skews optimistic, showing the success stories and quietly omitting the people who left the field entirely.",
        "Judging weighted Product and UX Thinking most heavily of the five criteria, which made the failure mode clear from day one. The documented pitfall was building an AI thing for careers instead of solving a specific, named Career OS problem. Avoiding that was a scoping discipline, not a technical one.",
        "Leading a team through a fixed 28 day window added its own constraint. Everyone had ideas worth building. Very few of them could survive the timeline.",
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
    relatedSlugs: ["suriasnap", "leaders-challenge"],
  },
  {
    slug: "suriasnap",
    projectSlug: "SuriaSnap",
    title: "SuriaSnap",
    subtitle: "Building and shipping a web application as a business student with no CS background",
    category: "Product & Engineering",
    timeline: "2025",
    role: "Sole Builder",
    tags: ["Next.js", "Vercel", "React", "Frontend", "Product"],
    overview:
      "SuriaSnap is a modern web application I built and deployed on Vercel. The project started as a challenge to myself: could I, as an International Business student, learn enough about modern web development to ship something real? The answer turned out to be yes, and the process taught me more about product thinking, iteration, and deployment than I expected.",
    challenge: {
      title: "The Challenge",
      content: [
        "The primary challenge wasn't technical, it was mindset. Business students are taught to analyze, evaluate, and recommend. Building requires a different mode: make a decision, ship it, observe what happens, and iterate. Those two modes are in real tension.",
        "I also had to navigate a steep learning curve with a modern stack (Next.js, Tailwind, Vercel deployment pipeline) while simultaneously trying to make product decisions about what the application should actually do and for whom.",
        "The temptation throughout was to keep planning and research rather than build. Overcoming that tendency, choosing imperfect action over perfect preparation, was the core challenge of this project.",
      ],
    },
    approach: {
      title: "The Approach",
      content: [
        "I constrained the scope aggressively. Instead of building every feature I could think of, I identified the single most valuable thing I could ship and started there. This meant making uncomfortable tradeoffs about what to cut.",
        "I used Vercel's deployment pipeline to get something live quickly, which created accountability. Once it's public, the bar for quality shifts. That psychological pressure was useful, it stopped me from over-engineering and pushed me toward practical decisions.",
        "Every time I got stuck on a technical decision, I defaulted to whichever option was simpler to explain. Simplicity as a tiebreaker is underrated in product development.",
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
    relatedSlugs: ["trajectory", "goexplore-program"],
  },
  {
    slug: "goexplore-program",
    projectSlug: "Bank Islam GoExplore Program",
    title: "Bank Islam GoExplore Program",
    subtitle: "Planning and executing an industry visit from inception to debrief for 20+ students",
    category: "Event Planning & Leadership",
    timeline: "2026",
    role: "Program Lead (BIYA)",
    tags: ["Event Management", "Program Planning", "Stakeholder Management", "Leadership"],
    overview:
      "As a Bank Islam Youth Ambassador (BIYA), I independently planned and executed the GoExplore Program, an immersive industry visit bringing 20+ faculty students from UniMAP to Bank Islam's Kuala Lumpur headquarters. The program was designed to bridge the gap between classroom finance and real banking operations, giving students firsthand exposure to corporate banking environments.",
    challenge: {
      title: "The Challenge",
      content: [
        "The central challenge was coordinating across multiple organizations simultaneously: the university (approvals and logistics), Bank Islam (scheduling and access coordination), and 20+ individual students with different availability constraints and expectations.",
        "Budget constraints meant the program had to be designed efficiently, transportation, scheduling, and communication all had to be planned with minimal margin for error.",
        "Institutional approval chains at universities are longer than most event organizers anticipate. This nearly derailed the timeline on two separate occasions.",
      ],
    },
    approach: {
      title: "The Approach",
      content: [
        "I started with stakeholder mapping before touching any logistics. Who needed to approve what, in what order, with what lead time? That map became the backbone of the project timeline.",
        "Communications were segmented deliberately: university administrators received formal documentation with institutional language. Students received practical, casual updates with clear action items. Bank Islam contacts received professional correspondence with specific asks and clear timelines.",
        "I built 48-hour buffers into every critical approval stage after the first near-miss. That buffer absorbed the second documentation delay without impacting the visit date.",
        "Post-visit, I ran a brief debrief session and collected structured feedback. That feedback directly shaped the report I submitted to Bank Islam, and will inform the next iteration of the program.",
      ],
    },
    metrics: [
      {
        label: "Participants",
        value: "20+",
        description: "Faculty students from UniMAP",
      },
      {
        label: "Completion Rate",
        value: "100%",
        description: "All registered participants completed the visit",
      },
      {
        label: "Stakeholder Groups",
        value: "3",
        description: "University, Bank Islam, and student participants coordinated simultaneously",
      },
    ],
    lessons: [
      "Map institutional approval chains before building any timeline",
      "Buffer time for approvals should be 2x what you think is sufficient",
      "Segmenting communications by stakeholder type is more work upfront and much less work overall",
      "Post-event debrief creates value for future iterations, build it into the design",
    ],
    tools: [
      "Microsoft Excel (logistics tracking)",
      "Email coordination",
      "University systems",
      "Documentation and reporting",
    ],
    relatedSlugs: ["suriasnap", "leaders-challenge"],
  },
  {
    slug: "leaders-challenge",
    projectSlug: "The Leaders Challenge",
    title: "The Leaders Challenge Competition",
    subtitle: "Placing 1st Runner Up at a national leadership competition: strategy, preparation, and performance",
    category: "Competition & Strategy",
    timeline: "Feb 2026",
    role: "Team Member",
    tags: ["Leadership", "Strategy", "Public Speaking", "Competition"],
    overview:
      "The Malaysian Leaders of Tomorrow Challenge is a national-level leadership competition drawing students from universities across Malaysia. Our team placed 1st Runner Up. This case study examines the preparation strategy, team dynamics, and decision-making process that shaped our performance, and what I'd do differently.",
    challenge: {
      title: "The Challenge",
      content: [
        "The competition brief demanded both analytical rigor and compelling communication. Teams were required to analyze a complex business or social challenge, develop a structured recommendation, and present it persuasively to a panel of industry judges.",
        "The primary challenge was not the content, it was the pressure of high-stakes presentation to experienced practitioners who are paid to find weaknesses in arguments. Our team had to build a thesis that was both ambitious and defensible.",
        "A secondary challenge was internal alignment. Three strong opinions on direction meant the first week of preparation was navigating disagreement without losing momentum.",
      ],
    },
    approach: {
      title: "The Approach",
      content: [
        "We spent the first session on one question only: what is the single sentence that captures our core argument? Until we had consensus on that sentence, no slides, no research framework, and no division of work was agreed on.",
        "Once aligned, we divided the work not by section but by function, one person was responsible for the analytical core, one for narrative coherence, and one for the presentation layer. Each function had ownership and accountability.",
        "We prepared specifically for adversarial Q&A. Every assumption in our recommendation was listed, and we challenged each other on the weakest ones. The questions we couldn't answer in practice were the ones we fortified in the final submission.",
        "The communication layer received equal weight as the analytical layer. A well-argued thesis presented poorly loses to a decent thesis presented confidently. We rehearsed the presentation eleven times.",
      ],
    },
    metrics: [
      {
        label: "Result",
        value: "1st Runner Up",
        description: "National level, competing against teams from universities across Malaysia",
      },
      {
        label: "Rehearsals",
        value: "11",
        description: "Full run-throughs of the final presentation",
      },
      {
        label: "Media Coverage",
        value: "3 outlets",
        description: "The Star, NKF Newsletter, UniMAP official page",
      },
    ],
    lessons: [
      "Alignment on the core thesis must come before any division of work",
      "Preparing for adversarial Q&A reveals the weakest points in your argument",
      "Communication quality is weighted as heavily as analytical quality in high-stakes settings",
      "Strong team dynamics under pressure require explicit agreements, not assumed understanding",
    ],
    tools: [
      "Research and analysis",
      "PowerPoint / presentation design",
      "Structured argumentation frameworks",
      "Stakeholder Q&A simulation",
    ],
    relatedSlugs: ["trajectory", "goexplore-program"],
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
