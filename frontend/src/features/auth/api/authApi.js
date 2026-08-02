// import API_BASE_URL from '../../../shared/api/apiClient';

// export async function loginUser(credentials) {
//   const response = await fetch(`${API_BASE_URL}/auth/login`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(credentials),
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || 'Invalid email or password.');
//   }

//   return data;
// }

// export async function registerUser(payload) {
//   const response = await fetch(`${API_BASE_URL}/auth/register`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(payload),
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || 'Registration failed.');
//   }

//   return data;
// }

import API_BASE_URL from '../../../shared/api/apiClient';

// ===========================
// User Login
// ===========================
export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Invalid email or password.");
  }

  return data;
}

// ===========================
// User Registration
// ===========================
export async function registerUser(payload) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed.");
  }

  return data;
}

// ===========================
// Admin Login
// ===========================
export async function loginAdmin(credentials) {
  const response = await fetch(`${API_BASE_URL}/admin/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Invalid admin email or password.");
  }

  return data;
}