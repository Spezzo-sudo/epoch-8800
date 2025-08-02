import express, { Request, Response } from 'express';
import { registerUser, loginUser, verifyToken } from '../engine/authService';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const resp = await registerUser(req.body);
    res.json(resp);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const resp = await loginUser(req.body);
    res.json(resp);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

router.get('/profile', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || '';
    const uid = await verifyToken(token);
    res.json({ userId: uid });
  } catch (e: any) {
    res.status(401).json({ error: 'invalid token' });
  }
});

export default router;
