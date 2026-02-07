import React, { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import RoleSidebar from '../../components/navigation/RoleSidebar';
import BreadcrumbTracker from '../../components/navigation/BreadcrumbTracker';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import UsersTable from './components/UsersTable';
import CreateUserModal from './components/CreateUserModal';
import EditUserModal from './components/EditUserModal';
import ChangeRoleModal from './components/ChangeRoleModal';
import { MOCK_USERS } from './mockData';

const AdminUsersPage = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    // Data State
    const [users, setUsers] = useState(MOCK_USERS);
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    // Modal State
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isChangeRoleModalOpen, setIsChangeRoleModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Derived State
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
    });

    const roleOptions = [
        { label: 'All Roles', value: 'all' },
        { label: 'Admin', value: 'admin' },
        { label: 'Instructor', value: 'instructor' },
        { label: 'Learner', value: 'learner' }
    ];

    const statusOptions = [
        { label: 'All Statuses', value: 'all' },
        { label: 'Active', value: 'active' },
        { label: 'Disabled', value: 'disabled' },
    ];

    // Handlers
    const handleCreateUser = (newUser) => {
        const user = {
            id: `u${Date.now()}`,
            ...newUser,
            status: 'active',
            joinedDate: new Date().toISOString().split('T')[0],
            lastActive: new Date().toISOString().split('T')[0],
            avatar: null
        };
        setUsers([user, ...users]);
        console.log('Created User:', user);
    };

    const handleEditUser = (userId, updatedData) => {
        setUsers(users.map(u => u.id === userId ? { ...u, ...updatedData } : u));
        console.log('Updated User:', userId, updatedData);
    };

    const handleChangeRole = (userId, newRole) => {
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
        console.log('Changed Role:', userId, newRole);
    };

    const handleToggleStatus = (user) => {
        const newStatus = user.status === 'active' ? 'disabled' : 'active';
        setUsers(users.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
        console.log(`Toggled status for ${user.name} to ${newStatus}`);
    };

    const handleDeleteUser = (user) => {
        if (window.confirm(`Are you sure you want to delete user "${user.name}"? This action cannot be undone.`)) {
            setUsers(users.filter(u => u.id !== user.id));
            console.log('Deleted User:', user.id);
        }
    };

    const openEditModal = (user) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const openChangeRoleModal = (user) => {
        setSelectedUser(user);
        setIsChangeRoleModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <RoleSidebar
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                activeRole="admin"
            />

            <main className={`transition-all duration-250 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'}`}>
                <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8">
                    <BreadcrumbTracker />

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold mb-2">Users Management</h1>
                            <p className="text-muted-foreground">Manage all user accounts, roles, and permissions.</p>
                        </div>
                        <Button
                            className="shrink-0"
                            iconPosition="left"
                            iconName="Plus"
                            onClick={() => setIsCreateModalOpen(true)}
                        >
                            Create New User
                        </Button>
                    </div>

                    {/* Filters & Search */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
                        <div className="md:col-span-5 lg:col-span-6 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search users by name or email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                        <div className="md:col-span-3 lg:col-span-3">
                            <Select
                                options={roleOptions}
                                value={roleFilter}
                                onChange={setRoleFilter}
                                placeholder="Filter by Role"
                            />
                        </div>
                        <div className="md:col-span-4 lg:col-span-3">
                            <Select
                                options={statusOptions}
                                value={statusFilter}
                                onChange={setStatusFilter}
                                placeholder="Filter by Status"
                            />
                        </div>
                    </div>

                    {/* Stats Summary - Optional but helpful */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-card border border-border rounded-lg p-4">
                            <p className="text-sm text-muted-foreground">Total Users</p>
                            <p className="text-2xl font-bold">{users.length}</p>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-4">
                            <p className="text-sm text-muted-foreground">Instructors</p>
                            <p className="text-2xl font-bold">{users.filter(u => u.role === 'instructor').length}</p>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-4">
                            <p className="text-sm text-muted-foreground">Learners</p>
                            <p className="text-2xl font-bold">{users.filter(u => u.role === 'learner').length}</p>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-4">
                            <p className="text-sm text-muted-foreground">Admins</p>
                            <p className="text-2xl font-bold">{users.filter(u => u.role === 'admin').length}</p>
                        </div>
                    </div>

                    {/* Users Table */}
                    <UsersTable
                        users={filteredUsers}
                        onEdit={openEditModal}
                        onDelete={handleDeleteUser}
                        onChangeRole={openChangeRoleModal}
                        onToggleStatus={handleToggleStatus}
                    />
                </div>
            </main>

            {/* Modals */}
            <CreateUserModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreateUser}
            />

            <EditUserModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleEditUser}
                user={selectedUser}
            />

            <ChangeRoleModal
                isOpen={isChangeRoleModalOpen}
                onClose={() => setIsChangeRoleModalOpen(false)}
                onConfirm={handleChangeRole}
                user={selectedUser}
            />
        </div>
    );
};

export default AdminUsersPage;
