var cp = ['#FFDBE2','#275F96','#FF8181','#D0A3F7','#1EB4F7'];
let cnv;
let d;

let circles = [];

function setup() {
  cnv = createCanvas(windowWidth,windowHeight);
  background('#9D2E18');
  d = 10;
  noCursor();
  frameRate(10)
}



function draw() {
  ellipse(width / 2, height / 2, d, d);
  if (d > width) {
    d = 10;
    background('#9D2E18');
    print('d is now larger than 600');
  }
  for (let num = 0; num < circles.length; num++) {
    circles[num].move();
    circles[num].show();
  }
 
}

//making center point larger upon each cilck

function mouseReleased() {
  d = d + 5;
}

//defining circles as indipendants 

class Circle {
  constructor(x,y,d,c) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.colorVariable = c;
  }
  //creating randomized locations
  move() {
    if(mouseIsPressed) {
    this.x =+ (random(windowWidth));
    this.y =+ (random(windowHeight));
    }
  }
  show() {
    fill(this.colorVariable);
    ellipse(this.x,this.y,this.d,this.d);
  }
   
}

//starts animation and places red dot on screen wherever your mouse is

function mousePressed() {
  fill("#FF0000");
  ellipse(mouseX, mouseY, 30, 30);
  circles.push(new Circle(mouseX,mouseY,30,random(cp)));
}