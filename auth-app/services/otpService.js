const crypto = require('crypto');

/**
 * Service for generating, hashing, and verifying 6-digit OTPs.
 */
class OtpService {
  /**
   * Generates a cryptographically strong 6-digit integer string (e.g. "489201")
   */
  static generateOtp() {
    // Generate secure integer in [100000, 999999]
    return crypto.randomInt(100000, 1000000).toString();
  }

  /**
   * Hashes the raw OTP with SHA-256 and salt
   */
  static hashOtp(otp, email) {
    const salt = process.env.JWT_SECRET || 'nexus_default_otp_salt';
    return crypto
      .createHmac('sha256', salt)
      .update(`${email}:${otp}`)
      .digest('hex');
  }

  /**
   * Compares the user-submitted OTP against the stored hash securely
   */
  static verifyOtp(submittedOtp, storedHash, email) {
    if (!submittedOtp || !storedHash || !email) return false;
    const computedHash = this.hashOtp(submittedOtp.trim(), email);
    
    try {
      const computedBuffer = Buffer.from(computedHash, 'utf8');
      const storedBuffer = Buffer.from(storedHash, 'utf8');
      if (computedBuffer.length !== storedBuffer.length) return false;
      return crypto.timingSafeEqual(computedBuffer, storedBuffer);
    } catch {
      return false;
    }
  }

  /**
   * Returns expiration timestamp (default 5 minutes from now)
   */
  static getExpiryTimestamp(minutes = 5) {
    const mins = parseInt(process.env.OTP_EXPIRY_MINUTES, 10) || minutes;
    return Date.now() + mins * 60 * 1000;
  }
}

module.exports = OtpService;
