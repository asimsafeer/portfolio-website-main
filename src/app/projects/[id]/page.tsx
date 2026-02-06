"use client"

import { projects } from "@/lib/projects"
import { Navbar } from "@/components/portfolio/Navbar"
import { Footer } from "@/components/portfolio/Footer"
import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Github, Palette, Calendar, Tag } from "lucide-react"
import Link from "next/link"
import { use } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const project = projects.find(p => p.id === resolvedParams.id)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link href="/#projects" className="text-primary hover:underline flex items-center gap-2 justify-center">
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
        <section className="pt-40 pb-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 -z-10" />
          
          <div className="container px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-12"
            >
              <Link 
                href="/#projects" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
              >
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium uppercase tracking-wider">Back to Projects</span>
              </Link>
            </motion.div>
  
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                      <Palette className="w-5 h-5 text-primary" />
                    </div>
                    <Badge variant="outline" className="px-4 py-1 text-sm uppercase tracking-widest bg-background/50">
                      {project.category}
                    </Badge>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                    {project.title}
                  </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-4 mb-12">
                  {project.link !== "#" && (
                    <Button size="lg" asChild className="rounded-full px-8">
                      <a href={project.link} target="_blank" rel="noreferrer" className="gap-2">
                        <ExternalLink className="w-4 h-4" />
                        View Live
                      </a>
                    </Button>
                  )}
                  {project.github !== "#" && (
                    <Button size="lg" variant="outline" asChild className="rounded-full px-8">
                      <a href={project.github} target="_blank" rel="noreferrer" className="gap-2">
                        <Github className="w-4 h-4" />
                        View Source
                      </a>
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/5">
                  <div>
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Tag className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">Technologies</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-sm text-muted-foreground">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">Year</span>
                    </div>
                    <span className="text-sm text-muted-foreground">2024</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-primary/20 blur-[100px] -z-10 group-hover:bg-primary/30 transition-colors duration-500" />
                  <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/20">
                    {project.video ? (
                      <video 
                        src={project.video}
                        controls
                        autoPlay
                        muted
                        loop
                        className="w-full aspect-video object-contain bg-black"
                      />
                    ) : (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full aspect-[4/3] object-contain bg-black/40"
                      />
                    )}
                  </div>
              </motion.div>
            </div>

            <div className="space-y-32">
              {project.videos && project.videos.length > 0 && (
                <div>
                  <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4 tracking-tight">Project Videos</h2>
                    <p className="text-muted-foreground">Detailed cinematic works from the collection.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {project.videos.map((vid, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                      >
                        <div className="group relative rounded-2xl overflow-hidden border border-white/10 aspect-video bg-black/20">
                          <video 
                            src={vid.url}
                            controls
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-xl font-semibold px-2">{vid.title}</h3>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {project.images && project.images.length > 0 && (
                <div>
                  <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4 tracking-tight">Design Gallery</h2>
                    <p className="text-muted-foreground">Comprehensive overview of the creative assets developed for this project.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {project.images.map((img, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="group relative rounded-2xl overflow-hidden border border-white/10"
                      >
                        <img 
                          src={img} 
                          alt={`${project.title} detail ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-sm font-medium tracking-widest uppercase">View Detail</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
