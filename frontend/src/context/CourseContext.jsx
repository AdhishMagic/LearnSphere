import React, { createContext, useState, useContext } from 'react';
import mockCourses from '../pages/instructor-courses/mockData';

const CourseContext = createContext();

export const useCourse = () => useContext(CourseContext);

export const CourseProvider = ({ children }) => {
    const [courses, setCourses] = useState(mockCourses);

    const addCourse = (newCourse) => {
        const courseWithId = {
            ...newCourse,
            id: Date.now(), // Simple ID generation
            lastUpdated: new Date().toISOString().split('T')[0],
            lessonsCount: newCourse.curriculum?.length || 0,
            status: newCourse.isPublished ? 'Published' : 'Draft',
            image: newCourse.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
        };
        setCourses([courseWithId, ...courses]);
        return courseWithId;
    };

    const updateCourse = (id, updatedData) => {
        setCourses(courses.map(course =>
            course.id === parseInt(id) ? {
                ...course,
                ...updatedData,
                lastUpdated: new Date().toISOString().split('T')[0],
                lessonsCount: updatedData.curriculum?.length || 0,
                status: updatedData.isPublished ? 'Published' : 'Draft'
            } : course
        ));
    };

    const deleteCourse = (id) => {
        setCourses(courses.filter(course => course.id !== id));
    };

    const getCourse = (id) => {
        return courses.find(course => course.id === parseInt(id));
    };

    return (
        <CourseContext.Provider value={{ courses, addCourse, updateCourse, deleteCourse, getCourse }}>
            {children}
        </CourseContext.Provider>
    );
};
