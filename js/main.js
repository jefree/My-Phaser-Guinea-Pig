var game = new Phaser.Game(780, 455, Phaser.CANVAS, 'canvas', {preload: preload, create: create, update: update});

function preload() {
  game.load.spritesheet('razz', 'assets/img/razz/walk.png', 67, 61, 4);
  game.load.tilemap('map', 'assets/maps/map.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('tiles', 'assets/img/tiles/map.png')
}

var razz;
var map;
var layer;
var cursors;

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
  razz.animations.add('walk')

  game.camera.follow(razz);
  game.physics.arcade.gravity.y = 200;

  cursors = game.input.keyboard.createCursorKeys();
  
}

function update() {
  game.physics.arcade.collide(razz, layer);

  if (cursors.right.isDown) {
    razz.animations.play('walk', 8);
    razz.body.velocity.x = 50;
  } else {
    razz.animations.stop('walk', true);
    razz.body.velocity.x = 0
  }
}
