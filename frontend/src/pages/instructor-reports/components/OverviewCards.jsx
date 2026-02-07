import React from 'react';

const OverviewCards = ({ stats, activeFilter, onCardClick }) => {
    const cards = [
        {
            id: 'all',
            title: 'Total Participants',
            value: stats.totalParticipants,
            icon: '👥',
            color: 'bg-purple-50 border-purple-200 text-purple-700',
            hoverColor: 'hover:bg-purple-100'
        },
        {
            id: 'Yet to Start',
            title: 'Yet to Start',
            value: stats.yetToStart,
            icon: '⏸️',
            color: 'bg-gray-50 border-gray-200 text-gray-700',
            hoverColor: 'hover:bg-gray-100'
        },
        {
            id: 'In Progress',
            title: 'In Progress',
            value: stats.inProgress,
            icon: '▶️',
            color: 'bg-blue-50 border-blue-200 text-blue-700',
            hoverColor: 'hover:bg-blue-100'
        },
        {
            id: 'Completed',
            title: 'Completed',
            value: stats.completed,
            icon: '✅',
            color: 'bg-green-50 border-green-200 text-green-700',
            hoverColor: 'hover:bg-green-100'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {cards.map((card) => {
                const isActive = activeFilter === card.id;
                return (
                    <button
                        key={card.id}
                        onClick={() => {
                            console.log(`Overview card clicked: ${card.title}`);
                            onCardClick(card.id);
                        }}
                        className={`
              p-5 rounded-lg border-2 transition-all cursor-pointer text-left
              ${card.color} ${card.hoverColor}
              ${isActive ? 'ring-2 ring-offset-2 ring-blue-500 shadow-lg' : 'shadow-sm hover:shadow-md'}
            `}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl">{card.icon}</span>
                            {isActive && (
                                <span className="text-xs font-semibold bg-white/70 px-2 py-1 rounded">
                                    Active
                                </span>
                            )}
                        </div>
                        <div className="text-3xl font-bold mb-1">{card.value}</div>
                        <div className="text-sm font-medium opacity-80">{card.title}</div>
                    </button>
                );
            })}
        </div>
    );
};

export default OverviewCards;
