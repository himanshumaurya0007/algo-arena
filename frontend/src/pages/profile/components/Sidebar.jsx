/**
 * Sidebar navigation component.
 * Appears on the left for desktop, collapsible on tablet/mobile.
 */

import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiLock,
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const navItems = [
  { id: 'demo-login', label: 'Demo Login', icon: FiLock, href: '/' },
  { id: 'profile', label: 'User Profile', icon: FiUser, href: '/profile' },
];

function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('algoarena_active_user');
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-surface shadow-md lg:hidden border border-border text-text"
        aria-label={isMobileOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isMobileOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-surface border-r border-border shadow-lg transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={() => setIsMobileOpen(false)}
          className="flex items-center gap-3 border-b border-border px-6 py-5 hover:opacity-90 transition-opacity"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-secondary to-indigo-500 text-lg font-bold text-white shadow-md">
            AA
          </div>
          <div>
            <h1 className="text-base font-bold text-text">AlgoArena</h1>
            <p className="text-xs text-text-muted">User Profile Hub</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            Main Navigation
          </div>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href || (item.href === '/profile' && location.pathname === '/users/profile');

              return (
                <li key={item.id}>
                  <Link
                    to={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-secondary/10 text-secondary'
                        : 'text-text-muted hover:bg-background hover:text-text'
                    }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-secondary" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="border-t border-border px-3 py-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-danger transition-colors hover:bg-danger/10"
          >
            <FiLogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;

