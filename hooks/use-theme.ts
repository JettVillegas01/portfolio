"use client"

import { useEffect, useState } from "react"

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Get theme from localStorage or system preference
    const stored = localStorage.getItem("theme")
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    const initialTheme = (stored as "light" | "dark") || systemPreference

    setTheme(initialTheme)
    applyTheme(initialTheme)
  }, [])

  const applyTheme = (newTheme: "light" | "dark") => {
    const root = document.documentElement
    root.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    applyTheme(newTheme)
  }

  return { theme, toggleTheme, isMounted }
}
