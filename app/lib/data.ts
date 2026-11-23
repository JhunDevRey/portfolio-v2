// Edit this file to personalize the portfolio. Every section pulls its content from here.

export const profile = {
  name: "Jhun Daverey Parol",
  initials: "JP",
  role: "Full-Stack Developer, AI & Automation",
  roles: [
    "Full-Stack Developer",
    "AI & Workflow Automation",
    "IT Support & Networking",
    "UI/UX Prototyping",
  ],
  tagline:
    "I build PHP, Python and Next.js tools and Make.com automations that take manual document, contract and intake work off people's plates, backed by five years in IT support and networking.",
  bio: "I'm a full-stack developer and automation specialist based in Davao City, Philippines, with over five years in IT across technical support, network administration, CRM and quality assurance. Today I build production PHP/MySQL portals, Python microservices and Make.com pipelines for Duque Immigration, a Canadian immigration consultancy, replacing manual document, contract and client-intake work.",
  location: "Davao City, Philippines",
  email: "jhundaverey@gmail.com",
  phone: "+63 951 806 9771",
  resumeUrl: "/files/Jhun-Daverey-Parol-CV.pdf",
  avatarInitials: "JP",
  social: {
    github: "https://github.com/JhunDevRey",
    linkedin: "https://linkedin.com/in/jhun-daverey-flores-parol-29a564266/",
    facebook: "https://facebook.com/lclhst127.0.0.1",
  },
} as const;

export const navLinks = [
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "certifications", label: "Credentials" },
    { id: "contact", label: "Contact" },
] as const;

export type Certification = {
  name: string;
  issuer: string;
  status: "completed" | "in-progress";
};

export const certifications: Certification[] = [
  {
    name: "Claude Code Power User: Architecting AI-Native Dev Workflows",
    issuer: "Udemy · 2026",
    status: "completed",
  },
  {
    name: "AI Generalist Mastery: From Zero to Building Real AI Systems",
    issuer: "Udemy · 2026",
    status: "completed",
  },
  {
    name: "JavaScript Essentials 1",
    issuer: "Cisco Networking Academy · 2026",
    status: "completed",
  },
  {
    name: "Webflow 101 Certification",
    issuer: "Webflow University · 2025",
    status: "completed",
  },
  {
    name: "NC II, Computer Systems Servicing",
    issuer: "TESDA",
    status: "completed",
  },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  /** Screenshots for this project, e.g. ["/images/my-project/1.jpg", "/images/my-project/2.jpg"].
   *  Optional, falls back to an initials tile when omitted. First image is the cover. */
  images?: string[];
  category: "development" | "technical";
};

export const projectCategories = {
  development: "Web, App & Automation",
  technical: "Network & Systems Administration",
} as const;

export const projects: Project[] = [
  {
    title: "Client Document Portal",
    description:
      "Document exchange portal for Duque Immigration across two production subdomains: Dropbox-backed storage, comments with file attachments, threaded email alerts, and automatic PDF and image compression on upload.",
    tags: ["PHP", "MySQL", "Dropbox API", "PHPMailer"],
    featured: true,
    images: ["/images/projects/client-portal.jpg"],
    category: "development",
  },
  {
    title: "Contract & E-Signature Pipeline",
    description:
      "A WordPress form kicks off a Make.com scenario that calls a Flask service to fill a Word contract template, then routes it through Documenso for two-party signing.",
    tags: ["WordPress", "Make.com", "Flask", "Documenso"],
    featured: true,
    images: ["/images/projects/contract-pipeline.jpg"],
    category: "development",
  },
  {
    title: "Duque Workforce Connect",
    description:
      "Recruitment platform with applicant and employer pipelines, Google Drive OAuth2 storage and an admin dashboard. Migrated from Firebase and static hosting to PHP/MySQL on Hostinger.",
    tags: ["PHP", "MySQL", "Google Drive API"],
    featured: true,
    images: ["/images/projects/duque-workforce-connect.jpg"],
    category: "development",
  },
  {
    title: "Inquiry Form to Notion CRM",
    description:
      "Multi-step client inquiry form that writes leads straight into a Notion CRM through a small PHP CORS proxy, so nothing has to be re-typed by staff.",
    tags: ["PHP", "JavaScript", "Notion API"],
    images: ["/images/projects/inquiry-form.jpg"],
    category: "development",
  },
  {
    title: "HCDConnect",
    description:
      "Android app for campus events at Holy Cross of Davao College. Students browse and RSVP, club organizers post and manage events.",
    tags: ["Kotlin", "Android"],
    repoUrl: "https://github.com/JhunDevRey/HCDConnect",
    images: ["/images/projects/hcdconnect.jpg"],
    category: "development",
  },
  {
    title: "GraceConnect",
    description:
      "Android app for church members: sermons, events, giving, community groups, a Bible reader and a personal profile.",
    tags: ["Kotlin", "Android"],
    repoUrl: "https://github.com/JhunDevRey/GraceConnect",
    category: "development",
  },
  {
    title: "NexusApp",
    description: "A unified inbox that brings messages from multiple channels into a single view.",
    tags: [],
    repoUrl: "https://github.com/JhunDevRey/NexusApp",
    category: "development",
  },
  {
    title: "Digital Student Management System",
    description:
      "A web-based system for managing student records end-to-end, built to streamline enrollment and administrative workflows for schools.",
    tags: ["PHP", "MySQL", "HTML", "CSS"],
    repoUrl: "https://github.com/JhunDevRey/DSMS",
    images: ["/images/projects/dsms.jpg"],
    category: "development",
  },
  {
    title: "Business Website Template",
    description:
      "A fully responsive business website template built end-to-end, from front-end UI to a Node.js-powered back-end.",
    tags: ["React", "Next.js", "Node.js"],
    repoUrl: "https://github.com/JhunDevRey/business-website",
    liveUrl: "https://jhundevrey.github.io/business-website/",
    images: ["/images/projects/business-website.jpg"],
    category: "development",
  },
  {
    title: "OmniOrder",
    description:
      "A campus canteen pre-ordering site for Holy Cross of Davao College. Students browse the menu by category and place orders ahead of time.",
    tags: ["HTML", "CSS", "JavaScript"],
    repoUrl: "https://github.com/JhunDevRey/omnifood",
    liveUrl: "https://jhundevrey.github.io/omnifood/",
    images: ["/images/projects/omniorder.jpg"],
    category: "development",
  },
  {
    title: "Data Cabinet Setup",
    description:
      "Structured cabling and data cabinet setup for an office network, including VoIP provisioning and VLAN segmentation.",
    tags: ["Structured Cabling", "VoIP", "VLAN"],
    category: "technical",
  },
  {
    title: "CCTV Installation Project",
    description:
      "Designed and deployed an IP camera surveillance system, including NVR/DVR setup and network configuration for full site coverage.",
    tags: ["IP Cameras", "NVR/DVR", "Networking"],
    category: "technical",
  },
];

