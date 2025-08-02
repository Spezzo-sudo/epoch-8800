import express, { Request, Response, Express } from 'express';
import { randomUUID } from 'crypto';
import { EventBus } from '../engine/eventBus';
import authRoutes from "./authRoutes";

interface User {
  email: string;
  password: string;
  isVerified: boolean;
  verificationToken: string;
}

const app: Express = express();
app.use(express.json());

app.use('/auth', authRoutes);
const users: Record<string, User> = {};
const ipRegisterRequests: Record<string, { count: number; time: number }> = {};
const ipLoginRequests: Record<string, { count: number; time: number }> = {};
const ipRegistrations: Record<string, { count: number; time: number }> = {};
const domainRegistrations: Record<string, { count: number; time: number }> = {};
const usedSignupTokens = new Set<string>();

function rateLimit(ip: string, store: Record<string, { count: number; time: number }>): boolean {
  const now = Date.now();
  const entry = store[ip];
  if (entry && now - entry.time < 60000 && entry.count >= 5) {
    return true;
  }
  if (!entry || now - entry.time >= 60000) {
    store[ip] = { count: 1, time: now };
  } else {
    entry.count++;
  }
  return false;
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  if (process.env.TEST_ENV === 'true') return token === 'valid';
  const params = new URLSearchParams();
  params.append('secret', process.env.RECAPTCHA_SECRET || '');
  params.append('response', token);
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });
  const data = await res.json();
  return !!data.success;
}

app.post('/api/register', async (req: Request, res: Response) => {
  const ip = req.ip;
  if (rateLimit(ip, ipRegisterRequests)) return res.status(429).json({ error: 'rate limit' });
  if (!req.headers.cookie || !req.headers.cookie.includes('signupToken=')) {
    const token = randomUUID();
    res.setHeader('Set-Cookie', `signupToken=${token}; Max-Age=2592000; HttpOnly`);
    return res.status(400).json({ error: 'missing signup token' });
  }
  const signupToken = req.headers.cookie!.split(';').map(p => p.trim()).find(p => p.startsWith('signupToken='))?.split('=')[1];
  if (!signupToken || usedSignupTokens.has(signupToken)) return res.status(400).json({ error: 'signup token used' });
  const { email, password, recaptchaToken } = req.body;
  if (!email || !password || !recaptchaToken) return res.status(400).json({ error: 'missing fields' });
  if (!(await verifyRecaptcha(recaptchaToken))) return res.status(400).json({ error: 'invalid recaptcha' });
  const domain = email.split('@')[1];
  const now = Date.now();
  const reg = ipRegistrations[ip];
  if (reg && now - reg.time < 86400000 && reg.count >= 2) return res.status(429).json({ error: 'account cooldown' });
  const domReg = domainRegistrations[domain];
  if (domReg && now - domReg.time < 86400000 && domReg.count >= 1) return res.status(429).json({ error: 'domain cooldown' });
  const verificationToken = randomUUID();
  users[email] = { email, password, isVerified: false, verificationToken };
  ipRegistrations[ip] = { count: (reg?.count || 0) + 1, time: now };
  domainRegistrations[domain] = { count: (domReg?.count || 0) + 1, time: now };
  usedSignupTokens.add(signupToken);
  res.json({ ok: true, verificationToken });
});

app.post('/api/login', (req: Request, res: Response) => {
  const ip = req.ip;
  if (rateLimit(ip, ipLoginRequests)) return res.status(429).json({ error: 'rate limit' });
  const { email, password } = req.body;
  const user = users[email];
  if (!user || user.password !== password) return res.status(401).json({ error: 'invalid credentials' });
  if (!user.isVerified) return res.status(403).json({ error: 'email not verified' });
  res.json({ ok: true });
});

app.post('/api/verify', (req: Request, res: Response) => {
  const { email, token } = req.body;
  const user = users[email];
  if (!user || user.verificationToken !== token) return res.status(400).json({ error: 'invalid token' });
  user.isVerified = true;
  res.json({ ok: true });
});

app.get('/events', (req: Request, res: Response) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  const sendEvent = (payload: any) => {
    res.write(`data: ${JSON.stringify(payload)}\n\n`);
  };
  EventBus.on('task_complete', sendEvent);
  req.on('close', () => EventBus.off('task_complete', sendEvent));
});

if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => {
    console.log('Server listening on', port);
  });
}

export default app;
