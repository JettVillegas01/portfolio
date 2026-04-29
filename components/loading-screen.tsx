'use client'

import { useEffect, useState } from 'react'

// ─── Collect every image URL — visible AND hidden (dark/light mode images) ──
function collectImageUrls(): Set<string> {
  const urls = new Set<string>()

  // All <img src="...">
  document.querySelectorAll<HTMLImageElement>('img[src]').forEach((img) => {
    if (img.src) urls.add(img.src)
  })

  // All <source srcset="..."> inside <picture> — covers dark/light mode swaps
  document.querySelectorAll<HTMLSourceElement>('source[srcset]').forEach((el) => {
    el.srcset.split(',').forEach((part) => {
      const url = part.trim().split(/\s+/)[0]
      if (url) urls.add(url)
    })
  })

  // All <source src="...">
  document.querySelectorAll<HTMLSourceElement>('source[src]').forEach((el) => {
    if (el.src) urls.add(el.src)
  })

  // Inline background-image: url(...)
  document.querySelectorAll<HTMLElement>('[style]').forEach((el) => {
    const bg = el.style.backgroundImage
    const matches = bg.match(/url\(["']?([^"')]+)["']?\)/g) ?? []
    matches.forEach((m) => {
      const url = m.replace(/url\(["']?|["']?\)/g, '').trim()
      if (url && !url.startsWith('data:')) urls.add(url)
    })
  })

  return urls
}

// ─── Force-fetch every URL so the browser caches them ───────────────────────
function preloadImages(urls: Set<string>): Promise<void[]> {
  return Promise.all(
    Array.from(urls).map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new Image()
          img.onload = () => resolve()
          img.onerror = () => resolve() // never block on broken images
          img.src = url
        })
    )
  )
}

// ─── Full preload sequence ───────────────────────────────────────────────────
async function preloadAllAssets(): Promise<void> {
  // 1. Wait for initial page load (scripts, stylesheets, default images)
  await new Promise<void>((resolve) => {
    if (document.readyState === 'complete') resolve()
    else window.addEventListener('load', () => resolve(), { once: true })
  })

  // 2. Wait for web fonts so no FOUT after loading screen exits
  await document.fonts.ready

  // 3. Scan ALL image URLs now that the full DOM is hydrated
  const urls = collectImageUrls()

  // 4. Force-load every image — this is what loads hidden dark/light images
  await preloadImages(urls)

  // 5. One animation frame so the browser paints before we reveal the page
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
}

