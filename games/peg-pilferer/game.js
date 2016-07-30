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
var fallingPegs = Array();

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
var SOUND_CLICK = new Howl({
  urls: ['sfx/click.wav'],
});

var SOUND_SUCCESS = new Howl({
  urls: ['sfx/success.wav'],
});

var SOUND_FAILURE = new Howl({
  urls: ['sfx/fail.wav'],
});

var SOUND_BONUS = new Howl({
  urls: ['sfx/bonus.wav'],
});

function getComboScore(quantity) {
  var ns = 0;

  if (quantity < 4) {
    ns = bigInt[2].pow(quantity);
  } else if (quantity < 8) {
    ns = bigInt[100].multiply(quantity);
  } else if (quantity < 16) {
    ns = bigInt(800).multiply(bigInt[2].pow(quantity / 2));
  } else {
    ns = bigInt(250000).multiply(quantity - 16);
  }

  return ns;
}

function generateMap(level) {
  levelText.text = 'L: ' + level;

  if (level != 1) {
    dimension += 1;
    if (dimension > maxDimension) { dimension = maxDimension; }
    if (level == 16) {
      PIECES = PIECE_SETS[1];
    }
  }

  // Threshold punishment (increase number of peg colors for next level)
  if (level > 2 && pegTypes <= 3 && score.lt(scoreThreshold)) {
    pegTypes = 4;
    SOUND_FAILURE.play();
  } else {
    if (level < 2 || Math.random() > 0.3) {
      pegTypes = 3;
      SOUND_SUCCESS.play();
    } else {
      pegTypes = 2;
      SOUND_BONUS.play();
    }
  }

  // Generate the level
  for (var i = 0; i < dimension; i++) {
    if (!grid[i]) {
      grid[i] = [];
    }
    for (var j = 0; j < dimension; j++) {
      if (!grid[i][j]) {
        grid[i][j] = [];
      }
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

  // Update the threshold based on the level generated
  if (level > 2) {
    var baseStrength = Math.floor(piecesLeft / 6);
    var levelOverload = Math.ceil((level - 3) / 2);
    if (levelOverload < 1) {
      levelOverload = 1;
    }
    scoreThreshold = score.add(bigInt(
      getComboScore(baseStrength)).multiply(levelOverload));
    if (pegTypes <= 3) {
      goalText.text = 'Thr: ' + scoreThreshold;
    } else {
      goalText.text = 'Thr: Safe';
    }
  }
}

// Autodetect, create and append the renderer to the body element
var renderer = PIXI.autoDetectRenderer(800, 600,
  {backgroundColor: 0x000000, antialias: true});
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
        // Draw a peg
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

title.text = 'Peg Pilferer [v 0]';
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

var goalText = new PIXI.Text('Thr: SAFE', {
  font: '20px Times New Roman',
  fill: 'lime',
});

goalText.position.x = renderer.width - 200;
goalText.position.y = 100;
container.addChild(goalText);

var diff = score - scoreThreshold;
var diffText = new PIXI.Text('Diff: SAFE', {
  font: '20px Times New Roman',
  fill: 'lime',
});

diffText.position.x = renderer.width - 200;
diffText.position.y = 120;
container.addChild(diffText);

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

function executeCombo() {
  var cx = Math.floor((mx - 20) / 40);
  var cy = Math.floor((my - 20) / 40);

  if (cx < 0 || cy < 0 || cx >= dimension || cy >= dimension) { return; }

  // Player clicks piece
  if (canClick && grid[cy][cx].type != 0) {
    canClick = false;
    var piecesRemoved = floodFill(cy, cx, grid[cy][cx].type);
    piecesLeft -= piecesRemoved;
    score = score.add(getComboScore(piecesRemoved));

    // Level clear
    if (piecesLeft == 0) {
      generateMap(level += 1);
    } else {
      SOUND_CLICK.play();
    }

    scoreText.text = 'S: ' + score;
    redrawGrid();

    var diff = score - scoreThreshold;
    if (diff >= 0) {
      diffText.text = 'Diff: SAFE';
    } else {
      diffText.text = 'Diff: ' + diff;
    }

    canClick = true;
  }
}

// Handle User Mouse Click
graphics.mousedown = function(data) {
  mx = data.data.global.x;
  my = data.data.global.y;
  executeCombo();
};

graphics.tap = function(data) {
  mx = data.data.global.x;
  my = data.data.global.y;
  executeCombo();
};

// Initialize game
generateMap(level);
redrawGrid();
animate();

function applyGravity() {
  fallingOffset = 40;
  for (var x = 0; x < dimension; x++) {
    for (var y = dimension - 1; y > 0; y--) {
      if (grid[y - 1][x].type != 0 && grid[y][x].type == 0) {
        grid[y][x].type = grid[y - 1][x].type;
        grid[y][x].falling = true;
        grid[y - 1][x].type = 0;
        fallingPegs.push(x);
        fallingPegs.push(y);
      }
    }
  }
}

function animate() {
  if (clock % 10 == 0) {
    applyGravity();
  }

  if (fallingOffset > 0) { fallingOffset -= 4; }
  if (fallingOffset == 0) {
    var sy;
    var sx;
    while (sy = fallingPegs.pop()) {
      sx = fallingPegs.pop();
      grid[sy][sx].falling = false;
    }
  }
  redrawGrid();

  renderer.render(container);
  requestAnimationFrame(animate);

  clock += 1;
}
