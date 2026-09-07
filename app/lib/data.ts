// Edit this file to personalize the portfolio — every section pulls its content from here.

export const profile = {
  name: "Jhun Daverey Parol",
  initials: "JP",
  role: "IT Specialist & Full-Stack Developer",
  roles: [
    "Full-Stack Developer",
    "IT Technical Specialist",
    "UI/UX Enthusiast",
    "Problem Solver",
  ],
  tagline:
    "I build reliable, user-friendly digital solutions — from network infrastructure to full-stack web apps.",
  bio: "I'm an IT professional based in Davao City, Philippines, combining technical support, system administration, and full-stack development. My path started in a call center, moved through IT technical support and network administration, and led me to full-stack development — where I now build reliable, user-friendly digital solutions while completing my degree in Information Technology.",
  bioSecondary:
    "Outside of freelance work, I'm finishing my BS in Information Technology at Holy Cross of Davao College and picking up certifications along the way — from JavaScript Essentials (Cisco) to Deep Learning AI. I enjoy hands-on infrastructure work (networking, CCTV, VoIP) just as much as writing code.",
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
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
] as const;

export const stats = [
  { label: "Years in IT & Dev", value: "5+" },
  { label: "Projects delivered", value: "10+" },
  { label: "Certifications", value: "4" },
  { label: "Coffees consumed", value: "∞" },
] as const;

export type Project = {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  gradient: string;
  /** Screenshots for this project, e.g. ["/images/my-project/1.jpg", "/images/my-project/2.jpg"].
   *  Optional — falls back to the gradient tile when omitted. First image is the cover. */
  images?: string[];
};

export const projects: Project[] = [
  {
    title: "Digital Student Management System",
    description:
      "A web-based system for managing student records end-to-end, built to streamline enrollment and administrative workflows for schools.",
    tags: ["PHP", "MySQL", "HTML", "CSS"],
    featured: true,
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
  },
  {
    title: "Business Website Template",
    description:
      "A fully responsive business website template built end-to-end, from front-end UI to a Node.js-powered back-end.",
    tags: ["React", "Next.js", "Node.js"],
    featured: true,
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
  },
  {
    title: "Employee Management System",
    description:
      "A PHP/MySQL system for managing employee records, attendance, and day-to-day HR workflows.",
    tags: ["PHP", "MySQL", "HTML", "CSS"],
    gradient: "from-amber-500 via-orange-500 to-rose-500",
  },
  {
    title: "Data Cabinet Setup",
    description:
      "Structured cabling and data cabinet setup for an office network, including VoIP provisioning and VLAN segmentation.",
    tags: ["Structured Cabling", "VoIP", "VLAN"],
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
  },
  {
    title: "CCTV Installation Project",
    description:
      "Designed and deployed an IP camera surveillance system, including NVR/DVR setup and network configuration for full site coverage.",
    tags: ["IP Cameras", "NVR/DVR", "Networking"],
    gradient: "from-fuchsia-500 via-pink-500 to-rose-500",
  },
  {
    title: "Gretle Portfolio Website",
    description:
      "A custom-built portfolio website showcasing a clean, personal brand using vanilla HTML, CSS, and JavaScript.",
    tags: ["HTML", "CSS", "JavaScript"],
    gradient: "from-violet-500 via-indigo-500 to-blue-500",
  },
];

export type SkillCategory = {
  name: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    name: "Web Development",
    items: ["HTML", "CSS", "JavaScript", "PHP", "TypeScript"],
  },
  {
    name: "Frameworks",
    items: ["Next.js", "React.js"],
  },
  {
    name: "Design",
    items: ["UI/UX", "Figma"],
  },
  {
    name: "Databases & Tools",
    items: ["MySQL", "MongoDB", "PostgreSQL", "XAMPP", "Laragon"],
  },
  {
    name: "Cloud & DevOps",
    items: ["Docker", "AWS"],
  },
  {
    name: "IT Infrastructure",
    items: [
      "Active Directory",
      "Network Configuration",
      "CCTV Systems",
      "Server Management",
      "VoIP Systems",
    ],
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
    role: "Full-Stack Developer",
    company: "Freelance",
    period: "2025 — Present",
    description:
      "Delivering end-to-end web solutions, combining front-end and back-end expertise for small businesses and individual clients.",
    bullets: [
      "Built full-stack websites and systems using React, Next.js, PHP, and MySQL",
      "Managed projects independently from requirements gathering to deployment",
      "Balanced freelance development work with completing a BS in Information Technology",
    ],
  },
  {
    role: "IT Technical Specialist",
    company: "IPASS Processing Davao",
    period: "2021 — 2025",
    description:
      "Provided technical support and managed network and infrastructure systems for the organization.",
    bullets: [
      "Configured and maintained Active Directory and network infrastructure",
      "Installed and managed CCTV, NVR/DVR, and VoIP systems",
      "Handled day-to-day server management and technical support requests",
    ],
  },
  {
    role: "CRM Specialist",
    company: "IPASS Processing Davao",
    period: "2021",
    description:
      "Managed customer relationships and supported data handling and QA/QC processes.",
    bullets: [
      "Maintained customer records and resolved account issues",
      "Supported quality assurance and quality control workflows",
    ],
  },
  {
    role: "Call Center Agent",
    company: "Teleperformance",
    period: "2020 — 2021",
    description:
      "Started in a customer-facing call center role before transitioning into IT technical support.",
    bullets: [
      "Handled high-volume customer calls in a fast-paced environment",
      "Transitioned to an IT Technical Support role after demonstrating technical aptitude",
    ],
  },
];
