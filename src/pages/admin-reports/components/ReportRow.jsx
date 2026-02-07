import React from 'react';
import StatusBadge from './StatusBadge';

const ReportRow = ({ report, columns, index }) => {
    return (
        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            {columns.find(c => c.id === 'srNo').visible && (
                <td className="p-4 align-middle font-medium">{index + 1}</td> // Sr No
            )}
            {columns.find(c => c.id === 'courseName').visible && (
                <td className="p-4 align-middle">{report.courseName}</td>
            )}
            {columns.find(c => c.id === 'participantName').visible && (
                <td className="p-4 align-middle">{report.participantName}</td>
            )}
            {columns.find(c => c.id === 'instructorName').visible && (
                <td className="p-4 align-middle">{report.instructorName}</td>
            )}
            {columns.find(c => c.id === 'enrolledDate').visible && (
                <td className="p-4 align-middle">{report.enrolledDate}</td>
            )}
            {columns.find(c => c.id === 'startDate').visible && (
                <td className="p-4 align-middle">{report.startDate || '-'}</td>
            )}
            {columns.find(c => c.id === 'timeSpent').visible && (
                <td className="p-4 align-middle">{report.timeSpent}</td>
            )}
            {columns.find(c => c.id === 'completionPercentage').visible && (
                <td className="p-4 align-middle">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden max-w-[80px]">
                            <div
                                className="h-full bg-primary"
                                style={{ width: `${report.completionPercentage}%` }}
                            />
                        </div>
                        <span className="text-xs text-muted-foreground">{report.completionPercentage}%</span>
                    </div>
                </td>
            )}
            {columns.find(c => c.id === 'completedDate').visible && (
                <td className="p-4 align-middle">{report.completedDate || '-'}</td>
            )}
            {columns.find(c => c.id === 'status').visible && (
                <td className="p-4 align-middle">
                    <StatusBadge status={report.status} />
                </td>
            )}
        </tr>
    );
};

export default ReportRow;
