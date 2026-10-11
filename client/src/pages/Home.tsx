import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SmoothScroll from '../components/SmoothScroll'
import SpotlightCard from '../components/SpotlightCard'
import HorizontalScroll from '../components/HorizontalScroll'
import '../index.css'

export default function Home() {
  const { slug } = useParams()
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  
  let serviceParam = 'restaurant-consultant'
  let locationParam = ''
  
  if (slug && slug.includes('-in-')) {
    const parts = slug.split('-in-')
    serviceParam = parts[0]
    locationParam = parts[1]
  } else if (slug) {
    locationParam = slug
  }

  const formattedLocation = locationParam ? locationParam.charAt(0).toUpperCase() + locationParam.slice(1).replace(/-/g, ' ') : ''
  const formattedService = serviceParam.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  
  const isSeoPage = !!formattedLocation
  const pageTitle = isSeoPage ? `Top ${formattedService} in ${formattedLocation} | JR Consulting` : 'JR Consulting | Restaurant Set-up & Operations'
  const metaDescription = isSeoPage 
    ? `Looking for the best ${formattedService.toLowerCase()} in ${formattedLocation}? JR Consulting provides expert end-to-end restaurant setup and operational turnaround in ${formattedLocation}.`
    : "JR Consulting is India's leading restaurant set-up, kitchen design, and operations consultancy."
  
  // Apple Style Spring Animations
  const springUp: any = {
    hidden: { y: 60, opacity: 0, scale: 0.95 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 20, mass: 1 } 
    }
  }

  // Premium Blur-in Reveal
  const blurReveal: any = {
    hidden: { opacity: 0, filter: 'blur(20px)', y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: { 
        duration: 1.2, 
        ease: [0.2, 0.8, 0.2, 1], 
        delay: i * 0.15 
      }
    })
  }

  // Ref for the footer to track when it enters the viewport
  const footerRef = useRef(null)
  const isFooterInView = useInView(footerRef, { margin: "0px 0px -100px 0px" })

  return (
    <SmoothScroll>
      <Helmet>
        {isSeoPage && (
          <>
            <title>{pageTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={`${formattedService} ${formattedLocation}, restaurant setup ${formattedLocation}, commercial kitchen design ${formattedLocation}, restaurant operations ${formattedLocation}`} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={metaDescription} />
          </>
        )}
      </Helmet>

      {/* Floating Action Buttons (Bottom Left) */}
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

      {/* iOS Style Floating Island Nav with Brochure Logo */}
      <motion.nav 
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
        className="nav-ios"
      >
        <div className="nav-ios-container hover-target">
          <Link to="/" className="nav-logo hover-target" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img src="/jr-logo.jpg" alt="JR Consulting Logo" style={{ height: '52px', width: 'auto', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }} />
          </Link>
          <div className="nav-ios-links" style={{ alignItems: 'center' }}>
            <a href="#about">Vision</a>
            <a href="#expertise">Expertise</a>
            <a href="#services">Services</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#testimonials">Testimonials</a>
            <Link to="/dashboard" style={{ color: 'var(--color-accent)', fontWeight: 500, fontSize: '0.9rem' }}>CRM</Link>
            <Link to="/start" style={{ 
              background: 'var(--color-accent)', 
              color: 'var(--color-primary-dark)', 
              padding: '0.6rem 1.5rem', 
              borderRadius: '30px', 
              fontWeight: 600,
              marginLeft: '1rem'
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
              <a href="#about" onClick={() => setMobileNavOpen(false)}>Vision</a>
              <a href="#expertise" onClick={() => setMobileNavOpen(false)}>Expertise</a>
              <a href="#services" onClick={() => setMobileNavOpen(false)}>Services</a>
              <a href="#portfolio" onClick={() => setMobileNavOpen(false)}>Portfolio</a>
              <a href="#testimonials" onClick={() => setMobileNavOpen(false)}>Testimonials</a>
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

      {/* Hero with Awwwards-Level Blur Stagger & Cinematic Video Background */}
      <section className="hero-ios" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', paddingBottom: '6rem' }}>
        {/* Background Video */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
            src="/hero-bg-v2.mp4"
          />
          {/* Subtle Gradient Overlay so the video is visible but text remains readable */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(28,60,39,0.4), transparent, rgba(28,60,39,1))' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
          <motion.p custom={0} initial="hidden" animate="visible" variants={blurReveal} className="hero-subtitle" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            {isSeoPage ? `Expert Services in ${formattedLocation}` : 'JR Consulting'}
          </motion.p>
          
          {isSeoPage ? (
            <h1 className="hero-title" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 'normal', fontSize: '5.5rem', textShadow: '0 4px 10px rgba(0,0,0,0.6)' }}>
              <motion.span custom={1} initial="hidden" animate="visible" variants={blurReveal} style={{ display: 'block' }}>The Premier</motion.span>
              <motion.span custom={2} initial="hidden" animate="visible" variants={blurReveal} style={{ display: 'block', fontFamily: '-apple-system, Inter, sans-serif', fontStyle: 'normal', fontWeight: 600, color: 'var(--color-accent)' }}>{formattedService}</motion.span>
              <motion.span custom={3} initial="hidden" animate="visible" variants={blurReveal} style={{ display: 'block' }}>in {formattedLocation}.</motion.span>
            </h1>
          ) : (
            <h1 className="hero-title" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 'normal', textShadow: '0 4px 10px rgba(0,0,0,0.6)' }}>
              <motion.span custom={1} initial="hidden" animate="visible" variants={blurReveal} style={{ display: 'block' }}>From vision</motion.span>
              <motion.span custom={2} initial="hidden" animate="visible" variants={blurReveal} style={{ display: 'block', fontFamily: '-apple-system, Inter, sans-serif', fontStyle: 'normal', fontWeight: 600 }}>to first service.</motion.span>
            </h1>
          )}

          <motion.p custom={4} initial="hidden" animate="visible" variants={blurReveal} className="hero-desc" style={{ textTransform: isSeoPage ? 'none' : 'uppercase', textShadow: '0 2px 5px rgba(0,0,0,0.5)' }}>
            {isSeoPage ? metaDescription : 'Your Restaurant. Thoughtfully Planned.'}
          </motion.p>
          <motion.p custom={5} initial="hidden" animate="visible" variants={blurReveal} className="hero-sub-desc" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
            15 Years in Civil Engineering | 10+ Years in Restaurant Industry
          </motion.p>
          <motion.div 
            custom={5} initial="hidden" animate="visible" variants={blurReveal}
            style={{ display: 'flex', gap: '1.5rem', marginTop: '2.5rem', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <Link to="/start" className="hover-target" style={{
              background: 'var(--color-accent)',
              color: 'var(--color-primary-dark)',
              padding: '1rem 2rem',
              borderRadius: '30px',
              fontWeight: 600,
              fontSize: '1.1rem',
              textDecoration: 'none',
              boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Start Project
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>

            <a href="https://wa.me/919909558212" target="_blank" rel="noreferrer" className="hover-target" style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '30px',
              fontWeight: 600,
              fontSize: '1.1rem',
              textDecoration: 'none',
              boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* Bento Box Layout - About & Expertise */}
      <section id="about" className="bento-section">
        <motion.h2 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={springUp}
          className="section-heading"
        >
          Practical Expertise.
        </motion.h2>

        <div className="bento-grid">
          {/* Main About - Large Bento */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={springUp} className="bento-large">
            <SpotlightCard className="bento-card">
              <p className="bento-tag">Kitchen & Facilities</p>
              <h3>Designed for the real world.</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                My work sits at a rare crossroads: civil engineering and restaurant operations. 
                Engineering trained me to think in terms of structure and flow - how space should be planned, 
                how materials need to perform, and how compliance works best built-in from day one.
              </p>
              <p style={{ color: 'var(--color-text)', fontWeight: 500 }}>
                Because I have stood on both sides, I do not design kitchens simply to look right on paper. 
                I design them to perform under real pressure and real volume, day after day.
              </p>
            </SpotlightCard>
          </motion.div>

          {/* Core Offerings - Tall Bento */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={springUp} className="bento-tall">
            <SpotlightCard className="bento-card" style={{ height: '100%' }}>
              <p className="bento-tag">What I Offer</p>
              <h3 style={{ fontSize: '1.8rem' }}>Core Capabilities.</h3>
              <ul className="bento-list">
                <li>Commercial kitchen layout</li>
                <li>Space planning</li>
                <li>Structural safety</li>
                <li>Code compliance advisory</li>
                <li>Kitchen workflow expertise</li>
                <li>Operational efficiency</li>
                <li>New build & renovation</li>
                <li>Equipment placement</li>
              </ul>
            </SpotlightCard>
          </motion.div>
        </div>
      </section>

      {/* Bento Box Layout - Services */}
      <section id="services" className="bento-section" style={{ paddingTop: '2rem' }}>
        <motion.h2 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={springUp}
          className="section-heading"
        >
          Every detail.<br/><span style={{ color: 'var(--color-accent)', fontStyle: 'italic', fontFamily: 'Georgia, serif', fontWeight: 'normal' }}>Designed to work.</span>
        </motion.h2>

        <div className="bento-grid">
          {/* Service 1 */}
          <motion.div layoutId="service-1" onClick={() => setSelectedService(1)} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springUp} style={{ cursor: 'pointer' }}>
            <SpotlightCard className="bento-card hover-scale-slight" style={{ height: '100%' }}>
              <p className="bento-tag">01 / Planning</p>
              <h3>Set the foundations.</h3>
              <p style={{ color: 'var(--color-text-muted)' }}>Tap to see our planning process &rarr;</p>
            </SpotlightCard>
          </motion.div>

          {/* Service 2 */}
          <motion.div layoutId="service-2" onClick={() => setSelectedService(2)} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springUp} style={{ cursor: 'pointer' }}>
            <SpotlightCard className="bento-card hover-scale-slight" style={{ height: '100%' }}>
              <p className="bento-tag">02 / Design & Procurement</p>
              <h3>Shape the experience.</h3>
              <p style={{ color: 'var(--color-text-muted)' }}>Tap to see design expertise &rarr;</p>
            </SpotlightCard>
          </motion.div>

          {/* Service 3 */}
          <motion.div layoutId="service-3" onClick={() => setSelectedService(3)} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springUp} className="bento-tall" style={{ cursor: 'pointer' }}>
            <SpotlightCard className="bento-card hover-scale-slight" style={{ height: '100%' }}>
              <p className="bento-tag">03 / People & Operations</p>
              <h3>The people.<br/>The process.</h3>
              <p style={{ marginBottom: '2rem', fontSize: '1rem', color: 'var(--color-text-muted)' }}>Tap to explore operational systems &rarr;</p>
            </SpotlightCard>
          </motion.div>

          {/* Service 4 */}
          <motion.div layoutId="service-4" onClick={() => setSelectedService(4)} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springUp} className="bento-wide" style={{ cursor: 'pointer' }}>
            <SpotlightCard className="bento-card hover-scale-slight" style={{ height: '100%' }}>
              <p className="bento-tag">04 / Launch & Support</p>
              <h3>Opening day is only the beginning.</h3>
              <p style={{ marginTop: '1rem', color: 'var(--color-text-muted)' }}>Tap to see post-launch support details &rarr;</p>
            </SpotlightCard>
          </motion.div>
        </div>

        {/* Expandable Service Modals */}
        <AnimatePresence>
          {selectedService && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(18, 40, 26, 0.8)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
              onClick={() => setSelectedService(null)}
            >
              <motion.div 
                layoutId={`service-${selectedService}`}
                style={{ background: 'var(--ios-card-bg)', border: 'var(--ios-card-border)', borderRadius: '32px', padding: '4rem', maxWidth: '800px', width: '100%', position: 'relative', boxShadow: '0 30px 60px rgba(0,0,0,0.4)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={() => setSelectedService(null)} style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'transparent', border: 'none', color: 'var(--color-text)', cursor: 'pointer' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                {selectedService === 1 && (
                  <>
                    <p className="bento-tag">01 / Planning</p>
                    <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Set the foundations.</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', marginBottom: '2rem' }}>Example: We analyze foot traffic, local demographics, and structural feasibility before you sign a lease.</p>
                    <ul className="bento-list" style={{ fontSize: '1.1rem' }}>
                      <li><strong>Site Selection:</strong> Detailed pros/cons of commercial locations.</li>
                      <li><strong>Layout Review:</strong> Civil engineering checks for load-bearing walls and drainage.</li>
                      <li><strong>Vastu Consultation:</strong> Basic energy flow and layout planning.</li>
                      <li><strong>Budgeting:</strong> Granular CAPEX forecasting to prevent overspending.</li>
                    </ul>
                  </>
                )}

                {selectedService === 2 && (
                  <>
                    <p className="bento-tag">02 / Design & Procurement</p>
                    <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Shape the experience.</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', marginBottom: '2rem' }}>Example: We design commercial kitchens where chefs take 3 steps instead of 10 to plate a dish, drastically reducing service times.</p>
                    <ul className="bento-list" style={{ fontSize: '1.1rem' }}>
                      <li><strong>Menu Design:</strong> Engineering menus for high margin and prep efficiency.</li>
                      <li><strong>Kitchen Workflow:</strong> Station-by-station ergonomic planning.</li>
                      <li><strong>MEP Services:</strong> Mechanical, Electrical, and Plumbing load distributions.</li>
                      <li><strong>Procurement:</strong> Sourcing heavy equipment from trusted vendor networks at fair prices.</li>
                    </ul>
                  </>
                )}

                {selectedService === 3 && (
                  <>
                    <p className="bento-tag">03 / People & Operations</p>
                    <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>The people. The process.</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', marginBottom: '2rem' }}>Example: We build your FSSAI compliance binders and daily checklist systems so your manager runs the floor on autopilot.</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                      <div>
                        <h4 style={{ color: 'var(--color-accent)', marginBottom: '1rem' }}>People & Training</h4>
                        <ul className="bento-list">
                          <li>Manpower recruitment & trials</li>
                          <li>Role clarity & SOPs</li>
                          <li>Front-of-house service training</li>
                        </ul>
                      </div>
                      <div>
                        <h4 style={{ color: 'var(--color-accent)', marginBottom: '1rem' }}>Systems & Control</h4>
                        <ul className="bento-list">
                          <li>FSSAI document systems</li>
                          <li>Inventory & wastage control</li>
                          <li>Food cost analysis</li>
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                {selectedService === 4 && (
                  <>
                    <p className="bento-tag">04 / Launch & Support</p>
                    <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Opening day is only the beginning.</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', marginBottom: '2rem' }}>Example: After a massive launch weekend, we stay on board to optimize ingredient prep times based on actual real-world order volumes.</p>
                    <ul className="bento-list" style={{ fontSize: '1.1rem' }}>
                      <li><strong>Marketing Strategy:</strong> Pre-launch buzz creation and budget allocation.</li>
                      <li><strong>Soft Launch Execution:</strong> Stress-testing the kitchen with invited guests.</li>
                      <li><strong>Post-Launch Audits:</strong> Monthly operational reviews to maintain FSSAI standards.</li>
                      <li><strong>Menu Tweaks:</strong> Adjusting dishes based on early customer feedback.</li>
                    </ul>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Portfolio & Case Studies - Horizontal Scroll (Cypher Capital Style) */}
      <section id="portfolio" style={{ marginTop: 'clamp(4rem, 8vw, 8rem)', borderTop: '1px solid rgba(196, 154, 108, 0.2)' }}>
        <div className="portfolio-section-header">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={springUp}
            className="section-heading" style={{ marginBottom: 0, textAlign: 'left' }}
          >
            Proven Success.<br/><span style={{ color: 'var(--color-accent)', fontStyle: 'italic', fontFamily: 'Georgia, serif', fontWeight: 'normal' }}>Our Case Studies.</span>
          </motion.h2>
          <div className="portfolio-mobile-hint">
            <span>←</span> Swipe to explore projects <span>→</span>
          </div>
        </div>

        <HorizontalScroll>
          {/* Featured Case Study 1 */}
          <Link to="/project/gilded-spoon" className="hover-target portfolio-card-link" style={{ textDecoration: 'none', display: 'block' }}>
            <SpotlightCard className="bento-card portfolio-card" style={{ background: 'linear-gradient(rgba(12, 26, 19, 0.90), rgba(12, 26, 19, 0.96)), url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80") center/cover' }}>
              <div style={{ maxWidth: '600px', width: '100%' }}>
                <p className="bento-tag" style={{ fontSize: '0.85rem', marginBottom: '0.8rem' }}>Featured Project</p>
                <h3 className="portfolio-card-title">The Gilded Spoon</h3>
                <p className="portfolio-card-desc">Complete end-to-end setup for a 120-seater fine dining establishment, transforming a bare shell into an award-winning venue.</p>
                <ul className="bento-list portfolio-card-list">
                  <li>Menu Design & Procurement</li>
                  <li>Kitchen Layout & Workflow Optimization</li>
                  <li>Staff Training & FSSAI Compliance</li>
                </ul>
                <div className="portfolio-card-cta">
                  <span>Explore Case Study</span>
                  <span className="cta-arrow">→</span>
                </div>
              </div>
            </SpotlightCard>
          </Link>

          {/* Case Study 2 */}
          <Link to="/project/aria-trattoria" className="hover-target portfolio-card-link" style={{ textDecoration: 'none', display: 'block' }}>
            <SpotlightCard className="bento-card portfolio-card" style={{ background: 'linear-gradient(rgba(12, 26, 19, 0.90), rgba(12, 26, 19, 0.96)), url("https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80") center/cover' }}>
              <div style={{ maxWidth: '600px', width: '100%' }}>
                <p className="bento-tag" style={{ fontSize: '0.85rem', marginBottom: '0.8rem' }}>Turnaround</p>
                <h3 className="portfolio-card-title">Aria Trattoria</h3>
                <p className="portfolio-card-desc">Comprehensive operational efficiency review and workflow redesign that increased table turnover by 15% during peak weekend hours.</p>
                <ul className="bento-list portfolio-card-list">
                  <li>Table Turnover Speed Audit</li>
                  <li>FOH / BOH Communication Systems</li>
                  <li>Cost & Waste Reduction Blueprint</li>
                </ul>
                <div className="portfolio-card-cta">
                  <span>Explore Case Study</span>
                  <span className="cta-arrow">→</span>
                </div>
              </div>
            </SpotlightCard>
          </Link>

          {/* Case Study 3 */}
          <Link to="/project/luna-bistro" className="hover-target portfolio-card-link" style={{ textDecoration: 'none', display: 'block' }}>
            <SpotlightCard className="bento-card portfolio-card" style={{ background: 'linear-gradient(rgba(12, 26, 19, 0.90), rgba(12, 26, 19, 0.96)), url("https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80") center/cover' }}>
              <div style={{ maxWidth: '600px', width: '100%' }}>
                <p className="bento-tag" style={{ fontSize: '0.85rem', marginBottom: '0.8rem' }}>New Build</p>
                <h3 className="portfolio-card-title">Luna Bistro</h3>
                <p className="portfolio-card-desc">End-to-end consulting covering site selection, Vastu consultation, and complete commercial kitchen space planning for maximum efficiency.</p>
                <ul className="bento-list portfolio-card-list">
                  <li>Civil & Architectural MEP Sign-off</li>
                  <li>Commercial Exhaust & Grease Trap Setup</li>
                  <li>Trial Operations & Menu Calibration</li>
                </ul>
                <div className="portfolio-card-cta">
                  <span>Explore Case Study</span>
                  <span className="cta-arrow">→</span>
                </div>
              </div>
            </SpotlightCard>
          </Link>
        </HorizontalScroll>
      </section>

      {/* Testimonials & Video Reviews */}
      <section id="testimonials" className="bento-section" style={{ marginTop: '4rem', paddingBottom: '8rem' }}>
        <motion.h2 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={springUp}
          className="section-heading"
        >
          Client Stories.<br/><span style={{ color: 'var(--color-accent)', fontStyle: 'italic', fontFamily: 'Georgia, serif', fontWeight: 'normal' }}>Hear it from them.</span>
        </motion.h2>

        <div className="bento-grid">
          {/* Video Testimonial - Tall Card */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springUp} className="bento-tall">
            <SpotlightCard className="bento-card" style={{ height: '100%', padding: 0, overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'flex-end' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(18, 40, 26, 0.95), transparent), url("https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80") center/cover' }}></div>
              
              {/* Play Button Overlay */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(253, 251, 247, 0.15)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(196, 154, 108, 0.4)', cursor: 'pointer', transition: 'transform 0.3s' }} className="hover-scale">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-accent)"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </div>

              <div style={{ position: 'relative', padding: '3rem', zIndex: 10 }}>
                <p className="bento-tag">Video Testimonial</p>
                <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '0.5rem' }}>"They completely turned around our kitchen efficiency."</h3>
                <p style={{ color: 'var(--color-accent)', fontWeight: 600 }}>Rahul Mehta</p>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Owner, The Gilded Spoon</p>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Text Testimonial 1 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springUp}>
            <SpotlightCard className="bento-card">
              <div style={{ display: 'flex', gap: '4px', marginBottom: '1.5rem', color: 'var(--color-accent)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
              <p style={{ color: 'var(--color-text)', fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '2rem', fontStyle: 'italic' }}>
                "Jigar's background in civil engineering sets him apart from any other restaurant consultant. He foresaw MEP and structural issues that saved us lakhs in the build-out phase."
              </p>
              <div style={{ marginTop: 'auto' }}>
                <p style={{ color: 'var(--color-accent)', fontWeight: 600 }}>Vikram Singh</p>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Founder, Aria Trattoria</p>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Text Testimonial 2 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springUp}>
            <SpotlightCard className="bento-card">
              <div style={{ display: 'flex', gap: '4px', marginBottom: '1.5rem', color: 'var(--color-accent)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
              <p style={{ color: 'var(--color-text)', fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '2rem', fontStyle: 'italic' }}>
                "The FSSAI compliance and operational systems JR Consulting put in place meant our opening week was flawless. We were completely prepared for the volume."
              </p>
              <div style={{ marginTop: 'auto' }}>
                <p style={{ color: 'var(--color-accent)', fontWeight: 600 }}>Priya Sharma</p>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Operations Manager, Luna Bistro</p>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </section>

      {/* Proper Full-Width Footer */}
      <footer ref={footerRef} className="site-footer">
        <div className="footer-container">
          {/* Brand Column */}
          <div className="footer-brand">
            <h2>JR Consulting</h2>
            <p>Restaurant Set-up & Operations</p>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '300px', lineHeight: 1.6, textTransform: 'none', marginBottom: '2rem' }}>
              From vision to first service. Expert consulting bridging civil engineering and restaurant operations.
            </p>
            <div className="footer-socials">
              <a href="https://wa.me/919909558212" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="WhatsApp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="mailto:jigarrajgor@hotmail.com" className="footer-social-btn" aria-label="Email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h3>Contact Info</h3>
            <ul>
              <li><strong>Jigar Rajgor</strong></li>
              <li>+91 99095 58212</li>
              <li>jigarrajgor@hotmail.com</li>
              <li style={{ marginTop: '1rem' }}>Vadodara, Gujarat<br/>India</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#about">Our Vision</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#portfolio">Case Studies</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} JR Consulting. All rights reserved.</p>
          <p>Designed for the real world.</p>
        </div>
      </footer>

    </SmoothScroll>
  )
}
