# Student Portal - Authentication System

A complete full-stack Student Portal application with robust authentication system using MERN stack.

## 🚀 Features

### Authentication System
- ✅ User Registration with validation
- ✅ User Login with JWT tokens
- ✅ Password hashing with bcrypt
- ✅ Protected routes and middleware
- ✅ Automatic token verification
- ✅ Session persistence
- ✅ Logout functionality

### Frontend Features
- ✅ Beautiful, responsive UI with TailwindCSS
- ✅ Protected dashboard access
- ✅ Authentication context for state management
- ✅ Route protection
- ✅ Form validation and error handling
- ✅ Loading states and animations

### Backend Features
- ✅ RESTful API with Express.js
- ✅ MongoDB integration with Mongoose
- ✅ JWT-based authentication
- ✅ Password hashing middleware
- ✅ Input validation and sanitization
- ✅ Error handling and logging

## 🛠️ Tech Stack

**Frontend:**
- React 19.1.0
- Vite
- TailwindCSS 4.1.7
- React Router DOM
- Framer Motion (animations)
- Axios (HTTP client)

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (JSON Web Tokens)
- bcryptjs (password hashing)
- CORS enabled

## 📋 Prerequisites

Before running this project, make sure you have:
- Node.js (v16 or higher)
- MongoDB installed and running
- npm or yarn package manager

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Student-Portal
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

### 3. Frontend Setup
```bash
cd Frontend/client
npm install
```

### 4. Environment Configuration

The backend already has a `.env` file configured with:
```env
MONGO_URI=mongodb://localhost:27017/student-portal
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
PORT=5000
NODE_ENV=development
```

**Important:** Change the JWT_SECRET in production!

### 5. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Windows
net start MongoDB

# On Linux
sudo systemctl start mongod
```

### 6. Run the Application

**Start Backend Server:**
```bash
cd Backend
npm start
# Server will run on http://localhost:5000
```

**Start Frontend Development Server:**
```bash
cd Frontend/client
npm run dev
# Frontend will run on http://localhost:5173
```

## 🔐 Authentication Flow

### Registration Process
1. User fills registration form with name, email, and password
2. Frontend validates input and sends request to `/api/auth/register`
3. Backend validates data and checks for existing users
4. Password is automatically hashed using bcrypt middleware
5. User is created in MongoDB
6. JWT token is generated and returned
7. User is automatically logged in and redirected to dashboard

### Login Process
1. User enters email and password
2. Frontend sends request to `/api/auth/login`
3. Backend validates credentials
4. Password is compared using bcrypt
5. JWT token is generated and returned
6. User is redirected to dashboard or intended page

### Protected Routes
- `/dashboard` - Main student dashboard
- `/courses` - Course listings
- `/schedule` - Class schedule
- `/payment` - Payment processing
- All protected routes require valid JWT token

## 📡 API Endpoints

### Authentication Routes
```
POST /api/auth/register - Register new user
POST /api/auth/login    - Login user
GET  /api/auth/me       - Get current user (protected)
```

### Request/Response Examples

**Register:**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com", 
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Login:**
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123" 
}

Response:
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe", 
    "email": "john@example.com"
  }
}
```

## 🔒 Security Features

- **Password Hashing:** All passwords are hashed using bcrypt with salt rounds of 12
- **JWT Tokens:** Secure token-based authentication with 30-day expiration
- **Input Validation:** Comprehensive server-side and client-side validation
- **Protected Routes:** Middleware ensures only authenticated users access protected resources
- **CORS Configuration:** Properly configured for frontend-backend communication
- **Environment Variables:** Sensitive data stored in environment variables

## 🎨 UI/UX Features

- Modern gradient backgrounds
- Smooth animations with Framer Motion
- Responsive design for all devices
- Loading states and error handling
- Beautiful form designs with icons
- Protected route loading screens

## 🚦 Usage

1. **Access the Application:** Open http://localhost:5173
2. **Register:** Click "Register" and create a new account
3. **Login:** Use your credentials to log in
4. **Dashboard:** Access your personalized dashboard
5. **Logout:** Use the logout button to end your session

## 🛡️ Authentication Security

The system implements several security best practices:
- Passwords are never stored in plain text
- JWT tokens include user ID and email
- Tokens are automatically validated on protected routes
- Expired or invalid tokens are handled gracefully
- User sessions persist across browser refreshes
- Automatic logout on token expiration

## 🔧 Development

### Available Scripts

**Backend:**
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📝 Notes

- The authentication system is production-ready with proper error handling
- All passwords are hashed with bcrypt for security
- JWT tokens expire after 30 days
- MongoDB connection is established with proper error handling
- CORS is configured for frontend-backend communication
- The system supports session persistence across browser refreshes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**🎉 Your Student Portal with Authentication is now ready to use!**

The system provides secure user registration, login, and dashboard access with modern UI and robust security features. 