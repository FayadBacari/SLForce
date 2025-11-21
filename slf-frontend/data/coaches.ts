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

export const COACHES: Coach[] = [
  {
    id: 1,
    name: 'Coach Malik',
    avatar: '🦍',
    speciality: 'Calisthenics Expert',
    location: 'Lyon, France',
    rating: 4.9,
    reviews: 127,
    students: 45,
    price: 49.99,
    experience: '8 ans',
    description:
      "Spécialiste en street workout et calisthenics. Je t'aide à maîtriser les figures avancées !",
    skills: ['Street-Lifting'],
  },
  {
    id: 2,
    name: 'Coach Sarah',
    avatar: '🏋️',
    speciality: 'Calisthenics Expert',
    location: 'Paris, France',
    rating: 4.8,
    reviews: 98,
    students: 38,
    price: 39.99,
    experience: '5 ans',
    description:
      'Coach certifiée en musculation. Programme personnalisé pour atteindre tes objectifs !',
    skills: ['Street-Lifting'],
  },
  {
    id: 3,
    name: 'Coach Karim',
    avatar: '🥇',
    speciality: 'Calisthenics Expert',
    location: 'Marseille, France',
    rating: 5.0,
    reviews: 156,
    students: 62,
    price: 59.99,
    experience: '10 ans',
    description: 'Champion national de street workout. Transforme ton physique en 3 mois garanti !',
    skills: ['Street-Lifting', 'Endurance'],
  },
  {
    id: 4,
    name: 'Coach Aya',
    avatar: '💃',
    speciality: 'Calisthenics Expert',
    location: 'Bordeaux, France',
    rating: 4.7,
    reviews: 82,
    students: 29,
    price: 34.99,
    experience: '4 ans',
    description:
      'Spécialisée en cardio et souplesse. Perte de poids et condition physique optimale !',
    skills: ['Endurance'],
  },
  {
    id: 5,
    name: 'Coach Ahmed',
    avatar: '🎯',
    speciality: 'Calisthenics Expert',
    location: 'Lille, France',
    rating: 4.9,
    reviews: 103,
    students: 51,
    price: 44.99,
    experience: '6 ans',
    description: 'Nutritionniste diplômé. Plans alimentaires sur mesure pour performers !',
    skills: ['Freestyle'],
  },
];
