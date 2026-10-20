import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SmoothScroll from '../components/SmoothScroll'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SpotlightCard from '../components/SpotlightCard'
import '../index.css'

export default function CaseStudiesPage() {
  const [filter, setFilter] = useState('all')
  const [selectedType, setSelectedType] = useState('traditional-indian')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLElement>(null)
  const isFooterInView = useInView(footerRef, { margin: "0px 0px -100px 0px" })

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const springUp: any = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
  }

  // Comprehensive Dummy List of All Possible Restaurant & Café Formats in Consulting Scope
  const restaurantAndCafeTypes = [
    {
      id: 'traditional-indian',
      name: 'Traditional Regional Cuisines',
      subtext: 'Gujarati Thali, Kathiyawadi, Rajasthani & Awadhi Dining',
      icon: '🍛',
      category: 'Regional Indian',
      description: 'High-volume regional Indian thali setups requiring centralized steam kettle boilers, brass utensil scullery bays, continuous thali assembly conveyors, and heavy ghee-separating drainage traps.'
    },
    {
      id: 'restro-cafe',
      name: 'Restro-Café & Modern Bistro',
      subtext: 'European All-Day Dining, Bakeries & Artisanal Small Plates',
      icon: '☕',
      category: 'Cafes & Bistros',
      description: 'Aesthetic social dining combining an inviting front-of-house with a compact, low-heat electric induction cookline, high-speed combi-ovens, and acoustic zoning.'
    },
    {
      id: 'multi-cuisine',
      name: 'Multi-Cuisine Family Restaurants',
      subtext: 'North Indian, Pan-Asian Wok & Continental Dining Venues',
      icon: '🥘',
      category: 'Full-Service Dining',
      description: 'Zoned kitchen engineering preventing cross-contamination between Indian curry, Chinese high-pressure wok, and Continental grill lines with dual-duct ESP electrostatic smoke filtration.'
    },
    {
      id: 'south-indian',
      name: 'South Indian Restaurants & Tiffin Centers',
      subtext: 'Authentic Udupi, Chettinad, Dosa Bars & Quick Tiffin Hubs',
      icon: '🥥',
      category: 'Regional Indian',
      description: 'High-throughput Udupi kitchens with climate-controlled batter fermentation rooms, motorized stone wet-grinders, 6-foot continuous gas dosa tawas, and rapid 3-minute service cadence.'
    },
    {
      id: 'north-indian-mughlai',
      name: 'North Indian, Mughlai & Tandoor Houses',
      subtext: 'Clay Tandoors, Dum Biryani, Kebab Grills & Handi Specialties',
      icon: '🍢',
      category: 'Regional Indian',
      description: 'Clay oven tandoor banks requiring 4,500+ CFM dedicated high-velocity heat exhaust, high-flame Bhatti gas manifolds with safety slam shutoffs, and cold-chain meat marination stations.'
    },
    {
      id: 'pure-veg-family',
      name: 'Pure Vegetarian Family Dining',
      subtext: '100% Pure Veg Fine Dining, Jain-Friendly & Multi-Generation Venues',
      icon: '🥗',
      category: 'Full-Service Dining',
      description: 'Strict vegetarian segregation, dedicated Jain food preparation stations, high-capacity table arrangements, and rapid Sunday family rush expediting passes.'
    },
    {
      id: 'artisan-coffee-bar',
      name: 'Specialty Coffee Bars & Roasteries',
      subtext: 'Third-Wave Espresso Bars, Pour-Over Counters & In-House Roasters',
      icon: '🫘',
      category: 'Cafes & Bistros',
      description: 'Commercial barista counter MEP with dual-loop reverse osmosis water treatment, 3-phase surge-protected power, direct under-counter knock-box drainage, and acoustic isolation.'
    },
    {
      id: 'bakery-patisserie',
      name: 'Artisan Bakery & Patisserie',
      subtext: 'French Pastries, Viennoiserie, Sourdough Bread & Custom Cake Studios',
      icon: '🥐',
      category: 'Cafes & Bistros',
      description: 'Humidity-controlled pastry dough sheeting rooms (18°C), deck baking ovens with independent steam injection, proofing chambers, and temperature-zoned refrigerated showcases.'
    },
    {
      id: 'qsr-fast-food',
      name: 'Quick Service Restaurants (QSR)',
      subtext: 'Burger Joints, Fried Chicken Chains, Wrap & Roll Counters',
      icon: '🍔',
      category: 'Fast Casual & QSR',
      description: 'Engineered for sub-90-second ticket times with automated fryers with built-in oil filtration, burger assembly chutes, KDS bump bars, and self-ordering kiosk integration.'
    },
    {
      id: 'artisanal-pizzeria',
      name: 'Artisanal Pizzerias & Italian Trattorias',
      subtext: 'Neapolitan Wood-Fired Pizza, Hand-Tossed Slices & Fresh Pasta Bars',
      icon: '🍕',
      category: 'Fast Casual & QSR',
      description: 'High-temperature stone/wood-fired oven installation (450°C) with dedicated triple-wall flue chimney draft, refrigerated marble pizza prep lines, and dough fermentation retarders.'
    },
    {
      id: 'pan-asian-sushi',
      name: 'Pan-Asian, Sushi Bars & Dim Sum Houses',
      subtext: 'Thai, Chinese, Dim Sum Steamers, Teppanyaki & Japanese Robata',
      icon: '🥢',
      category: 'Global Speciality',
      description: 'High-pressure turbo wok burners with direct water knee-valves, dedicated bamboo steamer stations, refrigerated sushi counter displays, and specialized grease traps.'
    },
    {
      id: 'cloud-kitchen-hub',
      name: 'Cloud Kitchens & Dark Kitchen Hubs',
      subtext: 'Multi-Brand Delivery Clusters, Ghost Kitchens & Virtual Outlets',
      icon: '🛵',
      category: 'Production & Delivery',
      description: 'Modular shared kitchen pods, consolidated walk-in chillers, unified packaging counters with heated staging lamps, and isolated courier pickup handoff bays.'
    },
    {
      id: 'fine-dining-lounge',
      name: 'Fine Dining & Luxury Lounges',
      subtext: 'Chef-Driven Tasting Menus, Sommelier Cellars & Supper Clubs',
      icon: '🍷',
      category: 'Full-Service Dining',
      description: 'Bespoke finishing passes with precision heat lamps, dual-zone wine cellars maintaining 14°C, whisper-quiet ventilation, and luxury acoustic spatial planning.'
    },
    {
      id: 'rooftop-restro-bar',
      name: 'Rooftop & Open-Air Restro-Bars',
      subtext: 'Sky Lounges, Penthouse Terraces & Sunset Cocktail Venues',
      icon: '🌆',
      category: 'Nightlife & Bars',
      description: 'Weather-resistant stainless equipment enclosures, high-wind exhaust duct anchoring, service dumbwaiter integration from BOH ground kitchens, and perimeter fire-pit safety.'
    },
    {
      id: 'microbrewery-taproom',
      name: 'Microbreweries & Craft Taprooms',
      subtext: 'On-Premise Brew Houses, Fermentation Tank Yards & Beer Gardens',
      icon: '🍺',
      category: 'Nightlife & Bars',
      description: 'Brew-kettle steam and chiller MEP, glycol cooling line distribution, heavy structural slab load engineering for fermentation tanks, and excise department compliant zoning.'
    },
    {
      id: 'highway-dhaba',
      name: 'Highway Dhabas & Family Highway Stops',
      subtext: 'Expansive Highway Dining, Open Tandoor & High-Turnover Pit Stops',
      icon: '🚜',
      category: 'Regional Indian',
      description: 'Expansive parking-adjacent footprint planning, fast-turnover kitchen lines, robust bulk prep areas, industrial water storage, and heavy-duty LPG manifold installations.'
    },
    {
      id: 'buffet-banquet',
      name: 'Buffets, Banquets & Commercial Catering',
      subtext: 'Unlimited Food Spread Halls, Wedding Venues & Institutional F&B',
      icon: '🍲',
      category: 'Full-Service Dining',
      description: 'Massive capacity combi-ovens, mobile heated banquet trolleys, walk-in cold rooms for 2,000+ covers, dishwash carousel tunnels, and loading dock logistics.'
    },
    {
      id: 'tea-lounge-chai',
      name: 'Tea Lounges & Modern Chai Bars',
      subtext: 'Boutique Chai Kiosks, High-Tea Lounges & Artisanal Brew Concepts',
      icon: '🫖',
      category: 'Cafes & Bistros',
      description: 'Rapid-boil induction tea brewing banks, automated milk dispensing and chilling, compact snack warmers, and high-velocity counter service layouts.'
    },
    {
      id: 'dessert-ice-cream',
      name: 'Ice Cream Parlours & Dessert Bars',
      subtext: 'Artisan Gelaterias, Nitrogen Ice Cream & Waffle / Crepe Lounges',
      icon: '🍨',
      category: 'Fast Casual & QSR',
      description: 'High-power batch freezers, blast freezing cabinets (-40°C), continuous soft-serve machines, dipping cabinets, and dry topping display integration.'
    },
    {
      id: 'food-court-kiosk',
      name: 'Food Court & Mall Kiosks',
      subtext: 'Compact 150-300 sq.ft. High-Density Commercial Kitchen Pods',
      icon: '🏪',
      category: 'Fast Casual & QSR',
      description: 'Micro-footprint space planning maximizing every inch, ventless cooking hood technology, plug-and-play plumbing, and strict mall fire & MEP compliance.'
    },
    {
      id: 'coastal-seafood',
      name: 'Coastal & Seafood Specialty Dining',
      subtext: 'Malabar, Mangalorean, Goan & Konkan Fresh Catch Venues',
      icon: '🦐',
      category: 'Regional Indian',
      description: 'Dedicated odor-isolated fish cleaning sculleries, deep-freeze walk-in refrigeration maintaining -18°C, specialized seafood display counters, and live cooking ranges.'
    },
    {
      id: 'shawarma-rolls',
      name: 'Shawarma, Rolls & Kebab Takeaways',
      subtext: 'Vertical Broiler Stations, Middle Eastern Wraps & Quick Grills',
      icon: '🌯',
      category: 'Fast Casual & QSR',
      description: 'Front-facing vertical gas rotisseries with dedicated glass sneeze-guards, localized exhaust hood capture, rapid flatbread warming grills, and cold condiment wells.'
    },
    {
      id: 'mexican-taqueria',
      name: 'Mexican & Tex-Mex Taquerias',
      subtext: 'Taco Bars, Burrito Assembly Lines & Nacho Cantinas',
      icon: '🌮',
      category: 'Global Speciality',
      description: 'Flat-top chrome planchas, heated chip warmers, cold salsa bar wells, cheese melting salamanders, and fast-casual assembly ergonomics.'
    },
    {
      id: 'healthy-vegan-cafe',
      name: 'Healthy, Salad & Vegan Cafes',
      subtext: 'Organic Grain Bowls, Cold-Pressed Juiceries & Superfood Dining',
      icon: '🥑',
      category: 'Cafes & Bistros',
      description: 'Cold-room temperature controlled prep bays for fresh produce, commercial hydraulic juice presses, blast chillers, and zero-cross-contamination allergen workflows.'
    },
    {
      id: 'book-work-cafe',
      name: 'Co-Working Cafes & Book Lounges',
      subtext: 'Laptop-Friendly Workspaces, Library Lounges & Quiet Dining Spots',
      icon: '📚',
      category: 'Cafes & Bistros',
      description: 'Low-decibel quiet kitchen operations, extensive power-drop spatial planning, ergonomic long-dwell seating, and quiet barista counter operations.'
    },
    {
      id: 'cocktail-gastro-pub',
      name: 'Cocktail Lounges & Gastro-Pubs',
      subtext: 'Craft Cocktail Wells, Tapas Bars & High-Energy Nightspots',
      icon: '🍸',
      category: 'Nightlife & Bars',
      description: 'Commercial speed-rail cocktail wells with integrated ice bins and glass rinsers, keg walk-in coolers with beer line refrigeration, and acoustic wall dampening.'
    }
  ]

  // Actual Portfolio Showcase Projects (Authentic Client Transformations Only - No Fake Projects)
  const projects = [
    {
      id: 'gilded-spoon',
      title: 'The Gilded Spoon',
      category: 'fine-dining',
      categoryLabel: 'Fine Dining Turnkey',
      tag: 'Featured Project',
      stats: '120 Seats | Bare Shell to Opening | 18% CAPEX Savings',
      desc: 'Complete end-to-end setup transforming a raw concrete shell into an award-winning venue with bespoke linear kitchen flow, SS304 fabrication, and complete FSSAI licensing.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80',
      highlights: ['Menu Engineering & 14-Vendor Supply Chain', 'Kitchen CAD Flow reducing ticket time by 4 mins', 'Staff Hygiene SOPs & First-Time FSSAI Pass']
    },
    {
      id: 'aria-trattoria',
      title: 'Aria Trattoria',
      category: 'turnaround',
      categoryLabel: 'Operational Turnaround',
      tag: 'Speed & Turnover',
      stats: '+15% Table Turns | 12% Lower Labor Cost',
      desc: 'Comprehensive operational efficiency review and kitchen expediting redesign that eliminated Friday night dinner rush bottlenecks and increased table turnover by 15%.',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80',
      highlights: ['Time-motion analysis of expo line & plating station', 'Handheld server POS rollout eliminating double-entry', 'Floor coverage matrix restructuring']
    },
    {
      id: 'luna-bistro',
      title: 'Luna Bistro',
      category: 'new-build',
      categoryLabel: 'New Build & MEP',
      tag: 'Civil Engineering',
      stats: 'Full MEP Sign-off | Industrial Grease Traps',
      desc: 'End-to-end commercial kitchen planning from civil shell inspection to duct ventilation balancing, industrial grease interceptor routing, and trial menu calibration.',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80',
      highlights: ['Civil & architectural MEP sign-off', 'Commercial exhaust & fresh air CFM balancing', 'Trial operations and trial service stress test']
    },
    {
      id: 'neo-bistro',
      title: 'Neo Bistro',
      category: 'turnaround',
      categoryLabel: 'Menu & Margin Audit',
      tag: 'Profit Optimization',
      stats: '12% Food Cost Reduction | Elevated Brand',
      desc: 'Total menu overhaul using eye-tracking principles and ingredient cross-utilization to reduce food waste and elevate contribution margins across 45 menu items.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80',
      highlights: ['Stars vs plow-horses sales mix analysis', 'Ingredient crossover to eliminate perishable spoilage', 'Kitchen prep line re-allocation']
    }
  ]

  const currentType = restaurantAndCafeTypes.find(t => t.id === selectedType) || restaurantAndCafeTypes[0]

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter)

  const workCategories = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
        </svg>
      ),
      heading: 'New Restaurant Setup',
      items: [
        'Full Turnkey Restaurant Launch (Bare Shell to Opening Day)',
        'Cloud Kitchen / Dark Kitchen Setup',
        'Quick Service Restaurant (QSR) Format Build-out',
        'Fine Dining & Supper Club Establishment',
        'Café, Bakery & Patisserie Setup',
        'Food Court Stall & Kiosk Commissioning',
        'Hotel Kitchen & Banquet Hall Setup',
        'Rooftop & Outdoor Dining Space Planning',
      ]
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/><path d="M15 15h.01"/>
        </svg>
      ),
      heading: 'Kitchen Engineering & Design',
      items: [
        'Ergonomic Commercial Kitchen CAD Layout & Flow Design',
        'MEP Engineering (Plumbing, Exhaust, Electrical)',
        'Stainless Steel Equipment BOQ & Specification Writing',
        'Industrial Exhaust Hood CFM Calculation & Balancing',
        'Grease Trap & Interceptor Sizing and Routing',
        'Gas Manifold & LPG/PNG Piping Layout',
        'Cold Room & Walk-in Chiller Space Planning',
        'Dishwash Area & Drainage Channel Design',
      ]
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3h18v18H3z"/><path d="M21 9H3"/><path d="M21 15H3"/><path d="M12 3v18"/>
        </svg>
      ),
      heading: 'Operational Turnaround',
      items: [
        'Kitchen Bottleneck & Throughput Analysis',
        'Table Turnover & Service Speed Audit',
        'Food Cost & Recipe Margin Review',
        'Inventory Control & Wastage Reduction',
        'FOH & BOH Communication Systems Redesign',
        'Peak Hour Rush Management & Staffing Matrix',
        'POS System Evaluation & Workflow Integration',
        'Supplier Renegotiation & Procurement Audit',
      ]
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
      ),
      heading: 'Licensing & Compliance',
      items: [
        'FSSAI Basic / State / Central License Documentation',
        'Schedule 4 Sanitary Zoning & Hygienic Design Sign-off',
        'Fire NOC Kitchen Duct & Suppression System Guidance',
        'Municipal Health Department Inspection Preparation',
        'Eating House License Application Support',
        'HACCP Standard Operating Procedure Drafting',
        'Food Safety Audit & Mock Inspection',
        'Pre-Licensing Kitchen Readiness Checklist',
      ]
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 8v4l3 3"/>
        </svg>
      ),
      heading: 'Menu & Concept Development',
      items: [
        'Full Menu Engineering & Menu Psychology Design',
        'Recipe Costing & Contribution Margin Analysis',
        'Stars & Plow Horses Sales Mix Profitability Study',
        'Ingredient Cross-Utilization & Waste Reduction Plan',
        'Multi-Cuisine to Focused Menu Concept Restructure',
        'Beverage Programme & Bar Menu Planning',
        'Seasonal & Rotating Menu Planning Framework',
        'Tasting Session Management & Calibration Support',
      ]
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      heading: 'Staffing & Training',
      items: [
        'Manpower Planning & Organisational Chart Design',
        'FOH Staff Recruitment Brief & Interview Framework',
        'Kitchen Brigade Hierarchy & Role Definition',
        'BOH Standard Operating Procedure (SOP) Manuals',
        'Service Etiquette & Upselling Skills Training',
        'Hygiene, Safety & FSSAI Food Handler Training',
        'Soft Launch Dry Run Management & Feedback Loop',
        'Post-Opening 30-Day Performance Review',
      ]
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
        </svg>
      ),
      heading: 'MEP & Civil Infrastructure',
      items: [
        'Electrical Load Calculation & Phase Balancing for Heavy Equipment',
        'High-Pressure Water Supply & Commercial Plumbing Schematics',
        'Kitchen Ventilation CFM & Make-Up Air Heat Balancing',
        'Floor Drainage Gradients & Industrial Water-Proofing Design',
        'Commercial Kitchen Anti-Slip Flooring & Wall Cladding Specs',
        'Ansul Fire Suppression System Layout & Verification',
        'Acoustic Dampening & Noise Vibration Control',
        'Civil Contractor On-Site Quality Audits & Defect Rectification',
      ]
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
      ),
      heading: 'Tech Stack & Multi-Unit Scaling',
      items: [
        'POS & Kitchen Display System (KDS) Architecture Selection',
        'Inventory ERP, Recipe Yields & Auto-Reorder Automation',
        'Guest Loyalty, Table Reservation & CRM Integration',
        'Swiggy/Zomato Aggregator Menu & Pricing Matrix Setup',
        'Central Commissary Kitchen Blueprint & Hub-and-Spoke Flow',
        'Standard Franchise Operations Manual (FOM) Drafting',
        'Multi-Outlet Brand Consistency & Mystery Audit Frameworks',
        'Vendor Contracts, Credit Negotiation & Master Sourcing',
      ]
    },
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "JR Consulting Client Transformations",
    "description": "Proven restaurant and commercial kitchen projects across India — turnkey launches, operational turnarounds, and kitchen engineering."
  }

  return (
    <SmoothScroll>
      <Helmet>
        <title>Client Transformations & Proven Results | JR Consulting</title>
        <meta name="description" content="Explore JR Consulting's client transformations: The Gilded Spoon, Aria Trattoria, Luna Bistro, and Neo Bistro. Results-driven restaurant consulting across India." />
        <link rel="canonical" href="https://www.jrconsulting.in/portfolio" />
        <meta property="og:title" content="Client Transformations & Proven Results | JR Consulting" />
        <meta property="og:description" content="Explore real projects showing measurable restaurant turnarounds and turnkey setups." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Header isFooterInView={isFooterInView} />

      <section style={{ paddingTop: 'clamp(9rem, 14vw, 12rem)', paddingBottom: '4rem', paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)', maxWidth: '1300px', margin: '0 auto' }}>
        <motion.div initial="hidden" animate="visible" variants={springUp} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem' }}>
            <Link to="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.85rem' }}>Home</Link>
            <span style={{ color: 'var(--color-accent)', fontSize: '0.85rem' }}>/</span>
            <span style={{ color: 'var(--color-accent)', fontSize: '0.85rem', fontWeight: 600 }}>Client Transformations</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', fontFamily: 'var(--font-heading)', lineHeight: 1.15, marginBottom: '1.5rem', color: 'var(--color-text)' }}>
            Proven Results.<br />
            <span style={{ color: 'var(--color-accent)', fontWeight: 'normal' }}>
              Client Transformations.
            </span>
          </h1>

          <p style={{ color: 'var(--color-text-muted)', fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', maxWidth: '750px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            Explore how our civil engineering rigor and operational audits deliver faster service, lower food costs, and flawless launches for restaurant owners across India.
          </p>

          {/* ── All Restaurant & Café Types in Consultancy Scope (Dummy Dropdown Catalogue) ── */}
          <div style={{ maxWidth: '900px', margin: '0 auto 3.5rem', position: 'relative' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}>
              
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--color-accent)', fontWeight: 700 }}>
                  Consultancy Capability Directory
                </span>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', margin: '0.35rem 0 0' }}>
                  Select any restaurant or café format to view our technical layout and setup scope:
                </p>
              </div>

              {/* Dropdown Header Trigger */}
              <div ref={dropdownRef} style={{ position: 'relative', width: '100%', maxWidth: '580px' }}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  style={{
                    width: '100%',
                    padding: '0.95rem 1.4rem',
                    borderRadius: '16px',
                    border: '1.5px solid var(--color-accent)',
                    background: 'rgba(9, 14, 10, 0.95)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 15px rgba(196, 154, 108, 0.15)',
                    backdropFilter: 'blur(16px)',
                    color: 'var(--color-text)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}
                  aria-expanded={isDropdownOpen}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', textAlign: 'left' }}>
                    <span style={{ fontSize: '1.4rem' }}>{currentType?.icon || '🍽️'}</span>
                    <div>
                      <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-accent)', fontWeight: 600 }}>
                        {currentType?.category} Format
                      </div>
                      <div style={{ fontSize: '1.02rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-heading)' }}>
                        {currentType?.name}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{
                      background: 'rgba(196, 154, 108, 0.18)',
                      color: 'var(--color-accent)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '12px'
                    }}>
                      26 Formats
                    </span>
                    <svg
                      width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                      style={{
                        transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease',
                        color: 'var(--color-accent)'
                      }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {/* Dropdown Floating Menu with all 26 types */}
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      left: 0,
                      right: 0,
                      zIndex: 100,
                      background: 'rgba(8, 13, 9, 0.98)',
                      border: '1px solid rgba(196, 154, 108, 0.35)',
                      borderRadius: '18px',
                      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.85), 0 0 30px rgba(196, 154, 108, 0.2)',
                      backdropFilter: 'blur(20px)',
                      padding: '0.6rem',
                      maxHeight: '440px',
                      overflowY: 'auto'
                    }}
                  >
                    <div style={{ padding: '0.5rem 0.8rem 0.6rem', borderBottom: '1px solid rgba(196, 154, 108, 0.15)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-accent)', fontWeight: 700 }}>
                      All Possible Types of Restaurants & Cafes We Consult For:
                    </div>
                    {restaurantAndCafeTypes.map(type => {
                      const isActive = selectedType === type.id

                      return (
                        <div
                          key={type.id}
                          onClick={() => {
                            setSelectedType(type.id)
                            setIsDropdownOpen(false)
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.75rem 0.9rem',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            background: isActive ? 'rgba(196, 154, 108, 0.18)' : 'transparent',
                            border: isActive ? '1px solid rgba(196, 154, 108, 0.4)' : '1px solid transparent',
                            margin: '3px 0',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) e.currentTarget.style.background = 'transparent'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ fontSize: '1.25rem' }}>{type.icon}</span>
                            <div>
                              <div style={{ fontWeight: isActive ? 700 : 600, color: isActive ? 'var(--color-accent)' : '#fff', fontSize: '0.92rem' }}>
                                {type.name}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.3 }}>
                                {type.subtext}
                              </div>
                            </div>
                          </div>
                          {isActive && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                      )
                    })}
                  </motion.div>
                )}
              </div>

            </div>

            {/* Selected Format Consultancy Scope Breakdown Card */}
            {currentType && (
              <motion.div
                key={currentType.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  marginTop: '1.5rem',
                  padding: '1.5rem 2rem',
                  borderRadius: '22px',
                  background: 'linear-gradient(135deg, rgba(196, 154, 108, 0.08) 0%, rgba(5, 8, 6, 0.95) 100%)',
                  border: '1px solid rgba(196, 154, 108, 0.28)',
                  boxShadow: '0 12px 35px rgba(0, 0, 0, 0.35)',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ fontSize: '1.35rem' }}>{currentType.icon}</span>
                    <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-heading)' }}>
                      {currentType.name}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-accent)', fontWeight: 700, background: 'rgba(196, 154, 108, 0.15)', padding: '4px 12px', borderRadius: '14px' }}>
                    {currentType.category}
                  </span>
                </div>
                <p style={{ color: 'var(--color-text)', fontSize: '0.94rem', lineHeight: 1.6, margin: '0 0 0.8rem' }}>
                  {currentType.description}
                </p>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-accent)', fontStyle: 'italic' }}>
                  JR Consulting delivers turnkey space feasibility, commercial kitchen layout, equipment selection, and MEP sign-off for {currentType.name.toLowerCase()}.
                </div>
              </motion.div>
            )}
          </div>

          {/* ── Client Transformations Portfolio Section Filter ── */}
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-heading)', color: 'var(--color-text)', marginBottom: '1rem' }}>
              Featured Client Projects
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'All Projects' },
                { id: 'fine-dining', label: 'Fine Dining' },
                { id: 'turnaround', label: 'Operational Turnaround' },
                { id: 'new-build', label: 'New Build & MEP' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  style={{
                    padding: '0.55rem 1.3rem',
                    borderRadius: '30px',
                    border: filter === tab.id ? '1px solid var(--color-accent)' : '1px solid rgba(196, 154, 108, 0.25)',
                    background: filter === tab.id ? 'var(--color-accent)' : 'rgba(253, 251, 247, 0.04)',
                    color: filter === tab.id ? 'var(--color-primary-dark)' : 'var(--color-text)',
                    fontWeight: filter === tab.id ? 700 : 500,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2.5rem', marginBottom: '7rem' }}>
          {filteredProjects.map((proj, i) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link to={`/project/${proj.id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                <SpotlightCard
                  className="bento-card"
                  style={{
                    height: '100%',
                    padding: '2.5rem',
                    borderRadius: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundImage: `linear-gradient(rgba(9, 14, 10, 0.92), rgba(5, 8, 6, 0.98)), url(${proj.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span className="bento-tag" style={{ margin: 0 }}>{proj.tag}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: 600 }}>{proj.categoryLabel}</span>
                  </div>

                  <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', color: 'var(--color-text)', marginBottom: '0.6rem' }}>
                    {proj.title}
                  </h2>

                  <div style={{ fontSize: '0.85rem', color: 'var(--color-accent)', fontWeight: 600, marginBottom: '1.2rem', letterSpacing: '0.5px' }}>
                    {proj.stats}
                  </div>

                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.8rem' }}>
                    {proj.desc}
                  </p>

                  <div style={{ borderTop: '1px solid rgba(196, 154, 108, 0.15)', paddingTop: '1.2rem', marginBottom: '2rem' }}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {proj.highlights.map((h, hIdx) => (
                        <li key={hIdx} style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', lineHeight: 1.5 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '0.2rem' }}>
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-accent)', fontWeight: 600, fontSize: '0.95rem' }}>
                    <span>View Full Transformation</span>
                    <span>&rarr;</span>
                  </div>
                </SpotlightCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ── Scope of Work — What We Do ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={springUp}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <p className="bento-tag" style={{ display: 'inline-block', marginBottom: '1rem' }}>Full Scope of Work</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontFamily: 'var(--font-heading)', color: 'var(--color-text)', margin: '0 0 1.2rem' }}>
            Every Type of Consultancy We Handle.
            <br />
            <span style={{ color: 'var(--color-accent)', fontWeight: 400 }}>From blueprint to opening night.</span>
          </h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Whether you are building from a bare shell, rescuing a struggling operation, or engineering a commercial kitchen to code — this is the full range of work we deliver across India.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem', marginBottom: '7rem' }}>
          {workCategories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              <SpotlightCard className="bento-card" style={{ padding: '2.2rem', borderRadius: '24px', height: '100%', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '12px',
                    background: 'rgba(196, 154, 108, 0.12)',
                    border: '1px solid rgba(196, 154, 108, 0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--color-accent)', flexShrink: 0
                  }}>
                    {cat.icon}
                  </div>
                  <h3 style={{ fontSize: '1.12rem', fontFamily: 'var(--font-heading)', color: 'var(--color-text)', margin: 0, lineHeight: 1.3 }}>
                    {cat.heading}
                  </h3>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  {cat.items.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
                      <span style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0, marginTop: '0.05rem' }}>—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Client Logos Strip */}
        <div className="clients-section" style={{ borderBottom: '1px solid rgba(196, 154, 108, 0.15)', marginBottom: '6rem' }}>
          <p className="clients-label">Trusted by restaurant owners across India</p>
          <div className="clients-logos">
            {[
              'The Gilded Spoon', 'Aria Trattoria', 'Luna Bistro', 'Neo Bistro',
              'Café Noir', 'The Amber Room', 'Spice Route', 'Garden Table'
            ].map((name, i) => (
              <div key={i} className="client-logo-pill">{name}</div>
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <div className="prefooter-card">
          <div className="prefooter-text">
            <p className="bento-tag" style={{ display: 'inline-block', marginBottom: '0.8rem' }}>Your Vision Next</p>
            <h2>Want your venue to be our next success story?</h2>
            <p>Schedule a discovery session with Jigar Rajgor to discuss space planning, kitchen design, or turnaround strategies.</p>
          </div>
          <div className="prefooter-actions">
            <Link to="/start" className="btn-primary" style={{ textAlign: 'center', padding: '1.1rem 2.2rem' }}>
              Start Your Project &rarr;
            </Link>
            <a href="https://wa.me/919909558212" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--color-text)', textDecoration: 'none', padding: '1rem', border: '1px solid rgba(196, 154, 108, 0.3)', borderRadius: '30px' }}>
              WhatsApp Consultation
            </a>
          </div>
        </div>
      </section>

      <Footer ref={footerRef} />
    </SmoothScroll>
  )
}
