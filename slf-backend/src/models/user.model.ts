import mongoose from 'mongoose';

const coachProfileSchema = new mongoose.Schema(
  {
    avatar: { type: String },
    speciality: { type: String },
    location: { type: String },
    price: { type: Number },
    experience: { type: Number },
    description: { type: String },
    skills: [{ type: String }],
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  displayName: { type: String },
  role: { type: String, enum: ['eleve', 'coach'], required: true },
  coachProfile: { type: coachProfileSchema, required: false },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
