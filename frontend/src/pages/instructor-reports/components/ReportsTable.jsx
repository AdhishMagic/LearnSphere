import React from 'react';
import ReportRow from './ReportRow';

const ReportsTable = ({ reports, visibleColumns }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {reports.length === 0 ? (
                <div className="p-12 text-center">
                    <div className="text-gray-400 text-5xl mb-3">📊</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">No Reports Found</h3>
                    <p className="text-sm text-gray-500">
                        No learner records match your current filters.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                {visibleColumns.srNo && (
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                        Sr No
                                    </th>
                                )}
                                {visibleColumns.courseName && (
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                        Course Name
                                    </th>
                                )}
                                {visibleColumns.learnerName && (
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                        Learner Name
                                    </th>
                                )}
                                {visibleColumns.enrolledDate && (
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                        Enrolled Date
                                    </th>
                                )}
                                {visibleColumns.startDate && (
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                        Start Date
                                    </th>
                                )}
                                {visibleColumns.timeSpent && (
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                        Time Spent
                                    </th>
                                )}
                                {visibleColumns.completionPercentage && (
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                        Completion
                                    </th>
                                )}
                                {visibleColumns.status && (
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                        Status
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {reports.map((report, index) => (
                                <ReportRow
                                    key={report.id}
                                    report={report}
                                    index={index}
                                    visibleColumns={visibleColumns}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ReportsTable;
