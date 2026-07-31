/**
 * ProfilePage - Main AlgoArena User Profile Page.
 * Route: /profile
 * Supports switching between View Overview & Edit Wizard, and selecting Demo Users.
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { FiEye, FiEdit3, FiLogOut } from 'react-icons/fi';

import Sidebar from './components/Sidebar';
import UserSelector from './components/UserSelector';
import ProfileStepper from './components/ProfileStepper';
import ProfileOverview from './components/ProfileOverview';
import { fetchProfile } from './data/ProfileService';

function ProfilePage() {
  const navigate = useNavigate();
  // Active user session (from localStorage or default to 'akashpatel')
  const [selectedUsername, setSelectedUsername] = useState(() => {
    return localStorage.getItem('algoarena_active_user') || 'akashpatel';
  });

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'edit'
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load profile data whenever selected username changes
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await fetchProfile(selectedUsername);
        setProfileData(data);
      } catch (err) {
        toast.error('Failed to load profile data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [selectedUsername]);

  const handleUserChange = (username) => {
    setSelectedUsername(username);
    localStorage.setItem('algoarena_active_user', username);
    toast.success(`Switched profile to @${username}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('algoarena_active_user');
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-background text-text">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '12px',
            background: '#1e293b',
            color: '#ffffff',
            border: '1px solid #334155',
          },
        }}
      />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 border-b border-border bg-surface/80 px-6 py-4 backdrop-blur-xl">
          <div className="mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between max-w-6xl">
            {/* Title & Tab Switcher */}
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-lg font-extrabold text-text">User Profile</h1>
                <p className="text-xs text-text-muted">@{selectedUsername}</p>
              </div>

              {/* View / Edit Mode Toggle Tabs */}
              <div className="flex items-center rounded-xl bg-background p-1 border border-border">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                    activeTab === 'overview'
                      ? 'bg-secondary text-white shadow-sm'
                      : 'text-text-muted hover:text-text'
                  }`}
                >
                  <FiEye className="h-3.5 w-3.5" />
                  Overview
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('edit')}
                  className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                    activeTab === 'edit'
                      ? 'bg-secondary text-white shadow-sm'
                      : 'text-text-muted hover:text-text'
                  }`}
                >
                  <FiEdit3 className="h-3.5 w-3.5" />
                  Edit Wizard
                </button>
              </div>
            </div>

            {/* Right Side: Demo User Switcher & Logout */}
            <div className="flex items-center gap-3">
              <UserSelector
                currentUsername={selectedUsername}
                onUserChange={handleUserChange}
              />

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-text-muted transition-colors hover:bg-danger/10 hover:text-danger"
                title="Logout"
              >
                <FiLogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <div className="space-y-4 text-center">
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-secondary border-t-transparent" />
                <p className="text-sm font-medium text-text-muted">Loading user profile...</p>
              </div>
            </div>
          ) : activeTab === 'overview' ? (
            <ProfileOverview
              data={profileData}
              onEditClick={() => setActiveTab('edit')}
            />
          ) : (
            <ProfileStepper
              username={selectedUsername}
              key={selectedUsername}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default ProfilePage;

