/**
 * Main Application Component
 * Defines routing for AlgoArena Demo Login & User Profile.
 */

import { Routes, Route, Navigate } from 'react-router-dom';
import DemoLoginPage from '../pages/auth/DemoLoginPage';
import ProfilePage from '../pages/profile/ProfilePage';

function App() {
  return (
    <Routes>
      {/* Demo Login Page on / */}
      <Route path="/" element={<DemoLoginPage />} />

      {/* User Profile Page on /profile */}
      <Route path="/profile" element={<ProfilePage />} />

      {/* Legacy / Alias route for /users/profile */}
      <Route path="/users/profile" element={<Navigate to="/profile" replace />} />

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
