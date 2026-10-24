import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SmoothScroll from '../components/SmoothScroll'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SpotlightCard from '../components/SpotlightCard'
import { ShieldCheck } from 'lucide-react'
import '../index.css'

export default function AboutPage() {
  const footerRef = useRef<HTMLElement>(null)
  const isFooterInView = useInView(footerRef, { margin: "0px 0px -100px 0px" })

  const springUp: any = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Person",
      "name": "Jigar Rajgor",
      "jobTitle": "Restaurant Setup & Civil Engineering Consultant",
      "worksFor": {
        "@type": "Organization",
        "name": "JR Consulting",
        "url": "https://www.jrconsulting.in"
      },
      "description": "Civil Engineer with 15+ years of experience and 10+ years in restaurant operations specializing in commercial kitchen design and turnkey setups.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Vadodara",
        "addressRegion": "Gujarat",
        "addressCountry": "IN"
      }
    }
  }

  return (
    <SmoothScroll>
      <Helmet>
        <title>About Jigar Rajgor | Civil Engineer & Restaurant Setup Specialist | JR Consulting</title>
        <meta name="description" content="Discover JR Consulting. Founded by Jigar Rajgor, bridging 15+ years of civil engineering and 10+ years of restaurant operations across India." />
        <link rel="canonical" href="https://www.jrconsulting.in/about" />
        <meta property="og:title" content="About Jigar Rajgor | Restaurant Setup & Kitchen Design Specialist" />
        <meta property="og:description" content="Bridging civil engineering and restaurant operations to design high-performance commercial kitchens that endure under real volume." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Header isFooterInView={isFooterInView} />

      {/* Page Hero */}
      <section style={{ paddingTop: 'clamp(9rem, 14vw, 12rem)', paddingBottom: '4rem', paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)', maxWidth: '1250px', margin: '0 auto' }}>
        <motion.div initial="hidden" animate="visible" variants={springUp} style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem' }}>
            <Link to="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.85rem' }}>Home</Link>
            <span style={{ color: 'var(--color-accent)', fontSize: '0.85rem' }}>/</span>
            <span style={{ color: 'var(--color-accent)', fontSize: '0.85rem', fontWeight: 600 }}>About & Vision</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', fontFamily: 'var(--font-heading)', lineHeight: 1.15, marginBottom: '1.5rem', color: 'var(--color-text)' }}>
            Designed for the Real World.<br />
            <span style={{ color: 'var(--color-accent)', fontWeight: 'normal' }}>
              Civil Engineering Meets Restaurant Operations.
            </span>
          </h1>

          <p style={{ color: 'var(--color-text-muted)', fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', maxWidth: '780px', margin: '0 auto 3rem', lineHeight: 1.7 }}>
            JR Consulting was founded on a simple realization: Most restaurant consultants have never poured concrete or water resoucres and enviroment, while most civil engineers have never managed a chaotic Friday night kitchen rush. We sit at the rare intersection of both.
          </p>
        </motion.div>

        {/* Stats Strip */}
        <div className="trust-strip" style={{ borderRadius: '24px', margin: '2rem 0 5rem' }}>
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
        </div>

        {/* Founder Story Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '2.5rem', marginBottom: '6rem' }}>
          <SpotlightCard className="bento-card" style={{ padding: '3rem' }}>
            <p className="bento-tag">The Background</p>
            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem', color: 'var(--color-text)' }}>Jigar Rajgor</h2>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.75, marginBottom: '1.5rem', fontSize: '1.02rem' }}>
              With over 15 years in civil engineering and infrastructure projects, Jigar developed extensive practical expertise in spatial planning, structural safety coordination, plumbing hydraulics, and commercial MEP systems from the ground up.
            </p>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.75, fontSize: '1.02rem' }}>
              When he transitioned into restaurant ownership and operations over a decade ago, he recognized that truly exceptional hospitality projects happen when visionary architecture and back-of-house operational engineering work seamlessly together. While leading architects and interior designers craft unforgettable dining ambiances and guest journeys, commercial kitchens require specialized technical integration — balancing heavy electrical loads, precision exhaust ventilation, grease interceptors, and ergonomic service lines. Today, Jigar Rajgor associted with varieous architects and interior design , providing the technical back-of-house engineering and MEP blueprints that empower their creative designs to run flawlessly under real service pressure.
            </p>
          </SpotlightCard>

          <SpotlightCard className="bento-card" style={{ padding: '3rem' }}>
            <p className="bento-tag">The Philosophy</p>
            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem', color: 'var(--color-text)' }}>Operations First.</h2>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.75, marginBottom: '1.5rem', fontSize: '1.02rem' }}>
              We do not design kitchens simply to look impressive on 3D renders. We design them to withstand peak 100+ cover diner rushes with reliable MEP load balancing, smooth ergonomic chef movement, and sanitary food safety pathways.
            </p>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.75, fontSize: '1.02rem' }}>
              Every pipe slope, exhaust duct CFM Calcs, grease interceptor size, and gas bank manifold/Gas Supply Route is engineered with precision before a single brick is laid.
            </p>
          </SpotlightCard>
        </div>

        {/* Core Competencies Box */}
        <div style={{ background: 'rgba(253, 251, 247, 0.03)', border: '1px solid rgba(196, 154, 108, 0.25)', borderRadius: '32px', padding: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '6rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="bento-tag" style={{ display: 'inline-block', marginBottom: '0.8rem' }}>What We Deliver</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontFamily: 'var(--font-heading)', color: 'var(--color-text)', margin: 0 }}>
              Full Spectrum Technical & Operational Capabilities
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '2rem' }}>
            {[
              {
                title: 'Civil & Architectural Space Planning',
                desc: 'Detailed structural feasibility reviews, slab load tolerance, partition engineering, and floor level gradients.'
              },
              {
                title: 'Commercial Kitchen CAD Layouts',
                desc: 'Station-by-station ergonomic design ensuring cooks move with maximum speed and minimal cross-traffic.'
              },
              {
                title: 'Plumbing & Grease Trap Planning',
                desc: 'Industrial multi-chamber interceptors preventing pipe clogs, foul smells, and local authorites non-compliance.'
              },
              {
                title: 'Power Distributions & Gas Bank Layout',
                desc: 'Dedicated electrical circuit mapping to prevent breaker tripping, balance phase loads, and protect heavy kitchen appliances from voltage burnout.'
              }
            ].map((cap, i) => (
              <div key={i} style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--color-accent)', marginBottom: '0.6rem' }}>{cap.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="prefooter-card" style={{ margin: '0 auto' }}>
          <div className="prefooter-text">
            <p className="bento-tag" style={{ display: 'inline-block', marginBottom: '0.8rem' }}>Let's Build Together</p>
            <h2>Ready to plan your space with engineering precision?</h2>
            <p>Speak directly with Jigar Rajgor for an objective 30-minute review of your restaurant location or concept.</p>
          </div>
          <div className="prefooter-actions">
            <Link to="/start" className="btn-primary" style={{ textAlign: 'center', padding: '1.1rem 2.2rem' }}>
              Start Your Project &rarr;
            </Link>
            <a href="https://wa.me/919909558212" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--color-text)', textDecoration: 'none', padding: '1rem', border: '1px solid rgba(196, 154, 108, 0.3)', borderRadius: '30px' }}>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer ref={footerRef} />
    </SmoothScroll>
  )
}
