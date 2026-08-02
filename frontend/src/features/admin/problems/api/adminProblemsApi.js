import API_BASE_URL from '../../../../shared/api/apiClient';

export async function getAdminProblems() {
  const response = await fetch(`${API_BASE_URL}/admin/problems`);

  if (!response.ok) {
    throw new Error('Unable to load problems.');
  }

  return response.json();
}

export async function deleteAdminProblem(id) {
  const response = await fetch(`${API_BASE_URL}/admin/problems/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Unable to delete problem.');
  }
}

export async function publishAdminProblem(id) {
  const response = await fetch(`${API_BASE_URL}/admin/problems/${id}/publish`, {
    method: 'PATCH',
  });

  if (!response.ok) {
    throw new Error('Unable to publish problem.');
  }
}

export async function unpublishAdminProblem(id) {
  const response = await fetch(
    `${API_BASE_URL}/admin/problems/${id}/unpublish`,
    {
      method: 'PATCH',
    },
  );

  if (!response.ok) {
    throw new Error('Unable to unpublish problem.');
  }
}

export async function getProblemFormLookups() {
  const response = await fetch(`${API_BASE_URL}/lookups/problem-form`);

  if (!response.ok) {
    throw new Error('Unable to load form options.');
  }

  return response.json();
}

export async function createAdminProblem(payload) {
  const response = await fetch(`${API_BASE_URL}/admin/problems`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error('Unable to create problem.');
  }

  return data;
}

export async function getAdminProblemById(id) {
  const response = await fetch(`${API_BASE_URL}/admin/problems/${id}`);

  if (!response.ok) {
    throw new Error('Unable to load problem.');
  }

  return response.json();
}

export async function updateAdminProblem(id, payload) {
  const response = await fetch(`${API_BASE_URL}/admin/problems/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      ...payload,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error('Unable to update problem.');
  }

  return data;
}
