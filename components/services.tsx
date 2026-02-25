"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    number: "01",
    title: "UX Research",
    description:
      "Deep user research and analysis to uncover insights that drive meaningful design decisions. We transform data into empathy-driven strategies.",
    image: "/images/service-ux-research.jpg",
    tags: ["User Interviews", "Usability Testing", "Analytics"],
  },
  {
    number: "02",
    title: "UI Design",
    description:
      "Pixel-perfect interfaces that merge aesthetics with functionality. Every element is crafted to create intuitive, visually stunning experiences.",
    image: "/images/service-ui-design.jpg",
    tags: ["Visual Design", "Design Systems", "Responsive"],
  },
  {
    number: "03",
    title: "Brand Identity",
    description:
      "Strategic brand development that communicates your unique story. From logo design to complete visual language systems.",
    image: "/images/service-branding.jpg",
    tags: ["Logo Design", "Brand Strategy", "Guidelines"],
  },
  {
    number: "04",
    title: "Prototyping",
    description:
      "Interactive prototypes that bring concepts to life before development. Rapid iteration to validate ideas and refine user flows.",
    image: "/images/service-prototyping.jpg",
    tags: ["Interactive Prototypes", "User Flows", "Wireframes"],
  },
  {
    number: "05",
    title: "Motion Design",
    description:
      "Fluid animations and micro-interactions that elevate the user experience. Motion that guides, delights, and creates lasting impressions.",
    image: "/images/service-motion.jpg",
    tags: ["Micro-interactions", "Animation", "Transitions"],
  },
]

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinContainerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const progressBarRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const pinContainer = pinContainerRef.current
    if (!section || !pinContainer) return

    const ctx = gsap.context(() => {
      // Header animate in
      gsap.fromTo(
        headerRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      )

      const totalCards = services.length

      // Main pinned timeline -- each card gets 150vh of scroll distance for smoother pace
      const scrollPerCard = window.innerHeight * 1.5
      const totalScroll = scrollPerCard * totalCards

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainer,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Update progress bar
            if (progressBarRef.current) {
              gsap.set(progressBarRef.current, {
                scaleX: self.progress,
              })
            }
            // Calculate which card is active
            const idx = Math.min(
              Math.floor(self.progress * totalCards),
              totalCards - 1
            )
            setActiveIndex(idx)
          },
        },
      })

      // Timeline: for each card transition, the new card enters while the old shrinks
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        const imgEl = card.querySelector(".service-card-img") as HTMLElement
        const contentEl = card.querySelector(
          ".service-card-content"
        ) as HTMLElement

        if (i === 0) {
          // First card enters
          tl.fromTo(
            card,
            { yPercent: 80, opacity: 0, scale: 0.9 },
            {
              yPercent: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power3.out",
            },
            0
          )
          if (imgEl) {
            tl.fromTo(
              imgEl,
              { scale: 1.2 },
              { scale: 1, duration: 1, ease: "power3.out" },
              0
            )
          }
          if (contentEl) {
            tl.fromTo(
              contentEl,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
              0.3
            )
          }
          // Hold this card for a beat so user can read it
          tl.to({}, { duration: 0.8 })
        } else {
          const prevCard = cardsRef.current[i - 1]
          const label = `card${i}`

          // Previous card: scale down, push back, blur
          tl.to(
            prevCard,
            {
              scale: 0.92 - i * 0.01,
              yPercent: -2,
              opacity: 0.15,
              filter: "blur(4px)",
              duration: 1.2,
              ease: "power2.inOut",
            },
            label
          )

          // New card slides up
          tl.fromTo(
            card,
            { yPercent: 100, opacity: 0, scale: 0.95 },
            {
              yPercent: 0,
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
            },
            label
          )

          if (imgEl) {
            tl.fromTo(
              imgEl,
              { scale: 1.15 },
              { scale: 1, duration: 1.2, ease: "power3.out" },
              label
            )
          }
          if (contentEl) {
            tl.fromTo(
              contentEl,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
              `${label}+=0.4`
            )
          }

          // Hold each card
          tl.to({}, { duration: 0.8 })
        }
      })

      // Small hold at end
      tl.to({}, { duration: 0.3 })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="relative bg-deep-black">
      {/* Section Header - scrolls normally before pin starts */}
      <div ref={headerRef} className="mx-auto max-w-7xl px-6 pb-20 pt-32 md:px-12">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-gold">
              What We Do
            </span>
            <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-cream md:text-6xl lg:text-7xl">
              <span className="text-balance">Our Services</span>
            </h2>
          </div>
          <p 

  className="max-w-xl text-lg font-light leading-relaxed tracking-wide text-cream/40 sm:text-xl md:max-w-2xl md:text-2xl lg:text-3xl lg:leading-snug"
