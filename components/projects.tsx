"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "Lumina Finance",
    category: "Fintech App",
    year: "2025",
    image: "/images/project-1.jpg",
    description: "A premium banking experience redesigned for the modern investor.",
  },
  {
    title: "Vesper Commerce",
    category: "E-Commerce",
    year: "2025",
    image: "/images/project-2.jpg",
    description: "Luxury fashion marketplace with immersive product storytelling.",
  },
  {
    title: "Atlas Analytics",
    category: "SaaS Dashboard",
    year: "2024",
    image: "/images/project-3.jpg",
    description: "Data visualization platform with real-time intelligence insights.",
  },
  {
    title: "Zenith Health",
    category: "Health & Wellness",
    year: "2024",
    image: "/images/project-4.jpg",
    description: "Holistic wellness app connecting mind, body, and data.",
  },
  {
    title: "Meridian Estates",
    category: "Real Estate",
    year: "2024",
    image: "/images/project-5.jpg",
    description: "Premium property platform with immersive virtual tours.",
  },
]

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const pillRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    const pill = pillRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth
      }

      // Pin y Scroll Horizontal
      const horizTween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress * (projects.length - 1)
            setActiveIndex(Math.round(progress))
          },
          // ARREGLO: El pill solo aparece cuando la sección está activa
          onEnter: () => gsap.to(pill, { opacity: 1, y: 0, duration: 0.4 }),
          onLeave: () => gsap.to(pill, { opacity: 0, y: 20, duration: 0.4 }),
          onEnterBack: () => gsap.to(pill, { opacity: 1, y: 0, duration: 0.4 }),
          onLeaveBack: () => gsap.to(pill, { opacity: 0, y: 20, duration: 0.4 }),
        },
      })

      // Parallax de imágenes
      cardsRef.current.forEach((card) => {
        if (!card) return
        const img = card.querySelector(".project-img")
        if (img) {
          gsap.fromTo(img, { xPercent: -10 }, {
            xPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizTween,
              start: "left right",
              end: "right left",
              scrub: true,
            }
          })
        }
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-[#0a0a0a] overflow-hidden">
      
      <div 
        ref={headerRef} 
        className="absolute top-8 left-6 md:top-16 md:left-12 z-30 pointer-events-none"
      >
        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-orange-400">Selected Work</span>
        <h2 className="mt-1 md:mt-2 font-serif text-3xl md:text-7xl text-white">Works.</h2>
      </div>

      <div 
        ref={pillRef} 
        className="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-50 opacity-0 pointer-events-none"
      >
        <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-black/60 px-5 py-2.5 md:px-6 md:py-3 backdrop-blur-2xl">
          {projects.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-500 ${
                i === activeIndex ? "w-6 md:w-8 bg-orange-400" : "w-1.5 bg-white/20"
              }`} 
            />
          ))}
          <span className="ml-2 text-[10px] tabular-nums text-white/40">{activeIndex + 1}/{projects.length}</span>
        </div>
      </div>

      <div className="relative h-screen w-full flex items-center pt-12 md:pt-0">
        
        <div 
          ref={trackRef} 
          className="flex flex-nowrap items-center gap-8 md:gap-12 px-[10vw] will-change-transform"
          style={{ width: "fit-content" }}
        >
          {projects.map((project, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el }}
              className="group relative h-[55vh] w-[80vw] md:h-[65vh] md:w-[60vw] lg:w-[45vw] flex-shrink-0 overflow-hidden rounded-[24px] md:rounded-[30px]"
            >
              <img
                src={project.image}
                alt={project.title}
                className="project-img absolute inset-0 h-full w-full object-cover scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-orange-400">{project.category}</span>
                <h3 className="mt-1 md:mt-2 font-serif text-2xl md:text-5xl text-white">{project.title}</h3>
                <p className="mt-2 md:mt-4 max-w-sm text-xs md:text-sm text-white/50 line-clamp-2 md:line-clamp-none">{project.description}</p>
              </div>
            </div>
          ))}

          <div className="w-[50vw] md:w-[40vw] flex-shrink-0 flex flex-col items-center justify-center">
            <h3 className="text-xl md:text-2xl font-serif italic text-white/20 text-center">Ready to start?</h3>
            <button className="mt-4 md:mt-6 rounded-full border border-orange-400/50 px-6 py-2 md:px-8 md:py-3 text-[9px] md:text-[10px] uppercase tracking-widest text-orange-400 hover:bg-orange-400 hover:text-black transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}