import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-purple-950 px-4">
      <motion.div
        className="backdrop-blur-lg bg-black/30 rounded-2xl p-10 shadow-xl border border-gray-800 w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-4xl font-bold text-white text-center mb-6 bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Create Your Account
        </motion.h2>

        <form className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Full Name"
            className="px-4 py-3 rounded-md bg-gray-900/60 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-md bg-gray-900/60 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-md bg-gray-900/60 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="px-4 py-3 rounded-md bg-gray-900/60 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-800 to-purple-900 hover:from-indigo-700 hover:to-purple-800 text-white py-3 rounded-md shadow-md transition-all transform hover:-translate-y-1 hover:shadow-xl"
          >
            Register
          </button>
        </form>

        <div className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:underline">
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterForm;