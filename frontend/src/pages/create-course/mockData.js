export const createCourseMock = (courseName) => ({
    id: Date.now(),
    title: courseName,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    status: "Draft",
    views: 0,
    lessonsCount: 0,
    duration: "0m",
    tags: ["New"],
    lastUpdated: new Date().toISOString().split('T')[0],
});
