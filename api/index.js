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
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true}));
app.use(express.json());
app.use(cookieParser());

const __dirname = path.resolve();

const PORT = process.env.PORT || 3001;

const run = () => {
  try {
    mongoose.connect(process.env.DB_URI, {
      dbName: 'urban_haven',
    });
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// app.use(express.static(path.join(__dirname, 'client', 'dist')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });

app.use(globalErrorHandler);
run();
