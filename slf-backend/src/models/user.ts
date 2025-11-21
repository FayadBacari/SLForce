import mongoose, { Schema, Document } from 'mongoose';

export interface CoachProfile {
  name: string; 
  avatar: string;
  speciality: string;
  location: string;
  price: number;
  experience: number;
  description: string;
  skills: string[];
}

export interface AthleteProfile {
  name: string;
  avatar?: string;
  gender: 'male' | 'female';
  weightCategory: string;
  weight: number;
  height: number;
  records: {
    muscleUp: number;
    traction: number;
    dips: number;
    squat: number;
  };
}

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'eleve' | 'coach';
  coachProfile?: CoachProfile;
  athleteProfile?: AthleteProfile;
}

const CoachProfileSchema = new Schema<CoachProfile>({
  name: { type: String },
  avatar: { type: String },
  speciality: { type: String },
  location: { type: String },
  price: { type: Number },
  experience: { type: Number },
  description: { type: String },
  skills: [{ type: String }],
});

const AthleteProfileSchema = new Schema<AthleteProfile>({
  name: { type: String},
  avatar: { type: String },
  gender: { type: String, enum: ['male', 'female'], required: true },
  weightCategory: { type: String, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  records: {
    muscleUp: { type: Number, default: 0 },
    traction: { type: Number, default: 0 },
    dips: { type: Number, default: 0 },
    squat: { type: Number, default: 0 },
  },
});

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    role: {
      type: String,
      enum: ['eleve', 'coach'],
      required: true,
    },

    coachProfile: { type: CoachProfileSchema, required: false },
    athleteProfile: { type: AthleteProfileSchema, required: false },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);