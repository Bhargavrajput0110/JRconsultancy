import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SmoothScroll from '../components/SmoothScroll'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../index.css'

export default function FaqPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const footerRef = useRef<HTMLElement>(null)
  const isFooterInView = useInView(footerRef, { margin: "0px 0px -100px 0px" })

  const springUp: any = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
  }

  const faqItems = [
    {
      category: 'General & Planning',
      q: 'At what phase of our restaurant project should we bring in JR Consulting?',
      a: 'The earlier, the better — ideally before signing your commercial lease. We evaluate physical site constraints such as demographic conditons ,  structural floor bearing capacity , municipal drainage slope and RLs , Adequate ceiling clearance for exhaust ducts, and the availability of adequate electrical power. Catching lease red-flags early prevents expensive structural compromises later and provides ultimate efficency satisfication .'
    },
    {
      category: 'Civil Engineering',
      q: 'How does your Civil Engineering background specifically help restaurant owners?',
      a: 'Commercial kitchens are heavy industrial spaces operating inside commercial buildings. Over 70% of restaurant operational headaches stem from poor civil & MEP infrastructure — clotted grease traps, low water pressure, tripping breakers, poor lux levels and inadequate ventilation causing kitchen heat to spill into dining rooms. With 15+ years of background in civil engineering and infrastructure, Jigar Rajgor brings valuable insights to alleviate aforesaid unseen factors for a smoother operations'
    },
    {
      category: 'Equipment & CAPEX',
      q: 'Do you sell or supply commercial kitchen equipment directly?',
      a: 'No, we remain strictly vendor-neutral to act in best financial interest of the client. We prepare the complete Kitchen Equipment Schedule & BOQ (Bill of Quantities) with detailed specifications. We then float tenders to renowed equipment manufacturers and fabricators.'
    },
    {
      category: 'Compliance & Licenses',
      q: 'How do you ensure FSSAI and statutory code compliance?',
      a: 'We design kitchen layouts strictly aligned with FSSAI norms. This includes physical separation of raw and cooked food pathways, designated handwash basins, proper insect-kill zones, food-grade coveredd floor edges, and grease interceptor integration. Our layouts are engineered to meet local authorites health inspection standards smoothly.'
    },
    {
      category: 'Geography & Reach',
      q: 'Which locations and restaurant formats do you service across India?',
      a: 'We are headquartered in Vadodara, Gujarat, India, and actively undertakes all consulting works inregards to restaurant setup and kitchen engineering projects Pan-India. We serve clients across all states and major hubs, working with fine dining restaurants, casual cafes, cloud kitchen clusters, bakeries, bars, and commercial catering hubs.'
    },
    {
      category: 'Project Scope & Execution',
      q: 'How is the project scope and milestone delivery structured?',
      a: 'Every restaurant project is uniquely planned based on your square footage, civil conditions, and operational goals. Rather than rigid generic packages, we work through structured milestone phases — starting with a site survey and CAD layout schematics, progressing through MEP engineering sign-off, equipment procurement BOQs, and ending with trial runs and opening night supervision.'
    },
    {
      category: 'Collaboration',
      q: 'Can you work alongside our existing architect or interior designer?',
      a: 'Yes, absolutely. We frequently collaborate with client architects and interior designers. Your architect handles the guest aesthetic and dining room vision, while we handle the technical kitchen MEP, grease trap gradients, exhaust engineering, and BOH operational ergonomics. We provide CAD overlay files that plug directly into your architect\'s master drawings.'
    }
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  }

  return (
    <SmoothScroll>
      <Helmet>
        <title>Frequently Asked Questions | Restaurant Setup, FSSAI & Kitchen MEP | JR Consulting</title>
        <meta name="description" content="Get answers on commercial kitchen planning, FSSAI compliance, civil engineering advantages, equipment tenders, and fees with JR Consulting." />
        <link rel="canonical" href="https://www.jrconsulting.in/faq" />
        <meta property="og:title" content="Restaurant Setup FAQ | JR Consulting" />
        <meta property="og:description" content="Common questions answered on kitchen planning, MEP, FSSAI licensing, and timelines." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Header isFooterInView={isFooterInView} />

      <section style={{ paddingTop: 'clamp(9rem, 14vw, 12rem)', paddingBottom: '4rem', paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)', maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div initial="hidden" animate="visible" variants={springUp} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem' }}>
            <Link to="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.85rem' }}>Home</Link>
            <span style={{ color: 'var(--color-accent)', fontSize: '0.85rem' }}>/</span>
            <span style={{ color: 'var(--color-accent)', fontSize: '0.85rem', fontWeight: 600 }}>FAQ</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', fontFamily: 'var(--font-heading)', lineHeight: 1.15, marginBottom: '1.5rem', color: 'var(--color-text)' }}>
            Frequently Asked Questions.<br />
            <span style={{ color: 'var(--color-accent)', fontWeight: 'normal' }}>
              Clear answers before you start.
            </span>
          </h1>

          <p style={{ color: 'var(--color-text-muted)', fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', maxWidth: '750px', margin: '0 auto', lineHeight: 1.7 }}>
            Everything you need to know about our engineering approach, fee structures, FSSAI standards, and project timelines.
          </p>
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="faq-list" style={{ marginTop: '2rem', marginBottom: '6rem' }}>
          {faqItems.map((item, index) => {
            const isOpen = openFaq === index
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`faq-item ${isOpen ? 'open' : ''}`}
              >
                <div 
                  className="faq-header"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOpenFaq(isOpen ? null : index) }}
                >
                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-accent)', fontWeight: 600, marginBottom: '0.35rem' }}>
                      {item.category}
                    </span>
                    <h3>{item.q}</h3>
                  </div>
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

        {/* Have more questions CTA */}
        <div className="prefooter-card">
          <div className="prefooter-text">
            <p className="bento-tag" style={{ display: 'inline-block', marginBottom: '0.8rem' }}>Direct Access</p>
            <h2>Have a specific question about your location?</h2>
            <p>Every commercial space has unique civil constraints. Message Jigar Rajgor directly on WhatsApp for immediate clarity.</p>
          </div>
          <div className="prefooter-actions">
            <a 
              href="https://wa.me/919909558212?text=Hi%20Jigar,%20I%20have%20a%20question%20about%20restaurant%20consulting%20for%20my%20project." 
              target="_blank" 
              rel="noreferrer" 
              className="btn-primary" 
              style={{ textAlign: 'center', padding: '1.1rem 2.2rem' }}
            >
              Ask on WhatsApp &rarr;
            </a>
            <Link to="/start" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text)', textDecoration: 'none', padding: '1rem', border: '1px solid rgba(196, 154, 108, 0.3)', borderRadius: '30px' }}>
              Submit Project Inquiry
            </Link>
          </div>
        </div>
      </section>

      <Footer ref={footerRef} />
    </SmoothScroll>
  )
}
