// 📁 AssignmentSection.jsx — Dynamic & User-Friendly
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaClipboardList, FaClock } from "react-icons/fa";

const AssignmentSection = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);
      // Simulate API fetch delay
      await new Promise((res) => setTimeout(res, 1000));
      setAssignments([
        {
          title: "HTML & CSS Landing Page",
          due: "Today • 5:00 PM",
          location: "Room 101",
          color: "border-blue-900",
        },
        {
          title: "Linked List Implementation",
          due: "Tomorrow • 11:00 AM",
          location: "Online",
          color: "border-emerald-900",
        },
        {
          title: "Linear Regression Analysis",
          due: "June 3 • 9:30 AM",
          location: "Lab 202",
          color: "border-rose-900",
        },
        {
          title: "Database Design Doc",
          due: "June 6 • 10:00 AM",
          location: "Room 215",
          color: "border-indigo-900",
        },
        {
          title: "Research Presentation",
          due: "June 9 • 2:00 PM",
          location: "Auditorium",
          color: "border-yellow-900",
        },
        {
          title: "API Integration Task",
          due: "June 12 • 3:30 PM",
          location: "Lab 103",
          color: "border-cyan-900",
        }
      ]);
      setLoading(false);
    };
    fetchAssignments();
  }, []);

  return (
    <motion.div
      className="bg-slate-900/60 backdrop-blur-sm border border-slate-800/70 rounded-xl p-6 h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <h2 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-3">
        <FaClipboardList className="text-slate-400" />
        Assignments
      </h2>
      {loading ? (
        <div className="text-slate-500 text-sm">Loading assignments...</div>
      ) : (
        <div className="space-y-4 overflow-y-auto pb-2 pr-1">
          {assignments.map((task, index) => (
            <motion.div
              key={index}
              className={`p-4 bg-slate-800/40 rounded-lg border-l-4 ${task.color} hover:bg-slate-800/60 transition-all duration-300 group cursor-pointer`}
              whileHover={{ x: 3 }}
            >
              <p className="text-slate-400 text-xs font-medium mb-1 flex items-center gap-1">
                <FaClock /> {task.due}
              </p>
              <p className="text-slate-100 font-semibold text-sm mb-1 group-hover:text-emerald-400 transition-colors duration-300">
                {task.title}
              </p>
              <p className="text-slate-500 text-xs">{task.location}</p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default AssignmentSection;