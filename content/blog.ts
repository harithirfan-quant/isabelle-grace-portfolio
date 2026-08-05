/**
 * ============================================================================
 *  BLOG / INSIGHTS CONTENT
 * ============================================================================
 *  Add new posts by appending to the `blogPosts` array below.
 *  Each post has a slug (URL path), metadata, and an array of content blocks.
 *
 *  Content block types:
 *    paragraph : a body paragraph
 *    heading   : an H2-level section heading
 *    quote     : a pull quote (shown large with a border)
 *    list      : a bulleted list (content is string[])
 * ============================================================================
 */

export type ContentBlock =
  | { type: "paragraph"; content: string }
  | { type: "heading"; content: string }
  | { type: "quote"; content: string }
  | { type: "list"; content: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: "Strategy" | "Leadership" | "Lessons Learned" | "Career";
  readTime: number; // minutes
  excerpt: string;
  content: ContentBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "co-hosting-career-readiness-session",
    title: "Co-Hosting a Career Readiness Session: What Happens Behind the Scenes",
    date: "Jul 2026",
    category: "Career",
    readTime: 4,
    excerpt:
      "On 25 July, I co-hosted a two-hour virtual session on personal branding and LinkedIn with my fellow MyNext Campus Ambassador. Here is what planning it actually looked like, and what I would repeat.",
    content: [
      {
        type: "paragraph",
        content:
          "Personal Branding: Soft Launch Your Career ft. LinkedIn ran from 8 to 10 PM on a Friday, over Google Meet, with students joining from across the country. Two hours sounds like a lot of runway until you are the one holding the agenda. My co-ambassador and I split the session into three movements: what personal branding actually means, how to build a LinkedIn profile that earns attention, and how to launch a career with intention instead of waiting for opportunity to find you.",
      },
      {
        type: "heading",
        content: "The part nobody sees",
      },
      {
        type: "paragraph",
        content:
          "Before the session there were planning calls, a shared outline that we kept editing right up to the day before, slides that got rebuilt twice, and one full rehearsal over Meet to test timing and transitions. The most useful hour of prep was the dry run. It surfaced the two segments that were running long and the one question we had not prepared an answer for.",
      },
      {
        type: "paragraph",
        content:
          "We also made a deliberate decision about the talk track. Students have heard the advice to 'build your personal brand' a hundred times, usually from people who never explain how. We wanted concrete steps: a headline formula, a photo checklist, a summary section that says what you can do, and a follow-up habit that turns a connection into a conversation.",
      },
      {
        type: "quote",
        content:
          "A good virtual session is planned like a broadcast: structure, timing, and a backup for the moments that go quiet.",
      },
      {
        type: "heading",
        content: "Running the session live",
      },
      {
        type: "paragraph",
        content:
          "The live part taught me more than the prep. Pacing a two-hour Meet means watching the chat while you talk, checking the time without being obvious about it, and keeping energy up when the audience is just a grid of dark rectangles. We built question breaks into the agenda so students could ask things in the moment instead of saving them for the end, and the questions were the best part of the evening.",
      },
      {
        type: "heading",
        content: "What I would repeat",
      },
      {
        type: "list",
        content: [
          "Test the tech before the audience arrives. A five-minute check saves a fifteen-minute scramble.",
          "Leave room in the agenda for questions. The unscripted parts land hardest.",
          "Follow up after the session. We shared the slide deck and a profile checklist so the advice survives past the call.",
          "Co-host with someone you can trade energy with. Split the segments and cover each other's weak spots.",
        ],
      },
      {
        type: "paragraph",
        content:
          "The session was the kind of work I want to do more of: practical, people-facing, and genuinely useful. Personal branding is a practice, not a one-off event, and helping students start that practice is exactly why I joined the MyNext ambassador programme.",
      },
    ],
  },
  {
    slug: "first-month-bintulu-port-ld",
    title: "First Month Inside a Port's Learning and Development Team",
    date: "Jul 2026",
    category: "Lessons Learned",
    readTime: 4,
    excerpt:
      "I started my Bintulu Port Scholar placement on 20 July, working with the Learning and Development and HRM team. A month in, here is what the work actually looks like and what I am learning.",
    content: [
      {
        type: "paragraph",
        content:
          "Bintulu Port is one of Malaysia's major infrastructure operators, and my training placement sits inside its Learning and Development division under Human Resource Management. On paper my role is to support training programme coordination, records, and workforce planning admin. In practice that means I spend my days inside the machinery that keeps a port's people qualified, compliant, and ready.",
      },
      {
        type: "heading",
        content: "What L&D does at a port operator",
      },
      {
        type: "paragraph",
        content:
          "A port cannot stop running for training. Ships dock on schedule, cargo moves on schedule, and the people who run those operations need the right certifications and refreshers at the right time. So L&D at Bintulu Port is less like a classroom department and more like a coordination centre: planning sessions across departments, scheduling the right people into the right programmes, and tracking who has completed what.",
      },
      {
        type: "heading",
        content: "The work lives in the records",
      },
      {
        type: "paragraph",
        content:
          "The most valuable skill I am building is not flashy. It is keeping training logs, attendance records, and compliance documentation accurate enough that the team can pull a report in minutes instead of scrambling through spreadsheets. I have learned to double-check everything that touches personnel data, and to escalate to my supervisor before acting when I am not sure about a privacy question. At a place this size, a small record error can ripple into compliance issues, so careful beats fast every time.",
      },
      {
        type: "quote",
        content:
          "Training at a port is not a classroom exercise. It is how a critical infrastructure operator stays safe, qualified, and ready.",
      },
      {
        type: "heading",
        content: "What surprised me",
      },
      {
        type: "paragraph",
        content:
          "I expected to learn about training. I did not expect to learn about the port itself. To design programmes that match what the workforce needs, I have been studying how the port actually runs: the operational rhythms, the roles that keep it moving, the safety requirements that sit behind every job. Understanding the business makes the L&D work meaningful, because you can see exactly what each programme is protecting.",
      },
      {
        type: "heading",
        content: "What I am getting better at",
      },
      {
        type: "list",
        content: [
          "Attention to detail in records and reporting, because accuracy is the whole job",
          "Excel and documentation habits that scale past one spreadsheet",
          "Communicating with stakeholders across departments without losing context",
          "Knowing when to act and when to ask, especially around sensitive employee data",
        ],
      },
      {
        type: "paragraph",
        content:
          "Four weeks in, I am still closer to the beginning than the end of what this placement can teach me. But the direction is clear: people operations and L&D are where I want to build a career, and there is no better place to learn them than inside a real HR division.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(slug: string, count = 2): BlogPost[] {
  const current = getBlogPost(slug);
  if (!current) return [];
  return blogPosts
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, count)
    .concat(
      blogPosts
        .filter((p) => p.slug !== slug && p.category !== current.category)
        .slice(
          0,
          Math.max(
            0,
            count -
              blogPosts.filter(
                (p) => p.slug !== slug && p.category === current.category
              ).length
          )
        )
    )
    .slice(0, count);
}
