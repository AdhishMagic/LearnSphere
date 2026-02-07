// Mock data for Course Learning Flow (Modules B3-B7)
// Contains course, lessons, quizzes, and reviews data

// Current learner state
export const mockLearner = {
    id: 1,
    name: "Alex Thompson",
    points: 45,
    isLoggedIn: true
};

// Course data with lessons
export const mockCourse = {
    id: 1,
    title: "Complete Web Development Bootcamp",
    description: "Master modern web development from scratch. Learn HTML5, CSS3, JavaScript ES6+, React, Node.js, and MongoDB. Build 15+ real-world projects including e-commerce sites, social networks, and web applications. This comprehensive bootcamp takes you from absolute beginner to job-ready developer with hands-on practice and industry best practices.",
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop",
    instructor: "Sarah Johnson",
    totalLessons: 8,
    completedLessons: 3,
    progress: 37,
    rating: 4.8,
    reviewCount: 1247,
    duration: "42 hours",
    lessons: [
        {
            id: 1,
            title: "Introduction to Web Development",
            type: "video",
            duration: "12 min",
            status: "completed",
            description: "Welcome to the course! In this lesson, we'll cover what web development is, the different types of web developers, and set up your development environment.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            attachments: [
                { id: 1, name: "Course Outline.pdf", type: "pdf", size: "245 KB" },
                { id: 2, name: "Setup Guide.pdf", type: "pdf", size: "128 KB" }
            ]
        },
        {
            id: 2,
            title: "HTML Fundamentals",
            type: "video",
            duration: "25 min",
            status: "completed",
            description: "Learn the building blocks of the web. We'll cover HTML syntax, semantic elements, forms, tables, and best practices for structuring your web pages.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            attachments: [
                { id: 3, name: "HTML Cheatsheet.pdf", type: "pdf", size: "156 KB" }
            ]
        },
        {
            id: 3,
            title: "CSS Styling Basics",
            type: "video",
            duration: "30 min",
            status: "completed",
            description: "Make your websites beautiful! Learn CSS selectors, the box model, flexbox, grid, and responsive design principles.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            attachments: []
        },
        {
            id: 4,
            title: "HTML & CSS Quiz",
            type: "quiz",
            duration: "10 min",
            status: "not-started",
            description: "Test your knowledge of HTML and CSS fundamentals before moving on to JavaScript.",
            quiz: {
                id: 1,
                title: "HTML & CSS Fundamentals",
                pointsReward: 15,
                questions: [
                    {
                        id: 1,
                        question: "What does HTML stand for?",
                        options: [
                            "Hyper Text Markup Language",
                            "High Tech Modern Language",
                            "Hyper Transfer Markup Language",
                            "Home Tool Markup Language"
                        ],
                        correctAnswer: 0
                    },
                    {
                        id: 2,
                        question: "Which CSS property is used to change the text color?",
                        options: [
                            "text-color",
                            "font-color",
                            "color",
                            "foreground-color"
                        ],
                        correctAnswer: 2
                    },
                    {
                        id: 3,
                        question: "What is the correct HTML element for the largest heading?",
                        options: [
                            "<heading>",
                            "<h6>",
                            "<head>",
                            "<h1>"
                        ],
                        correctAnswer: 3
                    },
                    {
                        id: 4,
                        question: "Which CSS property controls the space between elements?",
                        options: [
                            "spacing",
                            "margin",
                            "padding",
                            "Both margin and padding"
                        ],
                        correctAnswer: 3
                    },
                    {
                        id: 5,
                        question: "How do you make a bulleted list in HTML?",
                        options: [
                            "<list>",
                            "<ul>",
                            "<ol>",
                            "<dl>"
                        ],
                        correctAnswer: 1
                    }
                ]
            }
        },
        {
            id: 5,
            title: "JavaScript Basics",
            type: "video",
            duration: "45 min",
            status: "not-started",
            description: "Enter the world of programming! Learn JavaScript variables, data types, functions, loops, and DOM manipulation.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            attachments: [
                { id: 4, name: "JavaScript Reference.pdf", type: "pdf", size: "312 KB" }
            ]
        },
        {
            id: 6,
            title: "Project: Portfolio Website",
            type: "document",
            duration: "60 min",
            status: "not-started",
            description: "Put your skills to practice! Follow this step-by-step guide to build your first portfolio website using HTML, CSS, and JavaScript.",
            documentUrl: "/documents/portfolio-guide.pdf",
            attachments: [
                { id: 5, name: "Starter Files.zip", type: "zip", size: "1.2 MB" },
                { id: 6, name: "Design Mockup.png", type: "image", size: "856 KB" }
            ]
        },
        {
            id: 7,
            title: "Responsive Design Infographic",
            type: "image",
            duration: "5 min",
            status: "not-started",
            description: "A visual guide to responsive web design principles, breakpoints, and mobile-first development.",
            imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop",
            attachments: []
        },
        {
            id: 8,
            title: "JavaScript Quiz",
            type: "quiz",
            duration: "15 min",
            status: "not-started",
            description: "Test your JavaScript knowledge before moving to advanced topics.",
            quiz: {
                id: 2,
                title: "JavaScript Fundamentals",
                pointsReward: 20,
                questions: [
                    {
                        id: 1,
                        question: "Which keyword is used to declare a variable in JavaScript (ES6)?",
                        options: [
                            "var",
                            "let",
                            "const",
                            "Both let and const"
                        ],
                        correctAnswer: 3
                    },
                    {
                        id: 2,
                        question: "What will console.log(typeof []) output?",
                        options: [
                            "array",
                            "object",
                            "undefined",
                            "null"
                        ],
                        correctAnswer: 1
                    },
                    {
                        id: 3,
                        question: "Which method adds an element to the end of an array?",
                        options: [
                            "push()",
                            "pop()",
                            "shift()",
                            "unshift()"
                        ],
                        correctAnswer: 0
                    }
                ]
            }
        }
    ]
};

