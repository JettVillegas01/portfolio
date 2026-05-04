"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { getGalleryImages, type GalleryImage } from "@/lib/db"

// ─── Constants ────────────────────────────────────────────────────────────────

const VISIBLE = 4
const GAP = 12

// ─── Education (static — no DB needed) ───────────────────────────────────────

const education = [
  {
    id: 1,
    degree: "Bachelor of Science in Information Technology",
    school: "Our Lady of Lourdes College Foundation",
    year: "Ongoing",
    current: true,
  },
  {
    id: 2,
    degree: "High School",
    school: "Camarines Norte College",
    year: "2022",
    current: false,
  },
  {
    id: 3,
    degree: "Elementary",
    school: "Labo Elementary School",
    year: "2016",
    current: false,
  },
]

// ─── Core Values (static — no DB needed) ─────────────────────────────────────

const coreValues = [
  {
    title: "Continuous Learning",
    description:
      "Every project, bug, and piece of feedback is a lesson. I treat growth as a daily practice, not a milestone.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Attention to Detail",
    description:
      "The gap between good and great lives in the details — spacing, naming, edge cases. I take them all seriously.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    title: "Integrity",
    description:
      "I deliver honest work, own my mistakes without excuses, and follow through on every commitment I make.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Adaptability",
    description:
      "Tech moves fast and requirements change. I stay curious, pick up new tools quickly, and stay calm under pressure.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
  },
  {
    title: "Collaboration",
    description:
      "The best solutions are never built alone. I communicate openly, listen actively, and make sure the whole team moves forward.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Quality First",
    description:
      "Cutting corners is never an option. Clean code, a polished UI, and reliable output are the baseline — not the goal.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
]

// ─── Career (static — no DB needed) ──────────────────────────────────────────

const careerEntries = [
  {
    id: "boaz",
    type: "real" as const,
    company: "BoAZ iLleap",
    role: "Learning Platform Developer",
    status: "Ongoing",
    logo: "/images/about-content/boaz-icon.png",
    description:
      "Worked on a learning platform designed for employees — building out features and interfaces that help teams access training materials and grow their skills within the organization.",
  },
  { id: "cs1", type: "soon" as const },
  { id: "cs2", type: "soon" as const },
  { id: "cs3", type: "soon" as const },
]

// ─── Main export ──────────────────────────────────────────────────────────────

export function AboutPageContent() {
  return (
    <>
      {/* Page hero */}
      <section style={{ paddingBottom: "0.5rem" }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "var(--muted)",
            textDecoration: "none",
            marginBottom: "2.5rem",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--accent)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--muted)")
          }
        ></Link>

        <p
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "0.5rem",
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
        ></p>
        <h1
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "var(--text)",
            lineHeight: 1.1,
            margin: 0,
          }}
        ></h1>
      </section>

      <GalleryBlock />
      <CareerBlock />
      <CoreValuesBlock />
      <EducationBlock />
    </>
  )
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

