

import { Routes, Route, Navigate } from 'react-router-dom';
import DemoLoginPage from '../pages/auth/DemoLoginPage';
import ProfilePage from '../pages/profile/ProfilePage';

function App() {
  return (
    <Routes>
      {/* Demo Login Page on / */}
      <Route path="/" element={<DemoLoginPage />} />

      {/* User Profile Page routes */}
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/users/profile" element={<ProfilePage />} />
      <Route path="/users/profile/:username" element={<ProfilePage />} />

      {/* Catch-all fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );

