import React from 'react';
import Button from '../../../components/ui/Button';
import { List, LayoutGrid } from 'lucide-react';

const ViewToggle = ({ currentView, onToggle }) => {
    return (
        <div className="flex items-center p-1 bg-muted/20 rounded-lg border">
            <Button
                variant={currentView === 'grid' ? 'white' : 'ghost'}
                size="sm"
                onClick={() => onToggle('grid')}
                aria-label="Grid View"
                className={`h-8 w-8 p-0 ${currentView === 'grid' ? 'bg-white shadow-sm' : 'text-muted-foreground'}`}
            >
                <LayoutGrid size={16} />
            </Button>
            <Button
                variant={currentView === 'list' ? 'white' : 'ghost'}
                size="sm"
                onClick={() => onToggle('list')}
                aria-label="List View"
                className={`h-8 w-8 p-0 ${currentView === 'list' ? 'bg-white shadow-sm' : 'text-muted-foreground'}`}
            >
                <List size={16} />
            </Button>
        </div>
    );
};

export default ViewToggle;
