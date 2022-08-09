import express, { json } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import authRoutes from './api/authentication/authRoutes.js';
import productRoutes from './api/routes/product.js';
import { initializeSocketServer } from './socket-server.js';

// load environment variables
dotenv.config();

// initialize express application
const app = express();

// run server
app.listen(process.env.PORT , () => {
  console.log("Backend server is running on port " + process.env.PORT);
});

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
  })
);
app.use(cookieParser());

// routes
app.use(authRoutes);
app.use(productRoutes);

// run socket server
initializeSocketServer();

// connect to mongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log("DB connection successfull")
  })
  .catch((err) => {
    console.log(err);
  })
