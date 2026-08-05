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
  location: "Bintulu, Sarawak / Perlis, Malaysia",
  email: "isabellegrace3@outlook.com",
  timezone: "MYT (GMT+8)",
  languages: [
    "English (fluent)",
    "Malay (fluent)",
    "Japanese (working proficiency)",
  ],
  gpa: "3.80 / 4.00",
  deansAward: "Dean's Award Recipient: 3.95 GPA (Sem 1, 2025)",
  photo: "",
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
  lastUpdated: "August 2026",
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
    "Bintulu Port Scholar",
    "MyNext Campus Ambassador",
    "Google PM Certified",
    "3.80 GPA",
  ],
  resumeDate: "August 2026",
  scrollHint: "Scroll",
};

/* ===========================================================================
 * ABOUT
 * EDIT THIS: bio paragraphs, milestones, skills, and photo.
 * ======================================================================== */

export const about = {
  photo: "",
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
    "Bintulu Port Scholar 2025: placed in L&D / HRM division",
    "TalentCorp MyNext Campus Ambassador 25/26: 3+ career events, virtual sessions",
    "Dean's Award Recipient: 3.95 GPA (Sem 1, 2025)",
    "RIYI Mentorship Programme: selected among students nationwide",
    "1st Place: CoGLIEx 2023 (50+ teams, UiTM)",
  ],
  skillsSummary:
    "Certified in Google Project Management and Business Analysis. I speak English and Malay, with working Japanese.",
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
    resume: true,
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
    role: "Trainee, Learning & Development / HRM",
    company: "Bintulu Port Holdings Berhad",
    type: "Full-time \u00b7 On-site",
    logo: "",
    location: "Bintulu, Sarawak",
    dates: "Jul 2026 to Oct 2026",
    description:
      "Training placement in the Learning and Development and Human Resource Management division of a major Malaysian port operator. Supporting talent development programmes, internal training coordination, and workforce planning.",
    skills: ["L&D Operations", "HRM", "Stakeholder Management"],
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
  role: "Trainee, Learning & Development",
  company: "Bintulu Port Holdings Berhad",
  companyLogo: "",
  blurb:
    "My placement at Bintulu Port puts me inside the Learning and Development team, where I support the systems and processes that keep talent moving through a major national infrastructure operator.",
  dailyWork: [
    {
      time: "Daily",
      title: "Support training programme coordination",
      description:
        "Help plan, schedule, and track internal training sessions across departments, making sure the right people are in the right sessions at the right time.",
      tools: ["Training ops", "Scheduling"],
    },
    {
      time: "Daily",
      title: "Maintain L&D records and reporting",
      description:
        "Keep training logs, attendance records, and compliance documentation organised so the team can pull reports without scrambling.",
      tools: ["Documentation", "Excel"],
    },
    {
      time: "Regularly",
      title: "Assist with workforce planning admin",
      description:
        "Support the HRM team with talent pipeline tracking, onboarding documentation, and internal communications across the organisation.",
      tools: ["HRM", "Stakeholder coordination"],
    },
    {
      time: "Ongoing",
      title: "Learn how a port actually runs",
      description:
        "Study the operational rhythms of a major logistics hub so the L&D programmes I support actually match what the workforce needs on the ground.",
      tools: ["Operations awareness"],
    },
    {
      time: "Every project",
      title: "Double-check before it ships",
      description:
        "Review training materials and communications before they go out. When something touches personnel records or compliance, I confirm with leadership before acting.",
      tools: ["Quality assurance"],
    },
    {
      time: "When it matters",
      title: "Know when to stop and escalate",
      description:
        "When a task touches sensitive employee data, I stop rather than deciding the privacy question on my own assumptions, and take it to the right person before proceeding.",
      tools: ["Confidentiality"],
    },
  ],
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
    url: "https://www.instagram.com/harith11975/p/DbKNm83j05f/",
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
  {
    outlet: "Universiti Malaysia Perlis",
    title:
      "Congratulations to UniMAP student on Malaysian Leaders of Tomorrow Challenge success",
    event: "Malaysian Leaders of Tomorrow Challenge",
    date: "Feb 2026",
    url: "https://www.unimap.edu.my/berita/2026/02/tahniah-pelajar-unimap-atas-kejayaan-malaysian-leaders-tomorrow-challenge/",
    type: "news" as const,
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
    title: "1st Place: CoGLIEx 2023",
    issuer: "Universiti Teknologi MARA",
    date: "2023",
    credentialId: "",
    category: "Competitions",
    url: "",
  },
];

/* ===========================================================================
 * PROJECTS
 * ======================================================================== */

export const projects = [
  {
    title: "Personal Branding: Soft Launch Your Career",
    description:
      "Co-hosted a virtual career development session for MyNext, guiding students through LinkedIn profile building, personal branding strategy, and career launch readiness.",
    url: "https://www.instagram.com/harith11975/p/DbKNm83j05f/",
    repo: null,
    tags: ["Career Development", "Event Management", "LinkedIn"],
    image: "",
    featured: false,
  },
];

/* ===========================================================================
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
      highlight: "",
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
      highlight: "",
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
      highlight: "",
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
      highlight: "",
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
      highlight: "",
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
  url: "https://isabelle-grace-portfolio.vercel.app",
  metaTitle: "Isabelle Grace, International Business Student",
  ogTagline:
    "International Business Student | Open to Roles in Business, People Operations & L&D",
  metaDescription:
    "Portfolio of Isabelle Grace, an International Business student at UniMAP. Bintulu Port Scholar. MyNext Campus Ambassador. Open to roles in business, L&D, and people operations.",
  alumniOf: ["Universiti Malaysia Perlis"],
  firstName: "Isabelle",
  lastName: "Grace",
  fullName: "Isabelle Grace Poly",
  email: "isabellegrace3@outlook.com",
  resumeDate: "August 2026",
};
