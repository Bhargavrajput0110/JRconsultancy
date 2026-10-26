import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SmoothScroll from '../components/SmoothScroll'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SpotlightCard from '../components/SpotlightCard'
import {
  CookingPot,
  Coffee,
  UtensilsCrossed,
  Sun,
  Flame,
  Leaf,
  CupSoda,
  Croissant,
  Zap,
  Pizza,
  Fish,
  Cloud,
  Sparkles,
  Building2,
  Beer,
  Truck,
  ConciergeBell,
  Soup,
  IceCream,
  Store,
  Waves,
  RotateCw,
  Salad,
  BookOpen,
  Martini,
  Utensils,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Star
} from 'lucide-react'
import '../index.css'

export default function CaseStudiesPage() {
  const [filter, setFilter] = useState('all')
  const [selectedType, setSelectedType] = useState('traditional-indian')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null)
  const videoScrollRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLElement>(null)
  const isFooterInView = useInView(footerRef, { margin: "0px 0px -100px 0px" })

  const scrollVideos = (direction: 'left' | 'right') => {
    if (videoScrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350
      videoScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  // Lock body scroll and pause Lenis smooth scroll while video modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedVideo(null)
      }
    }

    if (selectedVideo !== null) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
      const lenis = (window as any).lenis
      if (lenis) lenis.stop()
    } else {
      document.body.style.overflow = ''
      const lenis = (window as any).lenis
      if (lenis) lenis.start()
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      const lenis = (window as any).lenis
      if (lenis) lenis.start()
    }
  }, [selectedVideo])

  const clientVideos = [
    {
      id: 1,
      url: 'https://res.cloudinary.com/dlxiy6aiq/video/upload/v1792936139/WhatsApp_Video_2026-10-25_at_7.13.44_PM_ftv1re.mp4',
      poster: 'https://res.cloudinary.com/dlxiy6aiq/video/upload/so_1,q_auto,f_auto/v1792936139/WhatsApp_Video_2026-10-25_at_7.13.44_PM_ftv1re.jpg',
      title: '22nd Parallel | Spatial Flow & Brand Identity',
      subtitle: 'Conceptualizing signature wall art, seating partitions & dining atmosphere',
      tag: '22nd Parallel'
    },
    {
      id: 2,
      url: 'https://res.cloudinary.com/dlxiy6aiq/video/upload/v1792936138/WhatsApp_Video_2026-10-25_at_7.13.45_PM_mu7d07.mp4',
      poster: 'https://res.cloudinary.com/dlxiy6aiq/video/upload/so_1,q_auto,f_auto/v1792936138/WhatsApp_Video_2026-10-25_at_7.13.45_PM_mu7d07.jpg',
      title: 'Architect Hem Doshi | Fire & Gin at Alembic',
      subtitle: 'Balancing design aesthetics with commercial kitchen size & cuisine planning',
      tag: 'Kaha Studio'
    },
    {
      id: 3,
      url: 'https://res.cloudinary.com/dlxiy6aiq/video/upload/v1792936133/WhatsApp_Video_2026-10-25_at_7.13.59_PM_lp4euf.mp4',
      poster: 'https://res.cloudinary.com/dlxiy6aiq/video/upload/so_1,q_auto,f_auto/v1792936133/WhatsApp_Video_2026-10-25_at_7.13.59_PM_lp4euf.jpg',
      title: 'Kaha Studio | Architectural Execution & Kitchen Workflow',
      subtitle: '"No design is good enough without good execution" — Alembic Project',
      tag: 'Design Partner'
    },
    {
      id: 4,
      url: 'https://res.cloudinary.com/dlxiy6aiq/video/upload/v1792936129/WhatsApp_Video_2026-10-25_at_7.13.44_PM_1_t16ktg.mp4',
      poster: 'https://res.cloudinary.com/dlxiy6aiq/video/upload/so_1,q_auto,f_auto/v1792936129/WhatsApp_Video_2026-10-25_at_7.13.44_PM_1_t16ktg.jpg',
      title: 'Architect Kennil Doshi | Operational Circulation & Timelines',
      subtitle: 'Back-of-house workflow, finish standards & milestone adherence',
      tag: 'Kaha Studio'
    },
    {
      id: 5,
      url: 'https://res.cloudinary.com/dlxiy6aiq/video/upload/v1792936128/WhatsApp_Video_2026-10-25_at_7.13.43_PM_jgeqay.mp4',
      poster: 'https://res.cloudinary.com/dlxiy6aiq/video/upload/so_1,q_auto,f_auto/v1792936128/WhatsApp_Video_2026-10-25_at_7.13.43_PM_jgeqay.jpg',
      title: '22nd Parallel | 10+ Years of Operational Trust',
      subtitle: 'Balancing utility, aesthetics & cost control in compact restaurant spaces',
      tag: '10+ Yr Client'
    }
  ]

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

  // Comprehensive List of All Possible Restaurant & Café Formats in Consulting Scope
  const restaurantAndCafeTypes = [
    {
      id: 'traditional-indian',
      name: 'Traditional Regional Cuisines',
      subtext: 'Gujarati Thali, Kathiyawadi, Rajasthani & Awadhi Dining',
      icon: CookingPot,
      category: 'Regional Indian',
      description: 'High-volume regional Indian thali setups requiring centralized steam kettle boilers, brass utensil scullery bays, continuous thali assembly conveyors, and heavy ghee-separating drainage traps.'
    },
    {
      id: 'restro-cafe',
      name: 'Restro-Café & Modern Bistro',
      subtext: 'European All-Day Dining, Bakeries & Artisanal Small Plates',
      icon: Coffee,
      category: 'Cafes & Bistros',
      description: 'Aesthetic social dining combining an inviting front-of-house with a compact, low-heat electric induction cookline, high-speed combi-ovens, and acoustic zoning.'
    },
    {
      id: 'multi-cuisine',
      name: 'Multi-Cuisine Family Restaurants',
      subtext: 'North Indian, Pan-Asian Wok & Continental Dining Venues',
      icon: UtensilsCrossed,
      category: 'Full-Service Dining',
      description: 'Zoned kitchen engineering preventing cross-contamination between Indian curry, Chinese high-pressure wok, and Continental grill lines with dual-duct ESP electrostatic smoke filtration.'
    },
    {
      id: 'south-indian',
      name: 'South Indian Restaurants & Tiffin Centers',
      subtext: 'Authentic Udupi, Chettinad, Dosa Bars & Quick Tiffin Hubs',
      icon: Sun,
      category: 'Regional Indian',
      description: 'High-throughput Udupi kitchens with climate-controlled batter fermentation rooms, motorized stone wet-grinders, 6-foot continuous gas dosa tawas, and rapid 3-minute service cadence.'
    },
    {
      id: 'north-indian-mughlai',
      name: 'North Indian, Mughlai & Tandoor Houses',
      subtext: 'Clay Tandoors, Dum Biryani, Kebab Grills & Handi Specialties',
      icon: Flame,
      category: 'Regional Indian',
      description: 'Clay oven tandoor banks requiring 4,500+ CFM dedicated high-velocity heat exhaust, high-flame Bhatti gas manifolds with safety slam shutoffs, and cold-chain meat marination stations.'
    },
    {
      id: 'pure-veg-family',
      name: 'Pure Vegetarian Family Dining',
      subtext: 'Pure Vegetarian Fine Dining, Jain-Friendly & Multi-Generation Venues',
      icon: Leaf,
      category: 'Full-Service Dining',
      description: 'Strict vegetarian segregation, dedicated Jain food preparation stations, high-capacity table arrangements, and rapid Sunday family rush expediting passes.'
    },
    {
      id: 'artisan-coffee-bar',
      name: 'Specialty Coffee Bars & Roasteries',
      subtext: 'Third-Wave Espresso Bars, Pour-Over Counters & In-House Roasters',
      icon: CupSoda,
      category: 'Cafes & Bistros',
      description: 'Commercial barista counter MEP with dual-loop reverse osmosis water treatment, 3-phase surge-protected power, direct under-counter knock-box drainage, and acoustic isolation.'
    },
    {
      id: 'bakery-patisserie',
      name: 'Artisan Bakery & Patisserie',
      subtext: 'French Pastries, Viennoiserie, Sourdough Bread & Custom Cake Studios',
      icon: Croissant,
      category: 'Cafes & Bistros',
      description: 'Humidity-controlled pastry dough sheeting rooms (18°C), deck baking ovens with independent steam injection, proofing chambers, and temperature-zoned refrigerated showcases.'
    },
    {
      id: 'qsr-fast-food',
      name: 'Quick Service Restaurants (QSR)',
      subtext: 'Burger Joints, Fried Chicken Chains, Wrap & Roll Counters',
      icon: Zap,
      category: 'Fast Casual & QSR',
      description: 'Engineered for sub-90-second ticket times with automated fryers with built-in oil filtration, burger assembly chutes, KDS bump bars, and self-ordering kiosk integration.'
    },
    {
      id: 'artisanal-pizzeria',
      name: 'Artisanal Pizzerias & Italian Trattorias',
      subtext: 'Neapolitan Wood-Fired Pizza, Hand-Tossed Slices & Fresh Pasta Bars',
      icon: Pizza,
      category: 'Fast Casual & QSR',
      description: 'High-temperature stone/wood-fired oven installation (450°C) with dedicated triple-wall flue chimney draft, refrigerated marble pizza prep lines, and dough fermentation retarders.'
    },
    {
      id: 'pan-asian-sushi',
      name: 'Pan-Asian, Sushi Bars & Dim Sum Houses',
      subtext: 'Thai, Chinese, Dim Sum Steamers, Teppanyaki & Japanese Robata',
      icon: Fish,
      category: 'Global Speciality',
      description: 'High-pressure turbo wok burners with direct water knee-valves, dedicated bamboo steamer stations, refrigerated sushi counter displays, and specialized grease traps.'
    },
    {
      id: 'cloud-kitchen-hub',
      name: 'Cloud Kitchens & Dark Kitchen Hubs',
      subtext: 'Multi-Brand Delivery Clusters, Ghost Kitchens & Virtual Outlets',
      icon: Cloud,
      category: 'Production & Delivery',
      description: 'Modular shared kitchen pods, consolidated walk-in chillers, unified packaging counters with heated staging lamps, and isolated courier pickup handoff bays.'
    },
    {
      id: 'fine-dining-lounge',
      name: 'Fine Dining & Luxury Lounges',
      subtext: 'Chef-Driven Tasting Menus, Sommelier Cellars & Supper Clubs',
      icon: Sparkles,
      category: 'Full-Service Dining',
      description: 'Bespoke finishing passes with precision heat lamps, dual-zone wine cellars maintaining 14°C, whisper-quiet ventilation, and luxury acoustic spatial planning.'
    },
    {
      id: 'rooftop-restro-bar',
      name: 'Rooftop & Open-Air Restro-Bars',
      subtext: 'Sky Lounges, Penthouse Terraces & Sunset Cocktail Venues',
      icon: Building2,
      category: 'Nightlife & Bars',
      description: 'Weather-resistant stainless equipment enclosures, high-wind exhaust duct anchoring, service dumbwaiter integration from BOH ground kitchens, and perimeter fire-pit safety.'
    },
    {
      id: 'microbrewery-taproom',
      name: 'Microbreweries & Craft Taprooms',
      subtext: 'On-Premise Brew Houses, Fermentation Tank Yards & Beer Gardens',
      icon: Beer,
      category: 'Nightlife & Bars',
      description: 'Brew-kettle steam and chiller MEP, glycol cooling line distribution, heavy structural slab load engineering for fermentation tanks, and excise department compliant zoning.'
    },
    {
      id: 'highway-dhaba',
      name: 'Highway Dhabas & Family Highway Stops',
      subtext: 'Expansive Highway Dining, Open Tandoor & High-Turnover Pit Stops',
      icon: Truck,
      category: 'Regional Indian',
      description: 'Expansive parking-adjacent footprint planning, fast-turnover kitchen lines, robust bulk prep areas, industrial water storage, and heavy-duty LPG manifold installations.'
    },
    {
      id: 'buffet-banquet',
      name: 'Buffets, Banquets & Commercial Catering',
      subtext: 'Unlimited Food Spread Halls, Wedding Venues & Institutional F&B',
      icon: ConciergeBell,
      category: 'Full-Service Dining',
      description: 'Massive capacity combi-ovens, mobile heated banquet trolleys, walk-in cold rooms for 2,000+ covers, dishwash carousel tunnels, and loading dock logistics.'
    },
    {
      id: 'tea-lounge-chai',
      name: 'Tea Lounges & Modern Chai Bars',
      subtext: 'Boutique Chai Kiosks, High-Tea Lounges & Artisanal Brew Concepts',
      icon: Soup,
      category: 'Cafes & Bistros',
      description: 'Rapid-boil induction tea brewing banks, automated milk dispensing and chilling, compact snack warmers, and high-velocity counter service layouts.'
    },
    {
      id: 'dessert-ice-cream',
      name: 'Ice Cream Parlours & Dessert Bars',
      subtext: 'Artisan Gelaterias, Nitrogen Ice Cream & Waffle / Crepe Lounges',
      icon: IceCream,
      category: 'Fast Casual & QSR',
      description: 'High-power batch freezers, blast freezing cabinets (-40°C), continuous soft-serve machines, dipping cabinets, and dry topping display integration.'
    },
    {
      id: 'food-court-kiosk',
      name: 'Food Court & Mall Kiosks',
      subtext: 'Compact 150-300 sq.ft. High-Density Commercial Kitchen Pods',
      icon: Store,
      category: 'Fast Casual & QSR',
      description: 'Micro-footprint space planning maximizing every inch, ventless cooking hood technology, plug-and-play plumbing, and strict mall fire & MEP compliance.'
    },
    {
      id: 'coastal-seafood',
      name: 'Coastal & Seafood Specialty Dining',
      subtext: 'Malabar, Mangalorean, Goan & Konkan Fresh Catch Venues',
      icon: Waves,
      category: 'Regional Indian',
      description: 'Dedicated odor-isolated fish cleaning sculleries, deep-freeze walk-in refrigeration maintaining -18°C, specialized seafood display counters, and live cooking ranges.'
    },
    {
      id: 'shawarma-rolls',
      name: 'Shawarma, Rolls & Kebab Takeaways',
      subtext: 'Vertical Broiler Stations, Middle Eastern Wraps & Quick Grills',
      icon: RotateCw,
      category: 'Fast Casual & QSR',
      description: 'Front-facing vertical gas rotisseries with dedicated glass sneeze-guards, localized exhaust hood capture, rapid flatbread warming grills, and cold condiment wells.'
    },
    {
      id: 'mexican-taqueria',
      name: 'Mexican & Tex-Mex Taquerias',
      subtext: 'Taco Bars, Burrito Assembly Lines & Nacho Cantinas',
      icon: Flame,
      category: 'Global Speciality',
      description: 'Flat-top chrome planchas, heated chip warmers, cold salsa bar wells, cheese melting salamanders, and fast-casual assembly ergonomics.'
    },
    {
      id: 'healthy-vegan-cafe',
      name: 'Healthy, Salad & Vegan Cafes',
      subtext: 'Organic Grain Bowls, Cold-Pressed Juiceries & Superfood Dining',
      icon: Salad,
      category: 'Cafes & Bistros',
      description: 'Cold-room temperature controlled prep bays for fresh produce, commercial hydraulic juice presses, blast chillers, and segregated allergen-safe workflows.'
    },
    {
      id: 'book-work-cafe',
      name: 'Co-Working Cafes & Book Lounges',
      subtext: 'Laptop-Friendly Workspaces, Library Lounges & Quiet Dining Spots',
      icon: BookOpen,
      category: 'Cafes & Bistros',
      description: 'Low-decibel quiet kitchen operations, extensive power-drop spatial planning, ergonomic long-dwell seating, and quiet barista counter operations.'
    },
    {
      id: 'cocktail-gastro-pub',
      name: 'Cocktail Lounges & Gastro-Pubs',
      subtext: 'Craft Cocktail Wells, Tapas Bars & High-Energy Nightspots',
      icon: Martini,
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
                    {(() => {
                      const IconComp = currentType?.icon || Utensils
                      return (
                        <span style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '12px',
                          background: 'rgba(196, 154, 108, 0.15)',
                          border: '1px solid rgba(196, 154, 108, 0.35)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--color-accent)',
                          flexShrink: 0
                        }}>
                          <IconComp size={22} strokeWidth={2} />
                        </span>
                      )
                    })()}
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
                      const IconComp = type.icon || Utensils

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
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                            <span style={{
                              width: '34px',
                              height: '34px',
                              borderRadius: '10px',
                              background: isActive ? 'rgba(196, 154, 108, 0.28)' : 'rgba(196, 154, 108, 0.12)',
                              border: isActive ? '1px solid rgba(196, 154, 108, 0.5)' : '1px solid rgba(196, 154, 108, 0.25)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--color-accent)',
                              flexShrink: 0
                            }}>
                              <IconComp size={18} strokeWidth={2} />
                            </span>
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {(() => {
                      const IconComp = currentType.icon || Utensils
                      return (
                        <span style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '10px',
                          background: 'rgba(196, 154, 108, 0.18)',
                          border: '1px solid rgba(196, 154, 108, 0.35)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--color-accent)',
                          flexShrink: 0
                        }}>
                          <IconComp size={20} strokeWidth={2} />
                        </span>
                      )
                    })()}
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

        {/* ── Client Video Reviews & Testimonials Section ── */}
        <section id="video-testimonials" style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div>
              <p className="bento-tag" style={{ display: 'inline-block', marginBottom: '0.8rem' }}>Verified Client Stories</p>
              <motion.h2 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={springUp}
                className="section-heading"
                style={{ margin: 0, textAlign: 'left' }}
              >
                Real Restaurant associated.<br/>
                <span style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)', fontWeight: 400 }}>
                  Watch their unfiltered reviews.
                </span>
              </motion.h2>
            </div>

            {/* Reel Nav Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginRight: '0.5rem' }}>
                5 Video Reviews
              </span>
              <button
                onClick={() => scrollVideos('left')}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'rgba(20, 32, 24, 0.85)',
                  border: '1px solid rgba(196, 154, 108, 0.35)',
                  color: 'var(--color-text)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.25s'
                }}
                aria-label="Scroll testimonials left"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollVideos('right')}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'rgba(20, 32, 24, 0.85)',
                  border: '1px solid rgba(196, 154, 108, 0.35)',
                  color: 'var(--color-text)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.25s'
                }}
                aria-label="Scroll testimonials right"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* 5 Video Cards Horizontal Reel */}
          <div 
            ref={videoScrollRef}
            className="video-testimonials-scroll"
            style={{
              display: 'flex',
              gap: '1.5rem',
              overflowX: 'auto',
              paddingBottom: '1.5rem',
              paddingTop: '0.5rem',
              scrollSnapType: 'x mandatory'
            }}
          >
            {clientVideos.map((video, idx) => (
              <motion.div
                key={video.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={springUp}
                onClick={() => setSelectedVideo(idx)}
                className="client-video-card"
                style={{
                  flex: '0 0 clamp(270px, 30vw, 330px)',
                  height: 'clamp(460px, 60vh, 520px)',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                  border: '1px solid rgba(196, 154, 108, 0.28)',
                  background: '#0a0f0c',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.45)',
                  transition: 'transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  scrollSnapAlign: 'start'
                }}
              >
                {/* Background Poster Image */}
                <div 
                  className="video-poster-img"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${video.poster})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.5s ease'
                  }}
                />

                {/* Gradient Scrim */}
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(5,8,6,0.5) 0%, rgba(5,8,6,0.05) 50%, rgba(5,8,6,0.45) 100%)',
                    zIndex: 1
                  }}
                />

                {/* Top Card Bar */}
                <div style={{ position: 'relative', zIndex: 2, padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    background: 'rgba(10, 16, 12, 0.8)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(196, 154, 108, 0.4)',
                    borderRadius: '20px',
                    padding: '4px 12px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.5px',
                    color: 'var(--color-accent, #c49a6c)',
                    textTransform: 'uppercase',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
                    {video.tag}
                  </span>

                  <span style={{
                    background: 'rgba(10, 16, 12, 0.75)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '20px',
                    padding: '3px 10px',
                    fontSize: '0.72rem',
                    color: '#fff',
                    fontWeight: 600
                  }}>
                    Video 0{idx + 1}
                  </span>
                </div>

                {/* Central Glowing Play Button */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div 
                    className="video-play-btn"
                    style={{
                      width: '66px',
                      height: '66px',
                      borderRadius: '50%',
                      background: 'rgba(196, 154, 108, 0.28)',
                      backdropFilter: 'blur(12px)',
                      border: '2px solid rgba(196, 154, 108, 0.85)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      boxShadow: '0 0 30px rgba(196, 154, 108, 0.45)',
                      transition: 'transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease'
                    }}
                  >
                    <Play size={24} fill="#c49a6c" color="#c49a6c" style={{ marginLeft: '3px' }} />
                  </div>
                  <span style={{
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    color: '#fff',
                    textShadow: '0 2px 4px rgba(0,0,0,0.85)',
                    background: 'rgba(5, 8, 6, 0.65)',
                    backdropFilter: 'blur(6px)',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    border: '1px solid rgba(196, 154, 108, 0.25)'
                  }}>
                    Watch Video Review
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Written Review Highlights Grid — Verbatim from Video Reviews */}
          <div style={{ marginTop: '3.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* Review 1 — Kaha Studio / Architects Hem & Kennil Doshi */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springUp}>
              <SpotlightCard className="bento-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '4px', color: 'var(--color-accent)' }}>
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={18} fill="#c49a6c" color="#c49a6c" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--color-accent)', background: 'rgba(196,154,108,0.12)', padding: '3px 10px', borderRadius: '12px', fontWeight: 700 }}>
                    Alembic Project
                  </span>
                </div>
                <p style={{ color: 'var(--color-text)', fontSize: '1.08rem', lineHeight: 1.65, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                  "No design is good enough without good execution, and that's where Jigar bhai comes in. As architects, we focus on planning and aesthetics. What he brings to the table is how the commercial kitchen works, cuisine station requirements, and how staff circulate around the space. In a project like Fire &amp; Gin at Alembic, combining design with his operational engineering made all the difference."
                </p>
                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(196, 154, 108, 0.15)' }}>
                  <p style={{ color: 'var(--color-accent)', fontWeight: 600, margin: 0, fontSize: '1rem' }}>Ar. Hem Doshi &amp; Ar. Kennil Doshi</p>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: '3px 0 0' }}>Co-Founders, Kaha Studio (Architectural Design Partners)</p>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* Review 2 — 22nd Parallel Founding Partner */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springUp}>
              <SpotlightCard className="bento-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '4px', color: 'var(--color-accent)' }}>
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={18} fill="#c49a6c" color="#c49a6c" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--color-accent)', background: 'rgba(196,154,108,0.12)', padding: '3px 10px', borderRadius: '12px', fontWeight: 700 }}>
                    10+ Yr Association
                  </span>
                </div>
                <p style={{ color: 'var(--color-text)', fontSize: '1.08rem', lineHeight: 1.65, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                  "I've known Jigar bhai for over 10 years now, and 22nd Parallel is richer for having had him come on board. Two things that really stand out about him: his unique ability to balance utility and aesthetics, and his deep understanding of cost control in compact restaurant spaces. His engineering and operational guidance has been truly invaluable across our brand."
                </p>
                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(196, 154, 108, 0.15)' }}>
                  <p style={{ color: 'var(--color-accent)', fontWeight: 600, margin: 0, fontSize: '1rem' }}>Founding Partner &amp; Leadership</p>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: '3px 0 0' }}>22nd Parallel (Authentic South Indian Fine Dining)</p>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* Review 3 — 22nd Parallel Brand & Operations */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springUp}>
              <SpotlightCard className="bento-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '4px', color: 'var(--color-accent)' }}>
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={18} fill="#c49a6c" color="#c49a6c" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--color-accent)', background: 'rgba(196,154,108,0.12)', padding: '3px 10px', borderRadius: '12px', fontWeight: 700 }}>
                    Brand &amp; Atmosphere
                  </span>
                </div>
                <p style={{ color: 'var(--color-text)', fontSize: '1.08rem', lineHeight: 1.65, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                  "Jigar sir's major contribution across 22nd Parallel has been conceptualizing our dining partitions, spatial layout, and bringing our branding murals to life-size on our walls. He has been a trusted sounding board when it comes to restaurant aesthetics, spatial flow, and guest experience."
                </p>
                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(196, 154, 108, 0.15)' }}>
                  <p style={{ color: 'var(--color-accent)', fontWeight: 600, margin: 0, fontSize: '1rem' }}>Brand &amp; Operations Team</p>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: '3px 0 0' }}>22nd Parallel Restaurant Group</p>
                </div>
              </SpotlightCard>
            </motion.div>
          </div>
        </section>

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

      {/* ── Client Video Modal Player ── */}
      <AnimatePresence>
        {selectedVideo !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(5, 8, 6, 0.94)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              zIndex: 99999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(0.75rem, 3vw, 2rem)',
              cursor: 'pointer'
            }}
          >
            {/* Highly Visible Floating Exit Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedVideo(null)
              }}
              style={{
                position: 'fixed',
                top: 'clamp(1rem, 3vw, 2rem)',
                right: 'clamp(1rem, 3vw, 2.5rem)',
                zIndex: 100002,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '30px',
                background: 'rgba(15, 23, 17, 0.95)',
                border: '1.5px solid rgba(196, 154, 108, 0.85)',
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: 700,
                letterSpacing: '0.5px',
                cursor: 'pointer',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 25px rgba(196, 154, 108, 0.35)',
                transition: 'all 0.25s ease'
              }}
              aria-label="Exit video review"
            >
              <X size={20} color="var(--color-accent, #c49a6c)" strokeWidth={2.5} />
              <span style={{ color: 'var(--color-accent, #c49a6c)' }}>Exit / Close (Esc)</span>
            </button>

            {/* Click Outside to Exit Helper Text */}
            <div style={{
              position: 'fixed',
              bottom: 'clamp(1rem, 2.5vw, 1.8rem)',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'rgba(255, 255, 255, 0.75)',
              fontSize: '0.82rem',
              letterSpacing: '0.4px',
              background: 'rgba(10, 16, 12, 0.85)',
              backdropFilter: 'blur(10px)',
              padding: '7px 18px',
              borderRadius: '20px',
              border: '1px solid rgba(196, 154, 108, 0.3)',
              pointerEvents: 'none',
              zIndex: 100001,
              whiteSpace: 'nowrap'
            }}>
              Tap anywhere outside the video or press <strong style={{ color: 'var(--color-accent)' }}>Esc</strong> to exit
            </div>

            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                width: '100%',
                maxWidth: '480px',
                maxHeight: '94vh',
                background: '#090e0b',
                border: '1px solid rgba(196, 154, 108, 0.45)',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 30px 80px rgba(0,0,0,0.85), 0 0 50px rgba(196, 154, 108, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                cursor: 'default'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Header */}
              <div style={{
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(196, 154, 108, 0.2)',
                background: 'rgba(10, 16, 12, 0.95)'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                      Client Video Review ({selectedVideo + 1} of {clientVideos.length})
                    </span>
                  </div>
                  <h4 style={{ margin: '3px 0 0', color: '#fff', fontSize: '0.98rem', fontFamily: 'var(--font-heading)' }}>
                    {clientVideos[selectedVideo].title}
                  </h4>
                </div>

                <button
                  onClick={() => setSelectedVideo(null)}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(196, 154, 108, 0.2)',
                    border: '1.5px solid rgba(196, 154, 108, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-accent, #c49a6c)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    flexShrink: 0,
                    boxShadow: '0 0 15px rgba(196, 154, 108, 0.3)'
                  }}
                  aria-label="Exit video"
                  title="Close / Exit"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>

              {/* Video Player Box */}
              <div style={{ position: 'relative', width: '100%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <video
                  key={clientVideos[selectedVideo].url}
                  src={clientVideos[selectedVideo].url}
                  poster={clientVideos[selectedVideo].poster}
                  controls
                  autoPlay
                  playsInline
                  style={{
                    width: '100%',
                    maxHeight: '68vh',
                    objectFit: 'contain',
                    background: '#000',
                    display: 'block'
                  }}
                />
              </div>

              {/* Modal Bottom Controls */}
              <div style={{
                padding: '0.85rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid rgba(196, 154, 108, 0.2)',
                background: 'rgba(10, 16, 12, 0.95)',
                gap: '0.5rem'
              }}>
                <button
                  onClick={() => setSelectedVideo((prev) => (prev !== null ? (prev - 1 + clientVideos.length) % clientVideos.length : null))}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 14px',
                    borderRadius: '20px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(196, 154, 108, 0.3)',
                    color: 'var(--color-text)',
                    fontSize: '0.82rem',
                    cursor: 'pointer'
                  }}
                >
                  <ChevronLeft size={16} />
                  <span>Prev</span>
                </button>

                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                  {clientVideos[selectedVideo].subtitle}
                </span>

                <button
                  onClick={() => setSelectedVideo((prev) => (prev !== null ? (prev + 1) % clientVideos.length : null))}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 14px',
                    borderRadius: '20px',
                    background: 'rgba(196, 154, 108, 0.18)',
                    border: '1px solid rgba(196, 154, 108, 0.5)',
                    color: 'var(--color-accent)',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer ref={footerRef} />
    </SmoothScroll>
  )
}
