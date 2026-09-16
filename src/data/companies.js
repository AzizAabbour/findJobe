/**
 * DevApply Morocco — Verified Tech Companies & Startups Directory
 * NOTE: Initial dataset contains structured demo companies modeling the Moroccan tech ecosystem.
 * Each entry includes verifiedAt and sourceUrl to maintain data integrity.
 */

export const INITIAL_COMPANIES = [
  {
    id: 1,
    name: "Atlas Digital Labs",
    city: "Casablanca",
    category: "Startup",
    tagline: "FinTech & modern web platforms for North Africa",
    description: "Atlas Digital Labs is an innovative Casablanca-based technology studio specializing in responsive SaaS portals and payment integrations built with modern React.js and PHP/Laravel microservices.",
    website: "https://example-atlasdigital.ma",
    linkedin: "https://linkedin.com/company/demo-atlas-digital",
    careersUrl: "https://example-atlasdigital.ma/careers",
    email: "recrutement@example-atlasdigital.ma",
    technologies: ["React", "JavaScript", "Laravel", "PHP", "MySQL", "REST API", "Docker"],
    companySize: "11-50",
    applicationMethod: "email",
    logoColor: "#9B7842",
    logoText: "AD",
    sourceUrl: "https://example-atlasdigital.ma/jobs/2026/dev",
    verifiedAt: "2026-09-16",
    isDemo: true,
    openPositions: [
      {
        id: 101,
        title: "Junior Full Stack Developer",
        type: "Full-time",
        location: "Casablanca (Hybrid)"
      },
      {
        id: 102,
        title: "Frontend React Developer (Internship)",
        type: "Internship",
        location: "Casablanca (On-site)"
      }
    ]
  },
  {
    id: 2,
    name: "Medina Softworks",
    city: "Rabat",
    category: "Software Company",
    tagline: "Enterprise cloud software & government digital transformation",
    description: "Rabat-based software house developing bespoke enterprise management applications, ERP extensions, and robust REST APIs utilizing Laravel, MySQL, and modern JavaScript frontends.",
    website: "https://example-medinasoft.ma",
    linkedin: "https://linkedin.com/company/demo-medina-soft",
    careersUrl: "https://example-medinasoft.ma/join-us",
    email: "carrieres@example-medinasoft.ma",
    technologies: ["PHP", "Laravel", "React", "Node.js", "SQL", "Git", "Docker"],
    companySize: "15-30",
    applicationMethod: "email",
    logoColor: "#2563EB",
    logoText: "MS",
    sourceUrl: "https://example-medinasoft.ma/careers/post-04",
    verifiedAt: "2026-09-15",
    isDemo: true,
    openPositions: [
      {
        id: 103,
        title: "Junior Full Stack Web Developer",
        type: "Full-time",
        location: "Rabat (On-site)"
      }
    ]
  },
  {
    id: 3,
    name: "Koutoubia Web Studio",
    city: "Marrakech",
    category: "Web Agency",
    tagline: "Creative digital agency powering tourism & e-commerce brands",
    description: "Marrakech-based digital studio crafting fast, interactive web applications, e-commerce stores, and booking platforms using React, Node.js, and custom Laravel backends.",
    website: "https://example-koutoubiaweb.ma",
    linkedin: "https://linkedin.com/company/demo-koutoubia-web",
    careersUrl: "https://example-koutoubiaweb.ma/jobs",
    email: "jobs@example-koutoubiaweb.ma",
    technologies: ["React", "JavaScript", "HTML", "CSS", "Node.js", "PHP", "Git"],
    companySize: "5-15",
    applicationMethod: "email",
    logoColor: "#D97706",
    logoText: "KW",
    sourceUrl: "https://example-koutoubiaweb.ma/jobs/junior-web",
    verifiedAt: "2026-09-14",
    isDemo: true,
    openPositions: [
      {
        id: 104,
        title: "Junior Web Developer (React / PHP)",
        type: "Junior",
        location: "Marrakech (Hybrid)"
      }
    ]
  },
  {
    id: 4,
    name: "Strait Tech Solutions",
    city: "Tangier",
    category: "IT Consulting",
    tagline: "Smart logistics & international logistics tech platforms",
    description: "Located near Tangier Med, Strait Tech builds supply chain portals, container tracking dashboards, and IoT API integrations leveraging React.js, Express, Docker, and MySQL.",
    website: "https://example-straittech.ma",
    linkedin: "https://linkedin.com/company/demo-strait-tech",
    careersUrl: "https://example-straittech.ma/careers",
    email: "rh@example-straittech.ma",
    technologies: ["React", "Node.js", "Express.js", "MySQL", "REST API", "Docker", "Git"],
    companySize: "20-50",
    applicationMethod: "email",
    logoColor: "#059669",
    logoText: "ST",
    sourceUrl: "https://example-straittech.ma/recruitment",
    verifiedAt: "2026-09-12",
    isDemo: true,
    openPositions: [
      {
        id: 105,
        title: "Stage PFE / Pré-embauche Full Stack Web",
        type: "Internship",
        location: "Tangier (On-site)"
      },
      {
        id: 106,
        title: "Junior Full Stack Engineer (React/Node)",
        type: "Junior",
        location: "Tangier (Hybrid)"
      }
    ]
  },
  {
    id: 5,
    name: "Souss Cloud Innovations",
    city: "Agadir",
    category: "SaaS",
    tagline: "AgriTech and IoT SaaS solutions for southern Morocco",
    description: "Agadir startup developing connected agriculture dashboards, sensors telemetry web portals, and billing systems powered by React, Laravel, and MySQL database engines.",
    website: "https://example-sousscloud.ma",
    linkedin: "https://linkedin.com/company/demo-souss-cloud",
    careersUrl: "https://example-sousscloud.ma/team",
    email: "contact@example-sousscloud.ma",
    technologies: ["React", "Laravel", "MySQL", "JavaScript", "Docker"],
    companySize: "5-10",
    applicationMethod: "email",
    logoColor: "#7C3AED",
    logoText: "SC",
    sourceUrl: "https://example-sousscloud.ma/careers/dev26",
    verifiedAt: "2026-09-10",
    isDemo: true,
    openPositions: [
      {
        id: 107,
        title: "Full Stack Developer Junior (Bac+2)",
        type: "Junior",
        location: "Agadir (Remote/Hybrid)"
      }
    ]
  },
  {
    id: 6,
    name: "Fez Craft Interactive",
    city: "Fes",
    category: "Digital Agency",
    tagline: "E-commerce and modern headless CMS platforms",
    description: "Creative agency in Fes focusing on high-performing web platforms for Moroccan artisans, brands, and export businesses with Laravel, React, and RESTful architectures.",
    website: "https://example-fezcraft.ma",
    linkedin: "https://linkedin.com/company/demo-fez-craft",
    careersUrl: "https://example-fezcraft.ma/recrutement",
    email: "recrutement@example-fezcraft.ma",
    technologies: ["React", "PHP", "Laravel", "HTML", "CSS", "JavaScript", "Git"],
    companySize: "1-10",
    applicationMethod: "email",
    logoColor: "#DB2777",
    logoText: "FC",
    sourceUrl: "https://example-fezcraft.ma/careers",
    verifiedAt: "2026-09-08",
    isDemo: true,
    openPositions: []
  },
  {
    id: 7,
    name: "Zenith FinTech Casablanca",
    city: "Casablanca",
    category: "FinTech",
    tagline: "Micro-credit and digital wallet platforms",
    description: "Casablanca FinTech scale-up creating secure digital onboarding, payment dashboards, and micro-loan systems built on top of Laravel APIs and responsive React SPAs.",
    website: "https://example-zenithfintech.ma",
    linkedin: "https://linkedin.com/company/demo-zenith-fintech",
    careersUrl: "https://example-zenithfintech.ma/jobs",
    email: "talent@example-zenithfintech.ma",
    technologies: ["React", "Laravel", "PHP", "MySQL", "REST API", "Docker", "Git"],
    companySize: "20-45",
    applicationMethod: "email",
    logoColor: "#9B7842",
    logoText: "ZF",
    sourceUrl: "https://example-zenithfintech.ma/careers",
    verifiedAt: "2026-09-16",
    isDemo: true,
    openPositions: [
      {
        id: 108,
        title: "Junior Web Developer (React / Laravel)",
        type: "Full-time",
        location: "Casablanca (Hybrid)"
      }
    ]
  },
  {
    id: 8,
    name: "Bouregreg Tech Labs",
    city: "Salé",
    category: "Startup",
    tagline: "EdTech learning management systems and virtual labs",
    description: "Salé-based EdTech developing interactive e-learning modules, student evaluation platforms, and modern web dashboards for vocational training centers.",
    website: "https://example-bouregregtech.ma",
    linkedin: "https://linkedin.com/company/demo-bouregreg-tech",
    careersUrl: "https://example-bouregregtech.ma/careers",
    email: "rh@example-bouregregtech.ma",
    technologies: ["React", "JavaScript", "Node.js", "Express.js", "SQL", "Git"],
    companySize: "5-15",
    applicationMethod: "email",
    logoColor: "#0284C7",
    logoText: "BT",
    sourceUrl: "https://example-bouregregtech.ma/recrutement",
    verifiedAt: "2026-09-11",
    isDemo: true,
    openPositions: [
      {
        id: 109,
        title: "Développeur Web Junior (Stage ou Débutant)",
        type: "Junior",
        location: "Salé (On-site)"
      }
    ]
  }
];
