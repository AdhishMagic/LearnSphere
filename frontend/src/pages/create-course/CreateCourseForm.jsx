import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const CreateCourseForm = ({ onSubmit, onCancel }) => {
    const [courseName, setCourseName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (courseName.trim()) {
            onSubmit(courseName);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-6">
                <Input
                    label="Course Name"
                    placeholder="Enter course name"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    required
                    autoFocus
                />
            </div>

            <div className="flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" disabled={!courseName.trim()}>
                    Create Course
                </Button>
            </div>
        </form>
    );
};

export default CreateCourseForm;
