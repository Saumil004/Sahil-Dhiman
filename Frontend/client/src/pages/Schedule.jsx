import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaChevronLeft, 
  FaChevronRight,
  FaFilter,
  FaList,
  FaTh,
  FaPlay,
  FaBookOpen,
  FaAngleDoubleLeft,
  FaAngleDoubleRight
} from "react-icons/fa";

const scheduleData = [
  {
    subject: "Introduction to AI",
    day: "Monday",
    time: "9:00 AM – 10:30 AM",
    room: "Room A101",
    instructor: "Dr. Smith",
    type: "Lecture",
    color: "emerald",
  },
  {
    subject: "Web Development",
    day: "Wednesday", 
    time: "11:00 AM – 12:30 PM",
    room: "Room B204",
    instructor: "Prof. Johnson",
    type: "Lab",
    color: "blue",
  },
  {
    subject: "Data Structures",
    day: "Friday",
    time: "2:00 PM – 3:30 PM", 
    room: "Room C310",
    instructor: "Dr. Davis",
    type: "Lecture",
    color: "violet",
  },
  {
    subject: "Cybersecurity Fundamentals",
    day: "Tuesday",
    time: "10:00 AM – 11:30 AM",
    room: "Room D402", 
    instructor: "Prof. Wilson",
    type: "Seminar",
    color: "amber",
  },
  {
    subject: "Cloud Computing",
    day: "Thursday",
    time: "3:00 PM – 4:30 PM",
    room: "Room E101",
    instructor: "Dr. Brown",
    type: "Lab",
    color: "rose",
  },
  {
    subject: "Operating Systems",
    day: "Saturday",
    time: "1:00 PM – 2:30 PM",
    room: "Room F210",
    instructor: "Prof. Lee",
    type: "Lecture", 
    color: "teal",
  },
];

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
];

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Schedule = () => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedDay, setSelectedDay] = useState('All');
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Calculate current week start (Monday)
  const getCurrentWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(d.setDate(diff));
  };

  const [currentWeekStart, setCurrentWeekStart] = useState(getCurrentWeekStart(new Date()));

  const filteredSchedule = scheduleData.filter(item => 
    selectedDay === 'All' || item.day === selectedDay
  );

  const getTypeColor = (type) => {
    switch (type) {
      case 'Lecture': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Lab': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Seminar': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getClassForTimeSlot = (day, time) => {
    return scheduleData.find(item => 
      item.day === day && item.time.startsWith(time)
    );
  };

  // Week navigation functions
  const goToPreviousWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeekStart(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeekStart(newDate);
  };

  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
    setCurrentWeekStart(getCurrentWeekStart(newDate));
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
    setCurrentWeekStart(getCurrentWeekStart(newDate));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setCurrentWeekStart(getCurrentWeekStart(today));
  };

  // Format date for display
  const formatDateRange = () => {
    const endDate = new Date(currentWeekStart);
    endDate.setDate(endDate.getDate() + 6);
    
    const startMonth = currentWeekStart.toLocaleDateString('en-US', { month: 'short' });
    const endMonth = endDate.toLocaleDateString('en-US', { month: 'short' });
    
    if (startMonth === endMonth) {
      return `${startMonth} ${currentWeekStart.getDate()}-${endDate.getDate()}, ${currentWeekStart.getFullYear()}`;
    } else {
      return `${startMonth} ${currentWeekStart.getDate()} - ${endMonth} ${endDate.getDate()}, ${currentWeekStart.getFullYear()}`;
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
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <FaCalendarAlt className="text-emerald-500 text-2xl" />
                  <h1 className="text-2xl font-semibold text-slate-100">Class Schedule</h1>
                </div>
                <p className="text-slate-400">Manage your weekly class timetable</p>
              </div>
              
              {/* Enhanced View Toggle and Navigation */}
              <div className="flex items-center gap-4">
                {/* Month Navigation (only visible in calendar view) */}
                {viewMode === 'grid' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={goToPreviousMonth}
                      className="p-2 text-slate-400 hover:text-slate-200 transition-colors rounded-lg hover:bg-slate-700/50"
                    >
                      <FaAngleDoubleLeft />
                    </button>
                    <span className="text-slate-300 font-medium min-w-[100px] text-center">
                      {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    <button
                      onClick={goToNextMonth}
                      className="p-2 text-slate-400 hover:text-slate-200 transition-colors rounded-lg hover:bg-slate-700/50"
                    >
                      <FaAngleDoubleRight />
                    </button>
                  </div>
                )}
                
                {/* Today Button */}
                <button
                  onClick={goToToday}
                  className="px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/30 transition-all duration-300 text-sm font-medium"
                >
                  Today
                </button>

                {/* View Toggle */}
                <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-1 border border-slate-600/50">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all duration-300 ${
                      viewMode === 'list'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    <FaList />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all duration-300 ${
                      viewMode === 'grid'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    <FaTh />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filter Section - Only show in list view */}
        {viewMode === 'list' && (
          <motion.div
            className="mb-8 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
              <FaFilter />
              Filter by day:
            </div>
            <div className="flex flex-wrap gap-2">
              {['All', ...daysOfWeek.slice(0, 6)].map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedDay === day
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800/50 text-slate-400 border border-slate-600/30 hover:border-slate-500/50 hover:text-slate-300'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {viewMode === 'list' ? (
            /* List View */
            <motion.div
              key="list"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {filteredSchedule.map((item, index) => (
                <motion.div
                  key={`${item.subject}-${index}`}
                  className="group bg-slate-800/40 border border-slate-600/40 rounded-lg p-6 shadow-sm hover:shadow-md backdrop-blur-sm hover:border-slate-500/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-100 mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                        {item.subject}
                      </h3>
                      <span className={`text-xs px-3 py-1 rounded-full border ${getTypeColor(item.type)}`}>
                        {item.type}
                      </span>
                    </div>
                    <span className="text-emerald-400 text-sm font-medium bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                      {item.day}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-slate-400 text-sm">
                      <FaClock className="text-emerald-500" />
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400 text-sm">
                      <FaMapMarkerAlt className="text-emerald-500" />
                      <span>{item.room}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400 text-sm">
                      <FaBookOpen className="text-emerald-500" />
                      <span>{item.instructor}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    className="w-full mt-4 bg-slate-700/50 hover:bg-emerald-500/20 border border-slate-600/50 hover:border-emerald-500/30 text-slate-300 hover:text-emerald-400 px-4 py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaPlay className="text-xs" />
                    <span className="text-sm font-medium">Join Class</span>
                  </motion.button>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Enhanced Grid/Calendar View */
            <motion.div
              key="grid"
              className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/40 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Calendar Header with Enhanced Navigation */}
              <div className="bg-slate-800/50 border-b border-slate-700/50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg font-semibold text-slate-100">Weekly View</h3>
                    <span className="text-slate-400 text-sm">
                      {formatDateRange()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={goToPreviousWeek}
                      className="p-2 text-slate-400 hover:text-slate-200 transition-colors rounded-lg hover:bg-slate-700/50 border border-slate-600/30"
                    >
                      <FaChevronLeft />
                    </button>
                    <button 
                      onClick={goToNextWeek}
                      className="p-2 text-slate-400 hover:text-slate-200 transition-colors rounded-lg hover:bg-slate-700/50 border border-slate-600/30"
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
              </div>

              {/* Enhanced Calendar Grid */}
              <div className="overflow-x-auto">
                <div className="min-w-full">
                  {/* Day Headers with Dates */}
                  <div className="grid grid-cols-7 border-b border-slate-700/50">
                    <div className="p-4 text-slate-400 text-sm font-medium border-r border-slate-700/50">
                      Time
                    </div>
                    {daysOfWeek.slice(0, 6).map((day, index) => {
                      const dayDate = new Date(currentWeekStart);
                      dayDate.setDate(dayDate.getDate() + index);
                      const isToday = dayDate.toDateString() === new Date().toDateString();
                      
                      return (
                        <div key={day} className={`p-4 text-sm font-medium text-center border-r border-slate-700/50 last:border-r-0 ${
                          isToday ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-300'
                        }`}>
                          <div className="font-semibold">{day}</div>
                          <div className={`text-xs mt-1 ${isToday ? 'text-emerald-300' : 'text-slate-500'}`}>
                            {dayDate.getDate()}/{dayDate.getMonth() + 1}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Time Slots */}
                  {timeSlots.map((timeSlot, timeIndex) => (
                    <div key={timeSlot} className="grid grid-cols-7 border-b border-slate-700/30 last:border-b-0 min-h-[100px]">
                      <div className="p-4 text-slate-400 text-xs border-r border-slate-700/50 flex items-center font-medium">
                        {timeSlot}
                      </div>
                      {daysOfWeek.slice(0, 6).map((day, dayIndex) => {
                        const classItem = getClassForTimeSlot(day, timeSlot);
                        const dayDate = new Date(currentWeekStart);
                        dayDate.setDate(dayDate.getDate() + dayIndex);
                        const isToday = dayDate.toDateString() === new Date().toDateString();
                        
                        return (
                          <div key={`${day}-${timeSlot}`} className={`border-r border-slate-700/50 last:border-r-0 p-2 relative ${
                            isToday ? 'bg-emerald-500/5' : ''
                          }`}>
                            {classItem && (
                              <motion.div
                                className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-3 h-full cursor-pointer hover:bg-emerald-500/30 transition-all duration-300 group"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: (timeIndex * 6 + dayIndex) * 0.05 }}
                                whileHover={{ scale: 1.02 }}
                              >
                                <div className="text-emerald-400 font-medium text-xs mb-1 group-hover:text-emerald-300 transition-colors duration-300">
                                  {classItem.subject}
                                </div>
                                <div className="text-slate-400 text-xs mb-1">
                                  {classItem.room}
                                </div>
                                <div className="text-slate-500 text-xs">
                                  {classItem.instructor}
                                </div>
                                <div className={`text-xs px-2 py-1 rounded-full mt-2 ${getTypeColor(classItem.type)}`}>
                                  {classItem.type}
                                </div>
                              </motion.div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {filteredSchedule.length === 0 && viewMode === 'list' && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-slate-500 text-6xl mb-4">
              <FaCalendarAlt className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No classes scheduled</h3>
            <p className="text-slate-400 mb-6">
              {selectedDay !== 'All' 
                ? `No classes found for ${selectedDay}`
                : 'Your schedule is currently empty'
              }
            </p>
            {selectedDay !== 'All' && (
              <button
                onClick={() => setSelectedDay('All')}
                className="bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 px-6 py-3 rounded-lg transition-all duration-300"
              >
                View all classes
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Schedule;