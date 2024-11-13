import express, { Router } from 'express'
import {createUser , deleteUser, login , logout } from '../controller/user.controller' ;
import jwtAuth from '../middlewares/auth.middleware';
import logMiddleware from '../middlewares/logger.middleware';

const router = Router() ;


router.post('/login', login); 
router.post('/logout', logMiddleware('LOGOUT'), logout);
router.delete('/user/:id', jwtAuth, logMiddleware('DELETE_USER'), deleteUser);
router.post('/signup', logMiddleware('CREATE_USER'), createUser);

export default router ;


