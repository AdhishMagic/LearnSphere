import React from 'react';
import Button from '../../../components/ui/Button';
import { Plus } from 'lucide-react';

const CoursesHeader = ({ onCreateClick }) => {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Courses</h1>
                <p className="text-muted-foreground mt-1">
                    Manage your courses, track performance, and create new content.
                </p>
            </div>
            <Button onClick={onCreateClick} size="lg" className="shadow-sm">
                <Plus className="mr-2 h-4 w-4" /> Create New Course
            </Button>
        </div>
    );
};

export default CoursesHeader;
