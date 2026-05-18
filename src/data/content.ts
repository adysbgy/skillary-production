export const NAV_ITEMS = [
  ["home", "Home"],
  ["explore", "Explore"],
  ["teams", "For Teams"],
  ["community", "Community"],
  ["about", "About"],
  ["contact", "Contact"],
] as const;

export const CATEGORIES = [
  { title: "Business Communication", desc: "Present ideas clearly, confidently, and professionally.", tag: "Popular" },
  { title: "Data & Analytics", desc: "Turn data into insight with practical business thinking.", tag: "Trending" },
  { title: "Power BI & Reporting", desc: "Build dashboards and reports that drive decisions.", tag: "Practical" },
  { title: "Front-End Development", desc: "Learn the foundations of modern web development.", tag: "Career Skill" },
  { title: "AI Productivity", desc: "Use AI tools to work faster and smarter every day.", tag: "New" },
  { title: "Career & Professional Growth", desc: "Develop skills for work readiness and long-term growth.", tag: "Recommended" },
];

export const PROGRAMS = [
  {
    slug: "data-storytelling-for-professionals",
    title: "Data Storytelling for Professionals",
    description: "Learn how to turn analysis into a compelling narrative for reports, presentations, and decision-making.",
    level: "Beginner",
    duration: "4 Weeks",
    format: "Course",
    category: "Data & Analytics",
    skills: ["Storytelling", "Insight", "Presentation"],
    outcomes: [
      "Understand the structure of strong data stories",
      "Highlight insights more clearly and persuasively",
      "Improve data-driven presentations and reports",
      "Build confidence when communicating analysis",
    ],
    audience: [
      "Professionals working with reports or dashboards",
      "Managers who need to present insights clearly",
      "Analysts who want stronger communication skills",
      "Beginners who want a practical entry point into data storytelling",
    ],
    modules: [
      { title: "Understanding Data Stories", desc: "Learn the role of narrative, audience, and structure in turning data into meaningful communication." },
      { title: "Framing Insights Clearly", desc: "Identify the right message, remove noise, and shape stronger takeaways from analysis." },
      { title: "Visualizing for Decision Making", desc: "Understand what makes a chart, dashboard, or slide easier to read and act on." },
      { title: "Building the Final Story", desc: "Combine narrative flow, visuals, and practical framing into a stronger professional output." },
    ],
  },
  {
    slug: "power-bi-foundations",
    title: "Power BI Foundations",
    description: "Build dashboards, create reports, and understand the logic behind practical business visualization.",
    level: "Beginner",
    duration: "5 Weeks",
    format: "Learning Path",
    category: "Power BI & Reporting",
    skills: ["Power BI", "Dashboard", "Reporting"],
    outcomes: [
      "Navigate the Power BI environment with confidence",
      "Connect, clean, and model real data sources",
      "Build interactive dashboards from scratch",
      "Share reports and automate refresh schedules",
    ],
    audience: [
      "Analysts transitioning from Excel to BI tools",
      "Business users who need self-service reporting",
      "Team leads who want visual progress tracking",
      "Anyone starting their data visualization journey",
    ],
    modules: [
      { title: "Getting Started with Power BI", desc: "Install, set up, and understand the Power BI interface and key concepts." },
      { title: "Connecting & Shaping Data", desc: "Import data from various sources and transform it using Power Query." },
      { title: "Building Visualizations", desc: "Create charts, tables, and KPI cards that communicate clearly." },
      { title: "DAX Essentials", desc: "Write basic measures and calculated columns to power your reports." },
      { title: "Publishing & Sharing", desc: "Deploy reports to the Power BI service and set up scheduled refreshes." },
    ],
  },
  {
    slug: "introduction-to-front-end-development",
    title: "Introduction to Front-End Development",
    description: "Start your web development journey with HTML, CSS, and JavaScript fundamentals.",
    level: "Beginner",
    duration: "6 Weeks",
    format: "Path",
    category: "Front-End Development",
    skills: ["HTML", "CSS", "JavaScript"],
    outcomes: [
      "Understand the core structure of modern web pages",
      "Build a responsive layout using CSS Flexbox and Grid",
      "Add interactivity with JavaScript fundamentals",
      "Complete a portfolio-ready landing page project",
    ],
    audience: [
      "Complete beginners with no coding experience",
      "Designers who want to understand development",
      "Career switchers exploring tech roles",
      "Students preparing for front-end internships",
    ],
    modules: [
      { title: "HTML Foundations", desc: "Learn semantic HTML and build the skeleton of a web page." },
      { title: "CSS Essentials", desc: "Style layouts with modern CSS including Flexbox and basic Grid." },
      { title: "Responsive Design Basics", desc: "Make pages adapt beautifully to any screen size." },
      { title: "JavaScript Basics", desc: "Add interactivity with variables, events, and DOM manipulation." },
      { title: "Final Guided Project", desc: "Build a complete responsive portfolio landing page from scratch." },
    ],
  },
  {
    slug: "ai-productivity-for-work",
    title: "AI Productivity for Work",
    description: "Use AI tools to improve workflows, writing, research, and daily professional productivity.",
    level: "All Levels",
    duration: "2 Weeks",
    format: "Guided Project",
    category: "AI Productivity",
    skills: ["AI", "Workflow", "Prompting"],
    outcomes: [
      "Use ChatGPT and similar tools for real work tasks",
      "Write effective prompts for research, writing, and analysis",
      "Automate repetitive workflows with AI assistance",
      "Evaluate when AI adds value vs. when it doesn't",
    ],
    audience: [
      "Professionals curious about using AI at work",
      "Managers looking to boost team productivity",
      "Writers and researchers looking for AI workflows",
      "Anyone who wants practical AI skills, not theory",
    ],
    modules: [
      { title: "AI Tools Landscape", desc: "Understand the current AI tools available and which ones matter for work." },
      { title: "Prompt Engineering Basics", desc: "Learn techniques for writing clear, effective, and reusable prompts." },
      { title: "Guided Project: AI Workflow", desc: "Build a complete AI-assisted workflow for a real professional task." },
    ],
  },
  {
    slug: "business-presentation-essentials",
    title: "Business Presentation Essentials",
    description: "Structure ideas, strengthen message clarity, and deliver presentations with more confidence.",
    level: "Beginner",
    duration: "3 Weeks",
    format: "Course",
    category: "Business Communication",
    skills: ["Presentation", "Communication", "Confidence"],
    outcomes: [
      "Structure a presentation with a clear story arc",
      "Design slides that support rather than distract",
      "Speak with more clarity and confidence",
      "Handle Q&A sessions professionally",
    ],
    audience: [
      "Professionals who present regularly to stakeholders",
      "Team leads preparing reports or proposals",
      "Students entering the professional workforce",
      "Anyone who wants to communicate ideas more effectively",
    ],
    modules: [
      { title: "Message Architecture", desc: "Define your core message and structure supporting points logically." },
      { title: "Visual Design Principles", desc: "Create clean, professional slides that amplify your message." },
      { title: "Delivery & Confidence", desc: "Practice vocal clarity, pacing, and audience engagement techniques." },
    ],
  },
  {
    slug: "excel-for-decision-making",
    title: "Excel for Decision Making",
    description: "Use Excel more strategically for analysis, reporting, and practical decision support.",
    level: "Beginner",
    duration: "3 Weeks",
    format: "Course",
    category: "Data & Analytics",
    skills: ["Excel", "Analysis", "Decision Making"],
    outcomes: [
      "Move beyond basic formulas into analytical thinking",
      "Build summary reports and scenario models",
      "Use pivot tables and conditional formatting effectively",
      "Present data-driven recommendations clearly",
    ],
    audience: [
      "Professionals who use Excel daily but want deeper skills",
      "Analysts building reports for leadership",
      "Operations teams tracking KPIs and metrics",
      "Anyone making business decisions with spreadsheet data",
    ],
    modules: [
      { title: "Beyond the Basics", desc: "Master VLOOKUP, INDEX-MATCH, and logical functions for real analysis." },
      { title: "Pivot Tables & Charts", desc: "Summarize large datasets and create visual reports quickly." },
      { title: "Scenario Modeling", desc: "Build models that help stakeholders evaluate options and make decisions." },
    ],
  },
] as const;

