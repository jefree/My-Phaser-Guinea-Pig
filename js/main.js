var game = new Phaser.Game(780, 455, Phaser.CANVAS, 'canvas', {preload: preload, create: create, update: update});

function preload() {
  game.load.atlasJSONArray('razz', 'assets/img/chars/razz.png', 'assets/img/chars/razz.json');
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

  razz.animations.add('right', ['right1.png', 'right2.png', 'right3.png', 'right4.png'], 8);
  razz.animations.add('left', ['left1.png', 'left2.png', 'left3.png', 'left4.png'], 8);

  razz.animations.add('jright', ['jright1.png', 'jright2.png', 'jright3.png'], 3);
  razz.animations.add('jleft', ['jleft1.png', 'jleft2.png', 'jleft3.png'], 3);

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
      razz.animations.play('right');
    }

  } 
  else if (cursors.left.isDown) {

    razz.body.velocity.x = -50;

    if (razz.body.onFloor()) {
      razz.animations.play('left');
    }

  }
  else {
    if (razz.animations.getAnimation('right').isPlaying) {
      razz.animations.stop('right');
    }
  }

  if (jump) {
    
    if (cursors.left.isDown) {
      razz.animations.play('jleft');
    }
    else if (cursors.right.isDown) {
      razz.animations.play('jright');
    }

    jump = false;
  }
}
