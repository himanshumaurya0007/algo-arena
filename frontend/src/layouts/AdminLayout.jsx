import { NavLink, Outlet } from 'react-router-dom';
import ScrollToTop from '../shared/components/ScrollToTop';

const topLinks = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Problems', path: '/admin/problems' },
  { label: 'Articles', path: '/admin/articles' },
  { label: 'Videos', path: '/admin/videos' },
  { label: 'Users', path: '/admin/users' },
];

const sideLinks = [
  { label: 'Overview', path: '/admin/dashboard' },
  { label: 'Manage Problems', path: '/admin/problems' },
  { label: 'Manage Articles', path: '/admin/articles' },
  { label: 'Manage Videos', path: '/admin/videos' },
  { label: 'Manage Users', path: '/admin/users' },
  { label: 'Submissions', path: '/admin/submissions' },
  { label: 'Reports', path: '/admin/reports' },
  { label: 'Settings', path: '/admin/settings' },
];

function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#111827] text-white">
      <ScrollToTop />

      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#172033]">
        <nav className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <NavLink
              className="font-heading text-2xl font-extrabold text-white"
              to="/admin/dashboard"
            >
              AlgoArena Admin
            </NavLink>

            <div className="hidden items-center gap-6 md:flex">
              {topLinks.map((link) => (
                <NavLink
                  className={({ isActive }) =>
                    `pb-5 pt-5 text-sm font-semibold transition ${
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

          <NavLink
            className="rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
            to="/admin/profile"
          >
            Admin Profile
          </NavLink>
        </nav>
      </header>

      <div className="grid min-h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-[270px_1fr]">
        <aside className="hidden border-r border-white/10 bg-[#121a2a] p-4 lg:block">
          <div className="space-y-2">
            {sideLinks.map((link) => (
              <NavLink
                className={({ isActive }) =>
                  `block rounded-md px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-[#1f2a44] text-white'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`
                }
                key={link.path}
                to={link.path}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </aside>

        <main className="p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
