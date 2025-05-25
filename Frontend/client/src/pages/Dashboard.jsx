import React from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaBookOpen,
  FaClipboardList,
  FaChartBar,
  FaMedal,
  FaSignOutAlt,
  FaUser,
  FaCalendarPlus,
  FaGraduationCap,
  FaCreditCard,
  FaSearch,
  FaBell,
  FaAward,
  FaClock,
  FaFire,
  FaTrophy,
  FaChevronRight,
  FaPlayCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaEye,
  FaUsers,
  FaStar,
  FaDownload,
  FaPlus,
  FaChartLine,
  FaCalendarAlt,
  FaLightbulb,
  FaHeart,
  FaBolt,

} from "react-icons/fa";

// ✅ Enhanced ProgressBar component with better animations
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

// ✅ Enhanced Quick Action Card Component
const QuickActionCard = ({ icon, title, description, color, onClick, to, badge }) => {
  const CardComponent = to ? Link : 'button';
  
  return (
    <CardComponent
      to={to}
      onClick={onClick}
      className={`group relative overflow-hidden bg-slate-800/50 border border-slate-600/30 rounded-lg p-6 text-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-slate-500/50 hover:-translate-y-1`}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`text-3xl ${color} group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          {badge && (
            <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-full border border-emerald-500/30">
              {badge}
            </span>
          )}
        </div>
        <h3 className="font-semibold text-lg mb-2 text-slate-100 group-hover:text-emerald-400 transition-colors duration-300">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <FaChevronRight className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 text-slate-400 group-hover:text-emerald-400" />
    </CardComponent>
  );
};

// ✅ Activity Item Component
const ActivityItem = ({ activity, index }) => (
  <motion.div
    className="flex items-center gap-4 p-4 bg-slate-800/30 border border-slate-700/40 rounded-lg hover:bg-slate-800/50 transition-all duration-300 group cursor-pointer"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ x: 3 }}
  >
    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${activity.color} flex items-center justify-center text-white text-sm group-hover:scale-110 transition-transform duration-300`}>
      {activity.icon}
    </div>
    <div className="flex-1">
      <p className="text-slate-200 font-medium text-sm group-hover:text-emerald-400 transition-colors duration-300">{activity.title}</p>
      <p className="text-slate-500 text-xs">{activity.time}</p>
    </div>
    {activity.score && (
      <div className="text-emerald-400 font-semibold text-sm bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
        {activity.score}
      </div>
    )}
  </motion.div>
);

// ✅ Achievement Badge Component
const AchievementBadge = ({ achievement, index }) => (
  <motion.div
    className="relative p-4 rounded-lg bg-slate-800/40 border border-slate-600/40 text-slate-200 text-center group cursor-pointer hover:bg-slate-800/60 transition-all duration-300 hover:scale-105"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.05 }}
  >
    <div className={`text-2xl mb-3 ${achievement.color} group-hover:scale-110 transition-transform duration-300`}>
      {achievement.icon}
    </div>
    <h4 className="font-semibold text-sm mb-1 text-slate-100 group-hover:text-emerald-400 transition-colors duration-300">{achievement.title}</h4>
    <p className="text-xs text-slate-400">{achievement.description}</p>
    {achievement.new && (
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full animate-pulse" />
    )}
  </motion.div>
);