export type SkillCategory = {
  name: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js", "UI/UX Prototyping"],
  },
  {
    name: "Backend",
    items: ["PHP", "Python (Flask)", "MySQL", "SQLite", "REST APIs", "Webhooks"],
  },
  {
    name: "Automation & Integrations",
    items: [
      "Make.com",
      "Notion API",
      "Dropbox API",
      "Google Drive API",
      "Documenso",
      "PHPMailer",
      "Firebase",
    ],
  },
  {
    name: "CMS & Hosting",
    items: ["WordPress", "Elementor", "Hostinger", "PythonAnywhere", "Vercel", "GitHub Pages"],
  },
  {
    name: "Infrastructure & Networking",
    items: [
      "Active Directory",
      "pfSense",
      "Cisco / Linksys",
      "VoIP (3CX, MicroSIP)",
      "IP CCTV / NVR",
      "Windows & Linux Server",
    ],
  },
  {
    name: "Email & QA",
    items: ["SMTP Relay", "SPF / DKIM", "Web App Testing", "QA/QC", "ClickUp", "Asana"],
  },
];

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  description: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Full-Stack Developer, AI & Automation",
    company: "Duque Immigration",
    period: "Jul 2026 to Present",
    description:
      "Building the portals, pipelines and integrations behind a Canadian immigration consultancy's client work.",
    bullets: [
      "Built a PHP/MySQL client document portal across two production subdomains, with Dropbox storage, threaded email alerts and file-attachment comments",
      "Added automatic PDF and image compression before upload, and fixed a Mac Safari PDF rendering failure caused by Content-Length and compression mismatches",
      "Set up a contract pipeline from WordPress through Make.com and Flask into a Word template, with Documenso e-signatures replacing manual signature collection",
      "Built a multi-step inquiry form synced to the Notion CRM, and maintain the Make.com automations for questionnaire and PCAIC delivery",
      "Traced Yahoo DKIM/SPF rejections to aliases bypassing the SMTP relay, and migrated Duque Workforce Connect from Firebase to PHP/MySQL on Hostinger",
    ],
  },
  {
    role: "IT Technical Support Officer",
    company: "IPASS Business Process",
    period: "Dec 2021 to May 2025",
    description:
      "Technical support plus network and systems administration for office and remote staff.",
    bullets: [
      "Resolved hardware, software and network tickets and administered Active Directory users, groups and permissions",
      "Configured pfSense firewalls and Cisco/Linksys network devices on the server side",
      "Deployed and maintained 3CX and MicroSIP VoIP, IP CCTV cameras and NVR systems",
      "Provisioned Windows, Linux and Ubuntu Server environments and built internal web pages in HTML, CSS, JavaScript and PHP",
    ],
  },
  {
    role: "CRM & Quality Assurance Associate",
    company: "IPASS Business Process",
    period: "Jun 2021 to Dec 2021",
    description:
      "Document validation, email campaigns and production tracking for overseas nursing placements.",
    bullets: [
      "Validated nursing applicant documents against overseas processing requirements",
      "Ran email campaigns to nurse clients and international partners, and tracked production phases in ClickUp and Asana",
      "Scheduled applicant appointments for Health Carousel and overseas nursing placements",
    ],
  },
  {
    role: "Technical Support Representative",
    company: "Teleperformance",
    period: "Aug 2020 to Aug 2021",
    description:
      "Phone-based technical support before moving into in-house IT.",
    bullets: [
      "Troubleshot customer equipment and connectivity issues by phone",
      "Documented interactions in the CRM to feed recurring-issue data back into system improvements",
    ],
  },
];
