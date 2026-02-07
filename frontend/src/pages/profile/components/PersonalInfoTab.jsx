import React, { useState } from 'react';
import { Camera, Mail, Phone, MapPin, Calendar, Award, BookOpen, GraduationCap, Save } from 'lucide-react';
import Button from '../../../components/ui/Button';

const PersonalInfoTab = ({ user, onUpdateUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        location: user?.location || '',
        bio: user?.bio || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        console.log('[Profile] Saving personal info:', formData);
        onUpdateUser({ ...user, ...formData });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            phone: user?.phone || '',
            location: user?.location || '',
            bio: user?.bio || ''
        });
        setIsEditing(false);
    };

    return (
        <div className="space-y-6">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative flex flex-col sm:flex-row items-center gap-6">
                    {/* Avatar */}
                    <div className="relative">
                        <img
                            src={user?.avatar}
                            alt={`${user?.firstName} ${user?.lastName}`}
                            className="w-24 h-24 rounded-full border-4 border-white/30 object-cover"
                        />
                        <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors shadow-lg">
                            <Camera size={16} />
                        </button>
                    </div>

                    {/* Name & Role */}
                    <div className="text-center sm:text-left">
                        <h2 className="text-2xl font-bold">
                            {user?.firstName} {user?.lastName}
                        </h2>
                        <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${user?.role === 'admin'
                                    ? 'bg-red-500/20 text-red-100'
                                    : user?.role === 'instructor'
                                        ? 'bg-purple-500/20 text-purple-100'
                                        : 'bg-green-500/20 text-green-100'
                                }`}>
                                {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                            </span>
                        </div>
                        <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-white/80 text-sm">
                            <Calendar size={14} />
                            <span>Joined {new Date(user?.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                        </div>
                    </div>

                    {/* Edit Button */}
                    <div className="sm:ml-auto">
                        {!isEditing ? (
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setIsEditing(true)}
                                className="bg-white/20 hover:bg-white/30 border-white/30 text-white"
                            >
                                Edit Profile
                            </Button>
                        ) : (
                            <div className="flex gap-2">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={handleCancel}
                                    className="bg-white/20 hover:bg-white/30 border-white/30 text-white"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={handleSave}
                                    className="bg-white text-indigo-600 hover:bg-gray-100"
                                >
                                    <Save size={16} className="mr-1" />
                                    Save
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            {user?.role !== 'admin' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                <BookOpen size={20} className="text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{user?.coursesEnrolled || 0}</p>
                                <p className="text-sm text-gray-500">Enrolled</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                <GraduationCap size={20} className="text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{user?.coursesCompleted || 0}</p>
                                <p className="text-sm text-gray-500">Completed</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                                <Award size={20} className="text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{user?.totalPoints || 0}</p>
                                <p className="text-sm text-gray-500">Points</p>
                            </div>
                        </div>
                    </div>
                    {user?.role === 'instructor' && (
                        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                                    <BookOpen size={20} className="text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{user?.instructorData?.coursesCreated || 0}</p>
                                    <p className="text-sm text-gray-500">Created</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Personal Information Form */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                    <p className="text-sm text-gray-500">Update your personal details here</p>
                </div>
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                First Name
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            ) : (
                                <p className="px-4 py-2.5 bg-gray-50 rounded-lg text-gray-900">{user?.firstName}</p>
                            )}
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Last Name
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            ) : (
                                <p className="px-4 py-2.5 bg-gray-50 rounded-lg text-gray-900">{user?.lastName}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Mail size={14} className="inline mr-1" />
                                Email Address
                            </label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            ) : (
                                <p className="px-4 py-2.5 bg-gray-50 rounded-lg text-gray-900">{user?.email}</p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Phone size={14} className="inline mr-1" />
                                Phone Number
                            </label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            ) : (
                                <p className="px-4 py-2.5 bg-gray-50 rounded-lg text-gray-900">{user?.phone}</p>
                            )}
                        </div>

                        {/* Location */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <MapPin size={14} className="inline mr-1" />
                                Location
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            ) : (
                                <p className="px-4 py-2.5 bg-gray-50 rounded-lg text-gray-900">{user?.location}</p>
                            )}
                        </div>

                        {/* Bio */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Bio
                            </label>
                            {isEditing ? (
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                                />
                            ) : (
                                <p className="px-4 py-2.5 bg-gray-50 rounded-lg text-gray-900 whitespace-pre-wrap">{user?.bio}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfoTab;
