/**
 * ProfileService - Mock API service for profile operations.
 * Replace with actual API calls when backend is ready.
 */

import { getDummyProfileData } from './dummyProfileData';

const STORAGE_KEY = 'algoarena_profile';

/**
 * Simulate network delay
 */
function delay(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate a unique ID
 */
function generateId(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Simulate random API failure (for testing error states)
 */
function simulateError() {
  // 10% chance of failure
  if (Math.random() < 0.1) {
    throw new Error('Network error. Please try again.');
  }
}

/**
 * Fetch profile by username
 * @param {string} username
 * @returns {Promise<Object>} profile data
 */
export async function fetchProfile(username) {
  await delay(600);

  // Try to get from localStorage first
  const stored = localStorage.getItem(`${STORAGE_KEY}_${username}`);
  if (stored) {
    return JSON.parse(stored);
  }

  // Fall back to dummy data
  const dummy = getDummyProfileData();
  dummy.username = username;
  return dummy;
}

/**
 * Save profile (create or update)
 * @param {Object} profileData
 * @returns {Promise<Object>} response with saved data
 */
export async function saveProfile(profileData) {
  await delay(500);
  simulateError();

  const saved = {
    ...profileData,
    updatedAt: new Date().toISOString(),
  };

  // Persist to localStorage
  localStorage.setItem(`${STORAGE_KEY}_${profileData.username}`, JSON.stringify(saved));

  return {
    success: true,
    message: 'Profile saved successfully!',
    data: saved,
  };
}

/**
 * Save profile as draft
 * @param {Object} profileData
 * @returns {Promise<Object>} response with draft data
 */
export async function saveDraft(profileData) {
  await delay(300);

  const draft = {
    ...profileData,
    isDraft: true,
    savedAt: new Date().toISOString(),
  };

  localStorage.setItem(`${STORAGE_KEY}_${profileData.username}_draft`, JSON.stringify(draft));

  return {
    success: true,
    message: 'Draft saved successfully!',
    data: draft,
  };
}

/**
 * Upload file (mock)
 * @param {File} file
 * @returns {Promise<Object>} response with file URL
 */
export async function uploadFile(file) {
  await delay(1000);

  // Simulate upload - in production, this would send to a cloud storage
  const fileUrl = URL.createObjectURL(file);

  return {
    success: true,
    url: fileUrl,
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
  };
}

/**
 * Generate a unique list ID
 */
export function createNewId(prefix) {
  return generateId(prefix);
}

export default {
  fetchProfile,
  saveProfile,
  saveDraft,
  uploadFile,
  createNewId,
};

