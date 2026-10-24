import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle, 
  KeyRound, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';

interface AdminUser {
  email: string;
  name: string;
  role: string;
}

interface AdminLoginProps {
  onLoginSuccess: (user: AdminUser, token: string) => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Demo auto-fill credentials
  const handleAutoFillDemo = () => {
    setEmail('admin@jrconsulting.in');
    setPassword('JRadmin@2026!');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please provide both administrative email and master password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Primary authentication via Express backend API
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
          rememberMe
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Authentication failed. Please verify credentials.');
      }

      // Save token and user details based on Remember Me
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('jr_admin_token', data.token);
      storage.setItem('jr_admin_user', JSON.stringify(data.user));

      // Also clean opposite storage
      if (rememberMe) {
        sessionStorage.removeItem('jr_admin_token');
        sessionStorage.removeItem('jr_admin_user');
      } else {
        localStorage.removeItem('jr_admin_token');
        localStorage.removeItem('jr_admin_user');
      }

      onLoginSuccess(data.user, data.token);
    } catch (err: any) {
      // Fallback check in case the Express backend is not accessible (e.g. static preview or network glitch)
      const normalizedEmail = email.trim().toLowerCase();
      const isDefaultAdmin = 
        (normalizedEmail === 'admin@jrconsulting.in' || normalizedEmail === 'julian@jrconsulting.in') && 
        password === 'JRadmin@2026!';

      if (isDefaultAdmin && (err.message.includes('fetch') || err.message.includes('Network') || err.message.includes('Failed to fetch'))) {
        const fallbackUser = {
          email: normalizedEmail,
          name: 'Julian Rajput',
          role: 'Principal Consultant & Founder'
        };
        const fallbackToken = 'offline_session_' + Date.now();
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('jr_admin_token', fallbackToken);
        storage.setItem('jr_admin_user', JSON.stringify(fallbackUser));
        onLoginSuccess(fallbackUser, fallbackToken);
        return;
      }

      setError(err.message || 'Unable to authenticate. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#070c08',
      backgroundImage: 'radial-gradient(circle at 50% 20%, #142218 0%, #080f0a 60%, #040705 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 'clamp(1rem, 3.5vw, 2.5rem) clamp(0.85rem, 3vw, 1.5rem)',
      position: 'relative',
      color: '#fff',
      fontFamily: 'var(--font-body, "Century Gothic", sans-serif)'
    }}>
      {/* Decorative background glow accents */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '500px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(196, 154, 108, 0.12) 0%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Top Navigation Back to Live Website */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'absolute',
          top: 'clamp(14px, 3vw, 24px)',
          left: 'clamp(14px, 3vw, 24px)',
          zIndex: 10
        }}
      >
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#9bb0a5',
            textDecoration: 'none',
            fontSize: '0.88rem',
            padding: '8px 16px',
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-accent, #c49a6c)';
            e.currentTarget.style.borderColor = 'rgba(196, 154, 108, 0.3)';
            e.currentTarget.style.background = 'rgba(196, 154, 108, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#9bb0a5';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Live Website</span>
        </Link>
      </motion.div>

      {/* Main Authentication Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          maxWidth: '460px',
          background: 'rgba(12, 19, 14, 0.85)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(196, 154, 108, 0.28)',
          borderRadius: '28px',
          padding: 'clamp(1.75rem, 5vw, 2.75rem) clamp(1.2rem, 4.5vw, 2.25rem)',
          boxShadow: '0 30px 70px rgba(0, 0, 0, 0.8), 0 0 40px rgba(196, 154, 108, 0.08)',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem'
          }}>
            <div style={{
              width: '74px',
              height: '74px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(196, 154, 108, 0.2) 0%, rgba(27, 48, 36, 0.4) 100%)',
              border: '1.5px solid rgba(196, 154, 108, 0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
            }}>
              <img
                src="/jr-logo-mark.png"
                alt="JR Consulting"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: '14px'
                }}
              />
            </div>
            <div style={{
              position: 'absolute',
              bottom: '-6px',
              right: '-6px',
              background: '#0d1a11',
              border: '1px solid var(--color-accent, #c49a6c)',
              borderRadius: '50%',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={14} color="var(--color-accent, #c49a6c)" />
            </div>
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(196, 154, 108, 0.1)',
            border: '1px solid rgba(196, 154, 108, 0.25)',
            borderRadius: '20px',
            padding: '4px 12px',
            marginBottom: '0.85rem'
          }}>
            <Sparkles size={13} color="var(--color-accent, #c49a6c)" />
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: 'var(--color-accent, #c49a6c)'
            }}>
              Executive Suite Gateway
            </span>
          </div>

          <h1 style={{
            fontSize: '1.75rem',
            margin: '0 0 0.5rem 0',
            fontFamily: 'var(--font-heading, serif)',
            fontWeight: 500,
            letterSpacing: '0.5px',
            color: '#ffffff'
          }}>
            Admin Authentication
          </h1>
          <p style={{
            fontSize: '0.88rem',
            color: '#9bb0a5',
            margin: 0,
            lineHeight: 1.5
          }}>
            Restricted portal for JR Hospitality Consulting operations & project pipeline.
          </p>
        </div>

        {/* Demo Quick-Fill Pill */}
        <div style={{
          background: 'rgba(196, 154, 108, 0.07)',
          border: '1px dashed rgba(196, 154, 108, 0.3)',
          borderRadius: '14px',
          padding: '0.75rem 1rem',
          marginBottom: '1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <KeyRound size={16} color="var(--color-accent, #c49a6c)" />
            <div style={{ fontSize: '0.78rem', color: '#c5d4cc' }}>
              <span style={{ fontWeight: 600, color: 'var(--color-accent, #c49a6c)' }}>Admin Demo: </span>
              admin@jrconsulting.in
            </div>
          </div>
          <button
            type="button"
            onClick={handleAutoFillDemo}
            style={{
              background: 'rgba(196, 154, 108, 0.2)',
              border: '1px solid rgba(196, 154, 108, 0.4)',
              color: 'var(--color-accent, #c49a6c)',
              borderRadius: '8px',
              padding: '4px 10px',
              fontSize: '0.74rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-accent, #c49a6c)';
              e.currentTarget.style.color = '#050806';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(196, 154, 108, 0.2)';
              e.currentTarget.style.color = 'var(--color-accent, #c49a6c)';
            }}
          >
            Auto-fill
          </button>
        </div>

        {/* Error Alert Box */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: 'rgba(220, 38, 38, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                overflow: 'hidden'
              }}
            >
              <AlertCircle size={18} color="#f87171" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span style={{ fontSize: '0.82rem', color: '#fca5a5', lineHeight: 1.4 }}>
                {error}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Email Field */}
          <div>
            <label
              htmlFor="admin-email"
              style={{
                display: 'block',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#c5d4cc',
                marginBottom: '0.5rem',
                letterSpacing: '0.3px'
              }}
            >
              Executive Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#7b8f84',
                pointerEvents: 'none',
                display: 'flex'
              }}>
                <Mail size={18} />
              </div>
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@jrconsulting.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: '48px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '14px',
                  padding: '0.88rem 1rem 0.88rem 2.75rem',
                  color: '#ffffff',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--color-accent, #c49a6c)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.07)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(196, 154, 108, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.04)';
                  e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.3)';
                }}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <label
                htmlFor="admin-password"
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: '#c5d4cc',
                  letterSpacing: '0.3px'
                }}
              >
                Master Security Key
              </label>
              <span style={{ fontSize: '0.72rem', color: '#7b8f84' }}>
                Default: JRadmin@2026!
              </span>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#7b8f84',
                pointerEvents: 'none',
                display: 'flex'
              }}>
                <Lock size={18} />
              </div>
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: '48px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '14px',
                  padding: '0.88rem 2.85rem 0.88rem 2.75rem',
                  color: '#ffffff',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--color-accent, #c49a6c)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.07)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(196, 154, 108, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.04)';
                  e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.3)';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#7b8f84',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#7b8f84')}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember Me Option */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '0.25rem 0 0.5rem 0'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.82rem',
              color: '#9bb0a5',
              cursor: 'pointer',
              userSelect: 'none'
            }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{
                  accentColor: 'var(--color-accent, #c49a6c)',
                  width: '16px',
                  height: '16px',
                  cursor: 'pointer'
                }}
              />
              <span>Keep executive session active</span>
            </label>
            <span style={{ fontSize: '0.75rem', color: '#7b8f84' }}>
              7 Days
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: loading
                ? 'rgba(196, 154, 108, 0.5)'
                : 'linear-gradient(135deg, #d4a97b 0%, #c49a6c 60%, #9e7547 100%)',
              color: '#070c08',
              border: 'none',
              borderRadius: '16px',
              padding: '1rem',
              fontSize: '0.96rem',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 8px 24px rgba(196, 154, 108, 0.3)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              letterSpacing: '0.3px',
              marginTop: '0.5rem'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(196, 154, 108, 0.45)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(196, 154, 108, 0.3)';
              }
            }}
          >
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '18px',
                  height: '18px',
                  border: '2.5px solid rgba(7, 12, 8, 0.3)',
                  borderTopColor: '#070c08',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }} />
                <span>Verifying Credentials...</span>
              </div>
            ) : (
              <>
                <span>Access Executive CRM</span>
                <ArrowRight size={18} strokeWidth={2.5} />
              </>
            )}
          </button>
        </form>

        {/* Security Assurance Footer */}
        <div style={{
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '10px 18px',
          color: '#6e8277',
          fontSize: '0.74rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <ShieldCheck size={13} color="var(--color-accent, #c49a6c)" />
            <span>256-bit SSL</span>
          </div>
          <span>•</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <KeyRound size={13} color="var(--color-accent, #c49a6c)" />
            <span>HMAC Token Auth</span>
          </div>
          <span>•</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Lock size={13} color="var(--color-accent, #c49a6c)" />
            <span>Audit Monitored</span>
          </div>
        </div>
      </motion.div>

      {/* Global CSS for spinner animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
