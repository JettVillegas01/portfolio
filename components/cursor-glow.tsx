"use client"

import { useEffect, useRef } from "react"

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }

      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(() => {
          if (glowRef.current) {
            glowRef.current.style.transform = `translate3d(${posRef.current.x - 160}px, ${posRef.current.y - 160}px, 0)`
          }
          animationRef.current = null
        })
      }
    }

    const handleMouseLeave = () => {
      if (glowRef.current) {
        glowRef.current.style.opacity = "0"
      }
    }

    const handleMouseEnter = () => {
      if (glowRef.current) {
        glowRef.current.style.opacity = "0.28"
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-[999] w-[320px] h-[320px] rounded-full blur-[120px]"
      style={{
        background: "var(--accent)",
        opacity: 0.28,
        willChange: "transform",
      }}
    />
  )
}
