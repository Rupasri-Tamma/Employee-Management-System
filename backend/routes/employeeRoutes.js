const express = require('express');
const router = express.Router();
const {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployees
} = require('../controllers/employeeController');
const { protect, authorize } = require('../middleware/auth');
const { validateEmployee, handleValidationErrors, validateSearch } = require('../middleware/validation');

// All employee routes require authentication
router.use(protect);

// Search route (must come before :id route)
router.get('/search', validateSearch, handleValidationErrors, searchEmployees);

// CRUD routes
router.get('/', getAllEmployees);
router.post('/', validateEmployee, handleValidationErrors, createEmployee);
router.get('/:id', getEmployee);
router.put('/:id', validateEmployee, handleValidationErrors, updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
