module.exports = {
  Scene: class { constructor(){ this.add={}; this.time={}; this.scene={}; this.cameras={ main:{ setZoom(){}, zoom:1, scrollX:0, scrollY:0 } }; this.input={ on(){}, off(){}}; this.tweens={ add(){}}; } },
  GameObjects: {
    Text: class {},
    Container: class { add(){} },
    Graphics: class { fillStyle(){} lineStyle(){} beginPath(){} moveTo(){} lineTo(){} closePath(){} fillPath(){} strokePath(){} setInteractive(){return this;} getPath(){return [];} on(){} setScale(){} }
  },
  Math: {
    DegToRad: (v)=>v*Math.PI/180,
    Vector2: class { constructor(x,y){ this.x=x; this.y=y; } },
    Clamp: (v,min,max)=>Math.min(Math.max(v,min),max)
  },
  Geom: { Polygon: { Contains: ()=>true } },
  Cameras: { Scene2D: { Camera: class { constructor(){ this.zoom=1; this.scrollX=0; this.scrollY=0; } setZoom(){ return this; } } } }
};
