import { motion } from 'framer-motion'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SmoothScroll from '../components/SmoothScroll'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../index.css'

const projectsData: Record<string, any> = {
  'gilded-spoon': {
    title: 'The Gilded Spoon',
    tag: 'Fine Dining Turnkey Setup',
    location: 'Mumbai, Maharashtra',
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80',
    overview: 'Complete end-to-end setup for a 120-seater fine dining establishment, transforming a bare civil shell into an award-winning luxury dining venue.',
    details: [
      {
        heading: 'Menu Design & Procurement',
        text: 'Curated a bespoke 5-course tasting menu engineered for maximum gross margin while maintaining culinary excellence. Sourced 14 certified local commercial suppliers to ensure farm-to-table freshness while cutting prime food costs by 18%.',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80'
      },
      {
        heading: 'Kitchen Layout & Workflow Optimization',
        text: 'Engineered a high-throughput, ergonomic commercial kitchen layout that reduced ticket times by an average of 4 minutes during peak dinner service. The linear flow setup completely segregated prep, hot line, and scullery zones.',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80'
      },
      {
        heading: 'Staff Training & FSSAI Compliance',
        text: 'Conducted rigorous, comprehensive front-of-house and kitchen brigade training programs. Implemented daily digital audit checklists ensuring strict alignment with municipal and FSSAI hygiene standards.',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80'
      }
    ]
  },
  'aria-trattoria': {
    title: 'Aria Trattoria',
    tag: 'Operational Turnaround',
    location: 'Bengaluru, Karnataka',
    heroImage: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80',
    overview: 'Comprehensive operational efficiency audit and kitchen workflow redesign that increased table turnover by 15% during peak weekend hours.',
    details: [
      {
        heading: 'Operational Workflow Redesign',
        text: 'Identified major bottlenecks in the expediting pass. Designed a secondary plating station and introduced handheld kitchen display system (KDS) terminals, eliminating double-handling and accelerating service velocity.',
        image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80'
      },
      {
        heading: 'Staff Restructuring & Rostering Matrix',
        text: 'Rebuilt the floor and kitchen rostering matrix, decreasing overtime payroll costs by 12% while boosting floor coverage during high-volume seatings.',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80'
      }
    ]
  },
  'neo-bistro': {
    title: 'Neo Bistro',
    tag: 'Menu Engineering & Cost Control',
    location: 'Ahmedabad, Gujarat',
    heroImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80',
    overview: 'Total menu overhaul and kitchen capacity alignment reducing food waste by 12% while elevating brand positioning to a premium casual dining tier.',
    details: [
      {
        heading: 'Menu Engineering & Pricing Strategy',
        text: 'Analyzed dish profitability matrices to eliminate high-spoilage items. Redesigned menu layouts utilizing visual hierarchy principles and optimized ingredient crossover to maximize inventory rotation.',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80'
      }
    ]
  },
  'shreeji-heritage': {
    title: 'Shreeji Heritage Thali & Dining Hall',
    tag: 'Traditional Cuisines & Thali Setup',
    location: 'Ahmedabad, Gujarat',
    heroImage: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80',
    overview: 'Full turnkey engineering for a 180-seater traditional Gujarati and Kathiyawadi thali restaurant, featuring centralized steam boiler cooking, brass scullery wash lines, and a high-volume thali assembly line.',
    details: [
      {
        heading: 'Central Steam Boiler & Bulk Cooking Infrastructure',
        text: 'Engineered an automated steam jacket kettle battery for continuous preparation of dals, kadhis, and seasonal shaak. Slashed commercial LPG fuel consumption by 22% while ensuring uniform cooking temperatures.',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80'
      },
      {
        heading: 'Brass Utensil Scullery & Ghee Trap Drainage',
        text: 'Installed heavy-gauge bronze and kansa wash bays with high-temperature sanitizing rinse jets. Routed dual industrial grease interceptors designed specifically for pure-ghee residue, eliminating chronic sewer choking.',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80'
      },
      {
        heading: 'Conveyor-Style Thali Assembly Line',
        text: 'Custom-fabricated an ergonomic linear thali assembly station with recessed warming wells, cutting meal plating times to under 45 seconds during heavy festival rushes.',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80'
      }
    ]
  },
  'bohemian-grind': {
    title: 'The Bohemian Grind Restro-Café',
    tag: 'Restro-Café & Modern Bistro',
    location: 'Surat, Gujarat',
    heroImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80',
    overview: 'End-to-end design and MEP integration for an artisanal restro-café combining European all-day breakfast, specialty third-wave coffee, and bakery showcase under an ergonomic layout.',
    details: [
      {
        heading: 'Commercial Barista Counter & Water Filtration Loop',
        text: 'Engineered dedicated dual-loop reverse osmosis water treatment and 3-phase surge-protected power drops for the commercial espresso machine, preventing boiler scale and maintaining stable extraction pressure.',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80'
      },
      {
        heading: 'Compact Induction Cookline & Fresh-Air Balancing',
        text: 'Designed an energy-efficient all-electric BOH line with high-speed combi-ovens and induction ranges, keeping kitchen radiant heat ultra-low and reducing HVAC electrical loads by 15%.',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80'
      },
      {
        heading: 'Acoustic Ceiling Zoning & POS Automation',
        text: 'Positioned acoustic dampening baffles around the grinder and blenders, allowing guests to work in a peaceful ambiance while server handheld tablets accelerated table turns.',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80'
      }
    ]
  },
  'saffron-sage': {
    title: 'Saffron & Sage Multi-Cuisine',
    tag: 'Multi-Cuisine Family Dining',
    location: 'Mumbai, Maharashtra',
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80',
    overview: 'Operational turnaround and station re-engineering for a 160-seater multi-cuisine venue serving North Indian, Pan-Asian, and Continental menus with segregated prep bays and contamination prevention.',
    details: [
      {
        heading: 'Independent Production Line Zoning',
        text: 'Isolated the high-flame Chinese wok station, clay tandoor bank, and Continental pasta lines with physical stainless steel partition shields and dedicated drainage channels.',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80'
      },
      {
        heading: 'Dual-Duct ESP Exhaust & Odor Neutralization',
        text: 'Implemented an electrostatic precipitator (ESP) filtration system capturing grease aerosols and strong aromatic spices before air discharge, satisfying strict municipal environmental norms.',
        image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80'
      },
      {
        heading: 'Recipe Matrix & 32% Food Spoilage Reduction',
        text: 'Standardized common prep bases (gravies, stocks, chopped aromatics) across 60 menu items, reducing perishable inventory wastage by 32% within 60 days of rollout.',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80'
      }
    ]
  },
  'dakshin-heritage': {
    title: 'Dakshin Heritage Udupi & Tiffin House',
    tag: 'South Indian Udupi Restaurant',
    location: 'Vadodara, Gujarat',
    heroImage: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80',
    overview: 'High-throughput kitchen layout and operational blueprint for an authentic South Indian dining hall, delivering continuous dosa and tiffin service with rapid 3.5-minute average ticket times.',
    details: [
      {
        heading: 'Wet-Grinding & Fermentation Climate Room',
        text: 'Built an enclosed, climate-controlled fermentation room with insulated walls maintaining optimal 28°C temperatures year-round for uniform batter rising and texture.',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80'
      },
      {
        heading: '6-Foot Heavy-Gauge Continuous Dosa Tawa',
        text: 'Engineered a multi-burner gas manifold underneath a 20mm polished mild steel plate, achieving uniform heat distribution without center scorching or cold edges.',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80'
      },
      {
        heading: 'Rapid Turnaround Scullery & Token Integration',
        text: 'Designed a direct gravity-feed stainless steel dirty plate scullery carousel, allowing table busing in under 20 seconds and boosting lunch seating velocity by 35%.',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80'
      }
    ]
  },
  'royal-dawat': {
    title: 'Royal Dawat Mughlai & Tandoor House',
    tag: 'North Indian & Mughlai Specialties',
    location: 'Delhi NCR & Pan-India',
    heroImage: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80',
    overview: 'Complete commercial kitchen commissioning for a premium North Indian restaurant specializing in clay oven kebabs, slow-simmered dum biryani, and rich Mughlai gravies.',
    details: [
      {
        heading: 'Triple Clay Tandoor Bank with 4,500 CFM Capture Hoods',
        text: 'Designed an elevated tandoor bay lined with insulation vermiculite and a dedicated stainless steel island canopy hood balancing high-velocity thermal updrafts.',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80'
      },
      {
        heading: 'High-Flame Bhatti Gas Manifold & Safety Solenoids',
        text: 'Installed a certified heavy-duty copper gas manifold with individual station pressure gauges and emergency shut-off slam valves complying with local fire regulations.',
        image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80'
      },
      {
        heading: 'Marination Cold Chain & Dum Handi Staging',
        text: 'Fabricated customized undercounter refrigerated prep drawers holding pre-marinated kebabs at 2°C to 4°C, preventing bacterial growth and accelerating tandoori ticket times.',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80'
      }
    ]
  },
  'currybox': {
    title: 'CurryBox Multi-Brand Cloud Kitchen',
    tag: 'Cloud Kitchen & Delivery Cluster',
    location: 'Pune, Maharashtra',
    heroImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80',
    overview: 'Bare-shell conversion into a high-capacity 1,200 sq.ft. commercial dark kitchen hosting 6 virtual brands with consolidated storage, central prep lines, and unified delivery dispatch.',
    details: [
      {
        heading: 'Multi-Brand Shared Cold Storage & Prep Layout',
        text: 'Created color-coded walk-in cooler storage racks and shared bulk prep stations, minimizing equipment redundancy and maximizing square-foot revenue output.',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80'
      },
      {
        heading: 'Automated Dispatch Counter & Courier Vestibule',
        text: 'Integrated heated pass-through holding shelves and a separate external delivery rider entrance, keeping couriers out of the sanitary cooking zone.',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80'
      }
    ]
  }
}

