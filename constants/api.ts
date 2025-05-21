export const API_BASE_URL = 'http://127.0.0.1:8000/api';

export async function apiFetch(endpoint: string, options?: RequestInit) {
  const url = `${API_BASE_URL}${endpoint}`;
  const isFormData = options?.body instanceof FormData;
  const isGet = !options?.method || options.method.toUpperCase() === 'GET';

  const headers: Record<string, string> = {
    ...(options?.headers as Record<string, string>),
  };

  // N'ajoute Content-Type que si ce n'est pas un GET ni un FormData
  if (!isGet && !isFormData && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Erreur API : ${response.status}`);
  }

  return response.json();
}
