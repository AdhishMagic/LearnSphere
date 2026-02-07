import React, { useState, useEffect } from 'react';
import { X, Upload, FileText, Video, Image as ImageIcon, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LessonEditorModal = ({ isOpen, onClose, onSave, lesson = null }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        type: 'video',
        duration: '',
        content: '',
        isFree: false,
        description: '',
        attachments: []
    });

    useEffect(() => {
        if (isOpen) {
            setStep(1);
            if (lesson) {
                setFormData(lesson);
            } else {
                setFormData({
                    title: '',
                    type: 'video',
                    duration: '',
                    content: '',
                    isFree: false,
                    description: '',
                    attachments: []
                });
            }
        }
    }, [lesson, isOpen]);

    if (!isOpen) return null;

    const isStep1Valid = formData.title && formData.duration;
    const isStep2Valid = true; // Description is optional
    const isStep3Valid = true; // Attachments are optional

    const handleNext = () => {
        if (step === 1 && isStep1Valid) setStep(2);
        if (step === 2 && isStep2Valid) setStep(3);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = () => {
        onSave({ ...formData, id: lesson ? lesson.id : Date.now() });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg border flex flex-col h-[600px]">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-semibold">
                        {lesson ? 'Edit Lesson' : 'Add New Lesson'}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={20} />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center justify-center py-4 bg-gray-50 border-b">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === s ? 'bg-blue-600 text-white' :
                                    step > s ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                                }`}>
                                {step > s ? <Check size={16} /> : s}
                            </div>
                            {s < 3 && <div className={`w-12 h-1 ${step > s ? 'bg-green-500' : 'bg-gray-200'}`} />}
                        </div>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 overflow-y-auto">
                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <h3 className="text-lg font-medium mb-4">Step 1: content</h3>
                            <Input
                                label="Lesson Title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                                placeholder="e.g. Introduction to Variables"
                            />

                            <div>
                                <label className="block text-sm font-medium mb-2">Lesson Type</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { id: 'video', label: 'Video', icon: Video },
                                        { id: 'document', label: 'Document', icon: FileText },
                                        { id: 'image', label: 'Image', icon: ImageIcon },
                                    ].map((type) => {
                                        const Icon = type.icon;
                                        return (
                                            <button
                                                key={type.id}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, type: type.id })}
                                                className={`flex flex-col items-center justify-center p-4 border rounded-md transition-colors ${formData.type === type.id
                                                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                                                        : 'hover:bg-gray-50 text-gray-600'
                                                    }`}
                                            >
                                                <Icon size={24} className="mb-2" />
                                                <span className="text-sm font-medium">{type.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Duration"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                    placeholder="e.g. 10:00"
                                    helperText="Estimated time to complete"
                                />

                                <div className="flex items-center pt-8">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.isFree}
                                            onChange={(e) => setFormData({ ...formData, isFree: e.target.checked })}
                                            className="rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <span className="text-sm font-medium">Free Preview</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <h3 className="text-lg font-medium mb-4">Step 2: Description</h3>
                            <div>
                                <label className="block text-sm font-medium mb-2">Lesson Description (Optional)</label>
                                <textarea
                                    className="w-full px-3 py-2 border rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="Briefly describe what this lesson covers..."
                                    value={formData.description || ''}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <h3 className="text-lg font-medium mb-4">Step 3: Attachments</h3>
                            <div>
                                <label className="block text-sm font-medium mb-2">Upload Content</label>
                                <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center bg-gray-50">
                                    <Upload size={32} className="text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-500 mb-1">
                                        {formData.content ? 'File Selected' : `Upload ${formData.type} file`}
                                    </p>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setFormData({ ...formData, content: `uploaded_file_${Date.now()}` })}
                                    >
                                        {formData.content ? 'Change File' : 'Select File'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t bg-gray-50 flex justify-between rounded-b-lg">
                    <Button
                        variant="ghost"
                        onClick={step === 1 ? onClose : handleBack}
                    >
                        {step === 1 ? 'Cancel' : 'Back'}
                    </Button>

                    {step < 3 ? (
                        <Button onClick={handleNext} disabled={step === 1 && !isStep1Valid}>
                            Next <ChevronRight size={16} className="ml-2" />
                        </Button>
                    ) : (
                        <Button onClick={handleSubmit}>
                            Save Lesson
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LessonEditorModal;
