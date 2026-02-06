"use client"

import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Github, Linkedin, Instagram } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState, useEffect } from "react"

const navItems = [
  { href: "#hero", label: "Home", hideOnMobile: false },
  { href: "#about", label: "About", hideOnMobile: true },
  { href: "#experience", label: "Experience", hideOnMobile: false },
  { href: "#projects", label: "Projects", hideOnMobile: false },
  { href: "#contact", label: "Contact", hideOnMobile: false },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const { scrollY } = useScroll()

  // Track scroll position for background change
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.replace("#", ""))

      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-6"
    >
      <motion.nav
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className={`flex items-center gap-3 md:gap-6 rounded-full px-4 md:px-6 py-3 border max-w-[95vw] md:max-w-none overflow-x-auto no-scrollbar transition-all duration-300 ${isScrolled
            ? "bg-background/90 backdrop-blur-xl border-border/50 shadow-lg"
            : "bg-background/60 backdrop-blur-xl border-border/30"
          }`}
      >
        {navItems.map((item, index) => {
          const isActive = activeSection === item.href.replace("#", "")
          return (
            <motion.a
              key={item.href}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -2 }}
              className={`${item.hideOnMobile ? 'hidden md:block' : ''} text-sm font-medium transition-colors whitespace-nowrap relative group ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              {item.label}
              {/* Animated underline */}
              <motion.span
                className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                initial={{ width: 0 }}
                animate={{ width: isActive ? "100%" : 0 }}
                transition={{ duration: 0.3 }}
              />
              {/* Hover underline */}
              <motion.span
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/50 group-hover:w-full transition-all duration-300"
                style={{ display: isActive ? 'none' : 'block' }}
              />
            </motion.a>
          )
        })}

        <motion.div
          className="w-px h-4 bg-border mx-1 md:mx-2"
          animate={{ opacity: isScrolled ? 0.8 : 0.5 }}
        />

        <div className="flex items-center gap-3">
          <motion.a
            href="https://github.com/asimsafeer"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.2, rotate: 5, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="w-4 h-4" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/asim-safeer-786710372?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.2, rotate: 5, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </motion.a>
          <motion.a
            href="https://www.instagram.com/asim_safeer75?igsh=MWhyZTdkemljd2h3OA%3D%3D&utm_source=qr"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.2, rotate: 5, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </motion.a>
          <motion.div
            className="w-px h-4 bg-border"
            animate={{ opacity: isScrolled ? 0.8 : 0.5 }}
          />
          <ThemeToggle />
        </div>
      </motion.nav>
    </motion.header>
  )
}
