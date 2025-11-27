# Role-Based Authentication System

A full-stack web application with role-based access control (RBAC) featuring separate admin and student portals with authentication and user management.

## Live Demo
[Click here to view live app](https://coplur-role-based-auth-app-4zug.vercel.app/)

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Secure password change functionality
- Logout functionality

### Role-Based Access Control
- **Admin Portal**: Full user management capabilities
- **Student Portal**: Limited access for regular users
- Protected routes based on user roles

### Admin Features
- View all users
- Create new users (admin/student)
- Delete users
- Access to admin dashboard

### Student Features
- Personal welcome page
- Password change capability
- Restricted access to admin features

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables management

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling

## Project Structure
```
project/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── seedAdmin.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── admin.js
│   ├── auth/
│   │   ├── register.js
│   │   ├── signin.js
│   │   ├── changePassword.js
│   │   └── logout.js
│   ├── admin/
│   │   └── adminRoutes.js
│   ├── UserModel.js
│   ├── Welcome.js
│   ├── server.js
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Navbar.css
    │   │   ├── ProtectedRoute.jsx
    │   │   └── AdminRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Login.css
    │   │   ├── Register.jsx
    │   │   ├── Register.css
    │   │   ├── Welcome.jsx
    │   │   ├── Welcome.css
    │   │   ├── ChangePassword.jsx
    │   │   ├── ChangePassword.css
    │   │   ├── LogoutButton.jsx
    │   │   ├── LogoutButton.css
    │   │   └── admin/
    │   │       ├── Dashboard.jsx
    │   │       ├── Dashboard.css
    │   │       ├── UserList.jsx
    │   │       ├── UserList.css
    │   │       ├── CreateUser.jsx
    │   │       └── CreateUser.css
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    └── package.json
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install express mongoose cors dotenv bcryptjs jsonwebtoken
```

3. Create a `.env` file in the backend root:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

4. Start the backend server:
```bash
npm start
```
or for development:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install react react-dom react-router-dom axios
```

3. Create or update `src/api/axios.js`:
```javascript
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
```

4. Start the frontend development server:
```bash
npm run dev
```

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/signin` - User login
- `PUT /api/auth/change-password` - Change password (protected)
- `POST /api/auth/logout` - User logout (protected)

### Admin Routes (Protected & Admin Only)
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users` - Create new user
- `DELETE /api/admin/users/:id` - Delete user

### User Routes
- `GET /api/welcome` - Welcome page (protected)

## Default Admin Credentials

The application automatically seeds an admin account on first run:
- **Email**: admin@example.com (or as set in .env)
- **Password**: admin123 (or as set in .env)

## Usage

1. **Register**: New students can register via the registration page
2. **Login**: Use credentials to login
3. **Admin Access**: Login with admin credentials to access admin dashboard
4. **User Management**: Admins can create, view, and delete users
5. **Change Password**: All authenticated users can change their password

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected routes with middleware
- Role-based access control
- Secure HTTP-only practices

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Backend server port | 5000 |
| MONGO_URI | MongoDB connection string | mongodb://localhost:27017/roleapp |
| JWT_SECRET | Secret key for JWT | your_secret_key_here |
| ADMIN_EMAIL | Default admin email | admin@example.com |
| ADMIN_PASSWORD | Default admin password | admin123 |


