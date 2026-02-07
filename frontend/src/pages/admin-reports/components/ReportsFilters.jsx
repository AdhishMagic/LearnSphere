import React from 'react';
import { Search } from 'lucide-react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { MOCK_COURSES_LIST, MOCK_INSTRUCTORS_LIST } from '../mockData';

const ReportsFilters = ({
    searchQuery,
    setSearchQuery,
    courseFilter,
    setCourseFilter,
    instructorFilter,
    setInstructorFilter,
    statusFilter,
    setStatusFilter
}) => {

    const courseOptions = [
        { label: 'All Courses', value: 'all' },
        ...MOCK_COURSES_LIST
    ];

    const instructorOptions = [
        { label: 'All Instructors', value: 'all' },
        ...MOCK_INSTRUCTORS_LIST
    ];

    const statusOptions = [
        { label: 'All Statuses', value: 'all' },
        { label: 'Completed', value: 'completed' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Yet to Start', value: 'yet-to-start' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
            {/* Search */}
            <div className="md:col-span-12 lg:col-span-3 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search learner..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                />
            </div>

            {/* Course Filter */}
            <div className="md:col-span-4 lg:col-span-3">
                <Select
                    options={courseOptions}
                    value={courseFilter}
                    onChange={setCourseFilter}
                    placeholder="Filter by Course"
                />
            </div>

            {/* Instructor Filter */}
            <div className="md:col-span-4 lg:col-span-3">
                <Select
                    options={instructorOptions}
                    value={instructorFilter}
                    onChange={setInstructorFilter}
                    placeholder="Filter by Instructor"
                />
            </div>

            {/* Status Filter */}
            <div className="md:col-span-4 lg:col-span-3">
                <Select
                    options={statusOptions}
                    value={statusFilter}
                    onChange={setStatusFilter}
                    placeholder="Filter by Status"
                />
            </div>
        </div>
    );
};

export default ReportsFilters;
