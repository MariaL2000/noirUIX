"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const paragraphs = [
  {
    text: "We believe great design is invisible. It should feel effortless, intuitive, and deeply human.",
  },
  {
    text: "Our process begins with understanding -- understanding your users, your market, and the story you want to tell.",
  },
  {
    text: "We merge strategic thinking with creative vision to build products that don't just look beautiful, but solve real problems.",
  },
  {
    text: "From first concept to final interaction, every decision is intentional. Every pixel has purpose.",
  },
]

const values = [
  {
    number: "01",
    title: "Human-Centered",
    description:
      "Every design decision starts and ends with the people who will use it. Empathy drives everything we create.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="h-7 w-7 text-gold">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Detail Obsessed",
    description:
      "We sweat the small stuff because the small stuff becomes the big stuff. Precision in every pixel.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="h-7 w-7 text-gold">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Future Forward",
    description:
      "We design for today while anticipating the needs of tomorrow. Innovation that scales.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="h-7 w-7 text-gold">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
]

export function TextReveal() {
  const sectionRef = useRef<HTMLElement>(null)
  const wordsContainerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  // Sticky values refs
  const valuesWrapperRef = useRef<HTMLDivElement>(null)
  const valuesPinRef = useRef<HTMLDivElement>(null)
  const valuesTitleRef = useRef<HTMLDivElement>(null)
  const valueCardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [activeValue, setActiveValue] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Title fade in
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Animate the line
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      // Word-by-word reveal for each paragraph
      const wordContainers =
        wordsContainerRef.current?.querySelectorAll("[data-paragraph]")
      wordContainers?.forEach((container) => {
        const words = container.querySelectorAll("[data-word]")
        gsap.fromTo(
          words,
          { opacity: 0.08 },
          {
            opacity: 1,
            stagger: 0.04,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
              end: "top 20%",
              scrub: 1,
            },
          }
        )
      })

      // ===== STICKY VALUES SECTION =====
      const valuesPin = valuesPinRef.current
      const valuesWrapper = valuesWrapperRef.current
      if (!valuesPin || !valuesWrapper) return

      const totalValues = values.length
      const scrollPerValue = window.innerHeight * 1.4
      const totalValuesScroll = scrollPerValue * totalValues

      // Values title entry
      if (valuesTitleRef.current) {
        gsap.fromTo(
          valuesTitleRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: valuesTitleRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      // Main pinned timeline for values
      const valuesTl = gsap.timeline({
        scrollTrigger: {
          trigger: valuesPin,
          start: "top top",
          end: () => `+=${totalValuesScroll}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              Math.floor(self.progress * totalValues),
              totalValues - 1
            )
            setActiveValue(idx)
          },
        },
      })

      // Animate each value card: enter, hold, then exit
      valueCardsRef.current.forEach((card, i) => {
        if (!card) return
        const icon = card.querySelector(".value-icon") as HTMLElement
        const content = card.querySelector(".value-content") as HTMLElement

        if (i === 0) {
          // First card enters
          valuesTl.fromTo(
            card,
            { yPercent: 60, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
            0
          )
          if (icon) {
            valuesTl.fromTo(
              icon,
              { scale: 0.6, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.4)" },
              0.3
            )
          }
          if (content) {
            valuesTl.fromTo(
              content,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
              0.4
            )
          }
          // Hold
          valuesTl.to({}, { duration: 1 })
        } else {
          const prevCard = valueCardsRef.current[i - 1]
          const label = `val${i}`

          // Previous card exits up
          valuesTl.to(
            prevCard,
            {
              yPercent: -30,
              opacity: 0,
              scale: 0.94,
              filter: "blur(4px)",
              duration: 1,
              ease: "power2.in",
            },
            label
          )

          // New card enters from below
          valuesTl.fromTo(
            card,
            { yPercent: 60, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
            label
          )
          if (icon) {
            valuesTl.fromTo(
              icon,
              { scale: 0.6, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.4)" },
              `${label}+=0.3`
            )
          }
          if (content) {
            valuesTl.fromTo(
              content,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
              `${label}+=0.4`
            )
          }
          // Hold
          valuesTl.to({}, { duration: 1 })
        }
      })

      valuesTl.to({}, { duration: 0.3 })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative bg-deep-black"
    >
      {/* Decorative glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.015] blur-3xl" />

      {/* ====== WORD REVEAL SECTION ====== */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 md:px-12 md:py-44">
        {/* Section label */}
        <div ref={titleRef} className="mb-20 md:mb-28">
          <span className="text-xs uppercase tracking-[0.4em] text-gold">
            Our Philosophy
          </span>
          <h2 className="mt-4 font-serif text-3xl font-light leading-tight text-cream md:text-5xl lg:text-6xl">
            <span className="text-balance">What Drives Us</span>
          </h2>
          <div
            ref={lineRef}
            className="mt-8 h-px w-full origin-left bg-border/30"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* Word-by-word reveal paragraphs */}
        <div ref={wordsContainerRef} className="space-y-16 md:space-y-24">
          {paragraphs.map((p, pIdx) => (
            <div key={pIdx} data-paragraph className="mx-auto max-w-4xl">
              <p className="flex flex-wrap font-serif text-2xl font-light leading-relaxed text-cream md:text-4xl md:leading-relaxed lg:text-5xl lg:leading-snug">
                {p.text.split(" ").map((word, wIdx) => (
                  <span
                    key={wIdx}
                    data-word
                    className="mr-[0.3em] inline-block"
                    style={{ opacity: 0.08 }}
                  >
                    {word}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ====== STICKY VALUES (Why Choose Us) ====== */}
      <div ref={valuesWrapperRef}>
        {/* Values title -- scrolls normally before pin */}
        <div
          ref={valuesTitleRef}
          className="mx-auto max-w-5xl px-6 pb-16 md:px-12"
        >
          <div className="h-px w-full bg-border/20" />
          <div className="flex flex-col items-start gap-4 pt-12 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.4em] text-gold">
                Why Choose Us
              </span>
              <h3 className="mt-4 font-serif text-3xl font-light text-cream md:text-5xl">
                Our Core Values
              </h3>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-cream/40">
              Three principles that guide every project we deliver.
            </p>
          </div>
        </div>

        {/* Pinned values container */}
        <div
          ref={valuesPinRef}
          className="relative h-screen w-full overflow-hidden"
        >
          {/* Step indicators on the side */}
          <div className="absolute left-6 top-1/2 z-30 flex -translate-y-1/2 flex-col items-center gap-3 md:left-12">
            {values.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-500 ${
                  i === activeValue
                    ? "h-8 w-1 bg-gold"
                    : i < activeValue
                      ? "h-3 w-1 bg-gold/30"
                      : "h-3 w-1 bg-cream/10"
                }`}
              />
            ))}
          </div>

          {/* Card stack */}
          <div className="flex h-full w-full items-center justify-center px-12 md:px-20 lg:px-28">
            {values.map((value, i) => (
              <div
                key={value.number}
                ref={(el) => {
                  valueCardsRef.current[i] = el
                }}
                className="absolute inset-x-12 md:inset-x-20 lg:inset-x-28"
                style={{ opacity: i === 0 ? 1 : 0, zIndex: i + 1 }}
              >
                <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                  {/* Icon */}
                  <div className="value-icon mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-gold/10 bg-gold/[0.04]">
                    {value.icon}
                  </div>

                  {/* Content */}
                  <div className="value-content">
                    <span className="text-[11px] tabular-nums tracking-[0.4em] text-gold/40">
                      {value.number}
                    </span>
                    <h4 className="mt-4 font-serif text-4xl font-light text-cream md:text-6xl lg:text-7xl">
                      {value.title}
                    </h4>
                    <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-cream/45 md:text-lg">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom scroll hint */}
          <div className="pointer-events-none absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-cream/15">
            <span>Keep scrolling</span>
            <svg
              className="h-3 w-3 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
