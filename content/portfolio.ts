import {
  GraduationCap,
  Briefcase,
  Code2,
  Target,
  PieChart,
  Headphones,
  Globe,
  BarChart3,
  Phone,
  Mail,
  MapPin,
  Github,
  FileText,
  Building2,
  BadgeCheck,
  Layers,
  ClipboardCheck,
  BookOpenCheck,
  Trophy,
  Medal,
  Award,
  Star,
  Crown,
} from "lucide-react";

/* ===========================================================================
 * HERO
 * EDIT THIS: Your name, tagline, and a couple of highlight pills.
 * ======================================================================== */

export const personal = {
  fullName: "Isabelle Grace Poly",
  preferredName: "Isabelle Grace",
  title:
    "International Business Student | Open to Roles in Business, Strategy & Beyond",
  tagline:
    "I study International Business at UniMAP and train at Bintulu Port.",
  location: "Miri / Perlis, Malaysia",
  email: "isabellegraceworkspace@gmail.com",
  timezone: "MYT (GMT+8)",
  languages: [
    "English (fluent)",
    "Malay (fluent)",
    "Mandarin (working proficiency)",
  ],
  gpa: "3.80 / 4.00",
  deansAward: "Dean's Award Recipient: 3.95 GPA (Sem 1, 2025)",
  photo: "/isabelle-photo.jpg",
  photoCrop: { top: 0, left: 0, scale: 100 },
  hero: {
    url: "",
    alt: "Isabelle Grace",
  },
  cvUrl: "/resume.pdf",
};

export const socials = {
  linkedin: "https://www.linkedin.com/in/isabelle-grace-8a9749390/",
  instagram: "https://www.instagram.com/isabellegrace3/",
  projectUrl: "",
};

/* ===========================================================================
 * RESUME CONFIG
 * ======================================================================== */

export const resume = {
  file: "/resume.pdf",
  lastUpdated: "October 2026",
  // Resume PDF is live at /public/resume.pdf (added October 2026).
  available: true,
};

