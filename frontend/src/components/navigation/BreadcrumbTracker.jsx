import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbTracker = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const breadcrumbMap = {
    '/admin-dashboard': [{ label: 'Dashboard', path: '/admin-dashboard' }],
    '/admin/users': [
      { label: 'Dashboard', path: '/admin-dashboard' },
      { label: 'User Management', path: '/admin/users' },
    ],
    '/admin/courses': [
      { label: 'Dashboard', path: '/admin-dashboard' },
      { label: 'Course Management', path: '/admin/courses' },
    ],
    '/instructor/dashboard': [{ label: 'Dashboard', path: '/instructor/dashboard' }],
    '/instructor/courses': [
      { label: 'Dashboard', path: '/instructor/dashboard' },
      { label: 'My Courses', path: '/instructor/courses' },
    ],
    '/instructor/course-editor': [
      { label: 'Dashboard', path: '/instructor/dashboard' },
      { label: 'My Courses', path: '/instructor/courses' },
      { label: 'Course Editor', path: '/instructor/course-editor' },
    ],
    '/instructor/quiz-builder': [
      { label: 'Dashboard', path: '/instructor/dashboard' },
      { label: 'My Courses', path: '/instructor/courses' },
      { label: 'Quiz Builder', path: '/instructor/quiz-builder' },
    ],
    '/learner-courses-listing': [{ label: 'My Courses', path: '/learner-courses-listing' }],
    '/learner/course-details': [
      { label: 'My Courses', path: '/learner-courses-listing' },
      { label: 'Course Details', path: '/learner/course-details' },
    ],
    '/learner/lesson-player': [
      { label: 'My Courses', path: '/learner-courses-listing' },
      { label: 'Course Details', path: '/learner/course-details' },
      { label: 'Lesson Player', path: '/learner/lesson-player' },
    ],
    '/learner/progress': [{ label: 'My Progress', path: '/learner/progress' }],
    '/learner/profile': [{ label: 'Profile', path: '/learner/profile' }],
  };

  const breadcrumbs = breadcrumbMap?.[location?.pathname] || [];

  if (breadcrumbs?.length === 0) {
    return null;
  }

  const handleBreadcrumbClick = (path) => {
    navigate(path);
  };

  return (
    <nav className="breadcrumb-container" aria-label="Breadcrumb">
      {breadcrumbs?.map((crumb, index) => (
        <div key={index} className="breadcrumb-item">
          {index < breadcrumbs?.length - 1 ? (
            <>
              <button
                onClick={() => handleBreadcrumbClick(crumb?.path)}
                className="breadcrumb-link"
              >
                {crumb?.label}
              </button>
              <Icon name="ChevronRight" size={16} className="breadcrumb-separator" />
            </>
          ) : (
            <span className="breadcrumb-current">{crumb?.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default BreadcrumbTracker;