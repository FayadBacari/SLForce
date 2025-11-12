import * as SecureStore from 'expo-secure-store';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5132/api';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = await SecureStore.getItemAsync('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  if (!res.ok) {
    const message = await res.text();
    throw new Error(`Erreur API (${res.status}): ${message}`);
  }

  return res.json();
}