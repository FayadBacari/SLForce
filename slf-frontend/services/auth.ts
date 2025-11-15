// Client API mock – aucune requête réseau réelle
// Cette fonction renvoie des réponses simulées pour les écrans d'authentification
// et d'inscription coach/élève.

type MockUser = {
  email: string;
  role: 'eleve' | 'coach';
  firstName?: string;
  lastName?: string;
};

const MOCK_TOKEN = 'mock-token';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  // Petit délai pour simuler un appel réseau
  await new Promise((resolve) => setTimeout(resolve, 400));

  // Récupération éventuelle du corps JSON
  let body: any = {};
  if (options.body && typeof options.body === 'string') {
    try {
      body = JSON.parse(options.body);
    } catch {
      body = {};
    }
  }

  if (endpoint === '/auth/login') {
    const user: MockUser = {
      email: body.email || 'user@example.com',
      role: 'eleve',
    };
    return { token: MOCK_TOKEN, user };
  }

  if (endpoint === '/auth/register') {
    const user: MockUser = {
      email: body.email || 'user@example.com',
      role: (body.role as 'eleve' | 'coach') || 'eleve',
      firstName: body.firstName,
      lastName: body.lastName,
    };
    return { token: MOCK_TOKEN, user };
  }

  // Par défaut on renvoie un objet vide pour tout autre endpoint
  return {};
}
