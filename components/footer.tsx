"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const bigTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bigTextRef.current,
        { x: "10%", opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bigTextRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden border-t border-border/20 bg-deep-black"
    >
      {/* Big text */}
      <div ref={bigTextRef} className="overflow-hidden py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="block font-serif text-6xl font-light tracking-tight text-cream/10 transition-colors duration-700 hover:text-gold/30 md:text-8xl lg:text-[10rem]"
          >
            NOIR
          </a>
        </div>
      </div>

      {/* Footer content */}
      <div className="mx-auto max-w-7xl border-t border-border/20 px-6 py-12 md:px-12">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <span className="font-serif text-xl tracking-widest text-cream/70">
              NOIR
            </span>
            <span className="text-xs text-cream/30">
              Premium UI/UX Design Studio
            </span>
          </div>

          <nav className="flex flex-wrap gap-6">
            {["Services", "About", "Projects", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault()
                  document
                    .querySelector(`#${link.toLowerCase()}`)
                    ?.scrollIntoView({ behavior: "smooth" })
                }}
                className="text-xs uppercase tracking-[0.2em] text-cream/30 transition-colors duration-300 hover:text-gold"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 border-t border-border/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-cream/20">
            {"\u00A9"} 2026 NOIR Studio. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-cream/20 transition-colors duration-300 hover:text-gold">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-cream/20 transition-colors duration-300 hover:text-gold">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
