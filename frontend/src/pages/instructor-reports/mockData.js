// Mock data for Instructor Reporting Dashboard
// Simulates courses owned by the logged-in instructor and learner enrollments

export const instructorCourses = [
  { id: 1, name: "Introduction to Web Development" },
  { id: 2, name: "Advanced React Patterns" },
  { id: 3, name: "JavaScript Fundamentals" },
  { id: 4, name: "Full-Stack Development Bootcamp" }
];

export const reportingData = [
  // Introduction to Web Development
  {
    id: 1,
    courseId: 1,
    courseName: "Introduction to Web Development",
    learnerName: "Alice Johnson",
    enrolledDate: "2026-01-10",
    startDate: "2026-01-12",
    timeSpent: 24.5,
    completionPercentage: 100,
    status: "Completed"
  },
  {
    id: 2,
    courseId: 1,
    courseName: "Introduction to Web Development",
    learnerName: "Bob Smith",
    enrolledDate: "2026-01-15",
    startDate: "2026-01-16",
    timeSpent: 18.0,
    completionPercentage: 75,
    status: "In Progress"
  },
  {
    id: 3,
    courseId: 1,
    courseName: "Introduction to Web Development",
    learnerName: "Carol Davis",
    enrolledDate: "2026-02-01",
    startDate: null,
    timeSpent: 0,
    completionPercentage: 0,
    status: "Yet to Start"
  },
  {
    id: 4,
    courseId: 1,
    courseName: "Introduction to Web Development",
    learnerName: "David Wilson",
    enrolledDate: "2026-01-20",
    startDate: "2026-01-22",
    timeSpent: 12.0,
    completionPercentage: 50,
    status: "In Progress"
  },
  
  // Advanced React Patterns
  {
    id: 5,
    courseId: 2,
    courseName: "Advanced React Patterns",
    learnerName: "Eva Martinez",
    enrolledDate: "2026-01-05",
    startDate: "2026-01-07",
    timeSpent: 32.0,
    completionPercentage: 100,
    status: "Completed"
  },
  {
    id: 6,
    courseId: 2,
    courseName: "Advanced React Patterns",
    learnerName: "Frank Brown",
    enrolledDate: "2026-01-18",
    startDate: null,
    timeSpent: 0,
    completionPercentage: 0,
    status: "Yet to Start"
  },
  {
    id: 7,
    courseId: 2,
    courseName: "Advanced React Patterns",
    learnerName: "Grace Lee",
    enrolledDate: "2026-01-12",
    startDate: "2026-01-14",
    timeSpent: 28.5,
    completionPercentage: 90,
    status: "In Progress"
  },
  
  // JavaScript Fundamentals
  {
    id: 8,
    courseId: 3,
    courseName: "JavaScript Fundamentals",
    learnerName: "Henry Taylor",
    enrolledDate: "2026-01-08",
    startDate: "2026-01-10",
    timeSpent: 20.0,
    completionPercentage: 100,
    status: "Completed"
  },
  {
    id: 9,
    courseId: 3,
    courseName: "JavaScript Fundamentals",
    learnerName: "Iris Chen",
    enrolledDate: "2026-01-25",
    startDate: "2026-01-27",
    timeSpent: 8.5,
    completionPercentage: 35,
    status: "In Progress"
  },
  {
    id: 10,
    courseId: 3,
    courseName: "JavaScript Fundamentals",
    learnerName: "Jack Anderson",
    enrolledDate: "2026-02-03",
    startDate: null,
    timeSpent: 0,
    completionPercentage: 0,
    status: "Yet to Start"
  },
  {
    id: 11,
    courseId: 3,
    courseName: "JavaScript Fundamentals",
    learnerName: "Karen White",
    enrolledDate: "2026-01-14",
    startDate: "2026-01-16",
    timeSpent: 15.0,
    completionPercentage: 100,
    status: "Completed"
  },
  
  // Full-Stack Development Bootcamp
  {
    id: 12,
    courseId: 4,
    courseName: "Full-Stack Development Bootcamp",
    learnerName: "Liam Garcia",
    enrolledDate: "2026-01-22",
    startDate: "2026-01-24",
    timeSpent: 45.0,
    completionPercentage: 65,
    status: "In Progress"
  },
  {
    id: 13,
    courseId: 4,
    courseName: "Full-Stack Development Bootcamp",
    learnerName: "Maya Patel",
    enrolledDate: "2026-02-05",
    startDate: null,
    timeSpent: 0,
    completionPercentage: 0,
    status: "Yet to Start"
  },
  {
    id: 14,
    courseId: 4,
    courseName: "Full-Stack Development Bootcamp",
    learnerName: "Noah Kim",
    enrolledDate: "2026-01-28",
    startDate: "2026-01-30",
    timeSpent: 38.5,
    completionPercentage: 55,
    status: "In Progress"
  },
  {
    id: 15,
    courseId: 4,
    courseName: "Full-Stack Development Bootcamp",
    learnerName: "Olivia Rodriguez",
    enrolledDate: "2026-02-01",
    startDate: "2026-02-02",
    timeSpent: 12.0,
    completionPercentage: 20,
    status: "In Progress"
  }
];

// Helper to compute summary statistics
export const computeSummaryStats = (data) => {
  return {
    totalParticipants: data.length,
    yetToStart: data.filter(r => r.status === "Yet to Start").length,
    inProgress: data.filter(r => r.status === "In Progress").length,
    completed: data.filter(r => r.status === "Completed").length
  };
};
