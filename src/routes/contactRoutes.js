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

module.exports = router;
