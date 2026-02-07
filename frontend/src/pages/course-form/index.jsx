import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ChevronLeft } from 'lucide-react';
import Button from '../../components/ui/Button';
import CourseSidebar from './components/CourseSidebar';
import CourseBasics from './components/CourseBasics';
import CurriculumManager from './components/CurriculumManager';
import CourseDescription from './components/CourseDescription';
import CourseOptions from './components/CourseOptions';
import QuizManager from './components/QuizManager';
import PublishPanel from './components/PublishPanel';
import { useCourse } from '../../context/CourseContext';

const CourseForm = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { getCourse, addCourse, updateCourse } = useCourse();

    // State
    const [activeSection, setActiveSection] = useState('basics');
    const [courseData, setCourseData] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    // Navigation Flow
    const SECTIONS = ['basics', 'curriculum', 'description', 'options', 'publish'];
    const [maxAccessedSectionIndex, setMaxAccessedSectionIndex] = useState(0); // 0 = 'basics'

    // Load initial data
    useEffect(() => {
        if (courseId) {
            // Edit mode: fetch from context
            const existingCourse = getCourse(courseId);
            if (existingCourse) {
                console.log(`Loading course ${courseId}...`);
                setCourseData(existingCourse);
                // Unlock all sections if editing existing course
                setMaxAccessedSectionIndex(SECTIONS.length - 1);
            } else {
                console.error('Course not found');
                navigate('/instructor/courses');
            }
        } else {
            // Create mode: initialize empty course
            console.log('Initializing new course...');
            setCourseData({
                title: '',
                subtitle: '',
                thumbnail: '',
                description: '',
                instructor: 'Current Instructor',
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
        }
    }, [courseId, getCourse, navigate]);

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API call delay
        setTimeout(() => {
            if (courseId) {
                updateCourse(courseId, courseData);
                console.log('Updated Course:', courseData);
            } else {
                addCourse(courseData);
                console.log('Created Course:', courseData);
            }
            setIsSaving(false);
            navigate('/instructor/courses');
        }, 800);
    };

    if (!courseData) return <div className="p-8">Loading...</div>;

    const handleNext = (currentSection) => {
        const currentIndex = SECTIONS.indexOf(currentSection);
        if (currentIndex < SECTIONS.length - 1) {
            const nextIndex = currentIndex + 1;
            setMaxAccessedSectionIndex(prev => Math.max(prev, nextIndex));
            setActiveSection(SECTIONS[nextIndex]);
        }
    };

    const isSectionAccessible = (index) => {
        return index <= maxAccessedSectionIndex;
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
                return <CurriculumManager {...commonProps} onNavigate={setActiveSection} onNext={() => handleNext('curriculum')} />;
            case 'description':
                return <CourseDescription {...commonProps} onNavigate={setActiveSection} onNext={() => handleNext('description')} />;
            case 'options':
                return <CourseOptions {...commonProps} onNavigate={setActiveSection} onNext={() => handleNext('options')} />;
            case 'publish':
                return <PublishPanel {...commonProps} onNavigate={setActiveSection} />;
            default:
                return <CourseBasics {...commonProps} onNext={() => handleNext('basics')} />;
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Top Bar */}
            <header className="flex items-center justify-between px-6 py-3 bg-white border-b sticky top-0 z-40">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/instructor/courses')}
                        className="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-lg font-bold text-gray-900 leading-tight">
                            {courseData.title || 'Untitled Course'}
                        </h1>
                        <p className="text-xs text-gray-500">
                            {courseData.isPublished ? 'Published' : 'Draft'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => window.open('/preview', '_blank')}
                    >
                        Preview
                    </Button>
                    <Button
                        onClick={handleSave}
                        size="sm"
                        disabled={isSaving}
                    >
                        <Save size={16} className="mr-2" />
                        {isSaving ? 'Saving...' : (courseId ? 'Save Changes' : 'Create Course')}
                    </Button>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden">
                <CourseSidebar
                    activeSection={activeSection}
                    onNavigate={setActiveSection}
                    maxAccessedIndex={maxAccessedSectionIndex}
                />

                <main className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {renderSection()}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CourseForm;