export const TESTIMONIALS = [
  {
    quote: "Skillary helped me learn with more structure. The path was clear, the materials were practical, and I could actually apply what I learned.",
    name: "Alya N.",
    role: "Junior Data Analyst",
  },
  {
    quote: "What I liked most was not just the content, but the feeling that I was progressing step by step.",
    name: "Raka M.",
    role: "Career Switcher",
  },
  {
    quote: "The guided projects made learning feel real. It wasn't just watching lessons — I built something.",
    name: "Dina K.",
    role: "Front-End Learner",
  },
] as const;

export const EVENTS = [
  {
    title: "Free Class: Data Storytelling Basics",
    type: "Free Session",
    desc: "A practical entry session for learners who want clearer communication with data.",
  },
  {
    title: "Mentor Office Hour: Front-End for Beginners",
    type: "Office Hour",
    desc: "Ask questions, get guidance, and understand how to start building on the web.",
  },
  {
    title: "Community Session: AI Tools for Daily Work",
    type: "Community",
    desc: "Explore simple ways to use AI tools to improve productivity and workflows.",
  },
] as const;

export const MENTORS = [
  { name: "Alya S.", role: "Frontend Engineer", initials: "AS", color: "from-[rgb(255,138,0)] to-[rgb(255,138,0)]" },
  { name: "Rian T.", role: "Data Analyst", initials: "RT", color: "from-[rgb(255,90,95)] to-[rgb(255,138,0)]" },
  { name: "Nadia P.", role: "Communication Trainer", initials: "NP", color: "from-[rgb(255,138,0)] to-[rgb(255,138,0)]" },
  { name: "Bimo R.", role: "AI Productivity Consultant", initials: "BR", color: "from-[rgb(255,138,0)] to-[rgb(255,90,95)]" },
] as const;

export const TEAM_LOGOS = [
  "Tokopedia", "Gojek", "Telkom", "BCA", "Astra", "Unilever",
] as const;

