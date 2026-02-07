import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSidebar from '../../components/navigation/RoleSidebar';
import BreadcrumbTracker from '../../components/navigation/BreadcrumbTracker';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import UserStatsTab from './components/UserStatsTab';
import CourseOverviewTab from './components/CourseOverviewTab';
import SystemAnalyticsTab from './components/SystemAnalyticsTab';
import RecentActivityTab from './components/RecentActivityTab';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('user-stats');

  const tabs = [
    { id: 'user-stats', label: 'User Statistics', icon: 'Users' },
    { id: 'course-overview', label: 'Course Overview', icon: 'BookOpen' },
    { id: 'system-analytics', label: 'System Analytics', icon: 'BarChart3' },
    { id: 'recent-activity', label: 'Recent Activity', icon: 'Activity' }
  ];

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'user-stats':
        return <UserStatsTab />;
      case 'course-overview':
        return <CourseOverviewTab />;
      case 'system-analytics':
        return <SystemAnalyticsTab />;
      case 'recent-activity':
        return <RecentActivityTab />;
      default:
        return <UserStatsTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleSidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggleCollapse={handleToggleSidebar}
      />
      <main className={`transition-all duration-250 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'}`}>
        <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <BreadcrumbTracker />
          
          {/* Header Section */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  Admin Dashboard
                </h1>
                <p className="text-sm md:text-base text-muted-foreground">
                  Monitor and manage your educational platform
                </p>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3">
                <Button
                  variant="outline"
                  iconName="Users"
                  iconPosition="left"
                  onClick={() => navigate('/admin/users')}
                >
                  Manage Users
                </Button>
                <Button
                  variant="default"
                  iconName="BookOpen"
                  iconPosition="left"
                  onClick={() => navigate('/admin/courses')}
                >
                  Manage Courses
                </Button>
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 p-4 md:p-6 bg-card rounded-xl border border-border shadow-elevation-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="Users" size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Total Users</p>
                  <p className="text-base md:text-lg font-bold text-foreground data-text">15,847</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <Icon name="BookOpen" size={20} color="var(--color-success)" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Active Courses</p>
                  <p className="text-base md:text-lg font-bold text-foreground data-text">892</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Icon name="Clock" size={20} color="var(--color-warning)" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Pending</p>
                  <p className="text-base md:text-lg font-bold text-foreground data-text">23</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Icon name="DollarSign" size={20} color="var(--color-accent)" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Revenue</p>
                  <p className="text-base md:text-lg font-bold text-foreground data-text">$1.2M</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="mb-6 md:mb-8">
            <div className="border-b border-border overflow-x-auto">
              <div className="flex gap-2 md:gap-4 min-w-max">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center gap-2 px-4 md:px-6 py-3 md:py-4 text-sm md:text-base font-medium transition-smooth whitespace-nowrap ${
                      activeTab === tab?.id
                        ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name={tab?.icon} size={18} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-8">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;