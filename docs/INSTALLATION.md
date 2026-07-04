# Installation Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** v14 or higher
- **npm** v6 or higher
- **MongoDB** (local instance or MongoDB Atlas account)
- **Git**

## Backend Setup

### 1. Navigate to the backend directory

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

Copy `.env.example` to `.env` and update with your configuration:

```bash
cp .env.example .env
```

Update `.env` file with:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A strong secret key for JWT tokens
- `PORT`: Server port (default: 5000)
- `CORS_ORIGIN`: Frontend URL (default: http://localhost:3000)

### 4. Start the backend server

```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The backend will be available at `http://localhost:5000`

## Frontend Setup

### 1. Navigate to the frontend directory

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

Copy `.env.example` to `.env` and update:

```bash
cp .env.example .env
```

Update `.env` file with:
- `REACT_APP_API_URL`: Backend API URL (default: http://localhost:5000/api)

### 4. Start the frontend application

```bash
npm start
```

The frontend will open at `http://localhost:3000`

## Database Setup

### Option 1: Local MongoDB

1. Ensure MongoDB is running on your machine
2. Default connection: `mongodb://localhost:27017/employee-management`

### Option 2: MongoDB Atlas (Cloud)

1. Create a free account at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/employee-management
   ```

## First Time Setup

### Create Admin Account

1. Register a new admin account at `http://localhost:3000/login`
2. Use the registration feature to create credentials
3. Or use the demo credentials:
   - Email: `admin@employeemanagementsystem.com`
   - Password: `Admin123!`

## Verify Installation

### Check Backend

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "Server is running"
}
```

### Check Frontend

Open `http://localhost:3000` in your browser. You should see the login page.

## Troubleshooting

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution**: Ensure MongoDB is running or update `MONGODB_URI` with correct connection string

### Port Already in Use

**Backend** (Port 5000):
```bash
lsof -i :5000  # Find process
kill -9 <PID>   # Kill process
```

**Frontend** (Port 3000):
```bash
lsof -i :3000
kill -9 <PID>
```

### CORS Error

**Solution**: Ensure `CORS_ORIGIN` in backend `.env` matches your frontend URL

### Module Not Found

**Solution**: Run `npm install` in the respective directory

## Next Steps

1. Read [API Documentation](./API.md)
2. Review [Database Schema](./DATABASE.md)
3. Check [Development Guide](./DEVELOPMENT.md)
