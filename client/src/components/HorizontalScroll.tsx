import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HorizontalScrollProps {
  children: React.ReactNode;
}

export default function HorizontalScroll({ children }: HorizontalScrollProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );
  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesArray = React.Children.toArray(children);
  const totalSlides = slidesArray.length;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMobileScroll = () => {
    if (!mobileTrackRef.current) return;
    const el = mobileTrackRef.current;
    const scrollLeft = el.scrollLeft;
    const firstChild = el.firstElementChild as HTMLElement | null;
    const cardWidth = firstChild ? firstChild.offsetWidth : (window.innerWidth * 0.86);
    const gap = 16;
    const newIdx = Math.round(scrollLeft / (cardWidth + gap));
    setCurrentSlide(Math.min(Math.max(0, newIdx), totalSlides - 1));
  };

  const scrollToSlide = (index: number) => {
    if (!mobileTrackRef.current) return;
    const items = mobileTrackRef.current.children;
    if (items[index]) {
      (items[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
      setCurrentSlide(index);
    }
  };

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Maps the scroll progress (0 to 1) to a horizontal translation
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

  if (isMobile) {
    return (
      <section className="portfolio-scroll-container">
        <div className="portfolio-mobile-wrapper">
          <div 
            ref={mobileTrackRef} 
            onScroll={handleMobileScroll}
            className="portfolio-scroll-track"
          >
            {children}
          </div>

          {/* Interactive Mobile Slide Navigation Controls */}
          <div className="portfolio-mobile-controls">
            <div className="portfolio-mobile-counter">
              <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>0{currentSlide + 1}</span>
              <span style={{ opacity: 0.4, margin: '0 4px' }}>/</span>
              <span style={{ opacity: 0.6 }}>0{totalSlides}</span>
            </div>

            <div className="portfolio-mobile-dots">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToSlide(idx)}
                  className={`portfolio-dot ${idx === currentSlide ? 'active' : ''}`}
                  aria-label={`View project ${idx + 1}`}
                />
              ))}
            </div>

            <div className="portfolio-mobile-arrows">
              <button
                type="button"
                onClick={() => scrollToSlide(Math.max(0, currentSlide - 1))}
                disabled={currentSlide === 0}
                className="portfolio-nav-btn"
                aria-label="Previous project"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollToSlide(Math.min(totalSlides - 1, currentSlide + 1))}
                disabled={currentSlide === totalSlides - 1}
                className="portfolio-nav-btn"
                aria-label="Next project"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={targetRef} className="portfolio-scroll-container" style={{ position: 'relative', height: '400vh', background: 'var(--color-primary-dark)' }}>
      <div className="portfolio-scroll-sticky" style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <motion.div className="portfolio-scroll-track" style={{ x, display: 'flex', gap: '3rem', padding: '0 4rem' }}>
          {children}
        </motion.div>
      </div>
    </section>
  );
}
