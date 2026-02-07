import React from 'react';
import CourseRow from './CourseRow';

const CourseList = ({ courses }) => {
    if (!courses || courses.length === 0) {
        return (
            <div className="text-center py-20 bg-muted/10 rounded-xl border border-dashed">
                <p className="text-muted-foreground">No courses found matching your criteria.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <div className="hidden md:flex px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-muted/30 rounded-lg">
                <div className="flex-1">Course Info</div>
                <div className="flex-[0.5] text-center">Status</div>
                <div className="flex-1 flex justify-between px-8">
                    <span>Views</span>
                    <span>Lessons</span>
                    <span>Duration</span>
                </div>
                <div className="w-10"></div>
            </div>
            <div className="space-y-3">
                {courses.map((course) => (
                    <CourseRow key={course.id} course={course} />
                ))}
            </div>
        </div>
    );
};

export default CourseList;
