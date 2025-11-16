// Client API réel pour communiquer avec le backend Express
// Utilise fetch vers l'API Node (login, register, etc.)

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5132';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  let data: any = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message =
      (data && (data.message || data.error)) || `Erreur API (${response.status})`;
    const error: any = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
