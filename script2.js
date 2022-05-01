window.onload = function () {

  // model object
  var model = {
    ANTUP: 0,
    ANTRIGHT: 1,
    ANTDOWN: 2,
    ANTLEFT: 3,
    width: 320,
    height: 200,
    grid: [],
    dir: 0,
    ruleString: "1000",

    make2DArray: function (cols, rows) {
      var arr = [];
      for (var i = 0; i < cols; i++) {
        arr[i] = [];
        for (var j = 0; j < rows; j++) {
          arr[i][j] = 0;
        }
      }
      return arr;
    },

    initGrid: function () {
      this.grid = this.make2DArray(this.width, this.height);
      this.x = Math.floor(this.width / 2);
      this.y = Math.floor(this.height / 2);
      view.setup(this.width, this.height);

    },

    turnLeft: function () {
      this.dir++;
      if (this.dir > this.ANTLEFT) {
        this.dir = this.ANTUP;
      }
    },

    turnRight: function () {
      this.dir--;
      if (this.dir < this.ANTUP) {
        this.dir = this.ANTLEFT;
      }
    },

    moveForward: function () {
      if (this.dir === this.ANTUP) {
        this.y--;
      } else if (this.dir === this.ANTRIGHT) {
        this.x++;
      } else if (this.dir === this.ANTDOWN) {
        this.y++;
      } else if (this.dir === this.ANTLEFT) {
        this.x--;
      }

      if (this.x < 0) {
        this.x = this.width - 1;
      }
      if (this.y > this.height - 1) {
        this.y = 0;
      }
      if (this.x > this.width - 1) {
        this.x = 0;
      }
      if (this.y < 0) {
        this.y = this.height - 1;
      }
    },

    step: function () {
      var rule = this.ruleString.split("");
      if (rule[this.grid[this.x][this.y] % rule.length] === "0") {
        this.turnRight();
      } else {
        this.turnLeft();
      }
      this.grid[this.x][this.y]++;
      this.moveForward();
      view.draw(this.grid[this.x][this.y], this.x, this.y);
    },
  };


  // view object
  var view = {
    canvas: document.getElementById("canvas"),
    context: document.getElementById("canvas").getContext("2d"),

    palette: [],

    getPalette: function (fileName) {
      var url = "maps/" + fileName + ".map";
      var request = new XMLHttpRequest();
      request.open("GET", url);
      request.onload = this.parsePalette.bind(this);
      request.send(null);
    },

    parsePalette: function (event) {
      // Parses a Fractint map file
      var colors = event.target.responseText.split("\r\n");
      var color;
      var rgb;
      for (var i = 0; i < colors.length; i++) {
        rgb = [];
        if (colors[i].length > 0) {
          color = colors[i].split(" ");
          for (var j = 0; j < color.length; j++) {
            if (Number.parseInt(color[j]) >= 0) {
              rgb.push(color[j]);
            }
          }
          this.palette.push("rgb(" + rgb.slice(0, 3).join(",") + ")");
        }
      }
    },

    setup: function (width, height) {
      this.canvas.setAttribute("width", width);
      this.canvas.setAttribute("height", height);

      this.context.fillRect(0, 0, width, height);

      this.getPalette("altern");
    },

    draw: function (gridValue, x, y) {
      this.context.fillStyle = this.palette[gridValue % this.palette.length];
      this.context.fillRect(x, y, 1, 1);
    }
  };


  // controller object
  var controller = {
    stepsAtATime: 1000,

    step: function () {
      for (var i = 0; i < this.stepsAtATime; i++) {
        model.step();
      }
    },

    init: function () {
      model.initGrid();
      setInterval(this.step.bind(this), 0);
    }
  };

  // Go!
  controller.init();
}