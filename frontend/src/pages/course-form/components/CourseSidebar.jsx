import React from 'react';
import {
    LayoutDashboard,
    BookOpen,
    FileText,
    Settings,
    Upload,
    Lock,
    Check,
    X,
    Menu
} from 'lucide-react';

const CourseSidebar = ({
    activeSection,
    onNavigate,
    maxAccessedIndex = 0,
    isOpen = true,
    onClose
}) => {
    const menuItems = [
        { id: 'basics', label: 'Course Basics', icon: LayoutDashboard },
        { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
        { id: 'description', label: 'Description', icon: FileText },
        { id: 'options', label: 'Options & Access', icon: Settings },
        { id: 'publish', label: 'Publish', icon: Upload },
    ];

    const handleNavigate = (id, isLocked) => {
        if (isLocked) return;
        onNavigate(id);
        // Close on mobile after navigation
        if (onClose && window.innerWidth < 768) {
            onClose();
        }
    };

    const sidebarContent = (
        <>
            {/* Header */}
            <div className="p-4 md:p-5 border-b border-border bg-card">
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-foreground text-base">Course Setup</h2>
                    {/* Close button on mobile */}
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="md:hidden p-1.5 rounded-lg hover:bg-muted transition-colors"
                            aria-label="Close sidebar"
                        >
                            <X size={18} className="text-muted-foreground" />
                        </button>
                    )}
                </div>
                {/* Progress indicator */}
                <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                        <span>Progress</span>
                        <span>{Math.round(((maxAccessedIndex + 1) / menuItems.length) * 100)}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary rounded-full transition-all duration-300"
                            style={{ width: `${((maxAccessedIndex + 1) / menuItems.length) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="p-2 md:p-3 space-y-1 flex-1 overflow-y-auto">
                {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    const isLocked = index > maxAccessedIndex;
                    const isCompleted = index < maxAccessedIndex;

                    return (
                        <button
                            key={item.id}
                            onClick={() => handleNavigate(item.id, isLocked)}
                            disabled={isLocked}
                            aria-current={isActive ? 'step' : undefined}
                            className={`
                                w-full flex items-center gap-3 px-3 py-3 md:py-2.5 
                                text-sm font-medium rounded-lg
                                transition-all duration-150
                                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                                ${isActive
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : isLocked
                                        ? 'text-muted-foreground/50 cursor-not-allowed'
                                        : 'text-card-foreground hover:bg-muted active:scale-[0.98]'
                                }
                            `}
                        >
                            {/* Step indicator */}
                            <span className={`
                                w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold
                                ${isActive
                                    ? 'bg-primary-foreground/20 text-primary-foreground'
                                    : isCompleted
                                        ? 'bg-success/10 text-success'
                                        : isLocked
                                            ? 'bg-muted text-muted-foreground/50'
                                            : 'bg-muted text-muted-foreground'
                                }
                            `}>
                                {isCompleted ? <Check size={12} /> : isLocked ? <Lock size={10} /> : index + 1}
                            </span>

                            {/* Icon and label */}
                            <Icon size={18} className="flex-shrink-0" />
                            <span className="truncate">{item.label}</span>

                            {/* Completed indicator */}
                            {isCompleted && !isActive && (
                                <Check size={14} className="ml-auto text-success flex-shrink-0" />
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Footer help text */}
            <div className="p-3 md:p-4 border-t border-border bg-muted/30">
                <p className="text-xs text-muted-foreground text-center">
                    Complete each section to unlock the next step
                </p>
            </div>
        </>
    );

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar - Desktop */}
            <aside className="hidden md:flex md:flex-col w-64 lg:w-72 bg-card border-r border-border h-[calc(100vh-120px)] overflow-hidden sticky top-[120px]">
                {sidebarContent}
            </aside>

            {/* Sidebar - Mobile drawer */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-card border-r border-border
                    flex flex-col
                    transform transition-transform duration-200 ease-out
                    md:hidden
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                {sidebarContent}
            </aside>
        </>
    );
};

export default CourseSidebar;
