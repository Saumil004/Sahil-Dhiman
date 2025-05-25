import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { courses, enrollInCourse } from './CourseData';

const PaymentSuccess = () => {
  const query = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();
  const txnId = query.get('txn');
  const courseName = query.get('course') || 'your course';
  const price = query.get('price') || '499';
  
  const [countdown, setCountdown] = useState(5);
  const [course, setCourse] = useState(null);
  const [enrollmentProcessed, setEnrollmentProcessed] = useState(false);

  // Find the course by name and enroll user
  useEffect(() => {
    const foundCourse = courses.find(c => 
      c.title.toLowerCase() === courseName.toLowerCase()
    );
    setCourse(foundCourse);
    
    // Enroll the user in the course
    if (foundCourse && !enrollmentProcessed) {
      enrollInCourse(foundCourse.id);
      setEnrollmentProcessed(true);
    }
  }, [courseName, enrollmentProcessed]);

  // Countdown and auto-redirect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (course) {
      handleGoToCourse();
    }
  }, [countdown, course]);

  const handleGoToCourse = () => {
    if (course) {
      navigate(`/courses/${course.id}`);
    } else {
      // If course not found, go to courses page
      navigate('/courses');
    }
  };

  const handleGoToCourses = () => {
    navigate('/courses');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-800 to-gray-900 px-4">
      <motion.div
        className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >

        <motion.div
          className="text-emerald-500 text-5xl mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          transition={{ type: 'spring', stiffness: 260, damping: 10 }}
        >
          ✅
        </motion.div>

        <motion.h1
          className="text-3xl font-bold text-emerald-600 mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Payment Successful!
        </motion.h1>

        <motion.p
          className="text-gray-700 mb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          You've successfully enrolled in <strong className='font-semibold text-emerald-600'>{courseName}</strong>.
        </motion.p>

        <motion.p
          className="text-gray-500 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Amount Paid: ₹{price}
        </motion.p>

        <motion.div
          className="mt-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm text-gray-400 mb-1">Transaction ID</p>
          <p className="font-mono text-emerald-700 text-lg">{txnId}</p>
        </motion.div>

        {/* Countdown and Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-4"
        >
          <div className="text-sm text-gray-500 mb-4">
            {countdown > 0 ? (
              <p>Redirecting to your course in <span className="font-bold text-emerald-600">{countdown}</span> seconds...</p>
            ) : (
              <p>Redirecting now...</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              onClick={handleGoToCourse}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {course ? 'Go to Course' : 'View Courses'}
            </motion.button>
            
            <motion.button
              onClick={handleGoToCourses}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Browse Courses
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;