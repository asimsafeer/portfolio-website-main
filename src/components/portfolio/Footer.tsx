"use client"

import { motion, useInView } from "framer-motion"
import { Github, Linkedin, Instagram, Heart, ArrowUp } from "lucide-react"
import { useRef } from "react"

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = [
    { href: "https://github.com/asimsafeer", icon: Github, label: "GitHub" },
    { href: "https://www.linkedin.com/in/asim-safeer-786710372", icon: Linkedin, label: "LinkedIn" },
    { href: "https://www.instagram.com/asim_safeer75", icon: Instagram, label: "Instagram" },
  ]

  return (
    <footer ref={ref} className="py-12 border-t border-border relative overflow-hidden">
      {/* Gradient border at top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          background: "linear-gradient(90deg, transparent, var(--primary), transparent)"
        }}
      />

      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold tracking-tight"
          >
            AASIM SAFEER PORTFOLIO
            <motion.span
              className="text-primary"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              .
            </motion.span>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 + i * 0.1, type: "spring" }}
                whileHover={{ scale: 1.2, y: -3, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm text-muted-foreground flex items-center gap-1"
          >
            © {new Date().getFullYear()} Designed & Built with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.span>
            using Next.js
          </motion.p>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex gap-6"
          >
            <motion.a
              href="#"
              whileHover={{ x: 3 }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ x: 3 }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </motion.a>
          </motion.div>
        </div>

        {/* Back to top button */}
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          whileHover={{ y: -3, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-8 bottom-8 w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      </div>
    </footer>
  )
}
