import { Checkbox } from '../../../components/ui/Checkbox';
import { X } from 'lucide-react';
import Button from '../../../components/ui/Button';

const ColumnSelector = ({ columns, onToggleColumn, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="relative w-80 bg-background border-l shadow-xl h-full p-6 animate-in slide-in-from-right duration-200">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Customize Columns</h3>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="space-y-4">
                    {columns.map((column) => (
                        <div key={column.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={`col-${column.id}`}
                                checked={column.visible}
                                onChange={() => onToggleColumn(column.id)}
                            />
                            <label
                                htmlFor={`col-${column.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                                {column.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ColumnSelector;
