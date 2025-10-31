import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import globalErrorHandler from './controllers/error.controller.js';
import cookieParser from 'cookie-parser';
import path, { dirname } from 'path';

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const __dirname = path.resolve();

const run = () => {
  try {
    mongoose.connect(process.env.DB_URI, {
      dbName: 'urban_haven',
    });
    console.log('Connected to MongoDB');

    app.listen(3001, () => {
      console.log('Server is running on port 3001');
    });
  } catch (error) {
    console.log(error);
  }
};

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

app.use(express.static(path.join(__dirname, 'client', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use(globalErrorHandler);
run();
