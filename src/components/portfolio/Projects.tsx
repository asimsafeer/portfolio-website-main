"use client"

import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, Star, Play, Layout, Video, Palette, Code2, Eye, GitFork, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { projects, type Project } from "@/lib/projects"
import { fetchGitHubRepos, mapRepoToProject, formatDate, type GitHubRepo } from "@/lib/github"

const categories = [
  { id: 'all', label: 'All Work', icon: Layout },
  { id: 'software', label: 'UI/UX & Code', icon: Code2 },
  { id: 'videography', label: 'Videography', icon: Video },
  { id: 'design', label: 'Graphic Design', icon: Palette }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

// 3D tilt effect hook
function use3DTilt() {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }

  return { ref, handleMouseMove, handleMouseLeave }
}

// Loading skeleton component
function ProjectSkeleton() {
  return (
    <div className="h-full">
      <Card className="overflow-hidden border border-white/5 bg-background/50 h-full flex flex-col">
        <div className="aspect-video skeleton" />
        <CardHeader>
          <div className="flex flex-wrap gap-2 mb-3">
            <div className="h-5 w-16 skeleton rounded-full" />
            <div className="h-5 w-20 skeleton rounded-full" />
          </div>
          <div className="h-6 w-3/4 skeleton rounded" />
        </CardHeader>
        <CardContent className="flex-1">
          <div className="space-y-2">
            <div className="h-4 w-full skeleton rounded" />
            <div className="h-4 w-5/6 skeleton rounded" />
            <div className="h-4 w-4/6 skeleton rounded" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function Projects() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [githubProjects, setGithubProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([])

  // Fetch GitHub repos when GitHub category is selected
  useEffect(() => {
    async function loadGitHubRepos() {
      if (githubProjects.length > 0) return // Already loaded

      setIsLoading(true)
      try {
        const repos = await fetchGitHubRepos()
        setGithubRepos(repos)
        const mappedProjects = repos.map(mapRepoToProject)
        setGithubProjects(mappedProjects)
      } catch (error) {
        console.error('Failed to load GitHub repos:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (activeCategory === 'software' || activeCategory === 'all') {
      loadGitHubRepos()
    }
  }, [activeCategory, githubProjects.length])

  // Combine all projects
  const allProjects = [...projects, ...githubProjects]

  const filteredProjects = allProjects.filter(project => {
    if (activeCategory === 'all') return true
    if (activeCategory === 'software') {
      // Include both software projects and GitHub repos
      return project.category === 'software' || project.category === 'github'
    }
    return project.category === activeCategory
  })

  const handleProjectClick = (project: Project) => {
    if (project.category === 'design' || project.category === 'videography') {
      router.push(`/projects/${project.id}`)
    } else {
      setSelectedProject(project)
    }
  }

  // Get GitHub repo info for selected project
  const getGitHubRepoInfo = (project: Project) => {
    if (!project.id.startsWith('github-')) return null
    const repoName = project.id.replace('github-', '').replace(/-/g, ' ')
    return githubRepos.find(r => r.name.toLowerCase().replace(/-/g, ' ') === repoName)
  }

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/20"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 10 * (i % 2 === 0 ? 1 : -1), 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Star className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Portfolio Showcase</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text">
              Selected Works
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            A diverse collection of projects spanning software development,
            cinematic videography, and strategic graphic design.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 ${activeCategory === category.id
                  ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                  : "bg-background/50 border-white/10 text-muted-foreground hover:border-primary/50 hover:text-primary"
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-semibold">{category.label}</span>
                {category.id === 'github' && githubProjects.length > 0 && (
                  <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-primary/20">
                    {githubProjects.length}
                  </span>
                )}
              </motion.button>
            )
          })}
        </motion.div>

        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Show loading skeletons */}
          {isLoading && activeCategory === 'github' && (
            <>
              <ProjectSkeleton />
              <ProjectSkeleton />
              <ProjectSkeleton />
            </>
          )}

          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={`${project.category}-${project.title}`}
                project={project}
                index={index}
                onClick={() => handleProjectClick(project)}
                githubRepo={getGitHubRepoInfo(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Detail Modal */}
        <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background/95 backdrop-blur-xl border-white/10 max-h-[90vh] overflow-y-auto">
            {selectedProject && (
              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-video w-full relative bg-black">
                  {selectedProject.video ? (
                    <video
                      src={selectedProject.video}
                      className="w-full h-full object-contain"
                      controls
                      autoPlay
                    />
                  ) : selectedProject.images ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-1 bg-black/50 overflow-y-auto max-h-[500px] p-1">
                      {selectedProject.images.map((img, i) => (
                        <div key={i} className="aspect-square relative overflow-hidden group/img">
                          <img
                            src={img}
                            alt={`${selectedProject.title} - ${i + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-contain bg-black/20"
                    />
                  )}
                </div>

                <div className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="capitalize">{selectedProject.category}</Badge>
                        <div className="flex gap-1">
                          {selectedProject.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-[10px]">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                      <DialogTitle className="text-3xl font-bold">{selectedProject.title}</DialogTitle>
                    </div>

                    <div className="flex gap-3">
                      {selectedProject.link !== "#" && (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button asChild>
                            <a href={selectedProject.link} target="_blank" rel="noreferrer" className="gap-2">
                              <ExternalLink className="w-4 h-4" />
                              {(selectedProject.category === 'software' || selectedProject.category === 'design') ? 'View Prototype' : 'Live Demo'}
                            </a>
                          </Button>
                        </motion.div>
                      )}
                      {selectedProject.github !== "#" && (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button variant="outline" asChild>
                            <a href={selectedProject.github} target="_blank" rel="noreferrer" className="gap-2">
                              <Github className="w-4 h-4" />
                              View Source
                            </a>
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <div className="prose prose-invert max-w-none">
                    <DialogDescription className="text-lg text-muted-foreground leading-relaxed">
                      {selectedProject.description}
                    </DialogDescription>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-8 border-t border-white/10">
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">Core Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tags.map(tag => (
                            <motion.div
                              key={tag}
                              className="px-3 py-1 rounded-md bg-secondary text-secondary-foreground text-sm border border-white/5"
                              whileHover={{ scale: 1.05, y: -2 }}
                            >
                              {tag}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">Project Focus</h4>
                        <p className="text-sm text-muted-foreground">
                          This project highlights expertise in {selectedProject.category === 'software' ? 'full-stack development and system architecture' : selectedProject.category === 'videography' ? 'visual storytelling and cinematic production' : selectedProject.category === 'github' ? 'open-source development and code collaboration' : 'brand identity and visual communication'}.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

// Separate component for better organization
function ProjectCard({
  project,
  index,
  onClick,
  githubRepo
}: {
  project: Project
  index: number
  onClick: () => void
  githubRepo?: GitHubRepo | null
}) {
  const { ref, handleMouseMove, handleMouseLeave } = use3DTilt()

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.8 }}
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="h-full cursor-pointer transition-transform duration-300 ease-out"
        onClick={onClick}
      >
        <Card className={`group overflow-hidden border border-white/5 bg-background/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 h-full flex flex-col relative ${project.featured ? 'ring-1 ring-primary/20' : ''}`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

          <div className="aspect-video overflow-hidden relative">
            {project.video ? (
              <div className="w-full h-full relative">
                <video
                  src={project.video}
                  poster={project.image}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                  onMouseOut={(e) => {
                    const v = e.target as HTMLVideoElement;
                    v.pause();
                    v.currentTime = 0;
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                  <Play className="w-12 h-12 text-white/50 group-hover:opacity-0 transition-opacity" />
                </div>
              </div>
            ) : (
              <img
                src={project.image}
                alt={project.title}
                className={`w-full h-full transition-transform duration-700 group-hover:scale-110 ${project.category === 'design' || project.category === 'videography' ? 'object-cover' : 'object-contain p-8 bg-black/20'}`}
              />
            )}

            <div className="absolute top-4 left-4 z-20">
              <Badge variant="outline" className="bg-background/80 backdrop-blur-sm border-white/10 capitalize">
                {project.category}
              </Badge>
            </div>

            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-30">
              {project.category === 'videography' ? (
                <motion.div
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Play className="w-5 h-5 fill-current" />
                </motion.div>
              ) : (
                <motion.div
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Eye className="w-5 h-5" />
                </motion.div>
              )}
            </div>
          </div>

          <CardHeader>
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-primary/5 border-primary/10 text-[10px] uppercase">
                  {tag}
                </Badge>
              ))}
            </div>
            <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
              {project.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1">
            <p className="text-muted-foreground text-sm line-clamp-3">
              {project.description}
            </p>

            {/* Last updated for GitHub projects */}
            {githubRepo && (
              <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>Updated {formatDate(githubRepo.updated_at)}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
