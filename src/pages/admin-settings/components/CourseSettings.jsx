import React from 'react';

const CourseSettings = ({ data, onChange }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Course Settings</h2>

            <div className="space-y-4">
                {/* Default Visibility */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default Course Visibility</label>
                    <div className="flex space-x-4">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-radio text-indigo-600"
                                name="defaultVisibility"
                                value="everyone"
                                checked={data.defaultVisibility === 'everyone'}
                                onChange={(e) => onChange('defaultVisibility', e.target.value)}
                            />
                            <span className="ml-2 text-gray-700">Everyone</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-radio text-indigo-600"
                                name="defaultVisibility"
                                value="signed_in"
                                checked={data.defaultVisibility === 'signed_in'}
                                onChange={(e) => onChange('defaultVisibility', e.target.value)}
                            />
                            <span className="ml-2 text-gray-700">Signed In Only</span>
                        </label>
                    </div>
                </div>

                {/* Default Access Rule */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Default Access Rule</label>
                    <select
                        value={data.defaultAccessRule}
                        onChange={(e) => onChange('defaultAccessRule', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="open">Open</option>
                        <option value="invitation">Invitation Only</option>
                        <option value="payment">Payment Required</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default CourseSettings;
