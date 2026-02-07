import React from 'react';
import Button from '../../../components/ui/Button';
import { Edit, Trash2, UserCog, Eye, EyeOff } from 'lucide-react';

const CourseActions = ({ course, onEdit, onTogglePublish, onDelete, onAssign }) => {
    const isPublished = course.status === 'published';

    return (
        <div className="flex items-center gap-1">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(course)}
                title="Edit Course"
                className="text-muted-foreground hover:text-primary"
            >
                <Edit className="h-4 w-4" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                onClick={() => onTogglePublish(course)}
                title={isPublished ? "Unpublish Course" : "Publish Course"}
                className={isPublished ? "text-success hover:text-success/80" : "text-muted-foreground hover:text-primary"}
            >
                {isPublished ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>

            <Button
                variant="ghost"
                size="icon"
                onClick={() => onAssign(course)}
                title="Assign Instructor"
                className="text-muted-foreground hover:text-primary"
            >
                <UserCog className="h-4 w-4" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(course)}
                title="Delete Course"
                className="text-muted-foreground hover:text-destructive"
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default CourseActions;