export const BLOG_POSTS = [
  {
    slug: "why-practical-learning-matters",
    title: "Why Practical Learning Matters More Than Theory",
    excerpt: "Explore why hands-on skills and real-world application are the keys to lasting professional growth in today's workplace.",
    date: "2025-04-10",
    category: "Learning",
    readTime: "5 min read",
    content: [
      "In the rapidly evolving professional landscape, the gap between what we learn in classrooms and what we actually need at work has never been wider. Traditional education emphasizes theory, examinations, and memorization — but modern workplaces reward application, problem-solving, and adaptability.",
      "Practical learning flips the script. Instead of absorbing information passively, learners engage with real scenarios, build projects, and solve problems that mirror actual challenges. This approach creates deeper retention because knowledge is tied to experience, not just words on a page.",
      "Research consistently shows that people retain only 10% of what they read, but up to 75% of what they practice. This is why guided projects, hands-on workshops, and scenario-based learning outperform lecture-heavy curricula in nearly every measurable outcome.",
      "At Skillary, we design every program around this principle. Whether it's building a Power BI dashboard from real data or crafting a business presentation with structured feedback, learners walk away with skills they can use immediately — not just certificates to hang on a wall.",
      "The takeaway is simple: if your learning doesn't change how you work, it hasn't worked. Practical learning bridges that gap, making growth tangible, measurable, and directly applicable to what matters most — your real-world impact.",
    ],
  },
  {
    slug: "data-storytelling-beginners-guide",
    title: "A Beginner's Guide to Data Storytelling",
    excerpt: "Learn how to turn raw data into compelling narratives that drive better decisions and clearer communication.",
    date: "2025-04-05",
    category: "Data & Analytics",
    readTime: "7 min read",
    content: [
      "Data is everywhere, but insight is rare. The difference between a spreadsheet full of numbers and a presentation that changes decisions comes down to one skill: data storytelling. It's the ability to frame data around a narrative that your audience can understand, trust, and act upon.",
      "A strong data story has three components: context, insight, and recommendation. Context sets the stage — what question are we answering and why does it matter? Insight is the core finding — what does the data actually tell us? Recommendation is the action — what should we do about it?",
      "One of the biggest mistakes beginners make is showing all the data. Effective storytelling means reducing noise. Your audience doesn't need to see every variable or every chart. They need the key takeaway, framed clearly and supported with just enough evidence to be credible.",
      "Visual design matters too. Clean charts with minimal clutter, consistent colors, and clear labels make data easier to process. Avoid 3D charts, excessive gridlines, and decorative elements that distract from the message. Simplicity is your strongest tool.",
      "Start small: pick one report or presentation you deliver regularly and try restructuring it around a single narrative. Lead with the insight, support it with two or three visuals, and end with a clear recommendation. You'll notice the difference in how your audience responds.",
      "Data storytelling isn't a gift — it's a craft. And like any craft, it improves with practice. Skillary's Data Storytelling for Professionals program is designed specifically for people who work with data but want to communicate it more clearly and persuasively.",
    ],
  },
  {
    slug: "ai-tools-for-everyday-work",
    title: "5 AI Tools That Actually Improve Your Daily Work",
    excerpt: "Cut through the hype — here are practical AI tools that professionals are using right now to save time and improve output.",
    date: "2025-03-28",
    category: "AI Productivity",
    readTime: "6 min read",
    content: [
      "AI has gone from a buzzword to a daily work companion. But with hundreds of tools launching every week, it's hard to know which ones are genuinely useful and which are just noise. Here are five tools that professionals across different roles are actually using every day to work faster and better.",
      "1. ChatGPT (or Claude) for writing and thinking. Beyond generating drafts, these tools are excellent for brainstorming, refining unclear ideas, rewriting emails for tone, and summarizing long documents. The key is treating them as a thought partner, not a replacement for thinking.",
      "2. Notion AI for organizing work. If you already use Notion for project management or documentation, its built-in AI features can summarize meeting notes, generate action items, and help structure complex pages in seconds. It saves hours of administrative overhead each week.",
      "3. Gamma for presentations. Stop spending two hours formatting slides. Gamma generates visually clean, well-structured presentations from a simple outline. It's not perfect for every use case, but for internal decks and quick proposals, it's a significant time-saver.",
      "4. Microsoft Copilot in Excel. For anyone who works with spreadsheets, Copilot can generate formulas, create pivot tables, and highlight trends — all from plain language requests. It dramatically lowers the barrier for people who aren't Excel power users.",
      "5. Perplexity for research. Unlike traditional search engines, Perplexity gives you sourced, synthesized answers instead of a list of links. It's particularly useful for market research, competitive analysis, and quick fact-checking during work tasks.",
      "The common thread across all these tools is the same: they don't replace your expertise, they amplify it. The professionals who benefit most from AI are those who know their domain well and use AI to work faster within it. That's the mindset Skillary's AI Productivity for Work program is built around — practical application, not hype.",
    ],
  },
];

export function getProgramBySlug(slug: string) {
  return PROGRAMS.find((p) => p.slug === slug) ?? null;
}

export function getBlogPostBySlug(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}

