import React from 'react';
import { Users, BookOpen, CheckCircle, Clock } from 'lucide-react';

const OverviewCards = ({ stats, onCardClick, selectedFilter }) => {

    const cards = [
        {
            title: 'Total Participants',
            value: stats.total,
            icon: Users,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            filter: 'all',
        },
        {
            title: 'Yet to Start',
            value: stats.yetToStart,
            icon: Clock,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50',
            filter: 'yet-to-start',
        },
        {
            title: 'In Progress',
            value: stats.inProgress,
            icon: BookOpen,
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-50',
            filter: 'in-progress',
        },
        {
            title: 'Completed',
            value: stats.completed,
            icon: CheckCircle,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            filter: 'completed',
        },
        // Using 'completed' instead of 'published'/'unpublished' as in courses, 
        // to match the learner status context.
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {cards.map((card, index) => {
                const Icon = card.icon;
                const isSelected = selectedFilter === card.filter;

                return (
                    <div
                        key={index}
                        onClick={() => onCardClick(card.filter)}
                        className={`bg-card text-card-foreground rounded-lg border shadow-sm p-6 cursor-pointer transition-all duration-200 
                            ${isSelected ? 'ring-2 ring-primary border-primary' : 'hover:shadow-md'}
                        `}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                                <h3 className="text-2xl font-bold mt-2">{card.value}</h3>
                            </div>
                            <div className={`p-3 rounded-full ${card.bgColor}`}>
                                <Icon className={`h-6 w-6 ${card.color}`} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default OverviewCards;
