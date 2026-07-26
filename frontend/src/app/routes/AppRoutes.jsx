import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';
import Landing from '../pages/Landing';
import { Login, Register } from '../auth';
import Dashboard from '../pages/Dashboard';
import ProblemsList from '../pages/ProblemsList';
import ProblemDetail from '../pages/ProblemDetail';
import SolveProblem from '../pages/SolveProblem';
import Submissions from '../pages/Submissions';
import Profile from '../pages/Profile';
import Articles from '../pages/Articles';
import ArticleDetail from '../pages/ArticleDetail';
import Videos from '../pages/Videos';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminCategories from '../pages/admin/AdminCategories';
import AdminTopics from '../pages/admin/AdminTopics';
import AdminProblems from '../pages/admin/AdminProblems';
import AdminUsers from '../pages/admin/AdminUsers';

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Landing />
          </MainLayout>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Public browsing */}
      <Route
        path="/problems"
        element={
          <MainLayout>
            <ProblemsList />
          </MainLayout>
        }
      />
      <Route
        path="/problems/:slug"
        element={
          <MainLayout>
            <ProblemDetail />
          </MainLayout>
        }
      />
      <Route
        path="/articles"
        element={
          <MainLayout>
            <Articles />
          </MainLayout>
        }
      />
      <Route
        path="/articles/:slug"
        element={
          <MainLayout>
            <ArticleDetail />
          </MainLayout>
        }
      />
      <Route
        path="/videos"
        element={
          <MainLayout>
            <Videos />
          </MainLayout>
        }
      />

      {/* Solve - Requires Auth */}
      <Route
        path="/solve/:slug"
        element={
          <ProtectedRoute>
            <SolveProblem />
          </ProtectedRoute>
        }
      />

      {/* Protected User Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/submissions"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Submissions />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="Admin">
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/categories"
        element={
          <ProtectedRoute requiredRole="Admin">
            <AdminLayout>
              <AdminCategories />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/topics"
        element={
          <ProtectedRoute requiredRole="Admin">
            <AdminLayout>
              <AdminTopics />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/problems"
        element={
          <ProtectedRoute requiredRole="Admin">
            <AdminLayout>
              <AdminProblems />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute requiredRole="Admin">
            <AdminLayout>
              <AdminUsers />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;

