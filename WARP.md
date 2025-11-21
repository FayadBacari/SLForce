# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**SLForce** is a full-stack coaching platform connecting athletes ("eleves") with coaches. The platform features real-time messaging, payment subscriptions (PayPal for athletes, Stripe for coaches), and role-based access control.

### Technology Stack

- **Backend**: Node.js + Express + TypeScript + MongoDB (Mongoose)
- **Frontend**: React Native (Expo) + TypeScript + expo-router for navigation
- **Authentication**: JWT tokens with bcrypt password hashing
- **Database**: MongoDB Atlas

## Architecture

### Monorepo Structure

The repository contains three main directories:

- `slf-backend/`: Express API server
- `slf-frontend/`: React Native mobile app (Expo)
- `conception/`: Design documents (data dictionary, business rules, security strategy)

### Backend Architecture (`slf-backend/`)

The backend follows a layered MVC-style architecture:

```
src/
├── server.ts          # HTTP server entry point
├── index.ts           # Express app configuration, middleware, MongoDB connection
├── models/            # Mongoose schemas (User with embedded CoachProfile)
├── controllers/       # Request handlers (auth.controller.ts)
├── services/          # Business logic (auth.services.ts: hashing, JWT)
├── routes/            # Express route definitions (auth.routes.ts)
├── middlewares/       # Auth middleware for protected routes
├── types/             # TypeScript type definitions
├── utils/             # Helper utilities
└── config/            # Configuration files
```

**Key Backend Patterns**:
- **User Model**: Single `User` collection with a `role` field ('eleve' or 'coach') and optional embedded `coachProfile` for coaches
- **Authentication Flow**: Register → hash password → save user → generate JWT. Login → verify credentials → return JWT
- **Coach Names**: Must be unique (validated via `checkCoachName` endpoint)
- **Environment**: `.env` file contains `PORT`, `MONGODB_URI`, and `JWT_SECRET`

### Frontend Architecture (`slf-frontend/`)

The frontend uses Expo Router for file-based routing:

```
app/
├── _layout.tsx              # Root layout with theme provider
├── (tabs)/                  # Tab-based navigation group
│   ├── _layout.tsx          # Tab navigator configuration
│   ├── index.tsx            # Home/landing screen
│   ├── register.tsx         # User registration entry
│   ├── registerCoach.tsx    # Coach-specific registration
│   ├── profile.tsx          # Athlete profile
│   ├── profileCoach.tsx     # Coach profile
│   ├── settingProfil.tsx    # Profile settings
│   ├── settings.tsx         # App settings
│   ├── search.tsx           # Coach search
│   ├── chat.tsx             # Chat list
│   ├── gpu.tsx              # GPU/performance features
│   ├── payment.tsx          # Payment management
│   ├── support.tsx          # Support screen
│   └── privacy.tsx          # Privacy policy
└── chat/
    └── [id].tsx             # Individual chat screen (dynamic route)

components/
├── authForm.tsx             # Reusable authentication forms
├── navigation.tsx           # Navigation helpers
├── searchHeader.tsx         # Search UI component
├── SwipeBackLayout.tsx      # Gesture-based navigation
├── SettingCard.tsx          # Settings UI components
└── ui/                      # UI primitives

services/
└── auth.ts                  # API client (apiFetch utility)

styles/                      # Screen-specific StyleSheet definitions
```

**Key Frontend Patterns**:
- **File-based routing**: Expo Router uses file names for navigation (e.g., `(tabs)/profile.tsx` → `/profile`)
- **API Communication**: `services/auth.ts` contains `apiFetch` wrapper for backend calls
- **Styles**: Separate files in `styles/` directory match screen names (e.g., `profile.ts` for `profile.tsx`)
- **Environment**: `EXPO_PUBLIC_API_URL` environment variable for backend URL (defaults to `http://localhost:5132`)

### Data Model

The application uses a **dual-role user model**:

- **Base User**: email, password, firstName, lastName, role ('eleve' | 'coach')
- **Coach Profile** (embedded): name (unique pseudo), avatar, speciality, location, price, experience, description, skills[]

