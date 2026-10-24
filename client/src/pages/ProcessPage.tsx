import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SmoothScroll from '../components/SmoothScroll'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../index.css'

export default function ProcessPage() {
  const footerRef = useRef<HTMLElement>(null)
  const isFooterInView = useInView(footerRef, { margin: "0px 0px -100px 0px" })

  const springUp: any = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
  }

  const steps = [
    {
      step: '01',
      title: 'Discovery & Concept Scoping',
      desc: 'We start by understanding your culinary concept, seating capacity, target customer demographic, and investment envelope. We identify whether your vision calls for an intimate bistro, high-throughput cloud kitchen, or fine dining destination.',
      bullets: [
        'Detailed business & menu concept breakdown',
        'Seating capacity and kitchen square-footage ratio balancing',
        'Initial CAPEX forecast and project timeline roadmap',
        'Regulatory requirements and local municipal checklist'
      ],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 6.29 6.29l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      )
    },
    {
      step: '02',
      title: 'Site Civil & MEP Audit',
      desc: 'Using civil engineering rigor, we inspect your physical site before demolition begins. We review floor slab load-bearing capacities, plumbing falls, exhaust shaft clearances, and 3-phase power availability to prevent structural redesigns.',
      bullets: [
        'On-site structural & civil feasibility verification',
        'Floor slope and municipal drainage connectivity plan',
        'Exhaust shaft and grease duct route sign-off',
        'Electrical transformer kW load and backup generator planning'
      ],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2"/>
          <path d="M3 9h18"/>
          <path d="M9 21V9"/>
          <path d="M15 15h.01"/>
        </svg>
      )
    },
    {
      step: '03',
      title: 'Kitchen CAD Design & Equipment BOQ',
      desc: 'We draft the detailed 2D architectural kitchen layouts, station-by-station flow, and MEP connection points. We prepare the complete Stainless Steel Equipment BOQ and float tenders directly to India\'s top fabricators.',
      bullets: [
        'Ergonomic 2D CAD layouts for line cooks and prep stations',
        'Exhaust CFM and fresh air intake balancing calculations',
        'Equipment BOQ with detailed technical specifications',
        'Factory tender floatation to renowned equipment manufacturers and fabricators'
      ],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2"/>
          <polyline points="2 17 12 22 22 17"/>
          <polyline points="2 12 12 17 22 12"/>
        </svg>
      )
    },
    {
      step: '04',
      title: 'Commissioning, Staff SOPs & Launch',
      desc: 'We supervise equipment installation, test grease traps and hood air flow, run staff training simulations, finalize FSSAI compliance documentation, and advise on soft launch management through your grand opening.',
      bullets: [
        'Soft launch dry run advice & stress-test simulations',
        'BOH and FOH standard operating procedure manuals',
        'FSSAI norms compliance & license inspection sign-off',
        'Post-opening 30-day operational margin and speed review'
      ],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
      )
    }
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How We Set Up Commercial Kitchens and Restaurants",
    "description": "Step-by-step engineering and operational workflow for setting up high-performing restaurants.",
    "step": steps.map((s) => ({
      "@type": "HowToStep",
      "name": s.title,
      "text": s.desc
    }))
  }

  return (
    <SmoothScroll>
      <Helmet>
        <title>Our Restaurant Setup Process | 4-Stage Engineering & Launch Workflow | JR Consulting</title>
        <meta name="description" content="Explore JR Consulting's structured 4-stage restaurant consulting workflow: Discovery, Civil/MEP Site Review, Kitchen CAD Design & Tender, and Opening Support." />
        <link rel="canonical" href="https://www.jrconsulting.in/process" />
        <meta property="og:title" content="Our Process | 4-Stage Restaurant Setup & Kitchen Design Workflow" />
        <meta property="og:description" content="Learn how JR Consulting turns a raw shell into a fully commissioned, profitable restaurant." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Header isFooterInView={isFooterInView} />

      <section style={{ paddingTop: 'clamp(9rem, 14vw, 12rem)', paddingBottom: '4rem', paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)', maxWidth: '1300px', margin: '0 auto' }}>
        <motion.div initial="hidden" animate="visible" variants={springUp} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem' }}>
            <Link to="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.85rem' }}>Home</Link>
            <span style={{ color: 'var(--color-accent)', fontSize: '0.85rem' }}>/</span>
            <span style={{ color: 'var(--color-accent)', fontSize: '0.85rem', fontWeight: 600 }}>How We Work</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', fontFamily: 'var(--font-heading)', lineHeight: 1.15, marginBottom: '1.5rem', color: 'var(--color-text)' }}>
            How We Work.<br />
            <span style={{ color: 'var(--color-accent)', fontWeight: 'normal' }}>
              Step by step, blueprint to opening night.
            </span>
          </h1>

          <p style={{ color: 'var(--color-text-muted)', fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', maxWidth: '780px', margin: '0 auto', lineHeight: 1.7 }}>
            Our 4-stage process combines rigorous civil engineering oversight with real-world restaurant management, eliminating guesswork and costly mid-project rework.
          </p>
        </motion.div>

        {/* 4 Process Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '6rem' }}>
          {steps.map((st, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="process-card"
              style={{ padding: '2.5rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <span className="process-step-num">{st.step}</span>
              </div>
              <div className="process-icon">{st.icon}</div>
              <h2 style={{ fontSize: '1.35rem', color: 'var(--color-text)', margin: 0, fontFamily: 'var(--font-heading)' }}>{st.title}</h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>{st.desc}</p>
              
              <div style={{ borderTop: '1px solid rgba(196, 154, 108, 0.15)', paddingTop: '1rem', marginTop: 'auto' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {st.bullets.map((b, bIdx) => (
                    <li key={bIdx} style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', display: 'flex', gap: '0.5rem', lineHeight: 1.5 }}>
                      <span style={{ color: 'var(--color-accent)' }}>•</span> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Civil Engineering Advantage Matrix */}
        <div style={{ marginTop: '5rem', marginBottom: '6rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="bento-tag" style={{ display: 'inline-block', marginBottom: '0.8rem' }}>The Structural Edge</p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-heading)', color: 'var(--color-text)', margin: 0 }}>
              Why Engineering-First Consulting Matters.
            </h2>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '680px', margin: '1rem auto 0', lineHeight: 1.6 }}>
              A comparison between JR Consulting's civil engineering standards and the common pitfalls of conventional interior decorators.
            </p>
          </div>

          <div className="engineering-grid">
            {/* Engineer Card */}
            <div className="eng-card eng-card-engineer">
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
                    <p>Floor gradients calculated to prevent stagnant pooling; multi-chamber grease interceptors ensure local compliance and prevent foul odors.</p>
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
                    <p>structual bearing capacity, core-cutting points viability in accordance civil engineering precision to protect building integrity.</p>
                  </div>
                </div>
                <div className="eng-item">
                  <span className="eng-item-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                  </span>
                  <div className="eng-item-text">
                    <h4>Electrical Load Distributions & Gas Bank Zoning</h4>
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
            </div>

            {/* Conventional Card */}
            <div className="eng-card eng-card-conventional">
              <span className="eng-badge eng-badge-gray">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Conventional Approach
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
                    <p>Haphazard slab core-drilling and uncalculated equipment weight leading to structural damage, water seepage, and Potential dilapidation defaults notices.</p>
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
                    <h4>Inappropriate Assumptions - Power Calculations</h4>
                    <p>Inappropriate distributions of power of kitchen equipment leading to frequent breaker tripping during peak dinner services.</p>
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
                    <h4>Non-coordinated Work Scheduling</h4>
                    <p>Trades overlap chaotically with no milestone tracking and concurrent procurement activities , causing compounding weeks of launch delays, mounting pre-opening rent, and lost revenue.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="prefooter-card">
          <div className="prefooter-text">
            <p className="bento-tag" style={{ display: 'inline-block', marginBottom: '0.8rem' }}>Take The Next Step</p>
            <h2>Have floor plans or a site ready for review?</h2>
            <p>Schedule a 30-minute feasibility session with Jigar Rajgor to audit your space and plan an execution roadmap.</p>
          </div>
          <div className="prefooter-actions">
            <Link to="/start" className="btn-primary" style={{ textAlign: 'center', padding: '1.1rem 2.2rem' }}>
              Submit Your Site Plans &rarr;
            </Link>
            <a href="https://wa.me/919909558212" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--color-text)', textDecoration: 'none', padding: '1rem', border: '1px solid rgba(196, 154, 108, 0.3)', borderRadius: '30px' }}>
              WhatsApp Directly
            </a>
          </div>
        </div>
      </section>

      <Footer ref={footerRef} />
    </SmoothScroll>
  )
}
