import React, { useState } from 'react';
import RoleSidebar from '../../components/navigation/RoleSidebar';
import BreadcrumbTracker from '../../components/navigation/BreadcrumbTracker';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { Search, Plus } from 'lucide-react';
import CourseTable from './components/CourseTable';
import AssignInstructorModal from './components/AssignInstructorModal';
import { MOCK_COURSES, MOCK_INSTRUCTORS } from './mockData';

const AdminCoursesPage = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    // State for data and filters
    const [courses, setCourses] = useState(MOCK_COURSES);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [instructorFilter, setInstructorFilter] = useState('all');

    // Modal State
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [selectedCourseForAssign, setSelectedCourseForAssign] = useState(null);

    // Derived State
    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
        const matchesInstructor = instructorFilter === 'all' || course.instructorId === instructorFilter;
        return matchesSearch && matchesStatus && matchesInstructor;
    });

    const instructorOptions = [
        { label: 'All Instructors', value: 'all' },
        ...MOCK_INSTRUCTORS
    ];

    const statusOptions = [
        { label: 'All Statuses', value: 'all' },
        { label: 'Published', value: 'published' },
        { label: 'Unpublished', value: 'unpublished' },
        { label: 'Draft', value: 'draft' },
    ];

    // Handlers
    const handleEdit = (course) => {
        console.log('Edit course:', course);
        // Navigate to edit page or open modal
    };

    const handleTogglePublish = (course) => {
        const newStatus = course.status === 'published' ? 'unpublished' : 'published';
        setCourses(courses.map(c =>
            c.id === course.id ? { ...c, status: newStatus } : c
        ));
        console.log(`Toggled publish status for ${course.title} to ${newStatus}`);
    };

    const handleDelete = (course) => {
        if (window.confirm(`Are you sure you want to delete "${course.title}"?`)) {
            setCourses(courses.filter(c => c.id !== course.id));
            console.log('Deleted course:', course.id);
        }
    };

    const openAssignModal = (course) => {
        setSelectedCourseForAssign(course);
        setIsAssignModalOpen(true);
    };

    const handleAssignInstructor = (instructorId) => {
        if (!selectedCourseForAssign) return;

        const instructor = MOCK_INSTRUCTORS.find(i => i.value === instructorId);
        setCourses(courses.map(c =>
            c.id === selectedCourseForAssign.id
                ? { ...c, instructorId: instructor.value, instructorName: instructor.label }
                : c
        ));
        console.log(`Assigned instructor ${instructorId} to course ${selectedCourseForAssign.id}`);
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <RoleSidebar
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                activeRole="admin"
            />

            <main className={`transition-all duration-250 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'}`}>
                <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8">
                    <BreadcrumbTracker />

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold mb-2">Courses Management</h1>
                            <p className="text-muted-foreground">Manage all courses across the platform.</p>
                        </div>
                        <Button className="shrink-0" iconName="Plus">
                            Create Course
                        </Button>
                    </div>

                    {/* Filters & Search */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
                        <div className="md:col-span-5 lg:col-span-6 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search courses..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                        <div className="md:col-span-3 lg:col-span-3">
                            <Select
                                options={instructorOptions}
                                value={instructorFilter}
                                onChange={setInstructorFilter}
                                placeholder="Filter by Instructor"
                            />
                        </div>
                        <div className="md:col-span-4 lg:col-span-3">
                            <Select
                                options={statusOptions}
                                value={statusFilter}
                                onChange={setStatusFilter}
                                placeholder="Filter by Status"
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <CourseTable
                        courses={filteredCourses}
                        onEdit={handleEdit}
                        onTogglePublish={handleTogglePublish}
                        onDelete={handleDelete}
                        onAssign={openAssignModal}
                    />

                    {/* Modals */}
                    <AssignInstructorModal
                        isOpen={isAssignModalOpen}
                        onClose={() => setIsAssignModalOpen(false)}
                        onAssign={handleAssignInstructor}
                        currentInstructorId={selectedCourseForAssign?.instructorId}
                        courseTitle={selectedCourseForAssign?.title}
                    />
                </div>
            </main>
        </div>
    );
};

export default AdminCoursesPage;
