import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import { Edit, Share2 } from 'lucide-react';

const CourseActions = ({ courseId, sharePath = '/course' }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/instructor/courses/edit/${courseId}`);
    };

    const handleShare = async () => {
        const url = `${window.location.origin}${sharePath}/${courseId}`;

        try {
            await navigator.clipboard.writeText(url);
            window.alert('Course link copied to clipboard');
        } catch {
            // Fallback for environments where clipboard API is blocked
            window.prompt('Copy this course link:', url);
        }
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
