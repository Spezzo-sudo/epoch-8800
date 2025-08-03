import Phaser from 'phaser';

let scene: Phaser.Scene | null = null;
export function registerToastScene(s: Phaser.Scene) {
  scene = s;
}

export function showToast(message: string, durationMs = 3000) {
  if (!scene) return;
  const bg = scene.add.rectangle(200, 20, message.length * 8 + 20, 30, 0x000000, 0.7);
  const text = scene.add.text(200, 20, message, { color: '#fff' }).setOrigin(0.5);
  const container = scene.add.container(0, 0, [bg, text]);
  scene.tweens.add({ targets: container, alpha: 0, delay: durationMs, duration: 500, onComplete: () => container.destroy() });
}
