"use client"

import { useState, useCallback } from "react"
import { Preloader } from "@/components/preloader"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { TextReveal } from "@/components/text-reveal"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScrollProvider } from "@/components/smooth-scroll"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      <CustomCursor />
      <SmoothScrollProvider>
        <Navigation />
        <main>
          <Hero />
          <Services />
          <TextReveal />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </SmoothScrollProvider>
    </>
  )
}
