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
    content: `<span class="relative inline-block group cursor-crosshair"><span class="underline decoration-[2px] underline-offset-[0.1em]">Hello there</span><img src="/images/kenobi.png" alt="General Kenobi!" class="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 md:left-auto md:right-full md:translate-x-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:mb-0 md:mr-6 w-[200px] sm:w-[280px] rounded-3xl opacity-0 scale-90 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:scale-100 z-50 shadow-2xl origin-bottom md:origin-right" /></span>, I design and build polished websites that feel considered, work smoothly, and can grow into serious products.`,
    ctaLabel: "Talk now",
    isHtml: true,
  },
  {
    id: "recruiters",
    label: "For recruiters",
    content:
      "I'm a web designer and developer focused on polished interfaces, thoughtful fullstack execution, and production-ready builds.",
    ctaLabel: "Discuss a role",
  },
  {
    id: "ecommerce-businesses",
    label: "For ecommerce",
    content:
      "I design storefronts that feel premium before they ask people to buy, then build the Shopify pieces that make products, carts, checkout, and content behave.",
    ctaLabel: "Talk Shopify",
  },
  {
    id: "product-designers",
    label: "For product designers",
    content:
      "I turn Figma into responsive, production-ready UI with crisp motion, careful details, and enough engineering taste to protect the design.",
    ctaLabel: "Plan the build",
  },
  {
    id: "engineers",
    label: "For engineers",
    content:
      "I write clean frontend code, connect the pieces behind it, and keep APIs, integrations, and deployments quiet and dependable.",
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
      "Designed and built a transparent shopping experience with clear product pages, calm flows, and headless Shopify underneath.",
    link: "https://actuallyfair.in/",
    image: "actuallyfair.png",
    featured: true,
    tech: "Headless Shopify, Next.js, Tailwind, Railway",
  },
  {
    name: "Therapy With Kinnari",
    description:
      "Designed a calming therapy website for sessions, workshops, resources, and a softer booking experience.",
    link: "https://therapywithkinnari.com/",
    image: "twk.png",
    featured: true,
    tech: "Next.js, Sanity",
  },
  {
    name: "Medizone Aesthetics",
    description:
      "Created a premium B2B aesthetics website for PDO threads, training programs, and medical product discovery.",
    link: "https://www.medizoneaesthetics.com/",
    image: "medizone.png",
    featured: true,
    tech: "Next.js, Sanity",
  },
  {
    name: "Strive Consultancy",
    description:
      "Crafted a sharp consultancy website with focused services, restrained visuals, and a clearer business presence.",
    link: "http://striveconsultancy.yashd.in/",
    image: "strive.png",
    featured: false,
    tech: "Next.js, Tailwind, Vercel",
  },
  {
    name: "SS Healthcare",
    description:
      "Designed and coded a veterinary healthcare website with multilingual content and appointment flows.",
    link: "https://healthcare.yashd.in/",
    image: "sshealthcare.png",
    featured: false,
    tech: "Next.js, Tailwind, Vercel, Google Translate",
  },
  {
    name: "ACM MPSTME Website",
    description:
      "Built the official ACM student chapter website with a clean structure for events, blogs, resources, and community work.",
    link: "https://mpstmeacm.com",
    image: "acm.png",
    featured: false,
    tech: "Next.js, Tailwind, Hetzner",
  },
  {
    name: "Cyber Cypher Hackathon",
    description:
      "Designed and built the hackathon website for registrations, event details, and sponsor showcases.",
    link: "https://cybercypher.taqneeqfest.com/",
    image: "cc.png",
    featured: false,
    tech: "Next.js, Tailwind, Hetzner",
  },
  {
    name: "Taqneeq Fest App",
    description:
      "Shipped a practical fest app with schedules, updates, and Firebase-backed information for 500+ attendees.",
    link: "https://www.taqneeqfest.com/app",
    image: "tq.png",
    featured: false,
    tech: "Flutter, Firebase",
  },
  {
    name: "6Pistons Media",
    description:
      "Built a fast automotive media site with a visual content feed, video embeds, and a clean publishing flow.",
    link: "",
    image: "6pistons.png",
    featured: false,
    tech: "Next.js, Tailwind, Vercel",
  },

  {
    name: "Totso",
    description:
      "Built an abroad education product with discovery, application flows, payments, and a clean student-facing interface.",
    link: "",
    image: "totso.png",
    featured: false,
    tech: "Next.js, Tailwind, EC2, Razorpay",
  },
  {
    name: "Adeon",
    description:
      "Designed and developed a focused developer suite with clean interfaces and practical day-to-day utility.",
    link: "",
    image: "adeon.png",
    featured: false,
    tech: "Next.js, Tailwind, EC2, Shadcn",
  },
  {
    name: "Neurotechh",
    description:
      "Led the build for a student developer community website with useful tools, Sanity content, and a maintainable base.",
    link: "",
    image: "neurotechh.png",
    featured: false,
    tech: "Next.js, Tailwind, Vercel, SanityCMS",
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
