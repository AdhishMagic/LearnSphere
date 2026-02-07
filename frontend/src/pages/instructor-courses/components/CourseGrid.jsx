import React from 'react';
import CourseCard from './CourseCard';

const CourseGrid = ({ courses }) => {
    if (!courses || courses.length === 0) {
        return (
            <div className="text-center py-20 bg-muted/10 rounded-xl border border-dashed">
                <p className="text-muted-foreground">No courses found matching your criteria.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    );
};

export default CourseGrid;
