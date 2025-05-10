// Add this near the top
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(callback){
            window.setTimeout(callback, 1000 / 60);
          };
})();

// All the particle code you provided goes here 

// Vector3D class
+(function(root) {
  'use strict';
  var Vector3D = function Vector3D(x, y, z) {
    this.set(x, y, z);
  }, v3dp = Vector3D.prototype;

  v3dp.dot2d = function(x, y) {
    return ((this.x * x) + (this.y * y));
  };

  // ... rest of Vector3D code ...
  root.Vector3D = Vector3D;
}(window));

// Perlin noise generator
+(function(root) {
  'use strict';
  var Perlin = function Perlin() {
    // ... Perlin noise implementation ...
  };
  root.Perlin = Perlin;
}(window));

// Mouse monitor
;(function(root) {
  'use strict';
  var MouseMonitor = function(element) {
    // ... Mouse monitor implementation ...
  };
  root.MouseMonitor = MouseMonitor;
}(window));

// Particle system
+(function(root) {
  'use strict';
  var Particle = function Particle(generator, bounds, rctx, mon) {
    // ... Particle implementation ...
  };
  root.Particle = Particle;
}(window));

// Main initialization
window.addEventListener('load', function() {
  var rctx = new SmallPRNG(+new Date()),
      p = new Perlin(),
      canvas = document.getElementById("particle-canvas"),
      context = canvas.getContext("2d"),
      monitor = new MouseMonitor(canvas),
      hue = 0, particles = [], resize,
      width, height, bounds = new Vector3D(0, 0, 0),
      settings = {
        particleNum: 3000,
        fadeOverlay: true,
        rotateColor: false,
        staticColor: {r: 212, g: 175, b: 55}, // Gold color
        staticColorString: 'rgba(212, 175, 55, 0.35)'
      };

  // Initialize and run the particle system
  // ... rest of initialization code ...
});

// Add this at the top of particles.js
function SmallPRNG(seed) {
  this.seed = seed;
}

SmallPRNG.prototype.random = function(min, max) {
  // Xorshift algorithm
  this.seed ^= (this.seed << 13);
  this.seed ^= (this.seed >> 17);
  this.seed ^= (this.seed << 5);
  
  if (min === undefined && max === undefined) {
    return Math.abs(this.seed) / 0x7fffffff;
  }
  
  if (max === undefined) {
    max = min;
    min = 0;
  }
  
  return Math.floor(Math.abs(this.seed) / 0x7fffffff * (max - min + 1)) + min;
}; 
