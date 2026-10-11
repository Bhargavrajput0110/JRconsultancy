import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Home from './pages/Home'
import StartProject from './pages/StartProject'
import CustomCursor from './components/CustomCursor'
import './index.css'

import ProjectDetail from './pages/ProjectDetail'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <HelmetProvider>
      <CustomCursor />
      {/* Background Ambient Animation */}
      <div className="ambient-glow" />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/start" element={<StartProject />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Programmatic SEO Route renders the full Home page with dynamic text */}
          <Route path="/:slug" element={<Home />} />
        </Routes>
      </Router>
    </HelmetProvider>
  )
}
