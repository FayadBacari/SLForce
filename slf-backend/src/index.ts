// import of different libraries
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import express, { Request, Response, NextFunction } from 'express';

// import des routes 
import authRoutes from './routes/auth.routes';
import coachRoutes from './routes/getCoach.routes';
import studentRoutes from './routes/getAthleteSearch.routes';
import athleteRoutes from './routes/updateAthleteProfil.routes';

dotenv.config();
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ La variable d\'environnement MONGODB_URI est manquante');
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('🚀✅ Connecté à MongoDB');
  })
  .catch((err) => {
    console.error('❌ Erreur de connexion à MongoDB', err);
    process.exit(1);
  });

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur interne du serveur', error: err.message });
});

app.use('/auth', authRoutes);
app.use('/coachs', coachRoutes);
app.use('/users', athleteRoutes);
app.use('/students', studentRoutes);



export default app;