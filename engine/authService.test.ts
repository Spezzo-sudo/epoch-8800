#!/usr/bin/env ts-node
import { registerUser, loginUser, verifyToken } from './authService';
import admin from 'firebase-admin';

jest.mock('firebase-admin', () => ({
  auth: () => ({
    createUser: jest.fn().mockResolvedValue({ uid: 'U1' }),
    createCustomToken: jest.fn().mockResolvedValue('token123'),
    getUserByEmail: jest.fn().mockResolvedValue({ uid: 'U1' }),
    verifyIdToken: jest.fn().mockResolvedValue({ uid: 'U1' })
  })
}));

(async () => {
  const reg = await registerUser({ email: 'a@b.com', password: 'secret' });
  console.assert(reg.token === 'token123');
  const login = await loginUser({ email: 'a@b.com', password: 'secret' });
  console.assert(login.userId === 'U1');
  const uid = await verifyToken('token123');
  console.assert(uid === 'U1');
  console.log('authService tests passed');
})();
