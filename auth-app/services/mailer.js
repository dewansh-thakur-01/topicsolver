const nodemailer = require('nodemailer');

class MailerService {
  constructor() {
    this.transporter = null;
    this.hasRealCredentials = false;
    this.initTransporter();
  }

  initTransporter() {
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (user && pass && user.trim() !== '' && user !== 'your_email@gmail.com') {
      // Standard Gmail service with auto-trimmed 16-char password
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: user.trim(),
          pass: pass.trim().replace(/\s+/g, '') // Strip spaces from App Password (e.g. "abcd efgh ijkl mnop" -> "abcdefghijklmnop")
        }
      });
      this.hasRealCredentials = true;
      console.log(`📧 [Mailer] Live Gmail SMTP Transport active for: ${user}`);
    } else {
      this.hasRealCredentials = false;
      console.log(`✉️ [Mailer] No Gmail credentials in .env. Logging OTP codes directly to terminal!`);
    }
  }

  /**
   * Send 6-digit OTP verification email
   */
  async sendOtpEmail(toEmail, otpCode, name = 'User') {
    const expiryMinutes = process.env.OTP_EXPIRY_MINUTES || '5';
    const sender = process.env.EMAIL_FROM || (process.env.EMAIL_USER ? `"NexusAuth" <${process.env.EMAIL_USER}>` : '"NexusAuth Security" <no-reply@nexusauth.com>');

    // Always log OTP to server terminal
    console.log(`\n======================================================`);
    console.log(`🔐 [NexusAuth OTP Delivery]`);
    console.log(`📨 To: ${toEmail}`);
    console.log(`🔑 Verification Code: >>> [ ${otpCode} ] <<<`);
    console.log(`⏱️ Valid For: ${expiryMinutes} Minutes`);
    console.log(`======================================================\n`);

    if (!this.hasRealCredentials || !this.transporter) {
      console.log(`💡 [Mailer Notice] To send this OTP directly to the user's mobile Gmail app, add EMAIL_USER and EMAIL_PASS to auth-app/.env!`);
      return {
        success: true,
        mode: 'console',
        message: 'OTP delivered.'
      };
    }

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Verification Code</title>
      <style>
        body { margin: 0; padding: 0; background-color: #0b0f19; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0; }
        .container { max-width: 520px; margin: 40px auto; background: #111827; border-radius: 20px; border: 1px solid #1f293d; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
        .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%); padding: 32px 24px; text-align: center; }
        .header h1 { margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
        .header p { margin: 6px 0 0 0; color: #e0e7ff; font-size: 13px; font-weight: 500; }
        .content { padding: 32px 28px; text-align: center; }
        .greeting { font-size: 16px; font-weight: 600; color: #f8fafc; margin-bottom: 12px; }
        .text { font-size: 14px; line-height: 1.6; color: #94a3b8; margin-bottom: 24px; }
        .otp-box { background: #0b0f19; border: 2px dashed #6366f1; border-radius: 14px; padding: 18px 24px; display: inline-block; margin: 0 auto 24px auto; }
        .otp-code { font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #a5b4fc; font-family: 'Courier New', monospace; }
        .expiry-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 9999px; padding: 4px 14px; font-size: 12px; font-weight: 600; margin-bottom: 20px; }
        .warning { font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; padding-top: 20px; line-height: 1.5; }
        .footer { background: #080c14; padding: 16px 24px; text-align: center; font-size: 11px; color: #475569; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 NexusAuth</h1>
          <p>Two-Factor Identity Verification</p>
        </div>
        <div class="content">
          <div class="greeting">Hello ${name},</div>
          <div class="text">
            Thank you for creating an account with us. To complete your registration and activate your account, please enter the one-time verification code below:
          </div>
          
          <div class="otp-box">
            <div class="otp-code">${otpCode}</div>
          </div>
          
          <div>
            <span class="expiry-badge">⏱️ Expires in ${expiryMinutes} minutes</span>
          </div>

          <div class="warning">
            If you did not request this verification code, please disregard this email. Never share your 6-digit code with anyone.
          </div>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} NexusAuth Security Inc. All rights reserved.
        </div>
      </div>
    </body>
    </html>
    `;

    const mailOptions = {
      from: sender,
      to: toEmail,
      subject: `Your NexusAuth Verification Code: ${otpCode}`,
      text: `Hello ${name},\n\nYour 6-digit verification code is: ${otpCode}\n\nThis code will expire in ${expiryMinutes} minutes.\n\nIf you did not request this code, please ignore this email.`,
      html: htmlContent
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`✅ [Mailer] Live email successfully delivered to ${toEmail} | Message ID: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (err) {
      console.error('❌ [Mailer Error] Failed to send email via Gmail SMTP:', err.message);
      console.error('👉 Make sure you are using a 16-character Google App Password (not your normal Gmail login password).');
      return { success: false, error: err.message };
    }
  }
}

module.exports = new MailerService();
