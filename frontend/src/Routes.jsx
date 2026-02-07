import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/layout/ScrollToTop";
import ErrorBoundary from "./components/layout/ErrorBoundary";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from './pages/admin-dashboard';
import LoginScreen from './pages/auth';
import LearnerCoursesListing from './pages/learner';
import AdminCoursesPage from './pages/admin-courses';
import AdminUsersPage from './pages/admin-users';
import AdminReportsPage from './pages/admin-reports';
import AdminAnalyticsPage from './pages/admin-analytics/AdminAnalyticsPage';
import AdminSettingsPage from './pages/admin-settings/AdminSettingsPage';
import InstructorCoursesPage from './pages/instructor-courses';
import CourseForm from './pages/course-form';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your route here */}
          <Route path="/" element={<LoginScreen />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/login-screen" element={<LoginScreen />} />
          <Route path="/learner-courses-listing" element={<LearnerCoursesListing />} />
          <Route path="/admin/courses" element={<AdminCoursesPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/reports" element={<AdminReportsPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
          <Route path="/instructor/courses" element={<InstructorCoursesPage />} />
          <Route path="/instructor/courses/create" element={<CourseForm />} />
          <Route path="/instructor/courses/edit/:courseId" element={<CourseForm />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