function GalleryBlock() {
  const trackRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const [startIndex, setStartIndex] = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [cardWidth, setCardWidth] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch gallery from Supabase
  useEffect(() => {
    getGalleryImages().then((data) => {
      setImages(data)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    const measure = () => {
      if (viewportRef.current) {
        const w = viewportRef.current.offsetWidth
        setCardWidth((w - GAP * (VISIBLE - 1)) / VISIBLE)
      }
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [loading])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (trackRef.current) observer.observe(trackRef.current)
    return () => observer.disconnect()
  }, [])

  const TOTAL = images.length
  const maxIndex = Math.max(0, TOTAL - VISIBLE)
  const goTo = useCallback(
    (idx: number) => setStartIndex(Math.max(0, Math.min(idx, maxIndex))),
    [maxIndex]
  )

  useEffect(() => {
    if (!TOTAL) return
    const handler = (e: KeyboardEvent) => {
      if (lightbox === null) return
      if (e.key === "Escape") setLightbox(null)
      if (e.key === "ArrowRight") setLightbox((p) => (p! + 1) % TOTAL)
      if (e.key === "ArrowLeft") setLightbox((p) => (p! - 1 + TOTAL) % TOTAL)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [lightbox, TOTAL])

  const slideX = cardWidth > 0 ? -(startIndex * (cardWidth + GAP)) : 0

  return (
    <section ref={trackRef} style={{ paddingTop: "1rem", paddingBottom: "5rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2rem",
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s var(--ease), transform 0.7s var(--ease)",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "0.4rem",
            }}
          >
            Visual Work
          </p>
          <h2
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Gallery
          </h2>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <NavBtn
            disabled={startIndex === 0}
            onClick={() => goTo(startIndex - 1)}
            dir="left"
          />
          <NavBtn
            disabled={startIndex >= maxIndex}
            onClick={() => goTo(startIndex + 1)}
            dir="right"
          />
        </div>
      </div>

      <div
        ref={viewportRef}
        style={{
          overflow: "hidden",
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(20px)",
          transition:
            "opacity 0.6s var(--ease) 0.1s, transform 0.6s var(--ease) 0.1s",
        }}
      >
        {loading ? (
          <div style={{ display: "flex", gap: `${GAP}px` }}>
            {Array.from({ length: VISIBLE }).map((_, i) => (
              <div
                key={i}
                style={{
                  flexShrink: 0,
                  width: "23%",
                  aspectRatio: "4 / 3",
                  borderRadius: "10px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              gap: `${GAP}px`,
              transform: `translateX(${slideX}px)`,
              transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
              willChange: "transform",
            }}
          >
            {images.map((img, idx) => (
              <SlideCard
                key={img.id}
                img={img}
                cardWidth={cardWidth}
                onClick={() => setLightbox(idx)}
              />
            ))}
          </div>
        )}
      </div>

      {!loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "6px",
            marginTop: "1.25rem",
            opacity: revealed ? 1 : 0,
            transition: "opacity 0.6s var(--ease) 0.2s",
          }}
        >
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                all: "unset",
                cursor: "pointer",
                width: i === startIndex ? "20px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background:
                  i === startIndex ? "var(--accent)" : "var(--surface2)",
                transition:
                  "width 0.3s var(--ease), background 0.3s var(--ease)",
              }}
            />
          ))}
        </div>
      )}

      {lightbox !== null && images[lightbox] && (
        <Lightbox
          idx={lightbox}
          images={images}
          onClose={() => setLightbox(null)}
          onPrev={() => setLightbox((p) => (p! - 1 + TOTAL) % TOTAL)}
          onNext={() => setLightbox((p) => (p! + 1) % TOTAL)}
        />
      )}
    </section>
  )
}

// ─── Career ───────────────────────────────────────────────────────────────────

