import React from 'react';

const CourseActionButton = ({ course, learner, onClick }) => {
    // Determine button configuration based on learner and course state
    const getActionConfig = () => {
        // Guest user
        if (!learner.isLoggedIn) {
            return {
                text: "Join Course",
                action: "join",
                variant: "outline",
                icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                )
            };
        }

        // Paid course not purchased
        if (course.price > 0 && !course.isPurchased) {
            return {
                text: `Buy - $${course.price}`,
                action: "buy",
                variant: "primary",
                icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                )
            };
        }

        // Course completed
        if (course.status === "completed") {
            return {
                text: "Review",
                action: "review",
                variant: "secondary",
                icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )
            };
        }

        // In progress
        if (course.status === "in-progress") {
            return {
                text: "Continue",
                action: "continue",
                variant: "success",
                icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )
            };
        }

        // Not started
        return {
            text: "Start",
            action: "start",
            variant: "primary",
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        };
    };

    const config = getActionConfig();

    // Variant styles
    const variantStyles = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white",
        success: "bg-green-600 hover:bg-green-700 text-white",
        secondary: "bg-gray-600 hover:bg-gray-700 text-white",
        outline: "bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
    };

    const handleClick = (e) => {
        e.stopPropagation();

        // Log action to console
        switch (config.action) {
            case "start":
                console.log(`[Start] Starting course: ${course.id} - ${course.title}`);
                break;
            case "continue":
                console.log(`[Continue] Resuming course: ${course.id} - ${course.title}`);
                break;
            case "buy":
                console.log(`[Buy] Purchasing course: ${course.id} - $${course.price}`);
                break;
            case "join":
                console.log(`[Join] Redirecting to login/register`);
                break;
            case "review":
                console.log(`[Review] Opening completed course: ${course.id} - ${course.title}`);
                break;
            default:
                console.log(`[Action] ${config.action} on course: ${course.id}`);
        }

        if (onClick) {
            onClick(config.action, course);
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`w-full flex items-center justify-center gap-2 font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 ${variantStyles[config.variant]}`}
        >
            {config.icon}
            {config.text}
        </button>
    );
};

export default CourseActionButton;
