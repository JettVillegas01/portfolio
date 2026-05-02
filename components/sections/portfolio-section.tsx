"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { ProjectModal } from "@/components/project-modal"
import { projects, type Project } from "@/lib/data"

export function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  return (
    <section id="portfolio" className="bg-[var(--bg2)] border-t border-[var(--border)]">
      {/* Header */}
      <div className="mb-10">
        <p className="text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-[var(--accent)] mb-2">
          Selected Work
        </p>
        <h2
          className="font-extrabold leading-tight tracking-tight"
          style={{
            fontFamily: "var(--font-syne), Syne, sans-serif",
            fontSize: "clamp(1.9rem, 4vw, 4rem)",
            lineHeight: 1.05,
          }}
        >
          Latest <span className="text-[var(--accent)]">Projects</span>
        </h2>
      </div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {projects.map((project, index) => (
          <motion.button
            key={project.title}
            onClick={() => handleProjectClick(project)}
            className="group rounded-2xl overflow-hidden transition-all duration-300 text-left cursor-pointer"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ scale: 1.02 }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = "rgba(124,110,255,0.3)"
              el.style.transform = "translateY(-6px)"
              el.style.boxShadow = "0 20px 48px rgba(0,0,0,0.5)"
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = "var(--border)"
              el.style.transform = "translateY(0)"
              el.style.boxShadow = "none"
            }}
          >
            <div className="relative overflow-hidden aspect-video bg-[var(--bg)]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
              />
              <div
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                style={{ background: "rgba(7,7,14,0.8)" }}
              >
                <div className="text-white text-center">
                  <p className="font-semibold mb-2">View Details</p>
                  <ExternalLink size={24} className="mx-auto" />
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg text-[0.75rem] font-medium tracking-wide text-[var(--accent2)]"
                    style={{ background: "rgba(124,110,255,0.1)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3
                    className="text-lg md:text-xl font-bold mb-2 leading-snug transition-colors duration-300 group-hover:text-[var(--accent)]"
                    style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-sm text-[var(--text2)] leading-relaxed">{project.description}</p>
                </div>
                <ArrowUpRight
                  size={20}
                  className="flex-shrink-0 text-[var(--muted)] mt-0.5 transition-all duration-300 group-hover:text-[var(--accent)] group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  )
}