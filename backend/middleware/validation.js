const { validationResult, body, param, query } = require('express-validator');

// Validation error handler
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Employee validation rules
exports.validateEmployee = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').matches(/^[0-9]{10,}$/).withMessage('Valid phone number is required'),
  body('position').isIn(['Manager', 'Developer', 'Designer', 'Analyst', 'Executive', 'Intern', 'Other']).withMessage('Invalid position'),
  body('department').isIn(['IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations', 'Other']).withMessage('Invalid department'),
  body('salary').isNumeric().custom(val => val >= 0).withMessage('Valid salary is required'),
  body('joinDate').isISO8601().withMessage('Valid join date is required'),
];

// User registration validation
exports.validateRegister = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

// User login validation
exports.validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Search validation
exports.validateSearch = [
  query('query').optional().trim().isLength({ min: 1 }).withMessage('Search query must not be empty'),
];