export const navItems = [
  { id: "about", label: "About", primary: true },
  { id: "spotlight", label: "Currently", primary: true },
  { id: "press", label: "Featured In" },
  { id: "experience", label: "Experience", primary: true },
  { id: "ambassador", label: "Ambassador", primary: true },
  { id: "highlights", label: "Highlights" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "projects", label: "Projects", primary: true },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const education = [
  {
    school: "Universiti Malaysia Perlis",
    degree: "Bachelor of Business, International Business",
    dates: "Oct 2024 to Oct 2027",
    grade: "",
    highlights: ["Microsoft Excel", "Analytical Skills"],
    logo: "unimap",
    logoImage: "/logos/unimap.png",
  },
];

/* Skills radar (remapped from skills bars for the radar component) */
export const radarSkills = [
  { subject: "Project Management", A: 88, fullMark: 100 },
  { subject: "Business Analysis", A: 82, fullMark: 100 },
  { subject: "Data Analysis", A: 78, fullMark: 100 },
  { subject: "Event Coordination", A: 90, fullMark: 100 },
  { subject: "Stakeholder Mgmt", A: 85, fullMark: 100 },
  { subject: "Excel & Tools", A: 83, fullMark: 100 },
];

export const hero = {
  name: "Isabelle Grace",
  tagline:
    "International Business Student | Open to Roles in Business, Strategy & Beyond",
  subtext:
    "I study International Business at UniMAP and train at Bintulu Port.",
  pills: [
    "Bintulu Port Scholar 2025",
    "MyNext Campus Ambassador",
    "3.80 GPA",
  ],
  socialProof: [
    "Huawei Sales Elite 1st Place",
    "Bintulu Port Scholar",
    "MyNext Ambassador",
  ],
  resumeDate: "October 2026",
  scrollHint: "Scroll",
};

/* ===========================================================================
 * ABOUT
 * EDIT THIS: bio paragraphs, milestones, skills, and photo.
 * ======================================================================== */

export const about = {
  photo: "/isabelle-photo.jpg",
  photoCrop: { top: 0, left: 0, scale: 100 },
  gpa: "3.80 / 4.00",
  gpaLabel: "CGPA",
  award: "Dean's Award",
  awardDetail: "3.95 \u00b7 Sem 1 2025",
  hero: {
    url: "",
    alt: "Isabelle Grace",
  },
  bio: [
    "I study International Business at UniMAP. Outside class I run campus programmes and national competitions while training with Bintulu Port's Learning and Development team.",
    "I've co-hosted career readiness sessions that reached hundreds of students, represented MyNext on the ground at national-scale careers events, and earned a competitive port scholarship that put me inside a real HR division.",
    "I'm looking for a role where I'm embedded where the work actually happens: sitting with the people who run operations, turning real challenges into action, and owning the outcome from first question to final deliverable. The settings I'm drawn to are high-stakes and human, where what you build touches actual people on actual teams.",
  ],
  milestones: [
    "1st Place (B2C) + Best Solution Design Award: Huawei Malaysia Sales Elite Challenge 2026",
    "2nd SIC 2026: Consolation Prize + Best Poster (SEDA Innovation Challenge, Team HazyHorlick)",
    "Grand Finalist: IFoA × PIAM VoltVision Challenge 2026 (Team HIETech)",
    "Bintulu Port Scholar 2025: placed in L&D / HRM division",
    "TalentCorp MyNext Campus Ambassador 25/26: 3+ career events, virtual sessions",
    "Dean's Award Recipient: 3.95 GPA (Sem 1, 2025)",
    "RIYI Mentorship Programme: selected among students nationwide",
    "1st Place: CoGLIEx 2023 (50+ teams, UiTM)",
  ],
  skillsSummary:
    "Certified in Google Project Management and Business Analysis. I speak Mandarin, English and Malay.",
  skillTags: [
    "Project Management",
    "Business Analysis",
    "Stakeholder Management",
    "Event Coordination",
    "Market Research",
    "Excel & Data Analysis",
    "Leadership",
    "Compliance Documentation",
  ],
  actionButtons: {
    resume: false,
    linkedin: true,
  },
  linkedinUrl: "https://www.linkedin.com/in/isabelle-grace-8a9749390/",
  instagramUrl: "https://www.instagram.com/isabellegrace3/",
};

/* ===========================================================================
 * EXPERIENCE
 * EDIT THIS: Add entries for every role (internships, programmes, clubs).
 * ======================================================================== */

export const experience = [
  {
    role: "Industrial Trainee, Enterprise Risk Management and Learning & Capability Management",
    company: "Bintulu Port Holdings Berhad",
    type: "Industrial Training · On-site",
    logo: "",
    location: "Bintulu, Sarawak",
    dates: "Jul 2026 to Sep 2026",
    description:
      "Two months inside a major Malaysian port operator, split across two divisions. In Enterprise Risk Management I presented the 4 Moments to open the ERM Challenge Session 2026 in front of senior leadership, built a competitive risk benchmarking study of five Malaysian ports (Bintulu, Kuantan, Westports, Sabah Ports, Tanjung Pelepas), researched PDPA exposure with a risk ownership assessment, and delivered a business continuity threat benchmark of 30 to 50 threat-to-worst-case pairs across 14 risk categories. After transferring to Learning & Capability Management I supported the capability roadshow, updated the BEES e-learning ecosystem, designed materials for the Cohort 2 scholarship award ceremony and study loan process, and ran events including the Special Olympics Malaysia National Games appreciation dinner and the Emerging Leaders Club Annual General Meeting as emcee.",
    skills: ["Enterprise Risk Management", "Risk Benchmarking", "Business Continuity", "L&D Operations", "Event Management"],
    certificate: "",
  },
  {
    role: "Campus Ambassador",
    company: "MyNext by TalentCorp",
    type: "Contract \u00b7 Hybrid",
    logo: "",
    location: "Federal Territory of Kuala Lumpur, Malaysia",
    dates: "Oct 2025 to Present",
    description:
      "Represent MyNext to promote its platform to peers nationally. Co-organised 3+ career development events, co-hosted the Personal Branding: Soft Launch Your Career virtual session reaching students nationally.",
    skills: ["Event Planning", "Brand Ambassadorship", "Stakeholder Coordination"],
    certificate: "",
  },
];

/* ===========================================================================
 * AI / AUTOMATION INTERN SPOTLIGHT (CURRENTLY section)
 * ======================================================================== */

export const aiInternship = {
  role: "Industrial Trainee, Risk and Learning & Capability",
  company: "Bintulu Port Holdings Berhad",
  companyLogo: "",
  blurb:
    "My placement at Bintulu Port ran across two divisions: Enterprise Risk Management first, then Learning and Capability Management. Here is what that actually looked like.",
  dailyWork: [
    {
      time: "Opening the session",
      title: "Present the 4 Moments to leadership",
      description:
        "Prepared and delivered the slide deck on health, safety and environment, integrity, corporate values and corporate culture that opened the ERM Challenge Session 2026, then captured the transcript and the questions management raised as a standing department record.",
      tools: ["Risk communication", "Minute taking"],
    },
    {
      time: "Four weeks",
      title: "Benchmark risk disclosure across five Malaysian ports",
      description:
        "Compared how Bintulu Port, Kuantan Port, Westports, Sabah Ports and Port Tanjung Pelepas each describe their risks, mapped every disclosure into a fixed set of categories, and turned it into a top-three-risks comparison and a dashboard a reader can interpret at a glance.",
      tools: ["Excel", "Benchmarking"],
    },
    {
      time: "Research strand",
      title: "Assess PDPA exposure and risk ownership",
      description:
        "Studied Personal Data Protection Act exposure across Malaysian ports and asked who actually owns each risk, because that question decides whether anything happens about it.",
      tools: ["Regulatory research"],
    },
    {
      time: "One deliverable",
      title: "Build the business continuity threat list",
      description:
        "Wrote a Bintulu Port specific benchmark of 30 to 50 threat-to-worst-case scenario pairs across 14 risk categories, each anchored in the port's real operating context rather than generic industry examples.",
      tools: ["Business continuity"],
    },
    {
      time: "After the transfer",
      title: "Support training and scholarship programmes",
      description:
        "In Learning and Capability Management I helped run the capability roadshow, updated the BEES e-learning ecosystem with employee account and department data, and designed the posters for the Cohort 2 Scholarship Award Ceremony, the Scholarship Immersion Programme and the study loan process.",
      tools: ["Canva", "E-learning systems"],
    },
    {
      time: "Events",
      title: "Run the events and take the mic",
      description:
        "Joined the Special Olympics Malaysia National Games 2026 appreciation dinner committee and the Scholarship Award Ceremony Cohort 2 committee, and emceed the Emerging Leaders Club Annual General Meeting on a script I wrote from scratch.",
      tools: ["Event management", "Emceeing"],
    },
  ] as DailyWorkItem[],
};

export type DailyWorkItem = {
  time: string;
  title: string;
  description: string;
  tools?: string[];
};

/* ===========================================================================
 * PRESS
 * EDIT THIS: Media mentions, oldest first. Each entry links to an article.
 * ======================================================================== */

export const press: PressMention[] = [
  {
    outlet: "TalentCorp / MyNext",
    title: "Co-Hosted: Personal Branding ft. LinkedIn",
    event: "MyNext Ambassador Programme",
    date: "Jul 2026",
    // Link pending: the fork pointed at a co-host's personal Instagram post.
    // Ask Isabelle for her own post link, or the official MyNext coverage.
    url: "",
    type: "instagram" as const,
  },
  {
    outlet: "Bintulu Port Holdings Berhad",
    title: "Bintulu Port Scholar 2025: Placement in L&D / HRM",
    event: "Bintulu Port Scholarship",
    date: "2025",
    url: "",
    type: "web" as const,
  },
];

export type PressMention = {
  outlet: string;
  title: string;
  event: string;
  date: string;
  url: string;
  type: "news" | "pdf" | "facebook" | "instagram" | "linkedin" | "web";
  preview?: string;
};

/* ===========================================================================
 * SKILLS
 * EDIT THIS: Bars 0-100. Label + value only; the component renders the bar.
 * ======================================================================== */

export const skills = [
  { label: "Project Management", value: 88 },
  { label: "Business Analysis", value: 82 },
  { label: "Stakeholder Management", value: 85 },
  { label: "Data Analysis", value: 78 },
  { label: "Financial Ops", value: 72 },
  { label: "Event Coordination", value: 90 },
  { label: "Excel & Tools", value: 83 },
  { label: "Leadership", value: 80 },
  { label: "Market Research", value: 76 },
];

export const skillsFootnote =
  "Based on certifications, projects, and real-world experience. Updated regularly.";

/* ===========================================================================
 * EXPERIENCE TIMELINE (HIGHLIGHTS)
 * ======================================================================== */

export type TimelineItem = {
  title: string;
  org: string;
  date: string;
  description: string;
  image?: string;
  imageContain?: boolean;
  gallery?: string[];
};

export const timeline: TimelineItem[] = [
  {
    title: "Finalist: International Entrepreneurship Convention 2026",
    org: "IIUM Putrajaya · team HIETech",
    date: "Oct 2026",
    description:
      "Pitched with team HIETech in the International Entrepreneurship Convention pitching competition at IIUM Putrajaya: a halal compliance tool for F&B outlets, shortlisted into the finals from around 150 participants and 48 to 50 teams.",
    image: "",
  },
  {
    title: "1st Place: Huawei Malaysia Sales Elite Challenge 2026",
    org: "Huawei Malaysia",
    date: "Oct 2026",
    description:
      "Won first place in the B2C category of a nationwide sales challenge open to undergraduates across Malaysia, and took the Best Solution Design Award as well.",
    image: "",
  },
  {
    title: "Grand Finalist: IFoA × PIAM VoltVision Challenge 2026",
    org: "Institute and Faculty of Actuaries × PIAM",
    date: "Sep 2026",
    description:
      "Reached the grand final with team HIETech, presenting a strategic roadmap for Malaysia's EV ecosystem to a panel of industry judges.",
    image: "",
  },
  {
    title: "Participant: AI Talent Bootcamp 2026",
    org: "UKM I-COMM × Etiqa · Domain 5: Energy Transition & Sustainability",
    date: "Sep 2026",
    description:
      "Completed the three-day AI Talent Bootcamp with a UniMAP team, working the Energy Transition and Sustainability domain challenge on how AI can optimise operations, improve safety and support sustainability goals.",
    image: "",
  },
  {
    title: "2nd SIC 2026: Consolation Prize + Best Poster",
    org: "SEDA Innovation Challenge @ ISES 2026",
    date: "Aug 2026",
    description:
      "Part of Team HazyHorlick pitching SuriaSnap at the SEDA Innovation Challenge during the 7th International Sustainable Energy Summit at KLCC. The team took home the Consolation Prize in Category B (Build the Future, Prototype) and the Best Poster Award.",
    image: "/achievements/sic2026-awards.jpg",
    imageContain: true,
    gallery: [
      "/achievements/sic2026-booth.jpg",
      "/achievements/sic2026-stage.jpg",
      "/achievements/sic2026-pitch.jpg",
      "/achievements/sic2026-demo.jpg",
    ],
  },
  {
    title: "Co-Host: Personal Branding ft. LinkedIn",
    org: "MyNext by TalentCorp",
    date: "Jul 2026",
    description:
      "Co-hosted a virtual session with a fellow MyNext ambassador, walking students through personal branding, LinkedIn profiles, and how to launch a career with intention.",
    image: "",
  },
  {
    title: "Trainee: L&D / HRM at Bintulu Port",
    org: "Bintulu Port Holdings Berhad",
    date: "Jul 2026",
    description:
      "Started a training placement in Learning and Development, supporting internal programmes and workforce planning at one of Malaysia's major port operators.",
    image: "",
  },
  {
    title: "RIYI Mentorship Programme",
    org: "REHDA Institute",
    date: "Apr 2026",
    description:
      "Selected among students nationwide for a competitive industry-academia initiative, representing UniMAP among 15 universities. Mentored by industry leaders in property development.",
    image: "",
  },
  {
    title: "1st Place: CoGLIEx 2023",
    org: "Universiti Teknologi MARA",
    date: "2023",
    description:
      "Led a team to first place among 50+ teams in the Contemporary Global and Legal Issues Exhibition at UiTM.",
    image: "",
  },
];

/* ===========================================================================
 * TROPHY CASE
 * ======================================================================== */

export type Trophy = {
  icon: string;
  title: string;
  issuer: string;
  date: string;
  image?: string;
  imageContain?: boolean;
};

export const trophyCase: Trophy[] = [
  {
    icon: "Crown",
    title: "Bintulu Port Scholar 2025",
    issuer: "Bintulu Port Holdings Berhad",
    date: "2025",
  },
  {
    icon: "Star",
    title: "Dean's Award: 3.95 GPA",
    issuer: "Universiti Malaysia Perlis",
    date: "Sem 1, 2025",
  },
  {
    icon: "Award",
    title: "Google Project Management Professional",
    issuer: "Google",
    date: "Jun 2026",
  },
  {
    icon: "Trophy",
    title: "RIYI Mentorship Programme",
    issuer: "REHDA Institute",
    date: "Apr 2026",
  },
  {
    icon: "Medal",
    title: "1st Place: CoGLIEx 2023",
    issuer: "Universiti Teknologi MARA (50+ teams)",
    date: "2023",
  },
  {
    icon: "Trophy",
    title: "2nd SIC 2026: Consolation Prize (Category B)",
    issuer: "SEDA / ISES 2026",
    date: "Aug 2026",
    image: "/achievements/sic2026-awards.jpg",
    imageContain: true,
  },
  {
    icon: "Medal",
    title: "2nd SIC 2026: Best Poster Award",
    issuer: "SEDA / ISES 2026",
    date: "Aug 2026",
  },
  {
    icon: "Crown",
    title: "1st Place (B2C): Huawei Sales Elite Challenge 2026",
    issuer: "Huawei Malaysia · nationwide student challenge",
    date: "Oct 2026",
  },
  {
    icon: "Award",
    title: "Best Solution Design Award",
    issuer: "Huawei Malaysia Sales Elite Challenge 2026",
    date: "Oct 2026",
  },
  {
    icon: "Trophy",
    title: "Grand Finalist: IFoA × PIAM VoltVision Challenge 2026",
    issuer: "Institute and Faculty of Actuaries × PIAM",
    date: "Sep 2026",
  },
  {
    icon: "Medal",
    title: "Finalist: International Entrepreneurship Convention 2026",
    issuer: "IIUM Putrajaya · team HIETech",
    date: "Oct 2026",
  },
];

/* ===========================================================================
 * CERTIFICATIONS
 * ======================================================================== */

const CATEGORIES = [
  "All",
  "Google",
  "Finance",
  "Government",
  "Scholarship",
  "Competitions",
];

export { CATEGORIES };

export type Certification = {
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  category: string;
  url: string;
  image?: string;
};

export const certifications: Certification[] = [
  {
    title: "Google Project Management Professional Certificate",
    issuer: "Google",
    date: "Jun 2026",
    credentialId: "",
    category: "Google",
    url: "",
  },
  {
    title: "Google Project Management Specialization Certificate",
    issuer: "Google",
    date: "Jun 2026",
    credentialId: "",
    category: "Google",
    url: "",
  },
  {
    title: "Accelerate Your Job Search with AI",
    issuer: "Google",
    date: "Jun 2026",
    credentialId: "",
    category: "Google",
    url: "",
  },
  {
    title: "Capstone: Applying Project Management in the Real World",
    issuer: "Google",
    date: "Jun 2026",
    credentialId: "",
    category: "Google",
    url: "",
  },
  {
    title: "Project Initiation: Starting a Successful Project",
    issuer: "Google",
    date: "Jan 2026",
    credentialId: "",
    category: "Google",
    url: "",
  },
  {
    title: "Project Planning: Putting It All Together",
    issuer: "Google",
    date: "Feb 2026",
    credentialId: "",
    category: "Google",
    url: "",
  },
  // --- GOVERNMENT ---
  {
    title: "MyNext Campus Ambassador 25/26",
    issuer: "TalentCorp",
    date: "Oct 2025",
    credentialId: "",
    category: "Government",
    url: "",
  },
  // --- SCHOLARSHIP ---
  {
    title: "Bintulu Port Scholar 2025",
    issuer: "Bintulu Port Holdings Berhad",
    date: "2025",
    credentialId: "",
    category: "Scholarship",
    url: "",
  },
  // --- COMPETITIONS ---
  {
    title: "MyDuitStory 6.0 Short Video Competition (Participation)",
    issuer: "Financial Education Network (FEN)",
    date: "2026",
    credentialId: "",
    category: "Competitions",
    url: "",
    image: "/achievements/certs/mds-2026.jpg",
  },
  {
    title: "2nd SIC 2026: Consolation Prize & Best Poster Award",
    issuer: "SEDA Innovation Challenge",
    date: "Aug 2026",
    credentialId: "",
    category: "Competitions",
    url: "",
    image: "/achievements/sic2026-awards.jpg",
  },
  {
    title: "1st Place: CoGLIEx 2023",
    issuer: "Universiti Teknologi MARA",
    date: "2023",
    credentialId: "",
    category: "Competitions",
    url: "",
  },
  {
    title: "1st Place (B2C) + Best Solution Design Award, Huawei Malaysia Sales Elite Challenge 2026",
    issuer: "Huawei Malaysia",
    date: "Oct 2026",
    credentialId: "",
    category: "Competitions",
    url: "",
  },
  {
    title: "Grand Finalist, IFoA × PIAM VoltVision Challenge 2026",
    issuer: "Institute and Faculty of Actuaries × PIAM",
    date: "Sep 2026",
    credentialId: "",
    category: "Competitions",
    url: "",
  },
  {
    title: "Finalist, International Entrepreneurship Convention 2026",
    issuer: "IIUM Putrajaya",
    date: "Oct 2026",
    credentialId: "",
    category: "Competitions",
    url: "",
  },
  {
    title: "AI Talent Bootcamp 2026: Domain 5, Energy Transition & Sustainability",
    issuer: "UKM I-COMM × Etiqa",
    date: "Sep 2026",
    credentialId: "",
    category: "Competitions",
    url: "",
  },
  {
    title: "Bursa Malaysia National Investment Programme (NIP 2026)",
    issuer: "Yayasan Bursa Malaysia",
    date: "Apr 2026",
    credentialId: "",
    category: "Finance",
    url: "",
  },
];

/* ===========================================================================
 * PROJECTS
 * ======================================================================== */

export const projects = [
  {
    title: "Trajectory",
    description:
      "Career intelligence platform: real career paths from starting role to exit, salaries shown upfront, and reports families can read in their own language.",
    url: "https://trajectory.hietech.my",
    repo: null,
    tags: ["React", "Vercel", "Career Tech", "Product"],
    image: "/projects/trajectory-landing.jpg",
    featured: true,
  },
  {
    title: "SuriaSnap",
    description:
      "Solar savings calculator for Malaysian homes. Enter your roof, get a realistic system size, cost, and payback in minutes, with verified installers from the SEDA registry. The team won Consolation Prize and Best Poster at SEDA's 2nd SIC 2026 during ISES 2026 at KLCC.",
    url: "https://www.suriasnap.my",
    repo: "https://github.com/harithirfan-quant/suriasnap-frontend",
    tags: ["React", "Tailwind", "Solar", "Frontend"],
    image: "/projects/suriasnap-landing.jpg",
    featured: true,
  },
  {
    title: "Personal Branding: Soft Launch Your Career",
    description:
      "Co-hosted a virtual career development session for MyNext, guiding students through LinkedIn profile building, personal branding strategy, and career launch readiness.",
    // Link pending: the fork pointed at a co-host's personal Instagram post.
    // Ask Isabelle for her own post link once it exists.
    url: "",
    repo: null,
    tags: ["Career Development", "Event Management", "LinkedIn"],
    image: "",
    featured: true,
  },
];

/* ---------------------------------------------------------------------------
 * PINNED WALL (homepage only)
 * The keepsakes stuck on the wallpaper. Sourced from trophyCase above, with a
 * couple of the SIC photos so the wall is not all text.
 *
 * EDIT THIS:
 *  - `ribbon` is the little banner on the corner. Drop the line for no ribbon.
 *  - `tone` picks the card paper: paper | blush | lilac | mint
 *  - `rotate` is the tilt in degrees (keep it under about 2)
 *  - `imageContain` letterboxes a document whole; leave it off for photos
 * ------------------------------------------------------------------------ */
export type WallItem = {
  id: string;
  label: string;
  caption?: string;
  image?: string;
  imageContain?: boolean;
  tone?: "paper" | "blush" | "lilac" | "mint";
  rotate?: number;
  ribbon?: string;
  ribbonTone?: "accent" | "lilac" | "mint";
};

export const wallItems: WallItem[] = [
  {
    id: "bintulu-scholar",
    label: "Bintulu Port Scholar",
    caption: "Bintulu Port Holdings Berhad · 2025",
    tone: "blush",
    rotate: -1.2,
    ribbon: "Scholar",
  },
  {
    id: "deans-award",
    label: "Dean's Award",
    caption: "3.95 GPA · Sem 1, 2025 · UniMAP",
    tone: "paper",
    rotate: 1.4,
    ribbon: "GPA 3.95",
    ribbonTone: "lilac",
  },
  {
    id: "sic-consolation",
    label: "2nd SIC 2026",
    caption: "Consolation Prize, Category B · SEDA @ ISES 2026",
    image: "/achievements/sic2026-awards.jpg",
    imageContain: true,
    tone: "paper",
    rotate: -0.8,
    ribbon: "Prize",
  },
  {
    id: "sic-best-poster",
    label: "Best Poster Award",
    caption: "SEDA Innovation Challenge · KLCC, Aug 2026",
    image: "/achievements/sic2026-booth.jpg",
    tone: "paper",
    rotate: 1.1,
    ribbon: "Best Poster",
    ribbonTone: "mint",
  },
  {
    id: "riyi-mentee",
    label: "RIYI Mentee",
    caption: "REHDA Institute Youth Initiative · Apr 2026",
    tone: "lilac",
    rotate: -1.6,
    ribbon: "Mentee",
    ribbonTone: "lilac",
  },
  {
    id: "cogliex",
    label: "1st Place, CoGLIEx",
    caption: "Universiti Teknologi MARA · 50+ teams · 2023",
    tone: "paper",
    rotate: 1.3,
    ribbon: "1st Place",
  },
];

/* ========================================================================
 * AMBASSADOR SLIDER (MyNext)
 * ======================================================================== */

export type AmbassadorMonth = {
  month: string;
  title: string;
  highlight: string;
  participants: number;
  signups: number;
  photos: string[];
  location: string;
  role: string;
  summary?: string;
  approx?: boolean;
};

export const ambassador = {
  org: "MyNext by TalentCorp",
  period: "Oct 2025 to Jul 2026",
  blurb:
    "Nine months representing MyNext on campus. Slide through the months and open any one to see how that session actually performed.",
  months: [
    {
      month: "Nov 2025",
      title: "Internship Market Week",
      highlight: "/ambassador/nov-2025.jpg",
      participants: 5000,
      signups: 3000,
      photos: [],
      location: "Putrajaya International Convention Centre (PICC)",
      role: "Exhibitor",
      summary:
        "Supported the MyNext booth at one of the largest careers events in the country, introducing the platform to thousands of students.",
      approx: true,
    },
    {
      month: "Dec 2025",
      title: "New Year, New Me. Transform! (MyNext Virtual Talk)",
      highlight: "/ambassador/dec-2025.jpg",
      participants: 65,
      signups: 65,
      photos: [],
      location: "Google Meet",
      role: "Co-organiser",
      summary:
        "Helped plan and run the end of year virtual talk, supporting the project lead on logistics and participant engagement.",
      approx: true,
    },
    {
      month: "Mar 2026",
      title: "Career Accelerator: Master Your Pitch & Profile",
      highlight: "/ambassador/march-2026.jpg",
      participants: 50,
      signups: 50,
      photos: [],
      location: "Google Meet",
      role: "Co-organiser",
      summary:
        "A practical session on sharpening how students present themselves, covering both the pitch and the profile behind it.",
    },
    {
      month: "Apr 2026",
      title: "Career Realities & MyNext Platform Benefits",
      highlight: "/ambassador/apr-2026.jpg",
      participants: 460,
      signups: 460,
      photos: [],
      location: "Google Meet",
      role: "Co-organiser",
      summary:
        "Supported the biggest virtual session of the ambassadorship, with 460 attendees, pairing an honest look at the graduate market with what the platform actually offers.",
    },
    {
      month: "Jul 2026",
      title: "Personal Branding: Soft Launch Your Career ft. LinkedIn",
      highlight: "/ambassador/jul-2026.jpg",
      participants: 0,
      signups: 0,
      photos: [],
      location: "Google Meet",
      role: "Speaker",
      summary:
        "Co-hosted a virtual personal branding session with a fellow ambassador, walking students through LinkedIn profiles and how to launch a career with intention.",
      approx: true,
    },
  ] as AmbassadorMonth[],
};

/* ===========================================================================
 * CONTACT
 * ======================================================================== */

export const contact = {
  openTo:
    "Internships and opportunities across business, people operations, L&D, HRM, and strategy.",
  bookingUrl: null as string | null,
};

/* ===========================================================================
 * SECTION NAV
 * ======================================================================== */

export const sectionNav = {
  primary: ["about", "spotlight", "experience", "ambassador", "projects", "contact"],
  all: [
    "about",
    "spotlight",
    "press",
    "skills",
    "experience",
    "ambassador",
    "projects",
    "certifications",
    "contact",
  ],
};

/* ===========================================================================
 * SITE METADATA
 * ======================================================================== */

export const site = {
  url: "https://isabelle.hietech.my",
  metaTitle: "Isabelle Grace, International Business Student",
  ogTagline:
    "International Business Student | Open to Roles in Business, People Operations & L&D",
  metaDescription:
    "Portfolio of Isabelle Grace, an International Business student at UniMAP. Bintulu Port Scholar. MyNext Campus Ambassador. Open to roles in business, L&D, and people operations.",
  alumniOf: ["Universiti Malaysia Perlis"],
  firstName: "Isabelle",
  lastName: "Grace",
  fullName: "Isabelle Grace Poly",
  email: "isabellegraceworkspace@gmail.com",
  resumeDate: "October 2026",
};
