import React from 'react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
    const navigate = useNavigate();

    const handleViewCourse = () => {
        console.log(`Navigating to course detail: ${course.id} - ${course.title}`);
        navigate(`/course/${course.id}`, {
            state: {
                from: '/courses',
                courseMeta: course
            }
        });
    };

    return (
        <div
            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-elevation-2 transition-all duration-300 cursor-pointer group flex flex-col h-full"
            onClick={handleViewCourse}
        >
            {/* Course Cover Image */}
            <div className="relative h-44 sm:h-48 bg-muted overflow-hidden">
                <img
                    src={course.coverImage}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Published Badge */}
                <div className="absolute top-3 right-3 bg-success text-success-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shadow-sm">
                    Published
                </div>
            </div>

            {/* Course Content */}
            <div className="p-4 sm:p-5 flex flex-col flex-1">
                {/* Title */}
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {course.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                    {course.description}
                </p>

                {/* Instructor */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                        {course.instructor.charAt(0)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        by <span className="font-semibold text-foreground">{course.instructor}</span>
                    </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                    {course.tags.slice(0, 2).map((tag, index) => (
                        <span
                            key={index}
                            className="inline-block bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                    {course.tags.length > 2 && (
                        <span className="inline-block bg-muted text-muted-foreground text-[10px] font-medium px-2 py-0.5 rounded-full">
                            +{course.tags.length - 2}
                        </span>
                    )}
                </div>

                {/* CTA Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleViewCourse();
                    }}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 active:scale-[0.98] shadow-sm"
                >
                    View Course
                </button>
            </div>
        </div>
    );
};

export default CourseCard;
