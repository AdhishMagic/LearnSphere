// Mock data for Courses Listing Page
// Simulates published courses visible to guests and learners

// Mock user state - simulate logged in or guest
export const mockUser = {
    isLoggedIn: true, // Toggle this to test visibility rules: true = logged-in learner, false = guest
};

// Published courses with visibility settings
export const courses = [
    {
        id: 1,
        title: "Introduction to Web Development",
        description: "Learn the fundamentals of HTML, CSS, and JavaScript to build modern websites from scratch.",
        coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
        tags: ["Web Development", "HTML", "CSS", "JavaScript"],
        published: true,
        visibility: "Everyone", // Visible to all
        instructor: "Sarah Johnson"
    },
    {
        id: 2,
        title: "Advanced React Patterns",
        description: "Master advanced React concepts including hooks, context, custom hooks, and performance optimization techniques.",
        coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
        tags: ["React", "JavaScript", "Web Development"],
        published: true,
        visibility: "Everyone",
        instructor: "Michael Chen"
    },
    {
        id: 3,
        title: "UI/UX Design Fundamentals",
        description: "Discover the principles of user interface design and create beautiful, user-friendly digital experiences.",
        coverImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop",
        tags: ["Design", "UI/UX", "Figma"],
        published: true,
        visibility: "Signed In", // Only visible to logged-in users
        instructor: "Emma Davis"
    },
    {
        id: 4,
        title: "Python for Data Science",
        description: "Learn Python programming with a focus on data analysis, visualization, and machine learning basics.",
        coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop",
        tags: ["Python", "Data Science", "Machine Learning"],
        published: true,
        visibility: "Everyone",
        instructor: "David Martinez"
    },
    {
        id: 5,
        title: "Full-Stack Development Bootcamp",
        description: "Become a full-stack developer by mastering both frontend and backend technologies in this comprehensive bootcamp.",
        coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop",
        tags: ["Web Development", "Full-Stack", "Node.js", "React"],
        published: true,
        visibility: "Everyone",
        instructor: "Jennifer Lee"
    },
    {
        id: 6,
        title: "Mobile App Development with React Native",
        description: "Build cross-platform mobile applications using React Native and JavaScript.",
        coverImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop",
        tags: ["React Native", "Mobile Development", "JavaScript"],
        published: true,
        visibility: "Signed In",
        instructor: "Alex Thompson"
    },
    {
        id: 7,
        title: "Digital Marketing Essentials",
        description: "Master the fundamentals of digital marketing including SEO, social media, and content marketing strategies.",
        coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
        tags: ["Marketing", "SEO", "Social Media"],
        published: true,
        visibility: "Everyone",
        instructor: "Lisa Anderson"
    },
    {
        id: 8,
        title: "JavaScript Fundamentals",
        description: "Build a solid foundation in JavaScript, the programming language of the web.",
        coverImage: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&auto=format&fit=crop",
        tags: ["JavaScript", "Web Development", "Programming"],
        published: true,
        visibility: "Everyone",
        instructor: "Robert Kim"
    },
    {
        id: 9,
        title: "Cloud Computing with AWS",
        description: "Learn to build, deploy, and manage applications on Amazon Web Services cloud platform.",
        coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop",
        tags: ["Cloud Computing", "AWS", "DevOps"],
        published: true,
        visibility: "Signed In",
        instructor: "Chris Wilson"
    }
];

// Helper function to get all unique tags
export const getAllTags = () => {
    const tagsSet = new Set();
    courses.forEach(course => {
        course.tags.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
};

// Helper function to filter courses based on visibility rules
export const getVisibleCourses = (isLoggedIn) => {
    return courses.filter(course => {
        if (!course.published) return false;
        if (course.visibility === "Everyone") return true;
        if (course.visibility === "Signed In" && isLoggedIn) return true;
        return false;
    });
};
