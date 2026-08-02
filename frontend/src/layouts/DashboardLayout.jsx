import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import ScrollToTop from '../shared/components/ScrollToTop';

const topLinks = [
  { label: 'Dashboard', path: '/user/dashboard' },
  { label: 'Problems', path: '/user/problems' },
  { label: 'Articles', path: '/user/articles' },
  { label: 'Videos', path: '/user/videos' },
];

function DashboardLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }
  return (
    <div className="bg-background text-text min-h-screen">
      <ScrollToTop />

      <header className="border-border bg-surface sticky top-0 z-20 border-b">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <div className="flex min-w-0 items-center gap-8">
            <NavLink
              className="font-heading text-primary shrink-0 text-2xl font-extrabold"
              to="/user/dashboard"
            >
              AlgoArena
            </NavLink>

            <div className="hidden items-center gap-5 lg:flex">
              {topLinks.map((link) => (
                <NavLink
                  className={({ isActive }) =>
                    `pt-5 pb-5 text-sm font-semibold transition ${
                      isActive
                        ? 'border-primary text-primary border-b-2'
                        : 'text-text-muted hover:text-primary'
                    }`
                  }
                  key={link.label}
                  to={link.path}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <NavLink
              className="bg-primary rounded-md px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              to="/user/profile"
            >
              Profile
            </NavLink>

            <button
              className="bg-secondary hover:bg-warning hover:text-text rounded-md px-4 py-2 text-sm font-semibold text-white transition"
              onClick={handleLogout}
              type="button"
            >
              Logout
            </button>
          </div>
        </nav>

        <div className="border-border mx-auto flex max-w-7xl gap-4 overflow-x-auto border-t px-5 py-3 lg:hidden">
          {topLinks.map((link) => (
            <NavLink
              className={({ isActive }) =>
                `shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'bg-background text-text-muted hover:text-primary'
                }`
              }
              key={link.label}
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

export default DashboardLayout;
