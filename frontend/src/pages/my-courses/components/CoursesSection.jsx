import React from 'react';
import CourseCard from './CourseCard';
import EmptyState from './EmptyState';

const CoursesSection = ({ courses, learner }) => {
    if (!courses || courses.length === 0) {
        return <EmptyState />;
    }

    return (
        <div>
            {/* Course count */}
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">
                    Showing <span className="font-semibold text-gray-700">{courses.length}</span> course{courses.length !== 1 ? 's' : ''}
                </p>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        learner={learner}
                    />
                ))}
            </div>
        </div>
    );
};

export default CoursesSection;
