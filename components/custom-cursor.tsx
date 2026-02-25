"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      })
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out",
      })
    }

    const handleMouseEnterLink = () => {
      gsap.to(cursor, { scale: 0.5, duration: 0.3 })
      gsap.to(follower, { scale: 2, duration: 0.3, borderColor: "#c8a97e" })
    }

    const handleMouseLeaveLink = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 })
      gsap.to(follower, { scale: 1, duration: 0.3, borderColor: "rgba(200,169,126,0.3)" })
    }

    window.addEventListener("mousemove", moveCursor)

    const links = document.querySelectorAll("a, button")
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleMouseEnterLink)
      link.addEventListener("mouseleave", handleMouseLeaveLink)
    })

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleMouseEnterLink)
        link.removeEventListener("mouseleave", handleMouseLeaveLink)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold md:block"
      />
      <div
        ref={followerRef}
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/30 md:block"
      />
    </>
  )
}
