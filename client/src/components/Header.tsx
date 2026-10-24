import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

interface HeaderProps {
  isFooterInView?: boolean
}

export default function Header({ isFooterInView = false }: HeaderProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const location = useLocation()
  const currentPath = location.pathname

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Process', path: '/process' },
    { name: 'Transformations', path: '/portfolio' },
    { name: 'FAQ', path: '/faq' },
  ]

  return (
    <>
      {/* ── Top Contact Info Bar ── */}
      <div className="top-info-bar">
        <div className="top-info-bar-inner">
          <div className="top-info-contacts">
            <a href="tel:+919909558212" className="top-info-link">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 6.29 6.29l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +91 99095 58212
            </a>
            <a href="mailto:jrajgor@jrconsulting.in" className="top-info-link">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              jrajgor@jrconsulting.in
            </a>
            <span className="top-info-sep">|</span>
            <span className="top-info-link top-info-location">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Vadodara, India (Serving Pan-India)
            </span>
          </div>
          <a href="https://wa.me/919909558212?text=Hi%20Jigar,%20I'd%20like%20to%20book%20a%20free%20consultation%20call%20for%20my%20restaurant%20project." target="_blank" rel="noreferrer" className="top-info-cta">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
            Book a Free Consultation
          </a>
        </div>
      </div>

      {/* ── Floating Action Buttons (Bottom Left) ── */}
      <motion.div
        className="fab-container"
        animate={{ 
          opacity: isFooterInView ? 0 : 1, 
          y: isFooterInView ? 50 : 0,
          pointerEvents: isFooterInView ? 'none' : 'auto'
        }}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="fab-btn fab-instagram" aria-label="Follow on Instagram">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
        <a href="https://wa.me/919909558212" target="_blank" rel="noreferrer" className="fab-btn fab-whatsapp" aria-label="Chat on WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
        </a>
      </motion.div>

      {/* ── Top-Left Brand Logo (Desktop) ── */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.05 }}
        className="nav-brand-desktop"
      >
        <Link to="/" className="nav-logo hover-target" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            height: '58px',
            width: '58px',
            background: '#ffffff',
            borderRadius: '16px',
            padding: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 25px rgba(0,0,0,0.4), 0 0 20px rgba(196, 154, 108, 0.35)',
            border: '2px solid rgba(196, 154, 108, 0.75)',
            overflow: 'hidden',
            flexShrink: 0
          }}>
            <img 
              src="/jr-logo.jpg" 
              alt="JR Consulting Logo" 
              style={{ 
                height: '100%', 
                width: '100%', 
                objectFit: 'contain', 
                transform: 'scale(1.22)',
                transformOrigin: 'center'
              }} 
            />
          </div>
          <div className="nav-brand-text" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.12rem', letterSpacing: '0.8px', color: '#fff', lineHeight: 1.15 }}>JR CONSULTING</span>
            <span style={{ fontSize: '0.72rem', letterSpacing: '1.6px', textTransform: 'uppercase', color: 'var(--color-accent)', fontWeight: 600, marginTop: '2px' }}>Restaurant Set-up</span>
          </div>
        </Link>
      </motion.div>

      {/* ── iOS Style Floating Island Nav ── */}
      <motion.nav 
        initial={{ y: -100 }} 
        animate={{ y: 0 }} 
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        className="nav-ios"
      >
        <div className="nav-ios-container hover-target">
          <Link to="/" className="nav-logo hover-target nav-logo-mobile" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              height: '44px',
              width: '44px',
              background: '#ffffff',
              borderRadius: '12px',
              padding: '3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 20px rgba(0,0,0,0.35)',
              border: '2px solid rgba(196, 154, 108, 0.65)',
              overflow: 'hidden',
              flexShrink: 0
            }}>
              <img src="/jr-logo.jpg" alt="JR Consulting Logo" style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
            </div>
            <div className="nav-brand-text" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.8px', color: '#fff', lineHeight: 1.15 }}>JR CONSULTING</span>
              <span style={{ fontSize: '0.65rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-accent)', fontWeight: 600, marginTop: '2px' }}>Restaurant Set-up</span>
            </div>
          </Link>
          
          <div className="nav-ios-links" style={{ alignItems: 'center' }}>
            {navLinks.map((link) => {
              const isActive = currentPath === link.path
              return (
                <Link 
                  key={link.path} 
                  to={link.path}
                  style={{
                    color: isActive ? 'var(--color-accent)' : undefined,
                    fontWeight: isActive ? 600 : undefined,
                    position: 'relative'
                  }}
                >
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="activeNavIndicator"
                      style={{
                        position: 'absolute',
                        bottom: '-6px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: 'var(--color-accent)'
                      }}
                    />
                  )}
                </Link>
              )
            })}
            <Link to="/dashboard" style={{ color: 'var(--color-accent)', fontWeight: 500, fontSize: '0.9rem' }}>CRM</Link>
            <Link to="/start" style={{ 
              background: 'var(--color-accent)', 
              color: 'var(--color-primary-dark)', 
              padding: '0.6rem 1.4rem', 
              borderRadius: '30px', 
              fontWeight: 600,
              marginLeft: '0.8rem',
              fontSize: '0.92rem',
              boxShadow: '0 4px 15px rgba(196, 154, 108, 0.3)'
            }}>
              Start Project
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button 
            className="mobile-nav-toggle"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label="Toggle navigation menu"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-accent)',
              fontSize: '1.6rem',
              cursor: 'pointer',
              padding: '4px 8px'
            }}
          >
            {mobileNavOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Navigation Dropdown Sheet */}
        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              className="mobile-nav-drawer"
            >
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  onClick={() => setMobileNavOpen(false)}
                  style={{ color: currentPath === link.path ? 'var(--color-accent)' : undefined }}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/dashboard" onClick={() => setMobileNavOpen(false)} style={{ color: 'var(--color-accent)', fontWeight: 600 }}>JR CRM Portal →</Link>
              <Link to="/start" onClick={() => setMobileNavOpen(false)} style={{ 
                background: 'var(--color-accent)', 
                color: 'var(--color-primary-dark)', 
                fontWeight: 700, 
                textAlign: 'center',
                borderRadius: '24px',
                marginTop: '0.5rem',
                padding: '0.85rem'
              }}>
                Start Project →
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
