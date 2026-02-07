import React, { useState, useMemo } from 'react';
import RoleSidebar from '../../components/navigation/RoleSidebar';
import BreadcrumbTracker from '../../components/navigation/BreadcrumbTracker';
import OverviewCards from './components/OverviewCards';
import ReportsFilters from './components/ReportsFilters';
import ReportsTable from './components/ReportsTable';
import ColumnSelector from './components/ColumnSelector';
import { MOCK_REPORTS_DATA } from './mockData';

const AdminReportsPage = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    // Filter States
    const [searchQuery, setSearchQuery] = useState('');
    const [courseFilter, setCourseFilter] = useState('all');
    const [instructorFilter, setInstructorFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    // Column Visibility State
    const [columns, setColumns] = useState([
        { id: 'srNo', label: 'Sr No', visible: true },
        { id: 'courseName', label: 'Course Name', visible: true },
        { id: 'participantName', label: 'Participant Name', visible: true },
        { id: 'instructorName', label: 'Instructor Name', visible: true },
        { id: 'enrolledDate', label: 'Enrolled On', visible: true },
        { id: 'startDate', label: 'Started On', visible: true },
        { id: 'timeSpent', label: 'Time Spent', visible: true },
        { id: 'completionPercentage', label: 'Progress (%)', visible: true },
        { id: 'completedDate', label: 'Completed On', visible: true },
        { id: 'status', label: 'Status', visible: true },
    ]);
    const [isColumnSelectorOpen, setIsColumnSelectorOpen] = useState(false);

    // Derived State: Stats
    const stats = useMemo(() => {
        const total = MOCK_REPORTS_DATA.length;
        const yetToStart = MOCK_REPORTS_DATA.filter(r => r.status === 'yet-to-start').length;
        const inProgress = MOCK_REPORTS_DATA.filter(r => r.status === 'in-progress').length;
        const completed = MOCK_REPORTS_DATA.filter(r => r.status === 'completed').length;
        return { total, yetToStart, inProgress, completed };
    }, []);

    // Derived State: Filtered Reports
    const filteredReports = useMemo(() => {
        return MOCK_REPORTS_DATA.filter(report => {
            const matchesSearch = report.participantName.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCourse = courseFilter === 'all' || report.courseId === courseFilter;
            const matchesInstructor = instructorFilter === 'all' || report.instructorId === instructorFilter;
            const matchesStatus = statusFilter === 'all' || report.status === statusFilter;

            return matchesSearch && matchesCourse && matchesInstructor && matchesStatus;
        });
    }, [searchQuery, courseFilter, instructorFilter, statusFilter]);

    // Handlers
    const handleCardClick = (status) => {
        setStatusFilter(status);
        console.log(`Filtered by status card: ${status}`);
    };

    const toggleColumn = (id) => {
        setColumns(cols => cols.map(col =>
            col.id === id ? { ...col, visible: !col.visible } : col
        ));
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
                    <div className="mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold mb-2">Reports</h1>
                        <p className="text-muted-foreground">Monitor system-wide learner progress and activity.</p>
                    </div>

                    {/* Overview Cards */}
                    <OverviewCards
                        stats={stats}
                        onCardClick={handleCardClick}
                        selectedFilter={statusFilter}
                    />

                    {/* Filters */}
                    <ReportsFilters
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        courseFilter={courseFilter}
                        setCourseFilter={setCourseFilter}
                        instructorFilter={instructorFilter}
                        setInstructorFilter={setInstructorFilter}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                    />

                    {/* Table */}
                    <ReportsTable
                        reports={filteredReports}
                        columns={columns}
                        onOpenColumnSelector={() => setIsColumnSelectorOpen(true)}
                    />

                    {/* Column Selector Modal/Panel */}
                    <ColumnSelector
                        isOpen={isColumnSelectorOpen}
                        onClose={() => setIsColumnSelectorOpen(false)}
                        columns={columns}
                        onToggleColumn={toggleColumn}
                    />

                </div>
            </main>
        </div>
    );
};

export default AdminReportsPage;
