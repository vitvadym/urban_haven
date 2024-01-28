import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

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

run();
