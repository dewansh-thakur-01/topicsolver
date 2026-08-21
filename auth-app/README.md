# 🔐 NexusAuth — Modern OTP Authentication Web Application

An enterprise-grade, responsive full-stack authentication web application built with **HTML5, CSS3 Glassmorphism, Vanilla JavaScript, Node.js, Express, Nodemailer, and Bcrypt**.

---

## ✨ Features & Architecture

- 🛡️ **Bcrypt Password Security**: Passwords are salted (10 rounds) and hashed before storage. Never stored or transmitted in plain text.
- 📬 **Nodemailer 6-Digit Email OTP**: Generates cryptographically secure 6-digit verification codes using Node's `crypto.randomInt`.
- 🔒 **SHA-256 OTP Hashing**: OTPs are hashed before in-memory storage, eliminating plain-text credential leaks.
- ⏱️ **5-Minute Expiration & 60s Resend Cooldown**: Strict timestamp validation with max-attempt protection (brute-force defense).
- 🎨 **Premium Glassmorphism & Aurora UI**: Frosted glass cards (`backdrop-filter: blur(28px)`), ambient gradient glow orbs, and smooth micro-interactions.
- ⌨️ **Interactive 6-Box OTP Input**:
  - Auto-advances to the next box on keystroke.
  - Backspace navigates to the previous box.
  - **Full Clipboard Paste Support**: Pasting any 6-digit code auto-populates all 6 boxes simultaneously.
- 🌸 **Flowing Flowers & Confetti Celebration**: Canvas particle shower celebrating account verification.
- 📊 **Authenticated Dashboard**: Displays user profile, 2FA status, JWT session token, and security metadata.

---

## 📁 Project Structure

```
auth-app/
├── package.json              # Backend dependencies
├── .env                      # Environment variables & secrets
├── .env.example              # Template environment file
├── server.js                 # Express server & REST API endpoints
├── db/
│   └── store.js              # Thread-safe in-memory store (MongoDB/PostgreSQL drop-in)
├── services/
│   ├── otpService.js         # Cryptographic 6-digit OTP generation, hashing & verification
│   └── mailer.js             # Nodemailer transporter with Gmail + Ethereal test fallback
├── middleware/
│   ├── auth.js               # JWT verification for protected dashboard endpoints
│   └── rateLimiter.js        # IP rate limiting for signup, verify, and resend routes
├── public/
│   ├── index.html            # Multi-view SPA (Sign Up, OTP Verification, Sign In, Dashboard)
│   ├── css/
│   │   └── style.css         # Glassmorphism, aurora glow, responsive layout & OTP boxes
│   └── js/
│       ├── app.js            # Auto-advancing OTP inputs, paste handler, timers & API calls
│       └── animations.js     # Canvas flower shower & confetti celebration engine
└── README.md                 # Complete documentation & setup guide
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### 2. Installation
Navigate into the `auth-app` directory:
```bash
cd auth-app
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Open `.env` and configure your settings:
```ini
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_12345

# --- Optional: Real Gmail Delivery ---
# To receive actual OTP emails in your Gmail inbox:
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_character_app_password
EMAIL_FROM="NexusAuth Security <no-reply@nexusauth.com>"

# --- Security Settings ---
OTP_EXPIRY_MINUTES=5
OTP_MAX_ATTEMPTS=5
OTP_RESEND_COOLDOWN_SECONDS=60
```

> **Note**: If you leave `EMAIL_USER` and `EMAIL_PASS` blank, the application will automatically run in **Test Mode** (using Ethereal Mock Mailer) and print the generated 6-digit OTP code directly to your terminal console for instant zero-config testing!

### 4. How to Generate a Gmail App Password (For Real Emails)
1. Go to your [Google Account Security Settings](https://myaccount.google.com/security).
2. Enable **2-Step Verification** if not already enabled.
3. Search for **"App Passwords"** in the top search bar.
4. Create a new App Password named `NexusAuth`.
5. Copy the generated **16-character password** (e.g. `abcd efgh ijkl mnop`) and paste it as `EMAIL_PASS` in your `.env` file without spaces.

### 5. Start the Server
```bash
npm start
```
Or run with auto-reload during development:
```bash
npm run dev
```

### 6. Open in Browser
Open [http://localhost:5000](http://localhost:5000) in your web browser.

---

## 🧪 Testing the Complete Flow

1. **Sign Up**:
   - Enter your name, email, and a password (notice the dynamic strength meter and show/hide eye toggle).
   - Click **"Create Account"**.
2. **OTP Delivery**:
   - If using real Gmail: Check your inbox for the branded verification email.
   - If using test mode: Look at your terminal console for the log: `🔑 [DEV DEBUG] OTP is: >>> 123456 <<<`.
3. **OTP Input Verification**:
   - Type the 6 digits (notice auto-focus jumping between boxes).
   - Test backspacing and pasting a 6-digit code.
   - Click **"Verify & Activate Account"**.
4. **Celebration & Dashboard**:
   - Watch the blooming flower shower & confetti animation.
   - You will be automatically transitioned into the protected dashboard with your active JWT session!
5. **Resend Cooldown**:
   - Click **"Resend Code"** to test the 60-second cooldown timer.

---

## 🛡️ Security Best Practices Implemented

| Security Measure | Implementation Details |
| :--- | :--- |
| **Password Hashing** | Salted `bcryptjs` with 10 rounds. Plain passwords never stored in DB. |
| **OTP Hashing** | SHA-256 HMAC hash with salt. Plain text OTPs never kept in memory. |
| **Brute-Force Guard** | Express rate limiters on `/signup`, `/verify-otp`, and `/resend-otp`. |
| **Constant-Time Comparison** | `crypto.timingSafeEqual` prevents side-channel timing attacks. |
| **Strict Expiry** | OTP records automatically invalidate after 5 minutes. |
| **Session Security** | HMAC SHA-256 signed JSON Web Tokens (JWT) for authenticated dashboard calls. |

---

## 📄 License
MIT License. Built with ❤️ by Antigravity.
