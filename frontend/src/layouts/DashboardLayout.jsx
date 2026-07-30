import { NavLink, Outlet } from 'react-router-dom';
import ScrollToTop from '../shared/components/ScrollToTop';

const topLinks = [
  { label: 'Problems', path: '/user/problems' },
  { label: 'Articles', path: '/user/articles' },
  { label: 'Videos', path: '/user/videos' },
  { label: 'Dashboard', path: '/user/dashboard' },
];

const sideLinks = [
  { label: 'Dashboard', path: '/user/dashboard' },
  { label: 'All Problems', path: '/user/problems' },
  { label: 'Solved Problems', path: '/user/solved' },
  { label: 'Saved Problems', path: '/user/saved' },
  { label: 'Articles', path: '/user/articles' },
  { label: 'Videos', path: '/user/videos' },
  { label: 'Progress', path: '/user/progress' },
];

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <ScrollToTop />
      <header className="sticky top-0 z-20 border-b border-[#2f2f2f] bg-[#222222]">
        <nav className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <NavLink
              className="font-heading text-2xl font-extrabold text-white"
              to="/user/dashboard"
            >
              AlgoArena
            </NavLink>

            <div className="hidden items-center gap-6 md:flex">
              {topLinks.map((link) => (
                <NavLink
                  className={({ isActive }) =>
                    `pt-5 pb-5 text-sm font-semibold transition ${
                      isActive
                        ? 'border-b-2 border-white text-white'
                        : 'text-gray-400 hover:text-white'
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

          <div className="flex items-center gap-4">
            <div className="hidden rounded-full bg-[#333333] px-4 py-2 text-sm text-gray-400 md:block">
              Search
            </div>

            <NavLink
              className="rounded-md bg-[#333333] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3f3f3f]"
              to="/user/profile"
            >
              Profile
            </NavLink>
          </div>
        </nav>
      </header>

      <div className="grid min-h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="hidden border-r border-[#2f2f2f] bg-[#1a1a1a] p-4 lg:block">
          <div className="space-y-2">
            {sideLinks.map((link) => (
              <NavLink
                className={({ isActive }) =>
                  `block rounded-md px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-[#2f2f2f] text-white'
                      : 'text-gray-400 hover:bg-[#252525] hover:text-white'
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

export default DashboardLayout;
