import React from 'react';
import Button from '../../../components/ui/Button';
import { Edit, Share2 } from 'lucide-react';

const CourseActions = ({ courseId }) => {
    const handleEdit = () => {
        console.log(`Edit course ${courseId}`);
    };

    const handleShare = () => {
        console.log(`Share course ${courseId}`);
    };

    return (
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleEdit} className="h-8 w-8 p-0">
                <Edit size={16} className="text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShare} className="h-8 w-8 p-0">
                <Share2 size={16} className="text-muted-foreground" />
            </Button>
        </div>
    );
};

export default CourseActions;
