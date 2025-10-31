import mongoose from 'mongoose';
const dbConnect = () => {
  try {
    mongoose.connect(process.env.DB_URI, {
      dbName: 'urban_haven',
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
};
export default dbConnect;