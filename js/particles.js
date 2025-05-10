// Vector3D class
+(function(root) {
  'use strict';
  var Vector3D = function Vector3D(x, y, z) {
    this.set(x, y, z);
  }, v3dp = Vector3D.prototype;

  v3dp.dot2d = function(x, y) {
    return ((this.x * x) + (this.y * y));
  };

  v3dp.dot3d = function(x, y, z) {
    return ((this.x * x) + (this.y * y) + (this.z * z));
  };

  v3dp.set = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  };

  v3dp.add = function(other) {
    if(typeof other === "number") {
      this.x += other, this.y += other, this.z += other;
      return this;
    }
    this.x += other.x, this.y += other.y, this.z += other.z;
    return this;
  };

  v3dp.sub = function(other) {
    if(typeof other === "number") {
      this.x -= other, this.y -= other, this.z -= other;
      return this;
    }
    this.x -= other.x, this.y -= other.y, this.z -= other.z;
    return this;
  };

  v3dp.mul = function(other) {
    if(typeof other === "number") {
      this.x *= other, this.y *= other, this.z *= other;
      return this;
    }
    this.x *= other.x, this.y *= other.y, this.z *= other.z;
    return this;
  };

  v3dp.div = function(other) {
    if(typeof other === "number") {
      this.x /= other, this.y /= other, this.z /= other;
      return this;
    }
    this.x /= other.x, this.y /= other.y, this.z /= other.z;
    return this;
  };

  v3dp.move = function(dest) {
    if(dest instanceof Vector3D) {
      dest.x = this.x, dest.y = this.y, dest.z = this.z;
    }
    return this;
  };

  v3dp.within2d = function(bounds) {
    return (this.x >= 0 && this.x < bounds.x && this.y >= 0 && this.y < bounds.y);
  };

  v3dp.wrap2d = function(bounds) {
    if(this.x > bounds.x) {
      this.x = 0;
      return true;
    }
    if(this.x < 0) {
      this.x = bounds.x;
      return true;
    }
    if(this.y > bounds.y) {
      this.y = 0;
      return true;
    }
    if(this.y < 0) {
      this.y = bounds.y;
      return true;
    }
  };

  v3dp.eq = function(other) {
    return (other instanceof Vector3D) && this.x === other.x && this.y === other.y && this.z === other.z;
  };
  
  v3dp.distance = function(other) {
    var dx = (this.x - other.x),
        dy = (this.y - other.y);
    return Math.sqrt(dx * dx + dy * dy);
  };
  
  v3dp.clone = function() {
    return new Vector3D(this.x, this.y, this.z);
  };

  root.Vector3D = Vector3D;
}(window));

// Perlin noise generator
+(function(root) {
  'use strict';
  var Perlin = function Perlin() {
    this.grad3 = [
      new Vector3D(1,1,0), new Vector3D(-1,1,0), new Vector3D(1,-1,0), new Vector3D(-1,-1,0),
      new Vector3D(1,0,1), new Vector3D(-1,0,1), new Vector3D(1,0,-1), new Vector3D(-1,0,-1),
      new Vector3D(0,1,1), new Vector3D(0,-1,1), new Vector3D(0,1,-1), new Vector3D(0,-1,-1)
    ];

    this.p = [
      0x97,0xa0,0x89,0x5b,0x5a,0x0f,0x83,0x0d,0xc9,0x5f,0x60,0x35,0xc2,0xe9,0x07,0xe1,0x8c,0x24,
      // ... rest of the permutation table (you provided this)
    ];

    this.permutation = new Array(512);
    this.gradP = new Array(512);

    this.F2 = (0.5 * (Math.sqrt(3) - 1));
    this.G2 = ((3 - Math.sqrt(3)) / 6);
    this.F3 = (1 / 3);
    this.G3 = (1 / 6);
  };

  Perlin.prototype.init = function(prng) {
    if(typeof prng !== "function") {
      throw new TypeError("prng needs to be a function returning an int between 0 and 255");
    }
    for(var i = 0; i < 256; i += 1) {
      var randval = (this.p[i] ^ prng());
      this.permutation[i] = this.permutation[i + 256] = randval;
      this.gradP[i] = this.gradP[i + 256] = this.grad3[randval % this.grad3.length];
    }
  };

  // Add the rest of the Perlin implementation here
  // ... (you provided this code)

  root.Perlin = Perlin;
}(window));

// Would you like me to continue with the rest of the implementation? I can show:
1. The complete MouseMonitor implementation
2. The Particle system implementation
3. The main initialization code

Let me know which part you'd like to see next!
