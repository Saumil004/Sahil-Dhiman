import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getCoursesWithEnrollmentStatus } from './CourseData.js';
import { 
  FaSearch, 
  FaFilter, 
  FaBookOpen, 
  FaClock, 
  FaUsers, 
  FaStar,
  FaChevronRight,
  FaGraduationCap,
  FaPlay,
  FaCheckCircle,
  FaHourglassHalf
} from 'react-icons/fa';

const Courses = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [courses, setCourses] = useState([]);

  // Load courses with current enrollment status
  useEffect(() => {
    setCourses(getCoursesWithEnrollmentStatus());
  }, []);

  // Refresh courses when component becomes visible (for when user returns from payment)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setCourses(getCoursesWithEnrollmentStatus());
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const statusFilters = ['All', 'Ongoing', 'Completed', 'Upcoming', 'Available'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.short.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || course.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Ongoing': return <FaPlay className="text-emerald-400" />;
      case 'Completed': return <FaCheckCircle className="text-blue-400" />;
      case 'Upcoming': return <FaHourglassHalf className="text-amber-400" />;
      case 'Available': return <FaBookOpen className="text-lime-400" />;
      default: return <FaBookOpen className="text-slate-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ongoing': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Completed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Upcoming': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Available': return 'bg-lime-500/20 text-lime-400 border-lime-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getButtonText = (course) => {
    // For non-enrolled courses, always show enroll
    if (!course.enrolled || course.status === 'Available') {
      return 'Enroll Now';
    }
    
    // For enrolled courses, show appropriate action based on status
    switch (course.status) {
      case 'Completed': return 'Review Course';
      case 'Upcoming': return 'View Details';
      case 'Ongoing': return 'Continue Learning';
      default: return 'View Course';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <FaGraduationCap className="text-emerald-500 text-2xl" />
              <h1 className="text-2xl font-semibold text-slate-100">Courses</h1>
            </div>
            <p className="text-slate-400">Explore available courses and track your learning progress</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filter Section */}
        <motion.div
          className="mb-8 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Search Bar */}
          <div className="relative max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all duration-300"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-2 text-slate-400 text-sm font-medium">
              <FaFilter />
              Filter by status:
            </span>
            {statusFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedFilter === filter
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-800/50 text-slate-400 border border-slate-600/30 hover:border-slate-500/50 hover:text-slate-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Courses Grid */}
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                className="group bg-slate-800/40 border border-slate-600/40 rounded-lg p-6 shadow-sm hover:shadow-md backdrop-blur-sm hover:border-slate-500/50 transition-all duration-300 flex flex-col"
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1 }
                }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
              >
                {/* Course Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-100 mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(course.status)}
                      <span className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(course.status)}`}>
                        {course.status}
                      </span>
                    </div>
                  </div>
                  {/* Price tag for available courses */}
                  {course.status === 'Available' && course.price && (
                    <div className="text-right">
                      <div className="text-lg font-bold text-lime-400">₹{course.price}</div>
                      <div className="text-xs text-slate-400">Course Fee</div>
                    </div>
                  )}
                </div>

                {/* Course Description */}
                <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
                  {course.short}
                </p>

                {/* Course Stats */}
                <div className="flex items-center gap-4 mb-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <FaClock />
                    <span>8 weeks</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaUsers />
                    <span>1.2k students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaStar />
                    <span>4.8</span>
                  </div>
                </div>

                {/* Progress Bar (for ongoing courses) */}
                {course.status === 'Ongoing' && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-slate-400 mb-2">
                      <span>Progress</span>
                      <span>65%</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '65%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <motion.button
                  onClick={() => navigate(course.link)}
                  className="w-full bg-slate-700/50 hover:bg-emerald-500/20 border border-slate-600/50 hover:border-emerald-500/30 text-slate-300 hover:text-emerald-400 px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="font-medium">
                    {getButtonText(course)}
                  </span>
                  <FaChevronRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-slate-500 text-6xl mb-4">
              <FaBookOpen className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No courses found</h3>
            <p className="text-slate-400 mb-6">
              {searchTerm || selectedFilter !== 'All' 
                ? 'Try adjusting your search or filter criteria'
                : 'Start your learning journey by enrolling in a course'
              }
            </p>
            {(searchTerm || selectedFilter !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedFilter('All');
                }}
                className="bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 px-6 py-3 rounded-lg transition-all duration-300"
              >
                Clear filters
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Courses;