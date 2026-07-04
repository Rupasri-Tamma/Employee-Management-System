# Employee Management System

A comprehensive web application that allows administrators to perform CRUD (Create, Read, Update, Delete) operations on employee records with proper validation and authentication mechanisms to protect sensitive employee data.

## Features

- **User Authentication**: Secure login and session management
- **CRUD Operations**: Create, read, update, and delete employee records
- **Data Validation**: Input validation to ensure data integrity
- **Role-Based Access Control**: Different permission levels for administrators
- **Employee Records Management**: Manage employee information including name, email, position, salary, and more
- **Search and Filter**: Find employees by various criteria
- **Audit Trail**: Track changes to employee records

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** for data persistence
- **JWT** for authentication
- **Bcrypt** for password hashing

### Frontend
- **React** with functional components
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Router** for navigation

## Project Structure

```
Employee-Management-System/
├── backend/
│   ├── config/              # Configuration files
│   ├── controllers/         # Request handlers
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API endpoints
│   ├── middleware/          # Custom middleware (auth, validation)
│   ├── utils/               # Utility functions
│   ├── .env.example         # Environment variables template
│   ├── server.js            # Express app setup
│   └── package.json         # Backend dependencies
├── frontend/
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service layer
│   │   ├── hooks/           # Custom React hooks
│   │   ├── context/         # React context
│   │   ├── utils/           # Utility functions
│   │   ├── App.js           # Main App component
│   │   └── index.js         # React entry point
│   ├── .env.example         # Environment variables template
│   └── package.json         # Frontend dependencies
├── docs/                    # Documentation
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites
- Node.js v14+ and npm
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Rupasri-Tamma/Employee-Management-System.git
cd Employee-Management-System
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your configuration
npm start
```

3. **Setup Frontend**
```bash
cd frontend
npm install
cp .env.example .env
# Update .env with backend API URL
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new admin
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout

### Employees
- `GET /api/employees` - List all employees
- `GET /api/employees/:id` - Get employee details
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee
- `GET /api/employees/search?query=` - Search employees

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration
- Environment variable management

## Database Schema

### User (Admin)
```
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Employee
```
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (unique),
  phone: String,
  position: String,
  department: String,
  salary: Number,
  joinDate: Date,
  status: String (active/inactive),
  createdAt: Date,
  updatedAt: Date
}
```

## Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@employeemanagementsystem.com or open an issue on GitHub.