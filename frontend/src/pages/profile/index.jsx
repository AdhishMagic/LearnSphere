import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, GraduationCap, ArrowLeft, Shield } from 'lucide-react';
import LearnerNavbar from '../../components/navigation/LearnerNavbar';
import InstructorNavbar from '../../components/navigation/InstructorNavbar';
import PersonalInfoTab from './components/PersonalInfoTab';
import BecomeInstructorTab from './components/BecomeInstructorTab';
import AdminControlsTab from './components/AdminControlsTab';
import { mockUsers } from './mockData';
import Button from '../../components/ui/Button';

const ProfilePage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine role from URL query param or default to learner
    const searchParams = new URLSearchParams(location.search);
    const urlRole = searchParams.get('role');

    // Get initial user based on role
    const getInitialUser = () => {
        if (urlRole === 'admin') return { ...mockUsers.admin };
        if (urlRole === 'instructor') return { ...mockUsers.instructor };
        return { ...mockUsers.learner };
    };

    const [user, setUser] = useState(getInitialUser());
    const [activeTab, setActiveTab] = useState('personal');

    const tabs = [
        { id: 'personal', label: 'Personal Info', icon: User },
        // Show "Admin Controls" tab for admins
        ...(user.role === 'admin' ? [{
            id: 'admin',
            label: 'Admin Controls',
            icon: Shield
        }] : []),
        // Only show "Become Instructor" tab for learners, or "Instructor Profile" for instructors
        ...(user.role !== 'admin' ? [{
            id: 'instructor',
            label: user.role === 'instructor' ? 'Instructor Profile' : 'Become Instructor',
            icon: GraduationCap
        }] : []),
    ];

    const handleUpdateUser = (updatedUser) => {
        setUser(updatedUser);
        console.log('[Profile] User updated:', updatedUser);
    };

    const handleSubmitApplication = (applicationData) => {
        setUser(prev => ({
            ...prev,
            instructorApplication: applicationData
        }));
        console.log('[Profile] Instructor application submitted:', applicationData);
    };

    const handleBecomeInstructor = () => {
        // Transform learner to instructor
        setUser(prev => ({
            ...prev,
            role: 'instructor',
            instructorData: {
                degree: prev.instructorApplication?.degree || '',
                institution: prev.instructorApplication?.institution || '',
                yearsOfExperience: prev.instructorApplication?.experience || '0-1',
                specializations: prev.instructorApplication?.specializations || [],
                certifications: prev.instructorApplication?.certifications || [],
                linkedIn: prev.instructorApplication?.linkedIn || '',
                portfolio: prev.instructorApplication?.portfolio || '',
                coursesCreated: 0,
                totalStudents: 0,
                averageRating: 0
            },
            instructorApplication: {
                ...prev.instructorApplication,
                status: 'approved'
            }
        }));
        console.log('[Profile] User promoted to instructor');
    };

    const getBackRoute = () => {
        switch (user.role) {
            case 'admin':
                return '/admin-dashboard';
            case 'instructor':
                return '/instructor/courses';
            default:
                return '/my-courses';
        }
    };

    const renderNavbar = () => {
        switch (user.role) {
            case 'admin':
                // Admin uses a simplified header since they typically use sidebar
                return (
                    <nav className="border-b border-border bg-card sticky top-0 z-50 shadow-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex h-14 sm:h-16 items-center justify-between">
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <button
                                        onClick={() => navigate(getBackRoute())}
                                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                                        aria-label="Go back"
                                    >
                                        <ArrowLeft size={20} className="text-foreground" />
                                    </button>
                                    <div className="flex items-center gap-2">
                                        <div className="bg-destructive/10 p-1.5 rounded-lg">
                                            <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-destructive" />
                                        </div>
                                        <span className="text-lg sm:text-xl font-bold text-foreground">Admin Profile</span>
                                    </div>
                                </div>
                                <div className="hidden sm:flex items-center gap-2 text-sm bg-destructive/10 px-3 py-1.5 rounded-full border border-destructive/20">
                                    <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                                    <span className="text-destructive font-medium">Admin</span>
                                </div>
                            </div>
                        </div>
                    </nav>
                );
            case 'instructor':
                return <InstructorNavbar />;
            default:
                return <LearnerNavbar />;
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {renderNavbar()}

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* Page Header */}
                <div className="mb-6 sm:mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        {user.role !== 'admin' && (
                            <button
                                onClick={() => navigate(getBackRoute())}
                                className="p-2 rounded-lg hover:bg-muted transition-colors"
                                aria-label="Go back"
                            >
                                <ArrowLeft size={20} className="text-foreground" />
                            </button>
                        )}
                        <h1 className="text-xl sm:text-2xl font-bold text-foreground">My Profile</h1>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground">Manage your account settings and preferences</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 sm:gap-2 mb-6 border-b border-border overflow-x-auto scrollbar-hide">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-3 sm:px-4 py-3 font-medium text-sm transition-colors relative whitespace-nowrap min-w-fit ${activeTab === tab.id
                                    ? 'text-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <tab.icon size={18} />
                            <span className="hidden sm:inline">{tab.label}</span>
                            <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                            {activeTab === tab.id && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="animate-in fade-in duration-300">
                    {activeTab === 'personal' && (
                        <PersonalInfoTab
                            user={user}
                            onUpdateUser={handleUpdateUser}
                        />
                    )}
                    {activeTab === 'admin' && (
                        <AdminControlsTab user={user} />
                    )}
                    {activeTab === 'instructor' && (
                        <BecomeInstructorTab
                            user={user}
                            onSubmitApplication={handleSubmitApplication}
                            onBecomeInstructor={handleBecomeInstructor}
                        />
                    )}
                </div>

            </main>
        </div>
    );
};

export default ProfilePage;
