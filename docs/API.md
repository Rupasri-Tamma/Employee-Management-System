# API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected endpoints require JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Authentication

#### Register
```
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Admin",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "_id": "ObjectId",
    "name": "John Admin",
    "email": "john@example.com",
    "role": "admin"
  }
}
```

#### Login
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGc...",
  "user": { ... }
}
```

#### Get Current User
```
GET /auth/me
```

**Headers:** Authentication required

**Response:**
```json
{
  "success": true,
  "user": { ... }
}
```

#### Logout
```
POST /auth/logout
```

**Headers:** Authentication required

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Employees

#### Get All Employees
```
GET /employees?page=1&limit=10&status=active&department=IT
```

**Headers:** Authentication required

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 10)
- `status` (string, optional: active/inactive/on-leave)
- `department` (string, optional)

**Response:**
```json
{
  "success": true,
  "count": 10,
  "total": 50,
  "page": 1,
  "pages": 5,
  "data": [
    {
      "_id": "ObjectId",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "position": "Developer",
      "department": "IT",
      "salary": 50000,
      "joinDate": "2023-01-15T00:00:00Z",
      "status": "active"
    }
  ]
}
```

#### Get Employee by ID
```
GET /employees/:id
```

**Headers:** Authentication required

**Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

#### Create Employee
```
POST /employees
```

**Headers:** Authentication required

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "phone": "9876543210",
  "position": "Manager",
  "department": "HR",
  "salary": 60000,
  "joinDate": "2023-06-01",
  "status": "active"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Employee created successfully",
  "data": { ... }
}
```

#### Update Employee
```
PUT /employees/:id
```

**Headers:** Authentication required

**Request Body:** Same as create (all fields optional for update)

**Response:**
```json
{
  "success": true,
  "message": "Employee updated successfully",
  "data": { ... }
}
```

#### Delete Employee
```
DELETE /employees/:id
```

**Headers:** Authentication required

**Response:**
```json
{
  "success": true,
  "message": "Employee deleted successfully",
  "data": { ... }
}
```

#### Search Employees
```
GET /employees/search?query=john
```

**Headers:** Authentication required

**Query Parameters:**
- `query` (string, required)

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [ ... ]
}
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation error message",
  "errors": [ ... ]
}
```

### 401 Unauthorized
```json
{
  "message": "Not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "message": "Employee not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal Server Error",
  "error": { ... }
}
```

## Valid Enumerations

### Position
- Manager
- Developer
- Designer
- Analyst
- Executive
- Intern
- Other

### Department
- IT
- HR
- Finance
- Marketing
- Sales
- Operations
- Other

### Status
- active
- inactive
- on-leave

### Role
- admin
- manager
- user
