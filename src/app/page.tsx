import { Navbar } from "@/components/portfolio/Navbar"
import { Hero } from "@/components/portfolio/Hero"
import { About } from "@/components/portfolio/About"
import { Experience } from "@/components/portfolio/Experience"
import { Projects } from "@/components/portfolio/Projects"
import { Contact } from "@/components/portfolio/Contact"
import { Footer } from "@/components/portfolio/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
