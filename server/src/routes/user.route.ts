import express, { Router } from 'express';
import { createUser, getAllUser, login, logout } from '../controller/user.controller';
import jwtAuth from '../middlewares/auth.middleware';

const router = Router();

// Public routes
router.post('/login', login); // No jwtAuth required for login
router.post('/signup', createUser);

// Protected routes
router.get('/logout', jwtAuth, logout);
router.get('/getAllUser', jwtAuth, getAllUser);

// Catch-all route for handling non-existent routes
router.all('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

export default router;
