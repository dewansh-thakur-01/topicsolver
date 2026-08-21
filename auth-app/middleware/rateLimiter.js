const rateLimit = require('express-rate-limit');

/**
 * Rate limiter for Signup requests (max 10 requests per 15 minutes per IP)
 */
const signupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many account creation attempts from this IP, please try again in 15 minutes.'
  }
});

/**
 * Rate limiter for OTP verification (max 15 verification attempts per 10 minutes per IP)
 */
const verifyOtpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many OTP verification attempts. Please wait a few minutes before trying again.'
  }
});

/**
 * Rate limiter for Resend OTP (max 5 resends per 10 minutes per IP)
 */
const resendOtpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 6,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many OTP resend requests. Please wait a few minutes before requesting another code.'
  }
});

module.exports = {
  signupLimiter,
  verifyOtpLimiter,
  resendOtpLimiter
};
