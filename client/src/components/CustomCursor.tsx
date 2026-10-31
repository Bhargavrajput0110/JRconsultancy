import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)

  // High-performance motion values
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  // Outer ring needs offset of -16px (width 32/2)
  const ringX = useMotionValue(-100)
  const ringY = useMotionValue(-100)
  const ringXSpring = useSpring(ringX, { damping: 25, stiffness: 400, mass: 0.5 })
  const ringYSpring = useSpring(ringY, { damping: 25, stiffness: 400, mass: 0.5 })

  useEffect(() => {
    // Only enable on desktop pointer devices; disable on touch screens (iOS Safari, Android)
    if (typeof window === 'undefined') return
    const isTouch = 'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0)
    if (isTouch) return
    setIsEnabled(true)

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 4)
      cursorY.set(e.clientY - 4)
      ringX.set(e.clientX - 16)
      ringY.set(e.clientY - 16)
    }

    const handleMouseOver = (e: MouseEvent) => {
      // Safe element detection in Safari (handles TextNode, SVGElement, and null targets)
      const target = (e.target instanceof Element ? e.target : (e.target as Node | null)?.parentElement) as HTMLElement | null
      if (!target || typeof target.closest !== 'function') return

      const isInteractive = Boolean(
        target.tagName?.toLowerCase() === 'a' ||
        target.tagName?.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        (target.classList && target.classList.contains('hover-target'))
      )
      setIsHovered(isInteractive)
    }

    window.addEventListener('mousemove', moveCursor, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY, ringX, ringY])

  if (!isEnabled) return null

  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: 99999
    }}>
      {/* Outer Circle - avoid mixBlendMode which causes WebKit compositor lockups */}
      <motion.div
        className="custom-cursor"
        style={{
          x: ringXSpring,
          y: ringYSpring,
          pointerEvents: 'none',
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? 'rgba(196, 154, 108, 0.15)' : 'transparent',
          border: isHovered ? '1px solid rgba(196, 154, 108, 1)' : '1px solid rgba(196, 154, 108, 0.5)'
        }}
        transition={{ duration: 0.2 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="custom-cursor-dot"
        style={{
          x: cursorX,
          y: cursorY,
          pointerEvents: 'none',
        }}
        animate={{
          scale: isHovered ? 0 : 1
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  )
}
