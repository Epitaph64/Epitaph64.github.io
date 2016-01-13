// Mouse Vars
var mx;
var my;

// Game Vars
var canClick = true;
var grid = [];
var clock = 0;
var clear = 0;
var dimension = 4;
var maxDimension = 14;

var score = bigInt();
var scoreThreshold = bigInt();
var fallingOffset = 0;

var level = 1;
var piecesLeft = 0;
var pegTypes = 3;

// Pieces
var PIECE_SETS = [
  [0x00000, 0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF33],
  [0x000000, 0xe18b45, 0x89e46a, 0x649ce2, 0x7d5b7a],
];

var PIECES = PIECE_SETS[0];

// SFX
var SOUND_POP = new Howl({
  urls: ['sfx/click.wav'],
});

var SOUND_CLEAR = new Howl({
  urls: ['sfx/clear.wav'],
});

function generateMap(level) {

  if (level > 2 && pegTypes == 3 && score.lt(scoreThreshold)) {
    pegTypes = 4;
  } else {
    pegTypes = 3;
  }

  for (var i = 0; i < dimension; i++) {
    if (!grid[i])
      grid[i] = [];
    for (var j = 0; j < dimension; j++) {
      if (!grid[i][j])
        grid[i][j] = [];

      if (Math.random() > 0.2) {
        grid[i][j].type = Math.floor(Math.random() * pegTypes) + 1;
      } else {
        grid[i][j].type = 0;
      }

      if (grid[i][j].type != 0) {
        grid[i][j].falling = false;
        piecesLeft += 1;
      }
    }
  }

  if (level > 2) {
    scoreThreshold = score.add(bigInt(dimension).pow(3));
    if (pegTypes == 3) {
      goalText.text = 'Thr: ' + scoreThreshold;
    } else {
      goalText.text = 'Thr: Safe';
    }
  }
}

// Autodetect, create and append the renderer to the body element
var renderer = PIXI.autoDetectRenderer(800, 600, { backgroundColor: 0x000000, antialias: true });
document.body.appendChild(renderer.view);
var container = new PIXI.Container();
var graphics = new PIXI.Graphics();
graphics.interactive = true;
graphics.hitArea = new PIXI.Rectangle(0, 0, 800, 600);

container.addChild(graphics);

function redrawGrid() {
  graphics.clear();
  for (var y = 0; y < dimension; y++) {
    for (var x = 0; x < dimension; x++) {
      if (grid[y][x].type != 0) {
        graphics.beginFill(PIECES[grid[y][x].type]);
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

// HUD
var title = new PIXI.Text('', {
  font: '24px Times New Roman',
  fill: 'lime',
});

title.text = 'Peg Pilferer [v 0.3b]';
title.position.x = renderer.width - 205;
title.position.y = 20;
container.addChild(title);

var levelText = new PIXI.Text('Lv: ' + level, {
  font: '20px Times New Roman',
  fill: 'lime',
});

levelText.position.x = renderer.width - 200;
levelText.position.y = 60;
container.addChild(levelText);

var scoreText = new PIXI.Text('S: ' + score, {
  font: '20px Times New Roman',
  fill: 'lime',
});

scoreText.position.x = renderer.width - 200;
scoreText.position.y = 80;
container.addChild(scoreText);

var goalText = new PIXI.Text('', {
  font: '20px Times New Roman',
  fill: 'lime',
});

goalText.position.x = renderer.width - 200;
goalText.position.y = 100;
container.addChild(goalText);

var creditText = new PIXI.Text('E64', {
  font: '20px Times New Roman',
  fill: 'lime',
});

creditText.position.x = renderer.width - 200;
creditText.position.y = renderer.height - 50;
container.addChild(creditText);

function floodFill(y, x, c) {
  var n = 1;
  grid[y][x].type = 0;

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
  if (canClick && grid[cy][cx].type != 0) {
    canClick = false;
    SOUND_POP.stop();
    var piecesRemoved = floodFill(cy, cx, grid[cy][cx].type);
    piecesLeft -= piecesRemoved;

    // Combo calculation
    if (piecesRemoved <= 16) {
      score = score.add(bigInt(2).pow(piecesRemoved));
    } else if (piecesRemoved <= 32) {
      score = score.add(bigInt(65536).add(bigInt(10000).multiply(piecesRemoved)));
    } else if (piecesRemoved <= 64) {
      score = score.add(bigInt(225536).add(bigInt(100000).multiply(piecesRemoved)));
    } else {
      score = score.add(bigInt(3425536).add(bigInt(1000000).multiply(piecesRemoved)));
    }

    // Level clear
    if (piecesLeft == 0) {
      level += 1;
      levelText.text = 'L: ' + level;
      dimension += 1;
      if (dimension > maxDimension) dimension = maxDimension;
      if (level == 16) {
        PIECES = PIECE_SETS[1];
      }

      generateMap(level);
      SOUND_CLEAR.play();
    } else {
      SOUND_POP.play();
    }

    scoreText.text = 'S: ' + score;
    redrawGrid();

    canClick = true;
  }
};

// Initialize game
generateMap(level);
redrawGrid();
animate();

function applyGravity() {
  for (var x = 0; x < dimension; x++) {
    for (var y = dimension - 1; y > 0; y--) {

      if (grid[y - 1][x].type != 0 && grid[y][x].type == 0) {
        grid[y][x].type = grid[y - 1][x].type;
        grid[y][x].falling = true;
        grid[y - 1][x].type = 0;
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
    if (fallingOffset <= 0) {
      for (var y = 0; y < dimension; y++) {
        for (var x = 0; x < dimension; x++) {
          if (grid[y][x].falling) {
            grid[y][x].falling = false;
          }
        }
      }

      fallingOffset = 0;
    }

    redrawGrid();
  }

  mx = renderer.plugins.interaction.mouse.global.x;
  my = renderer.plugins.interaction.mouse.global.y;

  renderer.render(container);
  requestAnimationFrame(animate);

  clock += 1;
}
