var lightBlue = "#86D5FF";
var navy = "#1C2D74";
var mediumBlue = "#2A4ACE";

var colorPalette = [lightBlue,navy,mediumBlue];

//Background

$("body").css("background-color", colorPalette[2]);


var randomColor = Math.floor(Math.random() * colorPalette.length);
console.log(colorPalette.length);


$("#Bubble1-2").on("click", function() {
    $(this).css("background", "#FF4E4E");
})

$("#Bubble2-2").on("click", function() {
    $(this).css("background", "#6572FF");
})

$("#Bubble3-2").on("click", function() {
    $(this).css("background", "#6572FF");
})

$("#Bubble4-2").on("click", function() {
    $(this).css("background", "#6572FF");
})

$("#Bubble5-2").on("click", function() {
    $(this).css("background", "#FF4E4E");
})

$("#Bubble6-2").on("click", function() {
    $(this).css("background", "#FF4E4E");
})

$("#Bubble7-2").on("click", function() {
    $(this).css("background", "#6572FF");
})

$("#Bubble8-2").on("click", function() {
    $(this).css("background", "#FF4E4E");
})

$("#Bubble9-2").on("click", function() {
    $(this).css("background", "#6572FF");
})

$("#textBox24").on("click", function() {
    $(this).css("background", "#FF4E4E");
})

$("#textBox25").on("click", function() {
    $(this).css("background", "#FF4E4E");
})

$("#textBox26").on("click", function() {
    $(this).css("background", "#FF4E4E");
})

$("#textBox27").on("click", function() {
    $(this).css("background", "#6572FF");
})

$("#textBox28").on("click", function() {
    $(this).css("background", "#6572FF");
})

$("#textBox29").on("click", function() {
    $(this).css("background", "#FF4E4E");
})

$("#textBox30").on("click", function() {
    $(this).css("background", "#6572FF");
})

$("#textBox31").on("click", function() {
    $(this).css("background", "#6572FF");
})

$("#textBox32").on("click", function() {
    $(this).css("background", "#FF4E4E");
})





