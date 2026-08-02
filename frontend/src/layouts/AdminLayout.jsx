import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import ScrollToTop from '../shared/components/ScrollToTop';

const topLinks = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Problems', path: '/admin/problems' },
  { label: 'Articles', path: '/admin/articles' },
  { label: 'Videos', path: '/admin/videos' },
];

function AdminLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-[#111827] text-white">
      <ScrollToTop />

      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#172033]">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <div className="flex min-w-0 items-center gap-8">
            <NavLink
              className="font-heading shrink-0 text-2xl font-extrabold text-white"
              to="/admin/dashboard"
            >
              AlgoArena Admin
            </NavLink>

            <div className="hidden items-center gap-6 lg:flex">
              {topLinks.map((link) => (
                <NavLink
                  className={({ isActive }) =>
                    `pt-5 pb-5 text-sm font-semibold transition ${
                      isActive
                        ? 'border-b-2 border-[#38bdf8] text-white'
                        : 'text-slate-400 hover:text-white'
                    }`
                  }
                  key={link.path}
                  to={link.path}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <NavLink
              className="rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
              to="/admin/profile"
            >
              Admin Profile
            </NavLink>

            <button
              className="rounded-md bg-[#f59e0b] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#fbbf24] hover:text-[#111827]"
              onClick={handleLogout}
              type="button"
            >
              Logout
            </button>
          </div>
        </nav>

        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto border-t border-white/10 px-5 py-3 lg:hidden">
          {topLinks.map((link) => (
            <NavLink
              className={({ isActive }) =>
                `shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-[#38bdf8] text-[#111827]'
                    : 'bg-white/10 text-slate-300 hover:text-white'
                }`
              }
              key={link.path}
              to={link.path}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </header>

      <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-7xl px-5 py-6 lg:px-8 lg:py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
