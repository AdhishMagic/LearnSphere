import React from 'react';

const AccessControlSettings = ({ data, onToggle }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Access Control</h2>

            <div className="space-y-4">
                {/* Guest Course Visibility */}
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Allow Guest Course Visibility</span>
                    <button
                        onClick={() => onToggle('guestCourseVisibility')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${data.guestCourseVisibility ? 'bg-indigo-600' : 'bg-gray-200'
                            }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${data.guestCourseVisibility ? 'translate-x-6' : 'translate-x-1'
                                }`}
                        />
                    </button>
                </div>

                {/* Public Registration */}
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Allow Public Registration</span>
                    <button
                        onClick={() => onToggle('publicRegistration')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${data.publicRegistration ? 'bg-indigo-600' : 'bg-gray-200'
                            }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${data.publicRegistration ? 'translate-x-6' : 'translate-x-1'
                                }`}
                        />
                    </button>
                </div>

                {/* Require Email Verification */}
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Require Email Verification</span>
                    <button
                        onClick={() => onToggle('requireEmailVerification')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${data.requireEmailVerification ? 'bg-indigo-600' : 'bg-gray-200'
                            }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${data.requireEmailVerification ? 'translate-x-6' : 'translate-x-1'
                                }`}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccessControlSettings;
