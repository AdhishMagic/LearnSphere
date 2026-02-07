import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const CourseOptions = ({ data, onChange, onNext, onNavigate }) => {
    const handleChange = (field, value) => {
        onChange({ ...data, [field]: value });
    };

    // Validation: simple check if values are set (they rely on defaults so mostly always valid)
    // But if payment is selected, price must be legitimate (>=0)
    const isValid = data.visibility && data.access && (data.access !== 'payment' || (data.price !== undefined && data.price >= 0));

    return (
        <div className="max-w-3xl space-y-8 pb-20">
            <div>
                <h2 className="text-2xl font-bold mb-4">Options & Access</h2>
                <p className="text-gray-600 mb-8">
                    Control who can see and enroll in your course.
                </p>
            </div>

            <div className="space-y-8">
                {/* Visibility Section */}
                <div className="bg-white p-6 rounded-lg border">
                    <h3 className="text-lg font-semibold mb-4">Visibility</h3>
                    <p className="text-sm text-gray-500 mb-4">Who can see this course listed in the catalog?</p>

                    <div className="space-y-3">
                        <label className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                            <input
                                type="radio"
                                name="visibility"
                                checked={data.visibility === 'everyone'}
                                onChange={() => handleChange('visibility', 'everyone')}
                                className="w-4 h-4 text-primary"
                            />
                            <div>
                                <span className="block font-medium">Everyone</span>
                                <span className="text-sm text-gray-500">Visible to public (including guests)</span>
                            </div>
                        </label>

                        <label className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                            <input
                                type="radio"
                                name="visibility"
                                checked={data.visibility === 'signed_in'}
                                onChange={() => handleChange('visibility', 'signed_in')}
                                className="w-4 h-4 text-primary"
                            />
                            <div>
                                <span className="block font-medium">Signed In Users Only</span>
                                <span className="text-sm text-gray-500">Visible only to logged-in users</span>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Access Section */}
                <div className="bg-white p-6 rounded-lg border">
                    <h3 className="text-lg font-semibold mb-4">Access Rule</h3>
                    <p className="text-sm text-gray-500 mb-4">How can users enroll in this course?</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {['open', 'invitation', 'payment'].map((option) => (
                            <label
                                key={option}
                                className={`flex items-center justify-center p-4 border rounded-md cursor-pointer transition-all ${data.access === option
                                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                                    : 'hover:bg-gray-50'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="access"
                                    value={option}
                                    checked={data.access === option}
                                    onChange={() => handleChange('access', option)}
                                    className="sr-only"
                                />
                                <span className="capitalize font-medium">{option}</span>
                            </label>
                        ))}
                    </div>

                    {data.access === 'payment' && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-md border animate-in fade-in slide-in-from-top-2">
                            <Input
                                label="Price (USD)"
                                type="number"
                                min="0"
                                placeholder="0.00"
                                value={data.price}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    handleChange('price', val === '' ? '' : parseFloat(val));
                                }}
                                helperText="Set the price for your course."
                            />
                        </div>
                    )}

                    {data.access === 'invitation' && (
                        <div className="mt-4 p-4 bg-yellow-50 text-yellow-800 rounded-md border border-yellow-200 text-sm">
                            Only users you explicitly invite will be able to access this course.
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="flex justify-between items-center pt-8 border-t">
                <Button
                    variant="outline"
                    onClick={() => onNavigate('description')}
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
                </div>
            </div>
        </div>
    );
};

export default CourseOptions;
