"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

const technicalSkills = [
  "Agile & Scrum", "Timeline & Task Tracking", "Jira / Asana / Trello",
  "Notion & Click-up", "Data Analysis & Reporting", "Digital Project Delivery",
  "UI/UX Design", "Flutter & GitHub", "Financial Auditing", "Digital Marketing"
]

const managerialSkills = [
  "Project Management", "Team Collaboration", "Process Improvement",
  "Executive Support", "Stakeholder Management", "Risk Management",
  "Administrative Planning", "Problem Solving", "Strategic Planning"
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return <span ref={ref}>{count}{suffix}</span>
}

export function About() {
  return (
    <section id="about" className="py-24 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-8"
            >
              About Me
            </motion.h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                I&apos;m a proactive Project Manager & Lead Project Coordinator with experience supporting senior leadership
                and driving cross-functional projects. I specialize in managing timelines, dashboards and executive
                documentation while liaising with internal and external stakeholders.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Key contributor to digital solutions like the Poul3y App, handling UI/UX, project tracking and
                multi-team collaboration. Adept at risk management, agile execution and maintaining
                confidentiality, committed to ensuring smooth operations and timely project delivery.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Education</h3>
                  <div className="border-l-2 border-primary/20 pl-4 space-y-4">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <h4 className="font-semibold text-foreground">BS in Computer Science</h4>
                      <p className="text-sm">City University of Science & Information Technology</p>
                      <p className="text-xs text-muted-foreground">2021 — 2025</p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <h4 className="font-semibold text-foreground">Diploma in Information Technology</h4>
                      <p className="text-sm">Export IT & Solution</p>
                    </motion.div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Certifications</h3>
                  <div className="border-l-2 border-primary/20 pl-4 space-y-2">
                    {["Foundations of Project Management (Coursera)", "MS Office (Coursera)", "Create A Mockup in Figma (Coursera)", "Create IT Diagrams with Lucidchart (Coursera)"].map((cert, i) => (
                      <motion.p
                        key={cert}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        viewport={{ once: true }}
                        className="text-sm text-foreground"
                      >
                        {cert}
                      </motion.p>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="mt-12 space-y-8">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Technical Expertise</h3>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-3"
                >
                  {technicalSkills.map((skill, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <Badge skill={skill} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Managerial Expertise</h3>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-3"
                >
                  {managerialSkills.map((skill, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <Badge skill={skill} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              animate={{
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 via-purple-500/20 to-cyan-500/30 blur-2xl"
            />

            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-r from-primary to-purple-500 blur-3xl"
            />

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 to-primary blur-3xl"
            />

            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl group border-2 border-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <motion.img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/e886c98e-2f49-4190-97cb-917129475fa3/WhatsApp-Image-2025-12-22-at-17.41.36-1768983466152.png?width=8000&height=8000&resize=contain"
                alt="Aasim Safeer"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute bottom-0 left-0 right-0 p-6 z-20"
              >
                <p className="text-white font-semibold text-lg">Aasim Safeer</p>
                <p className="text-white/70 text-sm">Project Manager & Lead Coordinator</p>
              </motion.div>

              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/20 pointer-events-none" />
            </motion.div>

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, rotate: 10 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(var(--primary), 0.3)",
                  "0 0 40px rgba(var(--primary), 0.5)",
                  "0 0 20px rgba(var(--primary), 0.3)"
                ]
              }}
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-primary-foreground font-bold text-center leading-tight shadow-xl cursor-pointer"
            >
              <span className="relative z-10">Project <br /> Manager</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, type: "spring" }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, x: -5 }}
              className="absolute -top-4 -left-4 bg-background/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl"
            >
              <p className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"><AnimatedCounter value={3} />+</p>
              <p className="text-xs text-muted-foreground">Years Experience</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, type: "spring" }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, x: -5 }}
              className="absolute top-1/2 -left-8 bg-background/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl"
            >
              <p className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-primary bg-clip-text text-transparent"><AnimatedCounter value={10} />+</p>
              <p className="text-xs text-muted-foreground">Projects Delivered</p>
            </motion.div>

            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-10 -right-4 w-4 h-4 rounded-full bg-primary/60"
            />
            <motion.div
              animate={{
                y: [0, 10, 0],
                rotate: [0, -5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute bottom-20 -left-2 w-3 h-3 rounded-full bg-purple-500/60"
            />
            <motion.div
              animate={{
                y: [0, -8, 0],
                x: [0, 5, 0]
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute top-1/3 -right-6 w-2 h-2 rounded-full bg-cyan-500/60"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Badge({ skill }: { skill: string }) {
  return (
    <motion.span
      whileHover={{ scale: 1.05, y: -2 }}
      className="px-4 py-2 rounded-full border border-border text-sm font-medium hover:border-primary hover:text-primary transition-colors bg-secondary/10 cursor-default"
    >
      {skill}
    </motion.span>
  )
}
