let vibrations = [];

const colors = {'hotpink': 'rgb(231,18,231)'}

function setup() {
  createCanvas(1024, 768);
  
  // spawn particles at random locations
  // for (let i = 0; i < 5; i++) {
  //   vibrations.push(new Particle(random(width), random(height)));
  // }
  
  // 5 particles spawning at center of canvas --  with specified directions/angles
  const startx = width / 2;
  const starty = height / 2;
  
  vibrations.push(new Particle(startx, starty, 0, 'tbd', 'head'));  // above center origin (head)
  
  vibrations.push(new Particle(startx, starty, 315, 'tbd', 'L-arm'));  // L ARM
  vibrations.push(new Particle(startx, starty, 45, 'tbd', 'R-arm'));  // R ARM
  
  vibrations.push(new Particle(startx, starty, 225, 'tbd', 'L-leg'));  // L LEG
  vibrations.push(new Particle(startx, starty, 135, 'tbd', 'R-leg'));  // R LEG
  
}

function draw() {
  background(0);
  
  for (let i = 0; i < vibrations.length; i++) {
    vibrations[i].show();
    vibrations[i].update();
  }

  fill(colors.hotpink);
  ellipse(width / 2, height / 2, 20, 20);
  
}

// enable spawning more particles at will by clicking the mouse
function mousePressed() {
  randomAngle = random(0,360);
  randomColor = 'tbd';
  
  vibrations.push(new Particle(mouseX, mouseY, randomAngle, randomColor, 'baby'));
}

class Particle {

  constructor(x, y, angle, color, label) {
    this.x = x;
    this.y = y;
    
    this.angle = angle;
    this.color = color;
    this.label = label;
    
    this.xoff1 = 0;  // for perlin noise experimentation
    this.xoff2 = 10000;  // for perlin noise experimentation
    this.history = [];
  }

  update() {
    // length or range of each draw step
    
    switch(this.angle) {
      case 0:   // noggin
        this.x = this.x + random(-0.1, 0.1);
        this.y = this.y + random(0, -2);
        break;
      case 315: // left arm
        this.x = this.x - random(0, 1);
        this.y = this.y + random(0, -1);
        break;
      case 45:  // right arm
        this.x = this.x + random(0, 1);
        this.y = this.y + random(0, -1);
        break;
      case 225:
        this.x = this.x + random(0, -1);
        this.y = this.y - random(-2, 0);
        break;
      case 135:
        this.x = this.x + random(0, 2);
        this.y = this.y + random(2, 0);
        break;
    }

    // for perlin noise experimentation
    //this.x = map(noise(this.xoff1), -5, 5, 0, width); 
    //this.y = map(noise(this.xoff2), -5, 5, 0, height);
    //this.xoff1 += 0.1;
    //this.xoff2 += 0.1;

    let v = createVector(this.x, this.y);

    this.history.push(v);
    //console.log(this.history.length);

    // will this overload CPU/RAM/browser if we don't erase old history?
    if (this.history.length > 123) {
      this.history.splice(0, 1);
      
      // might store the history of best rendition use it as a desired target for fitness
      // console.log(this.history);

      // killing the loop here will pause exploration and draw lines the length of history
      noLoop();
    }
    
  }

  show() {
    beginShape();
    for (let i = 0; i < this.history.length; i++) {
      stroke(colors.hotpink);
      let pos = this.history[i];
      noFill();
      vertex(pos.x, pos.y);
      endShape();
    }

    noStroke();
    fill(colors.hotpink);

    ellipse(this.x, this.y, 10, 10);
    //textSize(10);
    //text(this.label, this.x + 5, this.y + 5);
    //fill(0, 102, 153);
  }
}


// THANK YOU:
// Coding Train
// Daniel Shiffman
// https://www.youtube.com/thecodingtrain/

// 9.7: Drawing Object Trails - p5.js Tutorial
// https://youtu.be/vqE8DMfOajk

// original sketch: https://editor.p5js.org/codingtrain/sketches/9DnjxCNB-
