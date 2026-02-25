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
    // 1. Lógica del Contador (Sincronizada con el tiempo de la animación)
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 15) // Un poco más rápido para fluidez

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Animación de salida: Efecto de persiana hacia arriba
          gsap.to(containerRef.current, {
            clipPath: "inset(0 0 100% 0)",
            duration: 1.2,
            ease: "power4.inOut",
            onComplete: onComplete,
          })
        },
      })

      // Entrada del texto "NOIR"
      tl.fromTo(
        textRef.current,
        { y: 60, opacity: 0, skewY: 7 },
        { y: 0, opacity: 1, skewY: 0, duration: 1, ease: "power4.out", delay: 0.2 }
      )
      // Carga de la línea (Sincronizada con el contador visualmente)
      .fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 2, ease: "power2.inOut" },
        "-=0.5"
      )
      // Salida del texto antes de que se abra la persiana
      .to(textRef.current, { 
        y: -40, 
        opacity: 0, 
        duration: 0.6, 
        ease: "power4.in" 
      }, "+=0.2")

    }, containerRef)

    return () => {
      ctx.revert()
      clearInterval(interval)
    }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <div className="flex flex-col items-center px-6 text-center">
        {/* Contenedor del texto para ocultar el overflow durante la animación */}
        <div className="overflow-hidden py-2">
          <span
            ref={textRef}
            className="block font-serif text-4xl font-light tracking-[0.2em] text-foreground sm:text-6xl md:text-7xl"
          >
            NOIR
          </span>
        </div>

        {/* Línea de carga responsiva */}
        <div className="mt-8 h-[1px] w-32 overflow-hidden bg-white/5 sm:w-48">
          <div
            ref={lineRef}
            className="h-full w-full origin-left bg-gold"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* Contador */}
        <span
          ref={counterRef}
          className="mt-6 font-sans text-[10px] tabular-nums tracking-[0.5em] text-gold/50"
        >
          {count.toString().padStart(3, '0')}%
        </span>
      </div>
    </div>
  )
}