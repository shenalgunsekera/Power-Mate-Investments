import type { ProductKey } from "@/data/site";

const en = {
  meta: {
    home: {
      title: "Power Mate Investment, Strengthening Your Financial Power",
      description:
        "Fast, fair and flexible loans for individuals, farmers and businesses across Sri Lanka. Micro, SME, agriculture, gold loans, leasing and insurance.",
    },
    about: {
      title: "About Us, Power Mate Investment",
      description:
        "A trusted Sri Lankan finance partner built on transparency, speed and genuine care for every customer.",
    },
    products: {
      title: "Products & Services, Power Mate Investment",
      description:
        "Explore micro loans, SME loans, agriculture loans, gold loans, leasing and insurance solutions tailored for Sri Lanka.",
    },
    branches: {
      title: "Branch Network, Power Mate Investment",
      description:
        "Find your nearest Power Mate Investment branch. Islandwide service across every province.",
    },
    careers: {
      title: "Careers, Power Mate Investment",
      description:
        "Build a career that strengthens your community. Explore open roles at Power Mate Investment.",
    },
    contact: {
      title: "Contact Us, Power Mate Investment",
      description:
        "Talk to a financial partner who listens. Call, message or visit any of our islandwide branches.",
    },
    faqs: {
      title: "FAQs, Power Mate Investment",
      description:
        "Answers to common questions about loans, eligibility, repayment and applying with Power Mate Investment.",
    },
  },

  nav: {
    home: "Home",
    about: "About Us",
    products: "Products",
    branches: "Branch Network",
    careers: "Careers",
    contact: "Contact Us",
    faqs: "FAQs",
    gallery: "Gallery",
    apply: "Apply Now",
    skipToContent: "Skip to content",
    menu: "Menu",
    close: "Close",
    language: "Language",
  },

  common: {
    applyNow: "Apply Now",
    calculateLoan: "Calculate Your Loan",
    findBranch: "Find a Branch",
    learnMore: "Learn more",
    viewAll: "View all products",
    getStarted: "Get started",
    talkToUs: "Talk to us",
    callUs: "Call us",
    required: "Required",
    optional: "optional",
    sending: "Sending…",
  },

  hero: {
    eyebrow: "Trusted finance, islandwide",
    title: "Empowering Dreams Through Smart Financial Solutions",
    subtitle:
      "From a first harvest loan to growing a family business, Power Mate Investment gives hardworking Sri Lankans fast approvals, fair rates and a partner who stays for the long run.",
    ctaPrimary: "Apply Now",
    ctaSecondary: "Calculate Your Loan",
    ctaTertiary: "Find a Branch",
    stat1Value: "25",
    stat1Label: "Branches islandwide",
    stat2Value: "75,000+",
    stat2Label: "Customers served",
    stat3Value: "24 hrs",
    stat3Label: "Typical approval",
  },

  products: {
    eyebrow: "What we offer",
    title: "Financial solutions for every stage of life",
    subtitle:
      "Whether you are planting a field, stocking a shop or buying your first vehicle, there is a product built for the way you earn.",
    items: {
      micro: {
        name: "Micro Loans",
        short: "Small loans that start big journeys.",
        description:
          "Accessible working capital for self-employed individuals and small traders, minimal paperwork, quick release and repayment that follows your cash flow.",
        features: ["From LKR 25,000", "Group & individual options", "Weekly or monthly repayment"],
      },
      sme: {
        name: "SME Loans",
        short: "Fuel to grow your business.",
        description:
          "Larger facilities for established small and medium enterprises ready to expand stock, equipment or premises, with terms that match your trading cycle.",
        features: ["Up to LKR 10 million", "Up to 60-month terms", "Dedicated relationship officer"],
      },
      agriculture: {
        name: "Agriculture Loans",
        short: "Backing the people who feed the nation.",
        description:
          "Seasonal and term financing for farmers and agri-businesses, timed to planting and harvest, with grace periods that respect the land.",
        features: ["Seasonal grace periods", "Crop & livestock cover", "Lower indicative rates"],
      },
      gold: {
        name: "Gold Loans",
        short: "Instant value from what you already own.",
        description:
          "Safe, insured pledging of your gold for same-day cash. Transparent valuation, secure storage and flexible redemption whenever you are ready.",
        features: ["Same-day release", "Insured, secure storage", "Competitive per-gram rates"],
      },
      leasing: {
        name: "Leasing",
        short: "Drive your plans forward.",
        description:
          "Vehicle and equipment leasing for personal and business use, three-wheelers to lorries, with structured rentals you can plan around.",
        features: ["Vehicles & machinery", "Up to 60-month rentals", "Fast registration support"],
      },
      insurance: {
        name: "Insurance Solutions",
        short: "Protect what you work so hard to build.",
        description:
          "Life, motor, health and crop cover arranged alongside your loan, so a setback never undoes your progress.",
        features: ["Life, motor & health", "Crop & asset protection", "Bundled with your facility"],
      },
    } satisfies Record<ProductKey, { name: string; short: string; description: string; features: string[] }>,
  },

  why: {
    eyebrow: "Why choose us",
    title: "A financial partner you can count on",
    subtitle:
      "We measure success by the businesses that grow and the families that sleep easier, not just the loans we issue.",
    items: [
      { title: "Fast Approval", description: "Most applications are reviewed within 24 hours, so opportunity never waits on paperwork." },
      { title: "Trusted Partner", description: "Over 15 years serving Sri Lankan communities with transparent terms and no hidden surprises." },
      { title: "Flexible Repayment", description: "Plans that follow your income, weekly, monthly or seasonal, built around how you actually earn." },
      { title: "Islandwide Service", description: "25 branches from Jaffna to Matara, with officers who speak your language and know your area." },
    ],
  },

  calculator: {
    eyebrow: "Plan with confidence",
    title: "Calculate your loan",
    subtitle: "Estimate your monthly instalment in seconds. Indicative only, your final offer is confirmed at the branch.",
    productLabel: "Loan type",
    amountLabel: "Loan amount",
    termLabel: "Repayment period",
    rateLabel: "Indicative annual rate",
    months: "months",
    monthlyPayment: "Estimated monthly payment",
    totalPayable: "Total payable",
    totalInterest: "Total interest",
    perMonth: "/ month",
    disclaimer:
      "Estimates use the reducing-balance method and an indicative rate. Actual rates depend on your profile, product and assessment.",
    applyCta: "Apply for this loan",
    notAvailable: "Use the contact form for a tailored insurance quote.",
  },

  stories: {
    eyebrow: "Customer stories",
    title: "Real people, real progress",
    subtitle: "The dreams behind the numbers.",
    items: [
      { quote: "The harvest loan came through in two days. That season changed everything for my family.", name: "Nimal Perera", role: "Paddy farmer, Anuradhapura" },
      { quote: "They believed in my tailoring shop when no one else would. Now I employ four people.", name: "Fathima Rizwan", role: "Boutique owner, Kandy" },
      { quote: "A gold loan covered my daughter's university fees the same morning. Calm, fair, fast.", name: "Suresh Kumar", role: "Teacher, Jaffna" },
    ],
  },

  branchLocator: {
    eyebrow: "Branch locator",
    title: "Find a branch near you",
    subtitle: "Islandwide service across all nine provinces. Search by city or filter by province.",
    searchPlaceholder: "Search by city or district…",
    allProvinces: "All provinces",
    resultsOne: "branch found",
    resultsMany: "branches found",
    noResults: "No branches match your search. Try another city or province.",
    viewOnMap: "View on map",
    getDirections: "Get directions",
    callBranch: "Call branch",
    province: "Province",
    selectPrompt: "Select a branch to see it on the map.",
  },

  photoStrip: {
    eyebrow: "Where we work",
    title: "From coast to hill country",
    subtitle:
      "25 branches across all nine provinces. Wherever you are in Sri Lanka, a Power Mate officer is near.",
  },

  gallery: {
    eyebrow: "Gallery",
    title: "Moments from the communities we serve",
    subtitle:
      "Faces, places and everyday life across Sri Lanka, from the hill country to the southern coast.",
  },

  finalCta: {
    eyebrow: "Ready when you are",
    title: "Let's strengthen your financial power",
    subtitle: "Apply in minutes, or talk to a real person at your nearest branch. No obligation, no pressure.",
    primary: "Apply Now",
    secondary: "Talk to us",
  },

  about: {
    hero: {
      eyebrow: "About us",
      title: "Built for Sri Lanka, owned by its people's ambitions",
      subtitle:
        "Power Mate Investment was founded to put fair, fast finance within reach of the hardworking majority, the farmers, traders and families who power the real economy.",
    },
    storyTitle: "Our story",
    story: [
      "We started with a simple frustration: too many capable people were turned away by finance that didn't understand how they earned. Seasonal incomes, informal businesses, first-time borrowers, all treated as risks instead of opportunities.",
      "So we built differently. We listen first, lend fairly, and stay close, with branches in the towns we serve and officers who speak Sinhala, Tamil and English. Today we are proud to stand behind tens of thousands of Sri Lankan dreams.",
    ],
    missionTitle: "Our mission",
    mission: "To strengthen the financial power of every Sri Lankan we serve, with speed, fairness and respect.",
    visionTitle: "Our vision",
    vision: "A Sri Lanka where access to fair finance is never the reason a good idea fails.",
    valuesTitle: "What we stand for",
    values: [
      { title: "Transparency", description: "Clear terms, plain language, no hidden fees. You always know exactly what you owe." },
      { title: "Speed", description: "Decisions in hours, not weeks. Opportunity has a deadline and we respect it." },
      { title: "Community", description: "We bank the neighbourhoods we belong to, and reinvest in their success." },
      { title: "Integrity", description: "We only offer what genuinely helps. Your long-term wellbeing beats a short-term sale." },
    ],
    statsTitle: "Trusted at scale",
    stats: [
      { value: "15+", label: "Years of service" },
      { value: "25", label: "Branches islandwide" },
      { value: "75,000+", label: "Customers served" },
      { value: "9", label: "Provinces covered" },
    ],
  },

  productsPage: {
    hero: {
      eyebrow: "Products & services",
      title: "Finance shaped around how you live and earn",
      subtitle: "Six core solutions, one promise: fair terms, fast answers, and a partner who stays.",
    },
    featuresLabel: "Highlights",
    everyProductTitle: "Every product comes with",
    everyProduct: [
      "Approval in as little as 24 hours",
      "Repayment matched to your cash flow",
      "Service in Sinhala, Tamil or English",
      "No hidden fees, ever",
    ],
  },

  careers: {
    hero: {
      eyebrow: "Careers",
      title: "Strengthen your community, and your future",
      subtitle:
        "We grow people the way we grow businesses: with trust, training and room to rise. Join a team that measures success in lives changed.",
    },
    whyTitle: "Why build your career here",
    perks: [
      { title: "Grow fast", description: "Structured training and clear paths from branch floor to leadership." },
      { title: "Real impact", description: "Your work directly helps families and businesses in your own community thrive." },
      { title: "Fair rewards", description: "Competitive pay, performance bonuses and benefits that respect your effort." },
    ],
    openingsTitle: "Current openings",
    departmentLabel: "Department",
    locationLabel: "Location",
    typeLabel: "Type",
    openings: [
      { role: "Branch Manager", department: "Operations", location: "Kurunegala", type: "Full-time" },
      { role: "Credit Officer", department: "Lending", location: "Kandy", type: "Full-time" },
      { role: "Field Recovery Officer", department: "Collections", location: "Galle", type: "Full-time" },
      { role: "Customer Service Associate", department: "Front Office", location: "Colombo", type: "Full-time" },
    ],
    noOpeningTitle: "Don't see your role?",
    noOpeningText: "We're always looking for talented people. Send your CV and we'll be in touch when something fits.",
    applyCta: "Apply for this role",
    sendCv: "Send your CV",
  },

  contact: {
    hero: {
      eyebrow: "Contact us",
      title: "Talk to a partner who listens",
      subtitle: "Call our hotline, message us on WhatsApp, or fill in the form below and we'll come back to you within one working day.",
    },
    detailsTitle: "Reach us directly",
    phoneLabel: "Hotline",
    emailLabel: "Email",
    whatsappLabel: "WhatsApp",
    addressLabel: "Head office",
    hoursLabel: "Opening hours",
    hoursWeekdayLabel: "Mon – Fri",
    hoursSaturdayLabel: "Saturday",
    hoursSundayLabel: "Sunday",
    closed: "Closed",
    formTitle: "Send us a message",
    formSubtitle: "Tell us what you need and the best way to reach you.",
  },

  faqs: {
    hero: {
      eyebrow: "FAQs",
      title: "Questions, answered plainly",
      subtitle: "Everything you need to know about applying, eligibility and repayment. Still unsure? We're one call away.",
    },
    items: [
      { q: "Who can apply for a loan?", a: "Any Sri Lankan citizen aged 18 or above with a valid National Identity Card and a regular income, formal or informal, can apply. Different products have different requirements; our officers will guide you through what fits." },
      { q: "What documents do I need?", a: "At minimum: your NIC, proof of income or business, and proof of address. Gold loans require only your NIC and the gold item. Bring originals to any branch and we'll handle the rest." },
      { q: "How long does approval take?", a: "Most applications are assessed within 24 hours. Gold loans are typically released the same day. We'll always tell you upfront how long your specific application will take." },
      { q: "How is interest calculated?", a: "We use the reducing-balance method, so you pay interest only on the outstanding balance. Rates depend on the product, term and your profile, and are fully disclosed before you sign." },
      { q: "Can I repay early?", a: "Yes. Early settlement is welcome and can reduce your total interest. Ask your branch officer for an early-settlement quote at any time." },
      { q: "What happens if I miss a payment?", a: "Talk to us early, we'd always rather restructure than penalise. Reach your branch or hotline and we'll work out a plan that fits your situation." },
    ],
    stillHaveQuestions: "Still have questions?",
    contactPrompt: "Our team is happy to help in Sinhala, Tamil or English.",
  },

  form: {
    name: "Full name",
    namePlaceholder: "Your name",
    phone: "Phone number",
    phonePlaceholder: "07X XXX XXXX",
    email: "Email address",
    emailPlaceholder: "you@example.com",
    product: "I'm interested in",
    selectProduct: "Select a product",
    branch: "Preferred branch",
    selectBranch: "Select a branch",
    amount: "Amount needed (LKR)",
    message: "Message",
    messagePlaceholder: "Tell us a little about what you need…",
    consent: "I agree to be contacted about my inquiry.",
    submitApply: "Submit application",
    submitContact: "Send message",
    successTitle: "Thank you, we've got it.",
    successBody: "A Power Mate Investment officer will contact you within one working day.",
    sendAnother: "Send another message",
    errorTitle: "Something went wrong",
    errorBody: "We couldn't send your message. Please try again, or call our hotline.",
    errors: {
      nameRequired: "Please enter your name.",
      phoneRequired: "Please enter a phone number.",
      phoneInvalid: "Please enter a valid Sri Lankan phone number.",
      emailInvalid: "Please enter a valid email address.",
      consentRequired: "Please agree to be contacted so we can respond.",
    },
  },

  footer: {
    blurb: "A trusted Sri Lankan finance partner, fast, fair and flexible loans for individuals, farmers and businesses.",
    quickLinks: "Quick links",
    products: "Products",
    contactTitle: "Get in touch",
    followUs: "Follow us",
    rights: "All rights reserved.",
    licence: "A registered finance company. Lending is subject to terms, conditions and credit assessment.",
    placeholderNote: "Contact details shown are placeholders pending the real company information.",
  },
};

export default en;
export type Dictionary = typeof en;
