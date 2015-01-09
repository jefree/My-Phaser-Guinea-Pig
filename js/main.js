var game = new Phaser.Game(780, 455, Phaser.CANVAS, 'canvas', {preload: preload, create: create, update: update});
var razz = new Razz(game);

function preload() {
  game.load.atlasJSONHash('maptiles', 'assets/img/tiles/maptiles.png', 'assets/img/tiles/maptiles.json')
  game.load.tilemap('map', 'assets/maps/map.json', null, Phaser.Tilemap.TILED_JSON);

  razz.preload();
}

var cubes, layer;

function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);

  var map = game.add.tilemap('map');
  map.addTilesetImage('maptiles','maptiles');

  map.setCollisionBetween(1, 6);

  layer = map.createLayer('Capa de Patrones 1');
  layer.resizeWorld();

  cubes = game.add.group();
  cubes.enableBody = true;

  map.createFromObjects('Capa de Objetos 1', 6, 'maptiles', 5, true, false, cubes);

  cubes.setAll('body.collideWorldBounds', true);
  cubes.setAll('body.drag.x', 100);

  razz.create(layer);

  game.camera.follow(razz.razz);
  game.physics.arcade.gravity.y = 300;
 
}

function update() {
  
  game.physics.arcade.collide(razz.razz, cubes);
  game.physics.arcade.collide(layer, cubes);
  game.physics.arcade.collide(cubes, cubes);

  razz.update();

}
