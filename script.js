window.onload = function () {
  var canvas;
  var context;

  var grid = [];
  var x;
  var y;
  var dir;

  var ANTUP = 0;
  var ANTRIGHT = 1;
  var ANTDOWN = 2;
  var ANTLEFT = 3;

  function setup() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    // Size canvas
    canvas.width = 320;
    canvas.height = 200;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Initialize grid
    grid = make2DArray(canvas.width, canvas.height);

    // Ant's starting location and direction;
    x = Math.floor(canvas.width / 2);
    y = Math.floor(canvas.height / 2);
    dir = ANTUP;


    draw();

  }

  function draw() {
    var imageData = context.createImageData(1, 1);
    var state = grid[x][y];

    if (state === 0) {
      turnRight();
      grid[x][y] = 1; // Flip state
    } else {
      turnLeft();
      grid[x][y] = 0; // Flip state
    }
    moveForward();

    if (grid[x][y] === 0) {
      imageData.data[0] = 0;
      imageData.data[1] = 0;
      imageData.data[2] = 0;
    } else {
      imageData.data[0] = 255;
      imageData.data[1] = 255;
      imageData.data[2] = 255;
    }
    imageData.data[3] = 255;
    context.putImageData(imageData, x, y);
    setTimeout(draw, 0);
  }

  function turnRight() {
    dir++;
    if (dir > ANTLEFT) {
      dir = ANTUP;
    }
  }

  function turnLeft() {
    dir--;
    if (dir < ANTUP) {
      dir = ANTLEFT;
    }
  }

  function moveForward() {
    if (dir === ANTUP) {
      y--;
    } else if (dir === ANTRIGHT) {
      x++;
    } else if (dir === ANTDOWN) {
      y++;
    } else if (dir === ANTLEFT) {
      x--;
    }

    if (x < 0) {
      x = canvas.width - 1;
    }
    if (y > canvas.height - 1) {
      y = 0;
    }
    if (x > canvas.width - 1) {
      x = 0;
    }
    if (y < 0) {
      y = canvas.height - 1;
    }

  }

  function make2DArray(cols, rows) {
    var arr = new Array(cols);
    for (var i = 0; i < cols; i++) {
      arr[i] = new Array(rows);
      for (var j = 0; j < rows; j++) {
        arr[i][j] = 0;
      }
    }
    return arr;
  }

  setup();
}


