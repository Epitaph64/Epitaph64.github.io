/**
 * Created by Epitaph64 on 7/15/2015.
 */
window.onload = function() {

    var game = new Phaser.Game(800, 576, Phaser.AUTO, "phaser-test", { preload: preload, create: create, update: update }, false, false);

    var clicks = 0;
    var player = {
        x : 80,
        y : 436
    };

    // Set map width and height to the max possible given the canvas size
    var map_width = Math.floor(800.0 / 32.0);
    var map_height = Math.floor(600.0 / 32.0);

    // Create 2D grid representation out of arrays of map_width and map_height
    var map = new Array(map_width);
    for (var i = 0; i < map_width; i++) {
        map[i] = new Array(map_height);
    }

    function preload () {
        game.load.spritesheet('tileset', '/img/phaser-game/tileset.png', 16, 16);
    }

    function create () {

        //	Enable p2 physics
        game.physics.startSystem(Phaser.Physics.P2JS);

        game.stage.backgroundColor = '#666666';

        for (var x = 0; x < map_width; x++) {
            for (var y = 0; y < map_height; y++) {
                map[x][y] = 1;
            }
        }
        for (x = 1; x < map_width - 1; x++) {
            for (y = 1; y < map_height - 1; y++) {
                if (Math.random() < 0.9)
                map[x][y] = 0;
            }
        }
        for (x = 0; x < map_width; x++) {
            for (y = 0; y < map_height; y++) {
                switch(map[x][y]) {
                    case 1:
                        tile_block = game.add.sprite(x * 32 + 16, y * 32 + 16, 'tileset', 3);
                        tile_block.scale.setTo(2, 2);
                        game.physics.p2.enable(tile_block);
                        tile_block.body.static = true;
                        tile_block.body.fixedRotation = true;
                        break;
                    default:
                        tile_block = game.add.sprite(x * 32, y * 32, 'tileset', 48);
                        tile_block.scale.setTo(2, 2);
                        break;
                }
            }
        }

        //var style = { font: "32px Arial", fill: '#ffffff', align: "center" };
        //text = game.add.text(game.world.centerX, 64, "Test", style);
        //text.anchor.set(0.5);
        //text.inputEnabled = true;
        //text.events.onInputDown.add(down, this);

        player = game.add.sprite(player.x, player.y, 'tileset', 11);
        player.scale.setTo(2.0, 2.0);
        game.physics.p2.enable(player);
        player.body.setZeroDamping();
        player.body.fixedRotation = true;
    }

    function down(item) {
        clicks ++;
        item.text = 'You have clicked ' + clicks + ' times.';
    }

    function update () {
        player.body.setZeroVelocity();
        if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            move_left();
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            move_right();
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
            move_up();
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
            move_down();
        }
    }

    function move_left () {
        player.body.moveLeft(250);
    }

    function move_right() {
        player.body.moveRight(250);
    }

    function move_up() {
        player.body.moveUp(250);
    }

    function move_down() {
        player.body.moveDown(250);
    }
};
