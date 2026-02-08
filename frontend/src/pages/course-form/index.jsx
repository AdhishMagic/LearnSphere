import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ChevronLeft, Shield, Menu } from 'lucide-react';
import InstructorNavbar from '../../components/navigation/InstructorNavbar';
import Button from '../../components/ui/Button';
import CourseSidebar from './components/CourseSidebar';
import CourseBasics from './components/CourseBasics';
import CurriculumManager from './components/CurriculumManager';
import CourseDescription from './components/CourseDescription';
import CourseOptions from './components/CourseOptions';
import PublishPanel from './components/PublishPanel';

const CourseForm = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const userRole = localStorage.getItem('role');
    const isAdminMode = userRole === 'admin';
    const backRoute = isAdminMode ? '/admin/courses' : '/instructor/courses';

    // State
    const [activeSection, setActiveSection] = useState('basics');
    const [courseData, setCourseData] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

    const requestWithTimeout = async (url, options, timeoutMs = 15000) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

        try {
            return await fetch(url, { ...options, signal: controller.signal });
        } finally {
            clearTimeout(timeoutId);
        }
    };

    // Navigation Flow
    const SECTIONS = ['basics', 'curriculum', 'description', 'options', 'publish'];
    const [maxAccessedSectionIndex, setMaxAccessedSectionIndex] = useState(0);

    // Load initial data
    useEffect(() => {
        const loadCourse = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) {
                alert('You need to log in to manage courses.');
                setIsLoading(false);
                return;
            }

            if (courseId) {
                try {
                    const response = await requestWithTimeout(`${API_BASE_URL}/api/v1/courses/${courseId}`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (!response.ok) {
                        const errorData = await response.json().catch(() => ({}));
                        const message = errorData?.detail || 'Unable to load course.';
                        alert(message);
                        navigate(backRoute);
                        return;
                    }

                    const data = await response.json();
                    setCourseData(data);
                    setMaxAccessedSectionIndex(SECTIONS.length - 1);
                } catch (error) {
                    alert('Unable to load course.');
                    navigate(backRoute);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setCourseData({
                    title: '',
                    subtitle: '',
                    thumbnail: '',
                    description: '',
                    instructor: '',
                    website: '',
                    tags: [],
                    requirements: [],
                    outcomes: [],
                    visibility: 'everyone',
                    access: 'open',
                    price: 0,
                    isPublished: false,
                    curriculum: []
                });
                setIsLoading(false);
            }
        };

        loadCourse();
    }, [API_BASE_URL, courseId, navigate, backRoute]);

    const handleSave = async () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            alert('You need to log in to save courses.');
            return;
        }

        const payload = {
            ...courseData,
            title: courseData?.title?.trim() || null,
            subtitle: courseData?.subtitle?.trim() || null,
            description: courseData?.description?.trim() || null,
            instructor: courseData?.instructor?.trim() || null,
            website: courseData?.website?.trim() || null
        };

        setIsSaving(true);
        try {
            const response = await requestWithTimeout(
                courseId
                    ? `${API_BASE_URL}/api/v1/courses/${courseId}`
                    : `${API_BASE_URL}/api/v1/courses`,
                {
                    method: courseId ? 'PATCH' : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const message = errorData?.detail || 'Unable to save course.';
                alert(message);
                return;
            }

            const data = await response.json();
            setCourseData(data);
            navigate(backRoute);
        } catch (error) {
            const message = error?.name === 'AbortError'
                ? 'Save timed out. Please try again.'
                : 'Unable to save course.';
            alert(message);
        } finally {
            setIsSaving(false);
        }
    };

    const handlePublish = async () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            alert('You need to log in to publish courses.');
            return;
        }

        if (!courseId) {
            alert('Please save the course before publishing.');
            return;
        }

        setIsSaving(true);
        try {
            const response = await requestWithTimeout(`${API_BASE_URL}/api/v1/courses/${courseId}/publish`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const message = errorData?.detail || 'Unable to publish course.';
                alert(message);
                return;
            }

            const data = await response.json();
            setCourseData(data);
        } catch (error) {
            const message = error?.name === 'AbortError'
                ? 'Publish timed out. Please try again.'
                : 'Unable to publish course.';
            alert(message);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading || !courseData) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-muted-foreground text-sm">Loading course...</p>
                </div>
            </div>
        );
    }

    const handleNext = (currentSection) => {
        const currentIndex = SECTIONS.indexOf(currentSection);
        if (currentIndex < SECTIONS.length - 1) {
            const nextIndex = currentIndex + 1;
            setMaxAccessedSectionIndex(prev => Math.max(prev, nextIndex));
            setActiveSection(SECTIONS[nextIndex]);
        }
    };

    const renderSection = () => {
        const commonProps = {
            data: courseData,
            onChange: setCourseData,
        };

        switch (activeSection) {
            case 'basics':
                return <CourseBasics {...commonProps} onNext={() => handleNext('basics')} />;
            case 'curriculum':
                return (
                    <CurriculumManager
                        {...commonProps}
                        onNavigate={setActiveSection}
                        onNext={() => handleNext('curriculum')}
                        courseId={courseId || courseData?.id || null}
                    />
                );
            case 'description':
                return <CourseDescription {...commonProps} onNavigate={setActiveSection} onNext={() => handleNext('description')} />;
            case 'options':
                return <CourseOptions {...commonProps} onNavigate={setActiveSection} onNext={() => handleNext('options')} />;
            case 'publish':
                return (
                    <PublishPanel
                        {...commonProps}
                        onNavigate={setActiveSection}
                        onPublish={handlePublish}
                        onPreview={() => {
                            if (!courseId) {
                                alert('Please save the course before previewing.');
                                return;
                            }
                            window.open(`/course/${courseId}?preview=1`, '_blank');
                        }}
                    />
                );
            default:
                return <CourseBasics {...commonProps} onNext={() => handleNext('basics')} />;
        }
    };

    // Get current section label for mobile header
    const currentSectionLabel = SECTIONS[SECTIONS.indexOf(activeSection)];
    const sectionLabels = {
        basics: 'Course Basics',
        curriculum: 'Curriculum',
        description: 'Description',
        options: 'Options & Access',
        publish: 'Publish'
    };

    // Admin navbar for admin mode
    const renderNavbar = () => {
        if (isAdminMode) {
            return (
                <nav className="border-b border-border bg-card sticky top-0 z-50 shadow-sm">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex h-14 items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-red-100 p-1.5 rounded-lg">
                                    <Shield className="h-5 w-5 text-red-600" />
                                </div>
                                <span className="text-base sm:text-lg font-bold text-foreground">
                                    <span className="hidden sm:inline">Admin Course Editor</span>
                                    <span className="sm:hidden">Course Editor</span>
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs sm:text-sm bg-red-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-red-200">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-red-700 font-medium">Admin</span>
                            </div>
                        </div>
                    </div>
                </nav>
            );
        }
        return <InstructorNavbar />;
    };

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Navigation */}
            {renderNavbar()}

            {/* Course Editor Header */}
            <header className="flex items-center justify-between px-3 sm:px-6 py-3 bg-card border-b border-border sticky top-14 z-40">
                <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                    {/* Mobile menu toggle */}
                    <button
                        onClick={() => setIsMobileSidebarOpen(true)}
                        className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                        aria-label="Open navigation"
                    >
                        <Menu size={20} className="text-muted-foreground" />
                    </button>

                    {/* Back button */}
                    <button
                        onClick={() => navigate(backRoute)}
                        className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors flex-shrink-0"
                        aria-label="Go back"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    {/* Title section */}
                    <div className="min-w-0">
                        <h1 className="text-sm sm:text-lg font-bold text-foreground leading-tight truncate">
                            {courseData.title || 'Untitled Course'}
                        </h1>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] sm:text-xs font-medium ${courseData.isPublished
                                    ? 'bg-success/10 text-success'
                                    : 'bg-muted text-muted-foreground'
                                }`}>
                                {courseData.isPublished ? 'Published' : 'Draft'}
                            </span>
                            <span className="hidden sm:inline text-border">•</span>
                            <span className="hidden sm:inline">{sectionLabels[activeSection]}</span>
                        </div>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    <Button
                        variant="outline"
                        size="sm"
                        className="hidden sm:inline-flex"
                        onClick={() => {
                            if (!courseId) {
                                alert('Please save the course before previewing.');
                                return;
                            }
                            window.open(`/course/${courseId}?preview=1`, '_blank');
                        }}
                    >
                        Preview
                    </Button>
                    <Button
                        onClick={handleSave}
                        size="sm"
                        disabled={isSaving}
                        className="text-xs sm:text-sm"
                    >
                        <Save size={16} className="mr-1 sm:mr-2" />
                        <span className="hidden xs:inline">
                            {isSaving ? 'Saving...' : (courseId ? 'Save' : 'Create')}
                        </span>
                        <span className="xs:hidden">
                            {isSaving ? '...' : 'Save'}
                        </span>
                    </Button>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden">
                <CourseSidebar
                    activeSection={activeSection}
                    onNavigate={setActiveSection}
                    maxAccessedIndex={maxAccessedSectionIndex}
                    isOpen={isMobileSidebarOpen}
                    onClose={() => setIsMobileSidebarOpen(false)}
                />

                <main className="flex-1 overflow-y-auto">
                    <div className="px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                        <div className="max-w-4xl mx-auto">
                            {/* Mobile section indicator */}
                            <div className="md:hidden mb-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span className="font-medium text-foreground">{sectionLabels[activeSection]}</span>
                                    <span className="text-border">•</span>
                                    <span>Step {SECTIONS.indexOf(activeSection) + 1} of {SECTIONS.length}</span>
                                </div>
                            </div>

                            {/* Section content */}
                            <div className="animate-in fade-in duration-300">
                                {renderSection()}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CourseForm;

