import React from 'react';
import { Upload, Eye, AlertTriangle, CheckCircle, Users, Mail } from 'lucide-react';
import Button from '../../../components/ui/Button';

const PublishPanel = ({ data, onChange }) => {
    const isReadyToPublish = data.title && data.curriculum?.length > 0;

    // Calculate completeness (simple mock logic)
    const steps = [
        { label: 'Course Title', valid: !!data.title },
        { label: 'Curriculum Content', valid: data.curriculum?.length > 0 },
        { label: 'Description', valid: !!data.description },
        { label: 'Thumbnail', valid: !!data.thumbnail },
    ];

    const completedSteps = steps.filter(s => s.valid).length;
    const totalSteps = steps.length;
    const progress = Math.round((completedSteps / totalSteps) * 100);

    const handlePublishToggle = () => {
        if (!isReadyToPublish) return;
        onChange({ ...data, isPublished: !data.isPublished });
    };

    return (
        <div className="max-w-3xl space-y-8">
            <div>
                <h2 className="text-2xl font-bold mb-1">Publish Course</h2>
                <p className="text-gray-600">
                    Review your course settings and make it live for learners.
                </p>
            </div>

            {/* Publishing Status Card */}
            <div className={`p-6 rounded-lg border ${data.isPublished ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${data.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                            <Upload size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-gray-900">
                                {data.isPublished ? 'Course is Published' : 'Draft Mode'}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {data.isPublished
                                    ? 'Your course is live and visible to learners.'
                                    : 'Only visible to you and other instructors.'}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handlePublishToggle}
                        disabled={!isReadyToPublish}
                        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${data.isPublished ? 'bg-green-600' : 'bg-gray-200'
                            } ${!isReadyToPublish ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                        <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${data.isPublished ? 'translate-x-7' : 'translate-x-1'
                            }`} />
                    </button>
                </div>

                {!data.isPublished && !isReadyToPublish && (
                    <div className="flex items-start gap-3 p-4 bg-amber-50 text-amber-800 rounded-md text-sm">
                        <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium mb-1">Requirements to Publish:</p>
                            <ul className="list-disc pl-4 space-y-1">
                                {!data.title && <li>Add a course title</li>}
                                {(!data.curriculum || data.curriculum.length === 0) && <li>Add at least one lesson or quiz</li>}
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            {/* Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3 mb-2 text-gray-800 font-medium group-hover:text-primary">
                        <Eye size={20} />
                        Preview as Learner
                    </div>
                    <p className="text-sm text-gray-500">See how your course looks to students before publishing.</p>
                </div>

                <div className="p-5 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3 mb-2 text-gray-800 font-medium group-hover:text-primary">
                        <Users size={20} />
                        Manage Attendees
                    </div>
                    <p className="text-sm text-gray-500">Invite specific users or groups to your course.</p>
                </div>

                <div className="p-5 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3 mb-2 text-gray-800 font-medium group-hover:text-primary">
                        <Mail size={20} />
                        Contact Learners
                    </div>
                    <p className="text-sm text-gray-500">Send announcements or emails to enrolled students.</p>
                </div>
            </div>

            {/* Checklist */}
            <div className="mt-8">
                <h4 className="font-medium mb-4">Course Readiness Checklist</h4>
                <div className="space-y-3">
                    {steps.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm">
                            <CheckCircle
                                size={18}
                                className={step.valid ? 'text-green-500' : 'text-gray-300'}
                            />
                            <span className={step.valid ? 'text-gray-700' : 'text-gray-400'}>
                                {step.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PublishPanel;
