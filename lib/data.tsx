"use client"

import {
  FaFacebook,
  FaLinkedin,
  FaGithub,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaVuejs,
  FaNpm,
  FaDocker,
} from "react-icons/fa"
import {
  SiTypescript,
  SiTailwindcss,
  SiFigma,
  SiNextdotjs,
  SiRedux,
  SiVite,
  SiSass,
  SiGit,
  SiPython,
  SiPhp,
  SiSupabase,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiFirebase,
  SiNodedotjs,
  SiCplusplus,
  SiDart,
  SiFlutter,
  SiWordpress,
  SiVercel,
  SiLinux,
} from "react-icons/si"
import type { IconType } from "react-icons"

// Inline SVG icon components — replaces lucide-react (avoids SVG path parse errors in React DOM)
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)
const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

// ─── Header ──────────────────────────────────────────────────────────────────

export const navLinks = [
  { href: "#home",         label: "Home"         },
  { href: "#about",        label: "About"        },
  { href: "#skills",       label: "Skills"       },
  { href: "#portfolio",    label: "Projects"     },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact",      label: "Contact"      },
]

// ─── Social Links (shared: hero + contact) ───────────────────────────────────

export const socialLinks: { href: string; Icon: IconType; label: string }[] = [
  { href: "https://www.facebook.com/profile.php?id=61579595971269", Icon: FaFacebook, label: "Facebook" },
  { href: "https://www.linkedin.com/in/jett-villaflores-villegas/",  Icon: FaLinkedin, label: "LinkedIn" },
  { href: "https://github.com/JettVillegas",                         Icon: FaGithub,   label: "GitHub"   },
]

// ─── Hero – Orbit Rings ───────────────────────────────────────────────────────

export interface OrbitIcon {
  Icon: IconType
  label: string
  angle: number
}

export interface OrbitRing {
  radius: number
  duration: string
  direction: 1 | -1
  icons: OrbitIcon[]
}

export const orbitRings: OrbitRing[] = [
  // Ring 1 — 7 icons (frontend fundamentals)
  {
    radius: 200,
    duration: "20s",
    direction: 1,
    icons: [
      { Icon: FaHtml5,      label: "HTML5",      angle: 0   },
      { Icon: FaCss3Alt,    label: "CSS3",        angle: 51  },
      { Icon: FaJs,         label: "JavaScript",  angle: 103 },
      { Icon: SiTypescript, label: "TypeScript",  angle: 154 },
      { Icon: FaReact,      label: "React",       angle: 206 },
      { Icon: SiTailwindcss,label: "Tailwind",    angle: 257 },
      { Icon: SiFigma,      label: "Figma",       angle: 309 },
    ],
  },
  // Ring 2 — 8 icons (frameworks & build tools)
  {
    radius: 280,
    duration: "32s",
    direction: -1,
    icons: [
      { Icon: SiNextdotjs,  label: "Next.js",    angle: 0   },
      { Icon: FaVuejs,      label: "Vue.js",     angle: 45  },
      { Icon: SiRedux,      label: "Redux",      angle: 90  },
      { Icon: SiVite,       label: "Vite",       angle: 135 },
      { Icon: SiSass,       label: "Sass",       angle: 180 },
      { Icon: FaNpm,        label: "npm",        angle: 225 },
      { Icon: SiGit,        label: "Git",        angle: 270 },
      { Icon: FaGithub,     label: "GitHub",     angle: 315 },
    ],
  },
  // Ring 3 — 9 icons (backend, databases & cloud)
  {
    radius: 365,
    duration: "46s",
    direction: 1,
    icons: [
      { Icon: SiPython,     label: "Python",      angle: 0   },
      { Icon: SiPhp,        label: "PHP",         angle: 40  },
      { Icon: SiSupabase,   label: "Supabase",    angle: 80  },
      { Icon: SiPostgresql, label: "PostgreSQL",  angle: 120 },
      { Icon: SiMysql,      label: "MySQL",       angle: 160 },
      { Icon: SiMongodb,    label: "MongoDB",     angle: 200 },
      { Icon: SiFirebase,   label: "Firebase",    angle: 240 },
      { Icon: SiNodedotjs,  label: "Node.js",     angle: 280 },
      { Icon: FaDocker,     label: "Docker",      angle: 320 },
    ],
  },
  // Ring 4 — 6 icons (other languages & platforms)
  {
    radius: 455,
    duration: "62s",
    direction: -1,
    icons: [
      { Icon: SiCplusplus,  label: "C++",         angle: 0   },
      { Icon: SiDart,       label: "Dart",        angle: 60  },
      { Icon: SiFlutter,    label: "Flutter",     angle: 120 },
      { Icon: SiWordpress,  label: "WordPress",   angle: 180 },
      { Icon: SiVercel,     label: "Vercel",      angle: 240 },
      { Icon: SiLinux,      label: "Linux",       angle: 300 },
    ],
  },
]

