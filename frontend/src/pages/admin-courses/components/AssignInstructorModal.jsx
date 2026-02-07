import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { MOCK_INSTRUCTORS } from '../mockData';
import { X } from 'lucide-react';

const AssignInstructorModal = ({ isOpen, onClose, onAssign, currentInstructorId, courseTitle }) => {
    const [selectedInstructor, setSelectedInstructor] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setSelectedInstructor(currentInstructorId || '');
        }
    }, [isOpen, currentInstructorId]);

    if (!isOpen) return null;

    const handleAssign = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            onAssign(selectedInstructor);
            setLoading(false);
            onClose();
        }, 800);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-lg bg-card border border-border bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-foreground">Assign Instructor</h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-4">
                        Assigning a new instructor for <strong>{courseTitle}</strong>.
                    </p>

                    <Select
                        label="Select Instructor"
                        placeholder="Choose an instructor..."
                        options={MOCK_INSTRUCTORS}
                        value={selectedInstructor}
                        onChange={setSelectedInstructor}
                        searchable
                        className="w-full"
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAssign}
                        disabled={!selectedInstructor || selectedInstructor === currentInstructorId || loading}
                        loading={loading}
                    >
                        Assign
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AssignInstructorModal;
