const { body } = require('express-validator');

const planValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string'),
  body('price')
    .isInt({ min: 1 })
    .withMessage('Price must be a positive integer (in cents)'),
  body('interval')
    .isIn(['day', 'week', 'month', 'year'])
    .withMessage('Interval must be one of: day, week, month, year'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
  body('trialPeriodDays')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Trial period must be a non-negative integer'),
  body('stripePriceId')
    .optional()
    .isString()
    .withMessage('Stripe Price ID must be a string'),
  body('active')
    .optional()
    .isBoolean()
    .withMessage('Active must be a boolean'),
];

module.exports = planValidator;