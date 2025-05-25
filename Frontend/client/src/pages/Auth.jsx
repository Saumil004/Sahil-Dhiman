import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Auth = ({ isRegister = false }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-cyan-900 to-gray-950 px-6 py-12 flex items-center justify-center">
      <motion.div
        className="w-full max-w-md bg-emerald-100/20 backdrop-blur-lg p-8 rounded-xl border border-emerald-300 shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-emerald-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {isRegister ? "Create an Account" : "Login to Your Portal"}
        </motion.h2>

        <form className="flex flex-col gap-4">
          {isRegister && (
            <input
              type="text"
              placeholder="Full Name"
              className="px-4 py-3 rounded-md bg-emerald-200/10 text-white placeholder-gray-300 border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-md bg-emerald-200/10 text-white placeholder-gray-300 border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-md bg-emerald-200/10 text-white placeholder-gray-300 border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
            required
          />
          {isRegister && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="px-4 py-3 rounded-md bg-emerald-200/10 text-white placeholder-gray-300 border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
              required
            />
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-400 hover:to-emerald-400 text-white py-3 rounded-md shadow transition-all hover:shadow-lg"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <div className="text-center text-sm text-emerald-200 mt-6">
          {isRegister ? (
            <>
              Already have an account?{" "}
              <Link to="/login" className="text-lime-300 hover:underline">
                Login
              </Link>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <Link to="/register" className="text-lime-300 hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;