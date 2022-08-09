import { Router } from 'express';
import { signup_post, login_post, logout_get } from './authController.js';

const authRoutes = Router();

// router.get('/signup', authController.signup_get);

authRoutes.post('/signup', signup_post);

// router.get('/login', authController.login_get);

authRoutes.post('/login', login_post);

authRoutes.get('/logout', logout_get);

export default authRoutes;