function CareerBlock() {
  const ref = useRef<HTMLElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      style={{
        borderTop: "1px solid var(--border)",
        paddingTop: "5rem",
        paddingBottom: "5rem",
      }}
    >
      <style>{`
        @keyframes careerReveal {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .flip-card {
          perspective: 1000px;
          width: 100%;
          aspect-ratio: 1 / 1;
          cursor: default;
        }
        .flip-card-real { cursor: pointer; }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
          border-radius: 16px;
        }
        .flip-card-real:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          overflow: hidden;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
        .flip-card-real .flip-card-front {
          border: 1px solid var(--border);
          background: var(--bg2);
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .flip-card-real:hover .flip-card-front {
          border-color: var(--border-hover);
          box-shadow: 0 20px 50px -12px rgba(0,0,0,0.6);
        }
        .flip-card-real .flip-card-back {
          background: linear-gradient(135deg, #1a1630 0%, #0f0d1a 100%);
          border: 1px solid rgba(124,110,255,0.4);
          box-shadow: inset 0 0 60px rgba(124,110,255,0.08);
        }
        .flip-card-soon .flip-card-front {
          border: 1px dashed rgba(255,255,255,0.1);
          background: rgba(124,110,255,0.02);
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.85); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      <div
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(20px)",
          transition:
            "opacity 0.7s var(--ease), transform 0.7s var(--ease)",
          marginBottom: "2.5rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "0.4rem",
          }}
        >
          Professional
        </p>
        <h2
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--text)",
            lineHeight: 1.1,
            margin: "0 0 6px",
          }}
        >
          Career
        </h2>
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "0.9rem",
            color: "var(--muted)",
            margin: 0,
            lineHeight: 1.7,
          }}
        >
          My professional experience and the roles I&apos;ve taken on.
        </p>
      </div>

      <div
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(20px)",
          transition:
            "opacity 0.65s var(--ease) 0.1s, transform 0.65s var(--ease) 0.1s",
          border: "1px solid var(--border)",
          borderRadius: "20px",
          padding: "1.5rem",
          background: "var(--surface)",
          boxShadow: "0 4px 24px -8px rgba(0,0,0,0.4)",
        }}
      >
        <div
          style={{
            display: "grid",
            gap: "1rem",
          }}
          className="career-grid-responsive"
        >
          {careerEntries.map((entry, i) => (
            <div
              key={entry.id}
              style={{
                opacity: revealed ? 1 : 0,
                animation: revealed
                  ? `careerReveal 0.55s cubic-bezier(0.4,0,0.2,1) ${
                      0.15 + i * 0.1
                    }s both`
                  : "none",
              }}
            >
              {entry.type === "real" ? (
                <div className="flip-card flip-card-real">
                  <div className="flip-card-inner">
                    <div
                      className="flip-card-front boaz-front"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        padding: "0.5rem",
                        textAlign: "center",
                      }}
                    >
                      <div
                        className="boaz-logo-wrap"
                        style={{
                          width: "56px",
                          height: "56px",
                          borderRadius: "14px",
                          overflow: "hidden",
                          border: "1px solid rgba(255,255,255,0.1)",
                          background: "#fff",
                          flexShrink: 0,
                          boxShadow: "0 4px 16px -4px rgba(0,0,0,0.5)",
                        }}
                      >
                        <Image
                          src={(entry as any).logo}
                          alt={(entry as any).company}
                          width={56}
                          height={56}
                          style={{
                            objectFit: "contain",
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </div>
                      <div>
                        <h3
                          style={{
                            fontFamily: "var(--font-syne), sans-serif",
                            fontSize: "0.9rem",
                            fontWeight: 700,
                            color: "var(--text)",
                            margin: "0 0 4px",
                            letterSpacing: "-0.01em",
                            lineHeight: 1.2,
                          }}
                        >
                          {(entry as any).company}
                        </h3>
                        <p
                          style={{
                            fontFamily: "var(--font-dm-sans), sans-serif",
                            fontSize: "0.72rem",
                            color: "var(--muted)",
                            margin: 0,
                            lineHeight: 1.4,
                          }}
                        >
                          {(entry as any).role}
                        </p>
                      </div>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          fontSize: "0.62rem",
                          fontWeight: 600,
                          color: "var(--accent)",
                          background: "rgba(124,110,255,0.1)",
                          border: "1px solid rgba(124,110,255,0.25)",
                          borderRadius: "20px",
                          padding: "3px 10px",
                          letterSpacing: "0.04em",
                        }}
                      >
                        <span
                          style={{
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            background: "var(--accent)",
                            display: "inline-block",
                            animation: "pulse-dot 2s ease infinite",
                          }}
                        />
                        Ongoing
                      </span>
                      <p
                        className="hover-hint"
                        style={{
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          fontSize: "0.62rem",
                          color: "var(--muted)",
                          margin: 0,
                          opacity: 0.5,
                          letterSpacing: "0.05em",
                        }}
                      >
                        Hover to flip
                      </p>
                    </div>

                    <div
                      className="flip-card-back"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        padding: "1.25rem",
                        gap: "0.75rem",
                      }}
                    >
                      <div
                        style={{
                          width: "28px",
                          height: "3px",
                          borderRadius: "2px",
                          background: "#7c6eff",
                          marginBottom: "0.25rem",
                        }}
                      />
                      <div>
                        <p
                          style={{
                            fontFamily: "var(--font-dm-sans), sans-serif",
                            fontSize: "0.6rem",
                            fontWeight: 700,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "#a594ff",
                            margin: "0 0 3px",
                          }}
                        >
                          Role
                        </p>
                        <p
                          style={{
                            fontFamily: "var(--font-syne), sans-serif",
                            fontSize: "0.82rem",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: 0,
                            letterSpacing: "-0.01em",
                            lineHeight: 1.3,
                          }}
                        >
                          {(entry as any).role}
                        </p>
                      </div>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          fontSize: "0.6rem",
                          fontWeight: 600,
                          color: "#a594ff",
                          background: "rgba(124,110,255,0.25)",
                          border: "1px solid rgba(124,110,255,0.5)",
                          borderRadius: "20px",
                          padding: "2px 9px",
                          width: "fit-content",
                          letterSpacing: "0.04em",
                        }}
                      >
                        <span
                          style={{
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            background: "#a594ff",
                            display: "inline-block",
                            animation: "pulse-dot 2s ease infinite",
                          }}
                        />
                        {(entry as any).status}
                      </span>
                      <p
                        style={{
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          fontSize: "0.7rem",
                          color: "rgba(255,255,255,0.7)",
                          margin: 0,
                          lineHeight: 1.7,
                        }}
                      >
                        {(entry as any).description}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flip-card flip-card-soon">
                  <div
                    className="flip-card-inner"
                    style={{ transform: "none !important" } as any}
                  >
                    <div
                      className="flip-card-front"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.75rem",
                        textAlign: "center",
                        padding: "1.25rem",
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "11px",
                          background: "rgba(124,110,255,0.06)",
                          border: "1px solid rgba(124,110,255,0.12)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="rgba(124,110,255,0.4)"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                      </div>
                      <div>
                        <p
                          style={{
                            fontFamily: "var(--font-syne), sans-serif",
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            background:
                              "linear-gradient(90deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0.25) 100%)",
                            backgroundSize: "200% auto",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            animation: "shimmer 2.8s linear infinite",
                            margin: "0 0 4px",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          Coming Soon
                        </p>
                        <p
                          style={{
                            fontFamily: "var(--font-dm-sans), sans-serif",
                            fontSize: "0.65rem",
                            color: "var(--muted)",
                            margin: 0,
                            opacity: 0.5,
                            lineHeight: 1.5,
                          }}
                        >
                          Next chapter
                          <br />
                          in progress
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Core Values ──────────────────────────────────────────────────────────────

function CoreValuesBlock() {
  const ref = useRef<HTMLElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      style={{
        borderTop: "1px solid var(--border)",
        paddingTop: "5rem",
        paddingBottom: "5rem",
      }}
    >
      <div
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s var(--ease), transform 0.7s var(--ease)",
          marginBottom: "2.5rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "0.4rem",
          }}
        >
          What Drives Me
        </p>
        <h2
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--text)",
            lineHeight: 1.1,
            margin: "0 0 6px",
          }}
        >
          Core Values
        </h2>
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "0.9rem",
            color: "var(--muted)",
            margin: 0,
            lineHeight: 1.7,
          }}
        >
          The principles I carry into every project and interaction.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem",
        }}
      >
        {coreValues.map((val, i) => (
          <CoreValueCard
            key={val.title}
            val={val}
            index={i}
            revealed={revealed}
          />
        ))}
      </div>
    </section>
  )
}

function CoreValueCard({
  val,
  index,
  revealed,
}: {
  val: (typeof coreValues)[0]
  index: number
  revealed: boolean
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s var(--ease) ${0.05 * index}s, transform 0.6s var(--ease) ${
          0.05 * index
        }s, border-color 0.25s, box-shadow 0.25s, background 0.25s`,
        padding: "1.5rem",
        borderRadius: "14px",
        border: `1px solid ${hovered ? "var(--border-hover)" : "var(--border)"}`,
        background: hovered ? "var(--surface)" : "var(--bg2)",
        boxShadow: hovered ? "0 12px 32px -8px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "11px",
          background: hovered
            ? "rgba(124,110,255,0.15)"
            : "rgba(124,110,255,0.08)",
          border: `1px solid ${
            hovered ? "rgba(124,110,255,0.3)" : "rgba(124,110,255,0.15)"
          }`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--accent)",
          marginBottom: "1rem",
          transition: "background 0.25s, border-color 0.25s",
        }}
      >
        {val.icon}
      </div>
      <h3
        style={{
          fontFamily: "var(--font-syne), sans-serif",
          fontSize: "0.95rem",
          fontWeight: 700,
          color: "var(--text)",
          margin: "0 0 6px",
          letterSpacing: "-0.01em",
        }}
      >
        {val.title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "0.83rem",
          color: "var(--muted)",
          margin: 0,
          lineHeight: 1.7,
        }}
      >
        {val.description}
      </p>
    </div>
  )
}

