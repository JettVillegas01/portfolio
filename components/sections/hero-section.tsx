"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import Link from "next/link"
import { TypedText } from "@/components/typed-text"
import { orbitRings, socialLinks } from "@/lib/data"

// ─── Frame animation helpers ────────────────────────────────────────────────

const TOTAL_FRAMES = 160
const FRAME_INTERVAL_MS = 3000 / TOTAL_FRAMES

function getFrameSrc(n: number): string {
  return `/images/profile_frame/frame-${String(n).padStart(3, "0")}.jpg`
}

/**
 * Returns null until the client has mounted. Handles background preloading
 * to prevent flashes, and uses requestAnimationFrame for buttery smooth playback.
 */
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

  // Preload images once on mount to eliminate flashes
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

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState("dark")
  const [boostedRings, setBoostedRings] = useState<Set<number>>(new Set())

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true))

    const initialTheme = document.documentElement.getAttribute("data-theme") || "dark"
    setCurrentTheme(initialTheme)

    const observer = new MutationObserver(() => {
      const updated = document.documentElement.getAttribute("data-theme") || "dark"
      setCurrentTheme(updated)
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    })

    return () => {
      cancelAnimationFrame(t)
      observer.disconnect()
    }
  }, [])

  const profileSrc = useProfileFrame(currentTheme, mounted)

  const handleIconClick = useCallback(
    (ringIndex: number, e: React.MouseEvent) => {
      e.stopPropagation()
      if (boostedRings.has(ringIndex)) return
      setBoostedRings((prev) => new Set([...prev, ringIndex]))
      setTimeout(() => {
        setBoostedRings((prev) => {
          const next = new Set(prev)
          next.delete(ringIndex)
          return next
        })
      }, 2500)
    },
    [boostedRings]
  )

  const getAnimDuration = (ringIndex: number, baseDuration: string): string => {
    if (boostedRings.has(ringIndex)) {
      return `${(parseFloat(baseDuration) / 5).toFixed(2)}s`
    }
    return baseDuration
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const isLight = mounted && currentTheme === "light"

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col lg:flex-row items-center justify-between gap-8 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div
          className="absolute top-1/3 left-1/4 w-[40rem] h-[40rem] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(124,110,255,0.055) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/3 w-[30rem] h-[30rem] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(124,110,255,0.035) 0%, transparent 70%)" }}
        />
      </div>

      {/* Watermark */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
        style={{
          fontFamily: "var(--font-syne), Syne, sans-serif",
          fontSize: "clamp(10rem, 22vw, 26rem)",
          fontWeight: 800,
          color: "transparent",
          WebkitTextStroke: "1px rgba(124,110,255,0.04)",
          lineHeight: 1,
          whiteSpace: "nowrap",
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      >
        JETT
      </div>

      {/* LEFT — Text content */}
      <div className="flex-1 max-w-[56rem] relative z-10 flex flex-col justify-center">
        {/* Status badge */}
        <div
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-medium text-[var(--accent2)] mb-8 w-fit"
          style={{
            background: "rgba(124,110,255,0.07)",
            border: "1px solid rgba(124,110,255,0.2)",
            fontFamily: "'DM Sans', sans-serif",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <span
            className="w-2 h-2 rounded-full bg-[#4ade80]"
            style={{ boxShadow: "0 0 6px #4ade80", animation: "pulse-green 2s infinite" }}
          />
          Available for work
        </div>

        {/* Headline */}
        <h1
          className="font-extrabold tracking-tight mb-6"
          style={{
            fontFamily: "var(--font-syne), Syne, sans-serif",
            fontSize: "clamp(3.4rem, 6vw, 6.5rem)",
            lineHeight: 1.05,
          }}
        >
          {["Crafting", "Digital", "Experiences"].map((word, i) => (
            <span
              key={word}
              className="block"
              style={{
                color: i === 1 ? "var(--accent)" : "var(--text)",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
              }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className="leading-relaxed text-[var(--muted)] mb-5 max-w-[38rem]"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1.0625rem",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.5s ease 0.28s, transform 0.5s ease 0.28s",
          }}
        >
          Frontend Developer &amp; Web Designer based in the Philippines. I build
          interfaces that feel as good as they look.
        </p>

        {/* Typed row */}
        <div
          className="flex items-center gap-3 mb-10"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.5s ease 0.36s, transform 0.5s ease 0.36s",
          }}
        >
          <span
            className="text-[var(--muted)] uppercase tracking-[0.2em] shrink-0"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem" }}
          >
            Currently:
          </span>
          <TypedText
            strings={["Frontend Developer", "Web Designer", "QA Analyst"]}
            className="font-semibold text-[var(--accent2)]"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem" }}
            typeSpeed={70}
            backSpeed={45}
            backDelay={1800}
          />
        </div>

        {/* CTAs */}
        <div
          className="flex flex-row items-center gap-3 mb-10"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.5s ease 0.44s, transform 0.5s ease 0.44s",
          }}
        >
          <Link
            href="#portfolio"
            onClick={(e) => handleNavClick(e, "#portfolio")}
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_var(--glow)] active:scale-95"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.925rem",
              background: "var(--accent)",
              letterSpacing: "0.01em",
            }}
          >
            View My Work
          </Link>

          <Link
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.925rem",
              color: "var(--text)",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(124,110,255,0.35)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            Get In Touch
          </Link>
        </div>

        {/* Social + scroll hint */}
        <div
          className="flex items-center gap-2"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.5s ease 0.52s, transform 0.5s ease 0.52s",
          }}
        >
          {socialLinks.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--muted)] transition-all duration-200 hover:text-[var(--accent)] hover:bg-[rgba(124,110,255,0.1)]"
              style={{ border: "1px solid var(--border)" }}
            >
              <s.Icon size={16} />
            </a>
          ))}

          <div className="hidden lg:flex items-center gap-3 ml-4 text-[var(--muted)]">
            <div className="w-px h-4 bg-[var(--border)]" />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Scroll
            </span>
            <div
              className="w-px h-8 bg-gradient-to-b from-[var(--muted)] to-transparent"
              style={{ animation: "scroll-anim 1.6s ease-in-out infinite" }}
            />
          </div>
        </div>
      </div>

      {/* RIGHT — Orbiting image */}
      <div
        className="hidden lg:flex flex-shrink-0 relative z-10 items-center justify-center"
        style={{
          width: "min(52rem, 52vw)",
          height: "min(52rem, 52vw)",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "scale(1)" : "scale(0.96)",
          transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
        }}
      >
        {/* Dashed ring tracks */}
        {orbitRings.map((ring, ri) => {
          const isBoosted = boostedRings.has(ri)
          return (
            <div
              key={`track-${ri}`}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: ring.radius * 2,
                height: ring.radius * 2,
                top: "50%",
                left: "50%",
                marginLeft: -ring.radius,
                marginTop: -ring.radius,
                border: isBoosted
                  ? "1px dashed rgba(124,110,255,0.55)"
                  : "1px dashed rgba(124,110,255,0.12)",
                boxShadow: isBoosted
                  ? "0 0 30px rgba(124,110,255,0.2), inset 0 0 30px rgba(124,110,255,0.06)"
                  : "none",
                transition: "border-color 0.35s ease, box-shadow 0.35s ease",
              }}
            />
          )
        })}

        {/* Spinning icon rings */}
        {orbitRings.map((ring, ri) => {
          const isBoosted = boostedRings.has(ri)
          const animDuration = getAnimDuration(ri, ring.duration)

          return (
            <div
              key={`ring-${ri}`}
              className="absolute"
              style={{
                width: ring.radius * 2,
                height: ring.radius * 2,
                top: "50%",
                left: "50%",
                marginLeft: -ring.radius,
                marginTop: -ring.radius,
                borderRadius: "50%",
                animationName: "spin",
                animationDuration: animDuration,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationDirection: ring.direction === -1 ? "reverse" : "normal",
                willChange: "transform",
              }}
            >
              {ring.icons.map(({ Icon, label, angle }) => {
                const rad = (angle * Math.PI) / 180
                const x = Number((ring.radius + Math.cos(rad) * ring.radius - 18).toFixed(2))
                const y = Number((ring.radius + Math.sin(rad) * ring.radius - 18).toFixed(2))
                return (
                  <div
                    key={label}
                    title={label}
                    role="button"
                    aria-label={`${label} — click to boost ring`}
                    onClick={(e) => handleIconClick(ri, e)}
                    className="absolute w-9 h-9 rounded-xl flex items-center justify-center text-[var(--accent2)]"
                    style={{
                      left: x,
                      top: y,
                      cursor: isBoosted ? "default" : "pointer",
                      pointerEvents: "auto",
                      background: isLight ? "rgba(255,255,255,0.92)" : "rgba(18,18,28,0.88)",
                      backdropFilter: "blur(12px)",
                      border: isBoosted
                        ? "1px solid rgba(124,110,255,0.65)"
                        : isLight
                        ? "1px solid rgba(124,110,255,0.15)"
                        : "1px solid rgba(124,110,255,0.22)",
                      boxShadow: isBoosted
                        ? "0 0 18px rgba(124,110,255,0.5), 0 4px 16px rgba(0,0,0,0.3)"
                        : isLight
                        ? "0 4px 20px rgba(0,0,0,0.06)"
                        : "0 4px 16px rgba(0,0,0,0.4)",
                      animationName: "spin",
                      animationDuration: animDuration,
                      animationTimingFunction: "linear",
                      animationIterationCount: "infinite",
                      animationDirection: ring.direction === -1 ? "normal" : "reverse",
                      willChange: "transform",
                    }}
                  >
                    <Icon size={15} />
                    {isBoosted && (
                      <span
                        className="absolute inset-0 rounded-xl animate-ping"
                        style={{
                          background: "rgba(124,110,255,0.2)",
                          animationDuration: "0.75s",
                          pointerEvents: "none",
                        }}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          )
        })}

        {/* Centre photo — only render once we have the correct frame */}
        <div
          className="relative rounded-full overflow-hidden z-10"
          style={{
            width: "min(280px, 29vw)",
            height: "min(280px, 29vw)",
            border: "2px solid rgba(124,110,255,0.3)",
            boxShadow: "0 0 0 6px rgba(124,110,255,0.06), 0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          {profileSrc && (
            <img
              src={profileSrc}
              alt="Jett Villegas"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          )}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ boxShadow: "inset 0 0 40px rgba(124,110,255,0.12)" }}
          />
        </div>

        {/* Ambient glow behind photo */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(124,110,255,0.1) 0%, transparent 65%)",
            filter: "blur(20px)",
          }}
        />

        {/* Hint label */}
      </div>

      {/* Mobile image */}
      <div
        className="flex lg:hidden flex-shrink-0 relative z-10 w-[min(28rem,80vw)]"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
        }}
      >
        <div
          className="relative rounded-3xl overflow-hidden w-full"
          style={{
            border: "1px solid var(--border)",
            aspectRatio: "4 / 3",
          }}
        >
          {profileSrc && (
            <img
              src={profileSrc}
              alt="Jett Villegas"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          )}
        </div>
      </div>
    </section>
  )
}