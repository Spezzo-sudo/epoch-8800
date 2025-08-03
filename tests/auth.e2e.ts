import { test, expect } from '@playwright/test';
import server from '../server/index';

const baseURL = 'http://localhost:3001';

let httpServer: any;

test.beforeAll(async () => {
  httpServer = server.listen(3001);
});

test.afterAll(async () => {
  httpServer.close();
});

test('rate limit register', async ({ request }) => {
  for (let i = 0; i < 5; i++) {
    await request.post(baseURL + '/api/register', {
      data: { email: `user${i}@a.com`, password: 'x', recaptchaToken: 'valid' },
      headers: { cookie: 'signupToken=token' + i }
    });
  }
  const resp = await request.post(baseURL + '/api/register', {
    data: { email: 'user6@a.com', password: 'x', recaptchaToken: 'valid' },
    headers: { cookie: 'signupToken=token6' }
  });
  expect(resp.status()).toBe(429);
});

test('recaptcha flow', async ({ request }) => {
  const bad = await request.post(baseURL + '/api/register', {
    data: { email: 'bad@a.com', password: 'x', recaptchaToken: 'invalid' },
    headers: { cookie: 'signupToken=t1' }
  });
  expect(bad.status()).toBe(400);
  const good = await request.post(baseURL + '/api/register', {
    data: { email: 'good@a.com', password: 'x', recaptchaToken: 'valid' },
    headers: { cookie: 'signupToken=t2' }
  });
  expect(good.status()).toBe(200);
});

test('email verification block', async ({ request }) => {
  await request.post(baseURL + '/api/register', {
    data: { email: 'v@a.com', password: 'x', recaptchaToken: 'valid' },
    headers: { cookie: 'signupToken=t3' }
  });
  const login = await request.post(baseURL + '/api/login', {
    data: { email: 'v@a.com', password: 'x' }
  });
  expect(login.status()).toBe(403);
});
