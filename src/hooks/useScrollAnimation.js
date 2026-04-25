import { useEffect } from 'react'

export function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated')
          }
        })
      },
      { threshold: 0.12 }
    )

    const elements = document.querySelectorAll('[data-animate]')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}

export function useParallax() {
  useEffect(() => {
    // Disable parallax on mobile viewports — causes jank on touch scroll
    // and shifts hero content unexpectedly on small screens
    if (window.matchMedia('(max-width: 767px)').matches) return
    // Also respect reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const hero = document.querySelector('.hero-content')
    if (!hero) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      hero.style.transform = `translateY(${scrollY * 0.3}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      // Reset transform on cleanup so hero is not left in translated state
      const el = document.querySelector('.hero-content')
      if (el) el.style.transform = ''
    }
  }, [])
}
