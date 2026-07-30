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
    ],
  },
]);

export default router;
