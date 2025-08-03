#!/usr/bin/env ts-node
import request from 'supertest';
import express, { Express } from 'express';
import authRoutes from './authRoutes';
import * as authService from '../engine/authService';

(authService as any).registerUser = async () => ({ token: 't', userId: 'u' });
(authService as any).loginUser = async () => ({ token: 't', userId: 'u' });
(authService as any).verifyToken = async () => 'u';

const app: Express = express();
app.use(express.json());
app.use('/auth', authRoutes);

(async () => {
  const reg = await request(app).post('/auth/register').send({ email: 'a@b.com', password: 's' });
  if (reg.body.userId !== 'u') throw new Error('register fail');
  const login = await request(app).post('/auth/login').send({ email: 'a@b.com', password: 's' });
  if (login.body.token !== 't') throw new Error('login fail');
  const prof = await request(app).get('/auth/profile').set('Authorization', 'Bearer t');
  if (prof.body.userId !== 'u') throw new Error('profile fail');
  console.log('authRoutes tests passed');
})();
