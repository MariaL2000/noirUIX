"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

export function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.8,
          ease: "power4.inOut",
        }
      )
      gsap.fromTo(
        linksRef.current.filter(Boolean),
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.3,
        }
      )
    }
  }, [isOpen])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-700 md:px-12 ${
          scrolled
            ? "bg-deep-black/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <a href="#" className="text-cream font-serif text-xl tracking-widest md:text-2xl">
          NOIR
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="group relative text-sm uppercase tracking-[0.2em] text-cream/70 transition-colors duration-300 hover:text-gold"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-[60] flex flex-col items-end gap-1.5 md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block h-px bg-cream transition-all duration-500 ${
              isOpen ? "w-6 translate-y-[3.5px] rotate-45" : "w-6"
            }`}
          />
          <span
            className={`block h-px bg-cream transition-all duration-500 ${
              isOpen ? "w-6 -translate-y-[3.5px] -rotate-45" : "w-4"
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-deep-black"
          style={{ clipPath: "inset(0 0 100% 0)" }}
        >
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              ref={(el) => { linksRef.current[i] = el }}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="block py-4 font-serif text-4xl text-cream/90 transition-colors duration-300 hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  )
}