// ────────────────────────────────────────────────────────────────────────────

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    const startTime = Date.now()
    const MIN_SHOW_MS = 1800 // always show for at least this long

    let rafId: number
    let finished = false

    // Animate counter from 0 → 88 while real loading happens in background
    const animateProgress = () => {
      if (finished) return
      const elapsed = Date.now() - startTime
      const eased = 1 - Math.pow(1 - Math.min(elapsed / 1400, 1), 3)
      setProgress(Math.round(eased * 88))
      if (eased < 1) rafId = requestAnimationFrame(animateProgress)
    }
    rafId = requestAnimationFrame(animateProgress)

    // When all assets are loaded, finish the sequence
    preloadAllAssets().then(() => {
      finished = true
      cancelAnimationFrame(rafId)

      const elapsed = Date.now() - startTime
      const wait = Math.max(0, MIN_SHOW_MS - elapsed)

      setTimeout(() => {
        setProgress(100)                      // snap to 100%
        setTimeout(() => {
          setIsExiting(true)                  // start curtain slide
          setTimeout(() => setIsDone(true), 900) // remove from DOM
        }, 320)
      }, wait)
    })

    return () => cancelAnimationFrame(rafId)
  }, [])

  if (isDone) return null

  return (
    <>
      <style>{`
        @keyframes ls-fadein {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ls-scan {
          0%   { top: -1px; }
          100% { top: 100%; }
        }
        @keyframes ls-corner {
          from { width: 0; height: 0; opacity: 0; }
          to   { width: 48px; height: 48px; opacity: 1; }
        }
        @keyframes ls-dots {
          0%, 80%, 100% { opacity: 0.18; }
          40%            { opacity: 1; }
        }
        .ls-curtain {
          transform: translateY(${isExiting ? '-100%' : '0'});
          transition: transform 0.85s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .ls-d1 { animation: ls-dots 1.3s ease-in-out infinite 0.0s; }
        .ls-d2 { animation: ls-dots 1.3s ease-in-out infinite 0.2s; }
        .ls-d3 { animation: ls-dots 1.3s ease-in-out infinite 0.4s; }
      `}</style>

      <div
        className="ls-curtain"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          backgroundColor: '#0b0b0f',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Dot-grid texture */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />

        {/* Ambient glow */}
        <div style={{
          position: 'absolute', width: 420, height: 420, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Scan line */}
        <div style={{
          position: 'absolute', left: 0, right: 0, height: 1, pointerEvents: 'none',
          background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.45), transparent)',
          animation: 'ls-scan 2.6s ease-in-out infinite',
        }} />

        {/* Corner brackets */}
        {[
          { top: 28, left: 28,  borderTop:    '1px solid rgba(255,255,255,0.17)', borderLeft:   '1px solid rgba(255,255,255,0.17)' },
          { top: 28, right: 28, borderTop:    '1px solid rgba(255,255,255,0.17)', borderRight:  '1px solid rgba(255,255,255,0.17)' },
          { bottom: 28, left: 28,  borderBottom: '1px solid rgba(255,255,255,0.17)', borderLeft:   '1px solid rgba(255,255,255,0.17)' },
          { bottom: 28, right: 28, borderBottom: '1px solid rgba(255,255,255,0.17)', borderRight:  '1px solid rgba(255,255,255,0.17)' },
        ].map((s, i) => (
          <div key={i} style={{
            position: 'absolute', width: 48, height: 48, opacity: 0,
            animation: `ls-corner 0.5s ${i * 0.08}s ease forwards`,
            ...s,
          } as React.CSSProperties} />
        ))}

        {/* ── Counter ── */}
        <div style={{
          position: 'relative', zIndex: 1, textAlign: 'center',
          animation: 'ls-fadein 0.5s ease forwards',
        }}>
          <div style={{
            fontSize: 'clamp(88px, 16vw, 150px)',
            fontWeight: 800,
            letterSpacing: '-0.05em',
            lineHeight: 0.9,
            color: '#ffffff',
            fontFamily: "'Geist','Outfit',ui-sans-serif,system-ui,sans-serif",
            userSelect: 'none',
          }}>
            {String(progress).padStart(2, '0')}
            <span style={{ fontSize: '0.32em', fontWeight: 300, opacity: 0.35, letterSpacing: 0 }}>
              %
            </span>
          </div>

          <div style={{
            marginTop: 22,
            fontSize: 11,
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.22)',
            fontFamily: "'Geist Mono','Fira Code',ui-monospace,monospace",
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            Loading assets
            <span className="ls-d1" style={{ display:'inline-block', width:3, height:3, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.6)' }} />
            <span className="ls-d2" style={{ display:'inline-block', width:3, height:3, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.6)' }} />
            <span className="ls-d3" style={{ display:'inline-block', width:3, height:3, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.6)' }} />
          </div>
        </div>

        {/* Rotated side label */}
        <div style={{
          position: 'absolute', right: 24, bottom: '50%',
          transform: 'translateY(50%) rotate(90deg)',
          fontSize: 9, letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.13)',
          fontFamily: "'Geist Mono',ui-monospace,monospace",
          whiteSpace: 'nowrap', userSelect: 'none',
        }}>
          PORTFOLIO — {new Date().getFullYear()}
        </div>

        {/* ── Progress bar ── */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 2, backgroundColor: 'rgba(255,255,255,0.06)',
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #6366f1, #a5b4fc)',
            transition: 'width 0.18s ease',
            boxShadow: '0 0 14px rgba(99,102,241,0.55)',
          }} />
        </div>

        {/* Fraction label */}
        <div style={{
          position: 'absolute', bottom: 12, right: 30,
          fontSize: 10, letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.15)',
          fontFamily: "'Geist Mono',ui-monospace,monospace",
          userSelect: 'none',
        }}>
          {String(progress).padStart(3, '0')} / 100
        </div>
      </div>
    </>
  )
}