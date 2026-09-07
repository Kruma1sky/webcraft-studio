const { body, validationResult } = require('express-validator');

/**
 * Validation rules for the contact form
 */
const contactValidationRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters')
    .escape(),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),

  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^[+]?[\d\s\-()]{7,20}$/).withMessage('Please enter a valid phone number'),

  body('company')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 200 }).withMessage('Company name is too long')
    .escape(),

  body('service')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 200 }).withMessage('Service selection is too long')
    .escape(),

  body('budget')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 }).withMessage('Budget value is too long')
    .escape(),

  body('timeline')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 }).withMessage('Timeline value is too long')
    .escape(),

  body('website')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 500 }).withMessage('Website URL is too long'),

  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 5000 }).withMessage('Message must be 10-5000 characters'),
];

/**
 * Middleware to check validation results and return errors
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(err => ({
      field: err.path,
      message: err.msg,
    }));
    return res.status(400).json({
      success: false,
      message: 'Validation failed. Please check your inputs.',
      errors: formattedErrors,
    });
  }
  next();
};

module.exports = { contactValidationRules, validate };
