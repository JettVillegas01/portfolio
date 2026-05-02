"use client"

import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { socialLinks, contactInfo } from "@/lib/data"
import { useState } from "react"

type FormStatus = "idle" | "loading" | "success" | "error"

const inputClass =
  "bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-[var(--text)] placeholder:text-[rgba(136,136,160,0.5)] transition-all duration-200 focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(124,110,255,0.12)] outline-none disabled:opacity-60"

const lettersOnly = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Home", "End"]
  if (!/^[a-zA-Z\s]$/.test(e.key) && !allowed.includes(e.key)) e.preventDefault()
}

const numbersOnly = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Home", "End"]
  if (!/^[\d+\s]$/.test(e.key) && !allowed.includes(e.key)) e.preventDefault()
}

export function ContactSection() {
  const [status, setStatus] = useState<FormStatus>("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch("https://formspree.io/f/xdapyzdv", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })

      if (res.ok) {
        setStatus("success")
        form.reset()
        setTimeout(() => setStatus("idle"), 10000)
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="bg-[var(--bg)] border-t border-[var(--border)]">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 max-w-[120rem] mx-auto">
        {/* Left Column */}
        <div className="flex-shrink-0 w-full lg:w-[min(38rem,40%)]">
          <p className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-[var(--accent)] mb-2">
            Get In Touch
          </p>
          <h2
            className="font-extrabold leading-tight tracking-tight mb-5"
            style={{
              fontFamily: "var(--font-syne), Syne, sans-serif",
              fontSize: "clamp(1.9rem, 4vw, 4rem)",
              lineHeight: 1.1,
            }}
          >
            Let&apos;s <span className="text-[var(--accent)]">Work</span> Together
          </h2>
          <p className="text-sm text-[var(--muted)] leading-relaxed mb-8">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>

          <div className="flex flex-col gap-4 mb-8">
            {contactInfo.map(({ Icon, text }) => (
              <div
                key={text}
                className="group flex items-center gap-3 text-[var(--muted)] cursor-default transition-colors hover:text-[var(--text)]"
              >
                <div className="w-10 h-10 rounded-full bg-[rgba(124,110,255,0.1)] flex items-center justify-center transition-all duration-200 group-hover:bg-[rgba(124,110,255,0.2)] group-hover:scale-110">
                  <Icon className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted)] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[rgba(124,110,255,0.08)] hover:scale-110 hover:-translate-y-1"
              >
                <social.Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Right - Form */}
        <form className="flex-1" onSubmit={handleSubmit}>
          {/* Row 1: Name + Email */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                required
                disabled={status === "loading"}
                onKeyDown={lettersOnly}
                className={inputClass}
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                required
                disabled={status === "loading"}
                className={inputClass}
              />
            </div>
          </div>

          {/* Row 2: Phone (optional) + Subject */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider flex items-center gap-1.5">
                Mobile Number
                <span className="normal-case font-normal tracking-normal text-[var(--muted)] opacity-50">(optional)</span>
              </label>
              <input
                type="text"
                name="phone"
                placeholder="+63 912 345 6789"
                disabled={status === "loading"}
                onKeyDown={numbersOnly}
                className={inputClass}
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Project Inquiry"
                disabled={status === "loading"}
                className={inputClass}
              />
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2 mb-4">
            <label className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Message</label>
            <textarea
              name="message"
              rows={5}
              placeholder="Tell me about your project..."
              required
              disabled={status === "loading"}
              className={`${inputClass} resize-y min-h-[140px]`}
            />
          </div>

          {/* Status Messages */}
          {status === "success" && (
            <div className="flex items-center gap-2 mb-4 px-4 py-3 rounded-xl bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.25)] text-[#22c55e] text-sm">
              <CheckCircle size={16} />
              <span>Message sent! I&apos;ll get back to you soon.</span>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center gap-2 mb-4 px-4 py-3 rounded-xl bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.25)] text-[#ef4444] text-sm">
              <AlertCircle size={16} />
              <span>Something went wrong. Please try again.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="group w-full inline-flex items-center justify-center gap-2 px-7 py-4 bg-[var(--accent)] text-white rounded-lg font-medium transition-all duration-200 hover:bg-[#9580ff] hover:-translate-y-1 hover:shadow-[0_8px_32px_var(--glow)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {status === "loading" ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Sending...</span>
              </>
            ) : status === "success" ? (
              <>
                <CheckCircle size={18} />
                <span>Message Sent!</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <Send size={18} className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  )
}