// ============================================
// CHAT - Types for conversations
// ============================================
export interface ConversationListItem {
  id: string;
  name: string;
  avatar: string;
  lastMsg: string;
  time: string;
  unread: number;
  status: 'online' | 'offline';
}

export interface UIMessage {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

export interface ConversationHeader {
  name: string;
  avatar: string;
  status: 'online' | 'offline';
}

// ============================================
// SEARCH - Types for searching
// ============================================
export interface StudentProfile {
  uid: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role?: 'eleve' | 'coach';
}

export interface Category {
  id: string;
  label: string;
}

export interface SearchHeaderProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  categories: Category[];
  title?: string;
  subtitle?: string;
  placeholder?: string;
}

// ============================================
// ATHLETE PROFILE - Types for the athlete profile
// ============================================
export interface AthleteRecords {
  muscleUp: string;
  traction: string;
  dips: string;
  squat: string;
}

export interface AthleteProfile {
  name: string;
  photo: string | null;
  gender: 'male' | 'female';
  weightCategory: string;
  weight: string;
  height: string;
}

// ============================================
// COACH PROFILE - Types for the coach profile
// ============================================
export interface CoachProfileData {
  name: string;
  title: string;
  photo: string | null;
  location: string;
  athletesCount: string;
  experience: string;
}

export interface CoachDetails {
  description: string;
  specialty: string;
  price: string;
  disciplines: string[];
}

// ============================================
// REGISTER COACH - Types for coach registration
// ============================================
export interface CoachRegistrationData {
  name: string;
  avatar: string;
  speciality: string;
  location: string;
  price: string;
  experience: string;
  description: string;
  skills: string[];
}

export interface CoachRegistrationParams {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

// ============================================
// SETTINGS - Types for parameters
// ============================================
export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  photo: string | null;
}

export interface PasswordState {
  current: string;
  new: string;
  confirm: string;
}

export interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
}

// ============================================
// NAVIGATION - Types for navigation
// ============================================
export type NavigationProps = {
  activePage: 'profileAthlete' | 'profileCoach' | 'search' | 'chat' | 'settings';
};

export type UserRole = 'eleve' | 'coach';

// ============================================
// COMMON - Common Types
// ============================================
export type StatusType = 'online' | 'offline';

