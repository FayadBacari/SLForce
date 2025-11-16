import jwt from 'jsonwebtoken';
import { Document } from 'mongoose';

if (!process.env.JWT_SECRET) {
  throw new Error('Missing JWT_SECRET in environment variables');
}

const JWT_SECRET = process.env.JWT_SECRET as jwt.Secret;
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '7d';

export interface JwtPayload {
  id: string;
  role?: string;
  iat?: number;
  exp?: number;
}

/**
 * Génère un JWT signé pour un utilisateur.
 * @param payload - objet contenant au minimum l'id (et facultativement role).
 */
export function generateToken(payload: { id: string; role?: string }) {
  const options = {
    expiresIn: JWT_EXPIRES_IN,
  } as any; // Force explicit cast to avoid TS constraint errors

  return jwt.sign(payload, JWT_SECRET, options);
}

/**
 * Vérifie et décode un token JWT. Lance une erreur si invalide.
 * @param token - le token (sans "Bearer "), exemple: 'eyJ...'
 */
export function verifyToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
  return decoded;
}

/**
 * Retire les champs sensibles d'un document Mongoose avant d'envoyer au client.
 * Utilisation : const safe = sanitizeUser(user);
 */
export function sanitizeUser(user: Document | any) {
  if (!user) return user;
  // Si c'est un document mongoose, toObject() permet d'obtenir un plain object
  const plain = typeof user.toObject === 'function' ? user.toObject() : { ...user };
  // Supprimer le mot de passe et champs internes
  delete plain.password;
  delete plain.__v;
  return plain;
}

/**
 * Validation simple d'email (RFC simplifiée). Retourne true si format ok.
 */
export function isValidEmail(email: string) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
  return re.test(String(email).toLowerCase());
}

/**
 * Helper pour récupérer le token Bearer depuis l'authorization header.
 * Retourne le token (string) ou null si absent.
 */
export function extractBearerToken(header?: string | null) {
  if (!header) return null;
  const parts = header.split(' ');
  if (parts.length === 2 && parts[0] === 'Bearer') return parts[1];
  return null;
}