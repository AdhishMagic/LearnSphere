import React from 'react';
import { ChevronRight } from 'lucide-react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const CourseBasics = ({ data, onChange, onNext }) => {
    const handleChange = (field, value) => {
        onChange({ ...data, [field]: value });
    };

    const isValid = data.title && data.subtitle;

    return (
        <div className="max-w-3xl space-y-8 pb-20">
            <div>
                <h2 className="text-2xl font-bold mb-4">Course Basics</h2>
                <p className="text-gray-600 mb-8">
                    The foundational information for your course. This is what learners will see first.
                </p>
            </div>

            <div className="space-y-6">
                <Input
                    label="Course Title"
                    value={data.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="e.g. Complete React Developer Course"
                    helperText="A clear, catchy title for your course."
                    required
                />

                <Input
                    label="Subtitle"
                    value={data.subtitle || ''}
                    onChange={(e) => handleChange('subtitle', e.target.value)}
                    placeholder="e.g. Learn React from scratch..."
                    helperText="A short snippet that appears under the title."
                    required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Course Thumbnail</label>
                        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer">
                            {data.thumbnail ? (
                                <div className="relative w-full aspect-video rounded overflow-hidden">
                                    <img src={data.thumbnail} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            ) : (
                                <div className="text-gray-500">
                                    <span className="block text-sm">Click to upload image</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">Tags</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="React, Frontend, Web Dev"
                                value={data.tags?.join(', ') || ''}
                                onChange={(e) => handleChange('tags', e.target.value.split(',').map(t => t.trim()))}
                            />
                            <p className="text-xs text-gray-500 mt-1">Separate tags with commas.</p>
                        </div>

                        <Input
                            label="Course Website URL"
                            value={data.website || ''}
                            onChange={(e) => handleChange('website', e.target.value)}
                            placeholder="https://..."
                            disabled={!data.isPublished}
                            helperText="Enabled only when course is published."
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="flex justify-end pt-8 border-t">
                <div className="flex flex-col items-end">
                    <Button
                        onClick={onNext}
                        disabled={!isValid}
                    >
                        Next <ChevronRight size={16} className="ml-2" />
                    </Button>
                    {!isValid && (
                        <p className="text-xs text-red-500 mt-2">
                            Please fill in all required fields to continue.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseBasics;
