var game = new Phaser.Game(780, 455, Phaser.CANVAS, 'canvas', {preload: preload, create: create, update: update});

function preload() {
  game.load.atlasJSONArray('razz', 'assets/img/chars/razz.png', 'assets/img/chars/razz.json');
  game.load.atlasJSONArray('maptiles', 'assets/img/tiles/maptiles.png', 'assets/img/tiles/maptiles.json')
  game.load.tilemap('map', 'assets/maps/map.json', null, Phaser.Tilemap.TILED_JSON);
}

var razz;
var map;
var layer;
var cursors;
var cube;

var jump;

function create() {

  var map = game.add.tilemap('map');
  map.addTilesetImage('maptiles','maptiles');

  map.setCollisionBetween(1, 5);

  layer = map.createLayer('Capa de Patrones 1');
  layer.resizeWorld();

  razz = game.add.sprite(0, 455-(65+61), 'razz');
  game.physics.enable(razz);

  razz.body.setSize(29, 61, 25, 0);
  razz.body.collideWorldBounds = true;

  razz.animations.add('right', ['right1.png', 'right2.png', 'right3.png', 'right4.png'], 8);
  razz.animations.add('left', ['left1.png', 'left2.png', 'left3.png', 'left4.png'], 8);

  razz.animations.add('jright', ['jright1.png', 'jright2.png', 'jright3.png'], 3);
  razz.animations.add('jleft', ['jleft1.png', 'jleft2.png', 'jleft3.png'], 3);

  razz.animations.add('pright', ['pright1.png', 'pright2.png', 'pright3.png', 'pright4.png'], 8);
  razz.animations.add('pleft', ['pleft1.png', 'pleft2.png', 'pleft3.png', 'pleft4.png'], 8);

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
  game.physics.arcade.collide(cube, layer);

  if (razz.body.onFloor()) {
    razz.body.velocity.x = 0
  }

  if (cursors.right.isDown) {
    razz.body.velocity.x = 50;

    //set collision bounds
    razz.body.setSize(28, 61, 25, 0);

    if (razz.body.onFloor()) {
      razz.animations.play('right');
    }

  } 
  else if (cursors.left.isDown) {

    razz.body.velocity.x = -50;

    //set collision bounds
    razz.body.setSize(28, 61, 12, 0);

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
