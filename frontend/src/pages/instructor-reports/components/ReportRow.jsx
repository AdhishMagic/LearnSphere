import React from 'react';
import StatusBadge from './StatusBadge';

const ReportRow = ({ report, index, visibleColumns }) => {
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTimeSpent = (hours) => {
        if (hours === 0) return '-';
        return `${hours.toFixed(1)} hrs`;
    };

    return (
        <tr className="hover:bg-gray-50 transition-colors">
            {visibleColumns.srNo && (
                <td className="px-4 py-3 text-sm text-gray-900 border-b border-gray-200">
                    {index + 1}
                </td>
            )}
            {visibleColumns.courseName && (
                <td className="px-4 py-3 text-sm text-gray-900 border-b border-gray-200 font-medium">
                    {report.courseName}
                </td>
            )}
            {visibleColumns.learnerName && (
                <td className="px-4 py-3 text-sm text-gray-900 border-b border-gray-200">
                    {report.learnerName}
                </td>
            )}
            {visibleColumns.enrolledDate && (
                <td className="px-4 py-3 text-sm text-gray-600 border-b border-gray-200">
                    {formatDate(report.enrolledDate)}
                </td>
            )}
            {visibleColumns.startDate && (
                <td className="px-4 py-3 text-sm text-gray-600 border-b border-gray-200">
                    {formatDate(report.startDate)}
                </td>
            )}
            {visibleColumns.timeSpent && (
                <td className="px-4 py-3 text-sm text-gray-900 border-b border-gray-200">
                    {formatTimeSpent(report.timeSpent)}
                </td>
            )}
            {visibleColumns.completionPercentage && (
                <td className="px-4 py-3 text-sm border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all"
                                style={{ width: `${report.completionPercentage}%` }}
                            />
                        </div>
                        <span className="text-gray-900 font-medium min-w-[40px]">
                            {report.completionPercentage}%
                        </span>
                    </div>
                </td>
            )}
            {visibleColumns.status && (
                <td className="px-4 py-3 text-sm border-b border-gray-200">
                    <StatusBadge status={report.status} />
                </td>
            )}
        </tr>
    );
};

export default ReportRow;
