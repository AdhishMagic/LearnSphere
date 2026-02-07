import React from 'react';
import { X } from 'lucide-react';
import CreateCourseForm from './CreateCourseForm';
import { createCourseMock } from './mockData';

const CreateCourseModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleCreate = (courseName) => {
        const newCourse = createCourseMock(courseName);
        console.log("Course Created:", newCourse);
        console.log(`Redirecting to /instructor/courses/edit/${newCourse.id}...`);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-background w-full max-w-md rounded-lg shadow-lg border p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
                    aria-label="Close"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-semibold mb-4">Create New Course</h2>

                <CreateCourseForm
                    onSubmit={handleCreate}
                    onCancel={onClose}
                />
            </div>
        </div>
    );
};

export default CreateCourseModal;
