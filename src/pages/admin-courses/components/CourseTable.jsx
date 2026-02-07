import React from 'react';
import CourseRow from './CourseRow';

const CourseTable = ({ courses, onEdit, onTogglePublish, onDelete, onAssign }) => {
    if (!courses || courses.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg border-dashed border-border bg-card/50">
                <p className="text-lg font-medium text-muted-foreground">No courses found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your filters or search query.</p>
            </div>
        );
    }

    return (
        <div className="w-full overflow-hidden border rounded-lg border-border bg-card shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-muted/50 border-b border-border">
                        <tr>
                            <th className="h-12 px-4 font-medium text-muted-foreground align-middle w-[30%]">Course</th>
                            <th className="h-12 px-4 font-medium text-muted-foreground align-middle w-[20%]">Instructor</th>
                            <th className="h-12 px-4 font-medium text-muted-foreground align-middle w-[15%]">Stats</th>
                            <th className="h-12 px-4 font-medium text-muted-foreground align-middle w-[15%]">Duration</th>
                            <th className="h-12 px-4 font-medium text-muted-foreground align-middle w-[10%]">Status</th>
                            <th className="h-12 px-4 font-medium text-muted-foreground align-middle w-[10%] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <CourseRow
                                key={course.id}
                                course={course}
                                onEdit={onEdit}
                                onTogglePublish={onTogglePublish}
                                onDelete={onDelete}
                                onAssign={onAssign}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CourseTable;
