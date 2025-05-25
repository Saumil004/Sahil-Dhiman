import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ProgressBar = ({ item, delay }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(item.value);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [item.value, delay]);

  const getProgressColor = (value) => {
    if (value >= 90) return "from-emerald-400 to-emerald-500";
    if (value >= 70) return "from-blue-400 to-blue-500";
    if (value >= 50) return "from-amber-400 to-amber-500";
    return "from-rose-400 to-rose-500";
  };

  return (
    <motion.div
      className="bg-slate-800/40 rounded-lg p-4 hover:bg-slate-800/60 transition-all duration-300 border border-slate-700/50"
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-slate-200 font-medium">{item.course}</span>
        <span className="text-slate-400 text-sm font-semibold">{width}%</span>
      </div>
      <div className="relative w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${getProgressColor(width)} rounded-full`}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

export default ProgressBar;