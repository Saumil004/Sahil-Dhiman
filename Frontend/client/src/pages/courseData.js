const coursesData = [
  {
    id: "1",
    title: "Introduction to AI",
    short: "Learn the basics of AI and Machine Learning.",
    full: "This course covers the fundamentals of Artificial Intelligence, including ML algorithms, neural networks, and real-world AI applications.",
    status: "Ongoing",
    enrolled: true,
    link: "/courses/1",
    features: [
      "Intro to Machine Learning",
      "Basic Neural Networks",
      "AI Ethics Overview",
      "Hands-on projects using Python"
    ]
  },
  {
    id: "2",
    title: "Web Development",
    short: "Full stack web development from scratch.",
    full: "You will learn HTML, CSS, JavaScript, React, Node.js, and how to build full-stack web applications with modern tools.",
    status: "Ongoing",
    enrolled: true,
    link: "/courses/2",
    features: [
      "Responsive Web Design",
      "JavaScript + React Frontend",
      "Node.js + Express Backend",
      "MongoDB Integration"
    ]
  },
  {
    id: "3",
    title: "Data Structures",
    short: "Master common data structures for coding interviews.",
    full: "Learn how to effectively use arrays, linked lists, trees, graphs, stacks, and queues with real coding problems and visualizations.",
    status: "Completed",
    enrolled: true,
    link: "/courses/3",
    features: [
      "Array and Linked List Techniques",
      "Tree Traversals & Graph Theory",
      "Stacks, Queues, Hash Tables",
      "Time & Space Complexity Analysis"
    ]
  },
  {
    id: "4",
    title: "Cybersecurity Fundamentals",
    short: "Explore encryption, threats, and security protocols.",
    full: "This course introduces students to basic cybersecurity principles including encryption, authentication, firewalls, and digital forensics.",
    status: "Upcoming",
    enrolled: true,
    link: "/courses/4",
    features: [
      "Encryption & Decryption",
      "Types of Cyber Attacks",
      "Ethical Hacking Basics",
      "Security Tools & Frameworks"
    ]
  },
  {
    id: "5",
    title: "Cloud Computing",
    short: "Understand and use modern cloud platforms.",
    full: "Explore key concepts of cloud infrastructure, services (IaaS, PaaS, SaaS), and use AWS, Azure, and Google Cloud tools.",
    status: "Available",
    enrolled: false,
    price: 599,
    link: "/courses/5",
    features: [
      "AWS EC2, S3, Lambda",
      "Azure Functions & Pipelines",
      "Google Cloud Overview",
      "Deployment & Scalability"
    ]
  },
  {
    id: "6",
    title: "Operating Systems",
    short: "Understand memory, processes, and file systems.",
    full: "Dive into how operating systems work including process scheduling, memory management, file systems, and multitasking.",
    status: "Available",
    enrolled: false,
    price: 549,
    link: "/courses/6",
    features: [
      "Memory Management",
      "File Systems",
      "Process Scheduling",
      "Concurrency & Deadlocks"
    ]
  },
  {
    id: "7",
    title: "Mobile App Development",
    short: "Build native iOS and Android apps with React Native.",
    full: "Learn to create cross-platform mobile applications using React Native, covering navigation, state management, and native device features.",
    status: "Available",
    enrolled: false,
    price: 699,
    link: "/courses/7",
    features: [
      "React Native Fundamentals",
      "Navigation & Routing",
      "State Management with Redux",
      "Native Device Integration"
    ]
  },
  {
    id: "8",
    title: "Advanced JavaScript",
    short: "Master modern JavaScript and ES6+ features.",
    full: "Deep dive into advanced JavaScript concepts including closures, prototypes, async programming, and modern ES6+ features for professional development.",
    status: "Available",
    enrolled: false,
    price: 449,
    link: "/courses/8",
    features: [
      "ES6+ Features & Syntax",
      "Async/Await & Promises",
      "Closures & Prototypes",
      "Module Systems & Bundling"
    ]
  }
];

// Course enrollment management functions
const ENROLLMENT_STORAGE_KEY = 'courseEnrollments';

// Get current enrollments from localStorage
const getEnrollments = () => {
  try {
    const stored = localStorage.getItem(ENROLLMENT_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error reading enrollments:', error);
    return {};
  }
};

// Save enrollments to localStorage
const saveEnrollments = (enrollments) => {
  try {
    localStorage.setItem(ENROLLMENT_STORAGE_KEY, JSON.stringify(enrollments));
  } catch (error) {
    console.error('Error saving enrollments:', error);
  }
};

// Enroll in a course
export const enrollInCourse = (courseId) => {
  const enrollments = getEnrollments();
  enrollments[courseId] = {
    enrolled: true,
    enrolledAt: new Date().toISOString(),
    status: 'Ongoing' // New enrollments start as ongoing
  };
  saveEnrollments(enrollments);
};

// Check if user is enrolled in a course
export const isEnrolledInCourse = (courseId) => {
  const enrollments = getEnrollments();
  return enrollments[courseId]?.enrolled || false;
};

// Get course with current enrollment status
export const getCourseWithEnrollmentStatus = (course) => {
  const enrollments = getEnrollments();
  const enrollment = enrollments[course.id];
  
  if (enrollment?.enrolled) {
    return {
      ...course,
      enrolled: true,
      status: enrollment.status || course.status
    };
  }
  
  return course;
};

// Get all courses with current enrollment status
export const getCoursesWithEnrollmentStatus = () => {
  return coursesData.map(getCourseWithEnrollmentStatus);
};

// Export courses (with enrollment status applied)
export const courses = getCoursesWithEnrollmentStatus();