const API_BASE_URL = 'http://localhost:5036/api';

export async function getPublishedProblems() {
  const response = await fetch(`${API_BASE_URL}/problems`);

  if (!response.ok) {
    throw new Error('Failed to fetch problems');
  }

  return response.json();
}

export async function getProblemBySlug(slug) {
  const response = await fetch(`${API_BASE_URL}/problems/${slug}`);

  if (!response.ok) {
    throw new Error('Failed to fetch problem details');
  }

  return response.json();
}
