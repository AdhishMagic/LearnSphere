import React from 'react';

const TimeRangeSelector = ({ selectedRange, onRangeChange }) => {
    const ranges = [
        { id: 'today', label: 'Today' },
        { id: 'week', label: 'This Week' },
        { id: 'month', label: 'This Month' },
        { id: 'year', label: 'This Year' }
    ];

    return (
        <div className="bg-card border border-border rounded-lg p-1 flex">
            {ranges.map((range) => (
                <button
                    key={range.id}
                    onClick={() => onRangeChange(range.id)}
                    className={`px-3 md:px-4 py-1.5 rounded-md text-sm font-medium transition-all ${selectedRange === range.id
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                >
                    {range.label}
                </button>
            ))}
        </div>
    );
};

export default TimeRangeSelector;
