import React from 'react';
import CourseCard from './CourseCard';
import Icon from '../../../components/AppIcon';

const CourseGrid = ({ courses, onEnroll, enrolledCourses, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {[1, 2, 3, 4, 5, 6]?.map((index) => (
          <div key={index} className="bg-card rounded-xl overflow-hidden shadow-elevation-2">
            <div className="skeleton h-48 md:h-56 lg:h-64 w-full" />
            <div className="p-4 md:p-5 lg:p-6 space-y-3">
              <div className="skeleton skeleton-text w-20 h-6" />
              <div className="skeleton skeleton-text w-full h-6" />
              <div className="skeleton skeleton-text w-3/4 h-6" />
              <div className="flex items-center gap-2">
                <div className="skeleton skeleton-circle w-8 h-8" />
                <div className="skeleton skeleton-text w-32 h-4" />
              </div>
              <div className="flex items-center justify-between">
                <div className="skeleton skeleton-text w-20 h-8" />
                <div className="skeleton skeleton-text w-24 h-10" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (courses?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 md:py-20 lg:py-24 text-center">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-muted flex items-center justify-center mb-6">
          <Icon name="BookOpen" size={40} color="var(--color-muted-foreground)" />
        </div>
        <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
          No courses found
        </h3>
        <p className="text-muted-foreground max-w-md">
          We couldn't find any courses matching your criteria. Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
      {courses?.map((course) => (
        <CourseCard
          key={course?.id}
          course={course}
          onEnroll={onEnroll}
          isEnrolled={enrolledCourses?.includes(course?.id)}
        />
      ))}
    </div>
  );
};

export default CourseGrid;