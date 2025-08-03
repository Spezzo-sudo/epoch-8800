import Phaser from 'phaser';
import { EventBus } from '../engine/eventBus';

export default class AuthPanel extends Phaser.Scene {
  constructor() { super('AuthPanel'); }

  create() {
    const email = this.add.dom(100, 100, 'input');
    const password = this.add.dom(100, 140, 'input');
    const display = this.add.dom(100, 180, 'input');
    const register = this.add.text(100, 220, 'Register').setInteractive();
    const login = this.add.text(200, 220, 'Login').setInteractive();

    register.on('pointerdown', () => {
      fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: (email.node as HTMLInputElement).value, password: (password.node as HTMLInputElement).value, displayName: (display.node as HTMLInputElement).value })
      }).then(r => r.json()).then(({ token, userId }) => {
        localStorage.setItem('authToken', token);
        EventBus.emit('auth_success', { userId });
      });
    });
    login.on('pointerdown', () => {
      fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: (email.node as HTMLInputElement).value, password: (password.node as HTMLInputElement).value })
      }).then(r => r.json()).then(({ token, userId }) => {
        localStorage.setItem('authToken', token);
        EventBus.emit('auth_success', { userId });
      });
    });
  }
}
