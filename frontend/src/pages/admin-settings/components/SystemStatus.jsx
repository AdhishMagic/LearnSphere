import React from 'react';

const SystemStatus = ({ data }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">System Status</h2>

            <div className="space-y-4">
                {/* Platform Status */}
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Platform Status</span>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${data.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {data.status}
                    </span>
                </div>

                {/* Last Updated */}
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Last Updated</span>
                    <span className="text-sm text-gray-500">{formatDate(data.lastUpdated)}</span>
                </div>
            </div>
        </div>
    );
};

export default SystemStatus;
