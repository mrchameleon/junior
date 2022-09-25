let vibrations = [];  // population
let junior;


class Junior {
  constructor(x,y, hue) {
    this.x = x;
    this.y = y;
    this.hue = hue;
    
    this.nodes = [];
  }
  
  update() {
    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i].show();
      this.nodes[i].update();
    }
  }
  
  show() {
    this.nodes.push(new JuniorNode(this.x, this.y, 0, hue));  // above center origin (head)
    this.nodes.push(new JuniorNode(this.x, this.y, 315, hue));  // L ARM
    this.nodes.push(new JuniorNode(this.x, this.y, 45, hue));  // R ARM
    this.nodes.push(new JuniorNode(this.x, this.y, 225, hue));  // L LEG
    this.nodes.push(new JuniorNode(this.x, this.y, 135, hue));  // R LEG
  }
}

class JuniorNode {
  constructor(x,y, angle, hue) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.hue = hue;
    
    this.history = [];
    this.size = 0;
    
    this.pos = createVector(x,y);
    this.vel = createVector(angle,-angle);
  }
  
  update() {
    // this.vel = createVector(random(-5,5), random(-5,5));
    // this.pos.x = this.pos.x + this.vel.x;
    // this.pos.y = this.pos.y + this.vel.y;

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
      default:
        this.x = this.x + random(-5, 5);
        this.y = this.y + random(-5, 5);
        break;
    }
    
    this.pos = createVector(this.x, this.y);

    
    this.history.push(this.pos);

    // will this overload CPU/RAM/browser if we don't erase old history?
    if (this.history.length > 69) {
      this.history.splice(0, 1);
          
      // killing the loop here will pause exploration and draw lines the length of history
      //noLoop();
         
      // TODO: space them out from each other into a grid
      
      // OR draw one at a time very rapidly, and only show the current best fitness on screen.
      
      // reset and build a new random population
      vibrations = [];
      init();
    }
    
  }
  
  show(){     
    stroke(hue);
    strokeWeight(8);
    point(this.pos.x + random(-5, 5), this.pos.y + random(-5, 5));    
  }
}

function setup() {
  createCanvas(1024, 768);
  init();
  
}

function draw() {
  background(0);
   
  for (let i = 0; i < vibrations.length; i++) {
    vibrations[i].show();
    vibrations[i].update();
  }

}

//repeated code

function init() {
  r = random(66,255);
  g = random(66,255);
  b = random(66,255);
  hue = color(r,g,b);
  

  // build a random population at start (SLOW))
  for (let i = 0; i < 5; i++) {
    vibrations.push(new Junior(random(width), random(height), hue));
  }
}

// enable spawning more particles at will by clicking the mouse
function mousePressed() {
  r = random(66,255);
  g = random(66,255);
  b = random(66,255);
  hue = color(r,g,b);
  vibrations.push(new Junior(mouseX, mouseY, hue));
}





// wiggle for arms and legs (more predefined, one shot, than a random walker)
// https://www.alpharithms.com/how-to-draw-a-squiggly-line-in-p5js-or-processing-120715/#step-1-drawing-a-straight-line


// THANK YOU:
// Coding Train
// Daniel Shiffman
// https://www.youtube.com/thecodingtrain/

// 9.7: Drawing Object Trails - p5.js Tutorial
// https://youtu.be/vqE8DMfOajk

// original sketch: https://editor.p5js.org/codingtrain/sketches/9DnjxCNB-
