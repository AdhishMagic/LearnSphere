import React from 'react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
    const navigate = useNavigate();

    const handleViewCourse = () => {
        console.log(`Navigating to course detail: ${course.id} - ${course.title}`);
        // Navigate to Course Detail Page
        navigate(`/course/${course.id}`, {
            state: {
                from: '/courses',
                courseMeta: course
            }
        });
    };

    return (
        <div
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
            onClick={handleViewCourse}
        >
            {/* Course Cover Image */}
            <div className="relative h-48 bg-gray-200 overflow-hidden">
                <img
                    src={course.coverImage}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Published Badge */}
                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    Published
                </div>
            </div>

            {/* Course Content */}
            <div className="p-5">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {course.description}
                </p>

                {/* Instructor */}
                <p className="text-xs text-gray-500 mb-3">
                    by <span className="font-medium">{course.instructor}</span>
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {course.tags.slice(0, 3).map((tag, index) => (
                        <span
                            key={index}
                            className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                    {course.tags.length > 3 && (
                        <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">
                            +{course.tags.length - 3} more
                        </span>
                    )}
                </div>

                {/* CTA Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleViewCourse();
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
                >
                    View Course
                </button>
            </div>
        </div>
    );
};

export default CourseCard;
