// Mock data for My Courses Page (Learner Dashboard)
// Simulates learner profile and their course enrollments

// Mock learner profile
export const mockLearner = {
    id: 1,
    name: "Alex Thompson",
    email: "alex.thompson@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop",
    points: 45,
    isLoggedIn: true
};

// Badge levels configuration (from PDF)
export const badgeLevels = [
    { name: "Newbie", minPoints: 0, maxPoints: 19, color: "#94A3B8", icon: "🌱" },
    { name: "Explorer", minPoints: 20, maxPoints: 39, color: "#22C55E", icon: "🔍" },
    { name: "Achiever", minPoints: 40, maxPoints: 59, color: "#3B82F6", icon: "⭐" },
    { name: "Specialist", minPoints: 60, maxPoints: 79, color: "#8B5CF6", icon: "🎯" },
    { name: "Expert", minPoints: 80, maxPoints: 99, color: "#F59E0B", icon: "🏆" },
    { name: "Master", minPoints: 100, maxPoints: Infinity, color: "#EF4444", icon: "👑" }
];

// Mock courses with learner-specific state
export const mockCourses = [
    {
        id: 1,
        title: "Complete Web Development Bootcamp",
        description: "Learn HTML, CSS, JavaScript, React, Node.js and more. Build real-world projects from scratch.",
        coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
        tags: ["React", "JavaScript", "Node.js"],
        price: 0,
        isPurchased: true,
        isEnrolled: true,
        progress: 35,
        status: "in-progress"
    },
    {
        id: 2,
        title: "UI/UX Design Masterclass",
        description: "Master Figma, Adobe XD, and design principles. Create beautiful, user-friendly interfaces.",
        coverImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop",
        tags: ["Design", "Figma", "UI/UX"],
        price: 0,
        isPurchased: true,
        isEnrolled: true,
        progress: 72,
        status: "in-progress"
    },
    {
        id: 3,
        title: "Python for Data Science",
        description: "Learn Python programming with a focus on data analysis, visualization, and machine learning.",
        coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop",
        tags: ["Python", "Data Science", "ML"],
        price: 0,
        isPurchased: true,
        isEnrolled: true,
        progress: 0,
        status: "not-started"
    },
    {
        id: 4,
        title: "Advanced React Patterns",
        description: "Master advanced React concepts including hooks, context, performance optimization, and testing.",
        coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
        tags: ["React", "Advanced", "Hooks"],
        price: 49.99,
        isPurchased: false,
        isEnrolled: false,
        progress: 0,
        status: "not-started"
    },
    {
        id: 5,
        title: "Cloud Computing with AWS",
        description: "Learn to build, deploy, and manage applications on Amazon Web Services cloud platform.",
        coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop",
        tags: ["AWS", "Cloud", "DevOps"],
        price: 79.99,
        isPurchased: false,
        isEnrolled: false,
        progress: 0,
        status: "not-started"
    },
    {
        id: 6,
        title: "Digital Marketing Essentials",
        description: "Master SEO, social media, content marketing, and analytics to grow any business online.",
        coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
        tags: ["Marketing", "SEO", "Social Media"],
        price: 0,
        isPurchased: true,
        isEnrolled: true,
        progress: 100,
        status: "completed"
    }
];

// Helper: Get badge level based on points
export const getBadgeLevel = (points) => {
    return badgeLevels.find(badge =>
        points >= badge.minPoints && points <= badge.maxPoints
    ) || badgeLevels[0];
};

// Helper: Get next badge info
export const getNextBadge = (points) => {
    const currentBadge = getBadgeLevel(points);
    const currentIndex = badgeLevels.indexOf(currentBadge);

    if (currentIndex >= badgeLevels.length - 1) {
        return null; // Already at highest level
    }

    return badgeLevels[currentIndex + 1];
};

// Helper: Calculate progress to next badge
export const getBadgeProgress = (points) => {
    const currentBadge = getBadgeLevel(points);
    const nextBadge = getNextBadge(points);

    if (!nextBadge) {
        return 100; // Max level reached
    }

    const progressInLevel = points - currentBadge.minPoints;
    const levelRange = nextBadge.minPoints - currentBadge.minPoints;

    return Math.round((progressInLevel / levelRange) * 100);
};

// Helper: Filter courses by search query
export const filterCoursesBySearch = (courses, query) => {
    if (!query.trim()) return courses;

    const lowerQuery = query.toLowerCase();
    return courses.filter(course =>
        course.title.toLowerCase().includes(lowerQuery) ||
        course.description.toLowerCase().includes(lowerQuery) ||
        course.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
};
