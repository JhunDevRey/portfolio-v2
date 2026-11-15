// All page content lives here.

export const profile = {
  name: "Jhun Daverey Parol",
  role: "Full-stack developer",
  location: "Davao City, Philippines",
  email: "jhundaverey@gmail.com",
  resumeUrl: "/files/Jhun-Daverey-Parol-CV.pdf",
  photo: "/images/iam_me/profjhun1nbg.png",
  siteUrl: "https://jhundaverey.vercel.app",
  social: {
    github: "https://github.com/JhunDevRey",
    linkedin: "https://linkedin.com/in/jhun-daverey-flores-parol-29a564266/",
    facebook: "https://facebook.com/lclhst127.0.0.1",
  },
  intro: [
    "I'm a full-stack developer in Davao City. Right now I build internal tools and automations for Duque Immigration, a Canadian immigration consultancy. Before that I spent about four years in IT support and network administration, which still shapes how I approach most problems.",
    "Day to day that means PHP and MySQL on Hostinger, small Python services, and Make.com scenarios that tie together WordPress, Notion, Dropbox, Google Drive and Documenso. On the front end I work in React, Next.js and TypeScript. I finished my BS in Information Technology at Holy Cross of Davao College in 2025 while working full time.",
  ],
} as const;

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const;

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Full-Stack Developer, AI & Automation",
    company: "Duque Immigration",
    period: "Jul 2026 – present",
    bullets: [
      "Built and maintain a PHP/MySQL client document portal on two subdomains, with Dropbox storage, comments with attachments, and threaded email notifications.",
      "Set up a contract pipeline: a WordPress form triggers Make.com, which calls a Flask service to fill a Word template, then Documenso handles two-party signing.",
      "Wrote a multi-step inquiry form that saves leads straight into the Notion CRM through a small PHP proxy.",
      "Fixed a Safari PDF bug caused by mismatched Content-Length and compression headers, and traced Yahoo DKIM/SPF rejections to aliases bypassing the SMTP relay.",
      "Moved Duque Workforce Connect, a recruitment platform, off Firebase and static hosting onto PHP/MySQL on Hostinger with Google Drive storage.",
    ],
  },
  {
    role: "IT Technical Support Officer",
    company: "IPASS Business Process",
    period: "Dec 2021 – May 2025",
    bullets: [
      "Hardware, software and network support for office and remote staff.",
      "Active Directory users, groups and permissions.",
      "pfSense firewall and Cisco/Linksys network gear on the server side.",
      "3CX and MicroSIP VoIP, IP CCTV cameras and NVRs, Windows and Linux server installs.",
      "Built small internal web pages in HTML, CSS, JavaScript and PHP.",
    ],
  },
  {
    role: "CRM & QA Associate",
    company: "IPASS Business Process",
    period: "Jun 2021 – Dec 2021",
    bullets: [
      "Checked nursing applicants' documents against overseas processing requirements, ran email campaigns, and tracked production in ClickUp and Asana.",
    ],
  },
  {
    role: "Technical Support Representative",
    company: "Teleperformance",
    period: "Aug 2020 – Aug 2021",
    bullets: ["Phone support for equipment and connectivity issues, logged in the CRM."],
  },
];

export type Project = {
  title: string;
  description: string;
  stack: string;
  year: string;
  url?: string;
  urlLabel?: string;
  note?: string;
};

export const projects: Project[] = [
  {
    title: "Client document portal",
    description:
      "Document exchange for an immigration consultancy. Dropbox-backed storage, comments with attachments, threaded email alerts, and automatic PDF and image compression on upload.",
    stack: "PHP, MySQL, Dropbox API",
    year: "2026",
    note: "Private, built for Duque Immigration",
  },
  {
    title: "Contract and e-signature pipeline",
    description:
      "A WordPress form starts a Make.com scenario that calls a Flask service to fill a Word template, then sends the contract through Documenso for signing.",
    stack: "WordPress, Make.com, Flask, Documenso",
    year: "2026",
    note: "Private, built for Duque Immigration",
  },
  {
    title: "Duque Workforce Connect",
    description:
      "Recruitment platform with separate applicant and employer pipelines, Google Drive storage and an admin dashboard.",
    stack: "PHP, MySQL, Google Drive API",
    year: "2026",
    note: "Private",
  },
  {
    title: "HCDConnect",
    description:
      "Android app for campus events at Holy Cross of Davao College. Students browse and RSVP, club organizers post and manage events.",
    stack: "Kotlin",
    year: "2026",
    url: "https://github.com/JhunDevRey/HCDConnect",
    urlLabel: "GitHub",
  },
  {
    title: "GraceConnect",
    description:
      "Android app for church members: sermons, events, giving, community groups and a Bible reader.",
    stack: "Kotlin",
    year: "2026",
    url: "https://github.com/JhunDevRey/GraceConnect",
    urlLabel: "GitHub",
  },
  {
    title: "NexusApp",
    description: "A unified inbox that pulls messages from several channels into one view.",
    stack: "Web app",
    year: "2026",
    url: "https://github.com/JhunDevRey/NexusApp",
    urlLabel: "GitHub",
  },
  {
    title: "robertdominicochigue.vercel.app",
    description: "Personal website for Robert Dominic Ochigue.",
    stack: "Next.js, TypeScript",
    year: "2026",
    url: "https://robertdominicochigue.vercel.app",
    urlLabel: "Live site",
  },
  {
    title: "OmniOrder",
    description:
      "Canteen pre-ordering site for HCDC students. Browse the menu by category and order ahead.",
    stack: "HTML, CSS, JavaScript",
    year: "2026",
    url: "https://github.com/JhunDevRey/omnifood",
    urlLabel: "GitHub",
  },
  {
    title: "Digital Student Management System",
    description: "Student records, enrollment and admin workflows for a school.",
    stack: "PHP, MySQL",
    year: "2026",
    url: "https://github.com/JhunDevRey/DSMS",
    urlLabel: "GitHub",
  },
];

export const skills = [
  { label: "Front end", items: "HTML, CSS, JavaScript, TypeScript, React, Next.js" },
  { label: "Back end", items: "PHP, Python (Flask), MySQL, SQLite, REST APIs, webhooks" },
  {
    label: "Automation",
    items: "Make.com, Notion API, Dropbox API, Google Drive API, Documenso, PHPMailer, Firebase",
  },
  { label: "Hosting", items: "Hostinger, Vercel, PythonAnywhere, WordPress" },
  {
    label: "Infrastructure",
    items:
      "Active Directory, pfSense, Cisco and Linksys gear, 3CX and MicroSIP VoIP, IP CCTV and NVR, Windows and Linux servers",
  },
  { label: "Email", items: "SMTP relay setup, SPF and DKIM troubleshooting" },
] as const;

export const education = [
  {
    name: "BS Information Technology",
    place: "Holy Cross of Davao College",
    period: "2019 – 2025",
  },
  { name: "Senior high school, ICT strand", place: "ACD, Davao", period: "2017 – 2019" },
] as const;

export const certifications = [
  { name: "Claude Code Power User", issuer: "Udemy", year: "2026" },
  { name: "AI Generalist Mastery", issuer: "Udemy", year: "2026" },
  { name: "JavaScript Essentials 1", issuer: "Cisco Networking Academy", year: "2026" },
  { name: "Webflow 101", issuer: "Webflow University", year: "2025" },
  { name: "Computer Systems Servicing NC II", issuer: "TESDA", year: "" },
] as const;
