import React, { useRef, useState, useEffect } from 'react';
import { X, Upload, FileText, Video, Image as ImageIcon, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LessonEditorModal = ({ isOpen, onClose, onSave, lesson = null, courseId = null }) => {
    const fileInputRef = useRef(null);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        type: 'video',
        duration: '',
        content: '',
        fileName: '',
        isFree: false,
        description: '',
        attachments: []
    });
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState('');

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

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
                    fileName: '',
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
        if (formData.type === 'document' && !formData.content) {
            alert('Please upload a document before saving.');
            return;
        }

        onSave({ ...formData, id: lesson ? lesson.id : (formData.id || Date.now()) });
        onClose();
    };

    const handleFileSelect = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!courseId) {
            return;
        }

        if (!formData.title?.trim()) {
            alert('Please enter a lesson title before uploading.');
            return;
        }

        const token = localStorage.getItem('access_token');
        if (!token) {
            alert('You need to log in to upload files.');
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);
        setUploadStatus('Preparing upload...');
        try {
            let lessonId = formData.id;
            if (!lessonId) {
                setUploadStatus('Creating draft lesson...');
                const lessonResponse = await fetch(`${API_BASE_URL}/api/v1/lessons`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        courseId,
                        title: formData.title.trim(),
                        type: formData.type,
                        description: formData.description || '',
                        allowDownload: false
                    })
                });

                if (!lessonResponse.ok) {
                    const errorData = await lessonResponse.json().catch(() => ({}));
                    const detail = typeof errorData?.detail === 'string' ? errorData.detail : null;
                    const message = detail || errorData?.message || 'Unable to create lesson.';
                    alert(message);
                    return;
                }

                const lessonData = await lessonResponse.json();
                lessonId = lessonData?._id || lessonData?.id;
            }

            if (!lessonId) {
                alert('Unable to create lesson for upload.');
                return;
            }

            let sessionId = formData.uploadSessionId;
            let receivedBytes = 0;

            if (sessionId) {
                setUploadStatus('Checking upload session...');
                const sessionCheck = await fetch(`${API_BASE_URL}/api/v1/uploads/sessions/${sessionId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (sessionCheck.ok) {
                    const sessionData = await sessionCheck.json();
                    if (sessionData?.fileSize === file.size) {
                        receivedBytes = sessionData?.receivedBytes || 0;
                        if (receivedBytes > 0) {
                            const progress = Math.round((receivedBytes / file.size) * 100);
                            setUploadProgress(progress);
                            setUploadStatus('Resuming upload...');
                        }
                        setFormData(prev => ({
                            ...prev,
                            id: lessonId,
                            uploadSessionId: sessionId,
                        }));
                    } else {
                        sessionId = null;
                    }
                } else {
                    sessionId = null;
                }
            }

            if (!sessionId) {
                setUploadStatus('Starting upload session...');
                const sessionResponse = await fetch(`${API_BASE_URL}/api/v1/uploads/sessions`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        courseId,
                        lessonId,
                        fileName: file.name,
                        fileSize: file.size,
                        mimeType: file.type
                    })
                });

                if (!sessionResponse.ok) {
                    const errorData = await sessionResponse.json().catch(() => ({}));
                    const detail = typeof errorData?.detail === 'string' ? errorData.detail : null;
                    const message = detail || errorData?.message || 'Unable to start upload.';
                    alert(message);
                    return;
                }

                const sessionData = await sessionResponse.json();
                sessionId = sessionData?.sessionId;
                receivedBytes = sessionData?.receivedBytes || 0;
                if (!sessionId) {
                    alert('Upload session unavailable.');
                    return;
                }

                setFormData(prev => ({
                    ...prev,
                    id: lessonId,
                    uploadSessionId: sessionId,
                }));
            }

            const chunkSize = 5 * 1024 * 1024;
            const totalChunks = Math.ceil(file.size / chunkSize);
            const startChunk = Math.floor(receivedBytes / chunkSize);

            for (let index = startChunk; index < totalChunks; index += 1) {
                setUploadStatus(`Uploading chunk ${index + 1} of ${totalChunks}...`);
                const start = index * chunkSize;
                const end = Math.min(start + chunkSize, file.size);
                const chunk = file.slice(start, end);

                const chunkPayload = new FormData();
                chunkPayload.append('file', chunk, file.name);

                const chunkResponse = await fetch(
                    `${API_BASE_URL}/api/v1/uploads/sessions/${sessionId}/chunks?chunk_index=${index}`,
                    {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        body: chunkPayload
                    }
                );

                if (!chunkResponse.ok) {
                    const errorData = await chunkResponse.json().catch(() => ({}));
                    const detail = typeof errorData?.detail === 'string' ? errorData.detail : null;
                    const message = detail || errorData?.message || 'Upload failed.';
                    alert(message);
                    return;
                }

                const uploadedBytes = Math.min((index + 1) * chunkSize, file.size);
                const progress = Math.round((uploadedBytes / file.size) * 100);
                setUploadProgress(progress);
            }

            setUploadStatus('Finalizing upload...');
            const completeResponse = await fetch(
                `${API_BASE_URL}/api/v1/uploads/sessions/${sessionId}/complete`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({})
                }
            );

            if (!completeResponse.ok) {
                const errorData = await completeResponse.json().catch(() => ({}));
                const detail = typeof errorData?.detail === 'string' ? errorData.detail : null;
                const message = detail || errorData?.message || 'Unable to finalize upload.';
                alert(message);
                return;
            }

            const completeData = await completeResponse.json();
            const attachmentId = completeData?.attachmentId;
            const contentUrl = attachmentId
                ? `${API_BASE_URL}/api/v1/uploads/attachments/${attachmentId}`
                : '';

            setFormData(prev => ({
                ...prev,
                id: lessonId,
                uploadSessionId: null,
                content: contentUrl,
                fileName: file.name,
            }));
            setUploadProgress(100);
            setUploadStatus('Upload complete');
        } catch (error) {
            const message = typeof error?.message === 'string' ? error.message : 'Unable to upload file.';
            alert(message);
        } finally {
            setIsUploading(false);
        }
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
                                        {formData.fileName || (formData.content ? 'File Uploaded' : `Upload ${formData.type} file`)}
                                    </p>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={handleFileSelect}
                                        disabled={isUploading}
                                    >
                                        {isUploading ? 'Uploading...' : (formData.content ? 'Change File' : 'Select File')}
                                    </Button>
                                    {(isUploading || uploadProgress > 0) && (
                                        <div className="w-full mt-4">
                                            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                                <span>{uploadStatus || 'Uploading...'}</span>
                                                <span>{uploadProgress}%</span>
                                            </div>
                                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-blue-600 transition-all"
                                                    style={{ width: `${uploadProgress}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        accept={formData.type === 'video'
                                            ? 'video/*'
                                            : formData.type === 'document'
                                                ? '.pdf,.doc,.docx,.ppt,.pptx,.txt'
                                                : 'image/*'}
                                    />
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