// ✅ New Notification Item Component
const NotificationItem = ({ notification, index }) => (
  <motion.div
    className="flex items-start gap-3 p-3 bg-slate-800/30 border border-slate-700/40 rounded-lg hover:bg-slate-800/50 transition-all duration-300 group cursor-pointer"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ x: 2 }}
  >
    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${notification.color} flex items-center justify-center text-white text-xs`}>
      {notification.icon}
    </div>
    <div className="flex-1">
      <p className="text-slate-200 font-medium text-sm">{notification.title}</p>
      <p className="text-slate-500 text-xs mt-1">{notification.message}</p>
      <p className="text-slate-600 text-xs mt-1">{notification.time}</p>
    </div>
    {notification.unread && (
      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
    )}
  </motion.div>
);

// ✅ Study Streak Component
const StudyStreak = ({ streak }) => (
  <motion.div
    className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 rounded-lg p-6 text-center"
    whileHover={{ scale: 1.02 }}
  >
    <div className="text-emerald-400 text-3xl mb-3">
      <FaFire />
    </div>
    <div className="text-2xl font-bold text-emerald-400 mb-1">{streak}</div>
    <div className="text-sm text-emerald-300 mb-2">Day Streak</div>
    <div className="text-xs text-emerald-400/70">Keep it up! 🔥</div>
  </motion.div>
);

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const dashboardData = {
    progress: [
      { course: "Web Development", value: 85 },
      { course: "Data Structures", value: 68 },
      { course: "Machine Learning", value: 92 },
      { course: "Database Systems", value: 76 },
    ],
    upcoming: [
      {
        title: "Web Development Lab",
        time: "Today • 10:00 AM",
        location: "Room 305",
        color: "emerald",
      },
      {
        title: "Machine Learning Quiz",
        time: "Today • 2:30 PM",
        location: "Online",
        color: "violet",
      },
      {
        title: "Data Structures Lecture",
        time: "Tomorrow • 9:15 AM",
        location: "Room 220",
        color: "teal",
      },
    ],
    recentActivities: [
      {
        title: "Completed JavaScript Quiz",
        time: "2 hours ago",
        icon: <FaAward />,
        color: "from-emerald-500 to-emerald-600",
        score: "95%"
      },
      {
        title: "Submitted Assignment #3",
        time: "5 hours ago",
        icon: <FaClipboardList />,
        color: "from-blue-500 to-blue-600",
      },
      {
        title: "Joined Study Group Session",
        time: "1 day ago",
        icon: <FaUsers />,
        color: "from-violet-500 to-violet-600",
      },
    ],
    notifications: [
      {
        title: "New Assignment Posted",
        message: "Database Systems Assignment #4 is now available",
        time: "2 hours ago",
        icon: <FaClipboardList />,
        color: "from-blue-500 to-blue-600",
        unread: true
      },
      {
        title: "Grade Updated",
        message: "Your Web Development Quiz grade has been posted",
        time: "5 hours ago",
        icon: <FaStar />,
        color: "from-amber-500 to-amber-600",
        unread: true
      },
      {
        title: "Class Reminder",
        message: "Machine Learning Lab starts in 30 minutes",
        time: "1 day ago",
        icon: <FaBell />,
        color: "from-emerald-500 to-emerald-600",
        unread: false
      },
    ],
    achievements: [
      {
        title: "Quick Learner",
        description: "Completed 3 courses",
        icon: <FaFire />,
        color: "text-orange-400",
        new: true
      },
      {
        title: "Perfect Attendance",
        description: "100% this month",
        icon: <FaTrophy />,
        color: "text-amber-400",
      },
      {
        title: "Top Performer",
        description: "A+ average",
        icon: <FaMedal />,
        color: "text-emerald-400",
      },
      {
        title: "Team Player",
        description: "Active in discussions",
        icon: <FaUsers />,
        color: "text-blue-400",
      },
    ]
  };

  useEffect(() => {
    const fetchUserOverview = async () => {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 1000));
      setOverview({
        courses: 6,
        assignments: 12,
        attendance: "92%",
        grade: "A-",
        studyHours: "24.5",
        studyStreak: 7
      });
      setLoading(false);
    };
    fetchUserOverview();
  }, []);

  const overviewCards = [
    { 
      label: "Active Courses", 
      value: overview?.courses, 
      icon: <FaBookOpen />, 
      color: "bg-slate-800/50 border-blue-500/30",
      iconColor: "text-blue-400",
      change: "+2 this semester",
      bgGradient: "from-blue-500/10 to-blue-600/5"
    },
    { 
      label: "Assignments", 
      value: overview?.assignments, 
      icon: <FaClipboardList />, 
      color: "bg-slate-800/50 border-emerald-500/30",
      iconColor: "text-emerald-400",
      change: "3 pending",
      bgGradient: "from-emerald-500/10 to-emerald-600/5"
    },
    { 
      label: "Attendance", 
      value: overview?.attendance, 
      icon: <FaChartBar />, 
      color: "bg-slate-800/50 border-violet-500/30",
      iconColor: "text-violet-400",
      change: "+5% this month",
      bgGradient: "from-violet-500/10 to-violet-600/5"
    },
    { 
      label: "Overall Grade", 
      value: overview?.grade, 
      icon: <FaMedal />, 
      color: "bg-slate-800/50 border-amber-500/30",
      iconColor: "text-amber-400",
      change: "Improved!",
      bgGradient: "from-amber-500/10 to-amber-600/5"
    },
    { 
      label: "Study Hours", 
      value: overview?.studyHours + "h", 
      icon: <FaClock />, 
      color: "bg-slate-800/50 border-rose-500/30",
      iconColor: "text-rose-400",
      change: "This week",
      bgGradient: "from-rose-500/10 to-rose-600/5"
    },
  ];

const quickActions = [
  {
    icon: <FaBookOpen />,
    title: "Browse Courses",
    description: "Explore available courses and enroll in new ones",
    color: "text-blue-400",
    to: "/courses",
    badge: "9 Courses"
  },
  {
    icon: <FaCalendarPlus />,
    title: "View Schedule",
    description: "Check your class timetable and upcoming events",
    color: "text-emerald-400",
    to: "/schedule"
  },
  {
    icon: <FaClipboardList />,
    title: "Assignments",
    description: "View pending assignments and submit work",
    color: "text-violet-400",
    badge: "6 Assignments",
    to: "/assignments"
  },
  {
    icon: <FaChartLine />,
    title: "Performance",
    description: "Track your academic progress and analytics",
    color: "text-amber-400",
    to: "/performance"
  },
];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Enhanced Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                  {user?.name?.charAt(0) || 'S'}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-800"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-100">
                  Welcome back, {user?.name || 'Student'}! 👋
                </h1>
                <p className="text-slate-400 text-sm flex items-center gap-2">
                  <FaCalendarAlt className="text-emerald-500" />
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
            
              
              <motion.button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-300 hover:text-rose-200 px-4 py-2 rounded-lg transition-all duration-300 font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaSignOutAlt />
                Logout
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence>
          {loading ? (
            <motion.div
              className="flex items-center justify-center h-64"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-slate-600 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-slate-400 text-lg">Loading your dashboard...</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Enhanced Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {overviewCards.map((card, i) => (
                  <motion.div
                    key={i}
                    className={`relative overflow-hidden ${card.color} border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${card.bgGradient}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.03, y: -3 }}
                  >
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`text-3xl ${card.iconColor}`}>{card.icon}</div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-slate-100">{card.value}</div>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-slate-300 mb-1">{card.label}</div>
                      <div className="text-xs text-slate-400">{card.change}</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </div>

                {/* Quick Actions and Study Streak Swapped */}
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Quick Actions on the left, takes 3 columns */}
                    <motion.div
                      className="lg:col-span-3 order-1 lg:order-1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h2 className="text-xl font-semibold text-slate-100 mb-6 flex items-center gap-3">
                        <FaPlayCircle className="text-emerald-500" />
                        Quick Actions
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {quickActions.map((action, index) => (
                          <QuickActionCard key={index} {...action} />
                        ))}
                      </div>
                    </motion.div>

                    {/* Study Streak on the right, takes 1 column */}
                    <motion.div
                      className="lg:col-span-1 order-2 lg:order-2 mt-14 h-full"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <StudyStreak streak={overview?.studyStreak || 0} />
                    </motion.div>
                  </div>

              {/* Main Dashboard Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Progress Tracker */}
                <motion.div
                  className="lg:col-span-2 bg-slate-800/30 backdrop-blur-sm border border-slate-700/40 rounded-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-3">
                    <FaChartBar className="text-emerald-500" />
                    Course Progress
                  </h2>
                  <div className="space-y-4">
                    {dashboardData.progress.map((item, index) => (
                      <ProgressBar key={index} item={item} delay={index * 0.2} />
                    ))}
                  </div>
                </motion.div>

                {/* Notifications */}
                <motion.div
                  className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/40 rounded-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h2 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-3">
                    <FaBell className="text-emerald-500" />
                    Notifications
                    <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-full">
                      {dashboardData.notifications.filter(n => n.unread).length}
                    </span>
                  </h2>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {dashboardData.notifications.map((notification, index) => (
                      <NotificationItem key={index} notification={notification} index={index} />
                    ))}
                  </div>
                </motion.div>

                {/* Upcoming Sessions */}
                <motion.div
                  className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/40 rounded-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h2 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-3">
                    <FaClock className="text-emerald-500" />
                    Upcoming Classes
                  </h2>
                  <div className="space-y-4">
                    {dashboardData.upcoming.map((session, index) => (
                      <motion.div
                        key={index}
                        className="p-4 bg-slate-700/30 rounded-lg border-l-4 border-emerald-500 hover:bg-slate-700/50 transition-all duration-300 group cursor-pointer"
                        whileHover={{ x: 3 }}
                      >
                        <p className="text-emerald-400 text-xs font-semibold mb-1">
                          {session.time}
                        </p>
                        <p className="text-slate-200 font-medium text-sm mb-1 group-hover:text-emerald-400 transition-colors duration-300">{session.title}</p>
                        <p className="text-slate-400 text-xs">{session.location}</p>
                      </motion.div>
                    ))}
                  </div>
                  <Link
                    to="/schedule"
                    className="text-sm text-emerald-400 mt-4 inline-flex items-center gap-2 hover:text-emerald-300 transition font-medium group"
                  >
                    View full schedule
                    <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                {/* Recent Activities */}
                <motion.div
                  className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/40 rounded-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <h2 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-3">
                    < FaClock className="text-emerald-500" />
                    Recent Activity
                  </h2>
                  <div className="space-y-3">
                    {dashboardData.recentActivities.map((activity, index) => (
                      <ActivityItem key={index} activity={activity} index={index} />
                    ))}
                  </div>
                </motion.div>

                {/* Achievements */}
                <motion.div
                  className="lg:col-span-1 bg-slate-800/30 backdrop-blur-sm border border-slate-700/40 rounded-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <h2 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-3">
                    <FaTrophy className="text-emerald-500" />
                    Achievements
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {dashboardData.achievements.map((achievement, index) => (
                      <AchievementBadge key={index} achievement={achievement} index={index} />
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;