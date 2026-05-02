"use client"

import { useState } from "react"
import { skillData, frontendSkills, backendSkills, levelLabels } from "@/lib/data"

function SkillBubble({ skillKey, onClick }: { skillKey: string; onClick: (k: string) => void }) {
  const s = skillData[skillKey]
  if (!s) return null
  return (
    <button
      onClick={() => onClick(skillKey)}
      className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer mx-5 group"
      style={{ width: 80 }}
    >
      <div
        className="w-[72px] h-[72px] rounded-full flex items-center justify-center border border-[rgba(124,110,255,0.25)] transition-all duration-200 group-hover:border-[rgba(124,110,255,0.7)] group-hover:shadow-[0_0_28px_rgba(124,110,255,0.4)] group-hover:scale-110 text-[var(--accent2)]"
        style={{
          background: "radial-gradient(circle at 35% 35%, rgba(124,110,255,0.2) 0%, rgba(124,110,255,0.05) 60%, rgba(124,110,255,0.02) 100%)",
          boxShadow: "0 0 14px rgba(124,110,255,0.07), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {s.icon}
      </div>
      <span className="text-[0.58rem] font-semibold text-[rgba(255,255,255,0.55)] uppercase tracking-wider text-center leading-tight">
        {s.title}
      </span>
    </button>
  )
}

function MarqueeRow({ skills, reverse, onClick }: { skills: string[]; reverse?: boolean; onClick: (k: string) => void }) {
  const multiplied = Array.from({ length: 6 }, () => skills).flat()

  return (
    <div
      className="overflow-hidden w-full"
      style={{ maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}
    >
      <div
        className="flex items-center py-3"
        style={{
          width: "max-content",
          animation: `${reverse ? "marquee-rev" : "marquee-fwd"} 8s linear infinite`,
        }}
      >
        {multiplied.map((key, i) => (
          <SkillBubble key={`${key}-${i}`} skillKey={key} onClick={onClick} />
        ))}
      </div>

      <style>{`
        @keyframes marquee-fwd {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-100% / 6)); }
        }
        @keyframes marquee-rev {
          from { transform: translateX(calc(-100% / 6)); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}

export function SkillsSection() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const skill = selectedSkill ? skillData[selectedSkill] : null

  return (
    <section id="skills" className="bg-[var(--bg)] border-t border-[var(--border)]">

      {/* Header */}
      <div className="text-center mb-14">
        <p className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent)] mb-2">
          Expertise
        </p>
        <h2
          className="font-extrabold leading-tight tracking-tight mb-2"
          style={{
            fontFamily: "var(--font-syne), Syne, sans-serif",
            fontSize: "clamp(1.9rem, 4vw, 4rem)",
            lineHeight: 1.1,
          }}
        >
          My <span className="text-[var(--accent)]">Skills</span>
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Click any bubble to explore my experience with that skill.
        </p>
      </div>

      {/* Frontend row */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-[var(--accent)] shrink-0">Frontend</span>
        <div className="flex-1 h-px bg-[rgba(124,110,255,0.15)]" />
      </div>
      <MarqueeRow skills={frontendSkills} onClick={setSelectedSkill} />

      {/* Spacer */}
      <div className="h-12" />

      {/* Backend row */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-[var(--accent)] shrink-0">Backend &amp; Tools</span>
        <div className="flex-1 h-px bg-[rgba(124,110,255,0.15)]" />
      </div>
      <MarqueeRow skills={backendSkills} reverse onClick={setSelectedSkill} />

      {/* Modal */}
      {selectedSkill && skill && (
        <div
          className="fixed inset-0 z-[3000] bg-[rgba(5,5,12,0.82)] backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelectedSkill(null)}
        >
          <div
            className="relative bg-[var(--bg3)] border border-[rgba(124,110,255,0.22)] rounded-2xl p-8 md:p-10 max-w-[44rem] w-full text-center shadow-[0_40px_80px_rgba(0,0,0,0.7)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedSkill(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] transition-all duration-200 hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] hover:rotate-90"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 border border-[rgba(124,110,255,0.3)] bg-[radial-gradient(circle_at_35%_35%,rgba(124,110,255,0.28),rgba(124,110,255,0.05))] shadow-[0_0_28px_rgba(124,110,255,0.18)] text-[var(--accent2)]">
              {skill.icon}
            </div>

            <h3
              className="text-2xl font-extrabold tracking-tight mb-3 text-[var(--text)]"
              style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
            >
              {skill.title}
            </h3>

            <div className="flex items-center justify-center gap-2 mb-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full ${
                    i <= skill.level
                      ? "w-7 bg-[var(--accent)] shadow-[0_0_6px_rgba(124,110,255,0.5)]"
                      : "w-2 bg-[rgba(124,110,255,0.2)]"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-[var(--accent2)] font-semibold tracking-wider uppercase mb-5">
              {levelLabels[skill.level]}
            </p>
            <p className="text-[0.95rem] leading-relaxed text-[var(--muted)] mb-6">{skill.desc}</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {skill.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 border border-[rgba(124,110,255,0.2)] rounded-lg text-xs font-medium text-[var(--accent2)] bg-[rgba(124,110,255,0.06)] tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}