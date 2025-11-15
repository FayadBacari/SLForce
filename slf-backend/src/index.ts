// import of the different libraries
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import express, { Request, Response, NextFunction } from 'express';

// import of the different routes
import authRoutes from './routes/auth.route';
import coachRoutes from './routes/coach.route';

// environnement variables
dotenv.config();
const app = express();


// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


// MongoDB 
const PORT = process.env.PORT || 5000;
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



// Health Endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});
// Error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur interne du serveur', error: err.message });
});


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/coaches', coachRoutes);

export default app;