import React from 'react';
import { BookOpen, Clock, Eye, FileText } from 'lucide-react';
import CourseActions from './CourseActions';

const StatusBadge = ({ status }) => {
    const styles = {
        published: 'bg-success/10 text-success border-success/20',
        unpublished: 'bg-muted text-muted-foreground border-muted-foreground/20',
        draft: 'bg-warning/10 text-warning border-warning/20',
    };

    const label = status.charAt(0).toUpperCase() + status.slice(1);
    const style = styles[status] || styles.unpublished;

    return (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${style}`}>
            {label}
        </span>
    );
};

const CourseRow = ({ course, onEdit, onTogglePublish, onDelete, onAssign }) => {
    return (
        <tr className="border-b border-border hover:bg-muted/50 transition-colors">
            <td className="p-4">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <BookOpen size={20} />
                    </div>
                    <div>
                        <h4 className="font-medium text-foreground line-clamp-1" title={course.title}>
                            {course.title}
                        </h4>
                        <div className="flex gap-1 mt-1">
                            {course.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="text-[10px] bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded">
                                    {tag}
                                </span>
                            ))}
                            {course.tags.length > 2 && (
                                <span className="text-[10px] text-muted-foreground self-center">+{course.tags.length - 2}</span>
                            )}
                        </div>
                    </div>
                </div>
            </td>

            <td className="p-4">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center text-xs font-medium">
                        {course.instructorName.charAt(0)}
                    </div>
                    <span className="text-sm text-foreground">{course.instructorName}</span>
                </div>
            </td>

            <td className="p-4">
                <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Eye size={12} /> {course.views.toLocaleString()} views
                    </div>
                    <div className="flex items-center gap-1">
                        <FileText size={12} /> {course.lessons} lessons
                    </div>
                </div>
            </td>

            <td className="p-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                    <Clock size={14} /> {course.duration}
                </div>
            </td>

            <td className="p-4">
                <StatusBadge status={course.status} />
            </td>

            <td className="p-4 text-right">
                <CourseActions
                    course={course}
                    onEdit={onEdit}
                    onTogglePublish={onTogglePublish}
                    onDelete={onDelete}
                    onAssign={onAssign}
                />
            </td>
        </tr>
    );
};

export default CourseRow;
