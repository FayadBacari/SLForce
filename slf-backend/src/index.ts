// Import of different library
import express, { Request, Response } from 'express';

const app = express();

// first route
app.get('/', (req: Request, res: Response) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});

export default app;