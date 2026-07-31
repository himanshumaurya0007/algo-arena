import { NavLink, Outlet } from 'react-router-dom';
import ScrollToTop from '../shared/components/ScrollToTop';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

function PublicLayout() {
  return (
    <div className="bg-background text-text min-h-screen">
      <ScrollToTop />

      <header className="border-border bg-surface border-b">
        <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
          <NavLink
            className="font-heading text-primary text-2xl font-extrabold"
            to="/"
          >
            AlgoArena
          </NavLink>

          <div className="flex flex-wrap items-center gap-3 sm:gap-5">
            {navLinks.map((link) => (
              <NavLink
                className={({ isActive }) =>
                  `text-sm font-semibold transition ${
                    isActive
                      ? 'text-primary'
                      : 'text-text-muted hover:text-primary'
                  }`
                }
                key={link.path}
                to={link.path}
              >
                {link.label}
              </NavLink>
            ))}

            <NavLink
              className="border-primary text-primary hover:bg-primary rounded-md border px-4 py-2 text-sm font-semibold transition hover:text-white"
              to="/login"
            >
              Login
            </NavLink>
          </div>
        </nav>
      </header>

      <Outlet />

      <footer className="border-border border-t">
        <div className="text-text-muted mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-sm sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>AlgoArena</p>
          <p>Practice. Learn. Improve.</p>
        </div>
      </footer>
    </div>
  );
}

export default PublicLayout;
