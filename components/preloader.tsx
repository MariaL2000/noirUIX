"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Counter animation
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 3
      })
    }, 25)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.2,
        onComplete: () => {
          // Exit animation
          gsap.to(containerRef.current, {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.8,
            ease: "power4.inOut",
            onComplete: () => {
              onComplete()
            },
          })
        },
      })

      tl.fromTo(
        textRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      )
        .fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, ease: "power2.inOut" },
          "-=0.2"
        )
        .to(textRef.current, { y: -20, opacity: 0, duration: 0.3, ease: "power2.in" }, "+=0.1")
    }, containerRef)

    return () => {
      ctx.revert()
      clearInterval(interval)
    }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-deep-black"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <div className="flex flex-col items-center">
        <span
          ref={textRef}
          className="font-serif text-3xl font-light tracking-widest text-cream md:text-5xl"
        >
          NOIR
        </span>
        <div className="mt-6 h-px w-48 overflow-hidden">
          <div
            ref={lineRef}
            className="h-full w-full origin-left bg-gold"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
        <span
          ref={counterRef}
          className="mt-4 text-xs tracking-[0.4em] text-cream/30"
        >
          {count}%
        </span>
      </div>
    </div>
  )
}