// ─── About ────────────────────────────────────────────────────────────────────

export const aboutTags = [
  "Problem Solver",
  "Detail-Oriented",
  "Fast Learner",
  "Team Player",
]

export const aboutStats = [
  { value: "3+",  label: "Projects"       },
  { value: "2+",  label: "Years Learning" },
  { value: "16",  label: "Certificates"   },
]

// ─── Portfolio ────────────────────────────────────────────────────────────────

export interface Project {
  image: string
  title: string
  description: string
  longDescription?: string
  tags: string[]
  link?: string
  techStack?: string[]
  frameworks?: string[]
}

export const projects: Project[] = [
  {
    image: "/images/image1.png",
    title: "JBC School Supplies",
    description: "Front-end of an ordering system with product browsing, cart management, and order processing UI.",
    longDescription: "Front-end of an ordering system with product browsing, cart management, and order processing UI. Built with React and Tailwind CSS for a seamless shopping experience.",
    tags: ["Frontend", "UI Design"],
    techStack: ["JavaScript", "TypeScript", "HTML", "CSS"],
    frameworks: ["React", "Next.js", "Tailwind CSS", "Redux"],
  },
  {
    image: "/images/image2.jpg",
    title: "Deep Learning Attendance",
    description: "Intuitive web interface for marking and managing attendance powered by deep learning on the backend.",
    longDescription: "Intuitive web interface for marking and managing attendance powered by deep learning on the backend. The system integrates face recognition for automated attendance marking.",
    tags: ["Web App", "Deep Learning"],
    techStack: ["Python", "JavaScript", "SQL", "REST APIs"],
    frameworks: ["Flask", "React", "TensorFlow", "OpenCV"],
  },
  {
    image: "/images/image3.jpg",
    title: "Hardware Attendance System",
    description: "Anti-spoofing attendance system ensuring only real persons can mark attendance — no mobile bypass.",
    longDescription: "Anti-spoofing attendance system ensuring only real persons can mark attendance — no mobile bypass. Uses hardware sensors and deep learning validation for security.",
    tags: ["Hardware", "Security"],
    techStack: ["Python", "C++", "SQL", "Arduino"],
    frameworks: ["PyTorch", "OpenCV", "Flask", "PostgreSQL"],
  },
  {
    image: "/images/image4.png",
    title: "Tourist Spot Website",
    description: "Complete front-end design of a tourist destination site with engaging, user-friendly layout.",
    longDescription: "Complete front-end design of a tourist destination site with engaging, user-friendly layout. Features interactive maps, booking systems, and immersive imagery.",
    tags: ["Landing Page", "Tourism"],
    techStack: ["JavaScript", "TypeScript", "HTML", "CSS"],
    frameworks: ["React", "Mapbox", "Tailwind CSS", "Framer Motion"],
  },
]

// ─── Certificates ─────────────────────────────────────────────────────────────

export interface Certificate {
  src: string
  title: string
  issuer: string
  date: string
}

