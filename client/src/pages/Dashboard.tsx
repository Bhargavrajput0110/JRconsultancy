import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LogOut, Plus, Trash2, CheckCircle2, FolderKanban, Users, FileText, IndianRupee } from 'lucide-react';
import AdminLogin from '../components/AdminLogin';

interface Task {
  id: number;
  text: string;
  time: string;
  done: boolean;
  urgent?: boolean;
}

interface Project {
  id: string;
  name: string;
  type: string;
  location: string;
  scale: string;
  stage: string;
  currentMilestone: string;
  value: string;
  lead: string;
  status: string;
  color: string;
}

interface Client {
  id?: string;
  name: string;
  company: string;
  project: string;
  contact: string;
  email: string;
  status: string;
  value: string;
  notes?: string;
  date?: string;
}

interface Proposal {
  id: string;
  title: string;
  client: string;
  amount: string;
  date: string;
  status: string;
  prob?: string;
}

interface Invoice {
  id: string;
  client: string;
  amt: string;
  date: string;
  status: string;
  statusColor?: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Clients' | 'Projects' | 'Proposals' | 'Finances' | 'Settings'>('Overview');
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showNewProposalModal, setShowNewProposalModal] = useState(false);
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
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

  // Real Persistent Storage States (Defaulting to empty arrays - no fake data)
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('jr_crm_tasks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [newTaskInput, setNewTaskInput] = useState('');
  const [showTaskInput, setShowTaskInput] = useState(false);

  const [projectsList, setProjectsList] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('jr_crm_projects');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [clientsList, setClientsList] = useState<Client[]>(() => {
    try {
      const saved = localStorage.getItem('jr_crm_clients');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [proposalsList, setProposalsList] = useState<Proposal[]>(() => {
    try {
      const saved = localStorage.getItem('jr_crm_proposals');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [invoicesList, setInvoicesList] = useState<Invoice[]>(() => {
    try {
      const saved = localStorage.getItem('jr_crm_invoices');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Settings State
  const [settingsData, setSettingsData] = useState(() => {
    try {
      const saved = localStorage.getItem('jr_crm_settings');
      return saved ? JSON.parse(saved) : {
        director: 'Jigar Rajgor',
        title: 'JR Consulting (Hospitality & Kitchen Engineering)',
        phone: '+91 99095 58212',
        email: 'contact@jrconsulting.in',
        gstin: '24AAACJ4892M1ZK'
      };
    } catch {
      return {
        director: 'Jigar Rajgor',
        title: 'JR Consulting (Hospitality & Kitchen Engineering)',
        phone: '+91 99095 58212',
        email: 'contact@jrconsulting.in',
        gstin: '24AAACJ4892M1ZK'
      };
    }
  });

  // Sync state changes to localStorage
  useEffect(() => {
    try { localStorage.setItem('jr_crm_tasks', JSON.stringify(tasks)); } catch {}
  }, [tasks]);

  useEffect(() => {
    try { localStorage.setItem('jr_crm_projects', JSON.stringify(projectsList)); } catch {}
  }, [projectsList]);

  useEffect(() => {
    try { localStorage.setItem('jr_crm_clients', JSON.stringify(clientsList)); } catch {}
  }, [clientsList]);

  useEffect(() => {
    try { localStorage.setItem('jr_crm_proposals', JSON.stringify(proposalsList)); } catch {}
  }, [proposalsList]);

  useEffect(() => {
    try { localStorage.setItem('jr_crm_invoices', JSON.stringify(invoicesList)); } catch {}
  }, [invoicesList]);

  // Modal Input States
  const [leadForm, setLeadForm] = useState({ name: '', company: '', phone: '', email: '', budget: '', notes: '' });
  const [projectForm, setProjectForm] = useState({ name: '', location: '', scale: '', value: '', type: 'Turnkey Restobar & Dining' });
  const [proposalForm, setProposalForm] = useState({ title: '', client: '', amount: '', prob: '80%' });
  const [invoiceForm, setInvoiceForm] = useState({ id: `INV-${Date.now().toString().slice(-4)}`, client: '', amt: '', status: 'Pending' });

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

  const deleteTask = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setTasks(tasks.filter(t => t.id !== id));
    triggerNotification('Task removed.');
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      text: newTaskInput.trim(),
      time: 'Added just now',
      done: false,
      urgent: false
    };
    setTasks([newTask, ...tasks]);
    setNewTaskInput('');
    setShowTaskInput(false);
    triggerNotification('Consulting task scheduled.');
  };

  // Add Lead Handler
  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name.trim()) return;
    const newClient: Client = {
      id: `lead-${Date.now()}`,
      name: leadForm.name.trim(),
      company: leadForm.company.trim() || 'Restaurant Venture',
      project: leadForm.company.trim() || 'New Restaurant Setup',
      contact: leadForm.phone.trim() || '+91 99095 58212',
      email: leadForm.email.trim() || 'contact@jrconsulting.in',
      status: 'Qualified Lead',
      value: leadForm.budget.trim() || 'Pending Scope',
      notes: leadForm.notes.trim(),
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setClientsList([newClient, ...clientsList]);
    setLeadForm({ name: '', company: '', phone: '', email: '', budget: '', notes: '' });
    setShowNewLeadModal(false);
    triggerNotification(`Lead "${newClient.name}" added to pipeline.`);
  };

  // Add Project Handler
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.name.trim()) return;
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: projectForm.name.trim(),
      type: projectForm.type || 'Turnkey Restobar & Dining',
      location: projectForm.location.trim() || 'India',
      scale: projectForm.scale.trim() || 'Custom Scale',
      stage: 'Planning & Concept (10%)',
      currentMilestone: 'Site Feasibility & Layout Verification',
      value: projectForm.value.trim() || 'Pending Scope',
      lead: adminUser?.name || 'Jigar Rajgor',
      status: 'Planning',
      color: '#fbbf24'
    };
    setProjectsList([newProject, ...projectsList]);
    setProjectForm({ name: '', location: '', scale: '', value: '', type: 'Turnkey Restobar & Dining' });
    setShowNewProjectModal(false);
    triggerNotification(`Project "${newProject.name}" initiated.`);
  };

  // Add Proposal Handler
  const handleCreateProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposalForm.title.trim()) return;
    const newProp: Proposal = {
      id: `prop-${Date.now()}`,
      title: proposalForm.title.trim(),
      client: proposalForm.client.trim() || 'Prospective Client',
      amount: proposalForm.amount.trim() || '₹5.0 Lakhs',
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Draft Proposal',
      prob: proposalForm.prob || '75%'
    };
    setProposalsList([newProp, ...proposalsList]);
    setProposalForm({ title: '', client: '', amount: '', prob: '80%' });
    setShowNewProposalModal(false);
    triggerNotification('New commercial proposal recorded.');
  };

  // Add Invoice Handler
  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoiceForm.client.trim()) return;
    const newInv: Invoice = {
      id: invoiceForm.id || `INV-${Date.now().toString().slice(-4)}`,
      client: invoiceForm.client.trim(),
      amt: invoiceForm.amt.trim() || '₹2,50,000',
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: invoiceForm.status || 'Due in 15 Days',
      statusColor: invoiceForm.status === 'Paid' ? '#4ade80' : '#fbbf24'
    };
    setInvoicesList([newInv, ...invoicesList]);
    setInvoiceForm({ id: `INV-${Date.now().toString().slice(-4)}`, client: '', amt: '', status: 'Pending' });
    setShowNewInvoiceModal(false);
    triggerNotification(`Invoice ${newInv.id} created.`);
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
        fontFamily: 'var(--font-sans)'
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          border: '3px solid rgba(196, 154, 108, 0.2)',
          borderTopColor: '#c49a6c',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
        <p style={{ margin: 0, fontSize: '0.95rem', letterSpacing: '0.5px' }}>
          Verifying executive credentials...
        </p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // If unauthenticated, render luxury 4-digit PIN lock screen
  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={(user, token) => {
          setIsAuthenticated(true);
          setAdminUser(user);
          if (token) {
            localStorage.setItem('jr_admin_token', token);
            localStorage.setItem('jr_admin_user', JSON.stringify(user));
          }
          triggerNotification(`Welcome back to JR Executive Suite, ${user.name}`);
        }}
      />
    );
  }

  const executiveName = adminUser?.name || 'Jigar Rajgor';

  return (
    <div className="crm-container crm-layout">
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: '24px',
              right: '24px',
              background: 'linear-gradient(135deg, rgba(20,29,22,0.95) 0%, rgba(10,15,11,0.95) 100%)',
              border: '1px solid var(--color-accent, #c49a6c)',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '30px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.9rem',
              fontWeight: 500
            }}
          >
            <span style={{ color: 'var(--color-accent, #c49a6c)' }}>✦</span>
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Top Navigation Bar */}
      <div className="crm-mobile-topbar">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--color-accent, #c49a6c)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px',
            cursor: 'pointer'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {mobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '7px',
            background: 'linear-gradient(135deg, #c49a6c 0%, #8c6b45 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.75rem',
            color: '#050806'
          }}>
            JR
          </div>
          <span style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.5px', color: '#fff' }}>JR CRM</span>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          aria-label="Sign out"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#f87171',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px',
            cursor: 'pointer'
          }}
        >
          <LogOut size={18} />
        </button>
      </div>

      {/* Backdrop overlay for mobile drawer */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(4px)',
            zIndex: 998
          }}
        />
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside className={`crm-sidebar ${mobileMenuOpen ? 'crm-sidebar-open' : ''}`}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 0.5rem 2rem 0.5rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #c49a6c 0%, #8c6b45 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.1rem',
              color: '#050806',
              boxShadow: '0 4px 12px rgba(196, 154, 108, 0.3)'
            }}>
              JR
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: '#fff' }}>JR CRM</h2>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-accent, #c49a6c)', letterSpacing: '1px', textTransform: 'uppercase' }}>Executive Suite</span>
            </div>
          </div>

          <nav className="crm-nav">
            {[
              { id: 'Overview', label: 'Overview', icon: '✦', badge: null },
              { id: 'Clients', label: 'Clients & Leads', icon: '●', badge: clientsList.length > 0 ? clientsList.length : null },
              { id: 'Projects', label: 'Active Projects', icon: '●', badge: projectsList.length > 0 ? projectsList.length : null },
              { id: 'Proposals', label: 'Proposals', icon: '●', badge: proposalsList.length > 0 ? proposalsList.length : null },
              { id: 'Finances', label: 'Finances', icon: '●', badge: invoicesList.length > 0 ? invoicesList.length : null },
              { id: 'Settings', label: 'Firm Settings', icon: '●', badge: null }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`crm-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  background: activeTab === tab.id ? 'rgba(196, 154, 108, 0.14)' : 'transparent',
                  color: activeTab === tab.id ? '#ffffff' : '#8e9f95',
                  border: activeTab === tab.id ? '1px solid rgba(196, 154, 108, 0.4)' : '1px solid transparent',
                  padding: '0.85rem 1.1rem',
                  borderRadius: '14px',
                  fontSize: '0.92rem',
                  fontWeight: activeTab === tab.id ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: activeTab === tab.id ? '0 4px 18px rgba(0, 0, 0, 0.45)' : 'none',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '0.9rem', color: activeTab === tab.id ? 'var(--color-accent, #c49a6c)' : 'inherit' }}>{tab.icon}</span>
                  {tab.label}
                </div>
                {tab.badge !== null && (
                  <span style={{
                    fontSize: '0.72rem',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    background: activeTab === tab.id ? 'var(--color-accent, #c49a6c)' : 'rgba(255,255,255,0.08)',
                    color: activeTab === tab.id ? '#050806' : '#fff',
                    fontWeight: 600
                  }}>
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* User Card at bottom of sidebar */}
        <div style={{
          padding: '1.2rem',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--color-accent, #c49a6c)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.95rem',
              color: '#050806',
              flexShrink: 0
            }}>
              JR
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: '0.92rem', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {executiveName}
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

      {/* MAIN CONTENT AREA */}
      <main className="crm-main crm-content">
        {/* Top Header */}
        <header className="crm-header">
          <motion.div initial="hidden" animate="visible" variants={springUp}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-accent, #c49a6c)', textTransform: 'uppercase', letterSpacing: '1px' }}>Portal</span>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' }}>/</span>
              <span style={{ fontSize: '0.8rem', color: '#9bb0a5' }}>{activeTab}</span>
            </div>
            <h1 style={{ fontSize: '2.5rem', margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 500, color: '#fff' }}>
              {activeTab === 'Overview' && <>Welcome back, <span style={{ fontStyle: 'italic', color: 'var(--color-accent, #c49a6c)' }}>{executiveName.split(' ')[0]}</span></>}
              {activeTab === 'Projects' && <>Client Consulting <span style={{ fontStyle: 'italic', color: 'var(--color-accent, #c49a6c)' }}>Projects</span></>}
              {activeTab === 'Clients' && <>Client Accounts & <span style={{ fontStyle: 'italic', color: 'var(--color-accent, #c49a6c)' }}>Inquiries</span></>}
              {activeTab === 'Proposals' && <>Commercial <span style={{ fontStyle: 'italic', color: 'var(--color-accent, #c49a6c)' }}>Proposals</span></>}
              {activeTab === 'Finances' && <>Financial <span style={{ fontStyle: 'italic', color: 'var(--color-accent, #c49a6c)' }}>Billing & Invoices</span></>}
              {activeTab === 'Settings' && <>Consultancy <span style={{ fontStyle: 'italic', color: 'var(--color-accent, #c49a6c)' }}>Settings</span></>}
            </h1>
            <p style={{ color: '#9bb0a5', margin: '0.5rem 0 0 0', fontSize: '1rem' }}>
              {activeTab === 'Overview' && "Live dashboard of your restaurant engineering setups, client inquiries, and consulting tasks."}
              {activeTab === 'Projects' && "Track turnkey kitchen layouts, MEP engineering, licensing, and client handovers."}
              {activeTab === 'Clients' && "Manage restaurant owners, website discovery inquiries, and hospitality investors."}
              {activeTab === 'Proposals' && "Track pending scopes of work, retainer proposals, and won contracts."}
              {activeTab === 'Finances' && "Monitor retainer billings, phase GST invoices, and incoming consulting payments."}
              {activeTab === 'Settings' && "Configure firm credentials, practice details, and official contact defaults."}
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
                transition: 'all 0.2s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Plus size={16} />
              New Lead
            </button>
          </div>
        </header>

        {/* ----------------- TAB 1: OVERVIEW ----------------- */}
        {activeTab === 'Overview' && (
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            {/* Real KPI Cards */}
            <div className="crm-kpi-grid">
              {[
                { 
                  label: 'Active Projects', 
                  value: projectsList.length, 
                  trend: projectsList.length > 0 ? `${projectsList.length} ongoing setup${projectsList.length > 1 ? 's' : ''}` : 'Ready for new projects', 
                  color: '#4ade80' 
                },
                { 
                  label: 'Pending Proposals', 
                  value: proposalsList.filter(p => !p.status?.includes('Accepted')).length, 
                  trend: proposalsList.length > 0 ? `${proposalsList.filter(p => !p.status?.includes('Accepted')).length} awaiting sign-off` : 'No open bids', 
                  color: '#fbbf24' 
                },
                { 
                  label: 'Registered Leads', 
                  value: clientsList.length, 
                  trend: clientsList.length > 0 ? `${clientsList.length} total lead${clientsList.length > 1 ? 's' : ''}` : 'Awaiting inquiries', 
                  color: '#60a5fa' 
                },
                { 
                  label: 'Pending Tasks', 
                  value: tasks.filter(t => !t.done).length, 
                  trend: tasks.filter(t => !t.done).length > 0 ? `${tasks.filter(t => !t.done).length} need attention` : 'All tasks cleared', 
                  color: '#4ade80' 
                }
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
                {projectsList.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1.5rem', color: '#9bb0a5' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(196,154,108,0.1)', border: '1px solid rgba(196,154,108,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'var(--color-accent, #c49a6c)' }}>
                      <FolderKanban size={24} />
                    </div>
                    <h4 style={{ color: '#fff', fontSize: '1.15rem', margin: '0 0 0.5rem 0', fontFamily: 'var(--font-heading)' }}>No Active Projects Yet</h4>
                    <p style={{ margin: '0 auto 1.5rem', maxWidth: '380px', fontSize: '0.88rem', lineHeight: 1.5 }}>
                      All dummy template data has been removed. Click below to register your first real client project.
                    </p>
                    <button 
                      onClick={() => setShowNewProjectModal(true)}
                      style={{ background: 'var(--color-accent, #c49a6c)', color: '#050806', border: 'none', padding: '0.75rem 1.6rem', borderRadius: '30px', fontWeight: 600, cursor: 'pointer', fontSize: '0.88rem' }}
                    >
                      + Add First Project
                    </button>
                  </div>
                ) : (
                  <div className="crm-table-container">
                    <table className="crm-table">
                      <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#9bb0a5', textAlign: 'left', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Client / Project</th>
                          <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Stage</th>
                          <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Value</th>
                          <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Lead</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projectsList.slice(0, 4).map((row) => (
                          <tr key={row.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                            <td style={{ padding: '1.2rem 0' }}>
                              <p style={{ margin: 0, fontWeight: 600, color: '#fff', fontSize: '1rem' }}>{row.name}</p>
                              <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: '#9bb0a5' }}>{row.type} • {row.location}</p>
                            </td>
                            <td style={{ padding: '1.2rem 0' }}>
                              <span style={{ 
                                background: `${row.color || '#4ade80'}18`, 
                                color: row.color || '#4ade80', 
                                border: `1px solid ${row.color || '#4ade80'}40`,
                                padding: '4px 12px', 
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                fontWeight: 500
                              }}>
                                {row.stage}
                              </span>
                            </td>
                            <td style={{ padding: '1.2rem 0', color: '#fff', fontWeight: 600 }}>{row.value}</td>
                            <td style={{ padding: '1.2rem 0', color: '#9bb0a5', fontSize: '0.9rem' }}>{row.lead || executiveName}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>

              {/* Tasks & Operations Reminders */}
              <motion.div variants={springUp} className="crm-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="crm-card-header">
                  <h3 style={{ margin: 0, fontSize: '1.3rem', fontFamily: 'var(--font-heading)', color: '#fff' }}>Tasks & Reminders</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-accent, #c49a6c)' }}>{tasks.filter(t => !t.done).length} Pending</span>
                </div>

                {tasks.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: '#9bb0a5', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', color: '#4ade80' }}>
                      <CheckCircle2 size={24} />
                    </div>
                    <p style={{ color: '#fff', margin: '0 0 0.25rem 0', fontWeight: 600 }}>All Caught Up!</p>
                    <p style={{ fontSize: '0.85rem', margin: 0, color: '#9bb0a5' }}>Schedule kitchen layout reviews, client calls, or FSSAI deadlines.</p>
                  </div>
                ) : (
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
                          transition: 'all 0.2s',
                          position: 'relative'
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
                        <button
                          type="button"
                          onClick={(e) => deleteTask(task.id, e)}
                          title="Delete Task"
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'rgba(255,255,255,0.3)',
                            cursor: 'pointer',
                            padding: '4px'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#f87171'}
                          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {showTaskInput ? (
                  <form onSubmit={handleAddTask} style={{ marginTop: '1.5rem' }}>
                    <input 
                      type="text" 
                      placeholder="e.g. Inspect exhaust ducting with HVAC contractor"
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
                        outline: 'none',
                        boxSizing: 'border-box'
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
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <Plus size={16} />
                    Add Consulting Task
                  </button>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* ----------------- TAB 2: PROJECTS ----------------- */}
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
                    fontSize: '0.9rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Plus size={16} />
                  Add Project
                </button>
              </div>
            </div>

            {/* Projects Grid or Empty State */}
            {projectsList.length === 0 ? (
              <div className="crm-card" style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(196,154,108,0.1)', border: '1px solid rgba(196,154,108,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem', color: 'var(--color-accent, #c49a6c)' }}>
                  <FolderKanban size={28} />
                </div>
                <h3 style={{ color: '#fff', fontSize: '1.35rem', margin: '0 0 0.5rem 0', fontFamily: 'var(--font-heading)' }}>No Client Projects Registered</h3>
                <p style={{ margin: '0 auto 1.8rem', maxWidth: '440px', color: '#9bb0a5', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  Create and manage real restaurant consulting setups here. Record square footage, MEP milestones, contract values, and project progress.
                </p>
                <button 
                  onClick={() => setShowNewProjectModal(true)}
                  style={{
                    background: 'var(--color-accent, #c49a6c)',
                    color: '#050806',
                    border: 'none',
                    padding: '0.85rem 1.8rem',
                    borderRadius: '30px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.92rem'
                  }}
                >
                  + Initiate Turnkey Project
                </button>
              </div>
            ) : (
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
                            background: `${project.color || '#4ade80'}18`, 
                            color: project.color || '#4ade80', 
                            border: `1px solid ${project.color || '#4ade80'}40`,
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
                        <span style={{ fontSize: '0.85rem', color: '#9bb0a5' }}>Lead: <strong style={{ color: '#fff' }}>{project.lead || executiveName}</strong></span>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                          <button 
                            onClick={() => {
                              setProjectsList(projectsList.filter(p => p.id !== project.id));
                              triggerNotification(`Project ${project.name} deleted.`);
                            }}
                            style={{
                              background: 'rgba(239, 68, 68, 0.1)',
                              border: '1px solid rgba(239, 68, 68, 0.3)',
                              color: '#f87171',
                              padding: '0.6rem 0.9rem',
                              borderRadius: '20px',
                              fontSize: '0.85rem',
                              cursor: 'pointer'
                            }}
                          >
                            <Trash2 size={13} />
                          </button>
                          <button 
                            onClick={() => triggerNotification(`Phase milestone updated for ${project.name}`)}
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
            )}
          </motion.div>
        )}

        {/* ----------------- TAB 3: CLIENTS ----------------- */}
        {activeTab === 'Clients' && (
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <div className="crm-card">
              <div className="crm-card-header">
                <h3 style={{ margin: 0, fontSize: '1.4rem', fontFamily: 'var(--font-heading)', color: '#fff' }}>Client Directory & Discovery Inquiries</h3>
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
                    fontSize: '0.9rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Plus size={16} />
                  Add Client Profile
                </button>
              </div>

              {clientsList.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(196,154,108,0.1)', border: '1px solid rgba(196,154,108,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem', color: 'var(--color-accent, #c49a6c)' }}>
                    <Users size={28} />
                  </div>
                  <h4 style={{ color: '#fff', fontSize: '1.25rem', margin: '0 0 0.5rem 0', fontFamily: 'var(--font-heading)' }}>No Client Inquiries Registered</h4>
                  <p style={{ margin: '0 auto 1.8rem', maxWidth: '460px', color: '#9bb0a5', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    Incoming inquiries from the website form at <strong>/start</strong> or new clients added via <strong>+ Add Client Profile</strong> will appear here with direct WhatsApp and email quick links.
                  </p>
                  <button 
                    onClick={() => setShowNewLeadModal(true)}
                    style={{
                      background: 'var(--color-accent, #c49a6c)',
                      color: '#050806',
                      border: 'none',
                      padding: '0.8rem 1.8rem',
                      borderRadius: '30px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    + Register First Lead
                  </button>
                </div>
              ) : (
                <div className="crm-table-container">
                  <table className="crm-table">
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#9bb0a5', textAlign: 'left', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        <th style={{ paddingBottom: '1.2rem', fontWeight: 500 }}>Client Name & Entity</th>
                        <th style={{ paddingBottom: '1.2rem', fontWeight: 500 }}>Associated Scope</th>
                        <th style={{ paddingBottom: '1.2rem', fontWeight: 500 }}>Direct Contact</th>
                        <th style={{ paddingBottom: '1.2rem', fontWeight: 500 }}>Budget / Value</th>
                        <th style={{ paddingBottom: '1.2rem', fontWeight: 500 }}>Status</th>
                        <th style={{ paddingBottom: '1.2rem', fontWeight: 500, textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientsList.map((client, i) => (
                        <tr key={client.id || i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
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
                              background: 'rgba(74, 222, 128, 0.15)',
                              color: '#4ade80',
                              padding: '4px 12px',
                              borderRadius: '20px',
                              fontSize: '0.8rem',
                              fontWeight: 600
                            }}>
                              {client.status}
                            </span>
                          </td>
                          <td style={{ padding: '1.4rem 0', textAlign: 'right' }}>
                            {client.contact && (
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
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                setClientsList(clientsList.filter((_, idx) => idx !== i));
                                triggerNotification(`Lead "${client.name}" deleted.`);
                              }}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#f87171',
                                cursor: 'pointer',
                                padding: '4px'
                              }}
                            >
                              <Trash2 size={15} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ----------------- TAB 4: PROPOSALS ----------------- */}
        {activeTab === 'Proposals' && (
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <div className="crm-proposals-kpi">
              {[
                { label: 'Proposals In Pipeline', value: String(proposalsList.length), desc: `${proposalsList.length} active scope drafts` },
                { label: 'Accepted Contracts', value: String(proposalsList.filter(p => p.status?.includes('Accepted')).length), desc: 'Signed engagements' },
                { label: 'Avg Turnaround', value: '3 Days', desc: 'Scope to dispatch' },
                { label: 'Active Pipeline', value: proposalsList.length > 0 ? 'Active' : 'Empty', desc: 'Proposal management' }
              ].map((stat, i) => (
                <div key={i} className="crm-proposals-kpi-card">
                  <p className="crm-kpi-label">{stat.label}</p>
                  <p className="crm-proposals-kpi-value">{stat.value}</p>
                  <p className="crm-kpi-trend" style={{ color: 'var(--color-accent, #c49a6c)' }}>{stat.desc}</p>
                </div>
              ))}
            </div>

            <div className="crm-card">
              <div className="crm-card-header">
                <h3 style={{ margin: 0, fontSize: '1.4rem', fontFamily: 'var(--font-heading)', color: '#fff' }}>Proposals & Scopes of Work</h3>
                <button 
                  onClick={() => setShowNewProposalModal(true)}
                  style={{
                    background: 'var(--color-accent, #c49a6c)',
                    color: '#050806',
                    border: 'none',
                    padding: '0.7rem 1.5rem',
                    borderRadius: '30px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Plus size={16} />
                  Create Proposal
                </button>
              </div>

              {proposalsList.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(196,154,108,0.1)', border: '1px solid rgba(196,154,108,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem', color: 'var(--color-accent, #c49a6c)' }}>
                    <FileText size={28} />
                  </div>
                  <h4 style={{ color: '#fff', fontSize: '1.25rem', margin: '0 0 0.5rem 0', fontFamily: 'var(--font-heading)' }}>No Commercial Proposals Yet</h4>
                  <p style={{ margin: '0 auto 1.8rem', maxWidth: '440px', color: '#9bb0a5', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    Track formal client pitches, kitchen engineering scopes, and milestone agreements here.
                  </p>
                  <button 
                    onClick={() => setShowNewProposalModal(true)}
                    style={{
                      background: 'var(--color-accent, #c49a6c)',
                      color: '#050806',
                      border: 'none',
                      padding: '0.8rem 1.8rem',
                      borderRadius: '30px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    + Draft First Proposal
                  </button>
                </div>
              ) : (
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
                        <tr key={p.id || i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                          <td style={{ padding: '1.3rem 0', color: '#fff', fontWeight: 600 }}>{p.title}</td>
                          <td style={{ padding: '1.3rem 0', color: '#9bb0a5' }}>{p.client}</td>
                          <td style={{ padding: '1.3rem 0', color: 'var(--color-accent, #c49a6c)', fontWeight: 600 }}>{p.amount}</td>
                          <td style={{ padding: '1.3rem 0', color: '#9bb0a5', fontSize: '0.9rem' }}>{p.date}</td>
                          <td style={{ padding: '1.3rem 0' }}>
                            <span style={{ 
                              background: 'rgba(251, 191, 36, 0.15)',
                              color: '#fbbf24',
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
                              onClick={() => {
                                setProposalsList(proposalsList.filter((_, idx) => idx !== i));
                                triggerNotification(`Proposal deleted.`);
                              }}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#f87171',
                                cursor: 'pointer',
                                padding: '4px'
                              }}
                            >
                              <Trash2 size={15} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ----------------- TAB 5: FINANCES ----------------- */}
        {activeTab === 'Finances' && (
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <div className="crm-finances-kpi">
              <div className="crm-finances-kpi-card">
                <p className="crm-kpi-label">Total Invoiced</p>
                <p className="crm-finances-kpi-value" style={{ color: '#fff' }}>
                  {invoicesList.length > 0 ? `${invoicesList.length} Invoices` : '₹0'}
                </p>
                <p className="crm-kpi-trend" style={{ color: '#4ade80' }}>Current Financial Year</p>
              </div>
              <div className="crm-finances-kpi-card">
                <p className="crm-kpi-label">Paid Invoices</p>
                <p className="crm-finances-kpi-value" style={{ color: 'var(--color-accent, #c49a6c)' }}>
                  {invoicesList.filter(i => i.status === 'Paid').length}
                </p>
                <p className="crm-kpi-trend" style={{ color: '#9bb0a5' }}>Settled Accounts</p>
              </div>
              <div className="crm-finances-kpi-card">
                <p className="crm-kpi-label">Pending Invoices</p>
                <p className="crm-finances-kpi-value" style={{ color: '#fbbf24' }}>
                  {invoicesList.filter(i => i.status !== 'Paid').length}
                </p>
                <p className="crm-kpi-trend" style={{ color: '#fbbf24' }}>Due for Collection</p>
              </div>
            </div>

            <div className="crm-card">
              <div className="crm-card-header">
                <h3 style={{ margin: 0, fontSize: '1.4rem', fontFamily: 'var(--font-heading)', color: '#fff' }}>GST Invoices & Retainers</h3>
                <button 
                  onClick={() => setShowNewInvoiceModal(true)}
                  style={{
                    background: 'var(--color-accent, #c49a6c)',
                    color: '#050806',
                    border: 'none',
                    padding: '0.65rem 1.4rem',
                    borderRadius: '24px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Plus size={16} />
                  Create Invoice
                </button>
              </div>

              {invoicesList.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(196,154,108,0.1)', border: '1px solid rgba(196,154,108,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem', color: 'var(--color-accent, #c49a6c)' }}>
                    <IndianRupee size={28} />
                  </div>
                  <h4 style={{ color: '#fff', fontSize: '1.25rem', margin: '0 0 0.5rem 0', fontFamily: 'var(--font-heading)' }}>No Invoices Generated</h4>
                  <p style={{ margin: '0 auto 1.8rem', maxWidth: '440px', color: '#9bb0a5', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    Generate phase invoices, track retainer disbursements, and download official accounting receipts.
                  </p>
                  <button 
                    onClick={() => setShowNewInvoiceModal(true)}
                    style={{
                      background: 'var(--color-accent, #c49a6c)',
                      color: '#050806',
                      border: 'none',
                      padding: '0.8rem 1.8rem',
                      borderRadius: '30px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    + Create First Invoice
                  </button>
                </div>
              ) : (
                <div className="crm-table-container">
                  <table className="crm-table">
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#9bb0a5', textAlign: 'left', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                        <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Invoice #</th>
                        <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Client / Establishment</th>
                        <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Amount</th>
                        <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Issue Date</th>
                        <th style={{ paddingBottom: '1rem', fontWeight: 500 }}>Status</th>
                        <th style={{ paddingBottom: '1rem', fontWeight: 500, textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoicesList.map((inv, i) => (
                        <tr key={inv.id || i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                          <td style={{ padding: '1.2rem 0', color: '#fff', fontWeight: 600 }}>{inv.id}</td>
                          <td style={{ padding: '1.2rem 0', color: '#9bb0a5' }}>{inv.client}</td>
                          <td style={{ padding: '1.2rem 0', color: '#fff', fontWeight: 600 }}>{inv.amt}</td>
                          <td style={{ padding: '1.2rem 0', color: '#9bb0a5', fontSize: '0.9rem' }}>{inv.date}</td>
                          <td style={{ padding: '1.2rem 0' }}>
                            <span style={{ 
                              background: inv.status === 'Paid' ? 'rgba(74, 222, 128, 0.15)' : 'rgba(251, 191, 36, 0.15)', 
                              color: inv.status === 'Paid' ? '#4ade80' : '#fbbf24', 
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
                              type="button"
                              onClick={() => {
                                setInvoicesList(invoicesList.filter((_, idx) => idx !== i));
                                triggerNotification(`Invoice ${inv.id} removed.`);
                              }}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#f87171',
                                cursor: 'pointer',
                                padding: '4px'
                              }}
                            >
                              <Trash2 size={15} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
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
                  <input 
                    type="text" 
                    value={settingsData.director} 
                    onChange={(e) => setSettingsData({ ...settingsData, director: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '0.95rem', boxSizing: 'border-box' }} 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9bb0a5', marginBottom: '0.4rem' }}>Practice Title</label>
                  <input 
                    type="text" 
                    value={settingsData.title} 
                    onChange={(e) => setSettingsData({ ...settingsData, title: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '0.95rem', boxSizing: 'border-box' }} 
                  />
                </div>
              </div>

              <div className="crm-form-row">
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9bb0a5', marginBottom: '0.4rem' }}>Official Contact Number</label>
                  <input 
                    type="text" 
                    value={settingsData.phone} 
                    onChange={(e) => setSettingsData({ ...settingsData, phone: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '0.95rem', boxSizing: 'border-box' }} 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9bb0a5', marginBottom: '0.4rem' }}>Official Email</label>
                  <input 
                    type="text" 
                    value={settingsData.email} 
                    onChange={(e) => setSettingsData({ ...settingsData, email: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '0.95rem', boxSizing: 'border-box' }} 
                  />
                </div>
              </div>

              <div className="crm-form-row">
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9bb0a5', marginBottom: '0.4rem' }}>GSTIN Registration</label>
                  <input 
                    type="text" 
                    value={settingsData.gstin} 
                    onChange={(e) => setSettingsData({ ...settingsData, gstin: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '0.95rem', boxSizing: 'border-box' }} 
                  />
                </div>
              </div>

              <button 
                onClick={() => {
                  try {
                    localStorage.setItem('jr_crm_settings', JSON.stringify(settingsData));
                  } catch {}
                  triggerNotification('Practice credentials updated successfully.');
                }}
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
                Save Settings
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
              <h2 style={{ margin: '0 0 0.5rem 0', fontFamily: 'var(--font-heading)', color: '#fff' }}>Register New Client Lead</h2>
              <p style={{ margin: '0 0 2rem 0', color: '#9bb0a5', fontSize: '0.9rem' }}>Record an incoming restaurant setup inquiry.</p>

              <form onSubmit={handleCreateLead}>
                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9bb0a5', marginBottom: '0.4rem' }}>Client / Founder Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Rahul Kapoor" 
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', outline: 'none', boxSizing: 'border-box' }} 
                  />
                </div>
                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9bb0a5', marginBottom: '0.4rem' }}>Phone / WhatsApp *</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="e.g. +91 98765 43210" 
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', outline: 'none', boxSizing: 'border-box' }} 
                  />
                </div>
                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9bb0a5', marginBottom: '0.4rem' }}>Establishment / Concept & City</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Artisanal Roastery & Cafe, Ahmedabad" 
                    value={leadForm.company}
                    onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', outline: 'none', boxSizing: 'border-box' }} 
                  />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9bb0a5', marginBottom: '0.4rem' }}>Estimated Setup Budget / Scope</label>
                  <input 
                    type="text" 
                    placeholder="e.g. ₹50 Lakhs Turnkey Setup" 
                    value={leadForm.budget}
                    onChange={(e) => setLeadForm({ ...leadForm, budget: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', outline: 'none', boxSizing: 'border-box' }} 
                  />
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

              <form onSubmit={handleCreateProject}>
                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9bb0a5', marginBottom: '0.4rem' }}>Establishment Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Saffron Courtyard" 
                    value={projectForm.name}
                    onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', outline: 'none', boxSizing: 'border-box' }} 
                  />
                </div>
                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9bb0a5', marginBottom: '0.4rem' }}>Location & City *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Bandra West, Mumbai" 
                    value={projectForm.location}
                    onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', outline: 'none', boxSizing: 'border-box' }} 
                  />
                </div>
                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9bb0a5', marginBottom: '0.4rem' }}>Scale / Area (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 3,500 sq.ft • 120 Covers" 
                    value={projectForm.scale}
                    onChange={(e) => setProjectForm({ ...projectForm, scale: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', outline: 'none', boxSizing: 'border-box' }} 
                  />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9bb0a5', marginBottom: '0.4rem' }}>Retainer Fee Quoted</label>
                  <input 
                    type="text" 
                    placeholder="e.g. ₹12.5 Lakhs" 
                    value={projectForm.value}
                    onChange={(e) => setProjectForm({ ...projectForm, value: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', outline: 'none', boxSizing: 'border-box' }} 
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

      {/* ----------------- MODAL: NEW PROPOSAL ----------------- */}
      <AnimatePresence>
        {showNewProposalModal && (
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
              <h2 style={{ margin: '0 0 0.5rem 0', fontFamily: 'var(--font-heading)', color: '#fff' }}>Draft Proposal Scope</h2>
              <p style={{ margin: '0 0 2rem 0', color: '#9bb0a5', fontSize: '0.9rem' }}>Record a commercial scope of work & bid.</p>

              <form onSubmit={handleCreateProposal}>
                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9bb0a5', marginBottom: '0.4rem' }}>Scope / Proposal Title *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Turnkey Kitchen Layout & MEP Engineering" 
                    value={proposalForm.title}
                    onChange={(e) => setProposalForm({ ...proposalForm, title: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', outline: 'none', boxSizing: 'border-box' }} 
                  />
                </div>
                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9bb0a5', marginBottom: '0.4rem' }}>Client / Establishment *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Olive Bistro" 
                    value={proposalForm.client}
                    onChange={(e) => setProposalForm({ ...proposalForm, client: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', outline: 'none', boxSizing: 'border-box' }} 
                  />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9bb0a5', marginBottom: '0.4rem' }}>Quoted Amount (₹)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. ₹6.5 Lakhs" 
                    value={proposalForm.amount}
                    onChange={(e) => setProposalForm({ ...proposalForm, amount: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', outline: 'none', boxSizing: 'border-box' }} 
                  />
                </div>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setShowNewProposalModal(false)} style={{ padding: '0.8rem 1.5rem', background: 'rgba(255,255,255,0.08)', color: '#fff', border: 'none', borderRadius: '24px', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" style={{ padding: '0.8rem 1.8rem', background: 'var(--color-accent, #c49a6c)', color: '#050806', border: 'none', borderRadius: '24px', fontWeight: 600, cursor: 'pointer' }}>Save Proposal</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ----------------- MODAL: NEW INVOICE ----------------- */}
      <AnimatePresence>
        {showNewInvoiceModal && (
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
              <h2 style={{ margin: '0 0 0.5rem 0', fontFamily: 'var(--font-heading)', color: '#fff' }}>Generate Tax Invoice</h2>
              <p style={{ margin: '0 0 2rem 0', color: '#9bb0a5', fontSize: '0.9rem' }}>Record a consulting phase retainer or GST invoice.</p>

              <form onSubmit={handleCreateInvoice}>
                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9bb0a5', marginBottom: '0.4rem' }}>Invoice Number</label>
                  <input 
                    type="text" 
                    value={invoiceForm.id}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, id: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', outline: 'none', boxSizing: 'border-box' }} 
                  />
                </div>
                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9bb0a5', marginBottom: '0.4rem' }}>Client / Establishment *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Saffron Courtyard" 
                    value={invoiceForm.client}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, client: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', outline: 'none', boxSizing: 'border-box' }} 
                  />
                </div>
                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9bb0a5', marginBottom: '0.4rem' }}>Amount (₹)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. ₹3,54,000" 
                    value={invoiceForm.amt}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, amt: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', outline: 'none', boxSizing: 'border-box' }} 
                  />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9bb0a5', marginBottom: '0.4rem' }}>Status</label>
                  <select
                    value={invoiceForm.status}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, status: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem 1rem', background: '#121813', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                  >
                    <option value="Pending">Pending (Due in 15 Days)</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setShowNewInvoiceModal(false)} style={{ padding: '0.8rem 1.5rem', background: 'rgba(255,255,255,0.08)', color: '#fff', border: 'none', borderRadius: '24px', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" style={{ padding: '0.8rem 1.8rem', background: 'var(--color-accent, #c49a6c)', color: '#050806', border: 'none', borderRadius: '24px', fontWeight: 600, cursor: 'pointer' }}>Create Invoice</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