export default function ProjectDetail() {
  const { id } = useParams()
  
  if (!id || !projectsData[id]) {
    return <Navigate to="/portfolio" />
  }

  const project = projectsData[id]
  const canonicalUrl = `https://jrconsultancy.in/project/${id}`

  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    'headline': `${project.title} - Restaurant Client Transformation | JR Consulting`,
    'description': project.overview,
    'image': project.heroImage,
    'author': {
      '@type': 'Person',
      'name': 'Jigar Rajgor',
      'jobTitle': 'Civil Engineer & Restaurant Setup Consultant'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'JR Consulting',
      'url': 'https://jrconsultancy.in'
    },
    'mainEntityOfPage': canonicalUrl
  }

  const springUp = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100, damping: 20 } }
  }

  return (
    <SmoothScroll>
      <Helmet>
        <title>{`${project.title} | Restaurant Client Transformation | JR Consulting`}</title>
        <meta name="description" content={project.overview} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`${project.title} - JR Consulting Client Transformation`} />
        <meta property="og:description" content={project.overview} />
        <meta property="og:image" content={project.heroImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify(projectSchema)}
        </script>
      </Helmet>

      <Header />

      <main style={{ paddingTop: '100px' }}>
        {/* Breadcrumb Navigation */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem clamp(1rem, 4vw, 2.5rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link to="/portfolio" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Client Transformations</Link>
            <span>/</span>
            <span style={{ color: 'var(--color-accent)' }}>{project.title}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section style={{ 
          position: 'relative',
          minHeight: '55vh', 
          display: 'flex', 
          alignItems: 'flex-end', 
          padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
          background: `linear-gradient(rgba(9, 14, 10, 0.55), rgba(9, 14, 10, 0.96)), url("${project.heroImage}") center/cover`
        }}>
          <motion.div initial="hidden" animate="visible" variants={springUp} style={{ maxWidth: '900px', position: 'relative', zIndex: 10 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '6px 14px', borderRadius: '30px', background: 'rgba(196,154,108,0.15)', border: '1px solid rgba(196,154,108,0.3)', marginBottom: '1.25rem' }}>
              <span style={{ color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700, fontSize: '0.75rem' }}>{project.tag}</span>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>•</span>
              <span style={{ color: '#fff', fontSize: '0.75rem' }}>{project.location}</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', fontFamily: 'var(--font-heading)', margin: '0 0 1.5rem 0', color: '#fff', textShadow: '0 4px 12px rgba(0,0,0,0.3)', lineHeight: 1.15 }}>{project.title}</h1>
            <p style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, maxWidth: '780px' }}>{project.overview}</p>
          </motion.div>
        </section>

        {/* Details Section */}
        <section style={{ padding: 'clamp(4rem, 7vw, 7rem) clamp(1.25rem, 5vw, 4rem)', background: 'var(--color-bg)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(4rem, 7vw, 6rem)' }}>
            {project.details.map((detail: any, index: number) => (
              <motion.div 
                key={index}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={springUp}
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: index % 2 === 0 ? 'repeat(auto-fit, minmax(300px, 1fr))' : 'repeat(auto-fit, minmax(300px, 1fr))', 
                  gap: 'clamp(2.5rem, 5vw, 4.5rem)', 
                  alignItems: 'center' 
                }}
              >
                <div style={{ order: index % 2 === 1 ? 2 : 1 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(196,154,108,0.15)', color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '1rem', border: '1px solid rgba(196,154,108,0.3)' }}>
                    0{index + 1}
                  </div>
                  <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', marginBottom: '1.2rem', color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>{detail.heading}</h2>
                  <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'var(--color-text-muted)', lineHeight: 1.75 }}>{detail.text}</p>
                </div>
                <div style={{ order: index % 2 === 1 ? 1 : 2 }}>
                  <img src={detail.image} alt={detail.heading} style={{ width: '100%', height: '340px', objectFit: 'cover', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.35)', border: '1px solid rgba(196,154,108,0.2)' }} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Other Projects / Navigation */}
        <section style={{ padding: '3rem clamp(1.5rem, 5vw, 4rem)', background: 'rgba(7, 12, 8, 0.8)', borderTop: '1px solid rgba(196,154,108,0.1)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <Link to="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 600 }}>
              ← View All Client Transformations
            </Link>
            <Link to="/start" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-accent)', color: '#050806', padding: '0.8rem 1.8rem', borderRadius: '30px', fontWeight: 700, textDecoration: 'none' }}>
              Commission Your Project →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </SmoothScroll>
  )
}
