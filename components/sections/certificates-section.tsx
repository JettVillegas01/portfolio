"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { supabase } from "@/lib/supabase"

interface Certificate {
  id: string
  title: string
  issuer: string
  date_issued: string
  image_url: string
}

export function CertificatesSection() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    supabase
      .from("certificates")
      .select("id, title, issuer, date_issued, image_url")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setCertificates(data)
        setLoading(false)
      })
  }, [])

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 200)
  }

  const closeLightbox = () => setIsOpen(false)

  const goTo = useCallback(
    (index: number) => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex(
          ((index % certificates.length) + certificates.length) %
            certificates.length
        )
        setIsAnimating(false)
      }, 120)
    },
    [certificates.length]
  )

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") goTo(currentIndex - 1)
      if (e.key === "ArrowRight") goTo(currentIndex + 1)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentIndex, goTo])

  const currentCert = certificates[currentIndex]

  return (
    <section
      id="certificates"
      className="bg-[var(--bg)] border-t border-[var(--border)] text-center"
    >
      {/* Header */}
      <div className="mb-4">
        <p className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-[var(--accent)] mb-2">
          Credentials
        </p>
        <h2
          className="font-extrabold leading-tight tracking-tight mb-2"
          style={{
            fontFamily: "var(--font-syne), Syne, sans-serif",
            fontSize: "clamp(2.4rem, 4vw, 4rem)",
            lineHeight: 1.1,
          }}
        >
          My <span className="text-[var(--accent)]">Certificates</span>
        </h2>
        <p className="text-sm text-[var(--muted)] mb-8">
          {loading
            ? "Loading certificates..."
            : `${certificates.length} webinars, seminars, and training programs completed.`}
        </p>
      </div>

      {/* Preview strip */}
      {!loading && certificates.length > 0 && (
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {certificates.slice(0, 4).map((cert, i) => (
              <button
                key={cert.id}
                onClick={() => openLightbox(i)}
                className="w-44 h-28 rounded-xl overflow-hidden border border-[var(--border)] relative flex-shrink-0 group transition-all duration-200 hover:border-[var(--accent)] hover:scale-105 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(124,110,255,0.2)]"
              >
                <Image
                  src={cert.image_url}
                  alt={cert.title}
                  fill
                  sizes="176px"
                  className="object-cover blur-[1px] brightness-75 transition-all duration-300 group-hover:blur-0 group-hover:brightness-100 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.7)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </button>
            ))}

            {certificates.length > 4 && (
              <div
                className="w-44 h-28 rounded-xl border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center transition-all duration-200 hover:border-[var(--accent)] hover:bg-[rgba(124,110,255,0.1)] cursor-pointer"
                onClick={() => openLightbox(4)}
              >
                <span
                  className="text-xl font-bold text-[var(--accent2)]"
                  style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                >
                  +{certificates.length - 4} more
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => openLightbox(0)}
            className="group inline-flex items-center gap-3 px-10 py-4 bg-[var(--accent)] text-white rounded-lg text-lg font-medium transition-all duration-200 hover:bg-[#9580ff] hover:-translate-y-1 hover:shadow-[0_12px_40px_var(--glow)] active:scale-95"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:rotate-12">
              <circle cx="12" cy="9" r="6" />
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
            </svg>
            <span>View All Certificates</span>
          </button>
        </div>
      )}

      {/* Lightbox */}
      {isOpen && currentCert && (
        <div
          className="fixed inset-0 z-[2000] bg-[rgba(5,5,10,0.95)] backdrop-blur-lg flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--text)] transition-all duration-200 hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-white hover:scale-110 hover:rotate-90 z-10"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goTo(currentIndex - 1)
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-13 h-13 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--text)] transition-all duration-200 hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-white hover:scale-110 z-10 group"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:-translate-x-0.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div
            className={`relative max-w-[90vw] md:max-w-[110rem] w-full flex flex-col items-center gap-5 transition-all duration-150 ${
              isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentCert.image_url}
              alt={currentCert.title}
              width={1000}
              height={700}
              sizes="(max-width: 768px) 90vw, 1000px"
              className="w-full max-h-[75vh] object-contain rounded-xl border border-[var(--border)] shadow-[0_24px_80px_rgba(0,0,0,0.7)]"
            />
            <div className="flex items-center justify-between w-full px-1 gap-5">
              <div className="flex-1 text-left">
                <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[var(--accent)] mb-1">
                  {currentCert.issuer}
                </p>
                <h4
                  className="text-base font-bold text-[var(--text)] leading-snug mb-1"
                  style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                >
                  {currentCert.title}
                </h4>
                <span className="text-sm text-[var(--muted)]">
                  {currentCert.date_issued}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center gap-1.5">
                  {certificates.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`h-2 rounded-full transition-all duration-200 ${
                        i === currentIndex
                          ? "bg-[var(--accent)] w-6"
                          : "w-2 bg-[var(--border)] hover:bg-[var(--muted)]"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-[var(--muted)] font-medium whitespace-nowrap ml-4">
                  {currentIndex + 1} / {certificates.length}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goTo(currentIndex + 1)
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-13 h-13 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--text)] transition-all duration-200 hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-white hover:scale-110 z-10 group"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-0.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}