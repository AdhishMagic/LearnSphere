import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, User, Settings, LogOut } from 'lucide-react';
import Button from '../../../components/ui/Button';

const InstructorNavbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? "bg-accent/10 text-accent font-medium bg-blue-50" : "text-muted-foreground hover:bg-accent/5 hover:text-foreground";
    };

    return (
        <nav className="border-b bg-card sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="bg-primary/10 p-1.5 rounded-lg">
                                <LayoutDashboard className="h-6 w-6 text-primary" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">LearnSphere</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-1">
                            <Link
                                to="/instructor/courses"
                                className={`px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2 ${isActive('/instructor/courses')}`}
                            >
                                <LayoutDashboard size={16} />
                                My Courses
                            </Link>
                            <Link
                                to="/instructor/reports"
                                className={`px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2 ${isActive('/instructor/reports')}`}
                            >
                                <FileText size={16} />
                                Reports
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Instructor Mode
                        </div>

                        <div className="flex items-center gap-2 border-l pl-4 ml-2">
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <User size={20} />
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <Settings size={20} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default InstructorNavbar;
