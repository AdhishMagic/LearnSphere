import React from 'react';

const GeneralSettings = ({ data, onToggle, onChange }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">General Platform Settings</h2>

            <div className="space-y-4">
                {/* Platform Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Platform Name</label>
                    <input
                        type="text"
                        value={data.platformName}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                    />
                </div>

                {/* Maintenance Mode */}
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Maintenance Mode</span>
                    <button
                        onClick={() => onToggle('maintenanceMode')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${data.maintenanceMode ? 'bg-indigo-600' : 'bg-gray-200'
                            }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${data.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                                }`}
                        />
                    </button>
                </div>

                {/* Default Language */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Default Language (UI Only)</label>
                    <select
                        value={data.defaultLanguage}
                        onChange={(e) => onChange('defaultLanguage', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="English (US)">English (US)</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default GeneralSettings;
