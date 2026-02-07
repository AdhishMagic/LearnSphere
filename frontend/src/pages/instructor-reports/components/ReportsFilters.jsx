import React from 'react';
import ColumnSelector from './ColumnSelector';

const ReportsFilters = ({
    courses,
    selectedCourse,
    onCourseChange,
    selectedStatus,
    onStatusChange,
    visibleColumns,
    onToggleColumn
}) => {
    const statusOptions = ['All Statuses', 'Yet to Start', 'In Progress', 'Completed'];

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <div className="flex flex-wrap items-center gap-4">
                {/* Course Filter */}
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Filter by Course
                    </label>
                    <select
                        value={selectedCourse}
                        onChange={(e) => {
                            console.log(`Course filter changed to: ${e.target.value}`);
                            onCourseChange(e.target.value);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="all">All Courses</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>
                                {course.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Status Filter */}
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Filter by Status
                    </label>
                    <select
                        value={selectedStatus}
                        onChange={(e) => {
                            console.log(`Status filter changed to: ${e.target.value}`);
                            onStatusChange(e.target.value);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        {statusOptions.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Column Customization */}
                <div className="flex items-end">
                    <ColumnSelector
                        visibleColumns={visibleColumns}
                        onToggleColumn={onToggleColumn}
                    />
                </div>
            </div>
        </div>
    );
};

export default ReportsFilters;
