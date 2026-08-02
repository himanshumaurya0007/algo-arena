import API_BASE_URL from '../../../../shared/api/apiClient';

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const message = await response.text();

    throw new Error(message || 'Video request failed.');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function getAdminVideos() {
  return request('/admin/videos');
}

export function getAdminVideoById(id) {
  return request(`/admin/videos/${id}`);
}

export function createAdminVideo(payload) {
  return request('/admin/videos', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateAdminVideo(id, payload) {
  return request(`/admin/videos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteAdminVideo(id) {
  return request(`/admin/videos/${id}`, {
    method: 'DELETE',
  });
}
