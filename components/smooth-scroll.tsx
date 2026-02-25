"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Force scroll to top on mount
    window.scrollTo(0, 0)

    // Staggered refreshes to let layout + images settle
    const timers = [
      setTimeout(() => ScrollTrigger.refresh(true), 200),
      setTimeout(() => ScrollTrigger.refresh(true), 800),
      setTimeout(() => ScrollTrigger.refresh(true), 2000),
      setTimeout(() => ScrollTrigger.refresh(true), 4000),
    ]

    // Also refresh after all images load
    const imgs = document.querySelectorAll("img")
    let loaded = 0
    const total = imgs.length
    const onLoad = () => {
      loaded++
      if (loaded >= total) {
        setTimeout(() => ScrollTrigger.refresh(true), 100)
      }
    }
    imgs.forEach((img) => {
      if (img.complete) {
        onLoad()
      } else {
        img.addEventListener("load", onLoad, { once: true })
      }
    })

    const handleResize = () => {
      ScrollTrigger.refresh(true)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      timers.forEach(clearTimeout)
      ScrollTrigger.killAll()
    }
  }, [])

  return <>{children}</>
}
