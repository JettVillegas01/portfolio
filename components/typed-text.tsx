"use client"

import { useState, useEffect } from "react"

interface TypedTextProps {
  strings: string[]
  typeSpeed?: number
  backSpeed?: number
  backDelay?: number
  loop?: boolean
  className?: string
  style?: React.CSSProperties
}

export function TypedText({
  strings,
  typeSpeed = 70,
  backSpeed = 50,
  backDelay = 1800,
  loop = true,
  className = "",
  style,
}: TypedTextProps) {
  const [text, setText] = useState("")
  const [stringIndex, setStringIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentString = strings[stringIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (text.length < currentString.length) {
            setText(currentString.slice(0, text.length + 1))
          } else {
            // Finished typing, wait then start deleting
            setTimeout(() => setIsDeleting(true), backDelay)
          }
        } else {
          // Deleting
          if (text.length > 0) {
            setText(currentString.slice(0, text.length - 1))
          } else {
            setIsDeleting(false)
            if (loop || stringIndex < strings.length - 1) {
              setStringIndex((prev) => (prev + 1) % strings.length)
            }
          }
        }
      },
      isDeleting ? backSpeed : typeSpeed
    )

    return () => clearTimeout(timeout)
  }, [text, stringIndex, isDeleting, strings, typeSpeed, backSpeed, backDelay, loop])

  return (
    <span className={className} style={style}>
      {text}
      <span className="animate-pulse">|</span>
    </span>
  )
}