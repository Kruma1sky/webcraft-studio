const express = require('express');
const router = express.Router();
const { handleContactForm } = require('../controllers/contactController');
const { contactValidationRules, validate } = require('../validators/contactValidator');
const { contactFormLimiter } = require('../middlewares/rateLimiter');

/**
 * POST /api/contact
 * Handle contact form submission with rate limiting and validation
 */
router.post(
  '/contact',
  contactFormLimiter,
  contactValidationRules,
  validate,
  handleContactForm
);

/**
 * GET /api/test-email
 * Diagnostic endpoint to check if .env variables are loaded and verify SMTP connection
 */
router.get('/test-email', async (req, res) => {
  const { transporter } = require('../config/email');
  const hasUser = Boolean(process.env.SMTP_USER);
  const hasPass = Boolean(process.env.SMTP_PASS);

  const envDiagnostic = {
    envFileLoaded: Boolean(hasUser || process.env.PORT),
    PORT: process.env.PORT || 'default 3000',
    SMTP_HOST: process.env.SMTP_HOST || '(not set)',
    SMTP_PORT: process.env.SMTP_PORT || '(not set)',
    SMTP_SECURE: process.env.SMTP_SECURE || '(not set)',
    SMTP_USER: hasUser ? `${process.env.SMTP_USER.slice(0, 3)}***` : '(not set)',
    SMTP_PASS_SET: hasPass,
    MAIL_TO_ADDRESS: process.env.MAIL_TO_ADDRESS || '(not set)',
  };

  if (!hasUser || !hasPass) {
    return res.status(400).json({
      success: false,
      message: 'SMTP credentials missing from environment variables (.env).',
      diagnostic: envDiagnostic,
      tip: 'Ensure .env exists in the same folder as server.js and contains SMTP_USER and SMTP_PASS.'
    });
  }

  try {
    await transporter.verify();
    return res.json({
      success: true,
      message: '✅ SMTP connection and authentication successful!',
      diagnostic: envDiagnostic
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: '❌ SMTP connection/auth failed.',
      errorMessage: err.message,
      errorCode: err.code || null,
      diagnostic: envDiagnostic,
      tip: err.code === 'EAUTH'
        ? 'Authentication failed: Check your email and password. If using Gmail, you MUST use an App Password, not your regular password.'
        : 'Connection failed: Hostinger might be blocking the SMTP port, or the SMTP host is incorrect. Try port 465 with secure=true.'
    });
  }
});

module.exports = router;
