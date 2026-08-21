require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const store = require('./db/store');
const { signupLimiter } = require('./middleware/rateLimiter');
const { requireAuth } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5001;

// Security & Parsing Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Helper Email Validator Regex
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
};

// ==========================================
// 🚀 AUTHENTICATION API ROUTES
// ==========================================

/**
 * @route   POST /api/auth/signup
 * @desc    Creates a new user account with bcrypt password hash & returns JWT session immediately
 */
app.post('/api/auth/signup', signupLimiter, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Input Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.'
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanName = (name || cleanEmail.split('@')[0]).trim();

    if (!isValidEmail(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.'
      });
    }

    // 2. Check if user already exists
    const existingUser = store.getUserByEmail(cleanEmail);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        alreadyRegistered: true,
        message: 'An account with this email already exists. Please Sign In with your password.'
      });
    }

    // 3. Hash password with bcrypt (Salt rounds = 10)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4. Save user persistently
    const newUser = store.saveUser({
      name: cleanName,
      email: cleanEmail,
      hashedPassword
    });

    console.log(`\n✅ [User Registered] Created new account for: ${cleanEmail}`);

    // 5. Issue JWT Session Token (7 days)
    const jwtSecret = process.env.JWT_SECRET || 'nexus_default_jwt_secret';
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      },
      jwtSecret,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      success: true,
      message: 'Account created successfully! Welcome to NexusAuth.',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt
      }
    });

  } catch (error) {
    console.error('Signup Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while creating account. Please try again.'
    });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Authenticates user with email & password, verifies bcrypt hash & returns JWT session
 */
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.'
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = store.getUserByEmail(cleanEmail);

    // 1. Verify user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        notRegistered: true,
        message: 'No account found with this email. Please Sign Up to create an account.'
      });
    }

    // 2. Verify password with bcrypt
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password for this email. Please check your credentials and try again.'
      });
    }

    // 3. Update last login timestamp
    store.updateLastLogin(cleanEmail);

    console.log(`\n🔑 [User Signed In] Logged in: ${cleanEmail}`);

    // 4. Issue JWT Token
    const jwtSecret = process.env.JWT_SECRET || 'nexus_default_jwt_secret';
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      jwtSecret,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Sign In successful! Welcome back.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error logging in. Please try again.'
    });
  }
});

/**
 * @route   GET /api/user/profile
 * @desc    Protected route for dashboard user data
 */
app.get('/api/user/profile', requireAuth, (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user
  });
});

// Fallback for Single Page Application
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 NexusAuth Server running at: http://localhost:${PORT}`);
  console.log(`🔒 Security: bcrypt password hashing (10 salt rounds)`);
  console.log(`💾 Database: Persistent file store (db/users.json)`);
  console.log(`======================================================\n`);
});
