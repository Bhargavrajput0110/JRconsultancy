import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import AdminLogin from '../components/AdminLogin';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Clients' | 'Projects' | 'Proposals' | 'Finances' | 'Settings'>('Overview');
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Executive Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [adminUser, setAdminUser] = useState<{ email: string; name: string; role: string } | null>(null);

  // Verify Admin Session on mount
  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem('jr_admin_token') || sessionStorage.getItem('jr_admin_token');
      const storedUser = localStorage.getItem('jr_admin_user') || sessionStorage.getItem('jr_admin_user');

      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      if (storedUser) {
        try {
          setAdminUser(JSON.parse(storedUser));
        } catch (e) {
          // ignore parsing error
        }
      }

      try {
        const res = await fetch('/api/admin/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setIsAuthenticated(true);
          if (data.user) {
            setAdminUser(data.user);
          }
        } else {
          // Explicit token rejection / expiration
          localStorage.removeItem('jr_admin_token');
          localStorage.removeItem('jr_admin_user');
          sessionStorage.removeItem('jr_admin_token');
          sessionStorage.removeItem('jr_admin_user');
          setIsAuthenticated(false);
          setAdminUser(null);
        }
      } catch (err) {
        // Fallback for offline or static environment
        if (storedUser) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      }
    };

    verifySession();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (e) {
      // ignore
    }
    localStorage.removeItem('jr_admin_token');
    localStorage.removeItem('jr_admin_user');
    sessionStorage.removeItem('jr_admin_token');
    sessionStorage.removeItem('jr_admin_user');
    setIsAuthenticated(false);
    setAdminUser(null);
    setMobileMenuOpen(false);
    triggerNotification('Executive session terminated. You have been safely logged out.');
  };

  // Lock background scroll and handle Escape key when mobile sidebar drawer is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Search & Filter States
  const [projectFilter, setProjectFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive Task List State
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review commercial kitchen layout for Luna Bistro MEP', time: 'Today, 2:00 PM', done: false, urgent: true },
    { id: 2, text: 'Send finalized FSSAI licensing compliance pack to The Gilded Spoon', time: 'Tomorrow, 10:00 AM', done: false, urgent: false },
    { id: 3, text: 'Initial culinary consultation call with Cafe Noir founders', time: 'Thursday, 4:00 PM', done: false, urgent: false },
    { id: 4, text: 'Sign off on POS & inventory sync for Aria Trattoria launch', time: 'Friday, 11:30 AM', done: true, urgent: false }
  ]);
  const [newTaskInput, setNewTaskInput] = useState('');
  const [showTaskInput, setShowTaskInput] = useState(false);

  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectLocation, setNewProjectLocation] = useState('');
  const [newProjectValue, setNewProjectValue] = useState('');

  // Projects Data
  const [projectsList, setProjectsList] = useState([
    {
      id: 'proj-1',
      name: 'The Gilded Spoon',
      type: 'Fine Dining & Bar',
      location: 'Bandra West, Mumbai',
      scale: '3,800 sq.ft • 120 Covers',
      stage: 'Execution (75%)',
      currentMilestone: 'MEP & Commercial Kitchen Exhaust Ducting',
      value: '₹14.5 Lakhs',
      lead: 'Julian Rajput',
      status: 'On Track',
      color: '#4ade80'
    },
    {
      id: 'proj-2',
      name: 'Aria Trattoria',
      type: 'Authentic Italian Bistro',
      location: 'Indiranagar, Bangalore',
      scale: '2,200 sq.ft • 75 Covers',
      stage: 'Architecture & Design (35%)',
      currentMilestone: 'Wood-fired Oven Specification & Interior Elevations',
      value: '₹6.8 Lakhs',
      lead: 'Vikram S.',
      status: 'Planning',
      color: '#fbbf24'
    },
    {
      id: 'proj-3',
      name: 'Luna Bistro & Tapas',
      type: 'Casual Restobar',
      location: 'Jubilee Hills, Hyderabad',
      scale: '4,500 sq.ft • 160 Covers',
      stage: 'Near Handover (92%)',
      currentMilestone: 'Final Dry Run, Recipe Standard Operating Procedures & Trial Dinners',
      value: '₹18.0 Lakhs',
      lead: 'Julian Rajput',
      status: 'Final Handover',
      color: '#60a5fa'
    },
    {
      id: 'proj-4',
      name: 'Cafe Noir Artisanal Roastery',
      type: 'Boutique Coffee House & Bakery',
      location: 'Koregaon Park, Pune',
      scale: '1,400 sq.ft • 45 Covers',
      stage: 'Feasibility & Concept (20%)',
      currentMilestone: 'Kitchen Equipment Procurement Matrix & Brand Identity',
      value: '₹4.2 Lakhs',
      lead: 'Pooja M.',
      status: 'Feasibility',
      color: '#a78bfa'
    },
    {
      id: 'proj-5',
      name: 'Zaffran Heritage Courtyard',
      type: 'Royal North Indian Dining',
      location: 'Civil Lines, Jaipur',
      scale: '6,000 sq.ft • 200 Covers',
      stage: 'Civil Work & HVAC (50%)',
      currentMilestone: 'Commercial Tandoor Pit Ventilation & Cold Storage Units',
      value: '₹22.5 Lakhs',
      lead: 'Julian Rajput',
      status: 'On Track',
      color: '#4ade80'
    }
  ]);

  // Clients Data
  const clientsList = [
    { name: 'Vikramaditya Singhania', company: 'Epicurean Hospitality Group', project: 'The Gilded Spoon', contact: '+91 98201 44921', email: 'vikram@epicurean.in', status: 'VIP Client', value: '₹14.5L' },
    { name: 'Sameer & Ananya Sen', company: 'Flavors of Tuscany LLP', project: 'Aria Trattoria', contact: '+91 98450 12894', email: 'sameer@ariatrattoria.com', status: 'Active', value: '₹6.8L' },
    { name: 'Raghavendra Rao', company: 'Solstice F&B Ventures', project: 'Luna Bistro & Tapas', contact: '+91 99890 33410', email: 'raghav@solsticefb.com', status: 'Active', value: '₹18.0L' },
    { name: 'Zoya Merchant', company: 'Third Wave Roasters Co.', project: 'Cafe Noir Artisanal Roastery', contact: '+91 97654 22109', email: 'zoya@cafenoir.in', status: 'Lead Qualified', value: '₹4.2L' },
    { name: 'Maharaja Digvijay Singh', company: 'Heritage Palaces & Resorts', project: 'Zaffran Heritage Courtyard', contact: '+91 94140 88200', email: 'contact@zaffranheritage.com', status: 'VIP Client', value: '₹22.5L' }
  ];

  // Proposals Data
  const proposalsList = [
    { title: 'Turnkey Restobar Setup & Bar Mixology SOPs', client: 'Velvet Lounge, Bandra', amount: '₹9.5 Lakhs', date: 'Oct 09, 2026', status: 'Sent & Pending Signature', prob: '85%' },
    { title: 'Commercial Kitchen Audit & Energy Efficiency Optimization', client: 'Copper Chimney Franchisee', amount: '₹3.8 Lakhs', date: 'Oct 07, 2026', status: 'Under Review', prob: '60%' },
    { title: 'Complete Cloud Kitchen Chain SOP & Central Base Kitchen Design', client: 'Bowl Republic (3 Outlets)', amount: '₹14.0 Lakhs', date: 'Oct 04, 2026', status: 'Proposal Accepted', prob: '100%' },
    { title: 'Culinary Menu Engineering & Gross Margin Restructuring', client: 'Bakehouse 71, Goa', amount: '₹2.7 Lakhs', date: 'Sep 29, 2026', status: 'Drafting', prob: '40%' }
  ];

  // Animation Variants
  const springUp: any = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 20 } }
  };

  const staggerContainer: any = {
    hidden: { opacity: 1 },
    visible: { transition: { staggerChildren: 0.08 } }
  };

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    setTasks([{ id: Date.now(), text: newTaskInput.trim(), time: 'Added just now', done: false, urgent: false }, ...tasks]);
    setNewTaskInput('');
    setShowTaskInput(false);
    triggerNotification('New consulting task scheduled.');
  };

  // Loading verification screen
  if (isAuthenticated === null) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#070c08',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        color: '#c49a6c',
        fontFamily: 'var(--font-body, "Century Gothic", sans-serif)'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(196, 154, 108, 0.2)',
          borderTopColor: 'var(--color-accent, #c49a6c)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
        <span style={{ fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#9bb0a5' }}>
          Verifying Executive Session...
        </span>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Admin Login Gateway
  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={(user) => {
          setAdminUser(user);
          setIsAuthenticated(true);
          triggerNotification(`Welcome back to JR Executive Suite, ${user.name}`);
        }}
      />
    );
  }

  return (
    <div className="crm-layout">
      {/* Toast Alert */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              zIndex: 9999,
              background: 'rgba(27, 48, 36, 0.95)',
              border: '1px solid var(--color-accent, #c49a6c)',
              color: '#fff',
              padding: '0.85rem 1.25rem',
              borderRadius: '12px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span style={{ color: 'var(--color-accent, #c49a6c)', fontSize: '1.2rem' }}>✦</span>
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Topbar */}
      <div className="crm-mobile-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/jr-logo.jpg" alt="JR Logo" style={{ height: '36px', width: '36px', borderRadius: '8px', objectFit: 'contain' }} />
          <div>
            <h2 style={{ fontSize: '1.1rem', margin: 0, fontFamily: 'var(--font-heading)', color: '#fff' }}>JR CRM</h2>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-accent, #c49a6c)' }}>{activeTab}</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={handleLogout}
            title="Sign Out of CRM"
            style={{
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              padding: '8px 12px',
              borderRadius: '10px',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <LogOut size={15} />
            <span style={{ fontSize: '0.76rem', fontWeight: 600 }}>Exit</span>
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(196, 154, 108, 0.4)',
              color: 'var(--color-accent, #c49a6c)',
              padding: '8px 14px',
              borderRadius: '10px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Backdrop for mobile drawer */}
      {mobileMenuOpen && (
        <div className="crm-backdrop" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar Drawer */}
      <aside 
        className={`crm-sidebar ${mobileMenuOpen ? 'open' : ''}`}
        aria-label="CRM Navigation Drawer"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)}
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
          >
            <img src="/jr-logo.jpg" alt="JR Logo" style={{ height: '40px', width: '40px', objectFit: 'contain', borderRadius: '10px', marginRight: '0.85rem', border: '1px solid rgba(196, 154, 108, 0.3)' }} />
            <div>
              <h2 style={{ fontSize: '1.2rem', color: '#fff', margin: 0, fontFamily: 'var(--font-heading)', letterSpacing: '0.5px' }}>JR CRM</h2>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-accent, #c49a6c)', letterSpacing: '1px', textTransform: 'uppercase' }}>Executive Suite</span>
            </div>
          </Link>
          <button 
            type="button"
            className="crm-drawer-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            ✕
          </button>
        </div>

        {/* Sidebar Nav Items */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          {(['Overview', 'Clients', 'Projects', 'Proposals', 'Finances', 'Settings'] as const).map((item) => {
            const isActive = activeTab === item;
            return (
              <button
                key={item}
                onClick={() => {
                  setActiveTab(item);
                  setMobileMenuOpen(false);
                }}
                style={{
                  background: isActive ? 'rgba(196, 154, 108, 0.15)' : 'transparent',
                  color: isActive ? 'var(--color-accent, #c49a6c)' : '#9bb0a5',
                  border: isActive ? '1px solid rgba(196, 154, 108, 0.3)' : '1px solid transparent',
                  padding: '0.9rem 1.15rem',
                  borderRadius: '14px',
                  textAlign: 'left',
                  fontSize: '0.95rem',
                  fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div style={{ 
                  width: '7px', 
                  height: '7px', 
                  borderRadius: '50%', 
                  background: isActive ? 'var(--color-accent, #c49a6c)' : 'rgba(255,255,255,0.2)',
                  boxShadow: isActive ? '0 0 8px var(--color-accent, #c49a6c)' : 'none'
                }} />
                {item}
              </button>
            );
          })}
        </nav>

        {/* Go Back to Live Site Button (Highlighted) */}
        <Link 
          to="/" 
          onClick={() => setMobileMenuOpen(false)}
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            background: 'rgba(196, 154, 108, 0.12)',
            border: '1px solid rgba(196, 154, 108, 0.45)',
            color: 'var(--color-accent, #c49a6c)',
            padding: '0.95rem 1.25rem',
            borderRadius: '14px',
            fontWeight: 600,
            fontSize: '0.95rem',
            marginBottom: '1.25rem',
            transition: 'all 0.2s',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)'
          }}
          onMouseEnter={(e: any) => {
            e.currentTarget.style.background = 'var(--color-accent, #c49a6c)';
            e.currentTarget.style.color = '#050806';
          }}
          onMouseLeave={(e: any) => {
            e.currentTarget.style.background = 'rgba(196, 154, 108, 0.12)';
            e.currentTarget.style.color = 'var(--color-accent, #c49a6c)';
          }}
        >
          <span style={{ fontSize: '1.1rem' }}>←</span>
          <span>Back to Live Site</span>
        </Link>

        {/* User Card & Logout */}
        <div style={{ 
          padding: '1.1rem', 
          background: 'rgba(255,255,255,0.03)', 
          borderRadius: '16px', 
          border: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '38px', 
              height: '38px', 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, #c49a6c, #8b683e)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.95rem',
              color: '#050806',
              flexShrink: 0
            }}>
              {adminUser?.name ? adminUser.name.split(' ').map(n => n[0]).join('') : 'JR'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: '0.92rem', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {adminUser?.name || 'Julian Rajput'}
              </p>
              <p style={{ margin: 0, fontSize: '0.72rem', color: '#9bb0a5', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {adminUser?.role || 'Principal Consultant & Founder'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            style={{
              background: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              color: '#f87171',
              padding: '8px 12px',
              borderRadius: '10px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              width: '100%'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.25)';
            }}
          >
            <LogOut size={14} />
            <span>Sign Out of CRM</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="crm-content">
        {/* Top Header */}
        <header className="crm-header">
          <motion.div initial="hidden" animate="visible" variants={springUp}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-accent, #c49a6c)', textTransform: 'uppercase', letterSpacing: '1px' }}>Portal</span>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' }}>/</span>
              <span style={{ fontSize: '0.8rem', color: '#9bb0a5' }}>{activeTab}</span>
            </div>
            <h1 style={{ fontSize: '2.5rem', margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 500, color: '#fff' }}>
              {activeTab === 'Overview' && <>Welcome back, <span style={{ fontStyle: 'italic', color: 'var(--color-accent, #c49a6c)' }}>Julian</span></>}
              {activeTab === 'Projects' && <>Client Consulting <span style={{ fontStyle: 'italic', color: 'var(--color-accent, #c49a6c)' }}>Projects</span></>}
              {activeTab === 'Clients' && <>Client Accounts & <span style={{ fontStyle: 'italic', color: 'var(--color-accent, #c49a6c)' }}>Partners</span></>}
              {activeTab === 'Proposals' && <>Commercial <span style={{ fontStyle: 'italic', color: 'var(--color-accent, #c49a6c)' }}>Proposals</span></>}
              {activeTab === 'Finances' && <>Financial <span style={{ fontStyle: 'italic', color: 'var(--color-accent, #c49a6c)' }}>Performance</span></>}
              {activeTab === 'Settings' && <>Consultancy <span style={{ fontStyle: 'italic', color: 'var(--color-accent, #c49a6c)' }}>Settings</span></>}
            </h1>
            <p style={{ color: '#9bb0a5', margin: '0.5rem 0 0 0', fontSize: '1rem' }}>
              {activeTab === 'Overview' && "Here is what's happening across your active restaurant setups today."}
              {activeTab === 'Projects' && "Track kitchen engineering, MEP layouts, licensing, and trial dinner roadmaps."}
              {activeTab === 'Clients' && "Manage restaurant owners, hospitality groups, and investor contacts."}
              {activeTab === 'Proposals' && "Track pending scopes of work, retainer terms, and won engagements."}
              {activeTab === 'Finances' && "Monitor retainer billing, project phase invoices, and collected revenue."}
              {activeTab === 'Settings' && "Configure firm details, consultancy defaults, and notification preferences."}
            </p>
          </motion.div>
          
          <div className="crm-header-actions">
            <Link 
              to="/"
              style={{ 
                textDecoration: 'none',
                background: 'rgba(255,255,255,0.06)', 
                border: '1px solid rgba(255,255,255,0.15)', 
                color: '#fff', 
                padding: '0.8rem 1.4rem', 
                borderRadius: '30px',
                fontSize: '0.88rem',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e: any) => {
                e.currentTarget.style.borderColor = 'var(--color-accent, #c49a6c)';
                e.currentTarget.style.color = 'var(--color-accent, #c49a6c)';
              }}
              onMouseLeave={(e: any) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.color = '#fff';
              }}
            >
              <span>←</span> View Live Site
            </Link>
            <button 
              onClick={() => triggerNotification('Exporting comprehensive Executive PDF summary...')}
              style={{ 
                background: 'rgba(255,255,255,0.05)', 
                border: '1px solid rgba(255,255,255,0.12)', 
                color: '#fff', 
                padding: '0.8rem 1.4rem', 
                borderRadius: '30px',
                cursor: 'pointer',
                fontSize: '0.88rem',
                fontWeight: 500,
                transition: 'all 0.2s'
              }}
            >
              Export Report
            </button>
            <button
              type="button"
              onClick={handleLogout}
              style={{
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                color: '#fca5a5',
                padding: '0.8rem 1.35rem',
                borderRadius: '30px',
                cursor: 'pointer',
                fontSize: '0.88rem',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e: any) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.18)';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)';
              }}
              onMouseLeave={(e: any) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)';
                e.currentTarget.style.color = '#fca5a5';
                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.25)';
              }}
            >
              <LogOut size={15} />
              <span>Sign Out</span>
            </button>
            <button 
              onClick={() => setShowNewLeadModal(true)}
              style={{ 
                background: 'var(--color-accent, #c49a6c)', 
                border: 'none', 
                color: '#050806', 
                padding: '0.8rem 1.5rem', 
                borderRadius: '30px', 
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.88rem',
                boxShadow: '0 4px 16px rgba(196, 154, 108, 0.35)',
                transition: 'all 0.2s'
              }}
            >
              + New Lead
            </button>
          </div>
        </header>

        {/* ----------------- TAB 1: OVERVIEW ----------------- */}
        {activeTab === 'Overview' && (
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            {/* KPI Cards */}
            <div className="crm-kpi-grid">
              {[
                { label: 'Active Projects', value: '12', trend: '+2 this month', color: '#4ade80' },
                { label: 'Pending Proposals', value: '5', trend: '3 awaiting signature', color: '#fbbf24' },
                { label: 'YTD Revenue', value: '₹4.2M', trend: '+18% vs last year', color: '#4ade80' },
                { label: 'Win Rate', value: '68%', trend: '+4% vs last quarter', color: '#4ade80' }
              ].map((kpi, i) => (
                <motion.div key={i} variants={springUp} className="crm-kpi-card">
                  <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(196,154,108,0.12) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                  <h3 className="crm-kpi-label">{kpi.label}</h3>
                  <p className="crm-kpi-value">{kpi.value}</p>
                  <p className="crm-kpi-trend" style={{ color: kpi.color }}>
                    <span>▲</span> {kpi.trend}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Main Overview Grid */}
            <div className="crm-overview-grid">
              {/* Active Pipeline */}
              <motion.div variants={springUp} className="crm-card">
                <div className="crm-card-header">
                  <h3 style={{ margin: 0, fontSize: '1.3rem', fontFamily: 'var(--font-heading)', color: '#fff' }}>Active Pipeline</h3>
                  <button 
                    onClick={() => setActiveTab('Projects')}
                    style={{ background: 'transparent', border: 'none', color: 'var(--color-accent, #c49a6c)', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500 }}
                  >
                    View All Projects →
                  </button>
                </div>
                <div className="crm-table-container">
                  <table className="crm-table">
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#9bb0a5', textAlign: 'left', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Client / Project</th>
                        <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Stage</th>
                        <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Value</th>
                        <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Last Contact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectsList.slice(0, 4).map((row, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                          <td style={{ padding: '1.2rem 0' }}>
                            <p style={{ margin: 0, fontWeight: 600, color: '#fff', fontSize: '1rem' }}>{row.name}</p>
                            <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: '#9bb0a5' }}>{row.type} • {row.location}</p>
                          </td>
                          <td style={{ padding: '1.2rem 0' }}>
                            <span style={{ 
                              background: `${row.color}18`, 
                              color: row.color, 
                              border: `1px solid ${row.color}40`,
                              padding: '4px 12px', 
                              borderRadius: '20px',
                              fontSize: '0.8rem',
                              fontWeight: 500
                            }}>
                              {row.stage}
                            </span>
                          </td>
                          <td style={{ padding: '1.2rem 0', color: '#fff', fontWeight: 600 }}>{row.value}</td>
                          <td style={{ padding: '1.2rem 0', color: '#9bb0a5', fontSize: '0.9rem' }}>Today</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Tasks & Operations Reminders */}
              <motion.div variants={springUp} className="crm-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="crm-card-header">
                  <h3 style={{ margin: 0, fontSize: '1.3rem', fontFamily: 'var(--font-heading)', color: '#fff' }}>Tasks & Reminders</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-accent, #c49a6c)' }}>{tasks.filter(t => !t.done).length} Pending</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1 }}>
                  {tasks.map((task) => (
                    <div 
                      key={task.id} 
                      onClick={() => toggleTask(task.id)}
                      style={{ 
                        background: task.done ? 'rgba(255,255,255,0.015)' : 'rgba(255,255,255,0.035)', 
                        padding: '1rem', 
                        borderRadius: '14px',
                        borderLeft: `4px solid ${task.urgent ? '#f87171' : 'var(--color-accent, #c49a6c)'}`,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        opacity: task.done ? 0.5 : 1,
                        transition: 'all 0.2s'
                      }}
                    >
                      <input 
                        type="checkbox" 
                        checked={task.done} 
                        onChange={() => {}} 
                        style={{ marginTop: '3px', accentColor: 'var(--color-accent, #c49a6c)', cursor: 'pointer' }}
                      />
                      <div style={{ flex: 1 }}>
                        <p style={{ 
                          margin: 0, 
                          fontSize: '0.95rem', 
                          color: '#fff', 
                          lineHeight: 1.4,
                          textDecoration: task.done ? 'line-through' : 'none'
                        }}>
                          {task.text}
                        </p>
                        <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.78rem', color: '#9bb0a5' }}>{task.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {showTaskInput ? (
                  <form onSubmit={handleAddTask} style={{ marginTop: '1.5rem' }}>
                    <input 
                      type="text" 
                      placeholder="e.g. Schedule grease trap inspection with contractor"
                      value={newTaskInput}
                      onChange={(e) => setNewTaskInput(e.target.value)}
                      autoFocus
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--color-accent, #c49a6c)',
                        borderRadius: '10px',
                        color: '#fff',
                        fontSize: '0.9rem',
                        marginBottom: '0.5rem',
                        outline: 'none'
                      }}
                    />
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button type="submit" style={{ flex: 1, padding: '0.6rem', background: 'var(--color-accent, #c49a6c)', color: '#050806', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>Add Task</button>
                      <button type="button" onClick={() => setShowTaskInput(false)} style={{ padding: '0.6rem 1rem', background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                    </div>
                  </form>
                ) : (
                  <button 
                    onClick={() => setShowTaskInput(true)}
                    style={{ 
                      marginTop: '1.5rem',
                      background: 'transparent', 
                      border: '1px dashed rgba(255,255,255,0.2)', 
                      color: '#9bb0a5', 
                      padding: '0.85rem', 
                      borderRadius: '14px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s'
                    }}
                  >
                    + Add Consulting Task
                  </button>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* ----------------- TAB 2: PROJECTS (THE ONE CLICKED BY USER) ----------------- */}
        {activeTab === 'Projects' && (
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            {/* Top Filter and Search Bar */}
            <div className="crm-projects-filter-bar">
              <div className="crm-filter-pills">
                {['All', 'Execution', 'Planning', 'Final Handover'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setProjectFilter(status)}
                    style={{
                      background: projectFilter === status ? 'var(--color-accent, #c49a6c)' : 'transparent',
                      color: projectFilter === status ? '#050806' : '#9bb0a5',
                      border: 'none',
                      padding: '0.5rem 1.25rem',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: projectFilter === status ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div className="crm-projects-search-row">
                <input 
                  type="text" 
                  placeholder="Search project by name or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '30px',
                    color: '#fff',
                    fontSize: '0.9rem',
                    width: '300px',
                    outline: 'none'
                  }}
                />
                <button 
                  onClick={() => setShowNewProjectModal(true)}
                  style={{
                    background: 'var(--color-accent, #c49a6c)',
                    color: '#050806',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '30px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  + Add Project
                </button>
              </div>
            </div>

            {/* Project Cards Grid */}
            <div className="crm-projects-grid">
              {projectsList
                .filter(p => projectFilter === 'All' || p.status.includes(projectFilter))
                .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.location.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((project) => (
                  <motion.div 
                    key={project.id} 
                    variants={springUp}
                    style={{
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '24px',
                      padding: '2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{ position: 'absolute', top: 0, right: 0, width: '120px', height: '120px', background: 'radial-gradient(circle, rgba(196,154,108,0.1) 0%, transparent 70%)', transform: 'translate(40%, -40%)' }} />

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div>
                          <span style={{ 
                            fontSize: '0.75rem', 
                            textTransform: 'uppercase', 
                            letterSpacing: '1px', 
                            color: 'var(--color-accent, #c49a6c)',
                            fontWeight: 600
                          }}>
                            {project.type}
                          </span>
                          <h3 style={{ margin: '0.3rem 0', fontSize: '1.4rem', fontFamily: 'var(--font-heading)', color: '#fff' }}>{project.name}</h3>
                          <p style={{ margin: 0, fontSize: '0.88rem', color: '#9bb0a5', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-accent, #c49a6c)' }}>
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                              <circle cx="12" cy="10" r="3"/>
                            </svg>
                            {project.location}
                          </p>
                        </div>
                        <span style={{ 
                          background: `${project.color}18`, 
                          color: project.color, 
                          border: `1px solid ${project.color}40`,
                          padding: '6px 14px', 
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: 600
                        }}>
                          {project.status}
                        </span>
                      </div>

                      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '14px', margin: '1.2rem 0' }}>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#9bb0a5', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Current Critical Milestone</p>
                        <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.95rem', color: '#fff', fontWeight: 500 }}>{project.currentMilestone}</p>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem 0' }}>
                        <div>
                          <p style={{ margin: 0, fontSize: '0.78rem', color: '#9bb0a5' }}>Project Scale</p>
                          <p style={{ margin: '2px 0 0 0', fontSize: '0.95rem', color: '#fff', fontWeight: 500 }}>{project.scale}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ margin: 0, fontSize: '0.78rem', color: '#9bb0a5' }}>Contract Value</p>
                          <p style={{ margin: '2px 0 0 0', fontSize: '1.1rem', color: 'var(--color-accent, #c49a6c)', fontWeight: 600 }}>{project.value}</p>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: '1.5rem', paddingTop: '1.2rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', color: '#9bb0a5' }}>Lead: <strong style={{ color: '#fff' }}>{project.lead}</strong></span>
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button 
                          onClick={() => triggerNotification(`Opening MEP & Kitchen Blueprints for ${project.name}...`)}
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: '#fff',
                            padding: '0.6rem 1.1rem',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            cursor: 'pointer'
                          }}
                        >
                          Blueprints
                        </button>
                        <button 
                          onClick={() => triggerNotification(`Milestone updated for ${project.name}`)}
                          style={{
                            background: 'rgba(196, 154, 108, 0.15)',
                            border: '1px solid rgba(196, 154, 108, 0.4)',
                            color: 'var(--color-accent, #c49a6c)',
                            padding: '0.6rem 1.1rem',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          Update Phase
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}

        {/* ----------------- TAB 3: CLIENTS ----------------- */}
        {activeTab === 'Clients' && (
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <div className="crm-card">
              <div className="crm-card-header">
                <h3 style={{ margin: 0, fontSize: '1.4rem', fontFamily: 'var(--font-heading)', color: '#fff' }}>Client Directory & Stakeholders</h3>
                <button 
                  onClick={() => setShowNewLeadModal(true)}
                  style={{
                    background: 'var(--color-accent, #c49a6c)',
                    color: '#050806',
                    border: 'none',
                    padding: '0.7rem 1.5rem',
                    borderRadius: '30px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  + Add Client Profile
                </button>
              </div>

              <div className="crm-table-container">
                <table className="crm-table">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#9bb0a5', textAlign: 'left', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      <th style={{ paddingBottom: '1.2rem', fontWeight: 500 }}>Client Name & Entity</th>
                      <th style={{ paddingBottom: '1.2rem', fontWeight: 500 }}>Associated Project</th>
                      <th style={{ paddingBottom: '1.2rem', fontWeight: 500 }}>Direct Contact</th>
                      <th style={{ paddingBottom: '1.2rem', fontWeight: 500 }}>Account Value</th>
                      <th style={{ paddingBottom: '1.2rem', fontWeight: 500 }}>Status</th>
                      <th style={{ paddingBottom: '1.2rem', fontWeight: 500, textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientsList.map((client, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <td style={{ padding: '1.4rem 0' }}>
                          <p style={{ margin: 0, fontWeight: 600, color: '#fff', fontSize: '1.05rem' }}>{client.name}</p>
                          <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: '#9bb0a5' }}>{client.company}</p>
                        </td>
                        <td style={{ padding: '1.4rem 0', color: '#fff' }}>{client.project}</td>
                        <td style={{ padding: '1.4rem 0' }}>
                          <p style={{ margin: 0, fontSize: '0.9rem', color: '#fff' }}>{client.contact}</p>
                          <p style={{ margin: '2px 0 0 0', fontSize: '0.82rem', color: '#9bb0a5' }}>{client.email}</p>
                        </td>
                        <td style={{ padding: '1.4rem 0', color: 'var(--color-accent, #c49a6c)', fontWeight: 600 }}>{client.value}</td>
                        <td style={{ padding: '1.4rem 0' }}>
                          <span style={{
                            background: client.status === 'VIP Client' ? 'rgba(196, 154, 108, 0.2)' : 'rgba(74, 222, 128, 0.15)',
                            color: client.status === 'VIP Client' ? 'var(--color-accent, #c49a6c)' : '#4ade80',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: 600
                          }}>
                            {client.status}
                          </span>
                        </td>
                        <td style={{ padding: '1.4rem 0', textAlign: 'right' }}>
                          <a 
                            href={`https://wa.me/${client.contact.replace(/[^0-9]/g, '')}`} 
                            target="_blank" 
                            rel="noreferrer"
                            style={{
                              background: 'rgba(255,255,255,0.05)',
                              color: '#fff',
                              textDecoration: 'none',
                              padding: '0.55rem 1rem',
                              borderRadius: '20px',
                              fontSize: '0.85rem',
                              marginRight: '8px',
                              display: 'inline-block'
                            }}
                          >
                            WhatsApp
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* ----------------- TAB 4: PROPOSALS ----------------- */}
        {activeTab === 'Proposals' && (
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <div className="crm-proposals-kpi">
              {[
                { label: 'Proposals In Pipeline', value: '₹30.0 Lakhs', desc: '4 active bids' },
                { label: 'Avg Deal Size', value: '₹7.5 Lakhs', desc: 'Turnkey & MEP consulting' },
                { label: 'Win Probability Weighted', value: '₹22.1 Lakhs', desc: 'Based on stage' },
                { label: 'Close Rate', value: '72%', desc: 'Last 12 months' }
              ].map((stat, i) => (
                <div key={i} className="crm-proposals-kpi-card">
                  <p className="crm-kpi-label">{stat.label}</p>
                  <p className="crm-proposals-kpi-value">{stat.value}</p>
                  <p className="crm-kpi-trend" style={{ color: 'var(--color-accent, #c49a6c)' }}>{stat.desc}</p>
                </div>
              ))}
            </div>

            <div className="crm-card">
              <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.4rem', fontFamily: 'var(--font-heading)', color: '#fff' }}>Proposals & Scopes of Work</h3>
              <div className="crm-table-container">
                <table className="crm-table">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#9bb0a5', textAlign: 'left', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Proposal Title</th>
                      <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Target Client</th>
                      <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Quoted Amount</th>
                      <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Dispatch Date</th>
                      <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Status</th>
                      <th style={{ paddingBottom: '1rem', fontWeight: 500, textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proposalsList.map((p, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <td style={{ padding: '1.3rem 0', color: '#fff', fontWeight: 600 }}>{p.title}</td>
                        <td style={{ padding: '1.3rem 0', color: '#9bb0a5' }}>{p.client}</td>
                        <td style={{ padding: '1.3rem 0', color: 'var(--color-accent, #c49a6c)', fontWeight: 600 }}>{p.amount}</td>
                        <td style={{ padding: '1.3rem 0', color: '#9bb0a5', fontSize: '0.9rem' }}>{p.date}</td>
                        <td style={{ padding: '1.3rem 0' }}>
                          <span style={{ 
                            background: p.status.includes('Accepted') ? 'rgba(74, 222, 128, 0.15)' : 'rgba(251, 191, 36, 0.15)',
                            color: p.status.includes('Accepted') ? '#4ade80' : '#fbbf24',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: 500
                          }}>
                            {p.status}
                          </span>
                        </td>
                        <td style={{ padding: '1.3rem 0', textAlign: 'right' }}>
                          <button 
                            onClick={() => triggerNotification(`Downloading agreement draft for ${p.client}...`)}
                            style={{
                              background: 'rgba(255,255,255,0.05)',
                              border: '1px solid rgba(255,255,255,0.1)',
                              color: '#fff',
                              padding: '0.5rem 1rem',
                              borderRadius: '16px',
                              fontSize: '0.85rem',
                              cursor: 'pointer'
                            }}
                          >
                            PDF Draft
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* ----------------- TAB 5: FINANCES ----------------- */}
        {activeTab === 'Finances' && (
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <div className="crm-finances-kpi">
              <div className="crm-finances-kpi-card">
                <p className="crm-kpi-label">Total Invoiced (FY26)</p>
                <p className="crm-finances-kpi-value" style={{ color: '#fff' }}>₹48.2 Lakhs</p>
                <p className="crm-kpi-trend" style={{ color: '#4ade80' }}>▲ 24% ahead of targets</p>
              </div>
              <div className="crm-finances-kpi-card">
                <p className="crm-kpi-label">Collected Retainers</p>
                <p className="crm-finances-kpi-value" style={{ color: 'var(--color-accent, #c49a6c)' }}>₹36.8 Lakhs</p>
                <p className="crm-kpi-trend" style={{ color: '#9bb0a5' }}>76.3% Collection efficiency</p>
              </div>
              <div className="crm-finances-kpi-card">
                <p className="crm-kpi-label">Pending Milestone Dues</p>
                <p className="crm-finances-kpi-value" style={{ color: '#fbbf24' }}>₹11.4 Lakhs</p>
                <p className="crm-kpi-trend" style={{ color: '#fbbf24' }}>Due upon MEP sign-offs</p>
              </div>
            </div>

            <div className="crm-card">
              <div className="crm-card-header">
                <h3 style={{ margin: 0, fontSize: '1.4rem', fontFamily: 'var(--font-heading)', color: '#fff' }}>Recent Invoices & Retainers</h3>
                <button 
                  onClick={() => triggerNotification('Generating new GST Tax Invoice...')}
                  style={{
                    background: 'var(--color-accent, #c49a6c)',
                    color: '#050806',
                    border: 'none',
                    padding: '0.65rem 1.4rem',
                    borderRadius: '24px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  + Create Invoice
                </button>
              </div>

              <div className="crm-table-container">
                <table className="crm-table">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#9bb0a5', textAlign: 'left', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                      <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Invoice #</th>
                      <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Client / Establishment</th>
                      <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Amount (Inc. GST)</th>
                      <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Issue Date</th>
                      <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Status</th>
                      <th style={{ paddingBottom: '1rem', fontWeight: 500, textAlign: 'right' }}>Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 'INV-2026-089', client: 'The Gilded Spoon', amt: '₹4,42,500', date: '01 Oct 2026', status: 'Paid', statusColor: '#4ade80' },
                      { id: 'INV-2026-088', client: 'Aria Trattoria', amt: '₹2,36,000', date: '28 Sep 2026', status: 'Due in 5 Days', statusColor: '#fbbf24' },
                      { id: 'INV-2026-087', client: 'Luna Bistro & Tapas', amt: '₹5,90,000', date: '15 Sep 2026', status: 'Paid', statusColor: '#4ade80' },
                      { id: 'INV-2026-086', client: 'Zaffran Heritage Courtyard', amt: '₹7,08,000', date: '10 Sep 2026', status: 'Paid', statusColor: '#4ade80' }
                    ].map((inv, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <td style={{ padding: '1.2rem 0', color: '#fff', fontWeight: 600 }}>{inv.id}</td>
                        <td style={{ padding: '1.2rem 0', color: '#9bb0a5' }}>{inv.client}</td>
                        <td style={{ padding: '1.2rem 0', color: '#fff', fontWeight: 600 }}>{inv.amt}</td>
                        <td style={{ padding: '1.2rem 0', color: '#9bb0a5', fontSize: '0.9rem' }}>{inv.date}</td>
                        <td style={{ padding: '1.2rem 0' }}>
                          <span style={{ 
                            background: `${inv.statusColor}20`, 
                            color: inv.statusColor, 
                            padding: '4px 12px', 
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: 500
                          }}>
                            {inv.status}
                          </span>
                        </td>
                        <td style={{ padding: '1.2rem 0', textAlign: 'right' }}>
                          <button 
                            onClick={() => triggerNotification(`Downloading official receipt for ${inv.id}...`)}
                            style={{
                              background: 'rgba(255,255,255,0.05)',
                              border: '1px solid rgba(255,255,255,0.1)',
                              color: '#fff',
                              padding: '0.5rem 1rem',
                              borderRadius: '16px',
                              fontSize: '0.82rem',
                              cursor: 'pointer'
                            }}
                          >
                            Tax Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* ----------------- TAB 6: SETTINGS ----------------- */}
        {activeTab === 'Settings' && (
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ maxWidth: '800px' }}>
            <div className="crm-card" style={{ marginBottom: '2rem' }}>
              <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.4rem', fontFamily: 'var(--font-heading)', color: '#fff' }}>Consultancy Firm Credentials</h3>
              
              <div className="crm-form-row">
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9bb0a5', marginBottom: '0.4rem' }}>Managing Director</label>
                  <input type="text" readOnly value="Julian Rajput" style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '0.95rem', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9bb0a5', marginBottom: '0.4rem' }}>Practice Title</label>
                  <input type="text" readOnly value="JR Consulting (Civil Eng. & Hospitality)" style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '0.95rem', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div className="crm-form-row">
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9bb0a5', marginBottom: '0.4rem' }}>Official Contact Number</label>
                  <input type="text" readOnly value="+91 98980 12345" style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '0.95rem', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9bb0a5', marginBottom: '0.4rem' }}>GSTIN Registration</label>
                  <input type="text" readOnly value="27AAACJ4892M1ZK" style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '0.95rem', boxSizing: 'border-box' }} />
                </div>
              </div>

              <button 
                onClick={() => triggerNotification('Practice profile updated successfully.')}
                style={{
                  background: 'var(--color-accent, #c49a6c)',
                  color: '#050806',
                  border: 'none',
                  padding: '0.8rem 1.8rem',
                  borderRadius: '24px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  marginTop: '1rem'
                }}
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        )}
      </main>

      {/* ----------------- MODAL: NEW LEAD ----------------- */}
      <AnimatePresence>
        {showNewLeadModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                background: '#090e0a',
                border: '1px solid var(--color-accent, #c49a6c)',
                borderRadius: '24px',
                padding: '2.5rem',
                width: '500px',
                maxWidth: '90vw',
                boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
              }}
            >
              <h2 style={{ margin: '0 0 0.5rem 0', fontFamily: 'var(--font-heading)', color: '#fff' }}>Register New F&B Lead</h2>
              <p style={{ margin: '0 0 2rem 0', color: '#9bb0a5', fontSize: '0.9rem' }}>Record an incoming restaurant setup inquiry.</p>

              <form onSubmit={(e) => {
                e.preventDefault();
                setShowNewLeadModal(false);
                triggerNotification('New consulting inquiry saved to pipeline.');
              }}>
                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9bb0a5', marginBottom: '0.4rem' }}>Client / Founder Name</label>
                  <input type="text" required placeholder="e.g. Rahul Kapoor" style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', outline: 'none' }} />
                </div>
                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9bb0a5', marginBottom: '0.4rem' }}>Concept & City</label>
                  <input type="text" required placeholder="e.g. Modern Pan-Asian Bistro, Goa" style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', outline: 'none' }} />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9bb0a5', marginBottom: '0.4rem' }}>Estimated Setup Budget</label>
                  <input type="text" required placeholder="e.g. ₹45 Lakhs - ₹60 Lakhs" style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setShowNewLeadModal(false)} style={{ padding: '0.8rem 1.5rem', background: 'rgba(255,255,255,0.08)', color: '#fff', border: 'none', borderRadius: '24px', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" style={{ padding: '0.8rem 1.8rem', background: 'var(--color-accent, #c49a6c)', color: '#050806', border: 'none', borderRadius: '24px', fontWeight: 600, cursor: 'pointer' }}>Save Lead</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ----------------- MODAL: NEW PROJECT ----------------- */}
      <AnimatePresence>
        {showNewProjectModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                background: '#090e0a',
                border: '1px solid var(--color-accent, #c49a6c)',
                borderRadius: '24px',
                padding: '2.5rem',
                width: '520px',
                maxWidth: '90vw',
                boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
              }}
            >
              <h2 style={{ margin: '0 0 0.5rem 0', fontFamily: 'var(--font-heading)', color: '#fff' }}>Initiate Turnkey Project</h2>
              <p style={{ margin: '0 0 2rem 0', color: '#9bb0a5', fontSize: '0.9rem' }}>Create a new consulting engagement file.</p>

              <form onSubmit={(e) => {
                e.preventDefault();
                if (!newProjectName.trim()) return;
                const newProj = {
                  id: `proj-${Date.now()}`,
                  name: newProjectName.trim(),
                  type: 'Turnkey Restobar & Dining',
                  location: newProjectLocation.trim() || 'New Delhi, India',
                  scale: '3,000 sq.ft • 100 Covers',
                  stage: 'Planning & Concept (10%)',
                  currentMilestone: 'Site Feasibility & Architectural Concept',
                  value: newProjectValue.trim() || '₹10.0 Lakhs',
                  lead: 'Julian Rajput',
                  status: 'Planning',
                  color: '#fbbf24'
                };
                setProjectsList([newProj, ...projectsList]);
                setNewProjectName('');
                setNewProjectLocation('');
                setNewProjectValue('');
                setShowNewProjectModal(false);
                triggerNotification(`New project "${newProj.name}" created.`);
              }}>
                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9bb0a5', marginBottom: '0.4rem' }}>Establishment Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Olive Grove Trattoria" 
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', outline: 'none' }} 
                  />
                </div>
                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9bb0a5', marginBottom: '0.4rem' }}>Location & Square Footage</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Sector 29 Gurgaon • 2,800 sq ft" 
                    value={newProjectLocation}
                    onChange={(e) => setNewProjectLocation(e.target.value)}
                    style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', outline: 'none' }} 
                  />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9bb0a5', marginBottom: '0.4rem' }}>Retainer Fee Quoted</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. ₹8.5 Lakhs" 
                    value={newProjectValue}
                    onChange={(e) => setNewProjectValue(e.target.value)}
                    style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', outline: 'none' }} 
                  />
                </div>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setShowNewProjectModal(false)} style={{ padding: '0.8rem 1.5rem', background: 'rgba(255,255,255,0.08)', color: '#fff', border: 'none', borderRadius: '24px', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" style={{ padding: '0.8rem 1.8rem', background: 'var(--color-accent, #c49a6c)', color: '#050806', border: 'none', borderRadius: '24px', fontWeight: 600, cursor: 'pointer' }}>Create Project</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
