import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import SmoothScroll from '../components/SmoothScroll'
import SpotlightCard from '../components/SpotlightCard'
import '../index.css'

export default function Landing() {
  const { slug } = useParams()
  
  // React Router v6 doesn't support partial path parameters, so we manually parse the slug.
  // e.g., "kitchen-design-in-ahmedabad" -> service: "kitchen-design", location: "ahmedabad"
  let serviceParam = 'restaurant-consultant'
  let locationParam = 'india'
  
  if (slug && slug.includes('-in-')) {
    const parts = slug.split('-in-')
    serviceParam = parts[0]
    locationParam = parts[1]
  } else if (slug) {
    locationParam = slug
  }

  // Format the URL parameters into clean strings (e.g., "mumbai" -> "Mumbai", "kitchen-design" -> "Kitchen Design")
  const formattedLocation = locationParam.charAt(0).toUpperCase() + locationParam.slice(1).replace(/-/g, ' ')
  const formattedService = serviceParam.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

  // Dynamic SEO Data
  const pageTitle = `Top ${formattedService} in ${formattedLocation} | JR Consulting`
  const metaDescription = `Looking for the best ${formattedService.toLowerCase()} in ${formattedLocation}? JR Consulting provides expert end-to-end restaurant setup and operational turnaround in ${formattedLocation}.`

  return (
    <SmoothScroll>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={`${formattedService} ${formattedLocation}, restaurant setup ${formattedLocation}, commercial kitchen design ${formattedLocation}, restaurant operations ${formattedLocation}`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
      </Helmet>

      {/* Simple Nav */}
      <nav className="nav-ios" style={{ position: 'absolute' }}>
        <div className="nav-ios-container" style={{ width: '100%', maxWidth: '1200px', justifyContent: 'space-between' }}>
          <Link to="/" className="nav-logo" style={{ textDecoration: 'none' }}>
            <h1>JR CONSULTING</h1>
            <span>RESTAURANT SET-UP & OPERATIONS</span>
          </Link>
          <div className="nav-ios-links">
            <Link to="/start" style={{ 
              background: 'var(--color-accent)', 
              color: 'var(--color-primary-dark)', 
              padding: '0.6rem 1.5rem', 
              borderRadius: '30px',
              fontWeight: 600
            }}>
              Start Project
            </Link>
          </div>
        </div>
      </nav>

      {/* Programmatic Hero Section */}
      <section className="hero-ios" style={{ minHeight: '80vh' }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hero-subtitle">
          Expert Services in {formattedLocation}
        </motion.p>
        <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="hero-title" style={{ maxWidth: '1000px', fontSize: '5rem' }}>
          The Premier <br/><span style={{ color: 'var(--color-accent)' }}>{formattedService}</span> <br/>in {formattedLocation}.
        </motion.h1>
        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="hero-sub-desc" style={{ maxWidth: '700px', fontSize: '1.25rem', margin: '2rem auto' }}>
          {metaDescription}
        </motion.p>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
           <Link to="/start" className="btn-primary">Get a Consultation in {formattedLocation}</Link>
        </motion.div>
      </section>

      {/* Dynamic Trust Section */}
      <section className="bento-section">
        <SpotlightCard className="bento-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h3 style={{ color: 'var(--color-text)', fontSize: '2rem', marginBottom: '1rem' }}>Why choose JR Consulting in {formattedLocation}?</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            With over 15 years of civil engineering and 10+ years of restaurant industry expertise, we understand the unique local market dynamics of {formattedLocation}.
          </p>
        </SpotlightCard>
      </section>
    </SmoothScroll>
  )
}
