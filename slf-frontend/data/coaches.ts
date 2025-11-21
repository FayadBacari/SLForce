export type Coach = {
  id: number;
  name: string;
  avatar: string;
  speciality: string;
  location: string;
  rating: number;
  reviews: number;
  students: number;
  price: number;
  experience: string;
  description: string;
  skills: string[];
};

export const CATEGORIES: { id: string; label: string }[] = [
  { id: 'all', label: 'Tous' },
  { id: 'Street-Lifting', label: 'Street-Lifting' },
  { id: 'Endurance', label: 'Endurance' },
  { id: 'Freestyle', label: 'Freestyle' },
];
