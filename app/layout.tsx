import type { Metadata } from "next"
import { Syne, DM_Sans } from "next/font/google"
import "./globals.css"
import { CursorGlow } from "@/components/cursor-glow"

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Jett Villegas - Frontend Developer",
  description:
    "Frontend Developer & Web Designer based in the Philippines. I build interfaces that feel as good as they look.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`} data-theme="dark">
      <body className="antialiased">
        <CursorGlow />
        <div className="noise" />
        {children}
      </body>
    </html>
  )
}
