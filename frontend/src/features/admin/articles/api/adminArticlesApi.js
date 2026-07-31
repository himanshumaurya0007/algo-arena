const API_BASE_URL = 'http://localhost:5036/api';

export async function getAdminArticles() {
  const response = await fetch(`${API_BASE_URL}/admin/articles`);

  if (!response.ok) {
    throw new Error('Failed to fetch admin articles');
  }

  return response.json();
}

export async function getAdminArticleById(id) {
  const response = await fetch(`${API_BASE_URL}/admin/articles/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch admin article');
  }

  return response.json();
}

export async function createAdminArticle(article) {
  const response = await fetch(`${API_BASE_URL}/admin/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
  });

  if (!response.ok) {
    throw new Error('Failed to create article');
  }

  return response.json();
}

export async function updateAdminArticle(id, article) {
  const response = await fetch(`${API_BASE_URL}/admin/articles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
  });

  if (!response.ok) {
    throw new Error('Failed to update article');
  }

  return response.json();
}

export async function deleteAdminArticle(id) {
  const response = await fetch(`${API_BASE_URL}/admin/articles/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete article');
  }
}
