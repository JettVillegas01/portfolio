"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "@/hooks/use-theme"
import { navLinks } from "@/lib/data"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mounted, setMounted] = useState(false)
  const { theme, toggleTheme, isMounted: isThemeMounted } = useTheme()
  const pathname = usePathname()
  const router = useRouter()
  const isAboutPage = pathname === "/about"

  useEffect(() => {
    setMounted(true)
  }, [])

  // Force highlight "about" when on /about page
  useEffect(() => {
    if (isAboutPage) {
      setActiveSection("about")
    }
  }, [isAboutPage])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60)

      // Section tracking only works on the home page
      if (!isAboutPage) {
        const sections = document.querySelectorAll("section[id]")
        const scrollY = window.scrollY + window.innerHeight / 2

        sections.forEach((section) => {
          const el = section as HTMLElement
          const top = el.offsetTop
          const id = section.getAttribute("id")
          if (scrollY >= top && scrollY < top + el.offsetHeight && id) {
            setActiveSection(id)
          }
        })
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isAboutPage])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileNavOpen(false)

    if (isAboutPage) {
      // On /about page: "About" scrolls to top, everything else navigates home + hash
      if (href === "#about") {
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        router.push(`/${href}`)
      }
      return
    }

    // Normal home-page smooth scroll
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <header
        className={`fixed top-0 w-full z-[500] transition-all duration-500 ${
          isScrolled
            ? "py-5 backdrop-blur-[20px] border-b border-[var(--border)] shadow-[0_6px_30px_rgba(0,0,0,0.15)]"
            : "py-8 bg-transparent"
        }`}
        style={isScrolled ? { background: "var(--bg)" } : undefined}
      >
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between max-w-[1440px] mx-auto w-full">

          {/* Logo — always navigates home */}
          <Link
            href="/"
            className="font-extrabold text-2xl tracking-tight"
            style={{
              fontFamily: "var(--font-syne), Syne, sans-serif",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(-10px)",
              transition: "all 0.5s ease",
            }}
          >
            JV<span className="text-[var(--accent)]">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link, index) => {
              const sectionId = link.href.slice(1) // "#about" → "about"
              const isActive = activeSection === sectionId

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative text-[0.9rem] font-semibold uppercase tracking-[0.14em] px-3 py-2 rounded-md transition-all duration-300"
                  style={{
                    color: isActive ? "var(--text)" : "var(--muted)",
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(-10px)",
                    transition: `all 0.5s ease ${index * 0.05}s`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--text)"
                    e.currentTarget.style.transform = "translateY(-2px)"
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--muted)"
                    e.currentTarget.style.transform = "translateY(0)"
                  }}
                >
                  {link.label}
                  {/* Active underline */}
                  <span
                    className="absolute left-0 -bottom-1 h-[2px] rounded-full bg-[var(--accent)] transition-all duration-300"
                    style={{ width: isActive ? "100%" : "0%" }}
                  />
                </Link>
              )
            })}
          </nav>

          {/* Theme Toggle — desktop */}
          {isThemeMounted && (
            <motion.button
              onClick={toggleTheme}
              className="hidden md:flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300"
              style={{ background: "var(--surface)", color: "var(--text)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface2)" }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--surface)" }}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{ rotate: theme === "dark" ? 180 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div initial={false} animate={{ rotate: theme === "dark" ? 0 : 180, opacity: theme === "dark" ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ position: "absolute" }}>
                {theme === "dark" && <Sun size={20} />}
              </motion.div>
              <motion.div initial={false} animate={{ rotate: theme === "dark" ? 180 : 0, opacity: theme === "dark" ? 0 : 1 }} transition={{ duration: 0.3 }} style={{ position: "absolute" }}>
                {theme !== "dark" && <Moon size={20} />}
              </motion.div>
            </motion.button>
          )}

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-2">
            {isThemeMounted && (
              <motion.button
                onClick={toggleTheme}
                className="flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300"
                style={{ background: "var(--surface)", color: "var(--text)" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ rotate: theme === "dark" ? 180 : 0 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div initial={false} animate={{ rotate: theme === "dark" ? 0 : 180, opacity: theme === "dark" ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ position: "absolute" }}>
                  {theme === "dark" && <Sun size={20} />}
                </motion.div>
                <motion.div initial={false} animate={{ rotate: theme === "dark" ? 180 : 0, opacity: theme === "dark" ? 0 : 1 }} transition={{ duration: 0.3 }} style={{ position: "absolute" }}>
                  {theme !== "dark" && <Moon size={20} />}
                </motion.div>
              </motion.button>
            )}
            <button className="flex flex-col gap-2 p-2" onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
              <span className="block w-6 h-[2px] bg-[var(--text)] transition-all duration-300" style={{ transform: isMobileNavOpen ? "rotate(45deg) translateY(7px)" : "" }} />
              <span className="block w-6 h-[2px] bg-[var(--text)] transition-all duration-300" style={{ transform: isMobileNavOpen ? "rotate(-45deg) translateY(-7px)" : "" }} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <div
        className="fixed inset-0 z-[400] flex flex-col items-center justify-center gap-10 bg-[var(--bg)] transition-all duration-500"
        style={{ opacity: isMobileNavOpen ? 1 : 0, pointerEvents: isMobileNavOpen ? "auto" : "none" }}
      >
        {navLinks.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="text-4xl font-bold transition-all duration-300"
            style={{
              fontFamily: "var(--font-syne), Syne, sans-serif",
              opacity: isMobileNavOpen ? 1 : 0,
              transform: isMobileNavOpen ? "translateY(0)" : "translateY(20px)",
              transition: `all 0.4s ease ${index * 0.07}s`,
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  )
}