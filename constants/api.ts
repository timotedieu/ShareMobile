export const API_BASE_URL = 'http://127.0.0.1:8000/api';

export async function apiFetch(endpoint: string, options?: RequestInit) {
  const url = `${API_BASE_URL}${endpoint}`;
  const isFormData = options?.body instanceof FormData;
  const isGet = !options?.method || options.method.toUpperCase() === 'GET';

  // Ne pas forcer Content-Type pour GET ou FormData
  const headers: Record<string, string> = {
    ...(options?.headers as Record<string, string>),
  };
  if (!isGet && !isFormData && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Si la réponse n'est pas du JSON, retourne une erreur claire
  const contentType = response.headers.get('content-type');
  if (!response.ok) {
    throw new Error(`Erreur API : ${response.status}`);
  }
  if (!contentType || !contentType.includes('application/json')) {
    const text = await response.text();
    throw new Error('Réponse non JSON : ' + text);
  }
  return response.json();
}
