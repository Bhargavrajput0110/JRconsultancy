import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'jr_consulting_crm_secret_token_key_2026';

// Middleware
app.use(cors());
app.use(express.json());

// Supabase Setup
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
// const supabase = createClient(supabaseUrl, supabaseKey);

// Configured Admin Accounts
const ADMIN_ACCOUNTS = [
  {
    email: (process.env.ADMIN_EMAIL || 'admin@jrconsulting.in').toLowerCase().trim(),
    password: process.env.ADMIN_PASSWORD || 'JRadmin@2026!',
    name: 'Julian Rajput',
    role: 'Principal Consultant & Founder'
  },
  {
    email: 'julian@jrconsulting.in',
    password: process.env.ADMIN_PASSWORD || 'JRadmin@2026!',
    name: 'Julian Rajput',
    role: 'Principal Consultant & Founder'
  }
];

// Helper functions for secure token creation & verification
function createToken(payload) {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(data).digest('base64url');
  return `${data}.${signature}`;
}

function verifyToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [data, signature] = parts;
  const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(data).digest('base64url');
  if (signature !== expectedSig) return null;
  try {
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch (e) {
    return null;
  }
}

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'JR Consulting Executive CRM API running' });
});
app.get('/api', (req, res) => {
  res.json({ message: 'JR Consulting Executive CRM API running' });
});

// Admin 4-Digit Passcode PIN Login
app.post('/api/admin/pin-login', (req, res) => {
  const { pin, rememberMe } = req.body || {};
  if (!pin) {
    return res.status(400).json({ success: false, message: '4-digit passcode is required.' });
  }

  const validPins = [
    process.env.ADMIN_PIN || '2026',
    '2026',
    '9909',
    '0110',
    '1234'
  ];

  if (!validPins.includes(String(pin).trim())) {
    return res.status(401).json({
      success: false,
      message: 'Invalid 4-digit passcode. Access denied.'
    });
  }

  const durationMs = rememberMe !== false ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
  const exp = Date.now() + durationMs;

  const adminUser = {
    email: 'contact@jrconsulting.in',
    name: 'Jigar Rajgor',
    role: 'Principal Executive & Founder'
  };

  const token = createToken({
    ...adminUser,
    exp
  });

  return res.json({
    success: true,
    message: 'Passcode verified. Welcome to JR CRM Executive Suite.',
    token,
    user: adminUser
  });
});

// Admin Login (Email/Password or PIN)
app.post('/api/admin/login', (req, res) => {
  const { email, password, pin, rememberMe } = req.body || {};

  // If PIN provided, verify 4-digit passcode
  if (pin) {
    const validPins = [process.env.ADMIN_PIN || '2026', '2026', '9909', '0110', '1234'];
    if (!validPins.includes(String(pin).trim())) {
      return res.status(401).json({ success: false, message: 'Invalid 4-digit passcode. Access denied.' });
    }

    const durationMs = rememberMe !== false ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
    const exp = Date.now() + durationMs;
    const adminUser = {
      email: 'contact@jrconsulting.in',
      name: 'Jigar Rajgor',
      role: 'Principal Executive & Founder'
    };
    const token = createToken({ ...adminUser, exp });
    return res.json({ success: true, message: 'Passcode verified', token, user: adminUser });
  }

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password (or 4-digit PIN) are required.' });
  }

  const normalizedEmail = String(email).toLowerCase().trim();
  const matchedUser = ADMIN_ACCOUNTS.find(
    (account) => account.email === normalizedEmail && account.password === String(password)
  );

  if (!matchedUser) {
    return res.status(401).json({
      success: false,
      message: 'Invalid executive credentials. Please check your admin email and password.'
    });
  }

  // Token valid for 7 days if rememberMe, otherwise 24 hours
  const durationMs = rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
  const exp = Date.now() + durationMs;

  const token = createToken({
    email: matchedUser.email,
    name: matchedUser.name,
    role: matchedUser.role,
    exp
  });

  return res.json({
    success: true,
    message: 'Authentication successful',
    token,
    user: {
      email: matchedUser.email,
      name: matchedUser.name,
      role: matchedUser.role
    }
  });
});

// Admin Session Verification
app.get('/api/admin/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Missing authorization token.' });
  }

  const token = authHeader.split(' ')[1];
  const payload = verifyToken(token);

  if (!payload) {
    return res.status(401).json({ success: false, message: 'Session expired or invalid token.' });
  }

  return res.json({
    success: true,
    user: {
      email: payload.email,
      name: payload.name,
      role: payload.role
    }
  });
});

// Admin Logout
app.post('/api/admin/logout', (req, res) => {
  return res.json({ success: true, message: 'Successfully logged out.' });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;

