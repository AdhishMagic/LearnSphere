export const analyticsData = {
    today: {
        overview: {
            dailyActiveUsers: { value: 845, trend: "up", change: 5.2 },
            monthlyActiveUsers: { value: 15847, trend: "up", change: 2.1 }, // Static for context
            newRegistrations: { value: 42, trend: "down", change: 1.5 },
            courseEngagement: { value: 78.5, trend: "up", change: 3.8 } // Percentage
        },
        usage: {
            avgSession: "24m",
            activeUsers: 845,
            inactiveUsers: 15002,
            courseAccess: [
                { label: "Morning", value: 35 },
                { label: "Afternoon", value: 45 },
                { label: "Evening", value: 20 }
            ]
        },
        growth: [
            { label: "6am", users: 120, courses: 5 },
            { label: "9am", users: 350, courses: 12 },
            { label: "12pm", users: 580, courses: 25 },
            { label: "3pm", users: 420, courses: 18 },
            { label: "6pm", users: 650, courses: 30 },
            { label: "9pm", users: 380, courses: 15 }
        ],
        activity: {
            learners: 85,
            instructors: 15
        }
    },
    week: {
        overview: {
            dailyActiveUsers: { value: 5845, trend: "up", change: 12.5 },
            monthlyActiveUsers: { value: 15847, trend: "up", change: 2.1 },
            newRegistrations: { value: 345, trend: "up", change: 8.4 },
            courseEngagement: { value: 82.3, trend: "up", change: 4.2 }
        },
        usage: {
            avgSession: "28m",
            activeUsers: 5845,
            inactiveUsers: 10002,
            courseAccess: [
                { label: "Mon", value: 65 },
                { label: "Tue", value: 72 },
                { label: "Wed", value: 68 },
                { label: "Thu", value: 75 },
                { label: "Fri", value: 80 },
                { label: "Sat", value: 45 },
                { label: "Sun", value: 40 }
            ]
        },
        growth: [
            { label: "Mon", users: 1200, courses: 45 },
            { label: "Tue", users: 1350, courses: 52 },
            { label: "Wed", users: 1280, courses: 48 },
            { label: "Thu", users: 1420, courses: 55 },
            { label: "Fri", users: 1550, courses: 60 },
            { label: "Sat", users: 980, courses: 35 },
            { label: "Sun", users: 850, courses: 30 }
        ],
        activity: {
            learners: 82,
            instructors: 18
        }
    },
    month: {
        overview: {
            dailyActiveUsers: { value: 12456, trend: "up", change: 15.2 },
            monthlyActiveUsers: { value: 15847, trend: "up", change: 5.8 },
            newRegistrations: { value: 1245, trend: "up", change: 10.5 },
            courseEngagement: { value: 76.8, trend: "down", change: 1.2 }
        },
        usage: {
            avgSession: "26m",
            activeUsers: 12456,
            inactiveUsers: 3391,
            courseAccess: [
                { label: "Week 1", value: 85 },
                { label: "Week 2", value: 88 },
                { label: "Week 3", value: 92 },
                { label: "Week 4", value: 80 }
            ]
        },
        growth: [
            { label: "Week 1", users: 3500, courses: 150 },
            { label: "Week 2", users: 3800, courses: 180 },
            { label: "Week 3", users: 4200, courses: 210 },
            { label: "Week 4", users: 4347, courses: 225 }
        ],
        activity: {
            learners: 88,
            instructors: 12
        }
    },
    year: {
        overview: {
            dailyActiveUsers: { value: 45230, trend: "up", change: 25.4 },
            monthlyActiveUsers: { value: 15847, trend: "up", change: 12.8 },
            newRegistrations: { value: 8560, trend: "up", change: 18.2 },
            courseEngagement: { value: 85.4, trend: "up", change: 6.5 }
        },
        usage: {
            avgSession: "32m",
            activeUsers: 45230,
            inactiveUsers: 1500,
            courseAccess: [
                { label: "Q1", value: 75 },
                { label: "Q2", value: 82 },
                { label: "Q3", value: 88 },
                { label: "Q4", value: 95 }
            ]
        },
        growth: [
            { label: "Jan", users: 8500, courses: 320 },
            { label: "Feb", users: 9200, courses: 350 },
            { label: "Mar", users: 10500, courses: 400 },
            { label: "Apr", users: 11200, courses: 450 },
            { label: "May", users: 12500, courses: 520 },
            { label: "Jun", users: 13800, courses: 580 },
            { label: "Jul", users: 14200, courses: 610 },
            { label: "Aug", users: 15500, courses: 650 },
            { label: "Sep", users: 16800, courses: 720 },
            { label: "Oct", users: 17500, courses: 780 },
            { label: "Nov", users: 18200, courses: 820 },
            { label: "Dec", users: 19500, courses: 890 }
        ],
        activity: {
            learners: 90,
            instructors: 10
        }
    }
};
