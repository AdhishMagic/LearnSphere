import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSidebar from '../../components/navigation/RoleSidebar';
import CoursesHeader from './components/CoursesHeader';
import ViewToggle from './components/ViewToggle';
import SearchBar from './components/SearchBar';
import CourseList from './components/CourseList';
import CourseGrid from './components/CourseGrid';
import { useCourse } from '../../context/CourseContext';

const InstructorCoursesPage = () => {
    const navigate = useNavigate();
    const { courses } = useCourse();
    const [viewMode, setViewMode] = useState('grid'); // Default to 'grid'
    const [searchQuery, setSearchQuery] = useState('');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);



    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background">
            <RoleSidebar
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                activeRole="instructor"
            />

            <main className={`transition-all duration-250 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <CoursesHeader onCreateClick={() => navigate('/instructor/courses/create')} />

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                        <SearchBar onSearch={setSearchQuery} />
                        <ViewToggle currentView={viewMode} onToggle={setViewMode} />
                    </div>

                    <div className="min-h-[500px]">
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