**Payment Integration** (planned but not yet implemented):
- Athletes: PayPal subscriptions
- Coaches: Stripe subscriptions for receiving payments
- Messaging: Stream Chat integration (referenced but not fully implemented)

## Development Commands

### Backend (`slf-backend/`)

```bash
cd slf-backend

# Install dependencies
npm install

# Development server (hot reload)
npm run dev

# Build TypeScript
npm run build

# Production start
npm start

# TypeScript compilation check
npx tsc --noEmit
```

**Backend runs on**: Port 5132 (configured in `.env`)

### Frontend (`slf-frontend/`)

```bash
cd slf-frontend

# Install dependencies
npm install

# Start development server
npm start

# Run on specific platforms
npm run android
npm run ios
npm run web

# Type checking
npm run typecheck

# Linting
npm run lint
npm run lint:fix

# Code formatting
npm run format
```

**Frontend connects to**: `EXPO_PUBLIC_API_URL` (default: `http://localhost:5132`)

### Environment Setup

**Backend `.env` required variables**:
```
PORT=5132
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
```

**Frontend environment** (optional):
- Set `EXPO_PUBLIC_API_URL` to point to backend (e.g., for physical device testing)

## Testing Strategy

⚠️ **No test suite currently exists**. When implementing tests:

- Backend: Consider using Jest with supertest for API endpoint testing
- Frontend: React Native Testing Library for component tests
- Check for existing test scripts before adding new ones

## Code Quality Tools

### Frontend

- **ESLint**: Configured with TypeScript, React hooks, and Prettier integration
- **Prettier**: Code formatting (see `.prettierrc`)
- **Husky**: Git hooks configured (see `.husky/`)
- **lint-staged**: Auto-format on commit

Run `npm run lint:fix` and `npm run format` before committing frontend changes.

### Backend

- **TypeScript Strict Mode**: Enabled with additional strict flags (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`)
- Run `npx tsc --noEmit` to check for type errors

## Business Rules (from `conception/gestion rules.md`)

Key constraints to maintain when modifying code:

1. **Registration**: Users must choose role (athlete/coach) at registration
2. **Coach Names**: Must be unique across all coaches (validated via API)
3. **Authentication**: JWT-based, 8 failed login attempts limit (not yet implemented)
4. **Athletes**: Must provide weight category, competition date
5. **Coaches**: Must define monthly subscription price
6. **Subscriptions**: Athletes use PayPal, Coaches use Stripe (planned, not implemented)
7. **Messaging**: Coach-athlete only, via Stream Chat (referenced, not implemented)
8. **Admin**: Can delete/ban accounts (admin model exists in data dictionary but not implemented)

## Common Patterns

### Adding a New Backend Route

1. Define route handler in `controllers/`
2. Add business logic to `services/` if complex
3. Register route in appropriate file under `routes/`
4. Import and mount in `src/index.ts`
5. Add authentication middleware if needed: `router.post('/protected', authRequired, handler)`

### Adding a New Frontend Screen

1. Create `app/(tabs)/screenname.tsx` for tab navigation
2. Create matching `styles/screenname.ts` for styles
3. Tab will auto-register (Expo Router file-based routing)
4. For dynamic routes, use `[param].tsx` syntax
5. Use `services/auth.ts` `apiFetch()` for API calls

### Authentication Flow

**Backend**: Uses JWT stored in Authorization header as `Bearer <token>`
**Frontend**: Store token securely (consider expo-secure-store), attach to requests:
```typescript
headers: {
  'Authorization': `Bearer ${token}`
}
```

## MongoDB Connection

The app connects to MongoDB Atlas on startup (see `src/index.ts`). Connection string is in `.env` as `MONGODB_URI`. If connection fails, the server exits with error code 1.

## Known Limitations

- No admin functionality implemented yet (referenced in data dictionary)
- Payment integrations (PayPal, Stripe) not implemented
- Stream Chat integration not complete
- No password reset functionality (mentioned in business rules)
- No test coverage
- No CI/CD pipeline configured
