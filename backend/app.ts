// app.ts
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import coursesRoutes from './routes/courses';
import jobsRoutes from './routes/jobs';
import communityRoutes from './routes/community';
import rewardsRoutes from './routes/rewards';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI as string, {})
    .then(() => console.log('Database connected'))
    .catch((err) => console.error(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/rewards', rewardsRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});