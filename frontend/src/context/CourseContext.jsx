import React, { createContext, useEffect, useState, useContext } from 'react';

const CourseContext = createContext();

export const useCourse = () => useContext(CourseContext);

export const CourseProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

    const fetchCourses = async () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/courses/instructor/me`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                alert(errorData?.detail || 'Unable to load courses.');
                setIsLoading(false);
                return;
            }

            const data = await response.json();
            setCourses(data || []);
        } catch (error) {
            alert('Unable to load courses.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const addCourse = async (newCourse) => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            alert('You need to log in to create courses.');
            return null;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/courses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newCourse)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                alert(errorData?.detail || 'Unable to create course.');
                return null;
            }

            const data = await response.json();
            setCourses(prev => [data, ...prev]);
            return data;
        } catch (error) {
            alert('Unable to create course.');
            return null;
        }
    };

    const updateCourse = async (id, updatedData) => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            alert('You need to log in to update courses.');
            return null;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/courses/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                alert(errorData?.detail || 'Unable to update course.');
                return null;
            }

            const data = await response.json();
            setCourses(prev => prev.map(course => course.id === data.id ? data : course));
            return data;
        } catch (error) {
            alert('Unable to update course.');
            return null;
        }
    };

    const deleteCourse = () => {
        alert('Course deletion is not available.');
    };

    const getCourse = (id) => {
        return courses.find(course => String(course.id) === String(id));
    };

    return (
        <CourseContext.Provider value={{ courses, isLoading, addCourse, updateCourse, deleteCourse, getCourse, fetchCourses }}>
            {children}
        </CourseContext.Provider>
    );
};
