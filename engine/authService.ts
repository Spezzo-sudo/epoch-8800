import admin from 'firebase-admin';
import { RegisterRequest, LoginRequest, AuthResponse } from './types/authTypes';

export async function registerUser(req: RegisterRequest): Promise<AuthResponse> {
  const user = await admin.auth().createUser({
    email: req.email,
    password: req.password,
    displayName: req.displayName,
  });
  const token = await admin.auth().createCustomToken(user.uid);
  return { token, userId: user.uid };
}

export async function loginUser(req: LoginRequest): Promise<AuthResponse> {
  const userRecord = await admin.auth().getUserByEmail(req.email);
  const token = await admin.auth().createCustomToken(userRecord.uid);
  return { token, userId: userRecord.uid };
}

export async function verifyToken(token: string): Promise<string> {
  const decoded = await admin.auth().verifyIdToken(token);
  return decoded.uid;
}
