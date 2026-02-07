import React from 'react';
import { Search } from 'lucide-react';

const CoursesFilters = ({ searchQuery, onSearchChange, selectedTag, onTagChange, availableTags }) => {
    return (
        <div className="bg-card border border-border rounded-lg p-3 sm:p-4 mb-6 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {/* Search Input */}
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 sm:w-5 sm:h-5" />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => {
                                console.log(`Search query: "${e.target.value}"`);
                                onSearchChange(e.target.value);
                            }}
                            className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-border rounded-lg text-sm bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-primary transition-colors"
                        />
                    </div>
                </div>

                {/* Tag Filter */}
                <div className="sm:w-56 lg:w-64">
                    <select
                        value={selectedTag}
                        onChange={(e) => {
                            console.log(`Tag filter changed to: "${e.target.value}"`);
                            onTagChange(e.target.value);
                        }}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg text-sm bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-primary transition-colors cursor-pointer"
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
