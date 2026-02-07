import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from '../ui/Button';

const RoleSidebar = ({ isCollapsed = false, onToggleCollapse, activeRole = 'learner' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // const userRole = 'learner'; // REMOVED hardcoded role

  const navigationConfig = {
    admin: {
      sections: [
        {
          title: 'Overview',
          items: [
            { label: 'Dashboard', path: '/admin-dashboard', icon: 'LayoutDashboard' },
          ],
        },
        {
          title: 'Management',
          items: [
            { label: 'User Management', path: '/admin/users', icon: 'Users' },
            { label: 'Course Management', path: '/admin/courses', icon: 'BookOpen' },
            { label: 'Analytics', path: '/admin/analytics', icon: 'BarChart3' },
          ],
        },
        {
          title: 'System',
          items: [
            { label: 'Settings', path: '/admin/settings', icon: 'Settings' },
            { label: 'Reports', path: '/admin/reports', icon: 'FileText' },
          ],
        },
      ],
    },
    instructor: {
      sections: [
        {
          title: 'Overview',
          items: [
            { label: 'Dashboard', path: '/instructor/dashboard', icon: 'LayoutDashboard' },
          ],
        },
        {
          title: 'Content',
          items: [
            { label: 'My Courses', path: '/instructor/courses', icon: 'BookOpen' },
            { label: 'Course Editor', path: '/instructor/course-editor', icon: 'Edit3' },
            { label: 'Quiz Builder', path: '/instructor/quiz-builder', icon: 'ClipboardList' },
          ],
        },
        {
          title: 'Students',
          items: [
            { label: 'Learner Progress', path: '/instructor/learners', icon: 'Users' },
            { label: 'Grading', path: '/instructor/grading', icon: 'CheckSquare' },
          ],
        },
      ],
    },
    learner: {
      sections: [
        {
          title: 'Learning',
          items: [
            { label: 'My Courses', path: '/learner-courses-listing', icon: 'BookOpen' },
            { label: 'Course Details', path: '/learner/course-details', icon: 'FileText' },
            { label: 'Lesson Player', path: '/learner/lesson-player', icon: 'Play' },
          ],
        },
        {
          title: 'Progress',
          items: [
            { label: 'My Progress', path: '/learner/progress', icon: 'TrendingUp' },
            { label: 'Achievements', path: '/learner/achievements', icon: 'Award' },
            { label: 'Quiz Attempts', path: '/learner/quiz-attempts', icon: 'ClipboardCheck' },
          ],
        },
        {
          title: 'Account',
          items: [
            { label: 'Profile', path: '/learner/profile', icon: 'User' },
            { label: 'Settings', path: '/learner/settings', icon: 'Settings' },
          ],
        },
      ],
    },
  };

  const currentNav = navigationConfig?.[activeRole] || navigationConfig?.learner;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const isActive = (path) => {
    return location?.pathname === path;
  };

  const handleMobileToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      <button
        onClick={handleMobileToggle}
        className="mobile-menu-button"
        aria-label="Toggle mobile menu"
      >
        <Icon name={isMobileOpen ? 'X' : 'Menu'} size={24} />
      </button>
      {isMobileOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={handleMobileToggle}
          aria-hidden="true"
        />
      )}
      <aside className={`role-sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'translate-x-0' : ''}`}>
        <div className="role-sidebar-header">
          <div className="role-sidebar-logo">
            <div className="role-sidebar-logo-icon">
              <Icon name="GraduationCap" size={24} color="var(--color-primary)" />
            </div>
            <span className="role-sidebar-logo-text">LearnSphere</span>
          </div>
          {onToggleCollapse && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="hidden lg:flex"
            >
              <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={20} />
            </Button>
          )}
        </div>

        <nav className="role-sidebar-nav">
          {currentNav?.sections?.map((section, sectionIndex) => (
            <div key={sectionIndex} className="role-sidebar-section">
              <h3 className="role-sidebar-section-title">{section?.title}</h3>
              <ul className="role-sidebar-menu">
                {section?.items?.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <button
                      onClick={() => handleNavigation(item?.path)}
                      className={`role-sidebar-item ${isActive(item?.path) ? 'active' : ''}`}
                      title={isCollapsed ? item?.label : undefined}
                    >
                      <span className="role-sidebar-item-icon">
                        <Icon name={item?.icon} size={20} />
                      </span>
                      <span className="role-sidebar-item-text">{item?.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="role-sidebar-footer">
          <button
            onClick={() => navigate('/login-screen')}
            className="role-sidebar-item w-full"
          >
            <span className="role-sidebar-item-icon">
              <Icon name="LogOut" size={20} />
            </span>
            <span className="role-sidebar-item-text">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default RoleSidebar;