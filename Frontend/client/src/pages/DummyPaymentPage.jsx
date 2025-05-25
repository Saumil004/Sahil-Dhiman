import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const DummyPaymentPage = () => {
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);

  const course = query.get('course') || 'Course';
  const price = query.get('price') || '499';

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      const fakeTransactionId = 'TXN' + Math.floor(Math.random() * 10000000);
      navigate(`/success?txn=${fakeTransactionId}&course=${encodeURIComponent(course)}&price=${price}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-emerald-900 px-4">
      <motion.div
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.h1
          className="text-2xl font-bold text-emerald-600 mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Pay for {course}
        </motion.h1>
        <motion.p
          className="text-gray-500 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Secure Checkout
        </motion.p>

        <AnimatePresence>
          {!processing ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <input
                type="text"
                placeholder="Card Number (16 digits)"
                className="mb-3 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="text"
                placeholder="Expiry MM/YY"
                className="mb-3 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="text"
                placeholder="CVV"
                className="mb-6 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handlePayment}
                className="w-full bg-emerald-500 text-white py-2 rounded-lg font-semibold hover:bg-emerald-600 transition"
              >
                Pay ₹{price}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="processing"
              className="flex flex-col items-center justify-center space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-12 h-12 border-4 border-dashed rounded-full border-emerald-500"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              />
              <motion.p
                className="text-emerald-600 font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                Processing payment...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DummyPaymentPage;