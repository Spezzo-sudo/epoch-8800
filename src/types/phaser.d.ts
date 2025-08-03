declare namespace Phaser {
  class Scene {
    constructor(config?: any);
    add: any;
    load: any;
    time: any;
    scene: any;
    cameras: any;
    input: any;
    tweens: any;
  }
  namespace GameObjects {
    class Text {
      setText(text: string): this;
      setColor(color: string): this;
      setAlpha(value: number): this;
      setInteractive(options?: any): this;
      disableInteractive(): this;
      on(event: string, cb: Function): this;
    }
    class Container {
      add(child: any): this;
      destroy(): void;
      removeAll(destroy?: boolean): void;
    }
    class Graphics {
      fillStyle(color: number, alpha?: number): this;
      lineStyle(width: number, color: number): this;
      moveTo(x: number, y: number): this;
      lineTo(x: number, y: number): this;
      beginPath(): this;
      closePath(): this;
      fillPath(): this;
      strokePath(): this;
      setInteractive(shape?: any, callback?: Function): this;
      getPath(): any;
      on(event: string, cb: Function): this;
      setScale(v: number): this;
    }
  }
  namespace Math {
    function DegToRad(v: number): number;
    class Vector2 {
      constructor(x: number, y: number);
      x: number;
      y: number;
    }
    function Clamp(v: number, min: number, max: number): number;
  }
  namespace Geom {
    class Polygon {
      constructor(points: any);
      static Contains(poly: any, x: number, y: number): boolean;
    }
  }
  namespace Cameras {
    namespace Scene2D {
      class Camera {
        zoom: number;
        scrollX: number;
        scrollY: number;
        setZoom(z: number): this;
      }
    }
  }
}

declare module 'phaser' {
  export = Phaser;
}
