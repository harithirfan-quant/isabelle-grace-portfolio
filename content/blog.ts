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
    slug: "leaders-challenge-pressure",
    title: "What The Leaders Challenge Taught Me About Performing Under Pressure",
    date: "Mar 2026",
    category: "Leadership",
    readTime: 5,
    excerpt:
      "Placing 1st Runner Up at a national leadership competition sounds clean in retrospect. In reality, it was weeks of preparation, pivoting on feedback, and learning when to lead and when to listen. Here's what I took away.",
    content: [
      {
        type: "paragraph",
        content:
          "When I entered the Malaysian Leaders of Tomorrow Challenge, I didn't go in expecting to win anything. I went in because I wanted to know where I stood against students from across the country. That ambition to benchmark myself ended up teaching me more than any single course I've taken.",
      },
      {
        type: "heading",
        content: "Preparation Is a Moving Target",
      },
      {
        type: "paragraph",
        content:
          "Most competition prep I'd seen before was linear: research the topic, build the deck, rehearse the pitch. What the Leaders Challenge demanded was something different. The brief shifted. Mentors pushed back. What seemed like a solid argument on Tuesday became shaky by Friday after a panel session exposed its assumptions.",
      },
      {
        type: "paragraph",
        content:
          "I learned to treat my preparation as a living document rather than a finished product. Every piece of feedback was a data point, not a verdict. That shift in framing made me faster at iterating and less defensive about criticism.",
      },
      {
        type: "quote",
        content:
          "Feedback is a data point, not a verdict. The faster you internalize that, the faster you improve.",
      },
      {
        type: "heading",
        content: "The Moment It Clicked: Leading Without Certainty",
      },
      {
        type: "paragraph",
        content:
          "There was a moment midway through the competition where our team disagreed on direction. Not a small disagreement, a fundamental one about what problem we were actually solving. In the past I might have pushed my own view harder, or deferred to whoever seemed most confident.",
      },
      {
        type: "paragraph",
        content:
          "Instead, I asked everyone to write down the single sentence that captured what we were trying to achieve. Three different answers came back. That exercise alone unlocked two hours of tension in ten minutes. We aligned on one sentence and the rest of the work followed.",
      },
      {
        type: "heading",
        content: "What the Result Actually Means",
      },
      {
        type: "paragraph",
        content:
          "Placing 1st Runner Up at a national level is something I'm genuinely proud of. But the outcome I carry forward more than the placement is the process: the ability to stay composed when the ground is shifting, to ask the right clarifying question at the right moment, and to hold a team together through disagreement without making anyone feel dismissed.",
      },
      {
        type: "list",
        content: [
          "Treat preparation as iterative, not linear",
          "Reframe feedback as signal, not judgment",
          "Alignment questions are more valuable than persuasion",
          "Pressure reveals your actual defaults, know what yours are",
        ],
      },
      {
        type: "paragraph",
        content:
          "If I were to give one piece of advice to anyone entering a similar competition: go in curious about your own edges, not just focused on winning. The external result matters less than what you learn about yourself under load.",
      },
    ],
  },
  {
    slug: "goexplore-program-retrospective",
    title: "Planning the Bank Islam GoExplore Program: A Project Retrospective",
    date: "Apr 2026",
    category: "Lessons Learned",
    readTime: 4,
    excerpt:
      "As a Bank Islam Youth Ambassador, I planned and executed an industry visit bringing 20+ faculty students to Bank Islam KL HQ. This is an honest look at what went well, what almost didn't, and what I'd do differently.",
    content: [
      {
        type: "paragraph",
        content:
          "When I became a Bank Islam Youth Ambassador (BIYA), one of the initiatives available to us was the GoExplore Program, an industry visit where students from our faculty visit a Bank Islam branch or headquarters for a firsthand look at real banking operations. The idea sounded exciting. The execution was a different kind of education.",
      },
      {
        type: "heading",
        content: "The Brief",
      },
      {
        type: "paragraph",
        content:
          "My objective was simple on paper: bring a group of students from my faculty at UniMAP to Bank Islam's Kuala Lumpur headquarters, coordinate logistics, and create a meaningful experience that connected classroom learning to industry reality. In practice, that meant managing 20+ participants across travel, scheduling, expectations, and institutional approvals simultaneously.",
      },
      {
        type: "heading",
        content: "What Went Well",
      },
      {
        type: "paragraph",
        content:
          "The biggest win was buy-in. I spent the first week not on logistics, but on communicating the value of the visit clearly to potential participants. That sounds obvious, but a lot of student event organizers skip straight to booking and end up with half the seats filled. By the time we opened registration, the spots filled within 48 hours.",
      },
      {
        type: "paragraph",
        content:
          "The second thing that worked was building buffer time into every checkpoint. Universities have approval layers. Travel has delays. Industry visits have rescheduling risks. I learned to communicate timelines to participants based on the worst-case estimate, not the best case, and it made every step feel smooth even when it wasn't.",
      },
      {
        type: "quote",
        content:
          "Communicate timelines based on the worst-case estimate. People appreciate the buffer far more than they'd resent a false promise.",
      },
      {
        type: "heading",
        content: "What Almost Derailed It",
      },
      {
        type: "paragraph",
        content:
          "Two days before the visit, a documentation issue surfaced with the university's approval chain. I had assumed the process was further along than it was. That assumption nearly cost us the whole trip.",
      },
      {
        type: "paragraph",
        content:
          "The fix required two days of coordinating between three departments at short notice. We made it through, but the lesson was expensive to learn: never assume. Always confirm. Especially on anything with a hard deadline attached.",
      },
      {
        type: "heading",
        content: "Three Things I'd Do Differently",
      },
      {
        type: "list",
        content: [
          "Start institutional approvals two weeks earlier than I think I need to",
          "Assign a co-lead specifically for communications, not just logistics",
          "Build a post-event feedback loop into the program design, not as an afterthought",
        ],
      },
      {
        type: "paragraph",
        content:
          "The GoExplore Program ended up being one of the most valuable things I've been part of at university, not because it went perfectly, but because it demanded real problem-solving under real constraints. That's a different kind of learning than anything that happens inside a lecture hall.",
      },
    ],
  },
  {
    slug: "fundamentals-over-connections",
    title: "Why I Stopped Worrying About Connections and Focused on Fundamentals",
    date: "Feb 2026",
    category: "Strategy",
    readTime: 4,
    excerpt:
      "Every career advice panel you attend will tell you networking is everything. Here's why I think that's incomplete advice, and what I focus on instead as an International Business student.",
    content: [
      {
        type: "paragraph",
        content:
          "Networking is not useless. But the way it's taught to students, attend events, collect business cards, follow up within 24 hours, misses something fundamental. The most valuable professional relationships I've seen aren't built by networking. They're built by doing work that is worth talking about.",
      },
      {
        type: "heading",
        content: "The Connections-First Trap",
      },
      {
        type: "paragraph",
        content:
          "When I started university, I was focused on building the 'right' connections. Attend events. Get on panels. Find mentors. The implicit assumption was that knowing the right people would unlock the right doors. And while that's partially true, it's not the complete picture, because connections built on thin credentials don't survive contact with reality.",
      },
      {
        type: "paragraph",
        content:
          "What I've found is that connections built on substance compound. When you have genuine work to show, a project you ran, a competition you placed in, a problem you solved, conversations shift from 'nice to meet you' to 'let's work together.' That shift is everything.",
      },
      {
        type: "quote",
        content:
          "Connections built on thin credentials don't survive contact with reality. Connections built on substance compound.",
      },
      {
        type: "heading",
        content: "What Fundamentals Actually Look Like",
      },
      {
        type: "paragraph",
        content:
          "By fundamentals, I mean the things that hold up under questioning. Your ability to analyze a situation clearly. Your ability to communicate precisely. Your track record of following through on what you commit to. Your capacity to work under pressure without becoming someone different.",
      },
      {
        type: "paragraph",
        content:
          "None of these require connections to develop. They require reps. They require putting yourself in situations that are slightly beyond your comfort and actually finishing what you start. That's the work, and most people underinvest in it because it's less visible than attending a networking dinner.",
      },
      {
        type: "heading",
        content: "The Practical Balance",
      },
      {
        type: "list",
        content: [
          "Invest in doing excellent work first, it gives you something to bring to every conversation",
          "Pursue relationships with people who challenge you, not just those who can open doors for you",
          "Let your work travel ahead of you, publish it, present it, put it where others can find it",
          "Follow up after conversations with value, not just thanks, share something relevant",
        ],
      },
      {
        type: "paragraph",
        content:
          "My tagline is 'strong fundamentals and consistent execution open every door.' That's not just a portfolio headline, it's the philosophy I've built my time at university around. Not because connections don't matter, but because the fundamentals are what make the connections worth having.",
      },
    ],
  },
  {
    slug: "google-pm-certificate-honest-review",
    title: "An Honest Review: What the Google PM Certificate Actually Taught Me",
    date: "Jun 2026",
    category: "Lessons Learned",
    readTime: 6,
    excerpt:
      "After completing all 6 courses in the Google Project Management Professional Certificate, I want to be direct about what it teaches, what it doesn't, and whether it's worth the time for business students.",
    content: [
      {
        type: "paragraph",
        content:
          "I finished the Google Project Management Professional Certificate this month, all six courses, the capstone included. It took longer than I expected because I didn't rush it. I wanted to actually use what I was learning, not just complete the modules. Here's an honest account of what you get from it.",
      },
      {
        type: "heading",
        content: "What It Does Extremely Well",
      },
      {
        type: "paragraph",
        content:
          "The Google PM certificate excels at building vocabulary and mental models. Before the course, I understood project management instinctively from running events and programs. After the course, I could name what I was doing, structure it deliberately, and communicate it to others using a shared language.",
      },
      {
        type: "paragraph",
        content:
          "The frameworks, initiation, planning, execution, closing, sound obvious until you see how many student-run projects collapse because nobody defined the closing stage. The Agile and Scrum modules genuinely changed how I think about iteration and scope management. These are not just corporate frameworks; they apply anywhere you're managing complexity.",
      },
      {
        type: "quote",
        content:
          "The certificate doesn't make you a project manager. It makes the invisible structure of project management visible, and that changes how you work.",
      },
      {
        type: "heading",
        content: "What It Doesn't Give You",
      },
      {
        type: "paragraph",
        content:
          "The certificate won't make you a project manager. That happens through doing, not watching. What you get is a scaffold, a way of thinking about planning, risk, stakeholders, and communication that you can then apply in real situations.",
      },
      {
        type: "paragraph",
        content:
          "The capstone project (Applying Project Management in the Real World) was the most useful part of the entire curriculum specifically because it forced application. If I were to advise a friend, I'd say: finish the capstone first in spirit, find a real project you're working on and actively apply the frameworks as you learn them. The knowledge sticks far better.",
      },
      {
        type: "heading",
        content: "The One Thing I Wish I Learned Sooner",
      },
      {
        type: "paragraph",
        content:
          "Stakeholder management is underrated in every curriculum I've encountered. The Google course devotes real attention to it, identifying stakeholders, mapping their influence and interest, communicating proactively. I've since applied this to every initiative I'm involved in, from campus programs to competition teams, and the results have been meaningfully better.",
      },
      {
        type: "heading",
        content: "Who Should Do It",
      },
      {
        type: "list",
        content: [
          "Business students who run events, clubs, or programs, it will professionalize your instincts",
          "Anyone applying for internships where PM or coordination is part of the role",
          "People who manage projects informally and want a shared vocabulary for their team",
          "Not: people who expect the certificate itself to replace demonstrated experience",
        ],
      },
      {
        type: "paragraph",
        content:
          "The certificate is a tool, not a credential. The credential matters on a resume. The tool matters in your actual work. I found real value in both, but I'd estimate the real-world applicability of the frameworks is three times more valuable than the certification itself.",
      },
    ],
  },
  {
    slug: "cfa-research-challenge-experience",
    title: "The CFA Research Challenge: What Finance Students Don't Expect",
    date: "Jun 2026",
    category: "Strategy",
    readTime: 5,
    excerpt:
      "The CFA Research Challenge is one of the most demanding student competitions in finance. Here's what I found most challenging, and most clarifying, about the experience.",
    content: [
      {
        type: "paragraph",
        content:
          "The CFA Research Challenge is a global competition where student teams produce a professional-grade equity research report and present it to a panel of industry analysts. Having participated in it, I can say it's one of the most demanding and rewarding academic experiences I've been part of.",
      },
      {
        type: "heading",
        content: "What the Competition Actually Demands",
      },
      {
        type: "paragraph",
        content:
          "Most people assume it's primarily a finance exercise. It is, but the filter that eliminates most teams isn't the financial modeling. It's the communication. Teams that struggle are the ones that built a technically solid model but couldn't explain their thesis clearly to a panel of senior analysts in fifteen minutes.",
      },
      {
        type: "paragraph",
        content:
          "The discipline required is not just technical. It's editorial. You're essentially writing and presenting an argument about a company's value. Every section of the report needs to connect to that core argument, and every number needs to be defensible in Q&A. That discipline transfers far beyond finance.",
      },
      {
        type: "quote",
        content:
          "The filter that eliminates most teams isn't the financial modeling, it's the ability to communicate a clear, defensible thesis under pressure.",
      },
      {
        type: "heading",
        content: "The Q&A Is Where You Learn Most",
      },
      {
        type: "paragraph",
        content:
          "Nothing exposes the weakness in an argument faster than a sharp question from a senior practitioner. During the presentation Q&A, I found that the questions I couldn't answer immediately were always the ones pointing at assumptions I'd accepted uncritically. That's uncomfortable in the moment. It's invaluable afterward.",
      },
      {
        type: "paragraph",
        content:
          "I came out of the Q&A portion with a much clearer understanding of the difference between a stated assumption and a tested one. That distinction, between 'I think this is true' and 'I've checked whether this holds', is one I now apply in every piece of analysis I do.",
      },
      {
        type: "heading",
        content: "What Carries Forward",
      },
      {
        type: "list",
        content: [
          "Structuring arguments around a core thesis, not a list of observations",
          "Identifying which assumptions carry the most weight in a model",
          "Preparing for adversarial Q&A as part of any formal presentation",
          "Understanding the difference between analysis and narrative",
        ],
      },
      {
        type: "paragraph",
        content:
          "Whether or not you're pursuing a finance career, the research challenge teaches something universally valuable: how to build and defend a structured argument to people who are paid to find its weaknesses. That's a skill that ages well.",
      },
    ],
  },
  {
    slug: "stakeholder-management-campus-to-corporate",
    title: "Stakeholder Management: Notes from Campus Programs to Corporate Rooms",
    date: "May 2026",
    category: "Leadership",
    readTime: 4,
    excerpt:
      "Running campus events, ambassador programs, and competition teams has given me an unexpected education in stakeholder management. Here's what I've learned about keeping everyone aligned without losing the plot.",
    content: [
      {
        type: "paragraph",
        content:
          "Stakeholder management sounds like something that happens in boardrooms and PMO presentations. In reality, it happens everywhere there are multiple people with different interests attached to the same outcome. Campus life is full of it.",
      },
      {
        type: "heading",
        content: "The Two Failure Modes I've Seen Most",
      },
      {
        type: "paragraph",
        content:
          "The first is over-communication: sending updates to everyone about everything, creating noise that makes people tune out the important signals. The second is under-communication: assuming alignment because nobody is complaining, then discovering a misalignment when there's no time to fix it.",
      },
      {
        type: "paragraph",
        content:
          "The answer isn't to find a perfect middle volume. It's to segment deliberately. Not everyone needs every update. What each stakeholder needs is the subset of information that is relevant to their interest and decision-making. Mapping that explicitly, even informally, changes the quality of every communication you send.",
      },
      {
        type: "quote",
        content:
          "What each stakeholder needs is the information relevant to their interest. Sending everyone everything is not communication, it's noise.",
      },
      {
        type: "heading",
        content: "The RIYI Experience",
      },
      {
        type: "paragraph",
        content:
          "Being selected for the REHDA Institute RIYI Mentorship Programme, among 60 students from 15 universities nationally, exposed me to a different tier of stakeholder complexity. Working with senior industry mentors, institutional coordinators, and peers across institutions simultaneously requires a different level of intentionality about how you show up in each relationship.",
      },
      {
        type: "paragraph",
        content:
          "What I've noticed is that senior stakeholders value specificity and accountability above almost everything else. They don't need frequent contact. They need to know that when you do contact them, you've done your homework and you're making a specific, considered ask.",
      },
      {
        type: "heading",
        content: "A Framework That's Worked for Me",
      },
      {
        type: "list",
        content: [
          "Map stakeholders by interest (what they care about) and influence (how much they can affect the outcome)",
          "Set expectations explicitly at the start of any initiative, don't assume shared understanding",
          "Proactive bad news beats reactive surprises every time",
          "Build feedback loops into the program design, not as an afterthought",
        ],
      },
      {
        type: "paragraph",
        content:
          "The best feedback I've received as an ambassador and program organizer has consistently been about follow-through, showing up when you said you would, sending what you promised, delivering what was expected. That sounds basic. But in environments where the norm is to overcommit and underdeliver, consistency is a genuine differentiator.",
      },
    ],
  },
  {
    slug: "youth-ambassador-brand-authenticity",
    title: "Being a Youth Ambassador: Between Brand Representation and Authenticity",
    date: "Mar 2026",
    category: "Career",
    readTime: 4,
    excerpt:
      "Representing a brand on campus as a Youth Ambassador is a different kind of communication challenge than most academic experiences prepare you for. Here's what I found most demanding about the role.",
    content: [
      {
        type: "paragraph",
        content:
          "When Bank Islam appointed me as a Youth Ambassador, my initial instinct was to approach it like a presentation, prepare a message, deliver it clearly, repeat. A few weeks in, I realized the role demanded something more nuanced: the ability to translate a brand's identity into a conversation that felt genuine to a student audience.",
      },
      {
        type: "heading",
        content: "The Credibility Problem",
      },
      {
        type: "paragraph",
        content:
          "Students are a uniquely discerning audience for institutional messaging. They know when they're being marketed to, and they disengage immediately when that's all they're being offered. The challenge of being an effective ambassador isn't to repeat talking points, it's to understand the talking points well enough to engage with them critically and honestly.",
      },
      {
        type: "paragraph",
        content:
          "When a student asked me whether Bank Islam's financial products were actually suitable for someone without a stable income, I didn't deflect to a brochure. We had an actual conversation about it. That conversation built more credibility than any prepared pitch would have.",
      },
      {
        type: "quote",
        content:
          "The most effective brand representation isn't reciting the message, it's understanding the message well enough to engage with it critically.",
      },
      {
        type: "heading",
        content: "What the Role Teaches About Communication",
      },
      {
        type: "paragraph",
        content:
          "The ambassador role is essentially an applied communication exercise. You're constantly calibrating: what does this person actually want to know, and what's the most honest, useful version of that information I can provide? That calibration, done repeatedly over a semester, builds a communication instinct that translates directly into professional settings.",
      },
      {
        type: "heading",
        content: "Representing Without Losing Yourself",
      },
      {
        type: "list",
        content: [
          "Know the product or institution well enough to engage with criticism, not just praise",
          "Separate your personal credibility from the brand's credibility, both matter",
          "Be willing to say 'I don't know' when you don't, and follow up when you do",
          "Audiences trust people before they trust institutions",
        ],
      },
      {
        type: "paragraph",
        content:
          "The role ended when my ambassadorship concluded, but the communication habits it built didn't. Being comfortable in the intersection of representing something beyond yourself while staying authentic, that's a professional skill that shows up everywhere. I'm glad I developed it early.",
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
        .slice(0, Math.max(0, count - blogPosts.filter((p) => p.slug !== slug && p.category === current.category).length))
    )
    .slice(0, count);
}
