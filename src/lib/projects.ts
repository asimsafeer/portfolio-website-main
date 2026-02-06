

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  video?: string;
  images?: string[];
  videos?: { title: string; url: string }[];
  tags: string[];
  link: string;
  github: string;
  category: 'software' | 'design' | 'videography' | 'github';
  featured: boolean;
  color: string;
}

export const projects: Project[] = [
  // SOFTWARE PROJECTS
  {
    id: "poul3y",
    title: "Poul3y App",
    description: "A comprehensive digital platform for modern poultry industry management. Features real-time data access, disease tracking, and resource planning to optimize farm operations.",
    image: "/assets/portfolio/AasimSafeer-Portfolio/Poul3y App/Poul3y Logo.png",
    tags: ["Flutter", "UI/UX", "Mobile App", "Figma"],
    link: "https://www.figma.com/design/DlvNVRULKgxqMXLcuGbKaT/Poul3y?node-id=0-1&t=lIlyVWJoDn0A8Giw-1",
    github: "#",
    category: "software",
    featured: true,
    color: "from-orange-500/20 to-red-500/20"
  },
  {
    id: "poultry-calculator",
    title: "Poultry Calculator",
    description: "A specialized utility app for poultry farmers to calculate feed ratios, growth projections, and resource requirements with precision.",
    image: "/assets/portfolio/AasimSafeer-Portfolio/Poultry Calculator App/Poultry Calculator Logo.png",
    images: [
      "/assets/portfolio/AasimSafeer-Portfolio/Poultry Calculator App/UI Design/Screenshot 2026-01-08 at 1.05.30 PM.png",
      "/assets/portfolio/AasimSafeer-Portfolio/Poultry Calculator App/UI Design/Screenshot 2026-01-08 at 1.03.55 PM.png"
    ],
    tags: ["Flutter", "Utility", "Calculator", "Figma"],
    link: "https://www.figma.com/design/o0QdbJi1Tqc0cSyW93V6E3/Poul3y-Calculator?node-id=0-1&t=s4XGmYpGyIHn9Yqi-1",
    github: "#",
    category: "software",
    featured: true,
    color: "from-blue-500/20 to-cyan-500/20"
  },

  // GRAPHIC DESIGN PROJECTS
  {
    id: "cems-design",
    title: "CEMS Brand Identity",
    description: "Complete visual identity and social media campaign for Creative Engineering & Management Services. improved brand recognizability through consistent design language.",
    image: "/assets/portfolio/AasimSafeer-Portfolio/CEMS Job Ads/Creative Engineering and Management Services Logo.png",
    images: [
      "/assets/portfolio/AasimSafeer-Portfolio/CEMS Job Ads/Hiring Posts/1.png",
      "/assets/portfolio/AasimSafeer-Portfolio/CEMS Job Ads/Hiring Posts/2.png",
      "/assets/portfolio/AasimSafeer-Portfolio/CEMS Job Ads/Hiring Posts/3.png",
      "/assets/portfolio/AasimSafeer-Portfolio/CEMS Job Ads/Hiring Posts/4.png",
      "/assets/portfolio/AasimSafeer-Portfolio/CEMS Job Ads/Hiring Posts/5.png"
    ],
    tags: ["Social Media", "Branding", "Canva", "Adobe Suite"],
    link: "#",
    github: "#",
    category: "design",
    featured: true,
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: "ecosun-design",
    title: "EcoSun Global Branding",
    description: "Corporate branding package including brochures, business cards, and social media assets for a renewable energy company.",
    image: "/assets/portfolio/AasimSafeer-Portfolio/EcoSun Global/Ecosun Global Logo.png",
    images: [
      "/assets/portfolio/AasimSafeer-Portfolio/EcoSun Global/Brochures & Cards/Urdu version brochure.jpeg",
      "/assets/portfolio/AasimSafeer-Portfolio/EcoSun Global/Social Media Posts/Posts/1.png" // Assuming standard naming, fallback check later
    ],
    tags: ["Print Design", "Corporate Identity", "Marketing", "Canva"],
    link: "https://www.canva.com/design/DAGrWsjV3RY/_j6u0BRSt0Mi92Yu6Og2nA/edit",
    github: "#",
    category: "design",
    featured: false,
    color: "from-green-500/20 to-emerald-500/20"
  },

  // VIDEOGRAPHY PROJECTS
  {
    id: "florid-hotel",
    title: "Florid Hotel Cinematic Tour",
    description: "A series of cinematic promotional videos showcasing the luxury and ambiance of Florid Hotel. capturing the essence of hospitality through dynamic storytelling.",
    image: "/assets/portfolio/AasimSafeer-Portfolio/Florid Hotel/Florid Hotel Logo.png",
    video: "/assets/portfolio/AasimSafeer-Portfolio/Florid Hotel/lv_0_20241022195504.mp4",
    videos: [
      { title: "Hotel Ambiance", url: "/assets/portfolio/AasimSafeer-Portfolio/Florid Hotel/lv_0_20241022195504.mp4" },
      { title: "Guest Experience", url: "/assets/portfolio/AasimSafeer-Portfolio/Florid Hotel/lv_0_20241216222800.mp4" },
      { title: "Event Highlights", url: "/assets/portfolio/AasimSafeer-Portfolio/Florid Hotel/lv_0_20241202192743.mp4" }
    ],
    tags: ["Cinematography", "Video Editing", "Color Grading", "Hospitality"],
    link: "#",
    github: "#",
    category: "videography",
    featured: true,
    color: "from-amber-500/20 to-yellow-500/20"
  },
  {
    id: "ecosun-video",
    title: "EcoSun Site Walkthrough",
    description: "On-site promotional video demonstrating solar installation projects and company capabilities.",
    image: "/assets/portfolio/AasimSafeer-Portfolio/EcoSun Global/Ecosun Global Logo.png",
    video: "/assets/portfolio/AasimSafeer-Portfolio/EcoSun Global/Site Videos/Peshawar Hotel.MP4",
    tags: ["Site Visit", "Corporate Video", "Documentation"],
    link: "#",
    github: "#",
    category: "videography",
    featured: false,
    color: "from-sky-500/20 to-blue-500/20"
  }
];
