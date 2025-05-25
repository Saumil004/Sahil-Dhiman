import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getCoursesWithEnrollmentStatus } from "./CourseData";
import { 
  FaPlay, 
  FaCheckCircle, 
  FaHourglassHalf, 
  FaClock, 
  FaUsers, 
  FaStar,
  FaChartBar,
  FaBookOpen,
  FaDownload,
  FaCertificate,
  FaBell
} from "react-icons/fa";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const courses = getCoursesWithEnrollmentStatus();
    const foundCourse = courses.find((c) => c.id === id);
    setCourse(foundCourse);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-cyan-900 to-gray-950 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p>Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-cyan-900 to-gray-950 flex items-center justify-center">
        <div className="text-white p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
          <p className="mb-6">The course you're looking for doesn't exist.</p>
          <Link
            to="/courses"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const getStatusInfo = (status) => {
    switch (status) {
      case 'Ongoing':
        return {
          icon: <FaPlay className="text-emerald-400" />,
          color: 'emerald',
          bgColor: 'bg-emerald-500/20',
          borderColor: 'border-emerald-500/30',
          textColor: 'text-emerald-400'
        };
      case 'Completed':
        return {
          icon: <FaCheckCircle className="text-blue-400" />,
          color: 'blue',
          bgColor: 'bg-blue-500/20',
          borderColor: 'border-blue-500/30',
          textColor: 'text-blue-400'
        };
      case 'Upcoming':
        return {
          icon: <FaHourglassHalf className="text-amber-400" />,
          color: 'amber',
          bgColor: 'bg-amber-500/20',
          borderColor: 'border-amber-500/30',
          textColor: 'text-amber-400'
        };
      case 'Available':
        return {
          icon: <FaBookOpen className="text-lime-400" />,
          color: 'lime',
          bgColor: 'bg-lime-500/20',
          borderColor: 'border-lime-500/30',
          textColor: 'text-lime-400'
        };
      default:
        return {
          icon: <FaBookOpen className="text-slate-400" />,
          color: 'slate',
          bgColor: 'bg-slate-500/20',
          borderColor: 'border-slate-500/30',
          textColor: 'text-slate-400'
        };
    }
  };

  const statusInfo = getStatusInfo(course.status);

  const renderActionButtons = () => {
    // Only show enroll button for non-enrolled courses
    if (!course.enrolled || course.status === 'Available') {
      return (
        <Link
          to={`/payment?course=${encodeURIComponent(course.title)}&price=${course.price || 499}`}
          className="inline-block bg-lime-500 hover:bg-lime-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
        >
          Enroll Now – ₹{course.price || 499}
        </Link>
      );
    }

    // For enrolled courses, show appropriate actions based on status
    switch (course.status) {
      case 'Ongoing':
        return (
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaPlay />
              Continue Learning
            </motion.button>
            <motion.button
              className="bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 text-slate-300 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaDownload />
              Resources
            </motion.button>
          </div>
        );
      
      case 'Completed':
        return (
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaBookOpen />
              Review Course
            </motion.button>
            <motion.button
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaCertificate />
              Download Certificate
            </motion.button>
          </div>
        );
      
      case 'Upcoming':
        return (
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaBell />
              Set Reminder
            </motion.button>
            <motion.button
              className="bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 text-slate-300 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaDownload />
              Prep Materials
            </motion.button>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderStatusSpecificContent = () => {
    switch (course.status) {
      case 'Ongoing':
        return (
          <motion.div
            className="mb-6 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <FaChartBar />
              Your Progress
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-slate-300 mb-2">
                  <span>Overall Completion</span>
                  <span>65%</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '65%' }}
                    transition={{ duration: 1.5, delay: 0.7 }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-lg font-bold text-emerald-400">8</div>
                  <div className="text-xs text-slate-400">Modules Complete</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-lg font-bold text-emerald-400">4</div>
                  <div className="text-xs text-slate-400">Assignments Done</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-lg font-bold text-emerald-400">12</div>
                  <div className="text-xs text-slate-400">Hours Studied</div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      
      case 'Completed':
        return (
          <motion.div
            className="mb-6 p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
              <FaCheckCircle />
              Course Completed!
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-lg font-bold text-blue-400">A+</div>
                  <div className="text-xs text-slate-400">Final Grade</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-lg font-bold text-blue-400">95%</div>
                  <div className="text-xs text-slate-400">Score</div>
                </div>
              </div>
              <div className="text-center p-4 bg-blue-500/20 rounded-lg">
                <FaCertificate className="text-3xl text-blue-400 mx-auto mb-2" />
                <p className="text-blue-300 font-medium">Certificate Available</p>
                <p className="text-xs text-slate-400">Congratulations on completing the course!</p>
              </div>
            </div>
          </motion.div>
        );
      
      case 'Upcoming':
        return (
          <motion.div
            className="mb-6 p-6 bg-amber-500/10 border border-amber-500/20 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-amber-400 mb-4 flex items-center gap-2">
              <FaHourglassHalf />
              Starting Soon
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-lg font-bold text-amber-400">June 10</div>
                  <div className="text-xs text-slate-400">Start Date</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-lg font-bold text-amber-400">8 weeks</div>
                  <div className="text-xs text-slate-400">Duration</div>
                </div>
              </div>
              <div className="text-center p-4 bg-amber-500/20 rounded-lg">
                <FaBell className="text-3xl text-amber-400 mx-auto mb-2" />
                <p className="text-amber-300 font-medium">Get Notified</p>
                <p className="text-xs text-slate-400">We'll remind you when the course starts</p>
              </div>
            </div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-indigo-950 via-cyan-900 to-gray-950 p-6 text-white flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.div
        className="max-w-4xl w-full bg-emerald-100/20 backdrop-blur-lg p-8 rounded-2xl border border-emerald-300 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {/* Course Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent">
              {course.title}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              {statusInfo.icon}
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusInfo.bgColor} ${statusInfo.borderColor} ${statusInfo.textColor}`}>
                {course.status}
              </span>
            </div>
          </div>
        </div>

        {/* Course Description */}
        <p className="text-gray-200 mb-6">{course.full}</p>

        {/* Status Specific Content */}
        {renderStatusSpecificContent()}

        {/* Learning Objectives */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">🎯 Learning Objectives</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            {course.features.map((obj, idx) => (
              <li key={idx}>{obj}</li>
            ))}
          </ul>
        </div>

        {/* Course Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700/50">
            <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <FaClock className="text-emerald-400" />
              Duration
            </h2>
            <p className="text-gray-300">8 weeks</p>
            <p className="text-gray-400 text-sm">2 sessions/week • 1.5 hours/session</p>
          </div>

          <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700/50">
            <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <FaUsers className="text-emerald-400" />
              Class Info
            </h2>
            <p className="text-gray-300">Dr. Jane Doe</p>
            <p className="text-gray-400 text-sm">PhD in Computer Science</p>
          </div>

          <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700/50">
            <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <FaStar className="text-emerald-400" />
              Rating
            </h2>
            <p className="text-gray-300">4.8/5.0</p>
            <p className="text-gray-400 text-sm">1,200+ students</p>
          </div>
        </div>

        {/* Resources Section */}
        {(course.status === 'Ongoing' || course.status === 'Completed') && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">🔗 Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a 
                href="https://www.coursera.org" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg hover:bg-slate-800/50 transition-all duration-300 text-lime-300 hover:text-emerald-300"
              >
                <FaBookOpen />
                <span>Course Materials</span>
              </a>
              <a 
                href="https://docs.google.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg hover:bg-slate-800/50 transition-all duration-300 text-lime-300 hover:text-emerald-300"
              >
                <FaDownload />
                <span>Lecture Slides</span>
              </a>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mb-6">
          {renderActionButtons()}
        </div>

        {/* Back to Courses Link */}
        <div className="text-center">
          <Link
            to="/courses"
            className="text-lime-300 hover:text-emerald-400 transition inline-flex items-center gap-2"
          >
            ← Back to Courses
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CourseDetails;