//Codepen javascript Start

 var canvas = document.querySelector('canvas');
      canvas.width = document.body.clientWidth;
      canvas.height = document.body.clientHeight;
  var ctx = canvas.getContext('2d');
  var count = canvas.height;
  var bubbles = [];
  var bubbleCount = 20;
  var bubbleSpeed = 1;
  var popLines = 6;
  var popDistance = 40;
  var mouseOffset = {
    x: 0,
    y: 0
  }



  // --------------
  // Animation Loop
  // --------------

  function animate() {



    // ------------
    // Clear Canvas
    // ------------

    ctx.clearRect(0, 0, canvas.width, canvas.height);



    // ------------
    // Draw Bubbles
    // ------------

    ctx.beginPath();
    for (var i = 0; i < bubbles.length; i++) {
      // first num = distance between waves
      // second num = wave height
      // third num = move the center of the wave away from the edge
      bubbles[i].position.x = Math.sin(bubbles[i].count/bubbles[i].distanceBetweenWaves) * 50 + bubbles[i].xOff;
      bubbles[i].position.y = bubbles[i].count;
      bubbles[i].render();

      if(bubbles[i].count < 0 - bubbles[i].radius) {
        bubbles[i].count = canvas.height + bubbles[i].yOff;
      } else {
        bubbles[i].count -= bubbleSpeed;
      }
    }

    // ---------------
    // On Bubble Hover
    // ---------------

    for (var i = 0; i < bubbles.length; i++) {
      if(mouseOffset.x > bubbles[i].position.x - bubbles[i].radius && mouseOffset.x < bubbles[i].position.x + bubbles[i].radius) {
        if(mouseOffset.y > bubbles[i].position.y - bubbles[i].radius && mouseOffset.y < bubbles[i].position.y + bubbles[i].radius) {
          for (var a = 0; a < bubbles[i].lines.length; a++) {
            popDistance = bubbles[i].radius * 0.5;
            bubbles[i].lines[a].popping = true;
            bubbles[i].popping = true;
          }
        }
      }
    }

    window.requestAnimationFrame(animate);
  }

  window.requestAnimationFrame(animate);



  // ------------------
  // Bubble Constructor
  // ------------------

  var createBubble = function() {
    this.position = {x: 0, y: 0};
    this.radius = 8 + Math.random() * 6;
    this.xOff = Math.random() * canvas.width - this.radius;
    this.yOff = Math.random() * canvas.height;
    this.distanceBetweenWaves = 50 + Math.random() * 40;
    this.count = canvas.height + this.yOff;
    this.color = '#8bc9ee';
    this.lines = [];
    this.popping = false;
    this.maxRotation = 85;
    this.rotation = Math.floor(Math.random() * (this.maxRotation - (this.maxRotation * -1))) + (this.maxRotation * -1);
    this.rotationDirection = 'forward';

    // Populate Lines
    for (var i = 0; i < popLines; i++) {
      var tempLine = new createLine();
          tempLine.bubble = this;
          tempLine.index = i;

      this.lines.push(tempLine);
    }

    this.resetPosition = function() {
      this.position = {x: 0, y: 0};
      this.radius = 8 + Math.random() * 6;
      this.xOff = Math.random() * canvas.width - this.radius;
      this.yOff = Math.random() * canvas.height;
      this.distanceBetweenWaves = 50 + Math.random() * 40;
      this.count = canvas.height + this.yOff;
      this.popping = false;
    }

    // Render the circles
    this.render = function() {
      if(this.rotationDirection === 'forward') {
        if(this.rotation < this.maxRotation) {
          this.rotation++;
        } else {
          this.rotationDirection = 'backward';
        }
      } else {
        if(this.rotation > this.maxRotation * -1) {
          this.rotation--;
        } else {
          this.rotationDirection = 'forward';
        }
      }

      ctx.save();
      ctx.translate(this.position.x, this.position.y);
      ctx.rotate(this.rotation*Math.PI/180);

      if(!this.popping) {
        ctx.beginPath();
        ctx.strokeStyle = '#8bc9ee';
        ctx.lineWidth = 1;
        ctx.arc(0, 0, this.radius - 3, 0, Math.PI*1.5, true);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI*2, false);
        ctx.stroke();
      }
      
      ctx.restore();

      // Draw the lines
      for (var a = 0; a < this.lines.length; a++) {
        if(this.lines[a].popping) {
          if(this.lines[a].lineLength < popDistance && !this.lines[a].inversePop) {
            this.lines[a].popDistance += 0.06;
          } else {
            if(this.lines[a].popDistance >= 0) {
              this.lines[a].inversePop = true;
              this.lines[a].popDistanceReturn += 1;
              this.lines[a].popDistance -= 0.03;
            } else {
              this.lines[a].resetValues();
              this.resetPosition();
            }
          }

          this.lines[a].updateValues();
          this.lines[a].render();
        }
      }
    }
  }



  // ----------------
  // Populate Bubbles
  // ----------------

  for (var i = 0; i < bubbleCount; i++) {
    var tempBubble = new createBubble();

    bubbles.push(tempBubble);
  }



  // ----------------
  // Line Constructor
  // ----------------

  function createLine() {
    this.lineLength = 0;
    this.popDistance = 0;
    this.popDistanceReturn = 0;
    this.inversePop = false; // When the lines reach full length they need to shrink into the end position
    this.popping = false;

    this.resetValues = function() {
      this.lineLength = 0;
      this.popDistance = 0;
      this.popDistanceReturn = 0;
      this.inversePop = false;
      this.popping = false;

      this.updateValues();
    }

    this.updateValues = function() {
      this.x = this.bubble.position.x + (this.bubble.radius + this.popDistanceReturn) * Math.cos(2 * Math.PI * this.index / this.bubble.lines.length);
      this.y = this.bubble.position.y + (this.bubble.radius + this.popDistanceReturn) * Math.sin(2 * Math.PI * this.index / this.bubble.lines.length);
      this.lineLength = this.bubble.radius * this.popDistance;
      this.endX = this.lineLength;
      this.endY = this.lineLength;
    }

    this.render = function() {
      this.updateValues();

      ctx.beginPath();
      ctx.strokeStyle = '#8bc9ee';
      ctx.lineWidth = 2;
      ctx.moveTo(this.x, this.y);
      if(this.x < this.bubble.position.x) {
        this.endX = this.lineLength * -1;
      }
      if(this.y < this.bubble.position.y) {
        this.endY = this.lineLength * -1;
      }
      if(this.y === this.bubble.position.y) {
        this.endY = 0;
      }
      if(this.x === this.bubble.position.x) {
        this.endX = 0;
      }
      ctx.lineTo(this.x + this.endX, this.y + this.endY);
      ctx.stroke();
    };
  }



  // ---------------
  // Event Listeners
  // ---------------

  canvas.addEventListener('mousemove', mouseMove);

  function mouseMove(e) {
    mouseOffset.x = e.offsetX;
    mouseOffset.y = e.offsetY;
  }

  window.addEventListener('resize', function() {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
  });


  // ---------------
  // Event Listeners
  // ---------------

  //p5

  class Draggable {
  constructor(x, y, w, h) {
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  over() {
    // Is mouse over object
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }

  update() {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  }

  show() {
    stroke(0);
    // Different fill based on state
    if (this.dragging) {
      fill(50);
    } else if (this.rollover) {
      fill(100);
    } else {
      fill(175, 200);
    }
    rect(this.x, this.y, this.w, this.h);
  }

}

//End of Codepen

