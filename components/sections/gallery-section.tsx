"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { supabase } from "@/lib/supabase"

interface GalleryImage {
  id: number
  src: string
  title: string
  location: string
  description: string
  sort_order: number
}

const VISIBLE = 4
const GAP = 12

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)
  const [startIndex, setStartIndex] = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [cardWidth, setCardWidth] = useState(0)
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch gallery from Supabase
  useEffect(() => {
    supabase
      .from("gallery")
      .select("id, src, title, location, description, sort_order")
      .order("sort_order", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) setImages(data)
        setLoading(false)
      })
  }, [])

  // Measure card width
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        const totalWidth = trackRef.current.offsetWidth
        setCardWidth((totalWidth - GAP * (VISIBLE - 1)) / VISIBLE)
      }
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [loading])

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const TOTAL = images.length
  const maxIndex = Math.max(0, TOTAL - VISIBLE)

  const goTo = useCallback(
    (idx: number) => {
      setStartIndex(Math.max(0, Math.min(idx, maxIndex)))
    },
    [maxIndex]
  )

  // Keyboard nav for lightbox
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
    <>
      <section ref={sectionRef} id="gallery" style={{ position: "relative" }}>
        {/* Ambient glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "500px",
            height: "300px",
            background: "var(--glow)",
            borderRadius: "50%",
            filter: "blur(90px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Header */}
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
                  marginBottom: "0.5rem",
                }}
              >
                Visual Work
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-syne), sans-serif",
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
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

          {/* Carousel viewport */}
          <div
            ref={trackRef}
            style={{
              overflow: "hidden",
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.6s var(--ease) 0.1s, transform 0.6s var(--ease) 0.1s",
            }}
          >
            {loading ? (
              /* Loading skeleton */
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
                      animation: "pulse 2s infinite",
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

          {/* Dot indicators */}
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
                  aria-label={`Go to group ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {lightbox !== null && images[lightbox] && (
        <Lightbox
          idx={lightbox}
          images={images}
          onClose={() => setLightbox(null)}
          onPrev={() => setLightbox((p) => (p! - 1 + TOTAL) % TOTAL)}
          onNext={() => setLightbox((p) => (p! + 1) % TOTAL)}
        />
      )}
    </>
  )
}

/* ── Slide Card ── */
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
        border: `1px solid ${hovered ? "var(--border-hover)" : "var(--border)"}`,
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

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(to top, rgba(7,7,14,0.82) 0%, rgba(7,7,14,0.2) 55%, transparent 100%)"
            : "linear-gradient(to top, rgba(7,7,14,0.35) 0%, transparent 60%)",
          transition: "background 0.35s var(--ease)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "12px",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 0.3s var(--ease), transform 0.3s var(--ease)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontSize: "0.78rem",
              fontWeight: 700,
              color: "#fff",
              margin: 0,
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
            }}
          >
            {img.title}
          </p>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "0.65rem",
              fontWeight: 500,
              color: "var(--accent2)",
              margin: "2px 0 0",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {img.location}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── Nav Button ── */
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

/* ── Lightbox ── */
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
      <style>{`
        @keyframes lbIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes lbUp { from { transform: scale(0.94) translateY(12px); opacity: 0 } to { transform: scale(1) translateY(0); opacity: 1 } }
      `}</style>

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

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          marginTop: "1.25rem",
          width: "100%",
          maxWidth: "820px",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "1rem 1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          animation:
            "lbUp 0.32s cubic-bezier(0.4,0,0.2,1) 0.06s both forwards",
          flexShrink: 0,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "4px",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-syne), sans-serif",
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--text)",
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              {img.title}
            </h3>
            <span
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.65rem",
                fontWeight: 600,
                color: "var(--accent)",
                background: "rgba(124,110,255,0.12)",
                border: "1px solid rgba(124,110,255,0.25)",
                borderRadius: "20px",
                padding: "2px 10px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {img.location}
            </span>
          </div>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "0.82rem",
              color: "var(--text2)",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            {img.description}
          </p>
        </div>

        <div
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "0.75rem",
            fontWeight: 500,
            color: "var(--muted)",
            whiteSpace: "nowrap",
            letterSpacing: "0.06em",
          }}
        >
          <span style={{ color: "var(--accent2)", fontWeight: 700 }}>
            {idx + 1}
          </span>
          <span style={{ margin: "0 4px" }}>/</span>
          {TOTAL}
        </div>
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