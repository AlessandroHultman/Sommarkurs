import { Router } from 'express';
import { signup_post } from './authController.js';

const authRoutes = Router();

// router.get('/signup', authController.signup_get);

authRoutes.post('/signup', signup_post);

// router.get('/login', authController.login_get);

// router.post('/login', authController.login_post);

export default authRoutes;
