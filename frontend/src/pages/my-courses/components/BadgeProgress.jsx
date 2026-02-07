import React from 'react';
import { getBadgeLevel, getNextBadge, getBadgeProgress } from '../mockData';

const BadgeProgress = ({ points }) => {
    const currentBadge = getBadgeLevel(points);
    const nextBadge = getNextBadge(points);
    const progress = getBadgeProgress(points);

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4">
            {/* Current Badge */}
            <div className="flex items-center gap-3 mb-4">
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${currentBadge.color}20` }}
                >
                    {currentBadge.icon}
                </div>
                <div>
                    <p className="text-sm text-gray-500">Current Badge</p>
                    <p
                        className="font-bold text-lg"
                        style={{ color: currentBadge.color }}
                    >
                        {currentBadge.name}
                    </p>
                </div>
            </div>

            {/* Progress to Next Badge */}
            {nextBadge ? (
                <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">
                            Progress to <span className="font-medium">{nextBadge.name}</span>
                        </span>
                        <span className="font-semibold text-gray-900">{progress}%</span>
                    </div>
                    <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all duration-700 ease-out"
                            style={{
                                width: `${progress}%`,
                                backgroundColor: nextBadge.color
                            }}
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        {nextBadge.minPoints - points} more points to reach {nextBadge.name}
                    </p>
                </div>
            ) : (
                <div className="text-center py-2">
                    <p className="text-sm text-gray-600">
                        🎉 You've reached the highest badge level!
                    </p>
                </div>
            )}
        </div>
    );
};

export default BadgeProgress;
