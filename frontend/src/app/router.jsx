import { createBrowserRouter } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import LandingPage from '../features/public/pages/LandingPage';
import LoginChoicePage from '../features/public/pages/LoginChoicePage';
import AdminLoginPage from '../features/public/pages/AdminLoginPage';
import UserLoginPage from '../features/public/pages/UserLoginPage';
import SignupPage from '../features/public/pages/SignupPage';
import AboutPage from '../features/public/pages/AboutPage';
import ContactPage from '../features/public/pages/ContactPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
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
    ],
  },
]);

export default router;
