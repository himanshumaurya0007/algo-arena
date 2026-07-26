import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../../shared/store/authStore';

const adminLinks = [
  { label: 'Dashboard', path: '/admin', icon: '📊' },
  { label: 'Categories', path: '/admin/categories', icon: '📂' },
  { label: 'Topics', path: '/admin/topics', icon: '🏷️' },
  { label: 'Problems', path: '/admin/problems', icon: '💻' },
  { label: 'Users', path: '/admin/users', icon: '👥' },
];

function AdminLayout({ children }) {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 bg-surface border-r border-border min-h-screen fixed left-0 top-0 overflow-y-auto">
        <div className="p-6">
          <Link to="/" className="text-xl font-bold text-amber-500 font-heading">
            Admin Panel
          </Link>
        </div>
        <nav className="px-4 space-y-1">
          {adminLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-500 font-medium'
                    : 'text-text-muted hover:text-text hover:bg-surface/50'
                }`}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <p className="text-text font-medium">{user?.username}</p>
              <p className="text-amber-500 text-xs">Admin</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-danger hover:text-danger/80"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>
      <div className="ml-64 flex-1">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
