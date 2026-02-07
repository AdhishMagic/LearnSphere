import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Shield,
    Users,
    BookOpen,
    BarChart3,
    FileText,
    ArrowRight,
    Plus,
    Settings,
    Eye,
    Edit,
    Trash2,
    CheckCircle,
    XCircle,
    Clock,
    Star
} from 'lucide-react';
import Button from '../../../components/ui/Button';
import { mockInstructorCourses, courseStatusConfig } from '../mockData';

// Mock all users data for admin
const mockAllUsers = [
    {
        id: 'user-001',
        name: 'John Smith',
        email: 'john.smith@example.com',
        role: 'learner',
        status: 'active',
        coursesEnrolled: 5,
        joinedDate: '2024-01-15'
    },
    {
        id: 'user-002',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        role: 'instructor',
        status: 'active',
        coursesCreated: 5,
        joinedDate: '2023-06-20'
    },
    {
        id: 'user-003',
        name: 'Mike Williams',
        email: 'mike.w@example.com',
        role: 'learner',
        status: 'active',
        coursesEnrolled: 3,
        joinedDate: '2024-02-10'
    },
    {
        id: 'user-004',
        name: 'Emily Davis',
        email: 'emily.d@example.com',
        role: 'instructor',
        status: 'pending',
        coursesCreated: 0,
        joinedDate: '2025-02-01'
    },
    {
        id: 'user-005',
        name: 'Alex Turner',
        email: 'alex.t@example.com',
        role: 'learner',
        status: 'inactive',
        coursesEnrolled: 1,
        joinedDate: '2023-11-05'
    }
];

// Mock pending instructor applications
const mockPendingApplications = [
    {
        id: 'app-001',
        userId: 'user-006',
        name: 'Robert Chen',
        email: 'robert.chen@example.com',
        degree: 'Master\'s Degree',
        institution: 'Stanford University',
        experience: '5-10',
        specializations: ['Data Science', 'Machine Learning'],
        submittedAt: '2025-02-05'
    },
    {
        id: 'app-002',
        userId: 'user-007',
        name: 'Jessica Moore',
        email: 'jessica.m@example.com',
        degree: 'Ph.D.',
        institution: 'MIT',
        experience: '10+',
        specializations: ['Cybersecurity', 'Cloud Computing'],
        submittedAt: '2025-02-06'
    }
];