export const certificates: Certificate[] = [
  { src: "/images/certificates/cert-1.png",  title: "Project OWN IT: Beginner's Guide to Intellectual Property",                                   issuer: "Mindoro State University",                  date: "November 8, 2025"   },
  { src: "/images/certificates/cert-2.png",  title: "Project GAB-AI: Generative AI for Building Awareness and Innovation",                         issuer: "Mindoro State University",                  date: "November 8, 2025"   },
  { src: "/images/certificates/cert-3.png",  title: "ICT Project Management",                                                                      issuer: "DICT - ILCDB",                              date: "November 3, 2025"   },
  { src: "/images/certificates/cert-4.png",  title: "Stay Safe Online: Cybersecurity Basics",                                                      issuer: "DICT Region 3 - ILCDB",                     date: "November 8, 2025"   },
  { src: "/images/certificates/cert-5.png",  title: "Integrating Intelligence: Embedded Systems in Robotic Design",                                issuer: "GC Bitbarkada",                             date: "November 8, 2025"   },
  { src: "/images/certificates/cert-6.png",  title: "Sink or Swim in Health Education, Research, and Care in the Age of Generational A.I.",        issuer: "UP Manila - NTTCHP",                        date: "November 7, 2025"   },
  { src: "/images/certificates/cert-7.png",  title: "Design Thinking for Developers: Quickstart to UX Foundations and Figma",                      issuer: "Codenames x Gordon College",                date: "November 22, 2025"  },
  { src: "/images/certificates/cert-8.png",  title: "Basics of Arduino and IoT: Introduction to Arduino Programming and Internet of Things",        issuer: "Gordon College - Keyboard Pioneers",        date: "November 23, 2025"  },
  { src: "/images/certificates/cert-9.png",  title: "Scene Synergy: How to Balance Interactions between 2D Characters and Environment Art",         issuer: "The Skyrocket Collective x Gordon College", date: "November 22, 2025"  },
  { src: "/images/certificates/cert-10.png", title: "Understanding HTML and CSS: The Simple Guide to Webpage Design",                              issuer: "Mindoro State University",                  date: "November 27, 2025"  },
  { src: "/images/certificates/cert-11.png", title: "Understanding Web3",                                                                          issuer: "DICT - ILCDB Caraga",                       date: "November 20, 2025"  },
  { src: "/images/certificates/cert-12.png", title: "Digital Marketing for Startups and MSMEs Using AI",                                           issuer: "DICT - ILCDB Caraga",                       date: "November 21, 2025"  },
  { src: "/images/certificates/cert-13.png", title: "Internet of Things (IoT) in Smart Cities",                                                    issuer: "DICT - ILCDB Caraga",                       date: "November 24, 2025"  },
  { src: "/images/certificates/cert-14.png", title: "Utilization of Digital Applications and Programs for Institutional Improvement",              issuer: "DICT Region 3 - ILCDB",                     date: "November 25, 2025"  },
  { src: "/images/certificates/cert-15.png", title: "Internet Media and Information Literacy",                                                     issuer: "DICT Region 3 - ILCDB",                     date: "November 25, 2025"  },
  { src: "/images/certificates/cert-16.png", title: "Fundamentals of Blockchain",                                                                  issuer: "DICT - ILCDB Caraga",                       date: "December 2, 2025"   },
]

// ─── Contact ──────────────────────────────────────────────────────────────────

export interface ContactInfo {
  Icon: React.FC
  text: string
}

export const contactInfo: ContactInfo[] = [
  { Icon: MailIcon,   text: "jettvillegas234@gmail.com" },
  { Icon: MapPinIcon, text: "Philippines"               },
]

// ─── Skills ───────────────────────────────────────────────────────────────────

export interface SkillData {
  icon: React.ReactNode
  title: string
  level: number
  desc: string
  tags: string[]
}

