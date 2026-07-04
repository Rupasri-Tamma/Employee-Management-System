# Database Schema

## Collections

### Users Collection

Stores admin and user account information.

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  role: String (enum: ['admin', 'manager', 'user'], default: 'user'),
  isActive: Boolean (default: true),
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

**Indexes:**
- `email` (unique)
- `createdAt`

### Employees Collection

Stores all employee records.

```javascript
{
  _id: ObjectId,
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  phone: String (required, 10+ digits),
  position: String (required, enum),
  department: String (required, enum),
  salary: Number (required, >= 0),
  joinDate: Date (required),
  status: String (enum: ['active', 'inactive', 'on-leave'], default: 'active'),
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
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

**Indexes:**
- `email` (unique)
- Text index on `firstName`, `lastName`, `email` (for search)

## Relationships

- **Users** to **Employees**: One-to-Many
  - One admin user can manage multiple employees
  - No foreign key constraint (can be added if needed)

## Data Validation Rules

### User
- Name: Required, max 50 characters
- Email: Required, valid email format, unique
- Password: Required, minimum 6 characters (hashed before storage)
- Role: Must be one of admin, manager, or user

### Employee
- First Name: Required, max 50 characters
- Last Name: Required, max 50 characters
- Email: Required, valid email format, unique
- Phone: Required, minimum 10 digits
- Position: Required, must be from enum
- Department: Required, must be from enum
- Salary: Required, must be >= 0
- Join Date: Required, valid date
- Status: Optional, default is 'active'

## Backup & Recovery

### MongoDB Backup

**Using mongodump:**
```bash
mongodump --uri "mongodb://localhost:27017/employee-management" --out ./backup
```

**Using MongoDB Atlas:**
- Automatic daily backups (7 days retention)
- Manual backup on-demand
- Restore from backup snapshots

### MongoDB Restore

**Using mongorestore:**
```bash
mongorestore --uri "mongodb://localhost:27017/employee-management" ./backup/employee-management
```

## Performance Optimization

### Indexes

Text indexes on Employee for search optimization:
```javascript
db.employees.createIndex({ firstName: "text", lastName: "text", email: "text" })
```

### Query Optimization

- Limit results for list endpoints (pagination)
- Use indexes for frequently queried fields
- Avoid large projections
- Use lean() for read-only queries

## Data Migration

### From CSV

```bash
mongoimport --uri "mongodb://localhost:27017/employee-management" \
  --collection employees \
  --type csv \
  --headerline \
  --file employees.csv
```

### From JSON

```bash
mongoimport --uri "mongodb://localhost:27017/employee-management" \
  --collection employees \
  --type json \
  --file employees.json
```

## Security Considerations

1. **Password Hashing**: All user passwords are hashed using bcryptjs (salt rounds: 10)
2. **Sensitive Data**: Employee salary information is never exposed unnecessarily
3. **Access Control**: JWT tokens expire after 7 days
4. **Data Validation**: All inputs are validated and sanitized
5. **HTTPS**: Always use HTTPS in production
