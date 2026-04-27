"use client"

import { ChevronUp } from "lucide-react"

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <footer
      className="px-[10%] py-8 flex items-center justify-between"
      style={{
        background: "var(--bg2)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <p className="text-sm text-[var(--muted)] tracking-wide">
        &copy; 2025 Jett Villegas. All rights reserved.
      </p>

      <button
        onClick={scrollToTop}
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--accent)"
          e.currentTarget.style.transform = "translateY(-3px) scale(1.05)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "var(--surface)"
          e.currentTarget.style.transform = "translateY(0)"
        }}
      >
        <ChevronUp size={22} />
      </button>
    </footer>
  )
}