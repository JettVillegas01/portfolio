"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedSectionProps {
  children: React.ReactNode
  id?: string
  className?: string
  style?: React.CSSProperties
  delay?: number
}

export function AnimatedSection({
  children,
  id,
  className = "",
  style,
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      style={style}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  )
}

interface AnimatedItemProps {
  children: React.ReactNode
  className?: string
  index?: number
}

export function AnimatedItem({
  children,
  className = "",
  index = 0,
}: AnimatedItemProps) {
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      className={className}
      variants={itemVariants}
    >
      {children}
    </motion.div>
  )
}
