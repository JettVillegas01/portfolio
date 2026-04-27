"use client"

import { Fragment, useEffect, useState, useRef, useCallback } from "react"
import { Download, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { aboutTags, aboutStats } from "@/lib/data"
import Link from "next/link"

// ─── Frame animation helpers ────────────────────────────────────────────────

const TOTAL_FRAMES = 160
const FRAME_INTERVAL_MS = 3000 / TOTAL_FRAMES

function getFrameSrc(n: number): string {
  return `/images/profile_frame/frame-${String(n).padStart(3, "0")}.jpg`
}

function useProfileFrame(theme: string, mounted: boolean): string | null {
  const [frame, setFrame] = useState<number | null>(null)
  const frameRef = useRef<number>(TOTAL_FRAMES)
  const dirRef = useRef<1 | -1>(1)
  const rAFRef = useRef<number | null>(null)
  const isFirstRender = useRef(true)

  const stop = useCallback(() => {
    if (rAFRef.current !== null) {
      cancelAnimationFrame(rAFRef.current)
      rAFRef.current = null
    }
  }, [])

  const start = useCallback(
    (dir: 1 | -1) => {
      stop()
      dirRef.current = dir
      let lastTime = performance.now()

      const animate = (time: number) => {
        const delta = time - lastTime
        if (delta >= FRAME_INTERVAL_MS) {
          lastTime = time - (delta % FRAME_INTERVAL_MS)

          const next = frameRef.current + dirRef.current
          if (next >= TOTAL_FRAMES) {
            frameRef.current = TOTAL_FRAMES
            setFrame(TOTAL_FRAMES)
            stop()
            return
          }
          if (next <= 1) {
            frameRef.current = 1
            setFrame(1)
            stop()
            return
          }
          frameRef.current = next
          setFrame(next)
        }
        rAFRef.current = requestAnimationFrame(animate)
      }

      rAFRef.current = requestAnimationFrame(animate)
    },
    [stop]
  )

  useEffect(() => {
    if (!mounted) return
    const timer = setTimeout(() => {
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new window.Image()
        img.src = getFrameSrc(i)
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [mounted])

  useEffect(() => {
    if (!mounted) return

    if (isFirstRender.current) {
      isFirstRender.current = false
      const init = theme === "light" ? 1 : TOTAL_FRAMES
      frameRef.current = init
      setFrame(init)
      return
    }

    start(theme === "dark" ? 1 : -1)
    return () => stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, mounted])

  useEffect(() => () => stop(), [stop])

  return frame === null ? null : getFrameSrc(frame)
}

// ────────────────────────────────────────────────────────────────────────────

export function AboutSection() {
  const [mounted, setMounted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState("dark")

  useEffect(() => {
    setMounted(true)

    const initial = document.documentElement.getAttribute("data-theme") || "dark"
    setCurrentTheme(initial)

    const observer = new MutationObserver(() => {
      const updated = document.documentElement.getAttribute("data-theme") || "dark"
      setCurrentTheme(updated)
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    })
    return () => observer.disconnect()
  }, [])

  const profileSrc = useProfileFrame(currentTheme, mounted)

  return (
    <section
      id="about"
      className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20 bg-[var(--bg2)] border-t border-b border-[var(--border)]"
    >
      {/* Image side */}
      <motion.div
        className="flex-shrink-0 relative w-full max-w-[36rem] lg:w-[min(36rem,38vw)]"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div
          className="relative rounded-2xl overflow-hidden group"
          style={{
            border: "1px solid var(--border)",
            aspectRatio: "4 / 3",
          }}
        >
          {profileSrc && (
            <img
              src={profileSrc}
              alt="About Jett"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
            />
          )}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(13,13,22,0.3) 0%, transparent 60%)" }}
          />
        </div>

        {/* Stats */}
        <div
          className="flex items-center gap-6 mt-4 p-5 rounded-xl"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          {aboutStats.map((stat, i) => (
            <Fragment key={stat.label}>
              {i > 0 && <div className="w-px h-8 bg-[var(--border)]" />}
              <div className="text-center flex-1 cursor-default group">
                <span
                  className="block text-2xl font-extrabold text-[var(--accent)] leading-none transition-transform duration-200 group-hover:scale-110"
                  style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                >
                  {stat.value}
                </span>
                <span className="text-[0.7rem] text-[var(--muted)] uppercase tracking-wider mt-1 block">
                  {stat.label}
                </span>
              </div>
            </Fragment>
          ))}
        </div>
      </motion.div>

      {/* Content side */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <p className="text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-[var(--accent)] mb-3">
          About Me
        </p>

        <h2
          className="font-extrabold leading-tight tracking-tight mb-5"
          style={{
            fontFamily: "var(--font-syne), Syne, sans-serif",
            fontSize: "clamp(2.4rem, 4vw, 4rem)",
            lineHeight: 1.1,
          }}
        >
          Passionate about <span className="text-[var(--accent)]">beautiful</span> interfaces
        </h2>

        <p className="text-[0.97rem] leading-relaxed text-[var(--muted)] mb-4">
          I&apos;m an IT student with hands-on experience in computer assembly, basic troubleshooting,
          frontend development, and MS Office. I&apos;m eager to learn, adaptable, and committed to
          growing my skills and gaining real-world experience in the IT field.
        </p>

        <p className="text-[0.97rem] leading-relaxed text-[var(--muted)] mb-7">
          I believe great design is invisible — it just feels right. I obsess over the details:
          spacing, motion, color, and interaction all matter.
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {aboutTags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 rounded-full text-sm text-[var(--muted)] cursor-default transition-all duration-200 hover:text-[var(--accent2)] hover:scale-105"
              style={{ border: "1px solid var(--border)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(124,110,255,0.3)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/Villegas-Jett-Resume.pdf"
            download
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            style={{ background: "var(--accent)" }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 28px var(--glow)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <Download size={16} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
            Download Resume
          </a>

          <Link
            href="/about"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            style={{
              color: "var(--accent)",
              border: "1px solid rgba(124,110,255,0.3)",
              background: "rgba(124,110,255,0.06)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(124,110,255,0.55)"
              e.currentTarget.style.background = "rgba(124,110,255,0.12)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(124,110,255,0.3)"
              e.currentTarget.style.background = "rgba(124,110,255,0.06)"
            }}
          >
            See More About Me
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}