import React from 'react';

const EmptyState = () => {
    return (
        <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search or filters to find what you're looking for.</p>
        </div>
    );
};

export default EmptyState;
