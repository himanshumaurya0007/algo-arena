import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../../shared/store/authStore';
import { FiGrid, FiTerminal, FiFileText, FiUser, FiBook, FiVideo, FiLogOut } from 'react-icons/fi';

const sidebarLinks = [
  { label: 'Overview', path: '/dashboard', icon: FiGrid },
  { label: 'Problems', path: '/problems', icon: FiTerminal },
  { label: 'Submissions', path: '/submissions', icon: FiFileText },
  { label: 'Profile', path: '/profile', icon: FiUser },
  { label: 'Articles', path: '/articles', icon: FiBook },
  { label: 'Videos', path: '/videos', icon: FiVideo },
];

function DashboardLayout({ children }) {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-border min-h-screen fixed left-0 top-0 overflow-y-auto">
  <div className="p-6 flex justify-center">
  <Link to="/" className="flex items-center">
    {/* Outer Light Ring */}
    <div className="w-14 h-14 rounded-full bg-slate-400 p-1 shadow-lg">

      {/* Dark Border */}
      <div className="w-full h-full rounded-full bg-slate-900 p-1">

        {/* Inner Circle */}
        <div
          className="w-full h-full rounded-full flex items-center justify-center"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, #ffffff 0%, #f8fafc 70%, #eef2f7 100%)",
          }}
        >
          <span className="text-xs font-black tracking-tight">
            <span className="text-green-900">&lt;@</span>
            <span className="text-green-600">(A)</span>
            <span className="text-green-900">&gt;</span>
          </span>
        </div>

      </div>
    </div>
  </Link>
</div>
        <nav className="px-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-text-muted hover:text-text hover:bg-surface/50'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className="flex flex-col gap-2">
            <div className="text-sm truncate">
              <p className="text-text font-medium truncate">{user?.email}</p>
              
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-danger hover:text-danger/80 transition-colors"
            >
              <FiLogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64 flex-1">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
