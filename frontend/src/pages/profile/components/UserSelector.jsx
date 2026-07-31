/**
 * UserSelector - Dropdown to switch between different user profiles.
 * Allows selecting from a list of available users without changing the URL.
 */

import { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiUser } from 'react-icons/fi';
import { AVAILABLE_USERS } from '../data/dummyProfileData';

function UserSelector({ currentUsername, onUserChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentUser = AVAILABLE_USERS.find((u) => u.username === currentUsername);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (username) => {
    onUserChange(username);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-text transition-colors hover:bg-background"
      >
        <FiUser className="h-4 w-4 text-secondary" />
        <span>{currentUser?.displayName || currentUsername}</span>
        <span className="text-xs text-text-muted">@{currentUsername}</span>
        <FiChevronDown
          className={`h-4 w-4 text-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1 w-64 rounded-lg border border-border bg-surface shadow-lg">
          <div className="px-3 py-2 text-xs font-medium text-text-muted border-b border-border">
            Switch User
          </div>
          <ul className="py-1">
            {AVAILABLE_USERS.map((user) => {
              const isActive = user.username === currentUsername;
              return (
                <li key={user.username}>
                  <button
                    type="button"
                    onClick={() => handleSelect(user.username)}
                    className={`flex w-full items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                      isActive
                        ? 'bg-secondary/10 text-secondary font-medium'
                        : 'text-text hover:bg-background'
                    }`}
                  >
                    {/* Avatar placeholder */}
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                      isActive
                        ? 'bg-secondary text-white'
                        : 'bg-background text-text-muted'
                    }`}>
                      {user.displayName.charAt(0)}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium">{user.displayName}</p>
                      <p className="text-xs text-text-muted">@{user.username}</p>
                    </div>
                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-secondary" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserSelector;

