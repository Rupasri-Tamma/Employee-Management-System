const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide first name'],
    trim: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: [true, 'Please provide last name'],
    trim: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number'],
    match: [/^[0-9]{10,}$/, 'Please provide a valid phone number']
  },
  position: {
    type: String,
    required: [true, 'Please provide job position'],
    enum: ['Manager', 'Developer', 'Designer', 'Analyst', 'Executive', 'Intern', 'Other']
  },
  department: {
    type: String,
    required: [true, 'Please provide department'],
    enum: ['IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations', 'Other']
  },
  salary: {
    type: Number,
    required: [true, 'Please provide salary'],
    min: [0, 'Salary cannot be negative']
  },
  joinDate: {
    type: Date,
    required: [true, 'Please provide join date']
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'on-leave'],
    default: 'active'
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for search
employeeSchema.index({ firstName: 'text', lastName: 'text', email: 'text' });

module.exports = mongoose.model('Employee', employeeSchema);
