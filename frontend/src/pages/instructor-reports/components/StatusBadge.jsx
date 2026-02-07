import React from 'react';

const StatusBadge = ({ status }) => {
    const getStatusStyles = () => {
        switch (status) {
            case 'Yet to Start':
                return 'bg-gray-100 text-gray-700 border-gray-300';
            case 'In Progress':
                return 'bg-blue-50 text-blue-700 border-blue-300';
            case 'Completed':
                return 'bg-green-50 text-green-700 border-green-300';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-300';
        }
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles()}`}
        >
            {status}
        </span>
    );
};

export default StatusBadge;
