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
  ctaLabel: string;
  /** If true the content contains raw HTML (links etc.) */
  isHtml?: boolean;
}

export const INTRO_OPTIONS: IntroOption[] = [
  {
    id: "anyone",
    label: "For everyone",
    content: `<span class="relative inline-block group cursor-crosshair"><span class="underline decoration-[2px] underline-offset-[0.1em]">Hello there</span><img src="/images/kenobi.png" alt="General Kenobi!" class="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 md:left-auto md:right-full md:translate-x-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:mb-0 md:mr-6 w-[200px] sm:w-[280px] rounded-3xl opacity-0 scale-90 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:scale-100 z-50 shadow-2xl origin-bottom md:origin-right" /></span>, I build polished full-stack and headless Shopify sites with clean code and sharp UI.`,
    ctaLabel: "Talk now",
    isHtml: true,
  },
  {
    id: "recruiters",
    label: "For recruiters",
    content:
      "I’m a full-stack engineer focused on polished web products, headless Shopify builds, APIs, integrations, and cloud setups.",
    ctaLabel: "Discuss a role",
  },
  {
    id: "product-designers",
    label: "For product designers",
    content:
      "I turn Figma into responsive, production-ready UI with crisp motion, careful details, and strong commerce flows.",
    ctaLabel: "Plan the build",
  },
  {
    id: "engineers",
    label: "For engineers",
    content:
      "I write clean code across frontend, backend, APIs, integrations, and headless Shopify storefronts.",
    ctaLabel: "Talk architecture",
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
    description:
      "Built a transparent e-commerce platform with clean shopping flows and flat 14% margins over cost.",
    link: "https://actuallyfair.in/",
    image: "actuallyfair.png",
    featured: true,
    tech: "Headless Shopify, Next.js, Tailwind, Railway",
  },
  {
    name: "6Pistons Media",
    description:
      "Built a fast automotive media platform with content feeds, video embeds, and a modern publishing flow.",
    link: "https://6pistons.com",
    image: "6pistons.png",
    featured: true,
    tech: "Next.js, Tailwind, Vercel",
  },
  {
    name: "SS Healthcare",
    description:
      "Designed and coded a veterinary healthcare platform with multilingual support and appointments.",
    link: "https://healthcare.yashd.in/",
    image: "sshealthcare.png",
    featured: true,
    tech: "Next.js, Tailwind, Vercel, Google Translate",
  },
  {
    name: "Strive Consultancy",
    description:
      "Crafted a sharp business consultancy site with clean services pages and a strong presence.",
    link: "http://striveconsultancy.yashd.in/",
    image: "strive.png",
    featured: true,
    tech: "Next.js, Tailwind, Vercel",
  },
  {
    name: "Totso",
    description:
      "Built an abroad education assistant with payments, discovery, and application flows.",
    link: "https://sangam.totso.io/",
    image: "totso.png",
    featured: true,
    tech: "Next.js, Tailwind, EC2, Razorpay",
  },
  {
    name: "Adeon",
    description:
      "Designed and developed a focused developer suite with clean interfaces and real utility.",
    link: "https://adeon.me/",
    image: "adeon.png",
    featured: false,
    tech: "Next.js, Tailwind, EC2, Shadcn",
  },
  {
    name: "Neurotechh",
    description:
      "Led full-stack development for a student developer community with tools and Sanity content.",
    link: "https://neurotechh.xyz",
    image: "neurotechh.png",
    featured: false,
    tech: "Next.js, Tailwind, Vercel, SanityCMS",
  },
  {
    name: "Taqneeq Fest App",
    description:
      "Shipped a Flutter fest app with real-time Firebase updates for 500+ attendees.",
    link: "https://www.taqneeqfest.com/app",
    image: "tq.png",
    featured: false,
    tech: "Flutter, Firebase",
  },
  {
    name: "ACM MPSTME Website",
    description:
      "Built a performant student chapter site for events, resources, and community updates.",
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
