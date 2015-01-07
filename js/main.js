var game = new Phaser.Game(780, 455, Phaser.CANVAS, 'canvas', {preload: preload, create: create, update: update});
var razz = new Razz(game);

function preload() {
  game.load.atlasJSONArray('maptiles', 'assets/img/tiles/maptiles.png', 'assets/img/tiles/maptiles.json')
  game.load.tilemap('map', 'assets/maps/map.json', null, Phaser.Tilemap.TILED_JSON);

  razz.preload();
}

function create() {

  var map = game.add.tilemap('map');
  map.addTilesetImage('maptiles','maptiles');

  map.setCollisionBetween(1, 5);

  var layer = map.createLayer('Capa de Patrones 1');
  layer.resizeWorld();

  razz.create(layer);

  game.camera.follow(razz.razz);
  game.physics.arcade.gravity.y = 300;
 
}

function update() {
  razz.update();
}
