import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Preserve native 120Hz momentum scrolling on touch devices (iOS Safari, iPad, Android)
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0))
    if (isTouch) {
      return
    }

    let rafId: number | null = null
    let lenis: Lenis | null = null

    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: any) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      } as any)

      ;(window as any).lenis = lenis

      function raf(time: number) {
        if (lenis) {
          lenis.raf(time)
          rafId = requestAnimationFrame(raf)
        }
      }

      rafId = requestAnimationFrame(raf)
    } catch (e) {
      console.warn('SmoothScroll initialization skipped:', e)
    }

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      if (lenis) {
        try {
          lenis.destroy()
        } catch (_) {}
      }
      delete (window as any).lenis
    }
  }, [])

  return <>{children}</>
}

