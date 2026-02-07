export const MOCK_INSTRUCTORS = [
    { id: 'inst_1', name: 'Sarah Drasner', value: 'inst_1', label: 'Sarah Drasner' },
    { id: 'inst_2', name: 'Kent C. Dodds', value: 'inst_2', label: 'Kent C. Dodds' },
    { id: 'inst_3', name: 'Dan Abramov', value: 'inst_3', label: 'Dan Abramov' },
    { id: 'inst_4', name: 'Cassidy Williams', value: 'inst_4', label: 'Cassidy Williams' },
    { id: 'inst_5', name: 'Guillermo Rauch', value: 'inst_5', label: 'Guillermo Rauch' },
];

export const MOCK_COURSES = [
    {
        id: 1,
        title: "Advanced React Patterns",
        instructorId: 'inst_1',
        instructorName: "Sarah Drasner",
        tags: ["React", "Frontend", "Advanced"],
        views: 1205,
        lessons: 12,
        duration: "4h 30m",
        status: "published",
        publishedAt: "2023-11-15T10:00:00Z"
    },
    {
        id: 2,
        title: "Testing JavaScript Applications",
        instructorId: 'inst_2',
        instructorName: "Kent C. Dodds",
        tags: ["Testing", "JavaScript", "Quality"],
        views: 890,
        lessons: 24,
        duration: "6h 15m",
        status: "published",
        publishedAt: "2023-10-20T14:30:00Z"
    },
    {
        id: 3,
        title: "CSS layout for the modern web",
        instructorId: 'inst_3',
        instructorName: "Dan Abramov",
        tags: ["CSS", "Design", "Layout"],
        views: 450,
        lessons: 8,
        duration: "2h 45m",
        status: "unpublished",
        publishedAt: null
    },
    {
        id: 4,
        title: "Next.js: The Complete Guide",
        instructorId: 'inst_5',
        instructorName: "Guillermo Rauch",
        tags: ["Next.js", "React", "SSR"],
        views: 3200,
        lessons: 35,
        duration: "12h 00m",
        status: "published",
        publishedAt: "2023-09-05T09:15:00Z"
    },
    {
        id: 5,
        title: "Generative Art with Code",
        instructorId: 'inst_4',
        instructorName: "Cassidy Williams",
        tags: ["Creative", "Canvas", "Art"],
        views: 120,
        lessons: 15,
        duration: "3h 20m",
        status: "draft",
        publishedAt: null
    },
    {
        id: 6,
        title: "State Management in 2024",
        instructorId: 'inst_3',
        instructorName: "Dan Abramov",
        tags: ["Redux", "Context", "State"],
        views: 670,
        lessons: 10,
        duration: "2h 50m",
        status: "published",
        publishedAt: "2024-01-10T11:00:00Z"
    }
];
