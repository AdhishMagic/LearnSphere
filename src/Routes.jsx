import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AdminDashboard from './pages/admin-dashboard';
import LoginScreen from './pages/login-screen';
import LearnerCoursesListing from './pages/learner-courses-listing';

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
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
