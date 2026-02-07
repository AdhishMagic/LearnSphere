import React from 'react';
import Badge from '../../../components/ui/Badge';

const StatusBadge = ({ status }) => {
    let variant = 'default';
    let label = status;

    switch (status) {
        case 'completed':
            variant = 'success';
            label = 'Completed';
            break;
        case 'in-progress':
            variant = 'warning'; // Blue usually, but using warning for now to stand out, or custom
            label = 'In Progress';
            break;
        case 'yet-to-start':
            variant = 'secondary';
            label = 'Yet to Start';
            break;
        default:
            variant = 'outline';
            label = status;
    }

    // Custom overrides if Badge variants don't match exactly desired colors, 
    // but using semantic variants is better.
    // 'in-progress' often blue. If 'warning' is yellow/orange, that works too.

    return (
        <Badge variant={variant}>
            {label}
        </Badge>
    );
};

export default StatusBadge;
