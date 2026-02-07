import React from 'react';
import BadgeProgress from './BadgeProgress';
import { getBadgeLevel } from '../mockData';

const ProfilePanel = ({ learner }) => {
    const currentBadge = getBadgeLevel(learner.points);

    return (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-center">
                {/* Avatar */}
                <div className="relative inline-block mb-4">
                    <img
                        src={learner.avatar}
                        alt={learner.name}
                        className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                    {/* Badge icon overlay */}
                    <div
                        className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-lg shadow-md"
                        style={{ backgroundColor: currentBadge.color }}
                    >
                        {currentBadge.icon}
                    </div>
                </div>

                {/* Name */}
                <h2 className="text-xl font-bold text-white mb-1">
                    {learner.name}
                </h2>
                <p className="text-blue-100 text-sm">
                    {learner.email}
                </p>
            </div>

            {/* Stats */}
            <div className="px-6 py-5">
                {/* Points Display */}
                <div className="flex items-center justify-center gap-2 mb-5 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
                    <span className="text-3xl">⭐</span>
                    <div className="text-center">
                        <p className="text-3xl font-bold text-amber-600">{learner.points}</p>
                        <p className="text-sm text-amber-700 font-medium">Total Points</p>
                    </div>
                </div>

                {/* Badge Progress */}
                <BadgeProgress points={learner.points} />

                {/* Quick Stats */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-blue-50 rounded-xl">
                        <p className="text-2xl font-bold text-blue-600">4</p>
                        <p className="text-xs text-blue-700">Enrolled</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-xl">
                        <p className="text-2xl font-bold text-green-600">1</p>
                        <p className="text-xs text-green-700">Completed</p>
                    </div>
                </div>
            </div>

            {/* Motivational Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <p className="text-sm text-gray-600 text-center">
                    🚀 Keep learning to level up your badge!
                </p>
            </div>
        </div>
    );
};

export default ProfilePanel;
