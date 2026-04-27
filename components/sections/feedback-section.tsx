"use client"

import { useEffect, useRef, useState } from "react"

interface Feedback {
  id: string
  name: string
  role: string
  comment: string
  rating: number
  date: string
  initials: string
}

const STORAGE_KEY = "portfolio_feedbacks_v1"

function getInitials(name: string) {
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("")
}

function getAvatarHue(initials: string) {
  const hues = [252, 220, 180, 270, 200, 340, 160]
  const code = initials.charCodeAt(0) + (initials.charCodeAt(1) || 0)
  return hues[code % hues.length]
}

function Avatar({ initials }: { initials: string }) {
  const hue = getAvatarHue(initials)
  return (
    <div
      style={{
        width: "42px",
        height: "42px",
        borderRadius: "50%",
        background: `radial-gradient(circle at 30% 30%, hsl(${hue},70%,68%), hsl(${hue},55%,38%))`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "13px",
        fontWeight: "700",
        color: "#fff",
        flexShrink: 0,
        fontFamily: "var(--font-syne)",
        boxShadow: `0 0 0 1px var(--border), 0 4px 14px -4px hsl(${hue},60%,40%)`,
        letterSpacing: "0.04em",
      }}
    >
      {initials}
    </div>
  )
}

function StarPicker({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  const [hovered, setHovered] = useState(0)
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          style={{
            background: "none",
            border: "none",
            padding: "2px",
            cursor: "pointer",
            transition: "transform 0.15s var(--ease)",
            transform: hovered >= star ? "scale(1.2)" : "scale(1)",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={(hovered || value) >= star ? "var(--accent)" : "none"}
            stroke={(hovered || value) >= star ? "var(--accent)" : "var(--muted)"}
            strokeWidth="1.5"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      ))}
    </div>
  )
}

