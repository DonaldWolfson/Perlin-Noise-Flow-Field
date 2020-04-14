function WhiteParticle() {
 this.pos = createVector(random(width), 359); // Designates the starting location of the particles.
 this.vel = createVector(0, 0);
 this.acc = createVector(0, 0);
 this.maxspeed = 2; // Sets the maxspeed of the particles.
 this.h = 0;
 this.prevPos = this.pos.copy();

 this.update = function() {
   this.vel.add(this.acc);
   this.vel.limit(this.maxspeed);
   this.pos.add(this.vel);
   this.acc.mult(0);
 }

 this.follow = function(vectors) {
   var x = floor(this.pos.x / scl);
   var y = floor(this.pos.y / scl);
   var index = x + y * cols;
   var force = vectors[index];
   this.applyForce(force);
 }

 this.applyForce = function(force) {
  this.acc.add(force);
 }

 this.show = function() {
  stroke(255, 20); //Sets the color of the particle.
  strokeWeight(1); // Sets the thickness of the particle.
  line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
  this.updatePrev();
 }

 this.updatePrev = function() {
  this.prevPos.x = this.pos.x;
  this.prevPos.y = this.pos.y;
 }

 // Below sets the borders that the pixels will follow before teleporting back to the starting position.
 this.edges = function() {
  if (this.pos.x > width) {
    this.pos.x = random(width);
    this.updatePrev();
  }
  if (this.pos.x < 0) {
    this.pos.x = random(width);
    this.updatePrev();
  }
  if (this.pos.y > 361) {
    this.pos.y = 359;
    this.updatePrev();
  }
  if (this.pos.y < 0) {
    this.pos.y = 359;
    this.updatePrev();
  }
 }
}