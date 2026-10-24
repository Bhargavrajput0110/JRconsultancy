import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SmoothScroll from '../components/SmoothScroll'
import SpotlightCard from '../components/SpotlightCard'
import HorizontalScroll from '../components/HorizontalScroll'
import { ShieldCheck } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../index.css'

export default function Home() {
  const { slug } = useParams()
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  
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

      <Header isFooterInView={isFooterInView} />


      {/* Hero with Awwwards-Level Blur Stagger & Cinematic Video Background */}
      <section className="hero-ios" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', paddingTop: 'clamp(9.5rem, 16vh, 12rem)', paddingBottom: '5rem' }}>
        {/* Background Video with Smooth Fade-Out Mask */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: 0, 
          pointerEvents: 'none',
          WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 96%)',
          maskImage: 'linear-gradient(to bottom, black 55%, transparent 96%)'
        }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              opacity: 0.18, 
              filter: 'grayscale(100%) brightness(0.3) contrast(1.15)' 
            }}
            src="/hero-bg-v2.mp4"
          />
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            background: 'linear-gradient(to bottom, rgba(6, 13, 8, 0.45) 0%, rgba(6, 13, 8, 0.8) 100%)' 
          }} />
        </div>

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          
          <motion.p custom={0} initial="hidden" animate="visible" variants={blurReveal} className="hero-subtitle" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)', marginTop: '0.5rem' }}>
            {isSeoPage ? `Expert Services in ${formattedLocation}` : 'Your partner in setting up a Restaurant-Cafe-Eatery'}
          </motion.p>
          
          {isSeoPage ? (
            <h1 className="hero-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(3rem, 6vw, 5.5rem)', textShadow: '0 4px 10px rgba(0,0,0,0.6)' }}>
              <motion.span custom={1} initial="hidden" animate="visible" variants={blurReveal} style={{ display: 'block' }}>The Premier</motion.span>
              <motion.span custom={2} initial="hidden" animate="visible" variants={blurReveal} style={{ display: 'block', fontStyle: 'normal', fontWeight: 600, color: 'var(--color-accent)' }}>{formattedService}</motion.span>
              <motion.span custom={3} initial="hidden" animate="visible" variants={blurReveal} style={{ display: 'block' }}>in {formattedLocation}.</motion.span>
            </h1>
          ) : (
            <h1 className="hero-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, textShadow: '0 4px 10px rgba(0,0,0,0.6)' }}>
              <motion.span custom={1} initial="hidden" animate="visible" variants={blurReveal} style={{ display: 'block' }}>From vision</motion.span>
              <motion.span custom={2} initial="hidden" animate="visible" variants={blurReveal} style={{ display: 'block', fontStyle: 'normal', fontWeight: 600 }}>to first service.</motion.span>
            </h1>
          )}

          <motion.p custom={4} initial="hidden" animate="visible" variants={blurReveal} className="hero-desc" style={{ textTransform: isSeoPage ? 'none' : 'uppercase', textShadow: '0 2px 5px rgba(0,0,0,0.5)' }}>
            {isSeoPage ? metaDescription : 'Your Restaurant. Thoughtfully Planned.'}
          </motion.p>
          <motion.p custom={5} initial="hidden" animate="visible" variants={blurReveal} className="hero-sub-desc" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
            15 Years in Civil Engineering Experience and running | 10+ Years in Restaurant Industry operations
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

      {/* ── Trust Stats Strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="trust-strip"
      >
        <div className="trust-stats-grid">
          {[
            { num: '15+', label: 'Years in Civil Engineering Experience' },
            { num: '5+', label: 'Kitchens Designed' },
            { num: '10+', label: 'Years in Restaurant Ops' },
          ].map((stat, i) => (
            <div key={i} className="trust-stat">
              <span className="trust-stat-num">{stat.num}</span>
              <span className="trust-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
        <div className="trust-strip-footer">
          <span className="trust-fssai-badge">
            <ShieldCheck size={16} />
            <span>Assured FSSAI Compliance</span>
          </span>
        </div>
      </motion.div>

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
                <li>Structural safety & code compliance advisory</li>
                <li>Kitchen workflow expertise</li>
                <li>Operational efficiency</li>
                <li>New build & renovation</li>
                <li>Equipment placement & ventilation planning</li>
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
          Every detail.<br/><span style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)', fontWeight: 400 }}>Designed to work.</span>
        </motion.h2>

        <div className="services-bento-grid">
          {/* Service 1 */}
          <motion.div layoutId="service-1" onClick={() => setSelectedService(1)} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springUp} className="service-card-third" style={{ cursor: 'pointer' }}>
            <SpotlightCard className="bento-card hover-scale-slight" style={{ height: '100%' }}>
              <p className="bento-tag">01 / Planning</p>
              <h3>Set the foundations.</h3>
              <p style={{ color: 'var(--color-text-muted)', marginTop: 'auto', paddingTop: '1rem' }}>Tap to see our planning process &rarr;</p>
            </SpotlightCard>
          </motion.div>

          {/* Service 2 */}
          <motion.div layoutId="service-2" onClick={() => setSelectedService(2)} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springUp} className="service-card-third" style={{ cursor: 'pointer' }}>
            <SpotlightCard className="bento-card hover-scale-slight" style={{ height: '100%' }}>
              <p className="bento-tag">02 / Design & Procurement</p>
              <h3>Shape the experience.</h3>
              <p style={{ color: 'var(--color-text-muted)', marginTop: 'auto', paddingTop: '1rem' }}>Tap to see design expertise &rarr;</p>
            </SpotlightCard>
          </motion.div>

          {/* Service 3 */}
          <motion.div layoutId="service-3" onClick={() => setSelectedService(3)} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springUp} className="service-card-third" style={{ cursor: 'pointer' }}>
            <SpotlightCard className="bento-card hover-scale-slight" style={{ height: '100%' }}>
              <p className="bento-tag">03 / People & Operations</p>
              <h3>The people.<br/>The process.</h3>
              <p style={{ color: 'var(--color-text-muted)', marginTop: 'auto', paddingTop: '1rem' }}>Tap to explore operational systems &rarr;</p>
            </SpotlightCard>
          </motion.div>

          {/* Service 4 */}
          <motion.div layoutId="service-4" onClick={() => setSelectedService(4)} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springUp} className="service-card-half" style={{ cursor: 'pointer' }}>
            <SpotlightCard className="bento-card hover-scale-slight" style={{ height: '100%' }}>
              <p className="bento-tag">04 / Launch & Support</p>
              <h3>Opening day is only the beginning.</h3>
              <p style={{ color: 'var(--color-text-muted)', marginTop: 'auto', paddingTop: '1rem' }}>Tap to see post-launch support details &rarr;</p>
            </SpotlightCard>
          </motion.div>

          {/* Service 5 - Add on insight */}
          <motion.div layoutId="service-5" onClick={() => setSelectedService(5)} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springUp} className="service-card-half" style={{ cursor: 'pointer' }}>
            <SpotlightCard className="bento-card hover-scale-slight" style={{ height: '100%' }}>
              <p className="bento-tag">05 / Add on insight</p>
              <h3>Strategic civil audits & operational insights.</h3>
              <p style={{ color: 'var(--color-text-muted)', marginTop: 'auto', paddingTop: '1rem' }}>Tap to see civil audits, vendor benchmarking & line flow insights &rarr;</p>
            </SpotlightCard>
          </motion.div>
        </div>

        {/* Expandable Service Modals */}
        <AnimatePresence>
          {selectedService && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                width: '100vw', 
                height: '100vh', 
                background: 'rgba(5, 8, 6, 0.92)', 
                backdropFilter: 'blur(16px)', 
                WebkitBackdropFilter: 'blur(16px)',
                zIndex: 1000, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: 'clamp(0.75rem, 3vw, 2rem)' 
              }}
              onClick={() => setSelectedService(null)}
            >
              <motion.div 
                layoutId={`service-${selectedService}`}
                style={{ 
                  background: 'rgba(11, 18, 13, 0.98)', 
                  border: '1px solid rgba(196, 154, 108, 0.35)', 
                  borderRadius: 'clamp(20px, 4vw, 32px)', 
                  padding: 'clamp(1.5rem, 5vw, 3.5rem)', 
                  maxWidth: '780px', 
                  width: '100%', 
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  WebkitOverflowScrolling: 'touch',
                  position: 'relative', 
                  boxShadow: '0 30px 60px rgba(0,0,0,0.85)' 
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedService(null)} 
                  aria-label="Close details"
                  style={{ 
                    position: 'absolute', 
                    top: 'clamp(1rem, 3vw, 2rem)', 
                    right: 'clamp(1rem, 3vw, 2rem)', 
                    background: 'rgba(255, 255, 255, 0.06)', 
                    border: '1px solid rgba(196, 154, 108, 0.25)', 
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text)', 
                    cursor: 'pointer',
                    zIndex: 2
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                {selectedService === 1 && (
                  <>
                    <p className="bento-tag">01 / Planning</p>
                    <h3 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', marginBottom: '1.25rem', lineHeight: 1.25 }}>Set the foundations.</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', marginBottom: '1.75rem', lineHeight: 1.6 }}>Example: We analyze foot traffic, local demographics, and structural feasibility before you sign a lease.</p>
                    <ul className="modal-feature-list">
                      <li className="modal-feature-item">
                        <span className="modal-feature-dot" />
                        <div className="modal-feature-text"><strong>Site Selection:</strong> Detailed pros/cons of commercial locations.</div>
                      </li>
                      <li className="modal-feature-item">
                        <span className="modal-feature-dot" />
                        <div className="modal-feature-text"><strong>Layout Review:</strong> Civil engineering checks for load-bearing walls and drainage.</div>
                      </li>
                      <li className="modal-feature-item">
                        <span className="modal-feature-dot" />
                        <div className="modal-feature-text"><strong>Basic Vastu Consultation:</strong> Energy flow and layout planning.</div>
                      </li>
                      <li className="modal-feature-item">
                        <span className="modal-feature-dot" />
                        <div className="modal-feature-text"><strong>Budget Analysis and Reviews:</strong> Granular CAPEX forecasting to prevent overspending.</div>
                      </li>
                    </ul>
                  </>
                )}

                {selectedService === 2 && (
                  <>
                    <p className="bento-tag">02 / Design & Procurement</p>
                    <h3 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', marginBottom: '1.25rem', lineHeight: 1.25 }}>Shape the experience.</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', marginBottom: '1.75rem', lineHeight: 1.6 }}>Example: We design commercial kitchens where chefs take 3 steps instead of 10 to plate a dish, drastically reducing service times.</p>
                    <ul className="modal-feature-list">
                      <li className="modal-feature-item">
                        <span className="modal-feature-dot" />
                        <div className="modal-feature-text"><strong>Menu Design Assistance:</strong> Menu engineering advisory, recipe standardization, and prep-efficient kitchen execution.</div>
                      </li>
                      <li className="modal-feature-item">
                        <span className="modal-feature-dot" />
                        <div className="modal-feature-text"><strong>Kitchen Workflow:</strong> Station-by-station ergonomic planning.</div>
                      </li>
                      <li className="modal-feature-item">
                        <span className="modal-feature-dot" />
                        <div className="modal-feature-text"><strong>MEP Services:</strong> Basic MEP service provision and detailed MEP service coordination assistance.</div>
                      </li>
                      <li className="modal-feature-item">
                        <span className="modal-feature-dot" />
                        <div className="modal-feature-text"><strong>Kitchen Equipment:</strong> Equipment selection and detailed design review.</div>
                      </li>
                      <li className="modal-feature-item">
                        <span className="modal-feature-dot" />
                        <div className="modal-feature-text"><strong>Procurement:</strong> Sourcing heavy equipment from trusted vendor networks at fair prices.</div>
                      </li>
                      <li className="modal-feature-item">
                        <span className="modal-feature-dot" />
                        <div className="modal-feature-text"><strong>Crockery, Cutlery & Packaging:</strong> Uniforms, operational supplies, and packaging advice / assistance.</div>
                      </li>
                    </ul>
                  </>
                )}

                {selectedService === 3 && (
                  <>
                    <p className="bento-tag">03 / People & Operations</p>
                    <h3 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', marginBottom: '1.25rem', lineHeight: 1.25 }}>The people. The process.</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', marginBottom: '1.75rem', lineHeight: 1.6 }}>Example: We build your FSSAI compliance binders and daily checklist systems so your manager runs the floor on autopilot.</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1.5rem' }}>
                      <div>
                        <h4 style={{ color: 'var(--color-accent)', marginBottom: '0.85rem', fontSize: '1.1rem' }}>People & Training</h4>
                        <ul className="modal-feature-list">
                          <li className="modal-feature-item"><span className="modal-feature-dot" /><div className="modal-feature-text">Manpower recruitment assistance</div></li>
                          <li className="modal-feature-item"><span className="modal-feature-dot" /><div className="modal-feature-text">Job responsibilities & role clarity</div></li>
                          <li className="modal-feature-item"><span className="modal-feature-dot" /><div className="modal-feature-text">General service training</div></li>
                          <li className="modal-feature-item"><span className="modal-feature-dot" /><div className="modal-feature-text">Kitchen staff training, cleaning & hygiene requirements</div></li>
                          <li className="modal-feature-item"><span className="modal-feature-dot" /><div className="modal-feature-text">FSSAI compliance review</div></li>
                        </ul>
                      </div>
                      <div>
                        <h4 style={{ color: 'var(--color-accent)', marginBottom: '0.85rem', fontSize: '1.1rem' }}>Systems & Control</h4>
                        <ul className="modal-feature-list">
                          <li className="modal-feature-item"><span className="modal-feature-dot" /><div className="modal-feature-text">Document management system in accordance with FSSAI norms</div></li>
                          <li className="modal-feature-item"><span className="modal-feature-dot" /><div className="modal-feature-text">Stores & inventory management assistance</div></li>
                          <li className="modal-feature-item"><span className="modal-feature-dot" /><div className="modal-feature-text">Food and other cost analysis advisory</div></li>
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                {selectedService === 4 && (
                  <>
                    <p className="bento-tag">04 / Launch & Support</p>
                    <h3 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', marginBottom: '1.25rem', lineHeight: 1.25 }}>Opening day is only the beginning.</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', marginBottom: '1.75rem', lineHeight: 1.6 }}>Example: After a massive launch weekend, we stay on board to optimize ingredient prep times based on actual real-world order volumes.</p>
                    <ul className="modal-feature-list">
                      <li className="modal-feature-item">
                        <span className="modal-feature-dot" />
                        <div className="modal-feature-text"><strong>Marketing Strategy:</strong> Pre-launch buzz creation and budget allocation.</div>
                      </li>
                      <li className="modal-feature-item">
                        <span className="modal-feature-dot" />
                        <div className="modal-feature-text"><strong>Soft Launch Execution:</strong> Stress-testing the kitchen with invited guests.</div>
                      </li>
                      <li className="modal-feature-item">
                        <span className="modal-feature-dot" />
                        <div className="modal-feature-text"><strong>Post-Launch Audits:</strong> Monthly operational reviews and maintain FSSAI standards.</div>
                      </li>
                      <li className="modal-feature-item">
                        <span className="modal-feature-dot" />
                        <div className="modal-feature-text"><strong>Menu Tweaks:</strong> Adjusting dishes based on early customer feedback.</div>
                      </li>
                    </ul>
                  </>
                )}

                {selectedService === 5 && (
                  <>
                    <p className="bento-tag">05 / Add on insight</p>
                    <h3 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', marginBottom: '1.25rem', lineHeight: 1.25 }}>Add-on Services & Advisory.</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                      <div>
                        <h4 style={{ color: 'var(--color-accent)', marginBottom: '0.85rem', fontSize: '1.05rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Design & Civil Reviews</h4>
                        <ul className="modal-feature-list">
                          <li className="modal-feature-item"><span className="modal-feature-dot" /><div className="modal-feature-text">Seating Capacity & Interior Review</div></li>
                          <li className="modal-feature-item"><span className="modal-feature-dot" /><div className="modal-feature-text">Civil & Structural Advice</div></li>
                          <li className="modal-feature-item"><span className="modal-feature-dot" /><div className="modal-feature-text">Design Amendments, Reviews & Comments</div></li>
                          <li className="modal-feature-item"><span className="modal-feature-dot" /><div className="modal-feature-text">Pre-Lease Civil & MEP Load Audit</div></li>
                          <li className="modal-feature-item"><span className="modal-feature-dot" /><div className="modal-feature-text">Co-ordination with All Other Consultants</div></li>
                        </ul>
                      </div>
                      <div>
                        <h4 style={{ color: 'var(--color-accent)', marginBottom: '0.85rem', fontSize: '1.05rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Project & Cost Control</h4>
                        <ul className="modal-feature-list">
                          <li className="modal-feature-item"><span className="modal-feature-dot" /><div className="modal-feature-text">Project Management Insights</div></li>
                          <li className="modal-feature-item"><span className="modal-feature-dot" /><div className="modal-feature-text">Project Budgeting Insights</div></li>
                          <li className="modal-feature-item"><span className="modal-feature-dot" /><div className="modal-feature-text">Cost Effectiveness Review</div></li>
                          <li className="modal-feature-item"><span className="modal-feature-dot" /><div className="modal-feature-text">Direct Vendor Tender & Price Benchmark</div></li>
                        </ul>
                      </div>
                      <div>
                        <h4 style={{ color: 'var(--color-accent)', marginBottom: '0.85rem', fontSize: '1.05rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Operations & Training</h4>
                        <ul className="modal-feature-list">
                          <li className="modal-feature-item"><span className="modal-feature-dot" /><div className="modal-feature-text">Operational / Set-up Review</div></li>
                          <li className="modal-feature-item"><span className="modal-feature-dot" /><div className="modal-feature-text">Turnaround Process</div></li>
                          <li className="modal-feature-item"><span className="modal-feature-dot" /><div className="modal-feature-text">Staff Training + Motivational Support (including Service Sequence & Menu Knowledge)</div></li>
                          <li className="modal-feature-item"><span className="modal-feature-dot" /><div className="modal-feature-text">FSSAI Guidelines</div></li>
                          <li className="modal-feature-item"><span className="modal-feature-dot" /><div className="modal-feature-text">Identifying Service & Product Gaps</div></li>
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── How We Work — Process Section ── */}
      <section id="process" className="process-section">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={springUp}
          style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}
        >
          <p className="bento-tag" style={{ display: 'inline-block', marginBottom: '1rem' }}>Our Process</p>
          <h2 className="section-heading" style={{ margin: 0 }}>
            How We Work.
            <span style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)', fontWeight: 400 }}> Step by step.</span>
          </h2>
        </motion.div>

        <div className="process-grid">
          {[
            {
              step: '01',
              title: 'Discovery Call',
              desc: 'We understand your vision, location, budget, and cuisine concept. This is where we define the project scope together.',
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 6.29 6.29l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              )
            },
            {
              step: '02',
              title: 'Site & Plan Review',
              desc: 'Using civil engineering expertise, we assess your space — structural loads, drainage, MEP feasibility, and code compliance.',
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2"/>
                  <path d="M3 9h18"/>
                  <path d="M9 21V9"/>
                  <path d="M15 15h.01"/>
                </svg>
              )
            },
            {
              step: '03',
              title: 'Design & Procurement',
              desc: 'Kitchen layout, equipment selection, vendor sourcing, menu engineering — every detail planned before a single wall is broken.',
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                  <polyline points="2 17 12 22 22 17"/>
                  <polyline points="2 12 12 17 22 12"/>
                </svg>
              )
            },
            {
              step: '04',
              title: 'Launch & Support',
              desc: 'We advice soft launches manage, staff training, FSSAI compliance setup, and stay on as your operational partner post-opening.',
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
              )
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
              className="process-card"
            >
              <div className="process-step-num">{item.step}</div>
              <div className="process-icon">{item.icon}</div>
              <h3 className="process-title">{item.title}</h3>
              <p className="process-desc">{item.desc}</p>
              {i < 3 && <div className="process-connector" />}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: 'clamp(2rem, 5vw, 4rem)' }}
        >
          <a href="https://wa.me/919909558212" target="_blank" rel="noreferrer" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Start Your Journey
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </motion.div>
      </section>

      {/* ── Client Logo Strip ── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="clients-section"
      >
        <p className="clients-label">Trusted by restaurant owners across India</p>
        <div className="clients-logos">
          {[
            'The Gilded Spoon', 'Aria Trattoria', 'Luna Bistro', 'Neo Bistro',
            'Café Noir', 'The Amber Room', 'Spice Route', 'Garden Table'
          ].map((name, i) => (
            <div key={i} className="client-logo-pill">{name}</div>
          ))}
        </div>
      </motion.section>

      {/* ── Civil Engineering Advantage / Comparison ── */}
      <section id="engineering" className="engineering-section">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={springUp}
          style={{ textAlign: 'center', marginBottom: '1rem' }}
        >
          <p className="bento-tag" style={{ display: 'inline-block', marginBottom: '1rem' }}>The Structural Edge</p>
          <h2 className="section-heading" style={{ margin: 0 }}>
            Why Engineering-First Consulting Matters.
            <br />
            <span style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)', fontWeight: 400 }}>
              Built for real operations, not just paper designs.
            </span>
          </h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '720px', margin: '1.25rem auto 0', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Over 70% of restaurant post-opening slowdowns or costly renovations are caused by plumbing clogs, inadequate exhaust provisions or inadequate electrical load calculations. Here is how we engineer around them:
          </p>
        </motion.div>

        <div className="engineering-grid">
          {/* JR Consulting Civil Engineered Approach */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="eng-card eng-card-engineer"
          >
            <span className="eng-badge eng-badge-gold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
              JR Consulting — Civil Engineering Standard
            </span>
            <div className="eng-list">
              <div className="eng-item">
                <span className="eng-item-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 21H3L21 3v18Z"/>
                    <path d="M12 21v-4"/>
                    <path d="M8 21v-2"/>
                    <path d="M16 21v-6"/>
                  </svg>
                </span>
                <div className="eng-item-text">
                  <h4>Engineered Drain Slopes & Industrial Grease Traps</h4>
                  <p>Floor gradients calculated to prevent stagnant pooling; multi-chamber grease interceptors ensure municipal compliance and prevent foul odors.</p>
                </div>
              </div>
              <div className="eng-item">
                <span className="eng-item-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                </span>
                <div className="eng-item-text">
                  <h4>Structural Safety & Code Compliance Advisory</h4>
                  <p>Floor slab load capacity, core-cutting points, and structural safety reviewed with civil engineering precision to protect building integrity.</p>
                </div>
              </div>
              <div className="eng-item">
                <span className="eng-item-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                </span>
                <div className="eng-item-text">
                  <h4>3-Phase Electrical Load & Gas Bank Zoning</h4>
                  <p>KW loads mapped per cooking station with isolated breaker panels to prevent costly power trips and protect equipment from burnout.</p>
                </div>
              </div>
              <div className="eng-item">
                <span className="eng-item-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </span>
                <div className="eng-item-text">
                  <h4>Project Programme & Scheduling</h4>
                  <p>Critical-path timeline synchronizing civil milestones, MEP rough-ins, and kitchen delivery to eliminate contractor downtime and rent leakage.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Conventional Decorator / Untrained Approach */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="eng-card eng-card-conventional"
          >
            <span className="eng-badge eng-badge-gray">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Conventional Interior Decorator Approach
            </span>
            <div className="eng-list">
              <div className="eng-item">
                <span className="eng-item-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                </span>
                <div className="eng-item-text">
                  <h4>Flat Floors & Undersized PVC Pipes</h4>
                  <p>Grease coagulates within weeks, leading to slab-breaking excavations, customer odor complaints, and costly emergency closures.</p>
                </div>
              </div>
              <div className="eng-item">
                <span className="eng-item-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                </span>
                <div className="eng-item-text">
                  <h4>Unchecked Core-Cutting & Structural Load Risks</h4>
                  <p>Haphazard slab core-drilling and uncalculated equipment weight leading to structural cracks, water seepage, and landlord penalty notices.</p>
                </div>
              </div>
              <div className="eng-item">
                <span className="eng-item-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                </span>
                <div className="eng-item-text">
                  <h4>Guesswork Power Calculations</h4>
                  <p>Fryers, ovens, and chillers share overloaded phases, leading to frequent breaker tripping during peak dinner services.</p>
                </div>
              </div>
              <div className="eng-item">
                <span className="eng-item-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                </span>
                <div className="eng-item-text">
                  <h4>Uncoordinated Scheduling & Delayed Handover</h4>
                  <p>Trades overlap chaotically with no milestone tracking, causing compounding weeks of launch delays, mounting pre-opening rent, and lost revenue.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>



      {/* Portfolio & Client Work - Horizontal Scroll */}
      <section id="portfolio" style={{ marginTop: 'clamp(4rem, 8vw, 8rem)', borderTop: '1px solid rgba(196, 154, 108, 0.2)' }}>
        <div className="portfolio-section-header">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={springUp}
            className="section-heading" style={{ marginBottom: 0, textAlign: 'left' }}
          >
            Proven Results.<br/><span style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)', fontWeight: 400 }}>Client Transformations.</span>
          </motion.h2>
          <div className="portfolio-mobile-hint">
            <span>←</span> Swipe to explore transformations <span>→</span>
          </div>
        </div>

        <HorizontalScroll>
          {/* Featured Transformation 1 */}
          <Link to="/project/gilded-spoon" className="hover-target portfolio-card-link" style={{ textDecoration: 'none', display: 'block' }}>
            <SpotlightCard className="bento-card portfolio-card" style={{ background: 'linear-gradient(rgba(9, 14, 10, 0.92), rgba(5, 8, 6, 0.97)), url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80") center/cover' }}>
              <div style={{ maxWidth: '600px', width: '100%' }}>
                <p className="bento-tag" style={{ fontSize: '0.85rem', marginBottom: '0.8rem' }}>Featured Transformation</p>
                <h3 className="portfolio-card-title">The Gilded Spoon</h3>
                <p className="portfolio-card-desc">Complete end-to-end setup for a 120-seater fine dining establishment, transforming a bare shell into an award-winning venue.</p>
                <ul className="bento-list portfolio-card-list">
                  <li>Menu Design & Procurement</li>
                  <li>Kitchen Layout & Workflow Optimization</li>
                  <li>Staff Training & FSSAI Compliance</li>
                </ul>
                <div className="portfolio-card-cta">
                  <span>View Transformation</span>
                  <span className="cta-arrow">→</span>
                </div>
              </div>
            </SpotlightCard>
          </Link>

          {/* Transformation 2 */}
          <Link to="/project/aria-trattoria" className="hover-target portfolio-card-link" style={{ textDecoration: 'none', display: 'block' }}>
            <SpotlightCard className="bento-card portfolio-card" style={{ background: 'linear-gradient(rgba(9, 14, 10, 0.92), rgba(5, 8, 6, 0.97)), url("https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80") center/cover' }}>
              <div style={{ maxWidth: '600px', width: '100%' }}>
                <p className="bento-tag" style={{ fontSize: '0.85rem', marginBottom: '0.8rem' }}>Operational Turnaround</p>
                <h3 className="portfolio-card-title">Aria Trattoria</h3>
                <p className="portfolio-card-desc">Comprehensive operational efficiency review and workflow redesign that increased table turnover by 15% during peak weekend hours.</p>
                <ul className="bento-list portfolio-card-list">
                  <li>Table Turnover Speed Audit</li>
                  <li>FOH / BOH Communication Systems</li>
                  <li>Cost & Waste Reduction Blueprint</li>
                </ul>
                <div className="portfolio-card-cta">
                  <span>View Transformation</span>
                  <span className="cta-arrow">→</span>
                </div>
              </div>
            </SpotlightCard>
          </Link>

          {/* Transformation 3 */}
          <Link to="/project/luna-bistro" className="hover-target portfolio-card-link" style={{ textDecoration: 'none', display: 'block' }}>
            <SpotlightCard className="bento-card portfolio-card" style={{ background: 'linear-gradient(rgba(9, 14, 10, 0.92), rgba(5, 8, 6, 0.97)), url("https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80") center/cover' }}>
              <div style={{ maxWidth: '600px', width: '100%' }}>
                <p className="bento-tag" style={{ fontSize: '0.85rem', marginBottom: '0.8rem' }}>New Build & MEP</p>
                <h3 className="portfolio-card-title">Luna Bistro</h3>
                <p className="portfolio-card-desc">End-to-end consulting covering site selection, Basic Vastu consultation, and complete commercial kitchen space planning for maximum efficiency.</p>
                <ul className="bento-list portfolio-card-list">
                  <li>Civil & Architectural MEP Sign-off</li>
                  <li>Commercial Exhaust & Grease Trap Setup</li>
                  <li>Trial Operations & Menu Calibration</li>
                </ul>
                <div className="portfolio-card-cta">
                  <span>View Transformation</span>
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
          Client Stories.<br/><span style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)', fontWeight: 400 }}>Hear it from them.</span>
        </motion.h2>

        <div className="bento-grid">
          {/* Video Testimonial - Tall Card */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springUp} className="bento-tall">
            <SpotlightCard className="bento-card" style={{ height: '100%', padding: 0, overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'flex-end' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(5, 8, 6, 0.97), rgba(9, 14, 10, 0.4), transparent), url("https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80") center/cover' }}></div>
              
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

      {/* ── Interactive FAQ Section ── */}
      <section id="faq" className="faq-section">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={springUp}
          style={{ textAlign: 'center' }}
        >
          <p className="bento-tag" style={{ display: 'inline-block', marginBottom: '1rem' }}>Questions & Answers</p>
          <h2 className="section-heading" style={{ margin: 0 }}>
            Frequently Asked Questions.
            <br />
            <span style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)', fontWeight: 400 }}>
              Clear answers before you begin.
            </span>
          </h2>
        </motion.div>

        <div className="faq-list">
          {[
            {
              q: 'At what phase of our restaurant project should we bring in JR Consulting?',
              a: 'The earlier, the better — ideally before signing your commercial lease. We evaluate physical site constraints such as structural floor loads, municipal drainage slope, ceiling clearance for exhaust ducts, and the availability of 3-phase electrical power. Catching lease red-flags early prevents expensive structural compromises later.'
            },
            {
              q: 'How does your Civil Engineering background specifically help restaurant owners?',
              a: 'Commercial kitchens are heavy industrial spaces operating inside commercial buildings. Over 70% of restaurant operational headaches stem from poor civil & MEP infrastructure — clotted grease traps, low water pressure, tripping breakers, or poor ventilation causing kitchen heat to spill into dining rooms. With 15+ years of background in civil engineering and infrastructure, Jigar Rajgor coordinates drainage slopes, CFM exhaust air balancing, and electrical circuits to run smoothly under peak weekend pressure.'
            },
            {
              q: 'Do you sell or supply commercial kitchen equipment directly?',
              a: 'No, we remain strictly vendor-neutral to act in your best financial interest. We prepare the complete Kitchen Equipment Schedule & BOQ (Bill of Quantities) with detailed stainless steel grades (SS304), thickness, and electrical/gas specifications. We then float tenders to India\'s top equipment manufacturers and fabricators, negotiating factory-direct pricing that typically saves our clients 15–25% on CAPEX.'
            },
            {
              q: 'How do you ensure FSSAI and statutory code compliance?',
              a: 'We design kitchen layouts strictly aligned with FSSAI Schedule 4 sanitary zoning regulations. This includes physical separation of raw and cooked food pathways, designated handwash basins, proper insect-kill zones, food-grade coved floor edges, and grease interceptor integration. Our layouts are engineered to meet municipal health inspection standards smoothly.'
            },
            {
              q: 'Which locations and restaurant formats do you service?',
              a: 'We are headquartered in Vadodara, India, and actively undertake turnkey restaurant setup and kitchen engineering projects Pan-India. We serve clients across all states and major hubs, working with fine dining restaurants, casual cafes, cloud kitchen clusters, bakeries, bars, and commercial catering hubs.'
            }
          ].map((item, index) => {
            const isOpen = openFaq === index
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`faq-item ${isOpen ? 'open' : ''}`}
              >
                <div 
                  className="faq-header"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOpenFaq(isOpen ? null : index) }}
                >
                  <h3>{item.q}</h3>
                  <div className="faq-toggle-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </div>
                </div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="faq-body">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ── Pre-Footer Free Feasibility Consultation Banner ── */}
      <section className="prefooter-section">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="prefooter-card"
        >
          <div className="prefooter-text">
            <p className="bento-tag" style={{ display: 'inline-block', marginBottom: '0.8rem' }}>Take The Next Step</p>
            <h2>Have a space in mind?<br />Let's assess its feasibility.</h2>
            <p>
              Schedule a 30-minute discovery call with Jigar Rajgor. We'll discuss your concept, review floor feasibility, and provide honest engineering and operational direction.
            </p>
          </div>
          <div className="prefooter-actions">
            <a 
              href="https://wa.me/919909558212?text=Hi%20Jigar,%20I'd%20like%20to%20schedule%20a%20free%20consultation%20call%20for%20my%20restaurant%20project." 
              target="_blank" 
              rel="noreferrer" 
              className="btn-primary" 
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', padding: '1.1rem 2rem' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              Chat on WhatsApp
            </a>
            <a 
              href="tel:+919909558212" 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                padding: '1.1rem 2rem',
                borderRadius: '30px',
                border: '1px solid rgba(196, 154, 108, 0.4)',
                color: 'var(--color-text)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                transition: 'all 0.3s ease'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 6.29 6.29l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call +91 99095 58212
            </a>
          </div>
        </motion.div>
      </section>

      <Footer ref={footerRef} />


    </SmoothScroll>
  )
}
