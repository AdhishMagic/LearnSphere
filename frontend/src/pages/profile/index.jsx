import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, GraduationCap, ArrowLeft, Shield } from 'lucide-react';
import LearnerNavbar from '../../components/navigation/LearnerNavbar';
import InstructorNavbar from '../../components/navigation/InstructorNavbar';
import PersonalInfoTab from './components/PersonalInfoTab';
import BecomeInstructorTab from './components/BecomeInstructorTab';
import AdminControlsTab from './components/AdminControlsTab';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('personal');

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) {
                alert('You need to log in to view your profile.');
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/api/v1/profile/me`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    const message = errorData?.detail || 'Unable to load profile. Please try again.';
                    alert(message);
                    setIsLoading(false);
                    return;
                }

                const data = await response.json();
                setUser(data);
            } catch (error) {
                alert('Unable to load profile. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [API_BASE_URL]);

    const tabs = [
        { id: 'personal', label: 'Personal Info', icon: User },
        // Show "Admin Controls" tab for admins
        ...(user?.role === 'admin' ? [{
            id: 'admin',
            label: 'Admin Controls',
            icon: Shield
        }] : []),
        // Only show "Become Instructor" tab for learners, or "Instructor Profile" for instructors
        ...(user?.role !== 'admin' ? [{
            id: 'instructor',
            label: user?.role === 'instructor' ? 'Instructor Profile' : 'Become Instructor',
            icon: GraduationCap
        }] : []),
    ];

    const handleUpdateUser = async (updatedUser) => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            alert('You need to log in to update your profile.');
            return;
        }

        const payload = {
            firstName: updatedUser?.firstName,
            lastName: updatedUser?.lastName,
            phone: updatedUser?.phone,
            avatar: updatedUser?.avatar,
            bio: updatedUser?.bio,
            location: updatedUser?.location
        };

        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/profile/me`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const message = errorData?.detail || 'Unable to update profile. Please try again.';
                alert(message);
                return;
            }

            const data = await response.json();
            setUser(data);
        } catch (error) {
            alert('Unable to update profile. Please try again.');
        }
    };

    const handleSubmitApplication = async (applicationData) => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            alert('You need to log in to submit an application.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/profile/instructor/apply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(applicationData)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const message = errorData?.detail || 'Unable to submit application. Please try again.';
                alert(message);
                return;
            }

            const data = await response.json();
            setUser(data);
        } catch (error) {
            alert('Unable to submit application. Please try again.');
        }
    };

    const handleApproveInstructor = async (userId) => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            alert('You need to log in to approve instructors.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/profile/instructor/approve/${userId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const message = errorData?.detail || 'Unable to approve application. Please try again.';
                alert(message);
                return null;
            }

            const data = await response.json();
            return data;
        } catch (error) {
            alert('Unable to approve application. Please try again.');
            return null;
        }
    };

    const getBackRoute = () => {
        switch (user?.role) {
            case 'admin':
                return '/admin-dashboard';
            case 'instructor':
                return '/instructor/courses';
            default:
                return '/my-courses';
        }
    };

    const renderNavbar = () => {
        switch (user?.role) {
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

    if (isLoading || !user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background">
            {renderNavbar()}

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* Page Header */}
                <div className="mb-6 sm:mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        {user?.role !== 'admin' && (
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
                        <AdminControlsTab user={user} onApproveInstructor={handleApproveInstructor} />
                    )}
                    {activeTab === 'instructor' && (
                        <BecomeInstructorTab
                            user={user}
                            onSubmitApplication={handleSubmitApplication}
                            onBecomeInstructor={handleApproveInstructor}
                        />
                    )}
                </div>

            </main>
        </div>
    );
};

export default ProfilePage;
