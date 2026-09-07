const rateLimit = require('express-rate-limit');

/**
 * Rate limiter for contact form submissions
 * Prevents spam: max 5 requests per IP per 15 minutes
 */
const contactFormLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 submissions per window
  message: {
    success: false,
    message: 'Too many submissions. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Use X-Forwarded-For if behind a proxy, otherwise use IP
    return req.headers['x-forwarded-for'] || req.ip;
  },
});

/**
 * General API rate limiter
 * Prevents abuse: max 100 requests per IP per 15 minutes
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { contactFormLimiter, apiLimiter };
