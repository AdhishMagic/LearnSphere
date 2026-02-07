import React from 'react';
import CourseActionButton from './CourseActionButton';

const CourseCard = ({ course, learner }) => {
    // Status badge configuration
    const getStatusBadge = () => {
        if (course.status === "completed") {
            return { text: "Completed", bg: "bg-green-100", color: "text-green-700" };
        }
        if (course.status === "in-progress") {
            return { text: "In Progress", bg: "bg-blue-100", color: "text-blue-700" };
        }
        if (course.price > 0 && !course.isPurchased) {
            return { text: `$${course.price}`, bg: "bg-amber-100", color: "text-amber-700" };
        }
        if (course.price === 0) {
            return { text: "Free", bg: "bg-purple-100", color: "text-purple-700" };
        }
        return null;
    };

    const statusBadge = getStatusBadge();

    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
            {/* Course Cover Image */}
            <div className="relative h-44 bg-gray-200 overflow-hidden">
                <img
                    src={course.coverImage}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Status Badge */}
                {statusBadge && (
                    <div className={`absolute top-3 right-3 ${statusBadge.bg} ${statusBadge.color} text-xs font-semibold px-2.5 py-1 rounded-full`}>
                        {statusBadge.text}
                    </div>
                )}

                {/* Progress Overlay for in-progress courses */}
                {course.status === "in-progress" && course.progress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                        <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-green-400 rounded-full transition-all duration-500"
                                    style={{ width: `${course.progress}%` }}
                                />
                            </div>
                            <span className="text-white text-xs font-medium">
                                {course.progress}%
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Course Content */}
            <div className="p-5">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {course.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {course.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {course.tags.slice(0, 3).map((tag, index) => (
                        <span
                            key={index}
                            className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-md"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Action Button */}
                <CourseActionButton course={course} learner={learner} />
            </div>
        </div>
    );
};

export default CourseCard;
