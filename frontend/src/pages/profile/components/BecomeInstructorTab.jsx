import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    GraduationCap,
    Briefcase,
    Award,
    Link as LinkIcon,
    Plus,
    X,
    Check,
    Clock,
    Sparkles,
    ArrowRight,
    FileText,
    Star,
    Users,
    Edit,
    Eye,
    CheckCircle
} from 'lucide-react';
import Button from '../../../components/ui/Button';
import { degreeOptions, specializationOptions, experienceOptions, mockInstructorCourses, courseStatusConfig } from '../mockData';

const BecomeInstructorTab = ({ user, onSubmitApplication, onBecomeInstructor }) => {
    const navigate = useNavigate();
    const [isApplying, setIsApplying] = useState(false);
    const [courseFilter, setCourseFilter] = useState('all');
    const [formData, setFormData] = useState({
        degree: '',
        institution: '',
        graduationYear: '',
        experience: '',
        specializations: [],
        certifications: [],
        linkedIn: '',
        portfolio: '',
        motivation: ''
    });
    const [newCertification, setNewCertification] = useState('');
    const [errors, setErrors] = useState({});

    // Check if user already has a pending application
    const hasPendingApplication = user?.instructorApplication?.status === 'pending';
    const isApproved = user?.instructorApplication?.status === 'approved';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const toggleSpecialization = (spec) => {
        setFormData(prev => ({
            ...prev,
            specializations: prev.specializations.includes(spec)
                ? prev.specializations.filter(s => s !== spec)
                : [...prev.specializations, spec]
        }));
    };

    const addCertification = () => {
        if (newCertification.trim() && !formData.certifications.includes(newCertification.trim())) {
            setFormData(prev => ({
                ...prev,
                certifications: [...prev.certifications, newCertification.trim()]
            }));
            setNewCertification('');
        }
    };

    const removeCertification = (cert) => {
        setFormData(prev => ({
            ...prev,
            certifications: prev.certifications.filter(c => c !== cert)
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.degree) newErrors.degree = 'Please select your highest degree';
        if (!formData.institution.trim()) newErrors.institution = 'Please enter your institution';
        if (!formData.experience) newErrors.experience = 'Please select your experience level';
        if (formData.specializations.length === 0) newErrors.specializations = 'Please select at least one specialization';
        if (!formData.motivation.trim()) newErrors.motivation = 'Please tell us why you want to become an instructor';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            console.log('[Profile] Submitting instructor application:', formData);
            onSubmitApplication({
                ...formData,
                status: 'pending',
                submittedAt: new Date().toISOString()
            });
            setIsApplying(false);
        }
    };

    // If already an instructor, show instructor details
    if (user?.role === 'instructor') {
        const filteredCourses = courseFilter === 'all'
            ? mockInstructorCourses
            : mockInstructorCourses.filter(c => c.status === courseFilter);

        const statusCounts = {
            all: mockInstructorCourses.length,
            published: mockInstructorCourses.filter(c => c.status === 'published').length,
            draft: mockInstructorCourses.filter(c => c.status === 'draft').length,
            pending_review: mockInstructorCourses.filter(c => c.status === 'pending_review').length
        };

        return (
            <div className="space-y-6">
                {/* Instructor Hero with Create Course Button */}
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                <GraduationCap size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">You're an Instructor!</h2>
                                <p className="text-white/80">Share your knowledge with the world</p>
                            </div>
                        </div>
                        <Button
                            onClick={() => navigate('/instructor/courses/create')}
                            className="bg-white text-indigo-600 hover:bg-gray-100 font-medium"
                        >
                            <Plus size={18} className="mr-2" />
                            Create Course
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        <div className="bg-white/10 rounded-lg p-4">
                            <p className="text-2xl font-bold">{mockInstructorCourses.length}</p>
                            <p className="text-sm text-white/70">Courses Created</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4">
                            <p className="text-2xl font-bold">{user?.instructorData?.totalStudents?.toLocaleString() || 0}</p>
                            <p className="text-sm text-white/70">Total Students</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4">
                            <p className="text-2xl font-bold">{user?.instructorData?.averageRating || 0}</p>
                            <p className="text-sm text-white/70">Avg. Rating</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4">
                            <p className="text-2xl font-bold">{user?.instructorData?.yearsOfExperience || 0}+</p>
                            <p className="text-sm text-white/70">Years Exp.</p>
                        </div>
                    </div>
                </div>

                {/* My Courses Section */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">My Courses</h3>
                            <p className="text-sm text-gray-500">Manage your created courses</p>
                        </div>
                        <Button
                            size="sm"
                            onClick={() => navigate('/instructor/courses')}
                            variant="secondary"
                        >
                            View All Courses
                            <ArrowRight size={16} className="ml-1" />
                        </Button>
                    </div>

                    {/* Course Filter Tabs */}
                    <div className="px-6 py-3 border-b border-gray-100 flex gap-2 overflow-x-auto">
                        {[
                            { key: 'all', label: 'All Courses' },
                            { key: 'published', label: 'Published' },
                            { key: 'draft', label: 'Drafts' },
                            { key: 'pending_review', label: 'Pending Review' }
                        ].map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setCourseFilter(tab.key)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${courseFilter === tab.key
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {tab.label} ({statusCounts[tab.key]})
                            </button>
                        ))}
                    </div>

                    {/* Course List */}
                    <div className="p-6 space-y-4">
                        {filteredCourses.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <FileText size={48} className="mx-auto mb-3 opacity-50" />
                                <p>No courses found with this filter</p>
                            </div>
                        ) : (
                            filteredCourses.map(course => (
                                <div
                                    key={course.id}
                                    className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all"
                                >
                                    {/* Course Thumbnail */}
                                    <div className="relative w-full sm:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                                        <img
                                            src={course.thumbnail}
                                            alt={course.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <span className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium border ${courseStatusConfig[course.status]?.color}`}>
                                            {courseStatusConfig[course.status]?.label}
                                        </span>
                                    </div>

                                    {/* Course Info */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-gray-900 mb-1 truncate">{course.title}</h4>
                                        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{course.description}</p>

                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                            {course.status === 'published' && (
                                                <>
                                                    <div className="flex items-center gap-1">
                                                        <Users size={14} />
                                                        <span>{course.students.toLocaleString()} students</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                                        <span>{course.rating} ({course.reviews} reviews)</span>
                                                    </div>
                                                </>
                                            )}
                                            <span className="text-gray-400">•</span>
                                            <span>${course.price}</span>
                                            <span className="text-gray-400">•</span>
                                            <span className="text-xs text-gray-400">
                                                Updated {new Date(course.lastUpdated).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex sm:flex-col gap-2 sm:justify-center">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={() => {
                                                console.log('[Course] Editing course:', course.id);
                                                navigate(`/instructor/courses/edit/${course.id}`);
                                            }}
                                        >
                                            <Edit size={14} className="mr-1" />
                                            Edit
                                        </Button>
                                        {course.status === 'published' && (
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                onClick={() => {
                                                    console.log('[Course] Viewing course:', course.id);
                                                    navigate(`/course/${course.id}`);
                                                }}
                                            >
                                                <Eye size={14} className="mr-1" />
                                                View
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Instructor Details Card */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Professional Information</h3>
                        <p className="text-sm text-gray-500">Your instructor credentials</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                <GraduationCap size={20} className="text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Degree</p>
                                    <p className="font-medium text-gray-900">{user?.instructorData?.degree}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                <Briefcase size={20} className="text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Institution</p>
                                    <p className="font-medium text-gray-900">{user?.instructorData?.institution}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500 mb-2">Specializations</p>
                            <div className="flex flex-wrap gap-2">
                                {user?.instructorData?.specializations?.map((spec, index) => (
                                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                        {spec}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500 mb-2">Certifications</p>
                            <div className="flex flex-wrap gap-2">
                                {user?.instructorData?.certifications?.map((cert, index) => (
                                    <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-1">
                                        <Award size={14} />
                                        {cert}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Pending application view
    if (hasPendingApplication) {
        return (
            <div className="space-y-6">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-8 text-white text-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                        <Clock size={32} />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Application Under Review</h2>
                    <p className="text-white/80 max-w-md mx-auto">
                        Your instructor application has been submitted and is currently being reviewed.
                        We'll notify you once a decision has been made.
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                        <Clock size={16} />
                        <span>Submitted on {new Date(user?.instructorApplication?.submittedAt).toLocaleDateString()}</span>
                    </div>
                </div>

                {/* Application Summary */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Application Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Degree</p>
                            <p className="font-medium">{user?.instructorApplication?.degree}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Institution</p>
                            <p className="font-medium">{user?.instructorApplication?.institution}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Experience</p>
                            <p className="font-medium">{user?.instructorApplication?.experience}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Specializations</p>
                            <p className="font-medium">{user?.instructorApplication?.specializations?.join(', ')}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Application form view
    if (isApplying) {
        return (
            <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Instructor Application Form</h3>
                        <p className="text-sm text-gray-500">Fill in your professional details to apply</p>
                    </div>
                    <div className="p-6 space-y-6">
                        {/* Education Section */}
                        <div className="space-y-4">
                            <h4 className="font-medium text-gray-900 flex items-center gap-2">
                                <GraduationCap size={18} className="text-blue-600" />
                                Education
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Highest Degree *
                                    </label>
                                    <select
                                        name="degree"
                                        value={formData.degree}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.degree ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    >
                                        <option value="">Select degree</option>
                                        {degreeOptions.map(degree => (
                                            <option key={degree} value={degree}>{degree}</option>
                                        ))}
                                    </select>
                                    {errors.degree && <p className="mt-1 text-sm text-red-500">{errors.degree}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Institution / University *
                                    </label>
                                    <input
                                        type="text"
                                        name="institution"
                                        value={formData.institution}
                                        onChange={handleChange}
                                        placeholder="e.g., MIT, Stanford University"
                                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.institution ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.institution && <p className="mt-1 text-sm text-red-500">{errors.institution}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Graduation Year
                                    </label>
                                    <input
                                        type="number"
                                        name="graduationYear"
                                        value={formData.graduationYear}
                                        onChange={handleChange}
                                        placeholder="e.g., 2020"
                                        min="1970"
                                        max={new Date().getFullYear()}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Experience Section */}
                        <div className="space-y-4">
                            <h4 className="font-medium text-gray-900 flex items-center gap-2">
                                <Briefcase size={18} className="text-purple-600" />
                                Professional Experience
                            </h4>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Years of Experience *
                                </label>
                                <select
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.experience ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                >
                                    <option value="">Select experience level</option>
                                    {experienceOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                                {errors.experience && <p className="mt-1 text-sm text-red-500">{errors.experience}</p>}
                            </div>
                        </div>

                        {/* Specializations */}
                        <div className="space-y-4">
                            <h4 className="font-medium text-gray-900 flex items-center gap-2">
                                <Sparkles size={18} className="text-yellow-600" />
                                Specializations *
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {specializationOptions.map(spec => (
                                    <button
                                        key={spec}
                                        type="button"
                                        onClick={() => toggleSpecialization(spec)}
                                        className={`px-3 py-1.5 rounded-full text-sm transition-colors ${formData.specializations.includes(spec)
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {spec}
                                    </button>
                                ))}
                            </div>
                            {errors.specializations && <p className="mt-1 text-sm text-red-500">{errors.specializations}</p>}
                        </div>

                        {/* Certifications */}
                        <div className="space-y-4">
                            <h4 className="font-medium text-gray-900 flex items-center gap-2">
                                <Award size={18} className="text-green-600" />
                                Certifications (Optional)
                            </h4>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newCertification}
                                    onChange={(e) => setNewCertification(e.target.value)}
                                    placeholder="e.g., AWS Certified Developer"
                                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCertification())}
                                />
                                <Button type="button" onClick={addCertification} variant="secondary">
                                    <Plus size={16} />
                                </Button>
                            </div>
                            {formData.certifications.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {formData.certifications.map((cert, index) => (
                                        <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-1">
                                            {cert}
                                            <button
                                                type="button"
                                                onClick={() => removeCertification(cert)}
                                                className="hover:text-green-900"
                                            >
                                                <X size={14} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Links */}
                        <div className="space-y-4">
                            <h4 className="font-medium text-gray-900 flex items-center gap-2">
                                <LinkIcon size={18} className="text-blue-600" />
                                Professional Links (Optional)
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        LinkedIn Profile
                                    </label>
                                    <input
                                        type="url"
                                        name="linkedIn"
                                        value={formData.linkedIn}
                                        onChange={handleChange}
                                        placeholder="https://linkedin.com/in/yourprofile"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Portfolio / Website
                                    </label>
                                    <input
                                        type="url"
                                        name="portfolio"
                                        value={formData.portfolio}
                                        onChange={handleChange}
                                        placeholder="https://yourwebsite.com"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Motivation */}
                        <div className="space-y-4">
                            <h4 className="font-medium text-gray-900 flex items-center gap-2">
                                <FileText size={18} className="text-indigo-600" />
                                Why do you want to become an instructor? *
                            </h4>
                            <textarea
                                name="motivation"
                                value={formData.motivation}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Tell us about your passion for teaching and what you'd like to share with learners..."
                                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${errors.motivation ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.motivation && <p className="mt-1 text-sm text-red-500">{errors.motivation}</p>}
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                            <Button variant="secondary" onClick={() => setIsApplying(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit}>
                                <Check size={16} className="mr-1" />
                                Submit Application
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Call-to-action view (default for learners)
    return (
        <div className="space-y-6">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-xl p-8 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10 max-w-2xl">
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles size={24} />
                        <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">New Opportunity</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-3">Become an Instructor</h2>
                    <p className="text-white/80 mb-6 text-lg">
                        Share your expertise with thousands of learners worldwide. Create courses,
                        build your reputation, and make an impact in the education space.
                    </p>
                    <Button
                        onClick={() => setIsApplying(true)}
                        className="bg-white text-indigo-600 hover:bg-gray-100"
                    >
                        Start Your Application
                        <ArrowRight size={16} className="ml-2" />
                    </Button>
                </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                        <GraduationCap size={24} className="text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Share Knowledge</h3>
                    <p className="text-gray-600 text-sm">
                        Create comprehensive courses and share your expertise with eager learners.
                    </p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                        <Award size={24} className="text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Build Reputation</h3>
                    <p className="text-gray-600 text-sm">
                        Establish yourself as an expert in your field and grow your professional network.
                    </p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                        <Briefcase size={24} className="text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Grow Career</h3>
                    <p className="text-gray-600 text-sm">
                        Expand your career opportunities while helping others achieve their goals.
                    </p>
                </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Requirements to Apply</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={14} className="text-green-600" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">Professional Background</p>
                            <p className="text-sm text-gray-500">Relevant degree or work experience in your field</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={14} className="text-green-600" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">Subject Expertise</p>
                            <p className="text-sm text-gray-500">Deep knowledge in one or more teaching areas</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={14} className="text-green-600" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">Communication Skills</p>
                            <p className="text-sm text-gray-500">Ability to explain complex concepts clearly</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={14} className="text-green-600" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">Passion for Teaching</p>
                            <p className="text-sm text-gray-500">Genuine interest in helping others learn</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BecomeInstructorTab;
