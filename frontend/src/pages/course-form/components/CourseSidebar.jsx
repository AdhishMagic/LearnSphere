import React from 'react';
import {
    LayoutDashboard,
    BookOpen,
    FileText,
    Settings,
    HelpCircle,
    Upload
} from 'lucide-react';

const CourseSidebar = ({ activeSection, onNavigate, maxAccessedIndex = 0 }) => {
    const menuItems = [
        { id: 'basics', label: 'Course Basics', icon: LayoutDashboard },
        { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
        { id: 'description', label: 'Description', icon: FileText },
        { id: 'options', label: 'Options & Access', icon: Settings },
        { id: 'publish', label: 'Publish', icon: Upload }, // Removed Quizzes
    ];

    return (
        <aside className="w-64 bg-white border-r h-[calc(100vh-64px)] overflow-y-auto sticky top-16">
            <div className="p-4 border-b">
                <h2 className="font-semibold text-gray-800">Course Setup</h2>
            </div>
            <nav className="p-2 space-y-1">
                {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    const isLocked = index > maxAccessedIndex;

                    return (
                        <button
                            key={item.id}
                            onClick={() => !isLocked && onNavigate(item.id)}
                            disabled={isLocked}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${isActive
                                    ? 'bg-blue-50 text-blue-700'
                                    : isLocked
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            <Icon size={18} />
                            {item.label}
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
};

export default CourseSidebar;
