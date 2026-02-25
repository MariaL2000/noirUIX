"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )

      gsap.fromTo(
        formRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )

      gsap.fromTo(
        infoRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden bg-deep-black py-32"
    >
      {/* Decorative elements */}
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-gold/[0.02] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        {/* Header */}
        <div ref={headingRef}>
          <span className="text-xs uppercase tracking-[0.4em] text-gold">
            Get in Touch
          </span>
          <h2 className="mt-4 max-w-4xl font-serif text-4xl font-light leading-tight text-cream md:text-6xl lg:text-7xl">
            <span className="text-balance">{"Let's Create Something Extraordinary"}</span>
          </h2>
          <div className="mt-8 h-px w-full bg-border/30" />
        </div>

        <div className="mt-16 flex flex-col gap-16 lg:flex-row lg:gap-24">
          {/* Form */}
          <form ref={formRef} className="flex-1 space-y-8">
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="flex-1">
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs uppercase tracking-[0.2em] text-cream/40"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full border-b border-border/40 bg-transparent py-3 text-cream outline-none transition-colors duration-300 placeholder:text-cream/20 focus:border-gold"
                  placeholder="Your name"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs uppercase tracking-[0.2em] text-cream/40"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border-b border-border/40 bg-transparent py-3 text-cream outline-none transition-colors duration-300 placeholder:text-cream/20 focus:border-gold"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="company"
                className="mb-2 block text-xs uppercase tracking-[0.2em] text-cream/40"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                className="w-full border-b border-border/40 bg-transparent py-3 text-cream outline-none transition-colors duration-300 placeholder:text-cream/20 focus:border-gold"
                placeholder="Your company"
              />
            </div>

            <div>
              <label
                htmlFor="project"
                className="mb-2 block text-xs uppercase tracking-[0.2em] text-cream/40"
              >
                Tell us about your project
              </label>
              <textarea
                id="project"
                rows={4}
                className="w-full resize-none border-b border-border/40 bg-transparent py-3 text-cream outline-none transition-colors duration-300 placeholder:text-cream/20 focus:border-gold"
                placeholder="Describe your project, goals, and timeline..."
              />
            </div>

            <button
              type="submit"
              className="group relative inline-flex items-center gap-3 overflow-hidden border border-gold/40 bg-transparent px-10 py-4 text-xs uppercase tracking-[0.3em] text-cream transition-all duration-700 hover:border-gold hover:text-deep-black"
            >
              <span className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-700 group-hover:translate-x-0" />
              <span className="relative z-10">Send Message</span>
              <svg
                className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </form>

          {/* Contact Info */}
          <div ref={infoRef} className="lg:w-80">
            <div className="space-y-10">
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-gold/60">
                  Email
                </h4>
                <a
                  href="mailto:hello@noirstudio.com"
                  className="mt-2 block text-lg text-cream/70 transition-colors duration-300 hover:text-gold"
                >
                  hello@noirstudio.com
                </a>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-gold/60">
                  Phone
                </h4>
                <a
                  href="tel:+15551234567"
                  className="mt-2 block text-lg text-cream/70 transition-colors duration-300 hover:text-gold"
                >
                  +1 (555) 123-4567
                </a>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-gold/60">
                  Location
                </h4>
                <p className="mt-2 text-lg text-cream/70">
                  San Francisco, CA
                </p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-gold/60">
                  Follow Us
                </h4>
                <div className="mt-3 flex gap-6">
                  {["Dribbble", "Behance", "LinkedIn", "X"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="text-sm text-cream/40 transition-colors duration-300 hover:text-gold"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