export const skillData: Record<string, SkillData> = {
  html5: {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
      </svg>
    ),
    title: "HTML5", level: 4,
    desc: "I write clean, semantic HTML5 that forms the structural backbone of every project I build. From accessible markup and ARIA roles to custom data attributes — I treat HTML as the foundation that everything else rests on.",
    tags: ["Semantic Markup", "Accessibility", "Forms", "SEO Structure"],
  },
  css3: {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414v-.001z" />
      </svg>
    ),
    title: "CSS3", level: 4,
    desc: "CSS is where I spend a lot of my creative energy. Flexbox, Grid, custom properties, keyframe animations — I love crafting responsive layouts and micro-interactions that make interfaces feel alive.",
    tags: ["Flexbox", "CSS Grid", "Animations", "Responsive Design", "Custom Properties"],
  },
  javascript: {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
      </svg>
    ),
    title: "JavaScript", level: 3,
    desc: "I use JavaScript for DOM manipulation, event-driven interactivity, async data fetching, and building dynamic UI behavior. Core ES6+ concepts like arrow functions, promises, and modules are part of my daily workflow.",
    tags: ["ES6+", "DOM API", "Fetch / AJAX", "Event Handling", "Intersection Observer"],
  },
  typescript: {
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
      </svg>
    ),
    title: "TypeScript", level: 3,
    desc: "I've been learning TypeScript to write safer, more maintainable code. Types, interfaces, and generics help me catch bugs early and document intent clearly.",
    tags: ["Types & Interfaces", "Generics", "Type Safety", "TS Config"],
  },
  react: {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.092-.278zm-.005 1.09c.527 0 .97.2 1.27.562.617.733.748 2.354.39 4.395l-.108.541-.5-.176a12.76 12.76 0 0 0-1.06-.284 12.79 12.79 0 0 0-.5-.095 12.59 12.59 0 0 0-.984-1.81l-.308-.45.261-.432c.73-1.205 1.494-1.84 2.04-1.84zm-7.434 0c.546 0 1.31.635 2.038 1.84l.262.432-.308.45a12.59 12.59 0 0 0-.985 1.81 12.79 12.79 0 0 0-.5.095 12.76 12.76 0 0 0-1.06.284l-.5.176-.108-.54c-.36-2.042-.226-3.663.39-4.396.3-.362.743-.561 1.271-.561zm3.717 6.662l.488.148-.038.508a10.18 10.18 0 0 0 1.503l.038.508-.488.148c-.325.093-.645.18-.955.262a12.2 12.2 0 0 0-.254-.508 10.18 10.18 0 0 1 0-2.323c.086-.174.17-.34.254-.508.31.083.63.17.955.262zm4.107 0c.084.168.168.334.254.508a10.18 10.18 0 0 1 0 2.323c-.086.174-.17.34-.254.508a12.2 12.2 0 0 0-.955-.262l-.488-.148.038-.508a10.18 10.18 0 0 0 0-1.503l-.038-.508.488-.148c.325-.092.645-.18.955-.262zM12 8.57c.35.504.686 1.036.996 1.586l.26.453-.26.453c-.31.55-.646 1.082-.996 1.586-.35-.504-.686-1.036-.996-1.586l-.26-.453.26-.453C11.314 9.606 11.65 9.074 12 8.57z"/>
      </svg>
    ),
    title: "React", level: 3,
    desc: "React is my primary frontend framework. I build component-based UIs with hooks, context, and state management — creating scalable, maintainable applications.",
    tags: ["Hooks", "Context API", "Component Design", "State Management"],
  },
  tailwind: {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
      </svg>
    ),
    title: "Tailwind", level: 4,
    desc: "Tailwind CSS is my styling tool of choice. I use utility classes to rapidly build responsive, consistent designs without leaving the HTML.",
    tags: ["Utility-First", "Responsive", "Dark Mode", "Custom Config"],
  },
  figma: {
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.026-4.49 4.515-4.49c2.489 0 4.515 2.014 4.515 4.49S10.661 24 8.172 24zm0-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019zm7.704 7.509c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49 4.49 2.014 4.49 4.49-2.014 4.49-4.49 4.49zm0-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019z" />
      </svg>
    ),
    title: "Figma", level: 3,
    desc: "I use Figma for wireframing, UI design, and prototyping. From component libraries to high-fidelity mockups, I translate design ideas into developer-ready assets.",
    tags: ["UI Design", "Wireframing", "Prototyping", "Components", "Auto Layout"],
  },
  python: {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
      </svg>
    ),
    title: "Python", level: 3,
    desc: "Python is my go-to for scripting, data processing, and backend experiments including automation and deep learning systems.",
    tags: ["Scripting", "Automation", "Data Processing", "Deep Learning", "Flask"],
  },
  php: {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .97-.105 1.242-.314.272-.21.455-.559.55-1.049.092-.47.05-.802-.124-.995-.175-.193-.523-.29-1.047-.29zM12 5.688C5.373 5.688 0 8.514 0 12s5.373 6.313 12 6.313S24 15.486 24 12c0-3.486-5.373-6.312-12-6.312zm-3.26 7.451c-.261.25-.575.438-.917.551-.336.108-.765.164-1.285.164H5.357l-.327 1.681H3.652l1.23-6.326h2.65c.797 0 1.378.209 1.744.628.366.418.476 1.002.33 1.752a2.836 2.836 0 0 1-.555 1.148 2.85 2.85 0 0 1-.311.402zm4.099 1.82l-.8-1.93-1.22 1.93H9.59l2.065-3.05-1.168-2.881h1.358l.766 1.836 1.164-1.836h1.282l-2.016 2.989 1.195 2.942H12.84zm5.81-2.323c-.261.25-.575.438-.917.551-.336.108-.765.164-1.284.164h-1.181l-.327 1.681h-1.378l1.23-6.326h2.65c.797 0 1.378.209 1.744.628.366.418.476 1.002.33 1.752a2.836 2.836 0 0 1-.555 1.148 2.947 2.947 0 0 1-.312.402zm-.51-1.765c-.174-.193-.523-.29-1.046-.29h-.944l-.516 2.648h.838c.557 0 .97-.105 1.242-.314.272-.21.455-.559.55-1.049.092-.47.049-.802-.124-.995z" />
      </svg>
    ),
    title: "PHP", level: 2,
    desc: "I've used PHP for server-side scripting, building CRUD applications, and working with MySQL databases.",
    tags: ["CRUD", "MySQL", "Server-Side", "Sessions", "REST APIs"],
  },
  supabase: {
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C.150 12.888.753 14.064 1.824 14.064l7.781-.002-1.59 8.903c.017.985 1.261 1.408 1.874.636l9.262-11.653c.613-.837.010-2.012-1.061-2.012l-7.781.002 1.590-8.902z" />
      </svg>
    ),
    title: "Supabase", level: 3,
    desc: "Supabase gives me PostgreSQL power with a developer-friendly API. I use it for auth, real-time subscriptions, and full-stack features.",
    tags: ["PostgreSQL", "Auth", "Real-Time", "Row-Level Security", "REST API"],
  },
  cpp: {
    icon: (
      <span className="text-xl font-black text-[var(--accent2)]" style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}>C++</span>
    ),
    title: "C++", level: 2,
    desc: "C++ taught me low-level thinking — memory management, pointers, object-oriented design, data structures and algorithms.",
    tags: ["OOP", "Data Structures", "Algorithms", "Memory Management", "STL"],
  },
  dart: {
    icon: (
      <span className="text-lg font-extrabold text-[var(--accent2)]" style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}>Dart</span>
    ),
    title: "Dart", level: 2,
    desc: "Learning Dart in the context of Flutter for cross-platform mobile development. Building clean, reactive UIs with it.",
    tags: ["Flutter", "Mobile Dev", "Reactive UI", "Cross-Platform", "OOP"],
  },
  wordpress: {
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.034 1.231-.105 1.231-.105.582-.07.514-.925-.067-.892 0 0-1.749.138-2.878.138-.972 0-2.61-.138-2.61-.138-.581-.034-.648.857-.066.891 0 0 .549.07 1.127.105l1.674 4.584-2.35 7.053-3.911-11.637c.647-.034 1.231-.105 1.231-.105.582-.07.514-.925-.067-.891 0 0-1.749.137-2.878.137-.202 0-.44-.005-.693-.014C6.029 3.386 9.359 1.413 13.17 1.413c2.839 0 5.426 1.082 7.369 2.852-.046-.003-.091-.009-.14-.009-1.042 0-1.781.909-1.781 1.885 0 .875.504 1.613 1.042 2.487.404.706.874 1.613.874 2.922 0 .906-.349 1.958-.814 3.421l-1.067 3.564-3.863-11.49M13.071 14.06l-3.31 9.612c.99.29 2.035.448 3.12.448 1.285 0 2.518-.209 3.671-.597a.737.737 0 0 1-.058-.114l-3.423-9.349M2.308 12c0-2.534.88-4.865 2.35-6.7L9.201 20.66C5.212 18.902 2.308 15.778 2.308 12M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0" />
      </svg>
    ),
    title: "WordPress", level: 3,
    desc: "I've built and customized WordPress sites using themes, page builders, and plugin configurations for client-ready delivery.",
    tags: ["Theme Customization", "Plugins", "Page Builders", "WP Admin"],
  },
}

export const levelLabels = ["", "Learning", "Familiar", "Proficient", "Advanced", "Expert"]

export const frontendSkills = ["html5", "css3", "javascript", "typescript", "react", "tailwind", "figma"]
export const backendSkills  = ["python", "php", "supabase", "cpp", "dart", "wordpress"]