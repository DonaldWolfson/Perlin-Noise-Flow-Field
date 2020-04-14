var inc = 0.1;
var scl = 10; // Sets the amount of flow fields "scl" cubic pixels.
var cols, rows;
var zoff = 0;
var WhiteParticles = [];
var BlackParticles = [];
var flowfield;

function setup() {
  createCanvas(1280, 720); // Sets the size of the screen
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);
  for (var w = 0; w < 500; w++) { // Sets the amount of white particles there are.
    WhiteParticles[w] = new WhiteParticle();
  }
  for (var b = 0; b < 500; b++) { // Sets the amount of black particles there are.
    BlackParticles[b] = new BlackParticle();
  }
  background(255); // Sets the background color.
  fill(0);
  rect(0,0,1280,360); // Creates the black block on top.
}

function draw() {
 var yoff = 0;
  for (var y = 0; y < rows; y++) {
   var xoff = 0;
   for (var x = 0; x < cols; x++) {
    var index = x + y * cols;
    var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
    var v = p5.Vector.fromAngle(angle);
    v.setMag(0.4); // Adjust how stricly the particles will follow the flow field.
     flowfield[index] = v;
     xoff += inc;
   }
   yoff += inc;

   zoff += 0.01; // Adjusts the speed of the flow field's movement.
 }

 for (var w = 0; w < WhiteParticles.length; w++) {
   WhiteParticles[w].follow(flowfield);
   WhiteParticles[w].update();
   WhiteParticles[w].edges();
   WhiteParticles[w].show();
 }
  for (var b = 0; b < BlackParticles.length; b++) {
   BlackParticles[b].follow(flowfield);
   BlackParticles[b].update();
   BlackParticles[b].edges();
   BlackParticles[b].show();
 }
}