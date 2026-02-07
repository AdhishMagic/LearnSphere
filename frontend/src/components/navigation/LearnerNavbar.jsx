import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen, Search, User, LogOut, Award, Menu, X } from 'lucide-react';
import Button from '../ui/Button';

const LearnerNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path) => {
        return location.pathname === path
            ? "bg-primary/10 text-primary font-medium"
            : "text-muted-foreground hover:bg-muted hover:text-foreground";
    };

    const handleLogout = () => {
        console.log('[Auth] Learner logout');
        navigate('/login-screen');
    };

    const handleNavigation = (path) => {
        navigate(path);
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="border-b border-border bg-card sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-14 sm:h-16 items-center justify-between">
                    {/* Left Section - Logo & Navigation */}
                    <div className="flex items-center gap-4 lg:gap-8">
                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 -ml-2 rounded-lg hover:bg-muted transition-colors"
                            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? (
                                <X size={22} className="text-foreground" />
                            ) : (
                                <Menu size={22} className="text-muted-foreground" />
                            )}
                        </button>

                        {/* Logo */}
                        <Link to="/my-courses" className="flex items-center gap-2">
                            <div className="bg-primary/10 p-1.5 rounded-lg">
                                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                            </div>
                            <span className="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                                LearnSphere
                            </span>
                        </Link>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center gap-1">
                            <Link
                                to="/my-courses"
                                className={`px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${isActive('/my-courses')}`}
                            >
                                <BookOpen size={16} />
                                My Courses
                            </Link>
                            <Link
                                to="/courses"
                                className={`px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${isActive('/courses')}`}
                            >
                                <Search size={16} />
                                Browse Courses
                            </Link>
                        </div>
                    </div>

                    {/* Right Section - Status & User */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Learner Mode Badge - Hidden on mobile */}
                        <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-1.5 rounded-full border border-green-200">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <Award size={14} className="text-green-600" />
                            <span className="text-green-700 font-medium">Learner</span>
                        </div>

                        {/* Mobile badge - Compact */}
                        <div className="lg:hidden flex items-center">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                        </div>

                        {/* User Actions */}
                        <div className="flex items-center gap-1 sm:gap-2 border-l border-border pl-2 sm:pl-4 ml-1 sm:ml-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full hover:bg-primary/10 h-9 w-9 sm:h-10 sm:w-10"
                                title="Profile"
                                onClick={() => handleNavigation('/profile?role=learner')}
                            >
                                <User size={18} className="sm:hidden" />
                                <User size={20} className="hidden sm:block" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full hover:bg-red-50 text-muted-foreground hover:text-red-600 h-9 w-9 sm:h-10 sm:w-10"
                                title="Logout"
                                onClick={handleLogout}
                            >
                                <LogOut size={18} className="sm:hidden" />
                                <LogOut size={20} className="hidden sm:block" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Dropdown */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-border py-3 animate-in slide-in-from-top-2 duration-200">
                        <div className="flex flex-col gap-1">
                            <button
                                onClick={() => handleNavigation('/my-courses')}
                                className={`w-full px-4 py-3 rounded-lg text-sm transition-colors flex items-center gap-3 text-left ${isActive('/my-courses')}`}
                            >
                                <BookOpen size={18} />
                                My Courses
                            </button>
                            <button
                                onClick={() => handleNavigation('/courses')}
                                className={`w-full px-4 py-3 rounded-lg text-sm transition-colors flex items-center gap-3 text-left ${isActive('/courses')}`}
                            >
                                <Search size={18} />
                                Browse Courses
                            </button>
                            <button
                                onClick={() => handleNavigation('/profile?role=learner')}
                                className="w-full px-4 py-3 rounded-lg text-sm transition-colors flex items-center gap-3 text-left text-muted-foreground hover:bg-muted hover:text-foreground"
                            >
                                <User size={18} />
                                Profile
                            </button>
                        </div>

                        {/* Learner badge in mobile menu */}
                        <div className="mt-3 pt-3 border-t border-border px-4">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <Award size={12} className="text-green-600" />
                                <span className="text-green-700 font-medium">Learning Mode</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default LearnerNavbar;
