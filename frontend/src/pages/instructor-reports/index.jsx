import React, { useState, useMemo } from 'react';
import OverviewCards from './components/OverviewCards';
import ReportsFilters from './components/ReportsFilters';
import ReportsTable from './components/ReportsTable';
import { reportingData, instructorCourses, computeSummaryStats } from './mockData';

const InstructorReportsPage = () => {
    // Filter states
    const [selectedCourse, setSelectedCourse] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('All Statuses');
    const [activeCardFilter, setActiveCardFilter] = useState('all');

    // Column visibility state
    const [visibleColumns, setVisibleColumns] = useState({
        srNo: true,
        courseName: true,
        learnerName: true,
        enrolledDate: true,
        startDate: true,
        timeSpent: true,
        completionPercentage: true,
        status: true
    });

    // Filter reports based on selected filters
    const filteredReports = useMemo(() => {
        let filtered = [...reportingData];

        // Apply course filter
        if (selectedCourse !== 'all') {
            filtered = filtered.filter(
                (report) => report.courseId === parseInt(selectedCourse)
            );
        }

        // Apply status filter (from dropdown)
        if (selectedStatus !== 'All Statuses') {
            filtered = filtered.filter((report) => report.status === selectedStatus);
        }

        // Apply card filter (overrides dropdown status filter)
        if (activeCardFilter !== 'all') {
            filtered = filtered.filter((report) => report.status === activeCardFilter);
        }

        return filtered;
    }, [selectedCourse, selectedStatus, activeCardFilter]);

    // Compute summary stats based on filtered data
    const summaryStats = useMemo(
        () => computeSummaryStats(filteredReports),
        [filteredReports]
    );

    // Handle card click
    const handleCardClick = (filterId) => {
        if (filterId === 'all') {
            setActiveCardFilter('all');
            setSelectedStatus('All Statuses'); // Reset status dropdown
        } else {
            setActiveCardFilter(filterId);
            setSelectedStatus(filterId); // Sync status dropdown
        }
    };

    // Handle status dropdown change
    const handleStatusChange = (status) => {
        setSelectedStatus(status);
        if (status === 'All Statuses') {
            setActiveCardFilter('all');
        } else {
            setActiveCardFilter(status);
        }
    };

    // Toggle column visibility
    const handleToggleColumn = (columnId) => {
        setVisibleColumns((prev) => ({
            ...prev,
            [columnId]: !prev[columnId]
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Reports Dashboard</h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Track learner progress across your courses
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="font-medium">{reportingData.length}</span>
                            <span>Total Enrollments</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Overview Cards */}
                <OverviewCards
                    stats={summaryStats}
                    activeFilter={activeCardFilter}
                    onCardClick={handleCardClick}
                />

                {/* Filters */}
                <ReportsFilters
                    courses={instructorCourses}
                    selectedCourse={selectedCourse}
                    onCourseChange={setSelectedCourse}
                    selectedStatus={selectedStatus}
                    onStatusChange={handleStatusChange}
                    visibleColumns={visibleColumns}
                    onToggleColumn={handleToggleColumn}
                />

                {/* Reports Table */}
                <ReportsTable reports={filteredReports} visibleColumns={visibleColumns} />
            </div>
        </div>
    );
};

export default InstructorReportsPage;
