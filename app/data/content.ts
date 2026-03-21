/**
 * Centralised content data for the portfolio.
 * Edit this file to change copy without touching component code.
 */

/* -------------------------------------------------------------------------- */
/*  Intro section                                                              */
/* -------------------------------------------------------------------------- */

export interface IntroOption {
  id: string;
  label: string;
  content: string;
  /** If true the content contains raw HTML (links etc.) */
  isHtml?: boolean;
}

export const INTRO_OPTIONS: IntroOption[] = [
  {
    id: "anyone",
    label: "For everyone",
    content:
      `<span class="relative inline-block group cursor-crosshair"><span class="underline decoration-1 underline-offset-[0.1em]">Hello there</span><img src="/images/kenobi.png" alt="General Kenobi!" class="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 w-[200px] sm:w-[280px] rounded-3xl opacity-0 scale-90 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:scale-100 z-50 shadow-2xl origin-bottom" /></span>, I’m a developer who doesn’t blindly rely on AI. I actually care about code quality and create UIs that no AI slop can match.`,
    isHtml: true,
  },
  {
    id: "recruiters",
    label: "For recruiters",
    content:
      "I’m a Full-Stack Software Engineer with a strong emphasis on web development. Whether you need stunning UIs, exceptional user flows, APIs with near-perfect uptime (better than GitHub), or someone to manage your cloud infrastructure, I’ve got you covered. I’m currently open to full-time roles, internships, or freelance opportunities.",
  },
  {
    id: "product-designers",
    label: "For product designers",
    content:
      "I’m the dev partner you actually enjoy working with. I translate your Figma files into pixel-perfect, responsive code with smooth animations and thoughtful interactions and I can even jump into the Figma file to help refine things if needed. We’ll iterate together until the product feels as beautiful in the browser as it does on the canvas.",
  },
  {
    id: "engineers",
    label: "For engineers",
    content:
      "I’m a systems thinker who writes clean, maintainable, performant code. Whether it’s architecting scalable backends, optimizing APIs, integrating third-party services, or mentoring juniors, I speak your language fluently. I’ve built full-stack apps from zero to production and love geeking out over tech choices that actually matter.",
  },
];

export interface ProjectItem {
  name: string;
  description: string;
  link: string;
  image: string;
  featured: boolean;
  tech: string;
}

export const PROJECTS: ProjectItem[] = [
  {
  name: "Actually Fair",
  description: "Built and shipped a transparent e-commerce platform that cuts retail hype and markups — selling high-quality women's athleisure, backpacks, and accessories at fair, flat 14% margins over cost. Focused on clean design, seamless shopping flows, and real value for active users.",
  link: "https://actuallyfair.in/",
  image: "actuallyfair.png",  
  featured: true,  
  tech: "Headless Shopify, Next.js, Tailwind, Railway",
},
  {
    name: "6Pistons Media",
    description: "Built and shipped a fast, modern media platform for automotive creators — from content feeds to seamless video embeds. Delivered real engagement for a growing audience.",
    link: "https://6pistons.com",
    image: "6pistons.png",
    featured: true,
    tech: "Next.js, Tailwind, Vercel",
  },
  {
    name: "SS Healthcare",
    description: "Designed and coded a complete veterinary healthcare platform with multilingual support and smooth appointment flows. Made complex tools feel simple and trustworthy.",
    link: "https://healthcare.yashd.in/",
    image: "sshealthcare.png",
    featured: true,
    tech: "Next.js, Tailwind, Vercel, Google Translate",
  },
  {
    name: "Strive Consultancy",
    description: "Crafted a sharp, professional website for a business consultancy — clean services pages, strong presence, delivered under tight deadlines.",
    link: "http://striveconsultancy.yashd.in/",
    image: "strive.png",
    featured: true,
    tech: "Next.js, Tailwind, Vercel",
  },
  {
    name: "Totso",
    description: "Built an abroad education assistant with integrated payments and intuitive flows. Helped students discover opportunities and complete applications end-to-end.",
    link: "https://sangam.totso.io/",
    image: "totso.png",
    featured: true,
    tech: "Next.js, Tailwind, EC2, Razorpay",
  },
  {
    name: "Adeon",
    description: "Designed and developed a sleek developer suite — focused on performance, clean interfaces, and real utility for builders.",
    link: "https://adeon.me/",
    image: "adeon.png",
    featured: false,
    tech: "Next.js, Tailwind, EC2, Shadcn",
  },
  {
    name: "Neurotechh",
    description: "Led full-stack development for a thriving student developer community. Scaled from zero to hundreds of active members with collaborative tools and Sanity-powered content.",
    link: "https://neurotechh.xyz",
    image: "neurotechh.png",
    featured: false,
    tech: "Next.js, Tailwind, Vercel, SanityCMS",
  },
  {
    name: "Taqneeq Fest App",
    description: "Shipped the official mobile app for a major college fest using Flutter. Handled real-time updates for 500+ attendees with clean, reliable Firebase integration.",
    link: "https://www.taqneeqfest.com/app",
    image: "tq.png",
    featured: false,
    tech: "Flutter, Firebase",
  },
  {
    name: "ACM MPSTME Website",
    description: "Built a modern, performant website for the student chapter — events, resources, and community hub executed with precision.",
    link: "https://mpstmeacm.com",
    image: "acm.png",
    featured: false,
    tech: "Next.js, Tailwind, Hetzner",
  },
  
];
/* -------------------------------------------------------------------------- */
/*  References                                                                 */
/* -------------------------------------------------------------------------- */

export interface ReferenceItem {
  quote: string;
  person: string;
  personUrl: string;
  role: string;
}

export const REFERENCES: ReferenceItem[] = [];

/* -------------------------------------------------------------------------- */
/*  Nav sections (used for scroll-spy + nav list)                              */
/* -------------------------------------------------------------------------- */

export const NAV_SECTIONS = [
  { id: "intro", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "values", label: "Beliefs" },
  { id: "background", label: "Projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;
