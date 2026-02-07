import React from 'react';

const GamificationSettings = ({ data, onToggle }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Gamification</h2>

            <div className="space-y-4">
                {/* Enable Points */}
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Enable Points System</span>
                    <button
                        onClick={() => onToggle('enablePoints')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${data.enablePoints ? 'bg-indigo-600' : 'bg-gray-200'
                            }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${data.enablePoints ? 'translate-x-6' : 'translate-x-1'
                                }`}
                        />
                    </button>
                </div>

                {/* Enable Badges */}
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Enable Badges</span>
                    <button
                        onClick={() => onToggle('enableBadges')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${data.enableBadges ? 'bg-indigo-600' : 'bg-gray-200'
                            }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${data.enableBadges ? 'translate-x-6' : 'translate-x-1'
                                }`}
                        />
                    </button>
                </div>

                {/* Badge Thresholds */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Badge Thresholds (Read-only)</label>
                    <div className="border border-gray-200 rounded-md overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points Required</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.badgeThresholds.map((threshold, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{threshold.level}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{threshold.points}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GamificationSettings;
