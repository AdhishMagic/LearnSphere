import React, { useState } from 'react';

const ColumnSelector = ({ visibleColumns, onToggleColumn }) => {
    const [isOpen, setIsOpen] = useState(false);

    const columns = [
        { id: 'srNo', label: 'Sr No', required: true },
        { id: 'courseName', label: 'Course Name', required: false },
        { id: 'learnerName', label: 'Learner Name', required: false },
        { id: 'enrolledDate', label: 'Enrolled Date', required: false },
        { id: 'startDate', label: 'Start Date', required: false },
        { id: 'timeSpent', label: 'Time Spent', required: false },
        { id: 'completionPercentage', label: 'Completion %', required: false },
        { id: 'status', label: 'Status', required: true }
    ];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm font-medium text-gray-700"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Customize Columns
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown Panel */}
                    <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-2">
                        <div className="px-4 py-2 border-b border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-900">Table Columns</h3>
                            <p className="text-xs text-gray-500 mt-0.5">Select columns to display</p>
                        </div>

                        <div className="max-h-80 overflow-y-auto py-2">
                            {columns.map((column) => (
                                <label
                                    key={column.id}
                                    className={`
                    flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer
                    ${column.required ? 'opacity-60 cursor-not-allowed' : ''}
                  `}
                                >
                                    <input
                                        type="checkbox"
                                        checked={visibleColumns[column.id]}
                                        disabled={column.required}
                                        onChange={() => {
                                            if (!column.required) {
                                                console.log(`Column visibility toggled: ${column.label} -> ${!visibleColumns[column.id]}`);
                                                onToggleColumn(column.id);
                                            }
                                        }}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="ml-3 text-sm text-gray-700">
                                        {column.label}
                                        {column.required && (
                                            <span className="ml-1 text-xs text-gray-400">(Required)</span>
                                        )}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ColumnSelector;
