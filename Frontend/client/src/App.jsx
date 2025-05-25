import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import LoginForm from './pages/Login';
import Register from './pages/Register';
import Schedule from './pages/Schedule';
import Courses from './pages/Courses';
import CoursesDetails from './pages/CourseDetails';
import DummyPaymentPage from './pages/DummyPaymentPage';
import PaymentSuccess from './pages/PaymentSuccess';
import AssignmentSection from './pages/AssignmentSection';
import PerformanceSection from './pages/PerformanceSection';

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<Register />} />
      <Route path='/assignments' element={<AssignmentSection />} />
      <Route path='/assignments/:id' element={<AssignmentSection />} />
      <Route path= '/performance' element={<PerformanceSection />} />
      
      {/* Protected routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/courses" 
        element={
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        } 
      />
      <Route 
        path='/courses/:id' 
        element={
          <ProtectedRoute>
            <CoursesDetails />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/schedule" 
        element={
          <ProtectedRoute>
            <Schedule />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/payment" 
        element={
          <ProtectedRoute>
            <DummyPaymentPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/success" 
        element={
          <ProtectedRoute>
            <PaymentSuccess />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default App;
