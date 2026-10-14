

export interface IntroOption {
  id: string;
  label: string;
  content: string;
  ctaLabel: string;

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
];

export interface FAQGroup {
  title: string;
  items: {
    question: string;
    answer: string;
  }[];
}

export const FAQ_GROUPS: FAQGroup[] = [
  {
    title: "Working together",
    items: [
      {
        question: "What kind of websites do you build?",
        answer:
          "I design and build landing pages, business websites and Shopify ecommerce storefronts. The focus is on how your business comes across: clear information, thoughtful design and a site that makes the next step easy for your customers.",
      },
      {
        question: "Do you work with businesses like mine?",
        answer:
          "I work with small and medium businesses, startups and larger companies. My past work includes a therapist, a B2B medical business and ecommerce. You don't need to be in one of those industries to work with me.",
      },
      {
        question: "Why work with you instead of an agency?",
        answer:
          "You work directly with the person designing and building your site. I handle both, so there's no handoff between a designer and a separate development team. If you need a wider team for advertising or ongoing marketing, an agency may be a better fit.",
      },
      {
        question: "Are you based in Mumbai? Can we work remotely?",
        answer: "Yes, I'm based in Mumbai. We can work over calls and messages; you don't need to be here.",
      },
      {
        question: "How do I get started?",
        answer:
          "Send me a short description of your business, what you need the website to do and your existing site, if you have one. If you already have a budget or deadline in mind, include that too. We can take it from there.",
      },
    ],
  },
  {
    title: "Cost and scope",
    items: [
      {
        question: "How much does a website cost?",
        answer:
          "Every business needs something different, so I don't use one fixed price for everyone. The quote depends on the pages, design direction, content, features, ecommerce needs, CMS setup, hosting, integrations, and how involved the build needs to be.",
      },
      {
        question: "What does the quote include?",
        answer:
          "Design and development, not just a mockup. We agree on the pages, features, content management and hosting arrangements before starting, and put the scope in the contract. That way, you know what you're paying for.",
      },
      {
        question: "What if I need more pages or have a smaller budget?",
        answer:
          "If you need more pages, we can include them in the scope before starting. If the budget is tighter, we can narrow the project to the essentials rather than squeeze the same work into a lower price.",
      },
      {
        question: "How do payments work?",
        answer:
          "I take a 10% advance to get started. The remaining amount is paid at agreed project milestones, rather than all upfront.",
      },
      {
        question: "What if I decide not to continue?",
        answer:
          "If you decide not to proceed after seeing the initial work, 60% of the advance is refundable. That means 60% of the advance payment, not 60% of the total project cost. The payment and cancellation terms are set out in the contract.",
      },
    ],
  },
  {
    title: "Design and development",
    items: [
      {
        question: "What does the process look like?",
        answer:
          "We start with a conversation over text or a call, discuss the scope and sign a contract. I then design the site in Figma and build it. You see the design before it becomes a finished website, with feedback along the way.",
      },
      {
        question: "How long will it take?",
        answer:
          "That depends on the size of the site, the features and how ready your content is. I'll agree on a timeline with you before we start. A landing page and an ecommerce storefront shouldn't have the same estimate.",
      },
      {
        question: "How many revisions are included?",
        answer:
          "Design revisions are unlimited until the first approval. Once you approve the design, that revision stage closes. It's worth reviewing the whole design and sharing your feedback before approving it.",
      },
      {
        question: "What technology do you use? Do I need to understand it?",
        answer:
          "No technical knowledge needed. I work with React, Next.js, SvelteKit and Tailwind, with Shopify for ecommerce and a CMS for editable content. The choice depends on the project; you don't need to pick a framework before we talk.",
      },
    ],
  },
  {
    title: "Your site after the build",
    items: [
      {
        question: "Can you redesign my existing WordPress website?",
        answer:
          "I don't work on WordPress. If you want to move away from it, I can design and build a new site. I prefer a fresh build over patching an existing codebase.",
      },
      {
        question: "Can I update the website myself?",
        answer:
          "Yes. I include a CMS dashboard so you can edit content yourself without touching code. We agree on what you need to manage, whether that's text, images, products or other content.",
      },
      {
        question: "Who handles hosting? Are there recurring costs?",
        answer:
          "For landing pages, I handle hosting on my Cloudflare setup at no extra hosting cost. Ecommerce hosting is paid separately because its usage costs are different. Shopify and other paid services are separate from the build fee; we'll clarify what your project needs in the quote.",
      },
      {
        question: "Do you build online stores too?",
        answer:
          "Yes. I build custom storefronts with Shopify handling the commerce side, and help with setup, checkout, payment gateways and content management. Marketing and automation aren't included in the standard ecommerce scope.",
      },
      {
        question: "What about maintenance or changes later?",
        answer:
          "The CMS lets you handle content updates yourself. Larger design or feature changes aren't included as ongoing revisions to the original build. If you expect regular development work after launch, bring that up when we discuss the scope.",
      },
    ],
  },
];

export interface ReferenceItem {
  quote: string;
  person: string;
  personUrl: string;
  role: string;
}

export const REFERENCES: ReferenceItem[] = [];

export const NAV_SECTIONS = [
  { id: "intro", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "faq", label: "FAQ" },
  { id: "values", label: "Beliefs" },
  { id: "process", label: "How I work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;
