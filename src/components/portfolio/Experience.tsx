"use client"

import { motion, useInView, Variants } from "framer-motion"
import { Briefcase, Calendar, MapPin, ChevronRight } from "lucide-react"
import { useRef } from "react"

const experiences = [
  {
    role: "Project Manager & Coordinator",
    company: "Creative Engineering & Management Services",
    period: "August 2024 – Present",
    location: "Peshawar, Pakistan",
    description: "Led end-to-end development of digital solutions, from vendor selection to final delivery, ensuring alignment with company goals.",
    highlights: [
      "Led end-to-end development of a mobile application and website, from vendor selection to final delivery, ensuring alignment with company goals.",
      "Researched and shortlisted software companies evaluated proposals and coordinated contracts for app development.",
      "Managed all project phases including UI/UX approvals, feature reviews and multi-team collaboration.",
      "Oversaw timelines, tracked progress, identified risks and implemented solutions to keep projects on schedule.",
      "Acted as the primary liaison between internal stakeholders and development teams, facilitating clear communication and timely decision-making.",
      "Successfully drove the project independently after handover from the company, leading meetings, monitoring progress and ensuring delivery quality."
    ]
  },
  {
    role: "Lead Project Coordinator",
    company: "Creative Engineering & Management Services",
    period: "May 2023 – July 2024",
    location: "Peshawar, Pakistan",
    description: "Managed daily task assignment and tracking for a cross functional team to ensure clarity and accountability.",
    highlights: [
      "Managed daily task assignment and tracking for a cross functional team to ensure clarity and accountability.",
      "Delegated tasks assigned by the CEO to team leads and members, monitored completion and followed up daily to keep projects on track.",
      "Reviewed team progress and reported performance to CEO, enabling data-driven decisions and operational efficiency.",
      "Guided team members to manage their own tasks, encouraged independence and improved overall accountability.",
      "Facilitated communication and follow-ups across multiple platforms, streamlining workflow and reducing delays.",
      "Built and maintained a sustainable system to track performance, optimize productivity and allow leadership to focus on strategic priorities."
    ]
  },
  {
    role: "Business Auditor",
    company: "Creative Engineering & Management Services",
    period: "July 2024 – December 2024",
    location: "Peshawar, Pakistan",
    description: "Conducted field audits for partner shop owners, ensuring company investments and revenue were accurately accounted for.",
    highlights: [
      "Conducted extensive field audits for partner shop owners to verify financial records and inventory.",
      "Ensured company investments and revenue streams were accurately accounted for and reported.",
      "Identified discrepancies in financial data and recommended corrective actions to mitigate risk.",
      "Collaborated with business partners to improve financial transparency and operational compliance."
    ]
  },
  {
    role: "Project Coordinator | Website Redesign Project",
    company: "SAS Engineering",
    period: "November 2025 – December 2025",
    location: "Remote",
    description: "Served as the primary liaison between the client and development team, translating requirements into actionable tasks.",
    highlights: [
      "Served as the primary liaison between the client and development team, translating requirements into actionable design and development tasks.",
      "Coordinated and provided all necessary resources, including images, content, and reference materials, to ensure seamless project execution.",
      "Maintained project timelines, monitored progress, and integrated client feedback to guarantee the final website aligned with expectations.",
      "Facilitated effective communication between stakeholders, reducing delays and ensuring smooth workflow throughout the project lifecycle."
    ]
  },
  {
    role: "Final Year Project: Poul3y",
    company: "City University of Science & Information Technology",
    period: "October 2024 – June 2025",
    location: "Peshawar, Pakistan",
    description: "Conceptualized, designed, and developed the Poul3y App, a digital platform for modernizing poultry industry management.",
    highlights: [
      "Collaborated with a teammate to conceptualized, designed, and developed the Poul3y App, a digital platform aimed at modernizing poultry industry management through real-time data access, disease tracking, and resource planning.",
      "Managed all phases of the project lifecycle from user requirement gathering to UI/UX design, development, and testing using Flutter and GitHub.",
      "Conducted stakeholder interviews and field research to align app features with real-world needs.",
      "Reduced development time by 15% through efficient sprint planning and collaborative coding practices.",
      "Successfully deployed a pilot version, with 50+ users testing functionality in real market scenarios."
    ]
  },
  {
    role: "CruzeX – Autonomous Vehicle Technology Research",
    company: "City University of Science & Information Technology",
    period: "2024 – 2025",
    location: "Peshawar, Pakistan",
    description: "Provided support in the development of a Self-Driving Car final year project focused on autonomous vehicle technology.",
    highlights: [
      "Providing support in the development of the Self-Less Driving Car final year project, focused on autonomous vehicle technology.",
      "Actively involved in research, design and implementation of critical project features.",
      "Collaborating closely with the project team to ensure timely achievement of project milestones.",
      "Assisting in identifying and resolving technical challenges during development.",
      "Gaining hands on exposure to cutting-edge automotive technologies.",
      "Strengthening problem-solving skills and enhancing cross-functional collaboration and project management abilities."
    ]
  }
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

// Animated timeline line component
function TimelineLine({ isInView }: { isInView: boolean }) {
  return (
    <svg
      className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2 hidden md:block h-full overflow-visible"
      preserveAspectRatio="none"
    >
      <motion.line
        x1="0"
        y1="0"
        x2="0"
        y2="100%"
        stroke="currentColor"
        strokeWidth="1"
        className="text-border"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      {/* Glowing animated dot */}
      <motion.circle
        cx="0"
        r="4"
        className="fill-primary"
        initial={{ cy: "0%" }}
        animate={isInView ? { cy: ["0%", "100%"] } : { cy: "0%" }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <animate
          attributeName="opacity"
          values="1;0.5;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </motion.circle>
    </svg>
  )
}

export function Experience() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section id="experience" className="py-24" ref={sectionRef}>
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Briefcase className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Career Journey</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Professional Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            A journey of leading impactful projects and building innovative digital solutions.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto space-y-12 relative"
        >
          {/* Animated timeline */}
          <TimelineLine isInView={isInView} />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative pl-8 md:pl-0"
            >
              <div className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1 w-full">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className={`bg-secondary/20 p-8 rounded-2xl border border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 ${index % 2 === 0 ? 'md:text-left' : 'md:text-left'}`}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 mb-2 text-primary font-bold uppercase tracking-wider text-xs"
                    >
                      <Briefcase className="w-3 h-3" />
                      {exp.company}
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">{exp.role}</h3>
                    <div className={`flex flex-wrap gap-4 text-sm text-muted-foreground mb-4 ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-start'}`}>
                      <motion.span
                        className="flex items-center gap-1"
                        whileHover={{ scale: 1.05, color: "var(--primary)" }}
                      >
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </motion.span>
                      <motion.span
                        className="flex items-center gap-1"
                        whileHover={{ scale: 1.05, color: "var(--primary)" }}
                      >
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </motion.span>
                    </div>
                    <p className="mb-6 leading-relaxed">
                      {exp.description}
                    </p>
                    <ul className="space-y-3 text-sm text-muted-foreground list-none">
                      {exp.highlights.slice(0, 4).map((highlight, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                          viewport={{ once: true }}
                          className="flex items-start gap-3 group"
                        >
                          <motion.span
                            whileHover={{ scale: 1.5, rotate: 90 }}
                            className="mt-1.5 shrink-0"
                          >
                            <ChevronRight className="w-3 h-3 text-primary" />
                          </motion.span>
                          <span className="flex-1 group-hover:text-foreground transition-colors">{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.3 }}
                  className="absolute left-0 md:left-1/2 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)] z-10"
                />

                <div className="flex-1 hidden md:block" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
