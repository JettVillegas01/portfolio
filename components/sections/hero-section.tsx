"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import Link from "next/link"
import { TypedText } from "@/components/typed-text"
import { orbitRings, socialLinks } from "@/lib/data"

// ─── Frame constants ──────────────────────────────────────────────────────────
const TOTAL_FRAMES = 160
const MS_PER_FRAME  = 3000 / TOTAL_FRAMES   // ~18.75 ms

function frameSrc(n: number) {
  return `/images/profile_frame/frame-${String(n).padStart(3, "0")}.jpg`
}

// Silently preload N frames ahead into browser cache
function preload(from: number, dir: 1 | -1, count = 20) {
  for (let i = 1; i <= count; i++) {
    const n = from + dir * i
    if (n >= 1 && n <= TOTAL_FRAMES) {
      const img = new window.Image()
      img.src = frameSrc(n)
    }
  }
}

// ─── Profile photo component — owns its own img refs, zero React re-renders ──
// We imperatively flip src + opacity directly on the DOM nodes.
// This is the ONLY reliable way to animate images without blink.
interface ProfilePhotoProps {
  theme: string
  mounted: boolean
  className?: string
  style?: React.CSSProperties
}

function ProfilePhoto({ theme, mounted, className, style }: ProfilePhotoProps) {
  const refA = useRef<HTMLImageElement>(null)
  const refB = useRef<HTMLImageElement>(null)
  const frameRef   = useRef(TOTAL_FRAMES)
  const activeRef  = useRef<"a" | "b">("a")   // which img is VISIBLE right now
  const rafRef     = useRef<number | null>(null)
  const firstRef   = useRef(true)

  const stop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  // Show a specific frame number — write to the HIDDEN buffer, then swap opacities
  const show = useCallback((n: number) => {
    const a = refA.current
    const b = refB.current
    if (!a || !b) return
    const src = frameSrc(n)
    if (activeRef.current === "a") {
      b.src = src          // load into hidden B
      a.style.opacity = "0"
      b.style.opacity = "1"
      activeRef.current = "b"
    } else {
      a.src = src          // load into hidden A
      b.style.opacity = "0"
      a.style.opacity = "1"
      activeRef.current = "a"
    }
    frameRef.current = n
  }, [])

  const startAnim = useCallback((dir: 1 | -1) => {
    stop()
    preload(frameRef.current, dir, 25)
    let last = performance.now()

    const loop = (now: number) => {
      const delta = now - last
      if (delta >= MS_PER_FRAME) {
        last = now - (delta % MS_PER_FRAME)
        const next = frameRef.current + dir
        if (next >= TOTAL_FRAMES) { show(TOTAL_FRAMES); stop(); return }
        if (next <= 1)            { show(1);             stop(); return }
        show(next)
        // Rolling preload — keep cache topped up
        if (next % 10 === 0) preload(next, dir, 20)
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
  }, [stop, show])

  useEffect(() => {
    if (!mounted) return

    if (firstRef.current) {
      firstRef.current = false
      const init = theme === "light" ? 1 : TOTAL_FRAMES
      frameRef.current = init
      const src = frameSrc(init)
      // Both images start on same frame — no crossfade needed on first paint
      if (refA.current) { refA.current.src = src; refA.current.style.opacity = "1" }
      if (refB.current) { refB.current.src = src; refB.current.style.opacity = "0" }
      activeRef.current = "a"
      // Preload aggressively in both directions so toggle is instant
      preload(init, 1,  40)
      preload(init, -1, 40)
      return
    }

    startAnim(theme === "dark" ? 1 : -1)
    return () => stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, mounted])

  useEffect(() => () => stop(), [stop])

  // Transition only on opacity — NOT on src (src change must be invisible)
  const imgStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "top",
    transition: "opacity 60ms linear",
    willChange: "opacity",
  }

  return (
    <div className={className} style={{ position: "relative", ...style }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={refA} alt="Jett Villegas" style={{ ...imgStyle, opacity: 1 }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={refB} alt=""             aria-hidden style={{ ...imgStyle, opacity: 0 }} />
    </div>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState("dark")
  const [boostedRings, setBoostedRings] = useState<Set<number>>(new Set())

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true))
    const init = document.documentElement.getAttribute("data-theme") || "dark"
    setCurrentTheme(init)
    const obs = new MutationObserver(() => {
      setCurrentTheme(document.documentElement.getAttribute("data-theme") || "dark")
    })
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] })
    return () => { cancelAnimationFrame(t); obs.disconnect() }
  }, [])

  const handleIconClick = useCallback((ri: number, e: React.MouseEvent) => {
    e.stopPropagation()
    if (boostedRings.has(ri)) return
    setBoostedRings(p => new Set([...p, ri]))
    setTimeout(() => setBoostedRings(p => { const n = new Set(p); n.delete(ri); return n }), 2500)
  }, [boostedRings])

  const dur = (ri: number, base: string) =>
    boostedRings.has(ri) ? `${(parseFloat(base) / 5).toFixed(2)}s` : base

  const navClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const isLight = mounted && currentTheme === "light"

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col sm:flex-row lg:flex-row items-center justify-between gap-6 sm:gap-10 lg:gap-8"
      style={{ overflow: "hidden" }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute top-1/3 left-1/4 w-[40rem] h-[40rem] rounded-full" style={{ background: "radial-gradient(circle,rgba(124,110,255,.055) 0%,transparent 70%)" }} />
        <div className="absolute bottom-1/4 right-1/3 w-[30rem] h-[30rem] rounded-full" style={{ background: "radial-gradient(circle,rgba(124,110,255,.035) 0%,transparent 70%)" }} />
      </div>

      {/* Watermark */}
      <div aria-hidden className="pointer-events-none select-none absolute top-1/2 left-1/2 z-0"
        style={{ fontFamily:"var(--font-syne),Syne,sans-serif", fontSize:"clamp(8rem,20vw,26rem)", fontWeight:800, color:"transparent", WebkitTextStroke:"1px rgba(124,110,255,.04)", lineHeight:1, whiteSpace:"nowrap", opacity:mounted?1:0, transition:"opacity .8s ease", transform:"translate(-50%,-50%)", overflow:"hidden" }}>
        JETT
      </div>

      {/* ── Mobile / Tablet photo (hidden on lg+) ── */}
      <div
        className="flex lg:hidden flex-shrink-0 relative z-10 items-center justify-center sm:order-last"
        style={{ opacity:mounted?1:0, transform:mounted?"translateY(0)":"translateY(16px)", transition:"opacity .7s ease .2s,transform .7s ease .2s" }}
      >
        <div className="relative flex items-center justify-center"
          style={{ width:"clamp(150px,38vw,260px)", height:"clamp(150px,38vw,260px)" }}>
          <div className="absolute inset-0 rounded-full pointer-events-none"
            style={{ border:"1px dashed rgba(124,110,255,.22)", animation:"spin 18s linear infinite" }} />
          <div className="absolute rounded-full pointer-events-none"
            style={{ inset:"12px", border:"1px dashed rgba(124,110,255,.12)", animation:"spin 12s linear infinite reverse" }} />
          <div className="absolute w-2.5 h-2.5 rounded-full bg-[var(--accent)]"
            style={{ top:"4px", left:"50%", transform:"translateX(-50%)", boxShadow:"0 0 10px rgba(124,110,255,.7)" }} />
          <div className="absolute w-2 h-2 rounded-full bg-[var(--accent2)]"
            style={{ bottom:"10px", right:"14px", boxShadow:"0 0 7px rgba(124,110,255,.45)" }} />

          <ProfilePhoto
            theme={currentTheme}
            mounted={mounted}
            className="rounded-full overflow-hidden z-10"
            style={{
              width:"clamp(118px,30vw,210px)",
              height:"clamp(118px,30vw,210px)",
              border:"2px solid rgba(124,110,255,.35)",
              boxShadow:"0 0 0 6px rgba(124,110,255,.07),0 16px 48px rgba(0,0,0,.45)",
              flexShrink: 0,
            }}
          />

          <div className="absolute inset-0 rounded-full pointer-events-none"
            style={{ boxShadow:"inset 0 0 32px rgba(124,110,255,.14)" }} />
          <div className="absolute inset-0 rounded-full pointer-events-none"
            style={{ background:"radial-gradient(circle at 50% 50%,rgba(124,110,255,.13) 0%,transparent 65%)", filter:"blur(16px)" }} />
        </div>
      </div>

      {/* ── Text content ── */}
      <div className="flex-1 w-full relative z-10 flex flex-col justify-center items-center sm:items-start text-center sm:text-left" style={{ minWidth:0 }}>

        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-medium text-[var(--accent2)] mb-5 sm:mb-8 w-fit"
          style={{ background:"rgba(124,110,255,.07)", border:"1px solid rgba(124,110,255,.2)", fontFamily:"'DM Sans',sans-serif", opacity:mounted?1:0, transform:mounted?"translateY(0)":"translateY(10px)", transition:"opacity .5s ease,transform .5s ease" }}>
          <span className="w-2 h-2 rounded-full bg-[#4ade80]" style={{ boxShadow:"0 0 6px #4ade80", animation:"pulse-green 2s infinite" }} />
          Available for work
        </div>

        {/* Headline */}
        <h1 className="font-extrabold tracking-tight mb-4 sm:mb-6"
          style={{ fontFamily:"var(--font-syne),Syne,sans-serif", fontSize:"clamp(2.4rem,10vw,6.5rem)", lineHeight:1.05 }}>
          {["Crafting","Digital","Experiences"].map((w,i) => (
            <span key={w} className="block" style={{ color:i===1?"var(--accent)":"var(--text)", opacity:mounted?1:0, transform:mounted?"translateY(0)":"translateY(20px)", transition:`opacity .5s ease ${i*.08}s,transform .5s ease ${i*.08}s` }}>
              {w}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="leading-relaxed text-[var(--muted)] mb-4 sm:mb-5"
          style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(.875rem,3vw,1.0625rem)", maxWidth:"38rem", opacity:mounted?1:0, transform:mounted?"translateY(0)":"translateY(14px)", transition:"opacity .5s ease .28s,transform .5s ease .28s" }}>
          Frontend Developer &amp; Web Designer based in the Philippines. I build
          interfaces that feel as good as they look.
        </p>

        {/* Typed */}
        <div className="flex items-center justify-center sm:justify-start gap-3 mb-6 sm:mb-10"
          style={{ opacity:mounted?1:0, transform:mounted?"translateY(0)":"translateY(14px)", transition:"opacity .5s ease .36s,transform .5s ease .36s" }}>
          <span className="text-[var(--muted)] uppercase tracking-[.2em] shrink-0"
            style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".7rem" }}>Currently:</span>
          <TypedText
            strings={["Frontend Developer","Web Designer","QA Analyst"]}
            className="font-semibold text-[var(--accent2)]"
            style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"1rem" }}
            typeSpeed={70} backSpeed={45} backDelay={1800}
          />
        </div>

        {/* CTAs */}
        <div className="flex flex-row items-center gap-3 mb-6 sm:mb-10 w-full sm:w-auto"
          style={{ opacity:mounted?1:0, transform:mounted?"translateY(0)":"translateY(14px)", transition:"opacity .5s ease .44s,transform .5s ease .44s" }}>
          <Link href="#portfolio" onClick={e=>navClick(e,"#portfolio")}
            className="group flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_var(--glow)] active:scale-95 whitespace-nowrap"
            style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".9rem", background:"var(--accent)", letterSpacing:".01em" }}>
            View My Work
          </Link>
          <Link href="#contact" onClick={e=>navClick(e,"#contact")}
            className="group flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
            style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".9rem", color:"var(--text)", background:"var(--surface)", border:"1px solid var(--border)", letterSpacing:".01em" }}
            onMouseEnter={e=>(e.currentTarget.style.borderColor="rgba(124,110,255,.35)")}
            onMouseLeave={e=>(e.currentTarget.style.borderColor="var(--border)")}>
            Get In Touch
          </Link>
        </div>

        {/* Social */}
        <div className="flex items-center justify-center sm:justify-start gap-2"
          style={{ opacity:mounted?1:0, transform:mounted?"translateY(0)":"translateY(14px)", transition:"opacity .5s ease .52s,transform .5s ease .52s" }}>
          {socialLinks.map(s => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--muted)] transition-all duration-200 hover:text-[var(--accent)] hover:bg-[rgba(124,110,255,.1)]"
              style={{ border:"1px solid var(--border)" }}>
              <s.Icon size={16} />
            </a>
          ))}
          <div className="hidden lg:flex items-center gap-3 ml-4 text-[var(--muted)]">
            <div className="w-px h-4 bg-[var(--border)]" />
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".62rem", letterSpacing:".2em", textTransform:"uppercase" }}>Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-[var(--muted)] to-transparent" style={{ animation:"scroll-anim 1.6s ease-in-out infinite" }} />
          </div>
        </div>
      </div>

      {/* ── Desktop orbit rings (lg+ only) ── */}
      <div className="hidden lg:flex flex-shrink-0 relative z-10 items-center justify-center"
        style={{ width:"min(52rem,52vw)", height:"min(52rem,52vw)", opacity:mounted?1:0, transform:mounted?"scale(1)":"scale(.96)", transition:"opacity .7s ease .2s,transform .7s ease .2s" }}>

        {/* Ring tracks */}
        {orbitRings.map((ring,ri) => {
          const boosted = boostedRings.has(ri)
          return <div key={`t${ri}`} className="absolute rounded-full pointer-events-none"
            style={{ width:ring.radius*2, height:ring.radius*2, top:"50%", left:"50%", marginLeft:-ring.radius, marginTop:-ring.radius, border:boosted?"1px dashed rgba(124,110,255,.55)":"1px dashed rgba(124,110,255,.12)", boxShadow:boosted?"0 0 30px rgba(124,110,255,.2),inset 0 0 30px rgba(124,110,255,.06)":"none", transition:"border-color .35s,box-shadow .35s" }} />
        })}

        {/* Spinning icon rings */}
        {orbitRings.map((ring,ri) => {
          const boosted = boostedRings.has(ri)
          const d = dur(ri, ring.duration)
          return (
            <div key={`r${ri}`} className="absolute"
              style={{ width:ring.radius*2, height:ring.radius*2, top:"50%", left:"50%", marginLeft:-ring.radius, marginTop:-ring.radius, borderRadius:"50%", animationName:"spin", animationDuration:d, animationTimingFunction:"linear", animationIterationCount:"infinite", animationDirection:ring.direction===-1?"reverse":"normal", willChange:"transform" }}>
              {ring.icons.map(({Icon,label,angle})=>{
                const rad = (angle*Math.PI)/180
                const x = +(ring.radius+Math.cos(rad)*ring.radius-18).toFixed(2)
                const y = +(ring.radius+Math.sin(rad)*ring.radius-18).toFixed(2)
                return (
                  <div key={label} title={label} role="button" aria-label={label} onClick={e=>handleIconClick(ri,e)}
                    className="absolute w-9 h-9 rounded-xl flex items-center justify-center text-[var(--accent2)]"
                    style={{ left:x, top:y, cursor:boosted?"default":"pointer", pointerEvents:"auto", background:isLight?"rgba(255,255,255,.92)":"rgba(18,18,28,.88)", backdropFilter:"blur(12px)", border:boosted?"1px solid rgba(124,110,255,.65)":isLight?"1px solid rgba(124,110,255,.15)":"1px solid rgba(124,110,255,.22)", boxShadow:boosted?"0 0 18px rgba(124,110,255,.5),0 4px 16px rgba(0,0,0,.3)":isLight?"0 4px 20px rgba(0,0,0,.06)":"0 4px 16px rgba(0,0,0,.4)", animationName:"spin", animationDuration:d, animationTimingFunction:"linear", animationIterationCount:"infinite", animationDirection:ring.direction===-1?"normal":"reverse", willChange:"transform" }}>
                    <Icon size={15} />
                    {boosted && <span className="absolute inset-0 rounded-xl animate-ping" style={{ background:"rgba(124,110,255,.2)", animationDuration:".75s", pointerEvents:"none" }} />}
                  </div>
                )
              })}
            </div>
          )
        })}

        {/* Centre photo */}
        <ProfilePhoto
          theme={currentTheme}
          mounted={mounted}
          className="rounded-full overflow-hidden z-10"
          style={{
            width:"min(280px,29vw)",
            height:"min(280px,29vw)",
            border:"2px solid rgba(124,110,255,.3)",
            boxShadow:"0 0 0 6px rgba(124,110,255,.06),0 20px 60px rgba(0,0,0,.5)",
            position:"absolute",
            flexShrink:0,
          }}
        />

        <div className="absolute inset-0 rounded-full pointer-events-none"
          style={{ background:"radial-gradient(circle at 50% 50%,rgba(124,110,255,.1) 0%,transparent 65%)", filter:"blur(20px)" }} />
      </div>
    </section>
  )
}