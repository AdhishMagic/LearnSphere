export const initialSettings = {
    general: {
        platformName: "LearnSphere eLearning",
        maintenanceMode: false,
        defaultLanguage: "English (US)",
    },
    accessControl: {
        guestCourseVisibility: true,
        publicRegistration: true,
        requireEmailVerification: false,
    },
    course: {
        defaultVisibility: "signed_in", // 'everyone' or 'signed_in'
        defaultAccessRule: "invitation", // 'open', 'invitation', or 'payment'
    },
    gamification: {
        enablePoints: true,
        enableBadges: true,
        badgeThresholds: [
            { level: "Bronze", points: 100 },
            { level: "Silver", points: 500 },
            { level: "Gold", points: 1000 },
        ],
    },
    systemStatus: {
        status: "Active",
        lastUpdated: "2026-02-07T10:30:00Z",
    },
};
