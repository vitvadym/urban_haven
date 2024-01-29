import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();

const app = express();
app.use(express.json());

const run = () => {
  try {
    mongoose.connect(process.env.DB_URI);
    console.log('Connected to MongoDB');

    app.listen(8080, () => {
      console.log('Server is running on port 8080');
    });
  } catch (error) {
    console.log(error);
  }
};

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

run();
