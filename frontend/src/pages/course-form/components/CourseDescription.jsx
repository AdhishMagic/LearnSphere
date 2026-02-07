import React from 'react';
import { Plus, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../../../components/ui/Button';

const CourseDescription = ({ data, onChange, onNext, onNavigate }) => {
    const handleChange = (field, value) => {
        onChange({ ...data, [field]: value });
    };

    const handleAddOutcome = () => {
        const newOutcomes = [...(data.outcomes || []), ''];
        handleChange('outcomes', newOutcomes);
    };

    const handleOutcomeChange = (index, value) => {
        const newOutcomes = [...(data.outcomes || [])];
        newOutcomes[index] = value;
        handleChange('outcomes', newOutcomes);
    };

    const handleDeleteOutcome = (index) => {
        const newOutcomes = data.outcomes.filter((_, i) => i !== index);
        handleChange('outcomes', newOutcomes);
    };

    // Validation: Description required and at least one non-empty outcome
    const isValid = data.description &&
        data.description.trim().length > 5 &&
        data.outcomes &&
        data.outcomes.length > 0 &&
        data.outcomes.some(o => o.trim().length > 0);

    return (
        <div className="max-w-3xl space-y-8 pb-20">
            <div>
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p className="text-gray-600 mb-8">
                    Tell learners what your course is about and what they will gain.
                </p>
            </div>

            <div className="space-y-8">
                <div>
                    <label className="block text-sm font-medium mb-2">Course Overview <span className="text-red-500">*</span></label>
                    <textarea
                        className="w-full px-3 py-2 border rounded-md h-40 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Detailed description of your course..."
                        value={data.description || ''}
                        onChange={(e) => handleChange('description', e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1">At least 5 characters required.</p>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium">What will learners gain? <span className="text-red-500">*</span></label>
                        <Button size="sm" variant="ghost" onClick={handleAddOutcome}>
                            <Plus size={16} className="mr-1" /> Add Item
                        </Button>
                    </div>
                    <div className="space-y-3">
                        {data.outcomes?.map((outcome, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="e.g. Build real-world apps"
                                    value={outcome}
                                    onChange={(e) => handleOutcomeChange(index, e.target.value)}
                                />
                                <button
                                    onClick={() => handleDeleteOutcome(index)}
                                    className="p-2 text-gray-400 hover:text-red-500"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                        {(!data.outcomes || data.outcomes.length === 0) && (
                            <p className="text-sm text-gray-500 italic">No outcomes added used.</p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Requirements</label>
                    <textarea
                        className="w-full px-3 py-2 border rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="e.g. Basic JavaScript knowledge..."
                        value={data.requirements?.join('\n') || ''}
                        onChange={(e) => handleChange('requirements', e.target.value.split('\n'))}
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter each requirement on a new line.</p>
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="flex justify-between items-center pt-8 border-t">
                <Button
                    variant="outline"
                    onClick={() => onNavigate('curriculum')}
                >
                    <ChevronLeft size={16} className="mr-2" /> Back
                </Button>

                <div className="flex flex-col items-end">
                    <Button
                        onClick={onNext}
                        disabled={!isValid}
                    >
                        Next <ChevronRight size={16} className="ml-2" />
                    </Button>
                    {!isValid && (
                        <p className="text-xs text-red-500 mt-2">
                            Description and at least one outcome required.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseDescription;