// Reviews data
export const mockReviews = [
    {
        id: 1,
        userId: 101,
        userName: "Michael Chen",
        userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop",
        rating: 5,
        text: "This course is absolutely fantastic! Sarah explains everything so clearly and the projects are really practical. I went from knowing nothing about web development to building my own apps in just a few weeks.",
        date: "2026-01-15"
    },
    {
        id: 2,
        userId: 102,
        userName: "Emma Rodriguez",
        userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop",
        rating: 5,
        text: "Best investment I've made in my career. The curriculum is well-structured and up-to-date with modern practices. Highly recommend for anyone wanting to break into tech!",
        date: "2026-01-10"
    },
    {
        id: 3,
        userId: 103,
        userName: "David Kim",
        userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop",
        rating: 4,
        text: "Great content overall. Some sections could go a bit deeper, but for beginners, this is perfect. The quizzes really help reinforce the learning.",
        date: "2026-01-05"
    },
    {
        id: 4,
        userId: 104,
        userName: "Lisa Anderson",
        userAvatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&auto=format&fit=crop",
        rating: 5,
        text: "I've tried other courses before but this one really clicked for me. The hands-on projects make such a difference. Already recommended to my friends!",
        date: "2025-12-28"
    }
];

// Helper: Get lesson by ID
export const getLessonById = (lessonId) => {
    return mockCourse.lessons.find(l => l.id === lessonId);
};

// Helper: Get next lesson
export const getNextLesson = (currentLessonId) => {
    const currentIndex = mockCourse.lessons.findIndex(l => l.id === currentLessonId);
    if (currentIndex < mockCourse.lessons.length - 1) {
        return mockCourse.lessons[currentIndex + 1];
    }
    return null;
};

// Helper: Get previous lesson
export const getPreviousLesson = (currentLessonId) => {
    const currentIndex = mockCourse.lessons.findIndex(l => l.id === currentLessonId);
    if (currentIndex > 0) {
        return mockCourse.lessons[currentIndex - 1];
    }
    return null;
};

// Helper: Calculate average rating
export const getAverageRating = () => {
    if (mockReviews.length === 0) return 0;
    const sum = mockReviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / mockReviews.length).toFixed(1);
};

// Helper: Check if all lessons completed
export const isAllLessonsCompleted = (lessons) => {
    return lessons.every(l => l.status === 'completed');
};

// Helper: Filter lessons by search
export const filterLessonsBySearch = (lessons, query) => {
    if (!query.trim()) return lessons;
    const lowerQuery = query.toLowerCase();
    return lessons.filter(l => l.title.toLowerCase().includes(lowerQuery));
};
