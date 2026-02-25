"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "12", label: "Years Experience" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "40+", label: "Design Awards" },
]

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const statItemsRef = useRef<(HTMLDivElement | null)[]>([])
  const parallaxBgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background movement
      gsap.to(parallaxBgRef.current, {
        y: -150,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      })

      // Parallax image movement
      gsap.to(imageRef.current, {
        y: -80,
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })

      // Text reveal
      gsap.fromTo(
        textRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Quote with parallax
      gsap.fromTo(
        quoteRef.current,
        { y: 60, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Stats counter animation
      statItemsRef.current.forEach((item, i) => {
        if (!item) return
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-deep-black py-32"
    >
      {/* Parallax decorative background */}
      <div
        ref={parallaxBgRef}
        className="pointer-events-none absolute -top-20 left-0 right-0 h-[120%]"
      >
        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-gold/[0.02] blur-3xl" />
        <div className="absolute left-0 top-2/3 h-72 w-72 rounded-full bg-gold/[0.03] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        {/* Section header */}
        <div ref={textRef}>
          <span className="text-xs uppercase tracking-[0.4em] text-gold">
            About Us
          </span>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl font-light leading-tight text-cream md:text-6xl lg:text-7xl">
            <span className="text-balance">Where Vision Meets Precision</span>
          </h2>
        </div>

        {/* Parallax image area */}
        <div className="mt-16 flex flex-col gap-16 lg:flex-row lg:gap-20">
          <div className="relative lg:w-1/2">
            <div
              ref={imageRef}
              className="relative overflow-hidden rounded-lg"
            >
              <img
                src="/images/about-parallax.jpg"
                alt="Our creative team collaborating on design projects"
                className="h-[400px] w-full object-cover md:h-[500px] lg:h-[600px]"
              />
              <div className="absolute inset-0 bg-deep-black/20" />
            </div>
            {/* Floating element */}
            <div className="absolute -bottom-8 -right-4 rounded-lg border border-border/30 bg-charcoal/90 p-6 backdrop-blur-sm md:-right-8">
              <span className="block font-serif text-4xl font-light text-gold md:text-5xl">
                12+
              </span>
              <span className="mt-1 block text-xs uppercase tracking-[0.2em] text-cream/40">
                Years of Excellence
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center lg:w-1/2">
            <div ref={quoteRef}>
              <p className="text-lg leading-relaxed text-cream/60 md:text-xl">
                We are a collective of strategists, designers, and innovators
                dedicated to pushing the boundaries of digital design. Every
                project is an opportunity to create something that resonates
                deeply with users.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-cream/60 md:text-xl">
                Our approach blends rigorous research with artistic intuition,
                ensuring every pixel serves a purpose and every interaction
                tells a story.
              </p>
              <div className="mt-10 h-px w-24 bg-gold/40" />
              <blockquote className="mt-8">
                <p className="font-serif text-xl italic text-cream/80 md:text-2xl">
                  {'"Design is not just what it looks like and feels like. Design is how it works."'}
                </p>
                <cite className="mt-4 block text-xs uppercase not-italic tracking-[0.2em] text-gold/60">
                  -- Our Philosophy
                </cite>
              </blockquote>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="mt-32 grid grid-cols-2 gap-8 border-t border-border/30 pt-16 md:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => { statItemsRef.current[i] = el }}
              className="text-center"
            >
              <span className="block font-serif text-4xl font-light text-gold md:text-5xl lg:text-6xl">
                {stat.value}
              </span>
              <span className="mt-3 block text-xs uppercase tracking-[0.2em] text-cream/40">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
