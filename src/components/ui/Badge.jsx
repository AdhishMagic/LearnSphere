import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
    const variants = {
        default: 'bg-primary/10 text-primary border-primary/20',
        primary: 'bg-primary/10 text-primary border-primary/20',
        secondary: 'bg-secondary text-secondary-foreground border-border',
        success: 'bg-success/10 text-success border-success/20',
        warning: 'bg-warning/10 text-warning border-warning/20',
        danger: 'bg-destructive/10 text-destructive border-destructive/20', // customized for 'danger'
        outline: 'bg-transparent border-border text-foreground',
    };

    const selectedVariant = variants[variant] || variants.default;

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${selectedVariant} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
