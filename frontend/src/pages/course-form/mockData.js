export const mockCourseData = {
    id: 1,
    title: "Complete React Developer Course 2024",
    subtitle: "Learn React from scratch with hands-on projects",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    description: "Master React.js by building real-world applications. This course covers everything from basics to advanced patterns.",
    instructor: "John Doe",
    website: "https://react-course.com",
    tags: ["React", "JavaScript", "Frontend"],
    requirements: [
        "Basic understanding of JavaScript",
        "HTML/CSS knowledge",
        "A computer with Node.js installed"
    ],
    outcomes: [
        "Build powerful React applications",
        "Understand Redux and Context API",
        "Master React Hooks"
    ],
    visibility: "everyone",
    access: "open",
    price: 0,
    isPublished: false,
    curriculum: [
        {
            id: 101,
            title: "Introduction to React",
            type: "video",
            duration: "10:00",
            content: "https://example.com/video1.mp4",
            isFree: true,
            description: "A brief history of React and why we use it."
        },
        {
            id: 102,
            title: "Setting up the Environment",
            type: "document",
            duration: "5:00",
            content: "Follow the setup guide attached.",
            description: "Step-by-step guide to installing Node.js and VS Code."
        },
        {
            id: 201,
            title: "React Basics Quiz",
            type: "quiz",
            description: "Test your knowledge of components and props.",
            questions: [
                {
                    id: 1,
                    text: "What is a Component?",
                    options: ["A function", "A database", "A server"],
                    correctAnswer: 0
                }
            ],
            rewards: {
                first: 100,
                second: 80,
                third: 50,
                fourth: 20
            }
        }
    ]
};
