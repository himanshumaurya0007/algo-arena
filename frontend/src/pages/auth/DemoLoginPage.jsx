/**
 * DemoLoginPage - High-converting authentication & demo login landing page for AlgoArena.
 * Rendered on route: /
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import {
  FiCode,
  FiZap,
  FiArrowRight,
  FiUser,
  FiLock,
  FiCheckCircle,
  FiCpu,
  FiAward,
} from 'react-icons/fi';
import { AVAILABLE_USERS } from '../profile/data/dummyProfileData';

function DemoLoginPage() {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(AVAILABLE_USERS[0].username);
  const [emailInput, setEmailInput] = useState(AVAILABLE_USERS[0].username + '@algoarena.dev');
  const [passwordInput, setPasswordInput] = useState('demo123456');
  const [isLoading, setIsLoading] = useState(false);

  // Quick select a demo profile card
  const handleSelectCard = (user) => {
    setSelectedUser(user.username);
    setEmailInput(`${user.username}@algoarena.dev`);
    setPasswordInput('demo123456');
  };

  // Perform Demo Login
  const handleLogin = (usernameToLogin = selectedUser) => {
    setIsLoading(true);
    const userObj = AVAILABLE_USERS.find((u) => u.username === usernameToLogin) || AVAILABLE_USERS[0];

    setTimeout(() => {
      // Store session in localStorage
      localStorage.setItem('algoarena_active_user', usernameToLogin);

      toast.success(`Logged in as ${userObj.displayName}! Redirecting to profile...`, {
        icon: '🚀',
        duration: 3000,
      });

      setTimeout(() => {
        setIsLoading(false);
        navigate('/profile');
      }, 800);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background text-text flex flex-col justify-between selection:bg-secondary selection:text-white">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '12px',
            background: '#1e293b',
            color: '#f8fafc',
            border: '1px solid #334155',
          },
        }}
      />

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-border bg-surface/80 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-secondary to-indigo-500 font-bold text-white shadow-lg shadow-secondary/25">
              AA
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-text">AlgoArena</span>
              <span className="ml-2 rounded-full bg-secondary/10 px-2 py-0.5 text-xs font-semibold text-secondary">
                v2.0
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleLogin('akashpatel')}
              className="flex items-center gap-2 rounded-xl bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary transition-all hover:bg-secondary hover:text-white"
            >
              <span>Instant Demo</span>
              <FiArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Hero & Auth Section */}
      <main className="mx-auto my-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Hero Content */}
          <div className="space-y-8 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-3.5 py-1.5 text-xs font-semibold text-secondary">
                <FiZap className="h-3.5 w-3.5" />
                <span>Next-Gen Developer Profile & Coding Platform</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-text sm:text-5xl lg:text-6xl">
                Master Algorithms.{' '}
                <span className="bg-gradient-to-r from-secondary via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Showcase Your Profile.
                </span>
              </h1>

              <p className="max-w-2xl text-base text-text-muted sm:text-lg">
                AlgoArena combines competitive coding analytics, education history, work experience,
                and social platform integrations into a unified developer profile.
              </p>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid gap-4 sm:grid-cols-2"
            >
              <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-surface/60 p-4 backdrop-blur-sm">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <FiUser className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text">Complete User Profile</h3>
                  <p className="mt-1 text-xs text-text-muted">
                    Detailed personal info, education timeline, work experience & social links.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-surface/60 p-4 backdrop-blur-sm">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                  <FiCode className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text">Platform Integrations</h3>
                  <p className="mt-1 text-xs text-text-muted">
                    Sync LeetCode, Codeforces, GitHub, LinkedIn, and personal portfolios.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-surface/60 p-4 backdrop-blur-sm">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <FiAward className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text">Achievements & Skills</h3>
                  <p className="mt-1 text-xs text-text-muted">
                    Highlight certifications, coding contests, frameworks, and job preferences.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-surface/60 p-4 backdrop-blur-sm">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                  <FiCpu className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text">Interactive Editing</h3>
                  <p className="mt-1 text-xs text-text-muted">
                    4-step intuitive profile wizard with instant draft saving & validation.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quick Demo User Persona Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Choose a Demo Profile to Explore:
                </p>
                <span className="text-xs text-secondary font-medium">Click card to auto-fill</span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {AVAILABLE_USERS.map((user) => {
                  const isSelected = selectedUser === user.username;
                  return (
                    <div
                      key={user.username}
                      onClick={() => handleSelectCard(user)}
                      className={`group relative flex cursor-pointer items-center justify-between rounded-2xl border p-3.5 transition-all duration-200 ${
                        isSelected
                          ? 'border-secondary bg-secondary/10 shadow-lg shadow-secondary/10 ring-2 ring-secondary/30'
                          : 'border-border bg-surface hover:border-secondary/40 hover:bg-surface/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.displayName}
                          className="h-10 w-10 rounded-full object-cover ring-2 ring-border group-hover:ring-secondary"
                        />
                        <div>
                          <p className="text-sm font-bold text-text">{user.displayName}</p>
                          <p className="text-xs text-text-muted">{user.role}</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLogin(user.username);
                        }}
                        className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors ${
                          isSelected
                            ? 'bg-secondary text-white shadow-sm'
                            : 'bg-background text-text-muted hover:bg-secondary hover:text-white'
                        }`}
                      >
                        Login
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Demo Login Form Card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-3xl border border-border bg-surface p-8 shadow-2xl shadow-black/40 backdrop-blur-2xl"
            >
              <div className="mb-6 space-y-2 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary ring-4 ring-secondary/20">
                  <FiLock className="h-7 w-7" />
                </div>
                <h2 className="text-2xl font-extrabold text-text">Demo Login</h2>
                <p className="text-xs text-text-muted">
                  Select any persona or click below to access the AlgoArena profile.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin(selectedUser);
                }}
                className="space-y-5"
              >
                {/* User Preset Selector */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-text">
                    Active Demo Account
                  </label>
                  <select
                    value={selectedUser}
                    onChange={(e) => {
                      const found = AVAILABLE_USERS.find((u) => u.username === e.target.value);
                      if (found) handleSelectCard(found);
                    }}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  >
                    {AVAILABLE_USERS.map((user) => (
                      <option key={user.username} value={user.username}>
                        {user.displayName} (@{user.username}) - {user.role}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Email Field */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-text">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="user@algoarena.dev"
                      className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-text outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                      required
                    />
                    <FiUser className="absolute left-3.5 top-3.5 h-4 w-4 text-text-muted" />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-text">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-text outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                      required
                    />
                    <FiLock className="absolute left-3.5 top-3.5 h-4 w-4 text-text-muted" />
                  </div>
                </div>

                {/* Demo Mode Badge */}
                <div className="flex items-center justify-between rounded-xl bg-background p-3 text-xs text-text-muted">
                  <span className="flex items-center gap-1.5 font-medium text-emerald-400">
                    <FiCheckCircle className="h-4 w-4" /> Pre-authenticated Demo
                  </span>
                  <span className="text-[11px]">No registration required</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-secondary py-3.5 text-sm font-bold text-white shadow-lg shadow-secondary/30 transition-all hover:bg-secondary/90 hover:shadow-xl disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Login & View Profile</span>
                      <FiArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Quick Persona Buttons */}
              <div className="mt-6 border-t border-border/60 pt-5 text-center">
                <p className="mb-3 text-xs text-text-muted">Or quick login with one click:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {AVAILABLE_USERS.map((user) => (
                    <button
                      key={user.username}
                      type="button"
                      onClick={() => handleLogin(user.username)}
                      className="rounded-lg bg-background px-2.5 py-1.5 text-xs font-medium text-text-muted transition-colors hover:bg-secondary/20 hover:text-secondary"
                    >
                      {user.displayName.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface/50 py-6 text-center text-xs text-text-muted">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <p>© 2026 AlgoArena. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-text cursor-pointer">Terms of Service</span>
            <span className="hover:text-text cursor-pointer">Privacy Policy</span>
            <span className="hover:text-text cursor-pointer">Documentation</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default DemoLoginPage;

