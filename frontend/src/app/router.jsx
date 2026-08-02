import { createBrowserRouter } from 'react-router-dom';
import AdminLoginPage from '../features/auth/pages/AdminLoginPage';
import LoginChoicePage from '../features/auth/pages/LoginChoicePage';
import SignupPage from '../features/auth/pages/SignupPage';
import UserLoginPage from '../features/auth/pages/UserLoginPage';
import AboutPage from '../features/landing/pages/AboutPage';
import ContactPage from '../features/landing/pages/ContactPage';
import LandingPage from '../features/landing/pages/LandingPage';
import CodeEditorPage from '../features/problems/editor/pages/CodeEditorPage';
import UserDashboardPage from '../features/dashboard/pages/UserDashboardPage';
import DashboardLayout from '../layouts/DashboardLayout';
import MainLayout from '../layouts/MainLayout';
import AdminDashboardPage from '../features/admin/pages/AdminDashboardPage';
import AdminLayout from '../layouts/AdminLayout';
import AdminAddProblemPage from '../features/admin/problems/pages/AdminAddProblemPage';
import AdminProblemsPage from '../features/admin/problems/pages/AdminProblemsPage';
import ProblemArticlePage from '../features/learning/articles/pages/ProblemArticlePage';
import ArticlesPage from '../features/learning/articles/pages/ArticlesPage';
import AdminArticlesPage from '../features/admin/articles/pages/AdminArticlesPage';
import AdminArticleFormPage from '../features/admin/articles/pages/AdminArticleFormPage';
import ProblemsPage from '../features/problems/pages/ProblemsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'login',
        element: <LoginChoicePage />,
      },
      {
        path: 'login/user',
        element: <UserLoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: 'login/admin',
        element: <AdminLoginPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'editor',
        element: <CodeEditorPage />,
      },
    ],
  },
  {
    path: '/user',
    element: <DashboardLayout />,
    children: [
      {
        path: 'dashboard',
        element: <UserDashboardPage />,
      },
      {
        path: 'problems',
        element: <ProblemsPage />,
      },
      {
        path: 'articles',
        element: <ArticlesPage />,
      },
      {
        path: 'articles/:slug',
        element: <ProblemArticlePage />,
      },
    ],
  },
  {
    path: '/user/problems/:slug',
    element: <CodeEditorPage />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'dashboard',
        element: <AdminDashboardPage />,
      },
      {
        path: 'problems',
        element: <AdminProblemsPage />,
      },
      {
        path: 'problems/new',
        element: <AdminAddProblemPage />,
      },
      {
        path: 'problems/:id/edit',
        element: <AdminAddProblemPage />,
      },
      {
        path: 'articles',
        element: <AdminArticlesPage />,
      },
      {
        path: 'articles/new',
        element: <AdminArticleFormPage />,
      },
      {
        path: 'articles/:id/edit',
        element: <AdminArticleFormPage />,
      },
    ],
  },
]);

export default router;
