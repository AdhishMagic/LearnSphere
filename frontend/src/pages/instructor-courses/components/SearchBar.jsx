import React from 'react';
import Input from '../../../components/ui/Input';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
    return (
        <div className="relative w-full md:max-w-md flex items-center gap-2">
            <div className="relative flex-1">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Search size={16} />
                </div>
                <Input
                    type="search"
                    placeholder="Search courses by name..."
                    className="pl-9 bg-white"
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>
        </div>
    );
};

export default SearchBar;
