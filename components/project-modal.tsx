"use client"

import Image from "next/image"
import { X, ExternalLink } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Project {
  image: string
  title: string
  description: string
  tags: string[]
  link?: string
  longDescription?: string
  techStack?: string[]
  frameworks?: string[]
}

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          className="fixed inset-0 z-[600] flex items-center justify-center p-4 backdrop-blur-sm"
          style={{ background: "rgba(7, 7, 14, 0.8)" }}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
          >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 rounded-lg hover:bg-[var(--bg3)] transition-colors"
          aria-label="Close modal"
        >
          <X size={24} color="var(--text)" />
        </button>

        {/* Image */}
        <div className="relative w-full h-80 bg-[var(--bg)] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg text-sm font-medium tracking-wide"
                style={{
                  background: "rgba(124, 110, 255, 0.1)",
                  color: "var(--accent2)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-syne), Syne, sans-serif",
              color: "var(--text)",
            }}
          >
            {project.title}
          </h2>

          {/* Description */}
          <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--text2)" }}>
            {project.longDescription || project.description}
          </p>

          {/* Tech Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-2 rounded-md text-sm font-medium transition-all hover:scale-105"
                    style={{
                      background: "rgba(124, 110, 255, 0.08)",
                      color: "var(--text2)",
                      border: "1px solid rgba(124, 110, 255, 0.2)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Frameworks */}
          {project.frameworks && project.frameworks.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
                Frameworks & Libraries
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.frameworks.map((framework) => (
                  <span
                    key={framework}
                    className="px-3 py-2 rounded-md text-sm font-medium transition-all hover:scale-105"
                    style={{
                      background: "rgba(124, 110, 255, 0.12)",
                      color: "var(--accent2)",
                      border: "1px solid rgba(124, 110, 255, 0.3)",
                    }}
                  >
                    {framework}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Link Button */}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 group"
              style={{
                background: "var(--accent)",
                color: "#fff",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--accent2)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--accent)"
              }}
            >
              <span>Visit Project</span>
              <ExternalLink size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          )}
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