const AdminControlsTab = ({ user }) => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('overview');

    const adminStats = {
        totalUsers: 12547,
        totalCourses: 856,
        totalInstructors: 234,
        pendingApplications: mockPendingApplications.length,
        revenue: 125890
    };

    const quickActions = [
        {
            label: 'User Management',
            icon: Users,
            path: '/admin/users',
            color: 'bg-blue-100 text-blue-600',
            description: 'Manage all users and roles'
        },
        {
            label: 'Course Management',
            icon: BookOpen,
            path: '/admin/courses',
            color: 'bg-green-100 text-green-600',
            description: 'Manage platform courses'
        },
        {
            label: 'Analytics',
            icon: BarChart3,
            path: '/admin/analytics',
            color: 'bg-purple-100 text-purple-600',
            description: 'View platform analytics'
        },
        {
            label: 'Reports',
            icon: FileText,
            path: '/admin/reports',
            color: 'bg-orange-100 text-orange-600',
            description: 'Generate reports'
        }
    ];

    const handleApproveApplication = (appId) => {
        console.log('[Admin] Approving application:', appId);
        alert('Application approved! User is now an instructor.');
    };

    const handleRejectApplication = (appId) => {
        console.log('[Admin] Rejecting application:', appId);
        alert('Application rejected.');
    };

    return (
        <div className="space-y-6">
            {/* Admin Hero Section */}
            <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-xl p-6 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                            <Shield size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Admin Control Panel</h2>
                            <p className="text-white/80">Full platform access and management</p>
                        </div>
                    </div>
                    <Button
                        onClick={() => navigate('/admin-dashboard')}
                        className="bg-white text-red-600 hover:bg-gray-100 font-medium"
                    >
                        Go to Dashboard
                        <ArrowRight size={18} className="ml-2" />
                    </Button>
                </div>

                {/* Admin Stats */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                    <div className="bg-white/10 rounded-lg p-4">
                        <p className="text-2xl font-bold">{adminStats.totalUsers.toLocaleString()}</p>
                        <p className="text-sm text-white/70">Total Users</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                        <p className="text-2xl font-bold">{adminStats.totalCourses}</p>
                        <p className="text-sm text-white/70">Total Courses</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                        <p className="text-2xl font-bold">{adminStats.totalInstructors}</p>
                        <p className="text-sm text-white/70">Instructors</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                        <p className="text-2xl font-bold">{adminStats.pendingApplications}</p>
                        <p className="text-sm text-white/70">Pending Apps</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                        <p className="text-2xl font-bold">${(adminStats.revenue / 1000).toFixed(0)}K</p>
                        <p className="text-sm text-white/70">Revenue</p>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                    <button
                        key={index}
                        onClick={() => navigate(action.path)}
                        className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md hover:border-gray-300 transition-all text-left group"
                    >
                        <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <action.icon size={24} />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">{action.label}</h3>
                        <p className="text-sm text-gray-500">{action.description}</p>
                    </button>
                ))}
            </div>

            {/* Pending Instructor Applications */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            Pending Instructor Applications
                            {mockPendingApplications.length > 0 && (
                                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                                    {mockPendingApplications.length}
                                </span>
                            )}
                        </h3>
                        <p className="text-sm text-gray-500">Review and approve instructor requests</p>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    {mockPendingApplications.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <CheckCircle size={48} className="mx-auto mb-3 opacity-50" />
                            <p>No pending applications</p>
                        </div>
                    ) : (
                        mockPendingApplications.map(app => (
                            <div
                                key={app.id}
                                className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-xl"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                                            {app.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{app.name}</h4>
                                            <p className="text-sm text-gray-500">{app.email}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                                        <div>
                                            <span className="text-gray-500">Degree:</span>
                                            <span className="ml-2 font-medium">{app.degree}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Institution:</span>
                                            <span className="ml-2 font-medium">{app.institution}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Experience:</span>
                                            <span className="ml-2 font-medium">{app.experience} years</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Applied:</span>
                                            <span className="ml-2 font-medium">{new Date(app.submittedAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="mt-2 flex flex-wrap gap-1">
                                        {app.specializations.map((spec, idx) => (
                                            <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex sm:flex-col gap-2 sm:justify-center">
                                    <Button
                                        size="sm"
                                        onClick={() => handleApproveApplication(app.id)}
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        <CheckCircle size={14} className="mr-1" />
                                        Approve
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        onClick={() => handleRejectApplication(app.id)}
                                        className="border-red-200 text-red-600 hover:bg-red-50"
                                    >
                                        <XCircle size={14} className="mr-1" />
                                        Reject
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* All Courses Overview */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Course Overview</h3>
                        <p className="text-sm text-gray-500">View and manage all platform courses</p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            onClick={() => navigate('/instructor/courses/create?role=admin')}
                        >
                            <Plus size={14} className="mr-1" />
                            Create Course
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => navigate('/admin/courses')}
                            variant="secondary"
                        >
                            Manage All
                            <ArrowRight size={16} className="ml-1" />
                        </Button>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    {mockInstructorCourses.slice(0, 3).map(course => (
                        <div
                            key={course.id}
                            className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-all"
                        >
                            <div className="relative w-full sm:w-36 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                    src={course.thumbnail}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                />
                                <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-medium border ${courseStatusConfig[course.status]?.color}`}>
                                    {courseStatusConfig[course.status]?.label}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-900 mb-1 truncate">{course.title}</h4>
                                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <Users size={14} />
                                        {course.students.toLocaleString()}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                        {course.rating}
                                    </span>
                                    <span>${course.price}</span>
                                </div>
                            </div>
                            <div className="flex gap-2 sm:flex-col sm:justify-center">
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => navigate(`/instructor/courses/edit/${course.id}?role=admin`)}
                                >
                                    <Edit size={14} />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => navigate(`/course/${course.id}`)}
                                >
                                    <Eye size={14} />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Users */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Recent Users</h3>
                        <p className="text-sm text-gray-500">Latest user registrations</p>
                    </div>
                    <Button
                        size="sm"
                        onClick={() => navigate('/admin/users')}
                        variant="secondary"
                    >
                        View All
                        <ArrowRight size={16} className="ml-1" />
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {mockAllUsers.map(u => (
                                <tr key={u.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-sm font-bold">
                                                {u.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{u.name}</p>
                                                <p className="text-sm text-gray-500">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${u.role === 'instructor'
                                            ? 'bg-purple-100 text-purple-700'
                                            : u.role === 'admin'
                                                ? 'bg-red-100 text-red-700'
                                                : 'bg-green-100 text-green-700'
                                            }`}>
                                            {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${u.status === 'active'
                                            ? 'bg-green-100 text-green-700'
                                            : u.status === 'pending'
                                                ? 'bg-yellow-100 text-yellow-700'
                                                : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {u.status.charAt(0).toUpperCase() + u.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(u.joinedDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-1">
                                            <button
                                                className="p-2 hover:bg-gray-100 rounded-lg"
                                                onClick={() => console.log('[Admin] View user:', u.id)}
                                            >
                                                <Eye size={16} className="text-gray-500" />
                                            </button>
                                            <button
                                                className="p-2 hover:bg-gray-100 rounded-lg"
                                                onClick={() => console.log('[Admin] Edit user:', u.id)}
                                            >
                                                <Edit size={16} className="text-gray-500" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Admin Permissions Info */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Admin Permissions</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {user?.permissions?.map((perm, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                            <CheckCircle size={16} className="text-green-600" />
                            <span className="text-sm font-medium text-green-700 capitalize">{perm}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminControlsTab;
