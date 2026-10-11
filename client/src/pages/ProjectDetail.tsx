import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useParams, Navigate } from 'react-router-dom'
import SmoothScroll from '../components/SmoothScroll'
import '../index.css'

const projectsData: Record<string, any> = {
  'gilded-spoon': {
    title: 'The Gilded Spoon',
    tag: 'Featured Project',
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80',
    overview: 'Complete end-to-end setup for a 120-seater fine dining establishment, transforming a bare shell into an award-winning venue.',
    details: [
      {
        heading: 'Menu Design & Procurement',
        text: 'Curated a bespoke 5-course tasting menu, engineered for maximum profitability while maintaining culinary excellence. We sourced 14 local suppliers to ensure farm-to-table freshness while cutting food costs by 18%.',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80'
      },
      {
        heading: 'Kitchen Layout & Workflow Optimization',
        text: 'Designed a highly efficient, ergonomic kitchen layout that reduced ticket times by an average of 4 minutes during peak service. The linear flow setup minimized cross-traffic between prep and plating stations.',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80'
      },
      {
        heading: 'Staff Training & FSSAI Compliance',
        text: 'Conducted rigorous 3-week front-of-house and back-of-house training programs. Established daily audit logs ensuring 100% compliance with FSSAI hygiene standards.',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80'
      }
    ]
  },
  'aria-trattoria': {
    title: 'Aria Trattoria',
    tag: 'Turnaround',
    heroImage: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80',
    overview: 'Comprehensive operational efficiency review and workflow redesign that increased table turnover by 15% during peak weekend hours.',
    details: [
      {
        heading: 'Operational Workflow Redesign',
        text: 'Identified major bottlenecks in the expediting process. We implemented a secondary plating station and introduced handheld POS devices for servers, eliminating double-entry and significantly speeding up table service.',
        image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80'
      },
      {
        heading: 'Staff Restructuring',
        text: 'Optimized the scheduling matrix, reducing labor costs by 12% while actually improving floor coverage during the busiest service windows.',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80'
      }
    ]
  },
  'neo-bistro': {
    title: 'Neo Bistro',
    tag: 'Menu Engineering',
    heroImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80',
    overview: 'Total menu overhaul reducing food costs by 12% while elevating the brand positioning to a premium casual dining tier.',
    details: [
      {
        heading: 'Menu Engineering & Pricing Strategy',
        text: 'Analyzed sales data to identify "plow horses" and "stars". We redesigned the menu layout using eye-tracking principles and optimized ingredient crossover to drastically reduce food waste.',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80'
      }
    ]
  }
}

export default function ProjectDetail() {
  const { id } = useParams()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  
  // If the project doesn't exist, route back to home
  if (!id || !projectsData[id]) {
    return <Navigate to="/" />
  }

  const project = projectsData[id]

  const springUp: any = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
  }

  return (
    <SmoothScroll>
      <nav className="nav-ios" style={{ position: 'fixed' }}>
        <div className="nav-ios-container hover-target">
          <Link to="/" className="nav-logo hover-target" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img src="/jr-logo.jpg" alt="JR Consulting Logo" style={{ height: '52px', width: 'auto', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }} />
          </Link>
          <div className="nav-ios-links" style={{ alignItems: 'center' }}>
            <a href="/#about">Vision</a>
            <a href="/#expertise">Expertise</a>
            <a href="/#services">Services</a>
            <a href="/#portfolio">Portfolio</a>
            <a href="/#testimonials">Testimonials</a>
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
              <a href="/#about" onClick={() => setMobileNavOpen(false)}>Vision</a>
              <a href="/#expertise" onClick={() => setMobileNavOpen(false)}>Expertise</a>
              <a href="/#services" onClick={() => setMobileNavOpen(false)}>Services</a>
              <a href="/#portfolio" onClick={() => setMobileNavOpen(false)}>Portfolio</a>
              <a href="/#testimonials" onClick={() => setMobileNavOpen(false)}>Testimonials</a>
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
      </nav>

      {/* Hero Section */}
      <section style={{ 
        position: 'relative',
        minHeight: '60vh', 
        display: 'flex', 
        alignItems: 'flex-end', 
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        background: `linear-gradient(rgba(28, 60, 39, 0.4), rgba(28, 60, 39, 1)), url("${project.heroImage}") center/cover`
      }}>
        <motion.div initial="hidden" animate="visible" variants={springUp} style={{ maxWidth: '800px', position: 'relative', zIndex: 10 }}>
          <p style={{ color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600, marginBottom: '0.8rem', fontSize: '0.9rem' }}>{project.tag}</p>
          <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', fontFamily: 'Georgia, serif', fontStyle: 'italic', margin: '0 0 1.5rem 0', color: '#fff', textShadow: '0 4px 12px rgba(0,0,0,0.3)', lineHeight: 1.15 }}>{project.title}</h1>
          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', color: '#d0d7d2', lineHeight: 1.6 }}>{project.overview}</p>
        </motion.div>
      </section>

      {/* Details Section */}
      <section style={{ padding: 'clamp(3rem, 6vw, 6rem) clamp(1.25rem, 5vw, 4rem)', background: 'var(--color-bg)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(3rem, 6vw, 6rem)' }}>
          {project.details.map((detail: any, index: number) => (
            <motion.div 
              key={index}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={springUp}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(2rem, 4vw, 4rem)', alignItems: 'center' }}
            >
              <div>
                <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '1.2rem', color: 'var(--color-text)' }}>{detail.heading}</h2>
                <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>{detail.text}</p>
              </div>
              <img src={detail.image} alt={detail.heading} style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }} />
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Call to Action Footer */}
      <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 1.5rem', textAlign: 'center', background: 'var(--color-primary-dark)' }}>
        <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontFamily: 'Georgia, serif', fontStyle: 'italic', marginBottom: '2rem' }}>Ready to build your vision?</h2>
        <Link to="/start" className="hover-target" style={{
            background: 'var(--color-accent)',
            color: 'var(--color-primary-dark)',
            padding: '1rem 3rem',
            borderRadius: '30px',
            fontWeight: 600,
            fontSize: '1.1rem',
            textDecoration: 'none',
            display: 'inline-block'
          }}>
            Start Your Project
        </Link>
      </section>
    </SmoothScroll>
  )
}