// ─── Education ────────────────────────────────────────────────────────────────

function EducationBlock() {
  const ref = useRef<HTMLElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      style={{
        borderTop: "1px solid var(--border)",
        paddingTop: "5rem",
      }}
    >
      <div
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s var(--ease), transform 0.7s var(--ease)",
          marginBottom: "2.5rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "0.4rem",
          }}
        >
          Background
        </p>
        <h2
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--text)",
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          Education
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {education.map((item, i) => (
          <div
            key={item.id}
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.6s var(--ease) ${0.1 + i * 0.12}s, transform 0.6s var(--ease) ${
                0.1 + i * 0.12
              }s`,
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "40px",
                flexShrink: 0,
                paddingTop: "2px",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "4px",
                  border: item.current
                    ? "2px solid var(--accent)"
                    : "2px solid var(--border)",
                  background: item.current ? "var(--accent)" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {item.current && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <polyline
                      points="1.5,5 4,7.5 8.5,2.5"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              {i < education.length - 1 && (
                <div
                  style={{
                    width: "1px",
                    flex: 1,
                    minHeight: "40px",
                    background: "var(--border)",
                    margin: "4px 0",
                  }}
                />
              )}
            </div>

            <div
              style={{
                flex: 1,
                paddingBottom: i < education.length - 1 ? "2rem" : "0",
                paddingLeft: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-syne), sans-serif",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "var(--text)",
                      margin: "0 0 2px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.degree}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.85rem",
                      color: "var(--muted)",
                      margin: 0,
                    }}
                  >
                    {item.school}
                  </p>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: item.current ? "var(--accent)" : "var(--muted)",
                    background: item.current
                      ? "rgba(124,110,255,0.1)"
                      : "transparent",
                    border: item.current
                      ? "1px solid rgba(124,110,255,0.25)"
                      : "none",
                    borderRadius: "20px",
                    padding: item.current ? "2px 12px" : "0",
                    whiteSpace: "nowrap",
                    marginTop: "2px",
                  }}
                >
                  {item.year}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Slide Card ───────────────────────────────────────────────────────────────

function SlideCard({
  img,
  cardWidth,
  onClick,
}: {
  img: GalleryImage
  cardWidth: number
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        position: "relative",
        flexShrink: 0,
        width: cardWidth > 0 ? `${cardWidth}px` : "23%",
        aspectRatio: "4 / 3",
        borderRadius: "10px",
        overflow: "hidden",
        border: `1px solid ${
          hovered ? "var(--border-hover)" : "var(--border)"
        }`,
        boxShadow: hovered
          ? "0 12px 32px -8px rgba(0,0,0,0.6)"
          : "0 4px 12px -4px rgba(0,0,0,0.4)",
        cursor: "pointer",
        transition: "border-color 0.25s, box-shadow 0.25s",
      }}
    >
      {imgError ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--surface2)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--muted)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span
            style={{
              fontSize: "0.65rem",
              color: "var(--muted)",
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
          >
            {img.title}
          </span>
        </div>
      ) : (
        <Image
          src={img.src}
          alt={img.title}
          fill
          sizes="25vw"
          style={{ objectFit: "cover", pointerEvents: "none" }}
          priority={img.id <= 4}
          onError={() => setImgError(true)}
        />
      )}

    </div>
  )
}

// ─── Nav Button ───────────────────────────────────────────────────────────────

function NavBtn({
  onClick,
  dir,
  disabled,
}: {
  onClick: () => void
  dir: "left" | "right"
  disabled: boolean
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        all: "unset",
        cursor: disabled ? "not-allowed" : "pointer",
        width: "38px",
        height: "38px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          hovered && !disabled ? "var(--surface2)" : "var(--surface)",
        border: `1px solid ${
          hovered && !disabled ? "var(--border-hover)" : "var(--border)"
        }`,
        opacity: disabled ? 0.3 : 1,
        transition: "background 0.2s, border-color 0.2s, opacity 0.2s",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--text2)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {dir === "left" ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 18 15 12 9 6" />
        )}
      </svg>
    </button>
  )
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  idx,
  images,
  onClose,
  onPrev,
  onNext,
}: {
  idx: number
  images: GalleryImage[]
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const img = images[idx]
  const TOTAL = images.length

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "rgba(7,7,14,0.95)",
        backdropFilter: "blur(20px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        animation: "lbIn 0.2s ease forwards",
      }}
    >
      <style>{`@keyframes lbIn{from{opacity:0}to{opacity:1}}@keyframes lbUp{from{transform:scale(0.94) translateY(12px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}`}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "820px",
          aspectRatio: "4 / 3",
          borderRadius: "14px",
          overflow: "hidden",
          border: "1px solid var(--border-hover)",
          boxShadow: "0 40px 100px -20px rgba(0,0,0,0.95)",
          animation: "lbUp 0.28s cubic-bezier(0.4,0,0.2,1) forwards",
          flexShrink: 0,
        }}
      >
        <Image
          src={img.src}
          alt={img.title}
          fill
          sizes="820px"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      <LbBtn
        pos={{ top: "1.25rem", right: "1.25rem" }}
        onClick={onClose}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </LbBtn>
      <LbBtn
        pos={{ left: "1.25rem", top: "50%", transform: "translateY(-50%)" }}
        onClick={(e) => {
          e.stopPropagation()
          onPrev()
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </LbBtn>
      <LbBtn
        pos={{ right: "1.25rem", top: "50%", transform: "translateY(-50%)" }}
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </LbBtn>
    </div>
  )
}

function LbBtn({
  children,
  pos,
  onClick,
}: {
  children: React.ReactNode
  pos: React.CSSProperties
  onClick: React.MouseEventHandler
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        all: "unset",
        position: "fixed",
        ...pos,
        cursor: "pointer",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: hovered ? "var(--surface2)" : "var(--surface)",
        border: `1px solid ${
          hovered ? "var(--border-hover)" : "var(--border)"
        }`,
        color: "var(--text)",
        transition: "background 0.2s, border-color 0.2s",
      }}
    >
      {children}
    </button>
  )
}