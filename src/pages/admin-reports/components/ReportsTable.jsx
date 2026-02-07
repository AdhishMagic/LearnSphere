import React from 'react';
import ReportRow from './ReportRow';
import { Settings2 } from 'lucide-react';
import Button from '../../../components/ui/Button';

const ReportsTable = ({ reports, columns, onOpenColumnSelector }) => {

    // Helper to check if a column is visible
    const isVisible = (id) => columns.find(c => c.id === id)?.visible;

    return (
        <div className="rounded-md border bg-card text-card-foreground shadow-sm">
            <div className="p-6 flex items-center justify-between border-b">
                <h3 className="text-lg font-semibold leading-none tracking-tight">Detailed Report</h3>
                <Button variant="outline" size="sm" onClick={onOpenColumnSelector} iconName="Settings2">
                    Customize Columns
                </Button>
            </div>

            <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm text-left">
                    <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            {isVisible('srNo') && (
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Sr No</th>
                            )}
                            {isVisible('courseName') && (
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Course Name</th>
                            )}
                            {isVisible('participantName') && (
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Participant Name</th>
                            )}
                            {isVisible('instructorName') && (
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Instructor Name</th>
                            )}
                            {isVisible('enrolledDate') && (
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Enrolled On</th>
                            )}
                            {isVisible('startDate') && (
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Started On</th>
                            )}
                            {isVisible('timeSpent') && (
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Time Spent</th>
                            )}
                            {isVisible('completionPercentage') && (
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Progress</th>
                            )}
                            {isVisible('completedDate') && (
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Completed On</th>
                            )}
                            {isVisible('status') && (
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                        {reports.length > 0 ? (
                            reports.map((report, index) => (
                                <ReportRow
                                    key={report.id}
                                    report={report}
                                    columns={columns}
                                    index={index}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.filter(c => c.visible).length} className="p-4 text-center text-muted-foreground h-24">
                                    No records found matching your filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="p-4 border-t text-xs text-muted-foreground">
                Showing {reports.length} records
            </div>
        </div>
    );
};

export default ReportsTable;
