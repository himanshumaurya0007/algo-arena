import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../shared/store/authStore';

function MainLayout({ children }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="bg-surface border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="text-xl font-bold text-primary font-heading">
                AlgoArena
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link to="/problems" className="text-text-muted hover:text-text transition-colors">
                  Problems
                </Link>
                <Link to="/articles" className="text-text-muted hover:text-text transition-colors">
                  Articles
                </Link>
                <Link to="/videos" className="text-text-muted hover:text-text transition-colors">
                  Videos
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-text-muted hover:text-text transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="text-text-muted hover:text-text transition-colors"
                  >
                    Profile
                  </Link>
                  {user.role === 'Admin' && (
                    <Link
                      to="/admin"
                      className="text-amber-500 hover:text-amber-400 transition-colors"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary/90 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-text-muted hover:text-text transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary/90 transition-colors"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-text-muted text-sm">
              &copy; {new Date().getFullYear()} AlgoArena. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/problems" className="text-text-muted text-sm hover:text-text">
                Problems
              </Link>
              <Link to="/articles" className="text-text-muted text-sm hover:text-text">
                Articles
              </Link>
              <Link to="/videos" className="text-text-muted text-sm hover:text-text">
                Videos
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