function StarDisplay({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={s <= count ? "var(--accent)" : "none"}
          stroke={s <= count ? "var(--accent)" : "var(--muted)"}
          strokeWidth="1.5"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

function FeedbackCard({
  fb,
  index,
  revealed,
  onDelete,
  isOwn,
}: {
  fb: Feedback
  index: number
  revealed: boolean
  onDelete?: () => void
  isOwn?: boolean
}) {
  return (
    <div
      style={{
        borderRadius: "14px",
        padding: "1.5rem",
        background: "var(--surface)",
        border: `1px solid ${isOwn ? "rgba(124,110,255,0.22)" : "var(--border)"}`,
        transition: "all 0.35s var(--ease)",
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${index * 70}ms`,
        position: "relative",
      }}
    >
      {isOwn && (
        <div
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span
            style={{
              fontSize: "10px",
              color: "var(--accent)",
              background: "rgba(124,110,255,0.1)",
              border: "1px solid rgba(124,110,255,0.22)",
              borderRadius: "20px",
              padding: "2px 8px",
              fontFamily: "var(--font-dm-sans)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            You
          </span>
          {onDelete && (
            <button
              onClick={onDelete}
              title="Delete your feedback"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--muted)",
                padding: "2px",
                display: "flex",
                alignItems: "center",
                borderRadius: "4px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color = "#ff6b6b")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color = "var(--muted)")
              }
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4h6v2" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Top: avatar + info + stars */}
      <div
        style={{
          display: "flex",
          gap: "0.875rem",
          alignItems: "flex-start",
          marginBottom: "1rem",
        }}
      >
        <Avatar initials={fb.initials} />
        <div style={{ flex: 1, minWidth: 0, paddingRight: isOwn ? "80px" : "0" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: "700",
                fontSize: "0.9rem",
                color: "var(--text)",
                letterSpacing: "-0.01em",
              }}
            >
              {fb.name}
            </span>
            <StarDisplay count={fb.rating} />
          </div>
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--muted)",
              margin: "0.2rem 0 0",
              lineHeight: 1.4,
            }}
          >
            {fb.role}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{ height: "1px", background: "var(--border)", marginBottom: "1rem" }}
      />

      {/* Side-by-side layout: quote icon + date left | comment right */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.6fr",
          gap: "1.25rem",
          alignItems: "start",
        }}
      >
        {/* Left */}
        <div>
          <svg
            width="20"
            height="14"
            viewBox="0 0 36 26"
            fill="none"
            style={{ marginBottom: "0.5rem", opacity: 0.4 }}
          >
            <path
              d="M0 26V15.6C0 6.86667 4.26667 1.46667 12.8 0L14.4 2.8C10.6667 3.6 8 5.4 6.4 8.2C4.8 11 4.26667 13.8667 4.8 16.8H10.4V26H0ZM20 26V15.6C20 6.86667 24.2667 1.46667 32.8 0L34.4 2.8C30.6667 3.6 28 5.4 26.4 8.2C24.8 11 24.2667 13.8667 25.6 16.8H31.2V26H20Z"
              fill="var(--accent)"
            />
          </svg>
          <p
            style={{
              fontSize: "0.72rem",
              color: "var(--muted)",
              letterSpacing: "0.06em",
              margin: 0,
            }}
          >
            {fb.date}
          </p>
        </div>

        {/* Right: comment */}
        <div
          style={{ borderLeft: "1px solid var(--border)", paddingLeft: "1.25rem" }}
        >
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--text2)",
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            {fb.comment}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FeedbackSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [revealed, setRevealed] = useState(false)
  const [userFeedbacks, setUserFeedbacks] = useState<Feedback[]>([])

  // Form state
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(5)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setUserFeedbacks(JSON.parse(stored))
    } catch {}
  }, [])

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRevealed(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  function validate() {
    const e: Record<string, string> = {}
    if (!name.trim() || name.trim().length < 2) e.name = "Please enter your name."
    if (!role.trim() || role.trim().length < 2) e.role = "Please enter your role."
    if (!comment.trim() || comment.trim().length < 20)
      e.comment = "Comment must be at least 20 characters."
    if (comment.trim().length > 400) e.comment = "Keep it under 400 characters."
    return e
  }

  function handleSubmit() {
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return

    setSubmitting(true)
    setTimeout(() => {
      const now = new Date()
      const months = [
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec",
      ]
      const newFb: Feedback = {
        id: `user-${Date.now()}`,
        name: name.trim(),
        role: role.trim(),
        comment: comment.trim(),
        rating,
        date: `${months[now.getMonth()]} ${now.getFullYear()}`,
        initials: getInitials(name),
      }
      const updated = [newFb, ...userFeedbacks]
      setUserFeedbacks(updated)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch {}
      setSubmitting(false)
      setSubmitted(true)
      setName("")
      setRole("")
      setComment("")
      setRating(5)
    }, 800)
  }

  function handleDelete(id: string) {
    const updated = userFeedbacks.filter((f) => f.id !== id)
    setUserFeedbacks(updated)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch {}
  }

  const allFeedbacks = [...userFeedbacks]

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: "100%",
    background: "var(--bg3)",
    border: `1px solid ${hasError ? "#ff6b6b" : "var(--border)"}`,
    borderRadius: "10px",
    padding: "0.75rem 1rem",
    color: "var(--text)",
    fontSize: "0.875rem",
    fontFamily: "var(--font-dm-sans)",
    outline: "none",
    transition: "border-color 0.2s var(--ease)",
    boxSizing: "border-box",
  })

  return (
    <section ref={sectionRef} id="feedback" style={{ position: "relative" }}>
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "300px",
          background: "radial-gradient(ellipse, var(--glow) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(50px)",
        }}
      />

      {/* Section Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "3.5rem",
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.7s var(--ease), transform 0.7s var(--ease)",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            fontWeight: "600",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "0.6rem",
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          Client Testimonials
        </p>
        <h2
          style={{
            fontSize: "clamp(1.9rem, 4vw, 2.9rem)",
            fontWeight: "800",
            color: "var(--text)",
            margin: "0 0 1rem",
            lineHeight: 1.15,
          }}
        >
          What people{" "}
          <span className="gradient-text-animate">say about</span> my work
        </h2>
        <p
          style={{
            maxWidth: "460px",
            margin: "0 auto",
            fontSize: "0.95rem",
            color: "var(--muted)",
            lineHeight: 1.7,
          }}
        >
          Real words from people I've collaborated with — and feel free to leave yours.
        </p>
      </div>

      {/* Main layout: Form (left sticky) + Cards (right) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(280px, 360px) 1fr",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        {/* ── FORM PANEL ── */}
        <div
          style={{
            borderRadius: "16px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            padding: "1.75rem",
            position: "sticky",
            top: "6rem",
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(24px)",
            transition:
              "opacity 0.7s var(--ease) 0.1s, transform 0.7s var(--ease) 0.1s",
          }}
        >
          <div style={{ marginBottom: "1.25rem" }}>
            <h3
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: "700",
                fontSize: "1rem",
                color: "var(--text)",
                margin: "0 0 0.3rem",
              }}
            >
              Leave a Feedback
            </h3>
            <p
              style={{
                fontSize: "0.78rem",
                color: "var(--muted)",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              Worked with me? Share your experience.
            </p>
          </div>

          <div
            style={{ height: "1px", background: "var(--border)", marginBottom: "1.25rem" }}
          />

          {submitted ? (
            <div
              style={{
                textAlign: "center",
                padding: "2rem 1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "rgba(124,110,255,0.12)",
                  border: "1px solid rgba(124,110,255,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-syne)",
                  fontWeight: "700",
                  fontSize: "0.95rem",
                  color: "var(--text)",
                  margin: 0,
                }}
              >
                Thank you!
              </p>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--muted)",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                Your feedback has been posted. It means a lot.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.78rem",
                  color: "var(--accent)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-dm-sans)",
                  padding: 0,
                }}
              >
                Leave another →
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {/* Name */}
              <div>
                <label
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text2)",
                    fontWeight: 500,
                    display: "block",
                    marginBottom: "0.4rem",
                    letterSpacing: "0.03em",
                  }}
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex Rivera"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    setErrors((p) => ({ ...p, name: "" }))
                  }}
                  style={inputStyle(!!errors.name)}
                  onFocus={(e) => {
                    ;(e.target as HTMLInputElement).style.borderColor = "var(--accent)"
                  }}
                  onBlur={(e) => {
                    ;(e.target as HTMLInputElement).style.borderColor = errors.name
                      ? "#ff6b6b"
                      : "var(--border)"
                  }}
                />
                {errors.name && (
                  <p style={{ fontSize: "0.72rem", color: "#ff6b6b", margin: "0.3rem 0 0" }}>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Role */}
              <div>
                <label
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text2)",
                    fontWeight: 500,
                    display: "block",
                    marginBottom: "0.4rem",
                    letterSpacing: "0.03em",
                  }}
                >
                  Role / Company *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Designer · Acme Co."
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value)
                    setErrors((p) => ({ ...p, role: "" }))
                  }}
                  style={inputStyle(!!errors.role)}
                  onFocus={(e) => {
                    ;(e.target as HTMLInputElement).style.borderColor = "var(--accent)"
                  }}
                  onBlur={(e) => {
                    ;(e.target as HTMLInputElement).style.borderColor = errors.role
                      ? "#ff6b6b"
                      : "var(--border)"
                  }}
                />
                {errors.role && (
                  <p style={{ fontSize: "0.72rem", color: "#ff6b6b", margin: "0.3rem 0 0" }}>
                    {errors.role}
                  </p>
                )}
              </div>

              {/* Rating */}
              <div>
                <label
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text2)",
                    fontWeight: 500,
                    display: "block",
                    marginBottom: "0.5rem",
                    letterSpacing: "0.03em",
                  }}
                >
                  Rating *
                </label>
                <StarPicker value={rating} onChange={setRating} />
              </div>

              {/* Comment */}
              <div>
                <label
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text2)",
                    fontWeight: 500,
                    display: "block",
                    marginBottom: "0.4rem",
                    letterSpacing: "0.03em",
                  }}
                >
                  Your Feedback *
                </label>
                <textarea
                  placeholder="Share your experience working with Jett..."
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value)
                    setErrors((p) => ({ ...p, comment: "" }))
                  }}
                  rows={4}
                  style={{
                    ...inputStyle(!!errors.comment),
                    resize: "vertical",
                    minHeight: "100px",
                    lineHeight: 1.7,
                  }}
                  onFocus={(e) => {
                    ;(e.target as HTMLTextAreaElement).style.borderColor = "var(--accent)"
                  }}
                  onBlur={(e) => {
                    ;(e.target as HTMLTextAreaElement).style.borderColor = errors.comment
                      ? "#ff6b6b"
                      : "var(--border)"
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "0.3rem",
                  }}
                >
                  {errors.comment ? (
                    <p style={{ fontSize: "0.72rem", color: "#ff6b6b", margin: 0 }}>
                      {errors.comment}
                    </p>
                  ) : (
                    <span />
                  )}
                  <p style={{ fontSize: "0.7rem", color: "var(--muted)", margin: 0 }}>
                    {comment.length}/400
                  </p>
                </div>
              </div>

              {/* Submit button */}
              <button
                onClick={handleSubmit}
                disabled={submitting}
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  borderRadius: "10px",
                  background: submitting
                    ? "var(--surface2)"
                    : "linear-gradient(135deg, var(--accent), var(--accent2))",
                  border: "none",
                  color: "#fff",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  fontFamily: "var(--font-syne)",
                  cursor: submitting ? "not-allowed" : "pointer",
                  letterSpacing: "0.02em",
                  transition: "all 0.25s var(--ease)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: submitting ? "none" : "0 4px 20px -6px var(--glow-strong)",
                }}
                onMouseEnter={(e) => {
                  if (!submitting)
                    (e.currentTarget as HTMLButtonElement).style.opacity = "0.88"
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "1"
                }}
              >
                {submitting ? (
                  <>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      style={{ animation: "spin 0.8s linear infinite" }}
                    >
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                    Posting...
                  </>
                ) : (
                  <>
                    Submit Feedback
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* ── CARDS COLUMN ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {allFeedbacks.length === 0 ? (
            <div
              style={{
                borderRadius: "14px",
                padding: "3rem 2rem",
                background: "var(--surface)",
                border: "1px dashed var(--border)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.75rem",
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.35s var(--ease)",
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--muted)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ opacity: 0.5 }}
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--muted)",
                  margin: 0,
                  textAlign: "center",
                  lineHeight: 1.6,
                }}
              >
                No feedback yet. Be the first to leave one!
              </p>
            </div>
          ) : (
            allFeedbacks.map((fb, i) => (
              <FeedbackCard
                key={fb.id}
                fb={fb}
                index={i}
                revealed={revealed}
                isOwn={fb.id.startsWith("user-")}
                onDelete={
                  fb.id.startsWith("user-") ? () => handleDelete(fb.id) : undefined
                }
              />
            ))
          )}
        </div>
      </div>

      {/* Bottom stats bar */}
      <div
        style={{
          marginTop: "3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
          flexWrap: "wrap",
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(16px)",
          transition:
            "opacity 0.7s var(--ease) 0.45s, transform 0.7s var(--ease) 0.45s",
        }}
      >
        {[
          { value: "5.0", label: "Average Rating" },
          { value: "100%", label: "Satisfaction Rate" },
          { value: "15+", label: "Projects Delivered" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "1.55rem",
                fontWeight: "800",
                color: "var(--accent)",
                letterSpacing: "-0.03em",
              }}
            >
              {stat.value}
            </span>
            <span
              style={{
                fontSize: "0.72rem",
                color: "var(--muted)",
                letterSpacing: "0.09em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}