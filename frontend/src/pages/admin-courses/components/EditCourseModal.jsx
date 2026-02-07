import React, { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { MOCK_INSTRUCTORS } from '../mockData';

const STATUS_OPTIONS = [
    { label: 'Published', value: 'published' },
    { label: 'Unpublished', value: 'unpublished' },
    { label: 'Draft', value: 'draft' },
];

const toTagsString = (tags) => (Array.isArray(tags) ? tags.join(', ') : '');

const parseTags = (value) => {
    if (!value) return [];
    return value
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);
};

const EditCourseModal = ({
    isOpen,
    onClose,
    course,
    onSave,
}) => {
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [lessons, setLessons] = useState('');
    const [views, setViews] = useState('');
    const [status, setStatus] = useState('draft');
    const [instructorId, setInstructorId] = useState('');
    const [tagsText, setTagsText] = useState('');

    const [saving, setSaving] = useState(false);

    const instructorOptions = useMemo(() => MOCK_INSTRUCTORS, []);

    useEffect(() => {
        if (!isOpen) return;
        setTitle(course?.title || '');
        setDuration(course?.duration || '');
        setLessons(course?.lessons?.toString?.() || '');
        setViews(course?.views?.toString?.() || '');
        setStatus(course?.status || 'draft');
        setInstructorId(course?.instructorId || '');
        setTagsText(toTagsString(course?.tags));
        setSaving(false);
    }, [isOpen, course]);

    if (!isOpen) return null;

    const handleSave = () => {
        const normalizedLessons = Number.parseInt(lessons, 10);
        const normalizedViews = Number.parseInt(views, 10);

        const selectedInstructor = instructorOptions.find(i => i.value === instructorId);

        const updatedCourse = {
            ...course,
            title: title.trim(),
            duration: duration.trim(),
            lessons: Number.isFinite(normalizedLessons) ? normalizedLessons : (course?.lessons || 0),
            views: Number.isFinite(normalizedViews) ? normalizedViews : (course?.views || 0),
            status,
            instructorId,
            instructorName: selectedInstructor?.label || course?.instructorName || '',
            tags: parseTags(tagsText),
        };

        setSaving(true);
        setTimeout(() => {
            onSave?.(updatedCourse);
            setSaving(false);
            onClose?.();
        }, 500);
    };

    const canSave = Boolean(title.trim()) && Boolean(instructorId) && Boolean(duration.trim()) && !saving;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-lg bg-card border border-border bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-semibold text-foreground">Edit Course</h2>
                        <p className="text-sm text-muted-foreground">Update course details and save changes.</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <Input
                            label="Course Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter course title"
                            required
                        />
                    </div>

                    <Select
                        label="Instructor"
                        options={instructorOptions}
                        value={instructorId}
                        onChange={setInstructorId}
                        placeholder="Choose instructor"
                        searchable
                        required
                    />

                    <Select
                        label="Status"
                        options={STATUS_OPTIONS}
                        value={status}
                        onChange={setStatus}
                        placeholder="Select status"
                        required
                    />

                    <Input
                        label="Duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="e.g. 6h 15m"
                        required
                    />

                    <Input
                        label="Lessons"
                        type="number"
                        value={lessons}
                        onChange={(e) => setLessons(e.target.value)}
                        placeholder="e.g. 24"
                        min={0}
                    />

                    <Input
                        label="Views"
                        type="number"
                        value={views}
                        onChange={(e) => setViews(e.target.value)}
                        placeholder="e.g. 890"
                        min={0}
                    />

                    <div className="md:col-span-2">
                        <Input
                            label="Tags"
                            value={tagsText}
                            onChange={(e) => setTagsText(e.target.value)}
                            placeholder="e.g. React, JavaScript, Testing"
                            description="Separate tags with commas"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button variant="outline" onClick={onClose} disabled={saving}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={!canSave} loading={saving}>
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EditCourseModal;
