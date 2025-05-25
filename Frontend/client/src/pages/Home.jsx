import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-indigo-950 via-cyan-900 to-gray-950 flex items-center justify-center p-4 font-['Poppins',sans-serif]"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <motion.div
        className="max-w-2xl text-center text-white"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {/* Header */}
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold mb-6 bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent"
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1 },
          }}
          transition={{ type: 'spring', stiffness: 80, damping: 10 }}
        >
          Welcome to the Smart Student Portal
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          className="text-gray-300 mb-8 text-lg"
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ type: 'tween', ease: 'easeOut', duration: 0.6 }}
        >
          Stay organized, track your schedule, and manage your courses with ease. Sign in to explore your dashboard.
        </motion.p>

        {/* Button */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40, scale: 0.9 },
            visible: { opacity: 1, y: 0, scale: 1 },
          }}
          transition={{ type: 'spring', bounce: 0.4, delay: 0.6 }}
        >
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-lime-500 to-emerald-600 hover:from-lime-400 hover:to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-transform duration-300 hover:scale-105 shadow-lg"
          >
            Get Started
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
