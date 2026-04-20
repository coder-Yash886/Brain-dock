import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/auth';  
import contentRoutes from './routes/content';
import brainRoutes from './routes/brain';

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);  
app.use('/api/content', contentRoutes);
app.use('/api/brain', brainRoutes);



app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Second Brain API is running!',
  });
});


app.get('/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log(` Environment: ${process.env.NODE_ENV}`);
});