>
  We offer comprehensive <span className="text-cream/70 italic">design solutions</span> that transform your vision into impactful digital experiences.
</p>
        </div>
        <div className="mt-8 h-px w-full bg-border/30" />
      </div>

      {/* Pinned viewport container */}
      <div
        ref={pinContainerRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* Top bar: progress + counter */}
        <div className="absolute left-0 right-0 top-0 z-30 flex items-center gap-4 px-6 pt-5 md:px-12">
          <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-cream/[0.06]">
            <div
              ref={progressBarRef}
              className="h-full origin-left rounded-full bg-gold"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          <span className="min-w-[48px] text-right text-xs tabular-nums tracking-[0.2em] text-cream/40">
            {String(activeIndex + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
          </span>
        </div>

        {/* Card stack */}
        <div className="relative flex h-full w-full items-center justify-center px-4 md:px-10 lg:px-16">
          {services.map((service, i) => (
            <div
              key={service.number}
              ref={(el) => {
                cardsRef.current[i] = el
              }}
              className="absolute inset-x-4 top-14 bottom-4 md:inset-x-10 md:top-16 md:bottom-6 lg:inset-x-16"
              style={{ opacity: i === 0 ? 1 : 0, zIndex: i + 1 }}
            >
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-cream/[0.06] bg-[#0d0d0d] md:flex-row">
                {/* Image half */}
                <div className="relative h-44 w-full overflow-hidden md:h-full md:w-[48%]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="service-card-img h-full w-full object-cover will-change-transform"
                  />
                  {/* Gradient overlay on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#0d0d0d]" />
                  {/* Large number watermark */}
                  <span className="absolute bottom-4 left-6 font-serif text-[6rem] font-light leading-none text-cream/[0.04] md:bottom-8 md:left-8 md:text-[10rem]">
                    {service.number}
                  </span>
                </div>

                {/* Content half */}
                <div className="service-card-content flex flex-1 flex-col justify-center p-6 md:p-10 lg:p-14">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-gold/50">
                    {"Service "}{service.number}
                  </span>
                  <h3 className="mt-3 font-serif text-3xl font-light text-cream md:mt-4 md:text-5xl lg:text-6xl">
                    {service.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-cream/45 md:mt-6 md:text-base md:leading-relaxed">
                    {service.description}
                  </p>
                  {/* Tags */}
                  <div className="mt-5 flex flex-wrap gap-2 md:mt-8">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-cream/[0.08] bg-cream/[0.03] px-4 py-1.5 text-[10px] uppercase tracking-wider text-cream/35 transition-colors duration-300 group-hover:border-gold/20 group-hover:text-gold/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 md:mt-10">
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault()
                        document
                          .querySelector("#contact")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }}
                      className="group/link inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold/60 transition-colors duration-300 hover:text-gold"
                    >
                      <span>Learn More</span>
                      <svg
                        className="h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom scroll hint */}
        <div className="pointer-events-none absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-cream/15 md:bottom-5">
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
    </section>
  )
}
