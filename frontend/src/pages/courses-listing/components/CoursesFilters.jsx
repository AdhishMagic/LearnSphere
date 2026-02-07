import React from 'react';
import { Search } from 'lucide-react';

const CoursesFilters = ({ searchQuery, onSearchChange, selectedTag, onTagChange, availableTags }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => {
                                console.log(`Search query: "${e.target.value}"`);
                                onSearchChange(e.target.value);
                            }}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Tag Filter */}
                <div className="sm:w-64">
                    <select
                        value={selectedTag}
                        onChange={(e) => {
                            console.log(`Tag filter changed to: "${e.target.value}"`);
                            onTagChange(e.target.value);
                        }}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="All Tags">All Tags</option>
                        {availableTags.map((tag) => (
                            <option key={tag} value={tag}>
                                {tag}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default CoursesFilters;
