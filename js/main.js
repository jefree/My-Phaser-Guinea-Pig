var game = new Phaser.Game(780, 455, Phaser.CANVAS, 'canvas', {preload: preload, create: create, update: update});

function preload() {
  game.load.spritesheet('razz', 'assets/img/chars/razz.png', 67, 61, 7);
  game.load.tilemap('map', 'assets/maps/map.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('tiles', 'assets/img/tiles/map.png')
}

var razz;
var map;
var layer;
var cursors;

var jump;

function create() {

  var map = game.add.tilemap('map');
  map.addTilesetImage('Tiles','tiles');

  map.setCollisionBetween(1, 3);

  layer = map.createLayer('Layer 1');
  layer.resizeWorld();

  razz = game.add.sprite(0, 455-(65+61), 'razz');
  game.physics.enable(razz);

  razz.body.setSize(29, 61, 25, 0);
  razz.body.collideWorldBounds = true;

  razz.animations.add('walk', [0,1,2,3], 8);
  razz.animations.add('jump', [4,5,6], 3);

  game.camera.follow(razz);
  game.physics.arcade.gravity.y = 300;

  cursors = game.input.keyboard.createCursorKeys();

  cursors.up.onDown.add(function() {

    if (razz.body.onFloor()){
      razz.body.velocity.y = -200;
      jump = true;
    }
  });
  
}

function update() {
  game.physics.arcade.collide(razz, layer);

  if (razz.body.onFloor()) {
    razz.body.velocity.x = 0
  }

  if (cursors.right.isDown) {
    razz.body.velocity.x = 50;

    if (razz.body.onFloor()) {
      razz.animations.play('walk');
    }

  } else {
    if (razz.animations.getAnimation('walk').isPlaying) {
      razz.animations.stop('walk');
    }
  }

  if (jump) {
    razz.animations.play('jump');
    jump = false;
  }
}
