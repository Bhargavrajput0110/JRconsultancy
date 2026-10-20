import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SmoothScroll from '../components/SmoothScroll'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../index.css'

export default function PackagesPage() {
  const footerRef = useRef<HTMLElement>(null)
  const isFooterInView = useInView(footerRef, { margin: "0px 0px -100px 0px" })

  const springUp: any = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
  }

  const packages = [
    {
      id: 'kitchen-design',
      category: 'Core Technical Engineering',
      title: 'Kitchen Design & MEP Planning',
      ideal: 'For architects, interior designers, and restaurant owners who have their front-of-house concept ready but need flawless commercial kitchen CAD blueprints and MEP calculations.',
      timeline: '3 – 5 Weeks',
      deliverables: [
        'Ergonomic 2D CAD commercial kitchen layouts & station zoning',
        'Mechanical Exhaust Hood CFM calculations and fresh air supply balance',
        'Plumbing hydraulic gradients, floor drains & grease interceptor specs',
        '3-Phase electrical load schedules & gas bank manifold drawings',
        'Stainless steel equipment BOQ (SS304) with exact gauge specs',
        'FSSAI Schedule 4 sanitary zoning sign-off for statutory compliance',
        'Equipment tender document preparation and manufacturer bid evaluation'
      ],
      whatsappMsg: "Hi Jigar, I'm interested in the Kitchen Design & MEP Planning package."
    },
    {
      id: 'turnkey',
      featured: true,
      category: 'Complete Solution (Most Requested)',
      title: 'Full Turnkey Setup & Launch',
      ideal: 'For investors, first-time restaurateurs, and expanding brands seeking an end-to-end partner from bare shell to opening night and operational profitability.',
      timeline: '8 – 16 Weeks',
      deliverables: [
        'Site selection, civil feasibility audit & commercial lease review',
        'Complete kitchen CAD architectural layout & full MEP drawings',
        'Kitchen equipment procurement, manufacturer tenders & on-site fitment',
        'Menu engineering, recipe standard sheets & supplier sourcing',
        'Core kitchen and service staff recruitment guidance & interview trials',
        'Comprehensive FOH/BOH Standard Operating Procedures (SOPs)',
        'FSSAI license compliance binders and health inspection dry runs',
        'Soft launch stress testing and opening week on-floor supervision'
      ],
      whatsappMsg: "Hi Jigar, I'm interested in the Full Turnkey Restaurant Setup & Launch package."
    },
    {
      id: 'turnaround',
      category: 'Performance Optimization',
      title: 'Operational Audit & Turnaround',
      ideal: 'For operating restaurants experiencing slow table turnover, high food waste, kitchen bottlenecks, or declining profit margins.',
      timeline: '3 – 6 Weeks',
      deliverables: [
        'Kitchen line speed and expediting bottleneck time-motion study',
        'Table turnover speed audit to maximize peak hour seat yield',
        'Food cost analysis, portion control checks & recipe margin audit',
        'Front-of-house service standards and upselling retraining',
        'Inventory management, wastage logging, and supplier contract review',
        'FSSAI and kitchen hygiene corrective action roadmap',
        '30-Day implementation blueprint with weekly operational check-ins'
      ],
      whatsappMsg: "Hi Jigar, I'm interested in the Operational Audit & Turnaround package."
    }
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "JR Consulting Restaurant Consultation Packages",
    "description": "Transparent restaurant consulting engagement models including kitchen design, turnkey launch, and operational turnarounds.",
    "brand": {
      "@type": "Brand",
      "name": "JR Consulting"
    }
  }

  return (
    <SmoothScroll>
      <Helmet>
        <title>Consultation Packages & Engagement Models | JR Consulting</title>
        <meta name="description" content="Explore JR Consulting's engagement tiers: Kitchen Design & MEP Planning, Full Turnkey Restaurant Launch, and Operational Audit Retainer." />
        <link rel="canonical" href="https://www.jrconsulting.in/packages" />
        <meta property="og:title" content="Restaurant Consulting Packages & Models | JR Consulting" />
        <meta property="og:description" content="Transparent consultation packages for new builds, kitchen renovations, and operational turnarounds." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Header isFooterInView={isFooterInView} />

      <section style={{ paddingTop: 'clamp(9rem, 14vw, 12rem)', paddingBottom: '4rem', paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)', maxWidth: '1350px', margin: '0 auto' }}>
        <motion.div initial="hidden" animate="visible" variants={springUp} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem' }}>
            <Link to="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.85rem' }}>Home</Link>
            <span style={{ color: 'var(--color-accent)', fontSize: '0.85rem' }}>/</span>
            <span style={{ color: 'var(--color-accent)', fontSize: '0.85rem', fontWeight: 600 }}>Packages</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', fontFamily: 'var(--font-heading)', lineHeight: 1.15, marginBottom: '1.5rem', color: 'var(--color-text)' }}>
            Transparent Consultation Packages.<br />
            <span style={{ color: 'var(--color-accent)', fontWeight: 'normal' }}>
              Designed for your project scale.
            </span>
          </h1>

          <p style={{ color: 'var(--color-text-muted)', fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', maxWidth: '780px', margin: '0 auto', lineHeight: 1.7 }}>
            Choose the engagement model that matches your operational needs. Every engagement is led directly by Jigar Rajgor with full civil engineering and operational sign-off.
          </p>
        </motion.div>

        {/* 3 Package Cards */}
        <div className="packages-grid" style={{ marginBottom: '6rem' }}>
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`package-card ${pkg.featured ? 'featured' : ''}`}
            >
              {pkg.featured && <div className="package-popular-ribbon">Most Requested</div>}
              <span className="package-category">{pkg.category}</span>
              <h2 className="package-title">{pkg.title}</h2>
              <div style={{ display: 'inline-block', fontSize: '0.82rem', color: 'var(--color-accent)', fontWeight: 600, marginBottom: '1rem' }}>
                Timeline: {pkg.timeline}
              </div>
              <p className="package-desc" style={{ minHeight: 'auto', marginBottom: '1.5rem' }}>
                {pkg.ideal}
              </p>

              <div className="package-deliverables-title">What is Included:</div>
              <ul className="package-list">
                {pkg.deliverables.map((item, dIdx) => (
                  <li key={dIdx}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <a
                  href={`https://wa.me/919909558212?text=${encodeURIComponent(pkg.whatsappMsg)}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`package-btn ${pkg.featured ? 'package-btn-primary' : 'package-btn-outline'}`}
                >
                  Inquire on WhatsApp &rarr;
                </a>
                <Link
                  to="/start"
                  style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-text-muted)', textDecoration: 'none', padding: '0.4rem' }}
                >
                  or Submit Project Details Form &rarr;
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Financial Transparency Callout */}
        <div style={{ background: 'rgba(196, 154, 108, 0.06)', border: '1px solid rgba(196, 154, 108, 0.25)', borderRadius: '32px', padding: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '6rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
            <p className="bento-tag" style={{ display: 'inline-block', marginBottom: '0.8rem' }}>Direct Client Advocacy</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontFamily: 'var(--font-heading)', color: 'var(--color-text)', marginBottom: '1.2rem' }}>
              Why Neutral Consulting Saves You 15% – 25% on CAPEX
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '2rem' }}>
              Equipment vendors and distributors frequently over-specify heavy commercial machinery with massive profit margins. Because JR Consulting does not sell equipment, we prepare objective, manufacturer-neutral BOQs and pit top fabricators against each other in open tender. This bidding process routinely saves our clients lakhs of rupees.
            </p>
            <Link to="/start" className="btn-primary" style={{ display: 'inline-flex', padding: '1rem 2.2rem' }}>
              Request a Custom Proposal &rarr;
            </Link>
          </div>
        </div>

        {/* CTA Card */}
        <div className="prefooter-card">
          <div className="prefooter-text">
            <p className="bento-tag" style={{ display: 'inline-block', marginBottom: '0.8rem' }}>Custom Scope</p>
            <h2>Need a tailored retainer or hybrid scope?</h2>
            <p>Every restaurant is unique. We craft custom consulting scopes for multi-unit groups, cloud kitchen clusters, and boutique concepts.</p>
          </div>
          <div className="prefooter-actions">
            <Link to="/start" className="btn-primary" style={{ textAlign: 'center', padding: '1.1rem 2.2rem' }}>
              Get a Custom Scope &rarr;
            </Link>
            <a href="tel:+919909558212" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--color-text)', textDecoration: 'none', padding: '1rem', border: '1px solid rgba(196, 154, 108, 0.3)', borderRadius: '30px' }}>
              Call +91 99095 58212
            </a>
          </div>
        </div>
      </section>

      <Footer ref={footerRef} />
    </SmoothScroll>
  )
}
