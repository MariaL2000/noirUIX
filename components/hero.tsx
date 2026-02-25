"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const titleLine1Ref = useRef<HTMLSpanElement>(null)
  const titleLine2Ref = useRef<HTMLSpanElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // --- Entrada (Sin cambios en lógica, solo corregido para evitar conflictos) ---
      const entranceTl = gsap.timeline({ delay: 0.3 })

      entranceTl.fromTo(
        [titleLine1Ref.current, titleLine2Ref.current],
        { y: 100, opacity: 0, rotateX: 45 },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0, 
          duration: 1.2, 
          stagger: 0.2, 
          ease: "power4.out" 
        }
      )
      .fromTo(
        [subtitleRef.current, ctaRef.current, marqueeRef.current],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        "-=0.6"
      )

      // --- Parallax Responsivo Unificado ---
      mm.add({
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)"
      }, (context) => {
        const { isDesktop } = context.conditions as any;
        const multiplier = isDesktop ? 1 : 0.4; // Reduce movimiento en móvil para evitar que desaparezcan

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });

        scrollTl
          .to(bgRef.current, { yPercent: 15 * multiplier, scale: 1.05, ease: "none" }, 0)
          .to(titleLine1Ref.current, { y: -120 * multiplier, ease: "none" }, 0)
          .to(titleLine2Ref.current, { y: -80 * multiplier, ease: "none" }, 0)
          .to(subtitleRef.current, { y: -40 * multiplier, ease: "none" }, 0)
          .to(ctaRef.current, { y: -20 * multiplier, ease: "none" }, 0)
          .to(marqueeRef.current, { y: -30 * multiplier, ease: "none" }, 0);
      });

    }, containerRef)

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-deep-black"
    >
      {/* Background original */}
      <div ref={bgRef} className="absolute inset-0 pointer-events-none">
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-black/60 via-deep-black/40 to-deep-black" />
      </div>

      {/* Contenido con tus variables de color originales */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <div className="overflow-hidden pb-2">
          <span
            ref={titleLine1Ref}
            className="block font-serif text-5xl font-light leading-tight tracking-tight text-cream sm:text-7xl md:text-8xl lg:text-9xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            Crafting Digital
          </span>
        </div>
        <div className="overflow-hidden pb-2">
          <span
            ref={titleLine2Ref}
            className="block font-serif text-5xl font-light italic leading-tight tracking-tight text-gold sm:text-7xl md:text-8xl lg:text-9xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            Experiences
          </span>
        </div>

        <p
          ref={subtitleRef}
          className="mt-8 max-w-xl text-[10px] uppercase tracking-[0.3em] text-cream/50 sm:text-sm md:text-base"
        >
          {"UI/UX Design Studio \u2014 Strategy, Design & Innovation"}
        </p>

        <div ref={ctaRef} className="mt-12">
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })
            }}
            className="group relative inline-flex items-center gap-3 border border-gold/30 px-8 py-4 text-[10px] uppercase tracking-[0.3em] text-cream transition-all duration-500 hover:border-gold hover:bg-gold/10 sm:text-xs"
          >
            <span>Explore Our Work</span>
            <svg
              className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Marquee corregido */}
      <div
        ref={marqueeRef}
        className="absolute bottom-0 left-0 right-0 z-10 border-t border-border/30 bg-deep-black/60 py-4 backdrop-blur-md"
      >
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center">
              {[
                "UX Research",
                "UI Design",
                "Brand Identity",
                "Prototyping",
                "Motion Design",
              ].map((text) => (
                <span key={`${i}-${text}`} className="flex items-center">
                  <span className="mx-8 text-[10px] uppercase tracking-[0.4em] text-cream/30 sm:text-xs">
                    {text}
                  </span>
                  <span className="text-gold/40">{"*"}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}