export const API_BASE_URL = 'https://votre-api-symfony.com/api';

export async function apiFetch(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Erreur API : ${response.status}`);
  }

  return response.json();
}
