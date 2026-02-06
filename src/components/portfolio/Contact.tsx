"use client"

import { motion, useInView } from "framer-motion"
import { Send, Mail, Phone, MapPin, Github, Linkedin, Instagram, MessageSquare, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRef, useState } from "react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

// Floating label input component
function FloatingInput({
  label,
  type = "text",
  ...props
}: {
  label: string
  type?: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="relative">
      <motion.label
        className={`absolute left-3 transition-all duration-200 pointer-events-none ${isFocused || hasValue
          ? "text-xs top-2 text-primary"
          : "text-sm top-4 text-muted-foreground"
          }`}
        animate={{
          y: isFocused || hasValue ? 0 : 4,
          scale: isFocused || hasValue ? 0.85 : 1,
        }}
      >
        {label}
      </motion.label>
      <Input
        ref={inputRef}
        type={type}
        className="rounded-xl h-14 pt-5 bg-background/50 focus:ring-2 focus:ring-primary/20 transition-all border-white/10 hover:border-primary/30"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false)
          setHasValue(e.target.value.length > 0)
        }}
        onChange={(e) => setHasValue(e.target.value.length > 0)}
        {...props}
      />
    </div>
  )
}

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset after showing success
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "asimsafeer75@gmail.com",
      href: "mailto:asimsafeer75@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+92 308 8881818",
      href: "tel:+923088881818"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Peshawar, Pakistan",
      href: null
    }
  ]

  const socialLinks = [
    { icon: Github, href: "https://github.com/asimsafeer", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/asim-safeer-786710372", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/asim_safeer75", label: "Instagram" }
  ]

  return (
    <section id="contact" className="py-24" ref={ref}>
      <div className="container px-4 mx-auto max-w-6xl">
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
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Get In Touch</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Let&apos;s Connect
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Ready to bring innovative digital solutions to your next project.
            Reach out for collaborations or just a friendly hello.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass rounded-3xl p-8 border space-y-6"
            >
              <h3 className="text-2xl font-bold mb-6">Contact Info</h3>

              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.label}
                  variants={itemVariants}
                  className="flex items-start gap-4 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors"
                  >
                    <info.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    {info.href ? (
                      <motion.a
                        href={info.href}
                        className="text-lg font-medium hover:text-primary transition-colors"
                        whileHover={{ x: 3 }}
                      >
                        {info.value}
                      </motion.a>
                    ) : (
                      <p className="text-lg font-medium">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              <motion.div variants={itemVariants} className="pt-4 flex gap-4">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.1, y: -3, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-2xl bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors group"
                  >
                    <social.icon className="w-6 h-6 group-hover:text-primary transition-colors" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2 glass rounded-3xl p-8 md:p-12 border shadow-sm relative overflow-hidden"
          >
            {/* Success overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isSubmitted ? 1 : 0 }}
              className={`absolute inset-0 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center z-10 ${isSubmitted ? 'pointer-events-auto' : 'pointer-events-none'}`}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: isSubmitted ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
              <p className="text-muted-foreground">Thank you for reaching out. I&apos;ll get back to you soon.</p>
            </motion.div>

            <motion.form
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                  <FloatingInput label="Your Name" name="name" required />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <FloatingInput label="Email Address" type="email" name="email" required />
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  placeholder="Tell me about your project or inquiry..."
                  className="min-h-[150px] rounded-2xl bg-background/50 resize-none focus:ring-2 focus:ring-primary/20 transition-all border-white/10 hover:border-primary/30"
                  name="message"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    className="w-full rounded-xl h-14 text-lg group relative overflow-hidden"
                    disabled={isSubmitting}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary via-chart-1 to-primary"
                      animate={{ x: isSubmitting ? ["0%", "100%"] : "0%" }}
                      transition={{ duration: 1, repeat: isSubmitting ? Infinity : 0 }}
                      style={{ backgroundSize: "200% 100%" }}
                    />
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
