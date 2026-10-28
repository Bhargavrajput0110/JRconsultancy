import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ProcessPage from './pages/ProcessPage'
import CaseStudiesPage from './pages/CaseStudiesPage'
import FaqPage from './pages/FaqPage'
import StartProject from './pages/StartProject'
import ProjectDetail from './pages/ProjectDetail'
import Dashboard from './pages/Dashboard'
import CustomCursor from './components/CustomCursor'
import ScrollToTop from './components/ScrollToTop'
import './index.css'

export default function App() {
  return (
    <HelmetProvider>
      <CustomCursor />
      {/* Background Ambient Animation */}
      <div className="ambient-glow" />
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Primary Semantic Routes for SEO */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/packages" element={<Navigate to="/services" replace />} />
          <Route path="/case-studies" element={<Navigate to="/portfolio" replace />} />
          <Route path="/portfolio" element={<CaseStudiesPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/start" element={<StartProject />} />
          <Route path="/contact" element={<StartProject />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/login" element={<Dashboard />} />
          <Route path="/crm" element={<Dashboard />} />

          {/* Programmatic SEO Routes for City & Specialty Landing Pages */}
          <Route path="/locations/:slug" element={<Home />} />
          <Route path="/:slug" element={<Home />} />
        </Routes>
      </Router>
    </HelmetProvider>
  )
}
