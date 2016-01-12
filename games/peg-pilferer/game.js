// Mouse Vars
var mx;
var my;

// Game Vars
var canClick = true;
var grid = [];
var clock = 0;
var clear = 0;
var dimension = 4;
var level = 1;
var piecesLeft = 0;
var score = bigInt();
var fallingOffset = 0;

// Pieces
var PIECE_EMPTY = 0x000000;
var PIECE_RED = 0xFF0000;
var PIECE_GREEN = 0x00FF00;
var PIECE_BLUE = 0x0000FF;

// SFX
var SOUND_POP = new Audio('sfx/click.wav');
var SOUND_CLEAR = new Audio('sfx/clear.wav');

function generateMap(level) {
  for (var i = 0; i < dimension; i++) {
    if (!grid[i])
      grid[i] = [];
    for (var j = 0; j < dimension; j++) {
      if (!grid[i][j])
        grid[i][j] = [];
      grid[i][j].type = Math.floor(Math.random() * 4);
      if (grid[i][j].type != 0) {
        grid[i][j].falling = false;
        piecesLeft += 1;
      }
    }
  }
}

generateMap(level);

// Autodetect, create and append the renderer to the body element
var renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x000000, antialias: true });
document.body.appendChild(renderer.view);
var container = new PIXI.Container();
var graphics = new PIXI.Graphics();
graphics.interactive = true;
graphics.hitArea = new PIXI.Rectangle(0, 0, 800, 600);

container.addChild(graphics);

function getNodeColor(r) {
  var color;
  switch (r) {
    case 1:
      color = PIECE_RED;
      break;
    case 2:
      color = PIECE_GREEN;
      break;
    case 3:
      color = PIECE_BLUE;
      break;
  }
  return color;
}

function redrawGrid() {
  graphics.clear();
  for (var y = 0; y < dimension; y++) {
    for (var x = 0; x < dimension; x++) {
      if (grid[y][x].type != 0) {
        graphics.beginFill(getNodeColor(grid[y][x].type));
        if (grid[y][x].falling) {
          graphics.drawCircle(40 + x * 40, 40 + y * 40 - fallingOffset, 16); // drawCircle(x, y, radius)
        } else {
          graphics.drawCircle(40 + x * 40, 40 + y * 40, 16); // drawCircle(x, y, radius)
        }

        graphics.endFill();
      }
    }
  }
}

var title = new PIXI.Text('', {
  font: '24px Times New Roman',
  fill: 'lime',
});

title.text = 'Peg Pilferer';
title.position.x = renderer.width - 180;
title.position.y = 20;
container.addChild(title);

var scoreText = new PIXI.Text('', {
  font: '20px Times New Roman',
  fill: 'lime',
});

scoreText.text = '' + score;
scoreText.position.x = renderer.width - 180;
scoreText.position.y = 60;
container.addChild(scoreText);

function floodFill(y, x, c) {
  var n = 1;
  grid[y][x].type = PIECE_EMPTY;

  if (x - 1 >= 0) {
    if (grid[y][x - 1].type == c) {
      n += floodFill(y, x - 1, c);
    }
  }

  if (x + 1 < dimension) {
    if (grid[y][x + 1].type == c) {
      n += floodFill(y, x + 1, c);
    }
  }

  if (y - 1 >= 0) {
    if (grid[y - 1][x].type == c) {
      n += floodFill(y - 1, x, c);
    }
  }

  if (y + 1 < dimension) {
    if (grid[y + 1][x].type == c) {
      n += floodFill(y + 1, x, c);
    }
  }

  return n;
}

// Handle User Mouse Click
graphics.click = function(data) {
  var cx = Math.floor((mx - 20) / 40);
  var cy = Math.floor((my - 20) / 40);

  if (cx < 0 || cy < 0 || cx >= dimension || cy >= dimension) return;

  // Player clicks piece
  if (canClick && grid[cy][cx].type != PIECE_EMPTY) {
    canClick = false;
    SOUND_POP.play();
    var piecesRemoved = floodFill(cy, cx, grid[cy][cx].type);
    piecesLeft -= piecesRemoved;
    if (piecesRemoved <= 16) {
      score = score.add(bigInt(2).pow(piecesRemoved));
    } else if (piecesRemoved <= 32) {
      score = score.add(bigInt(65536).add(bigInt(10000).multiply(piecesRemoved)));
    } else if (piecesRemoved <= 64) {
      score = score.add(bigInt(225536).add(bigInt(100000).multiply(piecesRemoved)));
    } else {
      score = score.add(bigInt(3425536).add(bigInt(1000000).multiply(piecesRemoved)));
    }

    if (piecesLeft == 0) {
      SOUND_POP.pause();
      SOUND_POP.currentTime = 0;
      dimension += 1;
      if (dimension > 14) dimension = 14;
      generateMap(level);
      SOUND_CLEAR.play();
    }

    scoreText.text = '' + score;
    redrawGrid();

    canClick = true;
  }
};

redrawGrid();
animate();

function applyGravity() {
  for (var x = 0; x < dimension; x++) {
    for (var y = dimension - 1; y > 0; y--) {

      if (grid[y - 1][x].type != PIECE_EMPTY && grid[y][x].type == PIECE_EMPTY) {
        grid[y][x].type = grid[y - 1][x].type;
        grid[y][x].falling = true;
        grid[y - 1][x].type = PIECE_EMPTY;
        fallingOffset = 40;
      }
    }
  }
}

function animate() {
  if (clock % 10 == 0) {
    applyGravity();
  }

  if (fallingOffset > 0) {
    fallingOffset -= 4;
    if (fallingOffset == 0) {
      for (var y = 0; y < dimension; y++) {
        for (var x = 0; x < dimension; x++) {
          if (grid[y][x].falling) {
            grid[y][x].falling = false;
          }
        }
      }
    }
  }

  redrawGrid();

  mx = renderer.plugins.interaction.mouse.global.x;
  my = renderer.plugins.interaction.mouse.global.y;

  renderer.render(container);
  requestAnimationFrame(animate);

  clock += 1;
}
