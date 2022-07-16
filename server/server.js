import express, { json } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './api/authentication/authRoutes.js';

// load environment variables
dotenv.config();

// initialize express application
const app = express();

// run server
app.listen(process.env.PORT , () => {
  console.log("Backend server is running.");
});

// middleware
app.use(json());

// routes
app.use(authRoutes);

// connect to mongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log("DB connection successfull.")
  })
  .catch((err) => {
    console.log(err);
  })
