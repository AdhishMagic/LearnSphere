import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InstructorNavbar from '../../components/navigation/InstructorNavbar';
import CoursesHeader from './components/CoursesHeader';
import ViewToggle from './components/ViewToggle';
import SearchBar from './components/SearchBar';
import CourseList from './components/CourseList';
import CourseGrid from './components/CourseGrid';
import { useCourse } from '../../context/CourseContext';

const InstructorCoursesPage = () => {
    const navigate = useNavigate();
    const { courses } = useCourse();
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background">
            {/* Instructor Navigation */}
            <InstructorNavbar />

            <main>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
                    <CoursesHeader onCreateClick={() => navigate('/instructor/courses/create')} />

                    {/* Search and View Toggle */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mb-6 md:mb-8">
                        <div className="flex-1">
                            <SearchBar onSearch={setSearchQuery} />
                        </div>
                        <ViewToggle currentView={viewMode} onToggle={setViewMode} />
                    </div>

                    {/* Courses Display */}
                    <div className="min-h-[400px] sm:min-h-[500px]">
                        {viewMode === 'list' ? (
                            <CourseList courses={filteredCourses} />
                        ) : (
                            <CourseGrid courses={filteredCourses} />
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default InstructorCoursesPage;
